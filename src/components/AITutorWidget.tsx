import React, { useEffect, useState } from 'react';

interface AITutorWidgetProps {
  agentId?: string;
  lessonContext?: {
    title: string;
    topic: string;
    currentTime?: number;
  };
}

export function AITutorWidget({ 
  agentId = "agent_1801k3c00m0peyd87z8t18nmk59x"
}: AITutorWidgetProps) {
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

  if (!scriptLoaded) {
    return null; // Don't render anything until script is loaded
  }

  return (
    <elevenlabs-convai 
      agent-id={agentId}
    />
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