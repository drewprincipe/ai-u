import { Button } from "@/components/ui/button";
import { Brain, Sparkles, ArrowRight, LogIn } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-hero opacity-5"></div>
      <div className="fixed inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-accent rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
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
          </div>

          {/* Main Headline */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Learn
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Anything</span>
              <br />
              Master
              <span className="bg-gradient-secondary bg-clip-text text-transparent"> Everything</span>
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your personal AI-powered university that adapts to your goals, 
              learns your style, and accelerates your success.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto hover-scale transition-all duration-300"
            >
              <Sparkles className="h-6 w-6 mr-3" />
              Start Your Journey
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            
            <Button 
              variant="hero-outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto hover-scale transition-all duration-300"
            >
              <LogIn className="h-5 w-5 mr-3" />
              Sign In
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Subjects</div>
            </div>
          </div>

          {/* Tagline */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-lg text-muted-foreground">
              Welcome to the future of learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;