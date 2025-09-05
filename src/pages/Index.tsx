import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Liquid glass background layers */}
      <div className="fixed inset-0">
        {/* Base glass layer with heavy blur */}
        <div className="absolute inset-0 bg-white/[0.15] backdrop-blur-[20px]"></div>
        
        {/* Secondary glass layer for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.25] via-white/[0.05] to-white/[0.20] backdrop-blur-[12px]"></div>
        
        {/* Depth elements with liquid glass effect */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/[0.12] rounded-full blur-2xl backdrop-blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/[0.08] rounded-full blur-2xl backdrop-blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-white/[0.06] rounded-full blur-3xl backdrop-blur-sm"></div>
        
        {/* Specular highlights for liquid glass effect */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/[0.3] rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-white/[0.25] rounded-full blur-lg"></div>
        
        {/* Final translucent overlay */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[8px]"></div>
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
              <span className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                AI University
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="block mb-4">
                <span className="text-white">Learn without </span>
                <span className="bg-gradient-to-r from-blue-100 via-white to-blue-200 bg-clip-text text-transparent">limits</span>
              </span>
              <span className="block text-white">
                Powered by <span className="text-blue-100">AI</span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Experience the future of education with personalized AI tutoring, 
              adaptive curricula, and immersive learning that evolves with you.
            </p>
          </div>

          {/* CTA Buttons with Liquid Glass Effect */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative group">
              {/* Primary Button - Liquid Glass */}
              <div className="absolute inset-0 bg-white/[0.25] rounded-full blur-md group-hover:bg-white/[0.35] transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.4] via-transparent to-white/[0.15] rounded-full"></div>
              <div className="absolute top-2 left-4 w-8 h-4 bg-white/[0.6] rounded-full blur-sm"></div>
              <Button 
                size="lg" 
                className="relative text-lg px-16 py-8 h-auto bg-white/[0.2] backdrop-blur-[20px] hover:bg-white/[0.25] hover:scale-105 transition-all duration-300 rounded-full border border-white/[0.3] text-white font-semibold shadow-2xl"
                onClick={() => navigate("/auth")}
              >
                Start Learning
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
            </div>
            
            <div className="relative group">
              {/* Secondary Button - Liquid Glass */}
              <div className="absolute inset-0 bg-white/[0.15] rounded-full blur-md group-hover:bg-white/[0.25] transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.25] via-transparent to-white/[0.1] rounded-full"></div>
              <div className="absolute top-2 left-4 w-6 h-3 bg-white/[0.4] rounded-full blur-sm"></div>
              <Button 
                size="lg" 
                className="relative text-lg px-16 py-8 h-auto bg-white/[0.1] backdrop-blur-[20px] hover:bg-white/[0.15] hover:scale-105 transition-all duration-300 rounded-full border border-white/[0.2] text-white font-semibold shadow-2xl"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="h-5 w-5 mr-3" />
                Sign In
              </Button>
            </div>
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