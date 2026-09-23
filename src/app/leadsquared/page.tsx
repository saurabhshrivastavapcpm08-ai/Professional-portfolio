import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { LeadSquaredApp } from "@/components/leadsquared/LeadSquaredApp";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LeadSquared Mobile CRM",
  description:
    "Field Day prototype for on-device capture, agent-ready CRM actions, and an adaptive field workspace.",
};

export default function LeadSquaredPage() {
  return (
    <div className={mulish.className}>
      <LeadSquaredApp />
    </div>
  );
}
