import React, { useState, useEffect } from 'react';
import { X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AITutorWidgetProps {
  agentId?: string;
  lessonContext?: {
    title: string;
    topic: string;
    currentTime?: number;
  };
}

export function AITutorWidget({ 
  agentId = "agent_1801k3c00m0peyd87z8t18nmk59x",
  lessonContext 
}: AITutorWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load the ElevenLabs ConvAI script dynamically
    const loadScript = () => {
      if (document.querySelector('script[src*="convai-widget-embed"]')) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Tutor Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Animated pulse ring when closed */}
          {!isOpen && (
            <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full"></div>
          )}
          
          <Button
            onClick={toggleWidget}
            size="lg"
            className={`rounded-full h-14 w-14 shadow-lg transition-all duration-300 ${
              isOpen ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <div className="relative">
                <Bot className="h-6 w-6" />
                {/* Animated character indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* AI Tutor Widget Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-scale-in">
          <Card className="w-80 h-96 shadow-xl border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-primary" />
                AI Tutor
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </CardTitle>
              {lessonContext && (
                <p className="text-sm text-muted-foreground">
                  Helping with: {lessonContext.title}
                </p>
              )}
            </CardHeader>
            <CardContent className="p-0 h-full">
              {/* ElevenLabs ConvAI Widget */}
              {scriptLoaded ? (
                <elevenlabs-convai 
                  agent-id={agentId}
                  style={{ 
                    width: '100%', 
                    height: '280px',
                    border: 'none',
                    borderRadius: '0 0 8px 8px'
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Loading AI Tutor...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

// Declare the ElevenLabs ConvAI custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
        style?: React.CSSProperties;
      };
    }
  }
}