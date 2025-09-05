import { LessonVideo, TranscriptSegment, InteractivePoint, UserNote, VideoProgress, LessonMeta } from '@/types/lesson';

// Mock video URL - in production this would come from your content generation system
const MOCK_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const mockTranscript: TranscriptSegment[] = [
  {
    id: "1",
    startTime: 0,
    endTime: 15,
    text: "Welcome to Introduction to Data Science. In this lesson, we'll explore the fundamentals of data analysis and statistical thinking.",
    speaker: "Dr. Sarah Chen"
  },
  {
    id: "2", 
    startTime: 15,
    endTime: 35,
    text: "Data science combines statistical analysis, machine learning, and domain expertise to extract meaningful insights from data.",
    speaker: "Dr. Sarah Chen"
  },
  {
    id: "3",
    startTime: 35,
    endTime: 60,
    text: "Let's start by understanding what makes data science different from traditional statistics and computer science approaches.",
    speaker: "Dr. Sarah Chen"
  },
  {
    id: "4",
    startTime: 60,
    endTime: 90,
    text: "The data science process typically involves five key stages: Define, Collect, Clean, Analyze, and Communicate.",
    speaker: "Dr. Sarah Chen"
  }
];

const mockInteractivePoints: InteractivePoint[] = [
  {
    id: "quiz-1",
    timestamp: 30,
    type: "quiz",
    title: "Quick Check: Data Science Definition",
    content: "What are the three main components of data science?",
    options: [
      "Statistics, Machine Learning, Domain Expertise",
      "Python, R, SQL",
      "Data, Models, Visualizations", 
      "Collection, Analysis, Reporting"
    ],
    correctAnswer: 0
  },
  {
    id: "reflection-1",
    timestamp: 75,
    type: "reflection",
    title: "Think About It",
    content: "Can you think of a real-world problem in your field that could benefit from data science? Take a moment to consider the data you might need and the insights you'd want to discover."
  }
];

export const mockLessonVideo: LessonVideo = {
  id: "lesson-ds-101",
  title: "Introduction to Data Science Fundamentals",
  description: "Learn the core concepts that define data science and understand how it differs from traditional analytical approaches.",
  videoUrl: MOCK_VIDEO_URL,
  duration: 1200, // 20 minutes
  thumbnail: "/api/placeholder/800/450",
  transcript: mockTranscript,
  interactivePoints: mockInteractivePoints,
  quality: [
    { label: "Auto", value: "auto", url: MOCK_VIDEO_URL },
    { label: "1080p", value: "1080", url: MOCK_VIDEO_URL },
    { label: "720p", value: "720", url: MOCK_VIDEO_URL },
    { label: "480p", value: "480", url: MOCK_VIDEO_URL }
  ]
};

export const mockLessonMeta: LessonMeta = {
  id: "lesson-ds-101", 
  courseId: "course-data-science",
  title: "Introduction to Data Science Fundamentals",
  description: "Learn the core concepts that define data science and understand how it differs from traditional analytical approaches.",
  order: 1,
  estimatedDuration: 1200,
  difficulty: "beginner",
  topics: ["Data Science", "Statistics", "Machine Learning", "Analytics"],
  prerequisites: ["Basic Mathematics", "Logical Thinking"],
  learningObjectives: [
    "Define data science and its key components",
    "Understand the data science process",
    "Identify real-world applications of data science",
    "Distinguish data science from traditional analytics"
  ]
};

// Mock service functions
export const getLessonVideo = async (lessonId: string): Promise<LessonVideo> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockLessonVideo;
};

export const getLessonMeta = async (lessonId: string): Promise<LessonMeta> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockLessonMeta;
};

export const saveVideoProgress = async (progress: VideoProgress): Promise<void> => {
  // In production, this would save to your backend
  console.log('Saving video progress:', progress);
  localStorage.setItem(`video-progress-${progress.lessonId}`, JSON.stringify(progress));
};

export const getVideoProgress = async (lessonId: string): Promise<VideoProgress | null> => {
  const saved = localStorage.getItem(`video-progress-${lessonId}`);
  return saved ? JSON.parse(saved) : null;
};

export const saveUserNote = async (note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserNote> => {
  const newNote: UserNote = {
    ...note,
    id: `note-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const existingNotes = getUserNotes(note.lessonId);
  const notes = [...(await existingNotes), newNote];
  localStorage.setItem(`lesson-notes-${note.lessonId}`, JSON.stringify(notes));
  
  return newNote;
};

export const getUserNotes = async (lessonId: string): Promise<UserNote[]> => {
  const saved = localStorage.getItem(`lesson-notes-${lessonId}`);
  return saved ? JSON.parse(saved) : [];
};