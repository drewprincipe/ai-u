import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  BookOpen, 
  Target, 
  Clock, 
  Star, 
  TrendingUp,
  Play,
  MessageCircle,
  Settings,
  User
} from "lucide-react";

interface UserProfile {
  full_name: string;
  user_type: string;
  learning_goals: string;
  time_commitment: string;
  preferred_learning_style: string;
  timeline: string;
}

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        if (error.code === 'PGRST116') {
          // No profile found, redirect to onboarding
          navigate("/onboarding");
          return;
        }
        throw error;
      }

      setUserProfile(profile);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to load your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p>Profile not found. Redirecting to onboarding...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getUserTypeColor = (type: string) => {
    const colors = {
      'high-school': 'bg-blue-500',
      'university': 'bg-purple-500',
      'career-switcher': 'bg-green-500',
      'professional': 'bg-orange-500',
      'lifelong-learner': 'bg-pink-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const getUserTypeLabel = (type: string) => {
    const labels = {
      'high-school': 'High School Student',
      'university': 'University Student', 
      'career-switcher': 'Career Switcher',
      'professional': 'Working Professional',
      'lifelong-learner': 'Lifelong Learner'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-purple-50/10">
      {/* Very subtle floating orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/6 right-1/8 w-20 h-20 bg-gradient-primary rounded-full blur-3xl opacity-3"></div>
        <div className="absolute bottom-1/5 left-1/6 w-24 h-24 bg-gradient-accent rounded-full blur-3xl opacity-2"></div>
      </div>
      
      {/* Very subtle glass overlay */}
      <div className="fixed inset-0 bg-white/10 backdrop-blur-[30px] pointer-events-none"></div>
      {/* Header */}
      <header className="border-b border-blue-100/50 bg-white/60 backdrop-blur-xl relative z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-lg shadow-lg"></div>
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">AI University</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Tutor
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <User className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                Welcome back, {userProfile.full_name}!
              </h1>
              <div className="flex items-center gap-2">
                <Badge className={`${getUserTypeColor(userProfile.user_type)} text-white`}>
                  {getUserTypeLabel(userProfile.user_type)}
                </Badge>
                <Badge variant="outline">
                  {userProfile.time_commitment} per week
                </Badge>
                <Badge variant="outline">
                  {userProfile.timeline} timeline
                </Badge>
              </div>
            </div>
          </div>
          
          <Card className="bg-white/50 backdrop-blur-lg border-blue-100/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Target className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Your Learning Goals</h3>
                  <p className="text-muted-foreground">{userProfile.learning_goals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/50 backdrop-blur-lg border-blue-100/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-lg border-blue-100/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Streak</p>
                  <p className="text-2xl font-bold">0 days</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-lg border-blue-100/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Time Invested</p>
                  <p className="text-2xl font-bold">0h</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-lg border-blue-100/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-2xl font-bold">--</p>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Courses */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white/50 backdrop-blur-lg border-blue-100/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Creating Your Personalized Curriculum</h3>
                  <p className="text-muted-foreground mb-6">
                    Our AI is analyzing your goals and preferences to create the perfect learning path for you.
                  </p>
                  <Button onClick={() => navigate('/lesson/lesson-ds-101')}>
                    <Play className="h-4 w-4 mr-2" />
                    Try Demo Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/50 backdrop-blur-lg border-blue-100/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  AI Tutor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant help and personalized explanations 24/7.
                </p>
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with AI Tutor
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-lg border-blue-100/50 shadow-lg">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Update Learning Goals
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Adjust Schedule
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;