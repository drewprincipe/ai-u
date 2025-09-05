import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Brain, Mail, Lock, User, ArrowRight } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if they have completed onboarding
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('onboarding_completed')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.onboarding_completed) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check if user has completed onboarding
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('onboarding_completed')
          .eq('user_id', data.user.id)
          .single();
        
        if (profile?.onboarding_completed) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both password fields match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account Created! 🎉",
          description: "Welcome to AI University. Let's set up your learning journey.",
        });
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestOnboarding = async () => {
    // For testing - go directly to onboarding with test parameter
    navigate("/onboarding?test=true");
  };

  const handleResetOnboarding = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Reset onboarding status for existing user
        await supabase
          .from('user_profiles')
          .update({ onboarding_completed: false })
          .eq('user_id', user.id);
        
        toast({
          title: "Onboarding Reset",
          description: "You can now redo the onboarding process.",
        });
        navigate("/onboarding");
      } else {
        // No user, just go to onboarding
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-slate-900">
      {/* Dynamic background orbs */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-gemini rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-primary rounded-full blur-2xl opacity-15 gentle-float"></div>
        <div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-accent rounded-full blur-2xl opacity-10"></div>
      </div>

      {/* Glass overlay */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] backdrop-blur-[20px]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-gemini rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative p-4 bg-white/[0.08] backdrop-blur-[30px] rounded-2xl border border-white/[0.15] shadow-2xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                  AI University
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">Welcome Back</h1>
            <p className="text-slate-300 text-lg">
              Continue your personalized learning journey
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-10"></div>
            <Tabs defaultValue="signin" className="relative w-full">
              <div className="relative p-1 bg-white/[0.06] backdrop-blur-[30px] rounded-2xl border border-white/[0.10] mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-transparent border-0">
                  <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/[0.12] data-[state=active]:text-white">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/[0.12] data-[state=active]:text-white">Sign Up</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="signin">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-[30px] rounded-3xl border border-white/[0.10]"></div>
                  <Card className="relative bg-transparent border-0 shadow-none">
                    <CardHeader className="text-center">
                      <CardTitle className="text-white text-xl">Sign In to Your Account</CardTitle>
                    </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                    <Button type="submit" className="w-full bg-white/[0.12] backdrop-blur-[40px] hover:bg-white/[0.18] hover:scale-105 transition-all duration-300 rounded-2xl border border-white/[0.2] text-white font-semibold" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </form>
                  </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-[30px] rounded-3xl border border-white/[0.10]"></div>
                  <Card className="relative bg-transparent border-0 shadow-none">
                    <CardHeader className="text-center">
                      <CardTitle className="text-white text-xl">Create Your Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div>
                          <Label htmlFor="signup-name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="Enter your full name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-password"
                              type="password"
                              placeholder="Create a password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-10"
                              required
                              minLength={6}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-confirm-password"
                              type="password"
                              placeholder="Confirm your password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="pl-10"
                              required
                              minLength={6}
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full bg-white/[0.12] backdrop-blur-[40px] hover:bg-white/[0.18] hover:scale-105 transition-all duration-300 rounded-2xl border border-white/[0.2] text-white font-semibold" disabled={isLoading}>
                          {isLoading ? "Creating Account..." : "Create Account"}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="text-center mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-[30px] rounded-2xl border border-white/[0.08]"></div>
              <div className="relative p-6">
                <p className="text-sm text-slate-400 mb-4">Development Tools</p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" size="sm" onClick={handleTestOnboarding} className="bg-white/[0.08] border-white/[0.15] text-white hover:bg-white/[0.12]">
                    Test Onboarding
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleResetOnboarding} disabled={isLoading} className="bg-white/[0.08] border-white/[0.15] text-white hover:bg-white/[0.12]">
                    Reset Onboarding
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={() => navigate("/")} className="text-slate-300 hover:text-white hover:bg-white/[0.05]">
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;