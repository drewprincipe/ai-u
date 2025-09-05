import { Button } from "@/components/ui/button";
import { Play, Sparkles, ChevronRight, Brain, Zap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();
    return <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Chalkboard-style floating orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-gradient-to-r from-white/20 to-slate-300/10 rounded-full blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-400/20 to-slate-600/10 rounded-full blur-3xl opacity-12 gentle-float"></div>
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-gradient-to-r from-slate-200/15 to-slate-500/8 rounded-full blur-2xl opacity-10"></div>
        <div className="absolute top-1/2 right-1/6 w-32 h-32 bg-gradient-to-r from-white/10 to-slate-400/8 rounded-full blur-2xl opacity-8"></div>
      </div>

      {/* Chalkboard texture overlay */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[100px] pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Navigation */}
        <nav className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-white via-slate-300 to-slate-500 rounded-lg shadow-lg"></div>
            <span className="text-white font-bold text-lg">AI University</span>
          </div>
          <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 font-semibold" onClick={() => navigate("/auth")}>
            Sign in
          </Button>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            
            {/* Main headline */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/10 via-slate-200/10 to-white/5 backdrop-blur-xl rounded-full border border-white/20 mb-8 shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">The future of education is here</span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
                <span className="block bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent mb-4 font-black">The Future of</span>
                <span className="block bg-gradient-to-r from-slate-300 via-white to-slate-400 bg-clip-text text-transparent mb-4 font-black animate-pulse">Education</span>
                <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent font-black">is Here</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                Personalized education that adapts to you. <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent font-semibold">World-class content</span>, 
                AI tutoring, and immersive learning experiences.
              </p>
            </div>

            {/* CTA */}
            <div className="animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="relative inline-block group">
                {/* Chalkboard glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-slate-300/20 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Chalkboard button */}
                <Button size="lg" className="relative px-12 py-6 h-auto text-lg bg-white/90 backdrop-blur-xl hover:bg-white border border-white/30 hover:border-white/50 text-slate-900 font-semibold transition-all duration-300 hover:scale-105 rounded-full shadow-xl hover:shadow-2xl" onClick={() => navigate("/auth")}>
                  <Play className="w-5 h-5 mr-3" />
                  Start learning for free
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
              {[{
              icon: Brain,
              title: "AI-Powered",
              description: "Personal AI tutor that adapts to your learning style"
            }, {
              icon: Zap,
              title: "Instant Feedback",
              description: "Get immediate guidance and corrections as you learn"
            }, {
              icon: Globe,
              title: "Global Access",
              description: "Learn from anywhere, at your own pace and schedule"
             }].map((feature, index) => <div key={index} className="relative group">
                  {/* Chalkboard subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-slate-200/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
                  
                  {/* Chalkboard glass card */}
                  <div className="relative p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl">
                    <feature.icon className="w-8 h-8 text-white mb-4 mx-auto" />
                    <h3 className="font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </div>)}
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-12 pt-16 animate-fade-in" style={{
            animationDelay: '0.6s'
          }}>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-1">50K+</div>
                <div className="text-sm text-slate-400 font-medium">Students</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-slate-300 to-slate-500"></div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent mb-1">1000+</div>
                <div className="text-sm text-slate-400 font-medium">Courses</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-slate-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">95%</div>
                <div className="text-sm text-slate-400 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;