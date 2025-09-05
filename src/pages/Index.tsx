import { Button } from "@/components/ui/button";
import { Play, Sparkles, ChevronRight, Brain, Zap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Subtle Gemini-inspired floating orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-gradient-gemini rounded-full blur-3xl opacity-12 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-primary rounded-full blur-3xl opacity-10 gentle-float"></div>
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-gradient-accent rounded-full blur-2xl opacity-8"></div>
      </div>

      {/* Apple liquid glass overlay */}
      <div className="fixed inset-0 bg-white/[0.03] backdrop-blur-[100px] pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Navigation */}
        <nav className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
            <span className="text-white font-medium">AI University</span>
          </div>
          <Button 
            variant="ghost" 
            className="text-slate-200 hover:text-white hover:bg-white/10"
            onClick={() => navigate("/auth")}
          >
            Sign in
          </Button>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            
            {/* Main headline */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-xl rounded-full border border-white/15 mb-8">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-200">The future of education is here</span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight">
                <span className="block text-white/95 mb-4">Learn</span>
                <span className="block bg-gradient-gemini bg-clip-text text-transparent mb-4">anything</span>
                <span className="block text-white/95">with AI</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                Personalized education that adapts to you. World-class content, 
                AI tutoring, and immersive learning experiences.
              </p>
            </div>

            {/* CTA */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative inline-block group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Glass button */}
                <Button 
                  size="lg"
                  className="relative px-12 py-6 h-auto text-lg bg-white/15 backdrop-blur-xl hover:bg-white/20 border border-white/25 hover:border-white/35 text-white font-medium transition-all duration-300 hover:scale-105 rounded-full"
                  onClick={() => navigate("/auth")}
                >
                  <Play className="w-5 h-5 mr-3" />
                  Start learning for free
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {[
                {
                  icon: Brain,
                  title: "AI-Powered",
                  description: "Personal AI tutor that adapts to your learning style"
                },
                {
                  icon: Zap,
                  title: "Instant Feedback",
                  description: "Get immediate guidance and corrections as you learn"
                },
                {
                  icon: Globe,
                  title: "Global Access",
                  description: "Learn from anywhere, at your own pace and schedule"
                }
              ].map((feature, index) => (
                <div key={index} className="relative group">
                  {/* Subtle glow */}
                  <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  
                  {/* Glass card */}
                  <div className="relative p-8 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-white/15 transition-all duration-300 group-hover:scale-105">
                    <feature.icon className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
                    <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-12 pt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-2xl font-light text-white mb-1">50K+</div>
                <div className="text-sm text-slate-400">Students</div>
              </div>
              <div className="w-px h-8 bg-white/15"></div>
              <div className="text-center">
                <div className="text-2xl font-light text-white mb-1">1000+</div>
                <div className="text-sm text-slate-400">Courses</div>
              </div>
              <div className="w-px h-8 bg-white/15"></div>
              <div className="text-center">
                <div className="text-2xl font-light text-white mb-1">95%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;