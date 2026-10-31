import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}