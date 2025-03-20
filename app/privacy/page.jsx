import Footer from "@/components/elements/Footer";
import Header from "@/components/elements/Header";

export default function Privacy() {
  return (
    <div className="bg-primary grid gap-24">
      <div>
        <Header shouldAnimate={false} />
      </div>
      <div className="font-raleway text-secondary grid items-center mx-auto gap-8 container w-full max-w-5xl px-8 py-8 md:py-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-3xl md:text-4xl font-heading">
            Privacy Policy
          </h1>
          <p className="text-secondary/70 text-balance text-base sm:text-lg max-w-[980px]">
            Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use Replix, an AI-driven customer support platform.
          </p>
        </div>
        <div>
          <ol className="list-decimal pl-5">
            <li className="font-bold">Information We Collect</li>
            <p className="text-secondary/70">
              Replix collects certain personal information to provide its AI-driven customer support services. This may include:
            </p>
            <ol className="list-decimal pl-5 text-secondary/70">
              <li>Personal information you provide when registering for an account, such as your name, email address, and contact details.</li>
              <li>Information related to your use of the service, such as social media accounts linked to Replix, messages sent through the platform, and files uploaded for AI training.</li>
              <li>Data collected through cookies and other tracking technologies to enhance your experience on our platform.</li>
            </ol>

            <li className="font-bold">How We Use Your Information</li>
            <p className="text-secondary/70">
              We use the information we collect for the following purposes:
            </p>
            <ol className="list-decimal pl-5 text-secondary/70">
              <li>To provide and improve Replix’s AI-driven customer support service, including training and fine-tuning AI models based on the data you upload.</li>
              <li>To sync and interact with your linked social media accounts to provide real-time customer support.</li>
              <li>To analyze user behavior and improve the platform's performance, including troubleshooting and resolving issues.</li>
              <li>To send you important updates and notifications related to your account and the service.</li>
            </ol>

            <li className="font-bold">How We Protect Your Information</li>
            <p className="text-secondary/70">
              We take your privacy seriously and implement reasonable security measures to protect the personal information we collect. These measures include:
            </p>
            <ol className="list-decimal pl-5 text-secondary/70">
              <li>Encryption of sensitive data during transmission.</li>
              <li>Regular monitoring of our systems for vulnerabilities and threats.</li>
              <li>Limiting access to personal information to authorized personnel only.</li>
            </ol>
            <p className="text-secondary/70">
              While we make every effort to secure your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.
            </p>

            <li className="font-bold">Sharing Your Information</li>
            <p className="text-secondary/70">
              Replix will not sell, rent, or trade your personal information to third parties. However, we may share your data in the following situations:
            </p>
            <ol className="list-decimal pl-5 text-secondary/70">
              <li>With trusted service providers who assist us in providing the service, such as hosting providers, analytics services, and customer support tools.</li>
              <li>If required by law, regulation, or legal process (such as a subpoena, court order, or government request).</li>
              <li>In connection with a business transfer, such as a merger or acquisition, in which case your personal information may be transferred to the new owner.</li>
            </ol>

            <li className="font-bold">Your Choices</li>
            <p className="text-secondary/70">
              You have certain rights regarding your personal information:
            </p>
            <ol className="list-decimal pl-5 text-secondary/70">
              <li>You can access, update, or delete your account information at any time through your account settings.</li>
              <li>You can request a copy of the personal information we hold about you.</li>
              <li>You can opt-out of receiving marketing communications from us by following the unsubscribe instructions included in each email.</li>
            </ol>

            <li className="font-bold">Retention of Your Information</li>
            <p className="text-secondary/70">
              We will retain your personal information for as long as necessary to provide the services you have requested or as required by law. If you wish to delete your data, you can request this by contacting us directly.
            </p>

            <li className="font-bold">Changes to This Privacy Policy</li>
            <p className="text-secondary/70">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will update the "Last Updated" date at the top of the policy. Continued use of the service after such changes constitutes acceptance of the revised policy.
            </p>

            <li className="font-bold">Contact Information</li>
            <p className="text-secondary/70">
              If you have any questions or concerns about this Privacy Policy, please contact us at [contact email or address].
            </p>
          </ol>
          <p className="text-secondary mt-4">
            By using Replix, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy.
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
