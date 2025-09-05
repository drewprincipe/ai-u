import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, lessonTitle, topics } = await req.json();

    if (!transcript) {
      throw new Error('Transcript is required');
    }

    console.log('Generating notes for lesson:', lessonTitle);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert note-taker for educational content. Analyze the provided lesson transcript and generate comprehensive, well-structured notes.

Format the notes as a JSON array of note objects with this structure:
{
  "timestamp": <number in seconds where this concept appears>,
  "title": "<concise title for this note>",
  "content": "<detailed explanation of the concept>",
  "type": "key_concept" | "example" | "definition" | "summary"
}

Guidelines:
- Extract 8-15 key notes covering the most important concepts
- Include timestamps that correspond to when concepts are discussed
- Make notes comprehensive but concise
- Include examples, definitions, and key takeaways
- Ensure notes flow logically and build upon each other
- Focus on actionable learning points`
          },
          {
            role: 'user',
            content: `Lesson Title: ${lessonTitle}
Topics: ${topics?.join(', ') || 'General'}

Transcript:
${transcript}`
          }
        ],
        max_tokens: 2000,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const notesContent = data.choices[0].message.content;
    
    console.log('Generated notes content:', notesContent);
    
    // Parse the JSON response
    let generatedNotes;
    try {
      generatedNotes = JSON.parse(notesContent);
    } catch (parseError) {
      console.error('Error parsing notes JSON:', parseError);
      // Fallback: try to extract JSON from the response
      const jsonMatch = notesContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        generatedNotes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse generated notes');
      }
    }

    // Validate and format notes
    const formattedNotes = generatedNotes.map((note: any, index: number) => ({
      id: `generated-${Date.now()}-${index}`,
      timestamp: note.timestamp || 0,
      title: note.title || `Note ${index + 1}`,
      content: note.content || '',
      type: note.type || 'key_concept',
      isGenerated: true
    }));

    console.log('Formatted notes:', formattedNotes);

    return new Response(JSON.stringify({ 
      notes: formattedNotes,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-lesson-notes function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});