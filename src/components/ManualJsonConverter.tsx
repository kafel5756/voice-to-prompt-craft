import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ManualJsonConverterProps {
  onSave: (originalText: string, jsonPrompt: string) => void;
}

export const ManualJsonConverter = ({ onSave }: ManualJsonConverterProps) => {
  const [description, setDescription] = useState('');
  const [jsonPrompt, setJsonPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const jsonTemplate = {
    task: "Brief description of what the AI should do",
    context: "Relevant background information",
    requirements: ["List of specific requirements"],
    output_format: "Desired format for the response",
    examples: ["Example of expected output if applicable"],
    tone: "Desired tone (professional, casual, etc.)",
    constraints: ["Any limitations or things to avoid"]
  };

  const handleGenerateTemplate = () => {
    setJsonPrompt(JSON.stringify(jsonTemplate, null, 2));
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonPrompt);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "JSON prompt copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleSavePrompt = () => {
    if (!description.trim() || !jsonPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please provide both description and JSON prompt",
        variant: "destructive",
      });
      return;
    }

    try {
      JSON.parse(jsonPrompt); // Validate JSON
      onSave(description, jsonPrompt);
      toast({
        title: "Success",
        description: "Manual JSON prompt saved successfully",
      });
      setDescription('');
      setJsonPrompt('');
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Description Input */}
      <div className="space-y-2">
        <Label htmlFor="description">Prompt Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what this JSON prompt is for..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      {/* JSON Template */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">JSON Template</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateTemplate}
              className="h-8"
            >
              Use Template
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">task</Badge>
            <Badge variant="secondary">context</Badge>
            <Badge variant="secondary">requirements</Badge>
            <Badge variant="secondary">output_format</Badge>
            <Badge variant="secondary">examples</Badge>
            <Badge variant="secondary">tone</Badge>
            <Badge variant="secondary">constraints</Badge>
          </div>
        </CardContent>
      </Card>

      {/* JSON Editor */}
      <div className="space-y-2">
        <Label htmlFor="json-prompt">JSON Prompt</Label>
        <Textarea
          id="json-prompt"
          placeholder='{\n  "task": "Your task description",\n  "context": "Background information",\n  ...\n}'
          value={jsonPrompt}
          onChange={(e) => setJsonPrompt(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleSavePrompt}
          disabled={!description.trim() || !jsonPrompt.trim()}
          className="flex-1"
        >
          Save Prompt
        </Button>
        <Button
          variant="outline"
          onClick={handleCopyToClipboard}
          disabled={!jsonPrompt.trim()}
          className="px-6"
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Help Text */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-medium">💡 Manual JSON Prompt Tips:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Use the template button to get started with the standard structure</li>
              <li>Customize each field based on your specific AI task needs</li>
              <li>Include clear requirements and constraints for better AI responses</li>
              <li>Test your JSON syntax before saving</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};