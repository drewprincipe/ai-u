import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "@/services/mockCourseService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Clock, 
  Users, 
  Star, 
  PlayCircle, 
  BookOpen, 
  FileText, 
  CheckCircle2,
  Lock,
  Award,
  Calendar,
  User
} from "lucide-react";

export default function Course() {
  const { courseId } = useParams<{ courseId: string }>();
  
  console.log('Course component - courseId:', courseId);
  
  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => {
      console.log('Fetching course with ID:', courseId);
      return getCourse(courseId!);
    },
    enabled: !!courseId,
    retry: false, // Don't retry on error for debugging
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    console.log('Course error:', error);
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Course Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The course you're looking for doesn't exist. Course ID: {courseId}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Available course: data-science-fundamentals
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Current URL courseId: "{courseId}" (should not be ":courseId")
        </p>
        <Button asChild>
          <a href="/course/data-science-fundamentals">
            Try Demo Course
          </a>
        </Button>
      </div>
    );
  }

  const completedLessons = course.modules.reduce((total, module) => 
    total + module.lessons.filter(lesson => lesson.isCompleted).length, 0
  );
  const completedAssessments = course.modules.reduce((total, module) => 
    total + module.assessments.filter(assessment => assessment.isCompleted).length, 0
  );
  const completedAssignments = course.modules.reduce((total, module) => 
    total + module.assignments.filter(assignment => assignment.isSubmitted).length, 0
  );

  const overallProgress = Math.round(
    ((completedLessons + completedAssessments + completedAssignments) / 
     (course.totalLessons + course.totalAssessments + course.totalAssignments)) * 100
  );

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      case 'interactive': return <FileText className="h-4 w-4" />;
      case 'quiz': return <Award className="h-4 w-4" />;
      case 'exam': return <Award className="h-4 w-4" />;
      case 'practice': return <Award className="h-4 w-4" />;
      case 'project': return <FileText className="h-4 w-4" />;
      case 'essay': return <FileText className="h-4 w-4" />;
      case 'coding': return <FileText className="h-4 w-4" />;
      case 'presentation': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant="outline">{course.duration}</Badge>
                </div>
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    {overallProgress}% complete • {completedLessons} of {course.totalLessons} lessons completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={overallProgress} className="mb-4" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{completedLessons}/{course.totalLessons}</div>
                      <div className="text-sm text-muted-foreground">Lessons</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{completedAssessments}/{course.totalAssessments}</div>
                      <div className="text-sm text-muted-foreground">Assessments</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{completedAssignments}/{course.totalAssignments}</div>
                      <div className="text-sm text-muted-foreground">Assignments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary mb-2">{course.price}</div>
                  </div>
                  <Button className="w-full mb-4" variant="hero" size="lg">
                    Continue Learning
                  </Button>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modules:</span>
                      <span className="font-medium">{course.modules.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              {course.modules.length} modules • {course.totalLessons} lessons • {course.totalAssessments} assessments • {course.totalAssignments} assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {course.modules.map((module) => (
                <AccordionItem key={module.id} value={module.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      {module.isLocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      )}
                      <div>
                        <div className="font-semibold">{module.title}</div>
                        <div className="text-sm text-muted-foreground">{module.description}</div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{module.lessons.length} lessons</span>
                          <span>{module.assessments.length} assessments</span>
                          <span>{module.assignments.length} assignments</span>
                          <span>{module.duration}</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {/* Lessons */}
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-shrink-0">
                            {lesson.isLocked ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : lesson.isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              getContentIcon(lesson.type)
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${lesson.isLocked ? 'text-muted-foreground' : ''}`}>
                                {lesson.title}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {lesson.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {lesson.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      ))}

                      {/* Assessments */}
                      {module.assessments.map((assessment) => (
                        <div key={assessment.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                          <div className="flex-shrink-0">
                            {assessment.isLocked ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : assessment.isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              <Award className="h-4 w-4 text-accent" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${assessment.isLocked ? 'text-muted-foreground' : ''}`}>
                                {assessment.title}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {assessment.type}
                              </Badge>
                              {assessment.score && (
                                <Badge variant="outline" className="text-xs">
                                  {assessment.score}%
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {assessment.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span>{assessment.questions} questions</span>
                              <span>{assessment.timeLimit}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Assignments */}
                      {module.assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                          <div className="flex-shrink-0">
                            {assignment.isLocked ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : assignment.isSubmitted ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              getContentIcon(assignment.type)
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${assignment.isLocked ? 'text-muted-foreground' : ''}`}>
                                {assignment.title}
                              </span>
                              <Badge variant="default" className="text-xs">
                                {assignment.type}
                              </Badge>
                              {assignment.grade && (
                                <Badge variant="outline" className="text-xs">
                                  Grade: {assignment.grade}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {assignment.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>Due: {assignment.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}