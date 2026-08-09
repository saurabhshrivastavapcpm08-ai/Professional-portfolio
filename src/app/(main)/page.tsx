import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Introduction } from "@/components/Introduction";
import { WorkExperience } from "@/components/WorkExperience";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Introduction />
      <WorkExperience />
      <CaseStudies />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
