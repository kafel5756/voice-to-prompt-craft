import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold gradient-text">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: January 16, 2025</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="shadow-elegant">
            <CardContent className="pt-6 prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using AI Prompt Generator ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Description of Service</h2>
              <p>
                AI Prompt Generator is a web-based platform that enables users to create structured JSON prompts for AI models through voice recording, text input, and manual editing. Our service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Voice-to-text conversion using AI technology</li>
                <li>Automated JSON prompt generation</li>
                <li>Manual prompt editing and creation tools</li>
                <li>Prompt history and management</li>
                <li>User account management</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">User Accounts</h2>
              <p>
                To access certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of unauthorized use of your account</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">Acceptable Use</h2>
              <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Generate content that is harmful, offensive, or violates others' rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by AI Prompt Generator and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="mt-4">
                You retain ownership of the content you create using our Service, including prompts and generated text. However, you grant us a limited license to process and store this content to provide the Service.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Service Availability</h2>
              <p>
                We strive to maintain high availability of our Service, but we do not guarantee uninterrupted access. The Service may be temporarily unavailable due to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Scheduled maintenance</li>
                <li>Technical issues or system upgrades</li>
                <li>Third-party service dependencies</li>
                <li>Force majeure events</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 mt-8">Data and Privacy</h2>
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Third-Party Services</h2>
              <p>
                Our Service integrates with third-party services including OpenAI for AI processing. Your use of these features is subject to the respective third parties' terms of service and privacy policies.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, AI Prompt Generator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Disclaimer of Warranties</h2>
              <p>
                The Service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the Service, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant changes by email or through the Service. Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict of law principles.
              </p>

              <h2 className="text-xl font-semibold mb-4 mt-8">Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul className="list-none space-y-1">
                <li>Email: legal@aipromptgen.com</li>
                <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;