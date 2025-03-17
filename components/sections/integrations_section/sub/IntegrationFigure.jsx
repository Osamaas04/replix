import { IntegrationsFigure } from "../ui/IntegrationsFigure";
import { Link, BrainCircuit, MessageSquareReply } from "lucide-react";

export default function IntegrationFigure() {
  return (
    <div>
      <div className="font-raleway text-secondary grid gap-12 justify-items-center md:flex md:flex-row-reverse md:justify-around items-center">
        {/* Move IntegrationsFigure to the top in grid mode */}
        <IntegrationsFigure className="order-first md:order-none" />

        <ol className="items-start px-10 grid gap-8">
          <li>
            <div className="flex items-center gap-4 text-xl">
              <Link size={22} />
              <strong>Connect</strong>
            </div>
            <p className="mt-1 text-secondary/70 text-sm max-w-96">
              Sync your social and messaging platforms to create a unified
              support system.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-4 text-xl">
              <BrainCircuit size={22} />
              <strong>Train</strong>
            </div>
            <p className="mt-1 text-secondary/70 text-sm max-w-96">
              Feed the AI with your data to make it smarter, faster, and
              tailored to your business.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-4 text-xl">
              <MessageSquareReply size={22} />
              <strong>Automate</strong>
            </div>
            <p className="mt-1 text-secondary/70 text-sm max-w-96">
              Deploy AI-driven replies that scale your customer support without
              breaking a sweat.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}
