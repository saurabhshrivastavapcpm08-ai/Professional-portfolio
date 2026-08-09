import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { CasesSection } from "@/components/CasesSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ConnectSection } from "@/components/ConnectSection";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <CasesSection />
      <SkillsSection />
      <TimelineSection />
      <ConnectSection />
    </>
  );
}
