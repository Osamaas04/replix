"use client";

import Footer from "@/components/elements/Footer";
import Header from "@/components/elements/Header";
import NavBar from "@/components/elements/NavBar";
import Chats from "@/components/sections/chats_section/main/chats";
import Dashboard from "@/components/sections/dashboard_section/main/Dashboard";
import Results from "@/components/sections/results_section/main/Results";
import HeroSection from "@/components/sections/hero_section/main/HeroSection";
import Integrations from "@/components/sections/integrations_section/main/Integration";
import Pricing from "@/components/sections/pricing_section/main/Pricing";

export default function Home() {
  return (
    <div className="bg-primary grid gap-[18rem]">
      <Header shouldAnimate={true}/>
      <NavBar />
      <HeroSection />
      <div className="grid gap-0">
      <Dashboard />
        <section id="chats">
        <Chats />
        </section>
        
        
      </div>
      <Integrations />
      <Results />
      <Pricing />
      <Footer />
    </div>
  );
}
