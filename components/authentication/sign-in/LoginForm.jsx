import Link from "next/link";

const API_GATEWAY = "https://api-gateway-livid.vercel.app/api/account";

async function handleRegister() {
  const response = await fetch(`${API_GATEWAY}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ }),
  });
}

export default function LoginForm() {
    return(
        <div className="space-y-4">
          <form
            className="grid gap-2 text-secondary mx-auto max-w-[22rem]"
          >
            <input
              type="text"
              placeholder="Email"
              className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
            />

            <button className="bg-secondary text-primary py-1 rounded-md transition-all duration-500 hover:bg-secondary/95 w-full">
              Sign in
            </button>
          </form>
          <div className="grid justify-center">
            <Link
              href="#"
              className="text-secondary/70 text-[0.75rem] text-center max-w-[16rem] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
    );
}