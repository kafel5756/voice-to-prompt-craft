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
import { ManualJsonConverter } from '@/components/ManualJsonConverter';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mic, Wand2, LogOut, Loader2, Type, Code, X } from 'lucide-react';

const Index = () => {
  const [originalText, setOriginalText] = useState('');
  const [jsonPrompt, setJsonPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [inputMode, setInputMode] = useState<'voice' | 'text' | 'manual'>('voice');
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

  const handleClearText = () => {
    setOriginalText('');
    setJsonPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b glass-effect backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Mic className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-poppins gradient-text">
                AI Prompt Generator
                AI Prompt Generator
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Welcome, {user.user_metadata?.full_name || user.email}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="shadow-elegant">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
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
                    <Button
                      variant={inputMode === 'manual' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setInputMode('manual')}
                      className="rounded-md"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Manual
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
                ) : inputMode === 'text' ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="text-input">Describe your prompt idea</Label>
                      <div className="relative">
                        <Textarea
                          id="text-input"
                          placeholder="Describe what you want the AI to help you with..."
                          value={originalText}
                          onChange={(e) => setOriginalText(e.target.value)}
                          className="min-h-[120px] mt-2"
                        />
                        {originalText && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearText}
                            className="absolute top-4 right-3 h-6 w-6 p-0 hover:bg-destructive/10 bg-background/80 backdrop-blur-sm rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleTextSubmit}
                        disabled={!originalText.trim() || isGenerating}
                        className="flex-1 bg-gradient-to-r from-primary to-purple-600"
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
                      {originalText && (
                        <Button 
                          variant="outline"
                          onClick={handleClearText}
                          className="px-4"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <ManualJsonConverter onSave={handleSavePrompt} />
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
