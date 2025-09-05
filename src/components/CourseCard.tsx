import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  gradeLevel: 'K-5' | '6-8' | 'High School' | 'College' | 'Graduate' | 'Professional';
  price?: string;
  courseId?: string;
}

export function CourseCard({
  title,
  description,
  image,
  duration,
  students,
  rating,
  level,
  gradeLevel,
  price,
  courseId
}: CourseCardProps) {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge 
            variant={level === "Beginner" ? "secondary" : level === "Intermediate" ? "default" : "destructive"}
            className="shadow-md"
          >
            {level}
          </Badge>
          <Badge variant="outline" className="bg-background/80 shadow-md">
            {gradeLevel}
          </Badge>
        </div>
        {price && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-accent text-accent-foreground shadow-md">
              {price}
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span>{rating}</span>
          </div>
        </div>
        
        {courseId ? (
          <Button asChild className="w-full" variant="hero">
            <Link to={`/course/${courseId}`}>
              Start Learning
            </Link>
          </Button>
        ) : (
          <Button className="w-full" variant="hero">
            Start Learning
          </Button>
        )}
      </CardContent>
    </Card>
  );
}