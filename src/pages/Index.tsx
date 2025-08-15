import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { PromptDisplay } from '@/components/PromptDisplay';
import { PromptHistory } from '@/components/PromptHistory';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mic, Wand2, LogOut, Loader2, Type } from 'lucide-react';

const Index = () => {
  const [originalText, setOriginalText] = useState('');
  const [jsonPrompt, setJsonPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleTranscription = (text: string) => {
    setOriginalText(text);
    generateJsonPrompt(text);
  };

  const generateJsonPrompt = async (text: string) => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please provide some text to generate a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-json-prompt', {
        body: { text }
      });

      if (error) throw error;

      if (data?.jsonPrompt) {
        setJsonPrompt(data.jsonPrompt);
        await savePrompt(text, data.jsonPrompt);
      }
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        title: "Error",
        description: "Failed to generate JSON prompt",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const savePrompt = async (originalText: string, jsonPrompt: string) => {
    try {
      const { error } = await supabase
        .from('prompts')
        .insert({
          user_id: user.id,
          original_text: originalText,
          json_prompt: jsonPrompt,
        });

      if (error) throw error;
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error saving prompt:', error);
    }
  };

  const handleSavePrompt = (originalText: string, editedPrompt: string) => {
    setJsonPrompt(editedPrompt);
    savePrompt(originalText, editedPrompt);
  };

  const handleGenerateNew = () => {
    setOriginalText('');
    setJsonPrompt('');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleTextSubmit = () => {
    if (originalText.trim()) {
      generateJsonPrompt(originalText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Mic className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AI Prompt Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome, {user.user_metadata?.full_name || user.email}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Input Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Mode Toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Create Prompt</span>
                  <div className="flex bg-muted rounded-lg p-1">
                    <Button
                      variant={inputMode === 'voice' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setInputMode('voice')}
                      className="rounded-md"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Voice
                    </Button>
                    <Button
                      variant={inputMode === 'text' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setInputMode('text')}
                      className="rounded-md"
                    >
                      <Type className="h-4 w-4 mr-2" />
                      Text
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {inputMode === 'voice' ? (
                  <div className="text-center space-y-4">
                    <VoiceRecorder 
                      onTranscription={handleTranscription}
                      disabled={isGenerating}
                    />
                    <p className="text-sm text-muted-foreground">
                      Record your voice to automatically generate an AI prompt
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="text-input">Describe your prompt idea</Label>
                      <Textarea
                        id="text-input"
                        placeholder="Describe what you want the AI to help you with..."
                        value={originalText}
                        onChange={(e) => setOriginalText(e.target.value)}
                        className="min-h-[120px] mt-2"
                      />
                    </div>
                    <Button 
                      onClick={handleTextSubmit}
                      disabled={!originalText.trim() || isGenerating}
                      className="w-full bg-gradient-to-r from-primary to-purple-600"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate JSON Prompt
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Prompt Display */}
            {(originalText || isGenerating) && (
              <PromptDisplay
                originalText={originalText}
                jsonPrompt={jsonPrompt}
                onGenerateNew={handleGenerateNew}
                onSave={handleSavePrompt}
                isGenerating={isGenerating}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PromptHistory refreshTrigger={refreshTrigger} />
            
            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Voice Recording</h4>
                  <p className="text-xs text-muted-foreground">
                    Speak clearly and describe exactly what you want the AI to do
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm">Better Prompts</h4>
                  <p className="text-xs text-muted-foreground">
                    Include context, desired output format, and specific requirements
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm">Edit & Copy</h4>
                  <p className="text-xs text-muted-foreground">
                    Edit generated prompts and copy them to use with any AI model
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
