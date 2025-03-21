import Link from "next/link";
import Header from "@/components/elements/Header";
import { UsersRound, Plug, Instagram, Link2, Key } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/elements/Footer";

export default function trainAi() {
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
            <span className="font-semibold"> / train-ai</span>
          </div>

          <div>
            <h1 className="font-semibold text-3xl md:text-4xl font-heading">
              Train AI
            </h1>
          </div>

          <div>
            <p>
              Enhance your AI’s accuracy by training it with custom datasets and
              setting a preferred response style. Follow the steps below to
              upload training data and personalize AI-generated replies.
            </p>
          </div>

          {/* <div className="bg-secondary/10 p-64 rounded-md">
            
          </div> */}

          <div className="grid gap-2">
            <h1 className="font-semibold text-xl md:text-2xl">
              Upload Training Data
            </h1>
            <hr />
          </div>

          <div className="grid gap-8">
            <h3 className="font-semibold text-sm md:text-md">
              Follow the steps to customize the AI:
            </h3>
            <ol className="list-decimal pl-8">
              <li>Navigate to the Train AI section in your dashboard.</li>
              <li>Click on the Upload File button.</li>
              <li>
                Select a dataset in one of the supported formats: TXT, Excel,
                JSONL, JSON, or CSV.
              </li>
              <li>
                Ensure the file contains structured customer queries and
                responses.
              </li>
            </ol>

            <h3 className="font-semibold text-sm md:text-md">
              Choose AI Reply Style
            </h3>
            <ol className="list-disc pl-8">
              <li>Formal – Professional and structured.</li>
              <li>Casual – Friendly and conversational.</li>
              <li>Playful – Engaging and humorous.</li>
            </ol>

            <h3 className="font-semibold text-sm md:text-md">Train the AI</h3>
            <ol className="list-decimal pl-8">
              <li>
                Once the file is uploaded, click Start Training to process the
                data.
              </li>
              <li>The AI will analyze the file and refine its responses.</li>
              <li>
                Training progress will be displayed, and completion status will
                be updated in real-time.
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
