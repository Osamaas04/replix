import Link from "next/link";

const API_GATEWAY = "https://api-gateway-livid.vercel.app/api/account";

async function handleRegister() {
  const response = await fetch(`${API_GATEWAY}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ }),
  });
}

export default function SignUpForm() {
  return (
    <div className="space-y-4">
      <form className="grid gap-2 text-secondary mx-auto max-w-[22rem]">
        <input
          type="text"
          placeholder="Name"
          className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
        />
        <input
          type="text"
          placeholder="Company Name"
          className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
        />
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
        <input
          type="password"
          placeholder="Re-password"
          className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
        />
        <button className="bg-secondary text-primary py-1 rounded-md transition-all duration-500 hover:bg-secondary/95 w-full">
          Sign up
        </button>
      </form>
      <div className="grid justify-center">
        <p className="text-secondary/70 text-[0.75rem] text-center max-w-[16rem]">
          By clicking sign up, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
