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
    const { text } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    console.log('Generating JSON prompt for text:', text);

    const systemPrompt = `You are an expert AI prompt engineer. Convert the user's natural language description into a well-structured JSON prompt that can be used with AI models. 

The JSON should have this structure:
{
  "task": "Brief description of what the AI should do",
  "context": "Relevant background information",
  "requirements": ["List of specific requirements"],
  "output_format": "Desired format for the response",
  "examples": ["Example of expected output if applicable"],
  "tone": "Desired tone (professional, casual, etc.)",
  "constraints": ["Any limitations or things to avoid"]
}

Make the JSON prompt clear, actionable, and optimized for getting the best results from AI models.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        max_completion_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const data = await response.json();
    const jsonPrompt = data.choices[0].message.content;

    console.log('Generated JSON prompt:', jsonPrompt);

    return new Response(JSON.stringify({ jsonPrompt }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-json-prompt function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});