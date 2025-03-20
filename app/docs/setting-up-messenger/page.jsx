import Link from "next/link";
import Header from "@/components/elements/Header";
import {
  UsersRound,
  Plug,
  Facebook,
  UserRoundCog,
  KeyRound,
  BookCheck,
} from "lucide-react";
import Image from "next/image";
import Footer from "@/components/elements/Footer";

export default function MessengerDoc() {
  return (
    <div className="bg-primary grid gap-24 overflow-hidden">
      <div>
        <Header shouldAnimate={false} />
      </div>
      <div className="font-raleway text-secondary grid items-center mx-auto gap-8 container w-full max-w-5xl px-8 py-8 md:py-10 ">
        <div className="flex flex-col gap-8">
          <div>
            <Link href="/docs" className="text-secondary/70">
              Docs
            </Link>
            <span className="font-semibold"> / Setting Up Messenger</span>
          </div>

          <div>
            <h1 className="font-semibold text-3xl md:text-4xl font-heading">
              Setting Up Messenger
            </h1>
          </div>

          <div className="border-l border-secondary/70 pl-8 italic grid gap-2">
            <h1 className="font-semibold">Pre-Requirements</h1>
            <div className="flex gap-2 items-center">
              <Facebook size={18} />
              <p>
                You have a Facebook Page (Messenger requires a business page,
                not a personal account).
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <KeyRound size={18} />
              <p>You have Admin or Editor access to the Facebook Page.</p>
            </div>
            <div className="flex gap-2 items-center">
              <UserRoundCog size={18} />
              <p>
                You have a Facebook Business Manager account (recommended for
                managing permissions and access).
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <BookCheck size={18} />
              <p>Your Facebook Page is published and has Messenger enabled.</p>
            </div>
            <h1 className="font-semibold">Who can use this feature?</h1>
            <div className="flex gap-2 items-center">
              <UsersRound size={18} />
              <p>
                Either you are Starter or Pro user you have full access to these
                integration tool
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Plug size={18} />
              <p>Users who have connected their Gmail to Cognosys</p>
            </div>
          </div>

          <div>
            <p>
              A Messenger integration with Replix means you can seamlessly
              manage customer inquiries, automate responses, and escalate
              complex cases to human agents-all from a unified dashboard. In
              this guide, you'll find instructions on how to set up Messenger
              with Replix and how you can maximize your experience.
            </p>
          </div>

          <div className="grid gap-2">
            <h1 className="font-semibold text-xl md:text-2xl">
              Connecting your Facebook Page
            </h1>
            <hr />
          </div>

          <div className="grid gap-4">
            <p>
              Navigate to the{" "}
              <code className="bg-secondary/10 p-[0.2rem] rounded-md">
                Integrations
              </code>{" "}
              section in your dashboard. On this page, you’ll be able to toggle
              Messenger integration on and off. Once you click on the toggle,
              follow the prompts to authorize our platform to access your
              Messenger account.
            </p>
            <p className="italic">
              Don't worry, your privacy and security are our top priority. We do
              not use your data for training purposes, nor do we share your data
              externally. All messages are encrypted at rest.
            </p>
          </div>

          {/* <div className="bg-secondary/10 p-64 rounded-md">
            
          </div> */}

          <div className="grid gap-2">
            <h1 className="font-semibold text-xl md:text-2xl">
              Utilizing Messenger Tools
            </h1>
            <hr />
          </div>

          <div className="grid gap-8">
            <h1 className="font-semibold text-lg md:text-xl">
              Messenger Tools
            </h1>
            <h3 className="font-semibold text-sm md:text-md">
              Our Messenger integration allows you to:
            </h3>
            <ol className="list-disc pl-8">
              <li>Automatically respond to customer inquiries using AI.</li>
              <li>Escalate complex queries to human agents when needed.</li>
              <li>
                Track and manage customer conversations from multiple platforms
                in one place.
              </li>
            </ol>

            <h3 className="font-semibold text-sm md:text-md">
              AI-Powered Customer Support, Always On
            </h3>
            <ol className="list-disc pl-8">
              <li>Provide instant responses to frequently asked questions.</li>
              <li>
                Detect when a message requires human intervention and escalate
                it accordingly.
              </li>
            </ol>
          </div>

          <div className="bg-secondary/10 rounded-md">
            <div className="grid gap-8 justify-items-center text-center p-4 sm:p-8 md:p-16">
              <h1 className="font-semibold text-3xl md:text-4xl font-heading">
                Ready to jumpstart your productivity?
              </h1>
              <p>
                Leverage the power of AI with our platform to enhance your
                customer support experience. Automate responses, streamline
                workflows, and empower your team to resolve inquiries faster and
                more efficiently.
              </p>
              <Link href="/dashboard" className="bg-secondary text-primary w-fit rounded-md px-8 py-2 hover:bg-secondary/90">Unlock Your Potential Now</Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
