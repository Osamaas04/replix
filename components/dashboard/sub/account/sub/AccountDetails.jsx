import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function AccountDetails() {
  return (
    <div className="text-secondary w-[20rem]">
      <div className="grid gap-4">
        <div className="grid gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h1 className="font-semibold text-xl">Osama Alasmar</h1>
          <hr />
        </div>

        <div className="grid gap-4">
          <div>
            <h3>osamaas_@gmail.com</h3>
            <Link href="#" className="underline underline-offset-2 text-sm">
              Change email
            </Link>
          </div>

          <hr />
        </div>

        <div className="grid gap-4">
          <div>
            <h3>Password</h3>
            <Link href="#" className="underline underline-offset-2 text-sm">
              Change password
            </Link>
          </div>
          <hr />
        </div>

        <div>
          <button className="bg-red-700 border border-secondary text-secondary rounded-md px-2 py-1 w-20">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
