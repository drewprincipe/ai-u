import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LessonVideoPlayer } from '@/components/LessonVideoPlayer';
import { AITutorWidget } from '@/components/AITutorWidget';
import { LessonVideo, LessonMeta, VideoProgress } from '@/types/lesson';
import { getLessonVideo, getLessonMeta } from '@/services/mockLessonService';
import { useToast } from '@/hooks/use-toast';

export default function LessonViewer() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<LessonVideo | null>(null);
  const [lessonMeta, setLessonMeta] = useState<LessonMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<VideoProgress | null>(null);

  useEffect(() => {
    const loadLesson = async () => {
      if (!lessonId) {
        navigate('/dashboard');
        return;
      }

      try {
        setLoading(true);
        const [lessonData, metaData] = await Promise.all([
          getLessonVideo(lessonId),
          getLessonMeta(lessonId)
        ]);
        
        setLesson(lessonData);
        setLessonMeta(metaData);
      } catch (error) {
        console.error('Failed to load lesson:', error);
        toast({
          variant: "destructive",
          title: "Error loading lesson",
          description: "Please try again later."
        });
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId, navigate, toast]);

  const handleProgress = (newProgress: VideoProgress) => {
    setProgress(newProgress);
    
    // Show completion toast when lesson is completed
    if (newProgress.completed && (!progress?.completed)) {
      toast({
        title: "Lesson completed! 🎉",
        description: "Great job! You've successfully completed this lesson."
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson || !lessonMeta) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Lesson not found</h2>
            <p className="text-muted-foreground mb-4">The lesson you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold">{lessonMeta.title}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <Badge variant="secondary">{lessonMeta.difficulty}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {Math.ceil(lessonMeta.estimatedDuration / 60)} min
                  </span>
                  {progress && (
                    <span className="text-sm text-muted-foreground">
                      {Math.round(progress.completionPercentage)}% complete
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <LessonVideoPlayer 
              lesson={lesson}
              onProgress={handleProgress}
              className="mb-6"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Lesson Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lessonMeta.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Topics Covered</h4>
                  <div className="flex flex-wrap gap-1">
                    {lessonMeta.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {lessonMeta.prerequisites.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Prerequisites</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {lessonMeta.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lessonMeta.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Progress Card */}
            {progress && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{Math.round(progress.completionPercentage)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress.completionPercentage}%` }}
                      />
                    </div>
                    {progress.completed && (
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Star className="h-4 w-4 fill-current" />
                        Completed!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* AI Tutor Widget */}
      <AITutorWidget 
        lessonContext={{
          title: lessonMeta.title,
          topic: lessonMeta.topics[0] || 'General',
          currentTime: progress?.currentTime
        }}
      />
    </div>
  );
}