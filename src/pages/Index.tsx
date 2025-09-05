import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, LogIn, BookOpen, Award, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Dynamic Gemini-style background orbs */}
      <div className="fixed inset-0">
        {/* Primary gradient orb */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-gemini rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        {/* Secondary gradient orbs */}
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-primary rounded-full blur-2xl opacity-15 gentle-float"></div>
        <div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-accent rounded-full blur-2xl opacity-10"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-white rounded-full blur-sm opacity-40 gentle-float" style={{
        animationDelay: '0.5s'
      }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-gradient-primary rounded-full blur-sm opacity-30 gentle-float" style={{
        animationDelay: '1.2s'
      }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-gradient-accent rounded-full opacity-50 gentle-float" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      {/* Apple-style liquid glass overlay */}
      <div className="fixed inset-0">
        {/* Primary glass layer */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[40px]"></div>
        
        {/* Secondary glass layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] backdrop-blur-[20px]"></div>
        
        {/* Specular highlights */}
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/[0.15] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-white/[0.10] rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-20 max-w-7xl mx-auto">
          
          {/* Brand with enhanced design */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-6 mb-16">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-gemini rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Glass container */}
                <div className="relative p-8 bg-white/[0.08] backdrop-blur-[30px] rounded-3xl border border-white/[0.15] shadow-2xl">
                  <GraduationCap className="h-16 w-16 text-white" />
                  
                  {/* Floating accent */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full blur-sm opacity-80"></div>
                </div>
              </div>
              
              <div className="text-left">
                <span className="text-6xl font-bold bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                  AI University
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <Award className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-slate-300 font-medium">Accredited Education Platform</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Headline with modern typography */}
          <div className="space-y-16 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <div className="space-y-8">
              <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tight">
                <span className="block mb-6">
                  <span className="text-white">Excellence in </span>
                </span>
                <span className="block bg-gradient-gemini bg-clip-text text-transparent mb-6">education</span>
                <span className="block text-white text-5xl md:text-6xl font-light">reimagined.</span>
              </h1>
            </div>
            
            <p className="text-2xl md:text-3xl text-slate-300 max-w-5xl mx-auto leading-relaxed font-light">
              World-class education powered by AI tutoring, adaptive curricula, and personalized learning paths. 
              Join thousands of students achieving their academic and professional goals.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
            {/* Primary Action - Premium Glass */}
            <div className="relative group">
              {/* Glow layers */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white/[0.15] rounded-full blur-lg group-hover:bg-white/[0.25] transition-all duration-300"></div>
              
              {/* Glass layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.25] via-white/[0.05] to-white/[0.15] rounded-full"></div>
              
              {/* Specular highlights */}
              <div className="absolute top-3 left-6 w-12 h-6 bg-white/[0.4] rounded-full blur-md"></div>
              <div className="absolute bottom-4 right-8 w-8 h-4 bg-white/[0.2] rounded-full blur-sm"></div>
              
              <Button size="lg" className="relative text-xl px-20 py-10 h-auto bg-white/[0.12] backdrop-blur-[40px] hover:bg-white/[0.18] hover:scale-105 transition-all duration-500 rounded-full border border-white/[0.2] text-white font-semibold shadow-2xl group-hover:shadow-glow" onClick={() => navigate("/auth")}>
                <BookOpen className="h-6 w-6 mr-4" />
                Start Learning
                <ArrowRight className="h-6 w-6 ml-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Secondary Action - Subtle Glass */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/[0.08] rounded-full blur-lg group-hover:bg-white/[0.15] transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.15] via-transparent to-white/[0.08] rounded-full"></div>
              <div className="absolute top-3 left-6 w-8 h-4 bg-white/[0.25] rounded-full blur-sm"></div>
              
              <Button size="lg" className="relative text-xl px-20 py-10 h-auto bg-white/[0.05] backdrop-blur-[40px] hover:bg-white/[0.10] hover:scale-105 transition-all duration-500 rounded-full border border-white/[0.15] text-white font-semibold shadow-xl" onClick={() => navigate("/auth")}>
                <LogIn className="h-6 w-6 mr-4" />
                Sign In
              </Button>
            </div>
          </div>

          {/* Modern Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-24 animate-fade-in" style={{
          animationDelay: '0.6s'
        }}>
            {[{
            stat: "100K+",
            label: "Active Students",
            gradient: "gradient-gemini",
            delay: "0s"
          }, {
            stat: "96%",
            label: "Success Rate",
            gradient: "gradient-primary",
            delay: "0.2s"
          }, {
            stat: "50+",
            label: "Subject Areas",
            gradient: "gradient-accent",
            delay: "0.4s"
          }].map((item, index) => <div key={index} className="relative group" style={{
            animationDelay: item.delay
          }}>
                {/* Background glow */}
                <div className={`absolute inset-0 bg-${item.gradient} rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-500`}></div>
                
                {/* Glass card */}
                <div className="relative p-12 bg-white/[0.06] backdrop-blur-[30px] rounded-3xl border border-white/[0.10] hover:border-white/[0.20] transition-all duration-500 group-hover:scale-105">
                  {/* Subtle inner glow */}
                  <div className="absolute top-4 left-6 w-16 h-8 bg-white/[0.10] rounded-full blur-lg"></div>
                  
                  <div className={`text-6xl font-bold bg-${item.gradient} bg-clip-text text-transparent mb-4`}>
                    {item.stat}
                  </div>
                  <div className="text-slate-300 font-medium text-lg">{item.label}</div>
                </div>
              </div>)}
          </div>

          {/* Modern Tagline */}
          <div className="pt-24 animate-fade-in" style={{
          animationDelay: '0.8s'
        }}>
            <div className="flex items-center justify-center gap-6 text-slate-400 font-light text-lg">
              <span>Academic Excellence</span>
              <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
              <span>Proven Results</span>
              <div className="w-2 h-2 bg-gradient-accent rounded-full"></div>
              <span>Trusted Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;