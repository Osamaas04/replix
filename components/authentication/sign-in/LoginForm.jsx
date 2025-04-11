"use client"

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

const API_GATEWAY = "https://api-gateway-livid.vercel.app/api/account";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

async function handleLogin(values, setLoading, router) {
  setLoading(true);

  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);

  try {
    const response = await fetch(`${API_GATEWAY}/login`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(`Login failed: ${data.message || "Try again."}`);
      return;
    }

    Cookies.set("token", data.token, {
      expires: 1,
      secure: true,
      sameSite: "none",
    });

    toast.success("Login successful!");
    router.push("/dashboard"); 
  } catch (error) {
    console.error(error);
    toast.error("An error occurred during login.");
  } finally {
    setLoading(false);
  }
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => handleLogin(values, setLoading, router),
  });

  return (
    <div className="space-y-4">
      <form
        onSubmit={formik.handleSubmit}
        className="grid gap-2 text-secondary mx-auto max-w-[22rem]"
      >
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs">{formik.errors.email}</div>
        )}

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-xs">{formik.errors.password}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-secondary text-primary py-1 rounded-md transition-all duration-500 hover:bg-secondary/95 w-full flex justify-center items-center h-8"
        >
          {loading ? (
            <LoaderCircle
              className="text-primary/70 animate-spin"
              width={18}
              height={18}
            />
          ) : (
            "Sign in"
          )}
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
