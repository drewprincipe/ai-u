import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Sparkles } from "lucide-react";

export function AITutorPreview() {
  const messages = [
    {
      type: "ai",
      message: "I see you're working on understanding Python variables. Can you tell me what type of variable would be best for storing someone's age?"
    },
    {
      type: "user", 
      message: "I think it would be an integer?"
    },
    {
      type: "ai",
      message: "Excellent! You're absolutely right. An integer is perfect for age since it's a whole number. Let me show you a practical example..."
    }
  ];

  return (
    <Card className="bg-gradient-card border-0 shadow-elegant">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Tutor - Always Here to Help
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
              {msg.type === 'ai' && (
                <Avatar className="h-8 w-8 bg-gradient-primary">
                  <AvatarFallback className="text-xs text-primary-foreground">AI</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg p-3 max-w-xs ${
                msg.type === 'ai' 
                  ? 'bg-muted text-foreground' 
                  : 'bg-primary text-primary-foreground ml-auto'
              }`}>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input 
            placeholder="Ask your AI tutor anything..." 
            className="border-primary/20 focus:border-primary"
          />
          <Button variant="hero" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}