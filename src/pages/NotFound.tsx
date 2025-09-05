import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-slate-900">
      {/* Background orbs */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-gemini rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-primary rounded-full blur-2xl opacity-15 gentle-float"></div>
      </div>

      {/* Glass overlay */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[40px]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="relative mx-auto w-fit mb-8">
            <div className="absolute inset-0 bg-gradient-gemini rounded-full blur-2xl opacity-40"></div>
            <div className="relative text-8xl font-bold bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
              404
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-xl text-slate-300 mb-8">
              The page you're looking for doesn't exist in our educational universe.
            </p>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <a 
                href="/" 
                className="relative inline-flex items-center gap-2 px-8 py-4 bg-white/[0.12] backdrop-blur-[40px] hover:bg-white/[0.18] hover:scale-105 transition-all duration-300 rounded-full border border-white/[0.2] text-white font-semibold text-lg"
              >
                ← Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
