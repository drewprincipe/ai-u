import { Button } from "@/components/ui/button";
import { Brain, Sparkles, ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Clean Gradient Background */}
      <div className="fixed inset-0 bg-gradient-hero opacity-10"></div>
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-5xl mx-auto">
          
          {/* Brand */}
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow animate-gentle-float">
                <Brain className="h-10 w-10 text-primary-foreground" />
              </div>
              <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">AI University</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-7xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">Learn</span>
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Anything</span>
              <br />
              <span className="text-foreground">Master</span>
              <span className="bg-gradient-secondary bg-clip-text text-transparent"> Everything</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Your personal AI-powered university that adapts to your goals, learns your style, and accelerates your success through cutting-edge technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-12 py-6 h-auto shadow-glow hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              <Sparkles className="h-6 w-6 mr-3" />
              Start Your Journey
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            
            <Button 
              variant="hero-outline" 
              size="lg" 
              className="text-lg px-12 py-6 h-auto hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="h-5 w-5 mr-3" />
              Sign In
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-16 pt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">50,000+</div>
              <div className="text-muted-foreground font-medium">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">4.9/5</div>
              <div className="text-muted-foreground font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">100+</div>
              <div className="text-muted-foreground font-medium">Subjects</div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-muted-foreground font-light">
              Welcome to the future of learning • Est. 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;