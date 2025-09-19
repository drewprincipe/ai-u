import { Button } from "@/components/ui/button";
import { Play, BookOpen, ChevronRight, Brain, Zap, Globe, PencilIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DoodleArrow, DoodleUnderline, BookDoodle, LightbulbDoodle, PencilDoodle } from "@/components/DoodleElements";
import { RuledUnderline, NotebookTab, AcademicBracket, HighlightBox } from "@/components/NotebookElements";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-3">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.04) 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, hsl(var(--accent) / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 100px 100px'
          }}
        />
      </div>

      {/* Gentle floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 left-20">
          <BookDoodle className="w-12 h-12 text-accent/20 animate-gentle-float" />
        </div>
        <div className="absolute top-1/3 right-24">
          <LightbulbDoodle className="w-10 h-10 text-primary/25" />
        </div>
        <div className="absolute bottom-48 left-1/4">
          <PencilDoodle className="w-8 h-8 text-accent/20 rotate-12" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-primary rounded-sm shadow-card"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-primary rounded-full"></div>
            </div>
            <span className="text-foreground font-chalk text-lg font-semibold tracking-wide">
              AI University
              <RuledUnderline className="text-primary/40" />
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground font-chalk tracking-wide" 
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </Button>
            <Button 
              variant="chalk" 
              onClick={() => navigate("/auth")}
            >
              Sign in
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            
            {/* Main headline with chalk styling */}
            <div className="space-y-8 animate-fade-in">
              <div className="relative inline-block">
                <NotebookTab text="Featured" className="mb-6" />
                <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-lg p-4 shadow-card">
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-chalk font-bold text-primary tracking-wider">
                      The future of education is here
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.9] tracking-tight font-chalk">
                <span className="block text-foreground mb-4 relative">
                  Excellence in
                  <DoodleUnderline className="absolute -bottom-2 left-0 w-full text-primary/40" />
                </span>
                <span className="block text-primary mb-4 relative">
                  education
                  <div className="absolute -top-4 -right-8">
                    <DoodleArrow className="w-8 h-8 text-accent/30 rotate-12" />
                  </div>
                </span>
                <span className="block text-foreground relative">
                  reimagined.
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full"></div>
                  </div>
                </span>
              </h1>

              <AcademicBracket className="max-w-4xl mx-auto">
                <HighlightBox className="bg-card/20 border-l-2 border-accent/60">
                  <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto font-academic leading-relaxed">
                    Personalized education that adapts to you. 
                    <span className="text-primary font-medium"> World-class content</span>, 
                    AI tutoring, and immersive learning experiences.
                  </p>
                </HighlightBox>
              </AcademicBracket>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  variant="hero"
                  className="px-12 py-6 h-auto text-lg rounded-sm relative"
                  onClick={() => navigate("/auth")}
                >
                  <Play className="w-5 h-5 mr-3" />
                  Start learning for free
                  <ChevronRight className="w-5 h-5 ml-3" />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <DoodleArrow className="w-6 h-6 text-primary/40 rotate-90" />
                  </div>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="hero-outline" 
                  className="px-8 py-6 h-auto text-lg rounded-sm"
                  onClick={() => navigate("/course/data-science-fundamentals")}
                >
                  <PencilIcon className="w-5 h-5 mr-2" />
                  View Demo Course
                </Button>
              </div>
            </div>

            {/* Features grid with chalkboard aesthetic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {[
                {
                  icon: Brain,
                  title: "AI-Powered",
                  description: "Personal AI tutor that adapts to your learning style",
                  doodle: <LightbulbDoodle className="w-6 h-6 text-primary/30 absolute -top-2 -right-2" />
                },
                {
                  icon: Zap,
                  title: "Instant Feedback", 
                  description: "Get immediate guidance and corrections as you learn",
                  doodle: <DoodleArrow className="w-6 h-6 text-accent/30 absolute -top-2 -right-2 rotate-45" />
                },
                {
                  icon: Globe,
                  title: "Global Access",
                  description: "Learn from anywhere, at your own pace and schedule",
                  doodle: <BookDoodle className="w-6 h-6 text-primary/30 absolute -top-2 -right-2" />
                }
              ].map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="relative p-6 bg-card/30 backdrop-blur-sm border border-border/30 rounded-md transition-all duration-300 group-hover:bg-card/50 group-hover:border-primary/20 shadow-card">
                    {feature.doodle}
                    <feature.icon className="w-7 h-7 text-primary mb-3 mx-auto" />
                    <h3 className="font-chalk font-semibold mb-2 text-foreground relative text-base">
                      {feature.title}
                      <DoodleUnderline className="absolute -bottom-1 left-0 w-full text-accent/30" />
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-academic">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats with chalkboard styling */}
            <div className="flex justify-center items-center gap-12 pt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {[
                { number: "50K+", label: "Students" },
                { number: "1000+", label: "Courses" },
                { number: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="text-center relative">
                  <div className="relative">
                    <div className="text-3xl font-bold font-chalk text-primary mb-1 relative">
                      {stat.number}
                      {index === 1 && <DoodleArrow className="w-4 h-4 text-accent/40 absolute -top-1 -right-4 rotate-12" />}
                    </div>
                    <div className="text-sm text-muted-foreground font-academic tracking-wide">{stat.label}</div>
                  </div>
                  {index < 2 && (
                    <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-px h-8 bg-border/60"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;