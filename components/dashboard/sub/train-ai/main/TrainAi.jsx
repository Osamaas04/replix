import { Upload, BrainCog, SpellCheck } from "lucide-react";
import UploadHandler from "../sub/UploadHandler";


export default function TrainAi() {
    return (
        <div>
            <div className="grid gap-4 px-4 py-12 lg:py-14 lg:pr-14 lg:pl-[19.5rem] w-auto">
                <div className="grid gap-2">
                    <h1 className="text-secondary text-3xl font-semibold">Train AI</h1>
                    <h3 className="text-secondary/70">
                        Upload your file, choose your style and make your AI smarter.
                    </h3>
                </div>

                

                <div>
                    <UploadHandler />
                </div>



            </div>
        </div>
    );
}
