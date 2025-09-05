import { Button } from "@/components/ui/button";
import { Play, Sparkles, ChevronRight, Brain, Zap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30">
      {/* Bright Gemini-inspired floating orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-gradient-gemini rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-primary rounded-full blur-3xl opacity-15 gentle-float"></div>
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-gradient-accent rounded-full blur-2xl opacity-12"></div>
        <div className="absolute top-1/2 right-1/6 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-10"></div>
      </div>

      {/* Bright liquid glass overlay */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[100px] pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Navigation */}
        <nav className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-lg shadow-lg"></div>
            <span className="text-slate-900 font-bold text-lg bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">AI University</span>
          </div>
          <Button 
            variant="ghost" 
            className="text-slate-700 hover:text-slate-900 hover:bg-black/5 font-semibold"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 backdrop-blur-xl rounded-full border border-blue-200/50 mb-8 shadow-lg">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">The future of education is here</span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
                <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-4 font-black">The Future of</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 font-black animate-pulse">Education</span>
                <span className="block bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent font-black">is Here</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto font-medium leading-relaxed">
                Personalized education that adapts to you. <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">World-class content</span>, 
                AI tutoring, and immersive learning experiences.
              </p>
            </div>

            {/* CTA */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative inline-block group">
                {/* Bright glow effect */}
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Bright glass button */}
                <Button 
                  size="lg"
                  className="relative px-12 py-6 h-auto text-lg bg-white/80 backdrop-blur-xl hover:bg-white/90 border border-blue-200/50 hover:border-blue-300/60 text-slate-900 font-semibold transition-all duration-300 hover:scale-105 rounded-full shadow-xl hover:shadow-2xl"
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
                  {/* Bright subtle glow */}
                  <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  
                  {/* Bright glass card */}
                  <div className="relative p-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-blue-100/50 hover:border-blue-200/60 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl">
                    <feature.icon className="w-8 h-8 text-purple-600 mb-4 mx-auto" />
                    <h3 className="font-bold mb-2 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-12 pt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">50K+</div>
                <div className="text-sm text-slate-500 font-medium">Students</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-purple-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">1000+</div>
                <div className="text-sm text-slate-500 font-medium">Courses</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-purple-300 to-pink-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-1">95%</div>
                <div className="text-sm text-slate-500 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;