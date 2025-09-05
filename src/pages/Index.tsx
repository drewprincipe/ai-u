import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-16 max-w-6xl mx-auto">
          
          {/* Brand */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-4 mb-12">
              <div className="relative">
                <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
              </div>
              <span className="text-5xl font-bold text-foreground">
                AI University
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
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
              className="text-lg px-16 py-8 h-auto hover:scale-105 transition-all duration-300 rounded-full font-semibold"
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
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-primary/20 transition-all">
                <div className="text-4xl font-bold text-primary mb-3">1M+</div>
                <div className="text-muted-foreground font-medium">Students Worldwide</div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/20 transition-all">
                <div className="text-4xl font-bold text-foreground mb-3">4.9★</div>
                <div className="text-muted-foreground font-medium">Average Rating</div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/20 transition-all">
                <div className="text-4xl font-bold text-foreground mb-3">500+</div>
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