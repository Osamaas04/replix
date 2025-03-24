import { Switch } from "../ui/switch";

export default function XCard() {
  return (
    <div className="bg-primary text-secondary border border-secondary/70 rounded-md p-8 grid gap-8  lg:w-[19rem] xl:w-[25rem]">
      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <svg
            role="img"
            viewBox="0 0 24 24"
            width={35}
            height={35}
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
          <div>
            <h1 className="font-semibold">X</h1>
            <p className="text-secondary/50">Coming Soon</p>
          </div>
        </div>
        <h3 className="text-secondary/70">Connect your X premium account</h3>
      </div>

      <div className="flex justify-end items-center">
        <Switch disabled />
      </div>
    </div>
  );
}
