import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
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
  currentSituation: string;
  learningGoals: string;
  timeCommitment: string;
  preferredLearningStyle: string;
  subjects: string[];
  timeline: string;
}

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const totalSteps = 5;

  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    age: "",
    userType: "lifelong-learner",
    currentSituation: "",
    learningGoals: "",
    timeCommitment: "",
    preferredLearningStyle: "",
    subjects: [],
    timeline: ""
  });

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to complete onboarding.",
          variant: "destructive",
        });
        return;
      }

      // Store onboarding data in Supabase
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: data.fullName,
          age: parseInt(data.age),
          user_type: data.userType,
          current_situation: data.currentSituation,
          learning_goals: data.learningGoals,
          time_commitment: data.timeCommitment,
          preferred_learning_style: data.preferredLearningStyle,
          subjects: data.subjects,
          timeline: data.timeline,
          onboarding_completed: true,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

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
            <div className="text-center space-y-2">
              <User className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Tell us about yourself</h2>
              <p className="text-muted-foreground">Let's get to know you better</p>
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
              <h2 className="text-2xl font-bold">What are your learning goals?</h2>
              <p className="text-muted-foreground">Tell us what you want to achieve</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentSituation">Current Situation</Label>
                <Textarea
                  id="currentSituation"
                  value={data.currentSituation}
                  onChange={(e) => updateData("currentSituation", e.target.value)}
                  placeholder="Describe your current education/work situation..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="learningGoals">Learning Goals</Label>
                <Textarea
                  id="learningGoals"
                  value={data.learningGoals}
                  onChange={(e) => updateData("learningGoals", e.target.value)}
                  placeholder="What do you want to learn and why?"
                  rows={3}
                />
              </div>
            </div>
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
                <Label>Time Commitment (per week)</Label>
                <RadioGroup
                  value={data.timeCommitment}
                  onValueChange={(value) => updateData("timeCommitment", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-3 hours" id="time1" />
                    <Label htmlFor="time1">1-3 hours</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4-7 hours" id="time2" />
                    <Label htmlFor="time2">4-7 hours</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="8-15 hours" id="time3" />
                    <Label htmlFor="time3">8-15 hours</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15+ hours" id="time4" />
                    <Label htmlFor="time4">15+ hours</Label>
                  </div>
                </RadioGroup>
              </div>

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
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <GraduationCap className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Almost done!</h2>
              <p className="text-muted-foreground">Final details to personalize your journey</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="timeline">Target Timeline</Label>
                <RadioGroup
                  value={data.timeline}
                  onValueChange={(value) => updateData("timeline", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-3 months" id="timeline1" />
                    <Label htmlFor="timeline1">1-3 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-6 months" id="timeline2" />
                    <Label htmlFor="timeline2">3-6 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6-12 months" id="timeline3" />
                    <Label htmlFor="timeline3">6-12 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1+ years" id="timeline4" />
                    <Label htmlFor="timeline4">1+ years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="timeline5" />
                    <Label htmlFor="timeline5">Flexible / No rush</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Ready to start your AI-powered learning journey?</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your responses, we'll create a personalized curriculum just for you.
                </p>
              </div>
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
        return data.currentSituation.trim() && data.learningGoals.trim();
      case 4:
        return data.timeCommitment && data.preferredLearningStyle;
      case 5:
        return data.timeline;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Welcome to AI University</h1>
            <div className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </div>
          </div>
          <Progress value={(step / totalSteps) * 100} className="w-full" />
        </div>

        <Card>
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
  );
};

export default Onboarding;