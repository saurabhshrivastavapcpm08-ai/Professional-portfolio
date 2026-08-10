import type { Metadata } from "next";
import { DemoShell } from "@/components/DemoShell";

export const metadata: Metadata = {
  title: "YouTube Music Premium+ — Live Demo",
  description:
    "Interactive executive product proposal for YouTube Music Premium+.",
};

export default function YouTubeMusicCaseStudyPage() {
  return (
    <DemoShell
      title="YouTube Music Premium+"
      subtitle="Executive product proposal & planning package"
      demoSrc="/demos/yt/"
    />
  );
}
