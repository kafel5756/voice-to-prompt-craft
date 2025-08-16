import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-muted/50 to-muted/30 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold gradient-text">AI Prompt Generator</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Transform your ideas into professional AI prompts with voice recording, text input, and manual editing capabilities.
            </p>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                Voice to Prompt
              </Link>
              <Link to="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                Text Generator
              </Link>
              <Link to="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                Manual Editor
              </Link>
              <Link to="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                Prompt History
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <a href="mailto:support@aipromptgen.com" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact Support
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@aipromptgen.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AI Prompt Generator. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>AI Prompt Generator</strong> - The premier platform for creating professional JSON prompts for AI models including ChatGPT, Claude, and other language models. 
              Our advanced voice recognition technology, powered by OpenAI Whisper, transforms your spoken ideas into structured prompts that deliver better AI responses.
            </p>
            <p>
              Features include real-time voice-to-text conversion, intelligent prompt structuring, manual editing capabilities, prompt history management, and seamless integration with popular AI platforms. 
              Perfect for developers, content creators, researchers, and AI enthusiasts looking to optimize their AI interactions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;