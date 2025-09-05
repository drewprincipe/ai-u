import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Clock, TrendingUp } from "lucide-react";

export function ProgressDashboard() {
  const stats = [
    { label: "Courses Completed", value: "3", icon: Trophy, color: "text-accent" },
    { label: "Current Streak", value: "12 days", icon: Target, color: "text-primary" },
    { label: "Total Study Time", value: "47h", icon: Clock, color: "text-muted-foreground" },
    { label: "Skill Growth", value: "+23%", icon: TrendingUp, color: "text-primary" }
  ];

  return (
    <Card className="bg-gradient-card border-0 shadow-elegant">
      <CardHeader>
        <CardTitle>Your Learning Journey</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Data Science Fundamentals</span>
            <span className="text-sm text-muted-foreground">67%</span>
          </div>
          <Progress value={67} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Estimated completion: March 15th (on track!)
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-lg bg-background/50">
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-sm font-medium mb-3">Recent Achievements</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Fast Learner
            </Badge>
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              Python Master
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Streak Keeper
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}