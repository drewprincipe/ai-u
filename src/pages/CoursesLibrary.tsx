import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses, searchCourses, departments, gradeLevels } from "@/services/mockCourseService";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Users, 
  Star,
  GraduationCap,
  ArrowLeft
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CoursesLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("All Grade Levels");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses', debouncedQuery, selectedDepartment, selectedGradeLevel],
    queryFn: () => searchCourses(debouncedQuery, selectedDepartment, selectedGradeLevel),
  });

  const { data: allCourses } = useQuery({
    queryKey: ['all-courses'],
    queryFn: getAllCourses,
  });

  const totalStudents = allCourses?.reduce((sum, course) => sum + course.students, 0) || 0;
  const averageRating = allCourses?.reduce((sum, course) => sum + course.rating, 0) / (allCourses?.length || 1) || 0;

  if (isLoading && !courses) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Course Library</h1>
                <p className="text-muted-foreground">
                  Discover and enroll in world-class courses
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-lg shadow-lg"></div>
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">AI University</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Courses</p>
                    <p className="text-2xl font-bold">{allCourses?.length || 0}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Students Enrolled</p>
                    <p className="text-2xl font-bold">{totalStudents.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                  </div>
                  <Star className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Departments</p>
                    <p className="text-2xl font-bold">{departments.length - 1}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full md:w-64">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedGradeLevel} onValueChange={setSelectedGradeLevel}>
                <SelectTrigger className="w-full md:w-64">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedDepartment !== "All Departments" || selectedGradeLevel !== "All Grade Levels") && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedDepartment !== "All Departments" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedDepartment}
                  <button
                    onClick={() => setSelectedDepartment("All Departments")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedGradeLevel !== "All Grade Levels" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedGradeLevel}
                  <button
                    onClick={() => setSelectedGradeLevel("All Grade Levels")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Failed to load courses</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {courses && courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or explore different departments
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedDepartment("All Departments");
                setSelectedGradeLevel("All Grade Levels");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {courses && courses.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {courses.length} course{courses.length !== 1 ? 's' : ''} found
                </h2>
                {(searchQuery || selectedDepartment !== "All Departments" || selectedGradeLevel !== "All Grade Levels") && (
                  <p className="text-muted-foreground">
                    Showing results for your search criteria
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  courseId={course.id}
                  title={course.title}
                  description={course.description}
                  image={course.imageUrl}
                  duration={course.duration}
                  students={course.students}
                  rating={course.rating}
                  level={course.level}
                  gradeLevel={course.gradeLevel}
                  price={course.price}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}