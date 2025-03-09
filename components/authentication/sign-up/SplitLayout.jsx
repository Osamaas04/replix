"use client"

import { useMediaQuery } from 'react-responsive';
import Link from "next/link";
import Logo from "@/public/assets/chatlogo.webp";
import Image from "next/image";
import SignUpForm from './SignUpForm';

export default function SplitLayout() {
  const isMidScreen = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="font-raleway flex max-w-[90%] py-4 relative z-10 h-screen mx-auto">
      {!isMidScreen && (
        <div className="bg-secondary/10 border border-secondary/20 rounded-tl-md rounded-bl-md grid w-[50%] p-8">
          <div>
            <Link href="/" className="flex space-x-3 items-center">
              <Image src={Logo} alt="Replix logo" width={22} height={22} />
              <p className="text-secondary text-xl  font-semibold">Replix</p>
            </Link>
          </div>
          <div className="flex items-end">
            <p className="text-secondary ">
              “Our response time dropped from hours to seconds! This AI-powered
              support is a game-changer.” <br />
              <span className="text-sm">Sarah L., E-commerce Owner</span>
            </p>
          </div>
        </div>
      )}

      <div
        className={`border ${
          !isMidScreen && "border-l-0"
        } border-secondary/20 rounded-tr-md rounded-br-md grid gap-2 sm:gap-8 w-[50%] max-w-[50%] px-8 pt-7 ${
          isMidScreen && "w-full max-w-full"
        }`}
      >
        <div className="flex justify-end items-center">
          <Link
            href="/login"
            className="text-secondary w-fit px-2 py-1 rounded-md transition-all duration-500 hover:bg-secondary/20"
          >
            Login
          </Link>
        </div>

        <div className="grid gap-4 h-fit">
          <h1 className="text-secondary text-2xl text-center">
            Create an account
          </h1>
          <p className="text-secondary/70 text-center text-sm">
            Transform your customer experience.
          </p>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
