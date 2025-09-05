import { Button } from "@/components/ui/button";
import { Brain, Sparkles, ArrowRight, LogIn, BookOpen, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DoodleArrow, DoodleUnderline, DoodleStar, BookDoodle, LightbulbDoodle, PencilDoodle, DoodleCircle } from "@/components/DoodleElements";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-hero opacity-5"></div>
      <div className="fixed inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-accent rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Educational Doodles */}
      <div className="fixed inset-0 pointer-events-none">
        <BookDoodle className="absolute top-32 left-16 w-12 h-12 text-primary/30 wiggle" />
        <LightbulbDoodle className="absolute top-40 right-32 w-10 h-10 text-accent/40 bounce-soft" />
        <PencilDoodle className="absolute bottom-32 left-32 w-8 h-8 text-secondary/50 wiggle" />
        <DoodleStar className="absolute top-64 right-16 w-6 h-6 text-primary/40" />
        <DoodleCircle className="absolute bottom-48 right-48 w-16 h-16 text-accent/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Logo & Brand */}
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-primary rounded-2xl animate-scale-in">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold">AI University</span>
            </div>
            
            {/* Handwritten tagline */}
            <div className="relative">
              <p className="handwritten text-lg text-primary/70 -rotate-1">
                Where Learning Meets Magic ✨
              </p>
              <DoodleUnderline className="text-accent/60" />
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="relative inline-block">
                Learn
                <DoodleUnderline className="text-primary/40" />
              </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Anything</span>
              <br />
              <span className="relative inline-block">
                Master
                <DoodleStar className="absolute -top-2 -right-8 w-8 h-8 text-accent" />
              </span>
              <span className="bg-gradient-secondary bg-clip-text text-transparent"> Everything</span>
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your personal AI-powered university that adapts to your goals, 
              learns your style, and accelerates your success.
            </p>

            {/* Handwritten note */}
            <div className="relative pt-4">
              <p className="doodle-text text-accent rotate-2 text-lg">
                No boring lectures here! 🎓
              </p>
              <DoodleArrow className="absolute -right-16 top-6 w-16 h-4 text-accent/60 rotate-12" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto hover-scale transition-all duration-300"
                onClick={() => navigate("/auth")}
              >
                <Sparkles className="h-6 w-6 mr-3" />
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
              {/* Handwritten encouragement */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <p className="sketch-text text-sm text-primary/60 rotate-1 whitespace-nowrap">
                  It's free to start! 🚀
                </p>
              </div>
            </div>
            
            <Button 
              variant="hero-outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto hover-scale transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="h-5 w-5 mr-3" />
              Sign In
            </Button>
          </div>

          {/* Stats with doodles */}
          <div className="flex flex-wrap justify-center gap-8 pt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center relative">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
              <Users className="absolute -top-6 -right-4 w-5 h-5 text-primary/30" />
            </div>
            <div className="text-center relative">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
              <Star className="absolute -top-6 -right-4 w-5 h-5 text-accent/40 fill-current" />
            </div>
            <div className="text-center relative">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Subjects</div>
              <BookOpen className="absolute -top-6 -right-4 w-5 h-5 text-secondary/40" />
            </div>
          </div>

          {/* Final tagline with doodle */}
          <div className="pt-8 animate-fade-in relative" style={{ animationDelay: '0.8s' }}>
            <p className="text-lg text-muted-foreground">
              Welcome to the future of learning
            </p>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <p className="handwritten-bold text-accent -rotate-3 text-sm">
                Join the revolution! 🌟
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;