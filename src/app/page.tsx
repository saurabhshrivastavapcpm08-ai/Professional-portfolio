import { About } from "@/components/About";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Impact } from "@/components/Impact";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Impact />
      <About />
      <Projects />
      <CaseStudies />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
