import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Skills from "@/components/sections/Skills";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  description:
    "Portfolio of Hasitha Amarasinghe - CS undergraduate at the University of Ruhuna exploring DevOps, Linux, and infrastructure.",
};

export default function Home() {
  return (
    <PageShell footer={<Footer />}>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Skills />
      <ContactCTA />
    </PageShell>
  );
}