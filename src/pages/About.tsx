import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold gradient-text">About AI Prompt Generator</h1>
          <p className="text-muted-foreground mt-2">Learn more about our mission and technology</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Mission Section */}
          <Card className="shadow-elegant animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                At AI Prompt Generator, we believe that effective communication with AI models is the key to unlocking their full potential. Our platform empowers users to create professional, structured JSON prompts that deliver better results from AI assistants like ChatGPT, Claude, and other language models.
              </p>
              <p className="leading-relaxed">
                Whether you're a developer, content creator, researcher, or AI enthusiast, our tool simplifies the process of prompt engineering by providing intuitive voice-to-text conversion, manual editing capabilities, and AI-powered prompt optimization.
              </p>
            </CardContent>
          </Card>

          {/* Technology Section */}
          <Card className="shadow-elegant animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Technology & Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Voice Recognition</h3>
                  <p className="text-muted-foreground">
                    Advanced speech-to-text technology powered by OpenAI Whisper API for accurate transcription of your ideas into structured prompts.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI-Powered Generation</h3>
                  <p className="text-muted-foreground">
                    Intelligent prompt structuring using GPT-5 to transform natural language into professional JSON prompts with proper formatting.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Manual Editing</h3>
                  <p className="text-muted-foreground">
                    Full control over your prompts with manual editing capabilities, template generation, and real-time JSON validation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your data is protected with enterprise-grade security. All prompts are stored securely and linked to your authenticated account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="shadow-elegant animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Our Commitment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                We're committed to making AI more accessible and effective for everyone. Our team continuously works on improving the platform based on user feedback and the latest developments in AI technology.
              </p>
              <div className="bg-gradient-primary rounded-lg p-6 text-white">
                <h3 className="font-semibold text-lg mb-2">Quality Promise</h3>
                <p>
                  We guarantee that our AI Prompt Generator provides high-quality, structured prompts that improve your AI interactions and help you achieve better results from language models.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="shadow-elegant animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@aipromptgen.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;