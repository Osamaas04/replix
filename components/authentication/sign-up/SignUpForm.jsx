import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const API_GATEWAY = "https://api-gateway-livid.vercel.app/api/social";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Re-password is required"),
});

async function handleRegister(values, setLoading) {
  setLoading(true);

  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("companyName", values.companyName);
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("confirmPassword", values.rePassword);

  try {
    const response = await fetch("http://replix.runasp.net/account/register", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      toast.error(`Failed to register. Error: ${data.message || 'Please try again.'}`);
    } else {
      const data = await response.json();
      const createUserIdResponse = await fetch(`${API_GATEWAY}/createUserId`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: data.userId,
        }),
      });
    }
  } catch (error) {
    toast.error("An error occurred during registration.");
  } finally {
    setLoading(false);
  }
}

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      companyName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => handleRegister(values, setLoading),
  });

  return (
    <div className="space-y-4">
      <form className="grid gap-2 text-secondary mx-auto max-w-[22rem]" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-xs">{formik.errors.name}</div>
        )}

        <input
          type="text"
          placeholder="Company Name"
          name="companyName"
          onChange={formik.handleChange}
          value={formik.values.companyName}
          className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
        />
        {formik.touched.companyName && formik.errors.companyName && (
          <div className="text-red-500 text-xs">{formik.errors.companyName}</div>
        )}

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

        <input
          type="password"
          placeholder="Re-password"
          name="rePassword"
          onChange={formik.handleChange}
          value={formik.values.rePassword}
          className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
        />
        {formik.touched.rePassword && formik.errors.rePassword && (
          <div className="text-red-500 text-xs">{formik.errors.rePassword}</div>
        )}

        <button
          type="submit"
          className="bg-secondary text-primary py-1 rounded-md transition-all duration-500 hover:bg-secondary/95 w-full flex justify-center items-center h-8"
        >
          Sign Up
          {loading && <LoaderCircle className="text-primary/70 animate-spin" width={18} height={18} />}
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
