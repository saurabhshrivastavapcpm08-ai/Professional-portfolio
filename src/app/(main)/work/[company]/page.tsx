import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkCompanyView } from "@/components/WorkCompanyView";
import { companies, type CompanyId } from "@/data/work";

type Props = { params: Promise<{ company: string }> };

export function generateStaticParams() {
  return companies.map((c) => ({ company: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company: id } = await params;
  const company = companies.find((c) => c.id === id);
  if (!company) return { title: "Work" };
  return {
    title: `${company.name} | Product Work`,
    description: company.story,
  };
}

export default async function WorkCompanyPage({ params }: Props) {
  const { company: id } = await params;
  if (id !== "solera" && id !== "tekion") notFound();
  return <WorkCompanyView companyId={id as CompanyId} />;
}
