import type { Metadata } from "next";
import { WorkCompanyView } from "@/components/WorkCompanyView";

export const metadata: Metadata = {
  title: "Saurabh Shrivastava | Product Work",
  description:
    "Product work across Solera and Tekion — AI, CRM, customer experience, automation, ML and platform products.",
};

export default function WorkIndexPage() {
  return <WorkCompanyView companyId="solera" />;
}
