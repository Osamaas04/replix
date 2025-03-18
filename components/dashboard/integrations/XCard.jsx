import { Switch } from "../ui/switch";

export default function XCard() {
  return (
    <div className="bg-white rounded-md p-8 grid gap-8  lg:w-[19rem] xl:w-[25rem]">
      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <svg
            role="img"
            viewBox="0 0 24 24"
            width={35}
            height={35}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
          </svg>
          <h1 className="font-semibold">X</h1>
        </div>
        <h3 className="text-primary/60">
          Connect your X premium account
        </h3>
      </div>

      <div className="flex justify-end items-center">
        <Switch />
      </div>
    </div>
  );
}
