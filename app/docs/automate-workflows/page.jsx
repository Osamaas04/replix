import Link from "next/link";
import Header from "@/components/elements/Header";
import Image from "next/image";
import Footer from "@/components/elements/Footer";

export default function automateWorkflow() {
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
            <span className="font-semibold"> / automate-workflows</span>
          </div>

          <div>
            <h1 className="font-semibold text-3xl md:text-4xl font-heading">
              Automate Workflows
            </h1>
          </div>

          <div>
            <p>
              Automated Workflows run continuously, operating 24/7 to detect and
              respond to real-time events instantly.
            </p>
          </div>

          {/* <div className="bg-secondary/10 p-64 rounded-md">
            
          </div> */}

          <div className="grid gap-2">
            <h1 className="font-semibold text-xl md:text-2xl">
              Activate a Workflow
            </h1>
            <hr />
          </div>

          <div className="grid gap-4">
            <p>
              Navigate to the{" "}
              <code className="bg-secondary/10 p-[0.2rem] rounded-md">
                Automations
              </code>{" "}
              section in your dashboard. select Paused from the menu above then press Activate to trigger the
              automation workflow.
            </p>
            
          </div>

          

          <div className="grid gap-2">
            <h1 className="font-semibold text-xl md:text-2xl">
              Pause a Workflow
            </h1>
            <hr />
          </div>

          <div className="grid gap-4">
            <p>
              Navigate to the{" "}
              <code className="bg-secondary/10 p-[0.2rem] rounded-md">
                Automations
              </code>{" "}
              section in your dashboard. select Activated from the menu above then press Pause to trigger the
              automation workflow.
            </p>
            <p className="italic">
              Don't worry, your privacy and security are our top priority. We do
              not use your data for training purposes, nor do we share your data
              externally. All messages are encrypted at rest.
            </p>
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
