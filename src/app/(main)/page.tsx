import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { SectionScaffold } from "@/components/SectionScaffold";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <SectionScaffold id="cases" label="Cases" index="02" />
      <SectionScaffold id="skills" label="Skills" index="03" />
      <SectionScaffold id="timeline" label="Timeline" index="04" />
      <SectionScaffold id="connect" label="Connect" index="05" />
    </>
  );
}
