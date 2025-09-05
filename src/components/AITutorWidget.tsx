import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Bot } from 'lucide-react';
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
  const [isWidgetReady, setIsWidgetReady] = useState(false);

  useEffect(() => {
    // Check if ElevenLabs widget is available
    const checkWidget = () => {
      if (window.ElevenLabsConvAI) {
        setIsWidgetReady(true);
      }
    };

    // Check immediately and set up interval
    checkWidget();
    const interval = setInterval(checkWidget, 500);

    return () => clearInterval(interval);
  }, []);

  const toggleWidget = () => {
    if (isWidgetReady && !isOpen) {
      // Initialize the ElevenLabs widget when opening
      try {
        window.ElevenLabsConvAI.widget.mount({
          agentId,
          container: document.getElementById('tutor-widget-container'),
          onLoad: () => {
            console.log('AI Tutor widget loaded');
          },
          onError: (error: any) => {
            console.error('AI Tutor widget error:', error);
          }
        });
      } catch (error) {
        console.error('Failed to initialize AI Tutor:', error);
      }
    }
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
            disabled={!isWidgetReady}
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
              {/* ElevenLabs ConvAI Widget Container */}
              <div 
                id="tutor-widget-container" 
                className="h-full w-full rounded-b-lg overflow-hidden"
                style={{ minHeight: '280px' }}
              />
              
              {!isWidgetReady && (
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

// Extend window interface for TypeScript
declare global {
  interface Window {
    ElevenLabsConvAI: {
      widget: {
        mount: (options: {
          agentId: string;
          container: HTMLElement | null;
          onLoad?: () => void;
          onError?: (error: any) => void;
        }) => void;
      };
    };
  }
}