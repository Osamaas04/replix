import { Upload } from "lucide-react";
import { useRef } from "react";

export default function UploadFile({ title, isValidation }) {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append(isValidation ? "validation_file" : "fine_tune_file", file);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
    };

    return (
        <form>
            <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
            />
            <div className="flex flex-col gap-8 justify-center items-center rounded-md h-[20rem] my-auto">
                <button 
                    type="button" 
                    className="grid justify-self-center border border-secondary/70 border-dashed rounded-full p-8 w-fit h-fit"
                    onClick={handleButtonClick}
                >
                    <Upload color="white" />
                </button>

                <div className="grid justify-center">
                    <h1 className="font-semibold text-center text-secondary">{title}</h1>
                </div>
            </div>
        </form>
    );
}
