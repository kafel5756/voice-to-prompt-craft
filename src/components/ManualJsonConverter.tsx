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

  // Individual template fields
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [requirements, setRequirements] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [examples, setExamples] = useState('');
  const [tone, setTone] = useState('');
  const [constraints, setConstraints] = useState('');

  const jsonTemplate = {
    task: "Brief description of what the AI should do",
    context: "Relevant background information",
    requirements: ["List of specific requirements"],
    output_format: "Desired format for the response",
    examples: ["Example of expected output if applicable"],
    tone: "Desired tone (professional, casual, etc.)",
    constraints: ["Any limitations or things to avoid"]
  };

  const generateJsonFromFields = () => {
    const jsonObj: Record<string, any> = {};
    if (task.trim()) jsonObj.task = task.trim();
    if (context.trim()) jsonObj.context = context.trim();
    if (requirements.trim()) {
      jsonObj.requirements = requirements.split('\n').filter(req => req.trim()).map(req => req.trim());
    }
    if (outputFormat.trim()) jsonObj.output_format = outputFormat.trim();
    if (examples.trim()) {
      jsonObj.examples = examples.split('\n').filter(ex => ex.trim()).map(ex => ex.trim());
    }
    if (tone.trim()) jsonObj.tone = tone.trim();
    if (constraints.trim()) {
      jsonObj.constraints = constraints.split('\n').filter(con => con.trim()).map(con => con.trim());
    }
    return JSON.stringify(jsonObj, null, 2);
  };

  const handleGenerateFromFields = () => {
    const generatedJson = generateJsonFromFields();
    setJsonPrompt(generatedJson);
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

      {/* Form Builder */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">JSON Prompt Builder</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateFromFields}
              className="h-8"
            >
              Generate JSON
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Task */}
            <div className="space-y-2">
              <Label htmlFor="task" className="text-sm font-medium">
                Task <span className="text-muted-foreground">*</span>
              </Label>
              <Textarea
                id="task"
                placeholder="Brief description of what the AI should do"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            {/* Context */}
            <div className="space-y-2">
              <Label htmlFor="context" className="text-sm font-medium">
                Context
              </Label>
              <Textarea
                id="context"
                placeholder="Relevant background information"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label htmlFor="requirements" className="text-sm font-medium">
                Requirements
              </Label>
              <Textarea
                id="requirements"
                placeholder="List specific requirements (one per line)"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            {/* Output Format */}
            <div className="space-y-2">
              <Label htmlFor="output-format" className="text-sm font-medium">
                Output Format
              </Label>
              <Textarea
                id="output-format"
                placeholder="Desired format for the response"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            {/* Examples */}
            <div className="space-y-2">
              <Label htmlFor="examples" className="text-sm font-medium">
                Examples
              </Label>
              <Textarea
                id="examples"
                placeholder="Example of expected output (one per line)"
                value={examples}
                onChange={(e) => setExamples(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-sm font-medium">
                Tone
              </Label>
              <Textarea
                id="tone"
                placeholder="Desired tone (professional, casual, etc.)"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>

          {/* Constraints - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="constraints" className="text-sm font-medium">
              Constraints
            </Label>
            <Textarea
              id="constraints"
              placeholder="Any limitations or things to avoid (one per line)"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateTemplate}
              className="text-xs"
            >
              Or use default template
            </Button>
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