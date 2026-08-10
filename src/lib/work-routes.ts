import { companies, type CompanyId, type WorkInitiative, type CompanyWork } from "@/data/work";

/** URL slugs for project detail routes — content unchanged. */
export const initiativeSlugById: Record<string, string> = {
  "solera-unified-profile": "unified-customer-profile",
  "solera-omnichannel": "omnichannel",
  "solera-embedded-video": "embedded-video",
  "solera-video-calling": "video-calling",
  "solera-ai-bdc": "ai-calling",
  "solera-dealerfire": "dealerfire",
  "solera-monetization": "monetization",
  "solera-ai-automation": "ai-automation",
  "tekion-onboarding": "dealership-onboarding",
  "tekion-portal": "consumer-portal",
  "tekion-ml-recs": "ml-recommendation",
  "tekion-documents": "document-manager",
  "tekion-advisory": "product-discovery",
  "tekion-data-driven": "data-driven",
  "tekion-ai-dev": "ai-assisted-development",
  "tekion-cross-functional": "cross-functional",
};

export type ProjectRecord = {
  company: CompanyWork;
  initiative: WorkInitiative;
  slug: string;
  href: string;
  index: number;
};

export function slugForInitiative(id: string): string {
  return initiativeSlugById[id] ?? id;
}

export function getCompanyProjects(companyId: CompanyId): ProjectRecord[] {
  const company = companies.find((c) => c.id === companyId);
  if (!company) return [];
  return company.initiatives.map((initiative, index) => {
    const slug = slugForInitiative(initiative.id);
    return {
      company,
      initiative,
      slug,
      href: `/work/${companyId}/${slug}`,
      index: index + 1,
    };
  });
}

export function getProject(
  companyId: CompanyId,
  slug: string,
): ProjectRecord | null {
  const projects = getCompanyProjects(companyId);
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentProjects(companyId: CompanyId, slug: string) {
  const projects = getCompanyProjects(companyId);
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i < projects.length - 1 ? projects[i + 1] : null,
  };
}

export function getAllProjectParams() {
  return companies.flatMap((c) =>
    c.initiatives.map((initiative) => ({
      company: c.id,
      project: slugForInitiative(initiative.id),
    })),
  );
}

/** Homepage featured work — four selected projects, existing content only. */
export const featuredProjectIds = [
  "solera-ai-bdc",
  "solera-unified-profile",
  "tekion-onboarding",
  "tekion-ml-recs",
] as const;

export function getFeaturedProjects(): ProjectRecord[] {
  return featuredProjectIds
    .map((id) => {
      for (const company of companies) {
        const idx = company.initiatives.findIndex((i) => i.id === id);
        if (idx >= 0) {
          const initiative = company.initiatives[idx];
          const slug = slugForInitiative(initiative.id);
          return {
            company,
            initiative,
            slug,
            href: `/work/${company.id}/${slug}`,
            index: idx + 1,
          };
        }
      }
      return null;
    })
    .filter((p): p is ProjectRecord => p !== null);
}

export const productFocus = [
  {
    title: "AI & Automation",
    description:
      "Building AI-powered workflows, conversational experiences and intelligent automation.",
  },
  {
    title: "B2B SaaS",
    description:
      "Designing products that solve complex business problems at scale.",
  },
  {
    title: "Customer Experience",
    description:
      "Turning fragmented journeys into simpler, more contextual experiences.",
  },
  {
    title: "Platform Products",
    description:
      "Building reusable capabilities that scale across products and workflows.",
  },
  {
    title: "GTM & Monetization",
    description:
      "Connecting product value with pricing, packaging, adoption and revenue.",
  },
] as const;
