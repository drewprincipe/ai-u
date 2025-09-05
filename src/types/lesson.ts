export interface LessonVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in seconds
  thumbnail: string;
  transcript: TranscriptSegment[];
  interactivePoints: InteractivePoint[];
  quality: VideoQuality[];
}

export interface TranscriptSegment {
  id: string;
  startTime: number; // in seconds
  endTime: number;
  text: string;
  speaker?: string;
}

export interface InteractivePoint {
  id: string;
  timestamp: number; // in seconds
  type: 'quiz' | 'note' | 'reflection' | 'practice';
  title: string;
  content: string;
  options?: string[]; // for quiz type
  correctAnswer?: number; // for quiz type
}

export interface VideoQuality {
  label: string;
  value: string;
  url: string;
}

export interface UserNote {
  id: string;
  lessonId: string;
  timestamp: number;
  content: string;
  title?: string;
  type?: 'key_concept' | 'example' | 'definition' | 'summary' | 'personal';
  isGenerated?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoProgress {
  lessonId: string;
  currentTime: number;
  completed: boolean;
  watchedSegments: Array<{
    start: number;
    end: number;
  }>;
  completionPercentage: number;
}

export interface LessonMeta {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  prerequisites: string[];
  learningObjectives: string[];
}