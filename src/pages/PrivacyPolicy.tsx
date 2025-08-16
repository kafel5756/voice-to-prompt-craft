import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold gradient-text">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: January 16, 2025</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="shadow-elegant">
            <CardContent className="pt-6 prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p>
                At AI Prompt Generator ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI prompt generation service.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Information We Collect</h2>
              
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address (for account creation and authentication)</li>
                <li>Name (optional, for personalization)</li>
                <li>Profile information (optional)</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 mt-4">Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prompt texts you create or input</li>
                <li>Generated JSON prompts</li>
                <li>Voice recordings (temporarily processed, not stored)</li>
                <li>Usage patterns and preferences</li>
                <li>Device and browser information</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our AI prompt generation service</li>
                <li>Process your voice recordings to generate text prompts</li>
                <li>Save and organize your prompt history</li>
                <li>Improve our service through analytics and user feedback</li>
                <li>Send service-related communications</li>
                <li>Ensure security and prevent fraud</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data processing with trusted third-party providers</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">Third-Party Services</h2>
              <p>We use the following third-party services to provide our platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Supabase:</strong> Database and authentication services</li>
                <li><strong>OpenAI:</strong> AI processing for prompt generation and voice transcription</li>
                <li><strong>Vercel/Hosting Provider:</strong> Application hosting and delivery</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">Voice Data Processing</h2>
              <p>
                When you use our voice recording feature:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Voice recordings are processed in real-time and not permanently stored</li>
                <li>Audio data is sent to OpenAI Whisper API for transcription</li>
                <li>Only the resulting text is saved to your account</li>
                <li>Original audio files are deleted immediately after processing</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate personal data</li>
                <li>Delete your account and associated data</li>
                <li>Export your data</li>
                <li>Opt-out of non-essential communications</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">Data Retention</h2>
              <p>
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations. You can delete your account and associated data at any time through your account settings.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-none space-y-1">
                <li>Email: privacy@aipromptgen.com</li>
                <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;