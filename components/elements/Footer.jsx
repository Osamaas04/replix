import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/chatlogo.webp";

export default function Footer() {
  return (
    <div className="bg-primary font-raleway grid justify-items-center gap-6  sm:flex sm:items-center sm:justify-between border-t border-secondary/70 px-6 md:px-24 py-4 md:py-6">
      <div>
        <Link href="#" className="flex space-x-3 items-center">
          <Image src={Logo} alt="Replix logo" width={22} height={22} />
          <p className="text-secondary text-xl  font-semibold">Replix</p>
        </Link>
      </div>

      <div className="flex gap-4">
        <Link
          href="/terms"
          className="text-secondary hover:text-secondary/70 hover:underline transition-all duration-300"
        >
          Terms
        </Link>
        <Link
          href="/privacy"
          className="text-secondary hover:text-secondary/70 hover:underline transition-all duration-300"
        >
          Privacy
        </Link>
        
      </div>

      <div className="flex gap-4">
        <Link href="#" className="bg-secondary rounded-full p-2 grid items-center transition-all duration-300 hover:bg-secondary/70">
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="#000"
            width={15}
            height={15}
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>X</title>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
        </Link>
        <Link href="#" className="bg-secondary rounded-full p-2 grid items-center transition-all duration-300 hover:bg-secondary/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#000"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
