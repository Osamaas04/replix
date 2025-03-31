import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CircleAlert } from "lucide-react";

export function TasksAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-semibold text-lg">
          Train AI & Assign Human Agents
        </AccordionTrigger>
        <AccordionContent className="grid gap-8">
          <h3 className="text-sm text-secondary/70 ">
            Complete the necessary steps to unlock the next one.
          </h3>
          <div className="grid gap-8">
            <ol className="grid gap-4">
              <li className="flex items-center gap-2">
                <p>
                  Upload Fine-Tune Data -{" "}
                  <span className="italic">Required</span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Train AI with company-specific responses.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>

              <li className="flex items-center gap-2">
                <p>
                  Upload Validation Data -{" "}
                  <span className="italic">Required</span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ensure AI response accuracy and quality.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>

              <li className="flex items-center gap-2">
                <p>
                  Assign Human Agents - <span className="italic">Optional</span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Set up agents for complex queries.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ol>

            <Link
              href="#"
              className="bg-secondary text-primary rounded-md px-2 py-1 mx-auto text-center w-[30vw] "
            >
              Start AI Training
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-semibold text-lg">
          Integrate Social Media
        </AccordionTrigger>
        <AccordionContent className="grid gap-8">
          <h3 className="text-sm text-secondary/70 ">
            Complete the necessary steps to unlock the next one.
          </h3>
          <div className="grid gap-8">
            <ol className="grid gap-4">
              <li className="flex items-center gap-2">
                <p>
                  Connect Messenger -{" "}
                  <span className="italic">
                    Required for Instagram & WhatsApp
                  </span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enable AI to handle Messenger conversations.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>

              <li className="flex items-center gap-2">
                <p>
                  Link Instagram Account -{" "}
                  <span className="italic">Optional</span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Manage Instagram DMs seamlessly.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>

              <li className="flex items-center gap-2">
                <p>
                  Integrate WhatsApp Business -{" "}
                  <span className="italic">Optional</span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Automate WhatsApp customer support.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ol>

            <Link
              href="#"
              className="bg-secondary text-primary rounded-md px-2 py-1 mx-auto text-center w-[30vw] "
            >
              Connect Social Media
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-semibold text-lg">
          Activate Workflows
        </AccordionTrigger>
        <AccordionContent className="grid gap-8">
          <h3 className="text-sm text-secondary/70 ">
            Complete the necessary steps to finish this setup.
          </h3>
          <div className="grid gap-8">
            <ol className="grid gap-4">
              <li className="flex items-center gap-2">
                <p>
                  Enable AI for Messenger -{" "}
                  <span className="italic">If Integrated</span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Start AI-powered messaging.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>

              <li className="flex items-center gap-2">
                <p>
                  Activate Instagram Support -{" "}
                  <span className="italic">If Integrated</span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Automate Instagram customer interactions.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>

              <li className="flex items-center gap-2">
                <p>
                  Turn On WhatsApp AI Responses -{" "}
                  <span className="italic">If Integrated</span>
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert size={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow AI to handle WhatsApp queries.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ol>

            <Link
              href="#"
              className="bg-secondary text-primary rounded-md px-2 py-1 mx-auto text-center w-[30vw] "
            >
              Activate Workflows
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
