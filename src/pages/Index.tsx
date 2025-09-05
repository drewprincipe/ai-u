import { Button } from "@/components/ui/button";
import { Brain, Sparkles, ArrowRight, LogIn, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RuledLines, PaperTexture, NotebookTab, AcademicBracket, HighlightBox } from "@/components/NotebookElements";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Notebook paper background */}
      <RuledLines />
      <PaperTexture />
      
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-hero opacity-5"></div>
      <div className="fixed inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-accent rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Notebook tabs */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        <NotebookTab text="Home" className="bg-primary/5" />
        <NotebookTab text="Courses" className="opacity-60" />
        <NotebookTab text="Progress" className="opacity-60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-12">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Logo & Brand */}
          <div className="academic-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-primary rounded-2xl animate-scale-in gentle-float">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold">AI University</span>
            </div>
            
            {/* Academic tagline */}
            <div className="relative">
              <p className="notebook-hand text-lg text-primary/70 italic">
                "Where Future Meets Tradition"
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 academic-fade-in" style={{ animationDelay: '0.2s' }}>
            <AcademicBracket className="pl-4">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="relative inline-block">
                  Learn
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
                </span>
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Anything</span>
                <br />
                <span className="relative inline-block">
                  Master
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-accent/60 via-accent/30 to-transparent" />
                </span>
                <span className="bg-gradient-secondary bg-clip-text text-transparent"> Everything</span>
              </h1>
            </AcademicBracket>
            
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your personal AI-powered university that adapts to your goals, 
              learns your style, and accelerates your success.
            </p>

            {/* Academic note in margin */}
            <div className="relative mt-8">
              <HighlightBox>
                <p className="notebook-hand text-accent text-lg">
                  Built on proven pedagogical principles, enhanced by cutting-edge AI
                </p>
              </HighlightBox>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center academic-fade-in" style={{ animationDelay: '0.4s' }}>
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
              {/* Academic annotation */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <p className="typewriter text-xs text-primary/60 tracking-wider">
                  FREE_TO_START.exe
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

          {/* Stats with academic styling */}
          <div className="flex flex-wrap justify-center gap-12 pt-12 academic-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center relative">
              <div className="text-3xl font-bold text-primary mb-1">50,000+</div>
              <div className="text-sm text-muted-foreground typewriter">Active_Learners</div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-px bg-primary/30" />
            </div>
            <div className="text-center relative">
              <div className="text-3xl font-bold text-primary mb-1">4.9/5</div>
              <div className="text-sm text-muted-foreground typewriter">Avg_Rating</div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-px bg-primary/30" />
            </div>
            <div className="text-center relative">
              <div className="text-3xl font-bold text-primary mb-1">100+</div>
              <div className="text-sm text-muted-foreground typewriter">Subjects</div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-px bg-primary/30" />
            </div>
          </div>

          {/* Final academic note */}
          <div className="pt-8 academic-fade-in relative" style={{ animationDelay: '0.8s' }}>
            <p className="text-lg text-muted-foreground mb-4">
              Welcome to the future of learning
            </p>
            <div className="notebook-hand-bold text-accent text-sm italic">
              Est. 2024 • Digitally Native • Academically Rigorous
            </div>
            
            {/* Academic flourish */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <div className="w-8 h-px bg-accent/30" />
              <GraduationCap className="w-4 h-4 text-accent/50" />
              <div className="w-8 h-px bg-accent/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;