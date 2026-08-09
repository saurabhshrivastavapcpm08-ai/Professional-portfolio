import type { Metadata } from "next";
import { DemoShell } from "@/components/DemoShell";

export const metadata: Metadata = {
  title: "Tara AI — HR Coworker Demo",
  description: "AI recruitment coworker prototype — jobs, candidates, and chat.",
};

export default function TaraHrCoworkerCaseStudyPage() {
  return (
    <DemoShell
      title="Tara AI — HR Coworker"
      subtitle="Recruitment coworker prototype"
      demoSrc="/demos/tara/"
      github="https://github.com/saurabhshrivastavapcpm08-ai/hr-coworker"
    />
  );
}
