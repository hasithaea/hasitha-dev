import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import EducationAndCerts from "@/components/sections/EducationAndCerts";
import Skills from "@/components/sections/Skills";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <PageShell footer={<Footer />}>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <EducationAndCerts />
      <Skills />
      <ContactCTA />
    </PageShell>
  );
}