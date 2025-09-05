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
  department: string;
  tags: string[];
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
  department: "Data Science",
  tags: ["Python", "Statistics", "Machine Learning", "Data Analysis", "Visualization"],
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

export const mockCourses: Course[] = [
  mockCourse,
  {
    id: "python-programming",
    title: "Complete Python Programming",
    description: "Learn Python from scratch to advanced concepts. Perfect for beginners and those looking to strengthen their programming foundation.",
    imageUrl: "/src/assets/course-python.jpg",
    instructor: "Mark Johnson",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.7,
    students: 28340,
    price: "Free",
    department: "Programming",
    tags: ["Python", "Programming", "Basics", "Syntax", "Projects"],
    totalLessons: 16,
    totalAssessments: 6,
    totalAssignments: 4,
    modules: []
  },
  {
    id: "web-development-bootcamp",
    title: "Full Stack Web Development",
    description: "Build modern web applications using React, Node.js, and databases. Create real-world projects from frontend to backend.",
    imageUrl: "/src/assets/hero-education.jpg",
    instructor: "Lisa Rodriguez",
    duration: "16 weeks",
    level: "Intermediate",
    rating: 4.9,
    students: 12580,
    price: "$299",
    department: "Web Development",
    tags: ["React", "Node.js", "JavaScript", "Full Stack", "Database"],
    totalLessons: 32,
    totalAssessments: 12,
    totalAssignments: 8,
    modules: []
  },
  {
    id: "machine-learning-advanced",
    title: "Advanced Machine Learning",
    description: "Deep dive into advanced ML algorithms, neural networks, and AI applications. Includes hands-on projects with real datasets.",
    imageUrl: "/src/assets/course-data-science.jpg",
    instructor: "Dr. Alex Kumar",
    duration: "14 weeks",
    level: "Advanced",
    rating: 4.8,
    students: 8920,
    price: "$199",
    department: "Data Science",
    tags: ["Machine Learning", "Neural Networks", "Deep Learning", "AI", "TensorFlow"],
    totalLessons: 28,
    totalAssessments: 10,
    totalAssignments: 6,
    modules: []
  },
  {
    id: "business-analytics",
    title: "Business Analytics & Intelligence",
    description: "Learn to analyze business data, create dashboards, and make data-driven decisions using modern BI tools.",
    imageUrl: "/src/assets/hero-education.jpg",
    instructor: "Jennifer Walsh",
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.6,
    students: 15670,
    price: "$149",
    department: "Business",
    tags: ["Analytics", "Business Intelligence", "Dashboards", "Excel", "Tableau"],
    totalLessons: 20,
    totalAssessments: 8,
    totalAssignments: 5,
    modules: []
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    description: "Protect digital assets and understand security threats. Learn ethical hacking, network security, and risk management.",
    imageUrl: "/src/assets/course-python.jpg",
    instructor: "Robert Kim",
    duration: "12 weeks",
    level: "Beginner",
    rating: 4.7,
    students: 9850,
    price: "$99",
    department: "Cybersecurity",
    tags: ["Security", "Network", "Ethical Hacking", "Risk Management", "Compliance"],
    totalLessons: 24,
    totalAssessments: 9,
    totalAssignments: 6,
    modules: []
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications for iOS and Android using React Native and modern development tools.",
    imageUrl: "/src/assets/hero-education.jpg",
    instructor: "David Park",
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.8,
    students: 11240,
    price: "$179",
    department: "Mobile Development",
    tags: ["React Native", "Mobile", "iOS", "Android", "Cross-platform"],
    totalLessons: 22,
    totalAssessments: 8,
    totalAssignments: 5,
    modules: []
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Mastery",
    description: "Master SEO, social media marketing, content strategy, and analytics to grow your online presence and business.",
    imageUrl: "/src/assets/course-data-science.jpg",
    instructor: "Emma Thompson",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.5,
    students: 18990,
    price: "$89",
    department: "Marketing",
    tags: ["SEO", "Social Media", "Content Marketing", "Analytics", "Strategy"],
    totalLessons: 16,
    totalAssessments: 6,
    totalAssignments: 4,
    modules: []
  },
  {
    id: "cloud-computing-aws",
    title: "AWS Cloud Computing",
    description: "Learn Amazon Web Services from basics to advanced. Deploy scalable applications and master cloud architecture.",
    imageUrl: "/src/assets/course-python.jpg",
    instructor: "Michael Chang",
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.7,
    students: 13450,
    price: "$199",
    department: "Cloud Computing",
    tags: ["AWS", "Cloud", "DevOps", "Infrastructure", "Serverless"],
    totalLessons: 26,
    totalAssessments: 10,
    totalAssignments: 7,
    modules: []
  }
];

export const departments = [
  "All Departments",
  "Data Science",
  "Programming", 
  "Web Development",
  "Mobile Development",
  "Business",
  "Cybersecurity",
  "Marketing",
  "Cloud Computing"
];

export async function getCourse(courseId: string): Promise<Course> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) {
    throw new Error('Course not found');
  }
  
  return course;
}

export async function getAllCourses(): Promise<Course[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCourses;
}

export async function searchCourses(query: string, department?: string): Promise<Course[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredCourses = mockCourses;
  
  // Filter by department
  if (department && department !== "All Departments") {
    filteredCourses = filteredCourses.filter(course => 
      course.department === department
    );
  }
  
  // Filter by search query
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  return filteredCourses;
}