import Link from "next/link";
import Header from "@/components/elements/Header";
import { UsersRound, Plug, Link2, Key } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Footer from "@/components/elements/Footer";

export default function WhatsappDoc() {
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
            <span className="font-semibold"> / Setting Up WhatsApp</span>
          </div>

          <div>
            <h1 className="font-semibold text-3xl md:text-4xl font-heading">
              Setting Up WhatsApp
            </h1>
          </div>

          <div className="border-l border-secondary/70 pl-8 italic grid gap-2">
            <h1 className="font-semibold">Pre-Requirements</h1>
            <div className="inline">
              {" "}
              <FaWhatsapp size={22} className="inline" />
              <p className="inline">
                {" "}
                You have an WhatsApp Profissional Account (not a personal account).
              </p>
            </div>
            <div className="inline">
              <Key size={22} className="inline" />{" "}
              <p className="inline">
                You have Admin or Editor access to the linked Facebook Page.
              </p>
            </div>
            <div className="inline">
              <Link2 size={22} className="inline" />{" "}
              <p className="inline">
                Your WhatsApp account is linked to a Facebook Page.
              </p>
            </div>
            <h1 className="font-semibold">Who can use this feature?</h1>
            <div className="inline">
              <UsersRound size={22} className="inline" />{" "}
              <p className="inline">
                Only Pro users have full access to these
                integration tool
              </p>
            </div>
            <div className="inline">
              <Plug size={22} className="inline" />{" "}
              <p className="inline">
                Users who have connected their WhatsApp to Replix
              </p>
            </div>
          </div>

          <div>
            <p>
              An WhatsApp integration with Replix allows you to efficiently
              manage customer interactions, automate responses, and escalate
              complex inquiries to human agents—all from a single dashboard.
              This guide will walk you through setting up WhatsApp with Replix
              and making the most of its features.
            </p>
          </div>

          <div className="grid gap-2">
            <h1 className="font-semibold text-xl md:text-2xl">
              Connecting your WhatsApp Business Acoount
            </h1>
            <hr />
          </div>

          <div className="grid gap-4">
            <p>
              Navigate to the{" "}
              <code className="bg-secondary/10 p-[0.2rem] rounded-md">
                Integrations
              </code>{" "}
              section in your dashboard. Toggle the WhatsApp integration ON.
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
              Utilizing WhatsApp Tools
            </h1>
            <hr />
          </div>

          <div className="grid gap-8">
            <h1 className="font-semibold text-lg md:text-xl">
              WhatsApp Tools
            </h1>
            <h3 className="font-semibold text-sm md:text-md">
              Our WhatsApp integration allows you to:
            </h3>
            <ol className="list-disc pl-8">
              <li>AI-Powered Replies: Instantly respond to DMs using AI</li>
              <li>
                Escalation System: If AI confidence is low, human agents take
                over.
              </li>
              <li>
                Centralized Inbox: Manage all social media conversations from
                one dashboard.
              </li>
            </ol>

            <h3 className="font-semibold text-sm md:text-md">
              Automation with WhatsApp
            </h3>
            <ol className="list-disc pl-8">
              <li>
                Triggered Workflows: Example – If someone asks about pricing,
                send a predefined response.
              </li>
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
              <Link
                href="/dashboard"
                className="bg-secondary text-primary w-fit rounded-md px-8 py-2 hover:bg-secondary/90"
              >
                Unlock Your Potential Now
              </Link>
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
