import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Target, 
  Clock, 
  BookOpen,
  GraduationCap,
  Briefcase,
  Home
} from "lucide-react";

type UserType = "high-school" | "university" | "career-switcher" | "professional" | "lifelong-learner";

interface OnboardingData {
  fullName: string;
  age: string;
  userType: UserType;
  topicsOfInterest: string[];
  preferredLearningStyle: string;
}

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const totalSteps = 4;

  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    age: "",
    userType: "lifelong-learner",
    topicsOfInterest: [],
    preferredLearningStyle: ""
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication status...");
      
      // Check if we're in test mode via URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const isTestMode = urlParams.get('test') === 'true';
      
      if (isTestMode) {
        console.log("Test mode enabled, skipping auth check");
        setIsAuthenticated(true);
        setAuthLoading(false);
        return;
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      
      if (!user) {
        console.log("No user found, redirecting to auth");
        navigate("/auth");
        return;
      }
      
      setIsAuthenticated(true);
      setAuthLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  const updateData = (field: keyof OnboardingData, value: any) => {
    console.log(`Updating ${field}:`, value);
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    console.log(`Moving from step ${step} to step ${step + 1}`);
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    console.log("Starting onboarding completion...");
    console.log("Current form data:", data);
    setIsLoading(true);
    
    try {
      // Check if we're in test mode
      const urlParams = new URLSearchParams(window.location.search);
      const isTestMode = urlParams.get('test') === 'true';
      
      if (isTestMode) {
        console.log("Test mode - simulating completion");
        toast({
          title: "Test Mode: Onboarding Complete! 🎉", 
          description: "This was a test run. Your data wasn't saved.",
        });
        navigate("/dashboard");
        return;
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      console.log("User for onboarding:", user);
      
      if (!user) {
        console.log("No user found during completion");
        toast({
          title: "Authentication Required",
          description: "Please sign in to complete onboarding.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const profileData = {
        user_id: user.id,
        full_name: data.fullName,
        age: parseInt(data.age),
        user_type: data.userType,
        current_situation: "To be determined by AI",
        learning_goals: "To be determined by AI", 
        time_commitment: "To be determined by AI",
        preferred_learning_style: data.preferredLearningStyle,
        subjects: data.topicsOfInterest,
        timeline: "flexible",
        onboarding_completed: true,
      };
      
      console.log("Inserting profile data:", profileData);

      // Store onboarding data in Supabase
      const { error, data: insertResult } = await supabase
        .from('user_profiles')
        .upsert(profileData);

      console.log("Insert result:", insertResult);
      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      console.log("Onboarding completed successfully");
      toast({
        title: "Welcome to AI University! 🎉",
        description: "Your personalized learning journey is ready to begin.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const topicsOptions = [
    "Computer Science & Programming",
    "Data Science & AI",
    "Mathematics", 
    "Business & Finance",
    "Science (Physics, Chemistry, Biology)",
    "Engineering",
    "Arts & Design",
    "Language Learning",
    "Marketing & Social Media",
    "Personal Development",
    "Health & Medicine",
    "History & Philosophy"
  ];

  const handleTopicToggle = (topic: string) => {
    setData(prev => ({
      ...prev,
      topicsOfInterest: prev.topicsOfInterest.includes(topic)
        ? prev.topicsOfInterest.filter(t => t !== topic)
        : [...prev.topicsOfInterest, topic]
    }));
  };

  const userTypeOptions = [
    {
      value: "high-school",
      label: "High School Student",
      description: "Supplement your education and prepare for college",
      icon: GraduationCap
    },
    {
      value: "university",
      label: "University Student", 
      description: "Replace expensive college courses with AI-powered learning",
      icon: BookOpen
    },
    {
      value: "career-switcher",
      label: "Career Switcher",
      description: "Learn new skills to transition into a different field",
      icon: Briefcase
    },
    {
      value: "professional",
      label: "Working Professional",
      description: "Advance your current career with specialized knowledge",
      icon: User
    },
    {
      value: "lifelong-learner",
      label: "Lifelong Learner",
      description: "Explore subjects that interest you for personal growth",
      icon: Home
    }
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-fit">
                  <div className="absolute inset-0 bg-gradient-gemini rounded-full blur-xl opacity-40"></div>
                  <div className="relative p-4 bg-white/[0.08] backdrop-blur-[20px] rounded-full border border-white/[0.15]">
                    <User className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white">Tell us about yourself</h2>
                <p className="text-slate-300">Let's get to know you better</p>
              </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={data.fullName}
                  onChange={(e) => updateData("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={data.age}
                  onChange={(e) => updateData("age", e.target.value)}
                  placeholder="Enter your age"
                  min="13"
                  max="100"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Target className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">What describes you best?</h2>
              <p className="text-muted-foreground">This helps us personalize your experience</p>
            </div>
            
            <RadioGroup
              value={data.userType}
              onValueChange={(value) => updateData("userType", value as UserType)}
              className="space-y-3"
            >
              {userTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex items-start gap-3 flex-1">
                    <option.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <BookOpen className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">What topics interest you?</h2>
              <p className="text-muted-foreground">Select all that apply - we'll use this to recommend courses</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topicsOptions.map((topic) => (
                <div
                  key={topic}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    data.topicsOfInterest.includes(topic)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => handleTopicToggle(topic)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      data.topicsOfInterest.includes(topic)
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    }`}>
                      {data.topicsOfInterest.includes(topic) && (
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      )}
                    </div>
                    <Label className="cursor-pointer text-sm font-medium">
                      {topic}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Selected {data.topicsOfInterest.length} topic{data.topicsOfInterest.length !== 1 ? 's' : ''}
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Clock className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">How do you prefer to learn?</h2>
              <p className="text-muted-foreground">Help us customize your experience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Preferred Learning Style</Label>
                <RadioGroup
                  value={data.preferredLearningStyle}
                  onValueChange={(value) => updateData("preferredLearningStyle", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="visual" id="visual" />
                    <Label htmlFor="visual">Visual (videos, diagrams, animations)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hands-on" id="hands-on" />
                    <Label htmlFor="hands-on">Hands-on (interactive exercises, projects)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reading" id="reading" />
                    <Label htmlFor="reading">Reading (text-based content)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixed" id="mixed" />
                    <Label htmlFor="mixed">Mixed (combination of all)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">Ready to start your AI-powered learning journey?</h3>
              <p className="text-sm text-muted-foreground">
                Based on your responses, we'll create a personalized curriculum just for you.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.fullName.trim() && data.age.trim();
      case 2:
        return data.userType;
      case 3:
        return data.topicsOfInterest.length > 0;
      case 4:
        return data.preferredLearningStyle;
      default:
        return true;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-slate-900 p-4">
      {/* Background orbs */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-gemini rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-primary rounded-full blur-2xl opacity-15 gentle-float"></div>
      </div>

      {/* Glass overlay */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[40px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-gemini rounded-xl blur-lg opacity-60"></div>
                  <div className="relative p-3 bg-white/[0.08] backdrop-blur-[30px] rounded-xl border border-white/[0.15]">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white">AI University</h1>
              </div>
              <div className="text-sm text-slate-400 bg-white/[0.06] backdrop-blur-[20px] px-3 py-2 rounded-full border border-white/[0.10]">
                Step {step} of {totalSteps}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-[20px] rounded-2xl"></div>
              <Progress value={(step / totalSteps) * 100} className="relative w-full h-3 bg-white/[0.10] border border-white/[0.15]" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-[30px] rounded-3xl border border-white/[0.10]"></div>
            <Card className="relative bg-transparent border-0 shadow-none">
              <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {step < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!isStepValid() || isLoading}
                >
                  {isLoading ? "Setting up..." : "Complete Onboarding"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;