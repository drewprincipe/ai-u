export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  gradeLevel: 'K-5' | '6-8' | 'High School' | 'College' | 'Graduate' | 'Professional';
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
  id: "physics-101",
  title: "Physics 101: Mechanics and Motion",
  description: "Introduction to classical physics covering Newton's laws, kinematics, dynamics, energy, and momentum. Perfect for college-bound students.",
  imageUrl: "/src/assets/course-physics.jpg",
  instructor: "Prof. Richard Feynman",
  duration: "16 weeks",
  level: "Beginner",
  gradeLevel: "College",
  rating: 4.9,
  students: 24580,
  price: "Free",
  department: "Physics",
  tags: ["Physics", "Mechanics", "Newton's Laws", "Energy", "Laboratory"],
  totalLessons: 32,
  totalAssessments: 12,
  totalAssignments: 8,
  modules: [
    {
      id: "module-1",
      title: "Introduction to Physics",
      description: "Fundamental concepts of physics and the scientific method.",
      order: 1,
      duration: "2 weeks",
      isLocked: false,
      lessons: [
        {
          id: "lesson-1-1",
          title: "What is Physics?",
          description: "Overview of physics and its applications in the real world.",
          type: "video",
          duration: "25 min",
          isCompleted: true,
          isLocked: false,
          order: 1
        },
        {
          id: "lesson-1-2",
          title: "Scientific Method",
          description: "Understanding how physics discoveries are made.",
          type: "interactive",
          duration: "45 min",
          isCompleted: true,
          isLocked: false,
          order: 2
        },
        {
          id: "lesson-1-3",
          title: "Units and Measurements",
          description: "Standard units and measurement techniques in physics.",
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
          title: "Physics Basics Quiz",
          description: "Test your understanding of fundamental physics concepts.",
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
          title: "Measurement Lab Report",
          description: "Conduct measurements and analyze uncertainty.",
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
      title: "Motion and Kinematics",
      description: "Study of motion without considering forces.",
      order: 2,
      duration: "3 weeks",
      isLocked: false,
      lessons: [
        {
          id: "lesson-2-1",
          title: "Position and Displacement",
          description: "Understanding position vectors and displacement.",
          type: "video",
          duration: "40 min",
          isCompleted: false,
          isLocked: false,
          order: 1
        },
        {
          id: "lesson-2-2",
          title: "Velocity and Acceleration",
          description: "Concepts of velocity and acceleration in motion.",
          type: "interactive",
          duration: "60 min",
          isCompleted: false,
          isLocked: false,
          order: 2
        }
      ],
      assessments: [
        {
          id: "assessment-2-1",
          title: "Kinematics Test",
          description: "Comprehensive test on motion concepts.",
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
          title: "Motion Analysis Project",
          description: "Analyze motion in real-world scenarios.",
          type: "project",
          dueDate: "Week 5",
          isSubmitted: false,
          isLocked: false,
          order: 1
        }
      ]
    }
  ]
};

export const mockCourses: Course[] = [
  mockCourse,
  {
    id: "physics-101",
    title: "Physics 101: Mechanics and Motion",
    description: "Introduction to classical physics covering Newton's laws, kinematics, dynamics, energy, and momentum. Perfect for college-bound students.",
    imageUrl: "/src/assets/course-physics.jpg",
    instructor: "Prof. Richard Feynman",
    duration: "16 weeks",
    level: "Beginner",
    gradeLevel: "College",
    rating: 4.9,
    students: 24580,
    price: "Free",
    department: "Physics",
    tags: ["Physics", "Mechanics", "Newton's Laws", "Energy", "Laboratory"],
    totalLessons: 32,
    totalAssessments: 12,
    totalAssignments: 8,
    modules: []
  },
  {
    id: "calculus-1",
    title: "Calculus I: Limits and Derivatives",
    description: "Fundamental concepts of differential calculus including limits, continuity, derivatives, and applications to real-world problems.",
    imageUrl: "/src/assets/course-mathematics.jpg",
    instructor: "Dr. Marie Curie",
    duration: "14 weeks",
    level: "Intermediate",
    gradeLevel: "College",
    rating: 4.7,
    students: 31240,
    price: "Free",
    department: "Mathematics",
    tags: ["Calculus", "Limits", "Derivatives", "Functions", "Applications"],
    totalLessons: 28,
    totalAssessments: 10,
    totalAssignments: 6,
    modules: []
  },
  {
    id: "english-literature",
    title: "English Literature: Classical to Modern",
    description: "Explore masterworks of English literature from Shakespeare to contemporary authors. Develop critical thinking and writing skills.",
    imageUrl: "/src/assets/course-english.jpg",
    instructor: "Prof. Jane Austen",
    duration: "12 weeks",
    level: "Intermediate",
    gradeLevel: "High School",
    rating: 4.6,
    students: 18750,
    price: "Free",
    department: "English",
    tags: ["Literature", "Shakespeare", "Poetry", "Critical Analysis", "Writing"],
    totalLessons: 24,
    totalAssessments: 8,
    totalAssignments: 12,
    modules: []
  },
  {
    id: "chemistry-basics",
    title: "General Chemistry: Atoms and Molecules",
    description: "Introduction to chemical principles, atomic structure, periodic table, chemical bonding, and basic reactions.",
    imageUrl: "/src/assets/course-chemistry.jpg",
    instructor: "Dr. Dmitri Mendeleev",
    duration: "16 weeks",
    level: "Beginner",
    gradeLevel: "High School",
    rating: 4.8,
    students: 22140,
    price: "Free",
    department: "Chemistry",
    tags: ["Chemistry", "Atoms", "Periodic Table", "Chemical Bonds", "Reactions"],
    totalLessons: 32,
    totalAssessments: 12,
    totalAssignments: 10,
    modules: []
  },
  {
    id: "world-history",
    title: "World History: Ancient to Modern",
    description: "Comprehensive survey of world civilizations from ancient times to the present day, focusing on cultural, political, and social developments.",
    imageUrl: "/src/assets/course-history.jpg",
    instructor: "Prof. Howard Zinn",
    duration: "18 weeks",
    level: "Beginner",
    gradeLevel: "High School",
    rating: 4.5,
    students: 27890,
    price: "Free",
    department: "History",
    tags: ["History", "Civilizations", "Culture", "Politics", "Social Studies"],
    totalLessons: 36,
    totalAssessments: 14,
    totalAssignments: 8,
    modules: []
  },
  {
    id: "biology-fundamentals",
    title: "Biology: Life Sciences Foundation",
    description: "Explore the fundamentals of life including cell biology, genetics, evolution, ecology, and human anatomy and physiology.",
    imageUrl: "/src/assets/course-biology.jpg",
    instructor: "Dr. Charles Darwin",
    duration: "16 weeks",
    level: "Beginner",
    gradeLevel: "High School",
    rating: 4.7,
    students: 25630,
    price: "Free",
    department: "Biology",
    tags: ["Biology", "Cells", "Genetics", "Evolution", "Ecology", "Human Body"],
    totalLessons: 32,
    totalAssessments: 12,
    totalAssignments: 8,
    modules: []
  },
  {
    id: "elementary-math",
    title: "Elementary Mathematics: Building Strong Foundations",
    description: "Essential math skills for elementary students including arithmetic, fractions, decimals, geometry, and problem-solving strategies.",
    imageUrl: "/src/assets/course-elementary-math.jpg",
    instructor: "Ms. Maria Montessori",
    duration: "20 weeks",
    level: "Beginner",
    gradeLevel: "K-5",
    rating: 4.9,
    students: 15420,
    price: "Free",
    department: "Mathematics",
    tags: ["Elementary Math", "Arithmetic", "Fractions", "Geometry", "Problem Solving"],
    totalLessons: 40,
    totalAssessments: 16,
    totalAssignments: 12,
    modules: []
  },
  {
    id: "middle-school-science",
    title: "Middle School Science Explorer",
    description: "Engaging introduction to physical science, earth science, and life science designed specifically for middle school students.",
    imageUrl: "/src/assets/course-science.jpg",
    instructor: "Dr. Bill Nye",
    duration: "18 weeks",
    level: "Beginner",
    gradeLevel: "6-8",
    rating: 4.8,
    students: 19850,
    price: "Free",
    department: "Science",
    tags: ["Middle School", "Physical Science", "Earth Science", "Life Science", "Experiments"],
    totalLessons: 36,
    totalAssessments: 14,
    totalAssignments: 10,
    modules: []
  },
  {
    id: "advanced-calculus",
    title: "Advanced Calculus: Multivariable and Vector",
    description: "Advanced topics in calculus including multivariable functions, vector calculus, line and surface integrals, and applications in physics and engineering.",
    imageUrl: "/src/assets/course-mathematics.jpg",
    instructor: "Prof. Leonhard Euler",
    duration: "16 weeks",
    level: "Advanced",
    gradeLevel: "Graduate",
    rating: 4.6,
    students: 8920,
    price: "$199",
    department: "Mathematics",
    tags: ["Advanced Calculus", "Multivariable", "Vector Calculus", "Integrals", "Engineering"],
    totalLessons: 32,
    totalAssessments: 12,
    totalAssignments: 8,
    modules: []
  },
  {
    id: "organic-chemistry",
    title: "Organic Chemistry: Structure and Reactions",
    description: "Comprehensive study of organic molecules, reaction mechanisms, synthesis strategies, and applications in biochemistry and medicine.",
    imageUrl: "/src/assets/course-chemistry.jpg",
    instructor: "Dr. Linus Pauling",
    duration: "20 weeks",
    level: "Advanced",
    gradeLevel: "College",
    rating: 4.4,
    students: 12750,
    price: "$149",
    department: "Chemistry",
    tags: ["Organic Chemistry", "Molecules", "Reactions", "Synthesis", "Biochemistry"],
    totalLessons: 40,
    totalAssessments: 16,
    totalAssignments: 12,
    modules: []
  }
];

export const departments = [
  "All Departments",
  "Physics",
  "Mathematics",
  "English",
  "Chemistry",
  "History",
  "Biology",
  "Science"
];

export const gradeLevels = [
  "All Grade Levels",
  "K-5",
  "6-8", 
  "High School",
  "College",
  "Graduate",
  "Professional"
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

export async function searchCourses(query: string, department?: string, gradeLevel?: string): Promise<Course[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredCourses = mockCourses;
  
  // Filter by department
  if (department && department !== "All Departments") {
    filteredCourses = filteredCourses.filter(course => 
      course.department === department
    );
  }

  // Filter by grade level
  if (gradeLevel && gradeLevel !== "All Grade Levels") {
    filteredCourses = filteredCourses.filter(course => 
      course.gradeLevel === gradeLevel
    );
  }
  
  // Filter by search query
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      course.level.toLowerCase().includes(searchTerm) ||
      course.gradeLevel.toLowerCase().includes(searchTerm)
    );
  }
  
  return filteredCourses;
}