import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Glassy gradient background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-accent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-[1px]"></div>
      </div>

      {/* Floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-gradient-primary rounded-full animate-gentle-float opacity-60"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-gradient-secondary rounded-full animate-gentle-float opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-gradient-accent rounded-full animate-gentle-float opacity-70" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-16 max-w-6xl mx-auto">
          
          {/* Brand */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-4 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-lg opacity-60"></div>
                <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
              <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI University
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="block mb-4">
                <span className="text-foreground">Learn without </span>
                <span className="bg-gradient-primary bg-clip-text text-transparent">limits</span>
              </span>
              <span className="block text-foreground">
                Powered by <span className="text-primary">AI</span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Experience the future of education with personalized AI tutoring, 
              adaptive curricula, and immersive learning that evolves with you.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-16 py-8 h-auto bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 rounded-full border-0 text-white font-semibold"
              onClick={() => navigate("/auth")}
            >
              Start Learning
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-16 py-8 h-auto hover:scale-105 transition-all duration-300 rounded-full bg-white/5 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/10"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="h-5 w-5 mr-3" />
              Sign In
            </Button>
          </div>

          {/* Stats with Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:border-white/30 transition-all">
                <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">1M+</div>
                <div className="text-muted-foreground font-medium">Students Worldwide</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-secondary rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:border-white/30 transition-all">
                <div className="text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-3">4.9★</div>
                <div className="text-muted-foreground font-medium">Average Rating</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-accent rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:border-white/30 transition-all">
                <div className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-3">500+</div>
                <div className="text-muted-foreground font-medium">Courses Available</div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="pt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-muted-foreground font-light text-lg">
              Where intelligence meets imagination • The future of learning is here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;