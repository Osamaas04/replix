import { Raleway, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/dashboard/sub/integrations/ui/sonner";

const raleway = Raleway({
  variable: "--font-raleway", 
  subsets: ["latin"],
  weight: ["400", "700"], 
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], 
});

export const metadata = {
  title: "Relpix",
  description: "The Future of AI-driven Customer Support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${raleway.variable} ${lato.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
