import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { AITutorPreview } from "@/components/AITutorPreview";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Sparkles, 
  Users, 
  Globe, 
  Play, 
  ArrowRight, 
  BookOpen,
  Zap,
  Target,
  Star
} from "lucide-react";

import heroImage from "@/assets/hero-education.jpg";
import dataScienceImage from "@/assets/course-data-science.jpg";
import pythonImage from "@/assets/course-python.jpg";

const Index = () => {
  const courses = [
    {
      title: "Data Science Fundamentals",
      description: "Master the core concepts of data science with hands-on projects and real-world applications. Learn statistics, visualization, and machine learning basics.",
      image: dataScienceImage,
      duration: "8 weeks",
      students: 12500,
      rating: 4.8,
      level: "Beginner" as const,
      price: "Free"
    },
    {
      title: "Python Programming",
      description: "From variables to advanced algorithms, master Python programming with our interactive learning approach and AI-powered assistance.",
      image: pythonImage,
      duration: "6 weeks", 
      students: 23000,
      rating: 4.9,
      level: "Beginner" as const,
      price: "Premium"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Every lesson adapts to your learning style, pace, and goals for maximum effectiveness."
    },
    {
      icon: Sparkles,
      title: "24/7 AI Tutor",
      description: "Get instant help, explanations, and guidance whenever you need it, day or night."
    },
    {
      icon: BookOpen,
      title: "Hollywood-Quality Content",
      description: "Professional videos with stunning animations that make complex concepts crystal clear."
    },
    {
      icon: Target,
      title: "Goal-Oriented Learning",
      description: "Set your career goals and we'll create a personalized curriculum to get you there."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-6 w-6 text-primary" />
            AI University
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost">Courses</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Button variant="hero-outline" size="sm">Sign In</Button>
            <Button variant="hero" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered Learning Platform
                </Badge>
                <h1 className="text-5xl font-bold leading-tight">
                  Your Personal
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> AI University</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Transform your career with personalized education powered by AI. 
                  Learn anything, master everything, achieve your dreams.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="text-base">
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning Free
                </Button>
                <Button variant="hero-outline" size="lg" className="text-base">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Courses
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>50K+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Global Access</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <img 
                src={heroImage} 
                alt="AI University Learning Experience"
                className="relative rounded-3xl shadow-elegant w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">
              Why Choose <span className="text-primary">AI University</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of education with personalized AI tutoring, 
              adaptive curricula, and world-class content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="border-0 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
              <p className="text-xl text-muted-foreground">
                Start your learning journey with our most popular courses
              </p>
            </div>
            <Button variant="hero-outline">
              View All Courses
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <CourseCard key={i} {...course} />
            ))}
            
            {/* Coming Soon Card */}
            <Card className="border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full text-center p-8">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl mb-2">More Courses Coming</CardTitle>
                <CardDescription>
                  Machine Learning, Web Development, Mobile Apps, and 20+ more subjects launching soon!
                </CardDescription>
                <Button variant="ghost" className="mt-4 text-primary">
                  Get Notified
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Experience Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">
              Experience AI-Powered Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how our AI tutor and progress tracking work together to accelerate your learning
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AITutorPreview />
            <ProgressDashboard />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container relative text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of learners who are already achieving their career goals with AI University. 
              Start your personalized learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-base">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="hero-outline" size="lg" className="text-base">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Brain className="h-6 w-6 text-primary" />
                AI University
              </div>
              <p className="text-muted-foreground">
                Transforming education through personalized AI-powered learning experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Courses</div>
                <div>AI Tutor</div>
                <div>Progress Tracking</div>
                <div>Certifications</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Careers</div>
                <div>Blog</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Community</div>
                <div>Status</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 AI University. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;