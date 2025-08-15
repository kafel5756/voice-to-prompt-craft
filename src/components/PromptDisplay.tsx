import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Edit, Save, X, Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PromptDisplayProps {
  originalText: string;
  jsonPrompt: string;
  onGenerateNew: () => void;
  onSave: (originalText: string, jsonPrompt: string) => void;
  isGenerating?: boolean;
}

export const PromptDisplay = ({ 
  originalText, 
  jsonPrompt, 
  onGenerateNew, 
  onSave,
  isGenerating = false 
}: PromptDisplayProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(jsonPrompt);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const saveEdit = () => {
    onSave(originalText, editedPrompt);
    setIsEditing(false);
    toast({
      title: "Saved!",
      description: "Your prompt has been saved",
    });
  };

  const cancelEdit = () => {
    setEditedPrompt(jsonPrompt);
    setIsEditing(false);
  };

  const regeneratePrompt = async () => {
    if (!originalText.trim()) return;
    
    setIsRegenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-json-prompt', {
        body: { text: originalText }
      });

      if (error) throw error;

      if (data?.jsonPrompt) {
        setEditedPrompt(data.jsonPrompt);
        onSave(originalText, data.jsonPrompt);
        toast({
          title: "Regenerated!",
          description: "New JSON prompt generated successfully",
        });
      }
    } catch (error) {
      console.error('Error regenerating prompt:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate prompt",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Generating JSON prompt...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Original Text */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>Original Text</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm bg-muted p-3 rounded-md">{originalText}</p>
        </CardContent>
      </Card>

      {/* JSON Prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>AI JSON Prompt</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={regeneratePrompt}
                disabled={isRegenerating}
              >
                {isRegenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(isEditing ? editedPrompt : jsonPrompt)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={saveEdit}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Edit your JSON prompt..."
            />
          ) : (
            <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
              {jsonPrompt}
            </pre>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onGenerateNew} variant="outline">
          Generate New Prompt
        </Button>
      </div>
    </div>
  );
};