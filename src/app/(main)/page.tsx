import type { Metadata } from "next";
import { ApproachTimelineSection } from "@/components/ApproachTimelineSection";
import { FeaturedCaseStudiesSection } from "@/components/FeaturedCaseStudiesSection";
import { FeaturedWorkHome } from "@/components/FeaturedWorkHome";
import { HeroSection } from "@/components/hero/HeroSection";
import { HomeAboutCtaSection } from "@/components/HomeAboutCtaSection";
import { ImpactStatsSection } from "@/components/ImpactStatsSection";

export const metadata: Metadata = {
  title: "Saurabh Shrivastava | Product Manager",
  description:
    "Product Manager with 4+ years of experience building AI-powered B2B/B2C SaaS products across CRM, customer experience, automation and digital platforms.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactStatsSection />
      <ApproachTimelineSection />
      <FeaturedWorkHome />
      <FeaturedCaseStudiesSection />
      <HomeAboutCtaSection />
    </>
  );
}
