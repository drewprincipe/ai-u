import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Settings, MessageSquare, BookOpen, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { LessonVideo, TranscriptSegment, InteractivePoint, UserNote, VideoProgress } from '@/types/lesson';
import { saveVideoProgress, saveUserNote, getUserNotes } from '@/services/mockLessonService';

interface LessonVideoPlayerProps {
  lesson: LessonVideo;
  onProgress?: (progress: VideoProgress) => void;
  className?: string;
}

export function LessonVideoPlayer({ lesson, onProgress, className = '' }: LessonVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [activeTranscript, setActiveTranscript] = useState<TranscriptSegment | null>(null);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showInteractivePoint, setShowInteractivePoint] = useState<InteractivePoint | null>(null);
  const { toast } = useToast();

  // Load user notes on component mount
  useEffect(() => {
    const loadNotes = async () => {
      const userNotes = await getUserNotes(lesson.id);
      setNotes(userNotes);
    };
    loadNotes();
  }, [lesson.id]);

  // Track video progress and interactive points
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      setCurrentTime(current);

      // Find active transcript segment
      const segment = lesson.transcript.find(
        t => current >= t.startTime && current <= t.endTime
      );
      setActiveTranscript(segment || null);

      // Check for interactive points
      const interactivePoint = lesson.interactivePoints.find(
        point => Math.abs(current - point.timestamp) < 0.5 && !showInteractivePoint
      );
      
      if (interactivePoint) {
        setShowInteractivePoint(interactivePoint);
        video.pause();
        setIsPlaying(false);
      }

      // Save progress
      const progress: VideoProgress = {
        lessonId: lesson.id,
        currentTime: current,
        completed: current >= duration * 0.95,
        watchedSegments: [{ start: 0, end: current }],
        completionPercentage: (current / duration) * 100
      };
      
      saveVideoProgress(progress);
      onProgress?.(progress);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [lesson, duration, showInteractivePoint, onProgress]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const seekTime = (value[0] / 100) * duration;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const seekBy = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const jumpToTranscript = (segment: TranscriptSegment) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = segment.startTime;
    setCurrentTime(segment.startTime);
  };

  const saveNote = async () => {
    if (!newNote.trim()) return;

    try {
      const note = await saveUserNote({
        lessonId: lesson.id,
        timestamp: currentTime,
        content: newNote.trim()
      });
      
      setNotes([...notes, note]);
      setNewNote('');
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save note. Please try again."
      });
    }
  };

  const dismissInteractivePoint = () => {
    setShowInteractivePoint(null);
  };

  return (
    <div className={`relative bg-card rounded-lg overflow-hidden shadow-card ${className}`} ref={containerRef}>
      {/* Video Element */}
      <div className="relative aspect-video bg-muted">
        <video
          ref={videoRef}
          src={lesson.videoUrl}
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Interactive Point Overlay */}
        {showInteractivePoint && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center p-6">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{showInteractivePoint.type}</Badge>
                  <h3 className="font-semibold">{showInteractivePoint.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{showInteractivePoint.content}</p>
                
                {showInteractivePoint.type === 'quiz' && showInteractivePoint.options && (
                  <div className="space-y-2 mb-4">
                    {showInteractivePoint.options.map((option, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className="w-full justify-start text-left"
                        onClick={() => {
                          // Handle quiz answer
                          const isCorrect = index === showInteractivePoint.correctAnswer;
                          toast({
                            title: isCorrect ? "Correct!" : "Try again",
                            description: isCorrect ? "Great job!" : "That's not quite right.",
                            variant: isCorrect ? "default" : "destructive"
                          });
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                <Button onClick={dismissInteractivePoint} className="w-full">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Video Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
            <div className="space-y-2">
              {/* Progress Bar */}
              <Progress 
                value={(currentTime / duration) * 100} 
                className="cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  handleSeek([percent * 100]);
                }}
              />
              
              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => seekBy(-10)}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={togglePlay}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => seekBy(10)}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select 
                    value={playbackRate} 
                    onChange={(e) => changePlaybackRate(Number(e.target.value))}
                    className="text-sm bg-background border border-border rounded px-2 py-1"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                  <Button size="sm" variant="ghost">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Content Tabs */}
      <div className="p-6">
        <Tabs defaultValue="transcript" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transcript" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Transcript
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Notes ({notes.length})
            </TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="transcript" className="mt-4">
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {lesson.transcript.map((segment) => (
                  <div
                    key={segment.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeTranscript?.id === segment.id 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                    onClick={() => jumpToTranscript(segment)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs text-muted-foreground font-mono min-w-[60px]">
                        {formatTime(segment.startTime)}
                      </span>
                      <div className="flex-1">
                        {segment.speaker && (
                          <p className="text-sm font-medium text-primary mb-1">{segment.speaker}</p>
                        )}
                        <p className="text-sm leading-relaxed">{segment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="notes" className="mt-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a note at current timestamp..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={saveNote} disabled={!newNote.trim()}>
                  Save
                </Button>
              </div>
              
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {notes.map((note) => (
                    <div key={note.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground font-mono">
                          {formatTime(note.timestamp)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {note.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{note.content}</p>
                    </div>
                  ))}
                  {notes.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No notes yet. Add your first note above!
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Lesson Description</h3>
                <p className="text-muted-foreground">{lesson.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Interactive Elements</h3>
                <div className="flex flex-wrap gap-2">
                  {lesson.interactivePoints.map((point) => (
                    <Badge key={point.id} variant="outline">
                      {point.type} at {formatTime(point.timestamp)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}