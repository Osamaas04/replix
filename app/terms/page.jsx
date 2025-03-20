import Footer from "@/components/elements/Footer";
import Header from "@/components/elements/Header";

export default function Terms() {
  return (
    <div className="bg-primary grid gap-24">
      <div>
        <Header shouldAnimate={false} />
      </div>
      <div className="font-raleway text-secondary grid items-center mx-auto gap-8 container w-full max-w-5xl px-8 py-8 md:py-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-3xl md:text-4xl font-heading">
            Terms of Use
          </h1>
          <p className="text-secondary/70 text-balance text-base sm:text-lg max-w-[980px]">
            Your agreement with Replix for using our AI-driven customer support
          </p>
        </div>
        <div>
          <ol className="list-decimal pl-5">
            <li className="font-bold">Acceptance of Terms</li>
            <p className="text-secondary/70">
              By accessing and using the Replix website ("Website"), you agree
              to be bound by these Terms of Use ("Terms"). These Terms
              constitute a legally binding agreement between you and Replix, a
              Delaware corporation ("Replix"). If you do not agree to these
              Terms, please do not use the Website.
            </p>

            <li className="font-bold">Description of Service</li>
            <p className="text-secondary/70">
              Replix is an AI-driven customer support SaaS that enables users to
              sync their social media accounts and upload files to fine-tune an
              AI that responds to customer questions and queries. The service
              includes, but is not limited to, AI training, real-time customer
              interaction, multi-channel message syncing, analytics, and
              automated responses. Replix reserves the right to modify or
              discontinue any aspect of the service at any time.
            </p>

            <li className="font-bold">Registration</li>
            <p className="text-secondary/70">
              To access the full functionality of Replix, you may be required to
              create an account and provide accurate and up-to-date information.
              You are responsible for maintaining the confidentiality of your
              account details and all activities under your account. You must
              not share your login credentials with third parties. You agree to
              notify Replix immediately of any unauthorized account access or
              security breaches.
            </p>

            <li className="font-bold">Use of the Service</li>
            <p className="text-secondary/70">
              You agree to use Replix in compliance with all applicable laws and
              regulations. You also agree not to:
            </p>
            <ol className="list-decimal pl-5 text-secondary/70">
              <li>Use the service for any unlawful or unauthorized purpose.</li>
              <li>
                Interfere with or disrupt the integrity or performance of the
                service.
              </li>
              <li>
                Attempt to gain unauthorized access to Replix systems or user
                accounts.
              </li>
              <li>
                Use the service to transmit any viruses, malware, or harmful
                code.
              </li>
              <li>
                Engage in any conduct that restricts or inhibits other users
                from using the service.
              </li>
            </ol>

            <li className="font-bold">Intellectual Property</li>
            <p className="text-secondary/70">
              All intellectual property, including but not limited to AI models,
              software, trademarks, and trade secrets related to Replix, are the
              exclusive property of Replix. You may not use, modify, or
              reproduce any intellectual property without explicit written
              consent from Replix.
            </p>

            <li className="font-bold">Privacy Policy</li>
            <p className="text-secondary/70">
              Replix's Privacy Policy outlines how user data, including AI
              training files and synced social media data, is collected and
              used. By using the Website, you agree to the Privacy Policy, which
              is incorporated into these Terms by reference.
            </p>

            <li className="font-bold">Termination</li>
            <p className="text-secondary/70">
              Replix reserves the right to terminate your access to the service
              at its sole discretion, with or without cause and without notice.
              In the event of termination, your account and access to Replix’s
              features will be disabled.
            </p>

            <li className="font-bold">Disclaimer of Warranties</li>
            <p className="text-secondary/70">
              The Replix service is provided "as is" and "as available" without
              warranties of any kind, either express or implied, including but
              not limited to, the implied warranties of merchantability, fitness
              for a particular purpose, or non-infringement.
            </p>

            <li className="font-bold">Limitation of Liability</li>
            <p className="text-secondary/70">
              Replix shall not be liable for any direct, indirect, incidental,
              special, or consequential damages resulting from the use or
              inability to use the service.
            </p>

            <li className="font-bold">Indemnification</li>
            <p className="text-secondary/70">
              You agree to indemnify and hold Replix harmless from any claims,
              demands, or damages, including reasonable attorney's fees, arising
              from your use of the service or violation of these Terms.
            </p>

            <li className="font-bold">Governing Law</li>
            <p className="text-secondary/70">
              These Terms are governed by and construed in accordance with the
              laws of the state of Delaware, without regard to its conflict of
              law principles.
            </p>

            <li className="font-bold">Contact Information</li>
            <p className="text-secondary/70">
              If you have any questions or concerns regarding these Terms of
              Use, please contact us at [contact email or address].
            </p>
          </ol>
          <p className="text-secondary mt-4">
            By using Replix, you acknowledge that you have read, understood, and
            agree to be bound by these Terms of Use. These Terms may be updated
            by Replix from time to time, and continued use of the service after
            such updates constitutes acceptance of the revised Terms.
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
