export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  price: string;
  modules: CourseModule[];
  totalLessons: number;
  totalAssessments: number;
  totalAssignments: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  isLocked: boolean;
  lessons: Lesson[];
  assessments: Assessment[];
  assignments: Assignment[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'interactive';
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  order: number;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'exam' | 'practice';
  questions: number;
  timeLimit: string;
  isCompleted: boolean;
  isLocked: boolean;
  score?: number;
  order: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'essay' | 'coding' | 'presentation';
  dueDate: string;
  isSubmitted: boolean;
  isLocked: boolean;
  grade?: string;
  order: number;
}

// Mock Data
export const mockCourse: Course = {
  id: "data-science-fundamentals",
  title: "Data Science Fundamentals",
  description: "Master the fundamentals of data science with hands-on projects, real-world datasets, and industry best practices. Learn Python, statistics, machine learning, and data visualization.",
  imageUrl: "/src/assets/course-data-science.jpg",
  instructor: "Dr. Sarah Chen",
  duration: "12 weeks",
  level: "Beginner",
  rating: 4.8,
  students: 15420,
  price: "Free",
  totalLessons: 24,
  totalAssessments: 8,
  totalAssignments: 6,
  modules: [
    {
      id: "module-1",
      title: "Introduction to Data Science",
      description: "Learn the fundamentals of data science and set up your development environment.",
      order: 1,
      duration: "2 weeks",
      isLocked: false,
      lessons: [
        {
          id: "lesson-1-1",
          title: "What is Data Science?",
          description: "Overview of data science, its applications, and career paths.",
          type: "video",
          duration: "25 min",
          isCompleted: true,
          isLocked: false,
          order: 1
        },
        {
          id: "lesson-1-2",
          title: "Setting Up Python Environment",
          description: "Install Python, Jupyter notebooks, and essential libraries.",
          type: "interactive",
          duration: "45 min",
          isCompleted: true,
          isLocked: false,
          order: 2
        },
        {
          id: "lesson-1-3",
          title: "Data Science Workflow",
          description: "Understanding the end-to-end data science process.",
          type: "reading",
          duration: "30 min",
          isCompleted: false,
          isLocked: false,
          order: 3
        }
      ],
      assessments: [
        {
          id: "assessment-1-1",
          title: "Introduction Quiz",
          description: "Test your understanding of data science basics.",
          type: "quiz",
          questions: 10,
          timeLimit: "15 min",
          isCompleted: true,
          isLocked: false,
          score: 85,
          order: 1
        }
      ],
      assignments: [
        {
          id: "assignment-1-1",
          title: "Environment Setup Report",
          description: "Submit screenshots of your Python environment setup.",
          type: "project",
          dueDate: "Week 2",
          isSubmitted: true,
          isLocked: false,
          grade: "A",
          order: 1
        }
      ]
    },
    {
      id: "module-2",
      title: "Python for Data Analysis",
      description: "Master Python programming fundamentals and data manipulation with pandas.",
      order: 2,
      duration: "3 weeks",
      isLocked: false,
      lessons: [
        {
          id: "lesson-2-1",
          title: "Python Basics Review",
          description: "Variables, data types, control structures, and functions.",
          type: "video",
          duration: "40 min",
          isCompleted: false,
          isLocked: false,
          order: 1
        },
        {
          id: "lesson-2-2",
          title: "Introduction to Pandas",
          description: "DataFrames, Series, and basic data operations.",
          type: "interactive",
          duration: "60 min",
          isCompleted: false,
          isLocked: false,
          order: 2
        },
        {
          id: "lesson-2-3",
          title: "Data Cleaning Techniques",
          description: "Handle missing data, outliers, and data transformation.",
          type: "video",
          duration: "50 min",
          isCompleted: false,
          isLocked: false,
          order: 3
        }
      ],
      assessments: [
        {
          id: "assessment-2-1",
          title: "Python Fundamentals Test",
          description: "Comprehensive test on Python programming basics.",
          type: "exam",
          questions: 25,
          timeLimit: "45 min",
          isCompleted: false,
          isLocked: false,
          order: 1
        }
      ],
      assignments: [
        {
          id: "assignment-2-1",
          title: "Data Cleaning Project",
          description: "Clean and analyze a messy dataset using pandas.",
          type: "coding",
          dueDate: "Week 5",
          isSubmitted: false,
          isLocked: false,
          order: 1
        }
      ]
    },
    {
      id: "module-3",
      title: "Statistics & Probability",
      description: "Essential statistical concepts for data science applications.",
      order: 3,
      duration: "2.5 weeks",
      isLocked: true,
      lessons: [
        {
          id: "lesson-3-1",
          title: "Descriptive Statistics",
          description: "Mean, median, mode, and measures of variability.",
          type: "video",
          duration: "35 min",
          isCompleted: false,
          isLocked: true,
          order: 1
        },
        {
          id: "lesson-3-2",
          title: "Probability Distributions",
          description: "Normal, binomial, and Poisson distributions.",
          type: "interactive",
          duration: "55 min",
          isCompleted: false,
          isLocked: true,
          order: 2
        }
      ],
      assessments: [
        {
          id: "assessment-3-1",
          title: "Statistics Quiz",
          description: "Test your knowledge of statistical concepts.",
          type: "quiz",
          questions: 15,
          timeLimit: "25 min",
          isCompleted: false,
          isLocked: true,
          order: 1
        }
      ],
      assignments: [
        {
          id: "assignment-3-1",
          title: "Statistical Analysis Report",
          description: "Analyze a dataset and write a statistical summary report.",
          type: "essay",
          dueDate: "Week 8",
          isSubmitted: false,
          isLocked: true,
          order: 1
        }
      ]
    },
    {
      id: "module-4",
      title: "Data Visualization",
      description: "Create compelling visualizations using matplotlib and seaborn.",
      order: 4,
      duration: "2 weeks",
      isLocked: true,
      lessons: [
        {
          id: "lesson-4-1",
          title: "Matplotlib Fundamentals",
          description: "Basic plotting with matplotlib library.",
          type: "video",
          duration: "45 min",
          isCompleted: false,
          isLocked: true,
          order: 1
        }
      ],
      assessments: [],
      assignments: [
        {
          id: "assignment-4-1",
          title: "Visualization Portfolio",
          description: "Create a portfolio of data visualizations.",
          type: "project",
          dueDate: "Week 10",
          isSubmitted: false,
          isLocked: true,
          order: 1
        }
      ]
    },
    {
      id: "module-5",
      title: "Machine Learning Basics",
      description: "Introduction to supervised and unsupervised learning algorithms.",
      order: 5,
      duration: "2.5 weeks",
      isLocked: true,
      lessons: [
        {
          id: "lesson-5-1",
          title: "Introduction to Machine Learning",
          description: "Types of ML algorithms and their applications.",
          type: "video",
          duration: "40 min",
          isCompleted: false,
          isLocked: true,
          order: 1
        }
      ],
      assessments: [
        {
          id: "assessment-5-1",
          title: "ML Concepts Exam",
          description: "Final exam covering machine learning fundamentals.",
          type: "exam",
          questions: 30,
          timeLimit: "60 min",
          isCompleted: false,
          isLocked: true,
          order: 1
        }
      ],
      assignments: [
        {
          id: "assignment-5-1",
          title: "Capstone Project",
          description: "End-to-end data science project with presentation.",
          type: "presentation",
          dueDate: "Week 12",
          isSubmitted: false,
          isLocked: true,
          order: 1
        }
      ]
    }
  ]
};

export async function getCourse(courseId: string): Promise<Course> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (courseId !== mockCourse.id) {
    throw new Error('Course not found');
  }
  
  return mockCourse;
}