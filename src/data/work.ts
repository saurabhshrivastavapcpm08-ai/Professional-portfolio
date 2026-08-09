export type CompanyId = "solera" | "tekion";

export type WorkInitiative = {
  id: string;
  title: string;
  why: string;
  what: string;
  how: string;
  impact: string;
  keywords: string[];
};

export type CompanyWork = {
  id: CompanyId;
  name: string;
  role: string;
  dates: string;
  product: string;
  scale?: string;
  headline: string;
  story: string;
  focusAreas: string[];
  initiatives: WorkInitiative[];
};

export const companies: CompanyWork[] = [
  {
    id: "solera",
    name: "Solera Holdings",
    role: "Product Manager / Product Owner",
    dates: "July 2025 – Present",
    product: "Automotive CRM & Digital Retailing Platform",
    scale: "4,000+ dealerships",
    headline: "Scale, platform & commercial product leadership",
    story:
      "I build and scale AI-powered customer engagement and SaaS platform capabilities — from product strategy and execution through GTM and revenue.",
    focusAreas: [
      "AI & CRM",
      "Customer 360",
      "Omnichannel",
      "Digital retailing",
      "Monetization",
    ],
    initiatives: [
      {
        id: "solera-unified-profile",
        title: "Unified Customer Profile",
        why: "Customer data and interactions lived across disconnected CRM workflows and channels, making it hard for sales teams to see the full journey.",
        what: "Consolidated customer information and engagement history into a single Unified Customer Profile inside Solera CRM.",
        how: "Defined journeys, product and data requirements across CRM touchpoints; partnered with engineering, design, and business to connect data with workflows.",
        impact:
          "Laid the foundation for a connected Customer 360 experience and more contextual lifecycle engagement.",
        keywords: [
          "Customer 360",
          "CRM",
          "Customer Data",
          "Omnichannel",
          "SaaS",
        ],
      },
      {
        id: "solera-omnichannel",
        title: "Omnichannel Customer Engagement",
        why: "Multi-channel outreach without shared context led to lost follow-ups and inefficient BDC work.",
        what: "Expanded omnichannel communication across text, WhatsApp, and web-based video inside CRM.",
        how: "Owned discovery, journeys, requirements, and workflow design; integrated channels into existing CRM motions with cross-functional delivery.",
        impact:
          "27.2% more customer interactions and 30.3% improvement in mobile conversions.",
        keywords: [
          "Omnichannel",
          "SMS",
          "WhatsApp",
          "Customer Engagement",
          "B2B SaaS",
        ],
      },
      {
        id: "solera-embedded-video",
        title: "Embedded Video Communications",
        why: "Text and email alone lacked the personalization complex automotive sales often need.",
        what: "Shipped embedded video in email and SMS so dealers send personalized video directly from CRM.",
        how: "Defined end-to-end video journeys, media workflow, embedding UX, and integration requirements; coordinated product, engineering, and GTM.",
        impact:
          "25.1% lift in appointment confirmations via AI-curated embedded video experiences.",
        keywords: [
          "Video Messaging",
          "Embedded Video",
          "Personalization",
          "CRM Integration",
        ],
      },
      {
        id: "solera-video-calling",
        title: "Web-Based Video Calling",
        why: "Customers expect digital alternatives to phone calls; dealerships need flexible remote engagement.",
        what: "Launched browser-based video calling within the CRM experience.",
        how: "Designed user and dealership journeys, call initiation flows, and CRM integration with platform engineering.",
        impact:
          "Extended CRM from async messaging into real-time digital engagement.",
        keywords: [
          "Video Calling",
          "Real-Time Communication",
          "Digital Engagement",
          "CRM",
        ],
      },
      {
        id: "solera-ai-bdc",
        title: "AI Calling Business Development Centre",
        why: "BDC teams juggle high call volume — response time, qualification, and follow-up don't scale manually.",
        what: "Conceptualized an AI-powered Calling BDC for inbound and outbound dealership calls.",
        how: "Defined vision, flows, and integrations across voice AI, telephony, LLMs, STT/TTS, and CRM — as a reusable platform, not a one-off feature.",
        impact:
          "Lead response time from 12.5 to 4.8 minutes; 18.6% more BDC bookings.",
        keywords: [
          "Voice AI",
          "Conversational AI",
          "LLM",
          "AI Agents",
          "BDC",
          "Telephony",
        ],
      },
      {
        id: "solera-dealerfire",
        title: "DealerFire Website Builder",
        why: "Dealers need fast digital storefronts with inventory that stays accurate as stock changes.",
        what: "Led a dynamic dealer website builder with real-time inventory integration.",
        how: "Specified configuration, personalization, inventory sync, and deployment workflows with engineering and business.",
        impact:
          "35% faster onboarding and deployment; 100K+ vehicle listings synced daily.",
        keywords: [
          "Website Builder",
          "CMS",
          "Digital Retailing",
          "Inventory Integration",
          "APIs",
        ],
      },
      {
        id: "solera-monetization",
        title: "Product Strategy, Pricing & Monetization",
        why: "Capabilities need packaging and pricing that align customer value with business goals.",
        what: "Owned SKU definition, pricing, and GTM for Solera portfolio products.",
        how: "Evaluated needs, competition, and value; partnered with sales on positioning and enablement.",
        impact: "$2M incremental revenue; 20.1% adoption of paid SKUs.",
        keywords: [
          "Product Strategy",
          "Pricing",
          "Monetization",
          "GTM",
          "Revenue Growth",
        ],
      },
      {
        id: "solera-ai-automation",
        title: "AI & Workflow Automation",
        why: "CRM workflows include repetitive, time-sensitive work where AI can improve response and productivity.",
        what: "Delivered AI calling, LLM Smart Compose, automated workflows, AI scheduling, and AI-curated video.",
        how: "Prioritized high-value workflows, translated problems into AI requirements, and integrated with engineering into CRM processes.",
        impact:
          "62% faster lead response, 18.6% booking growth, 25.1% better appointment confirmations.",
        keywords: [
          "Generative AI",
          "LLM",
          "Smart Compose",
          "AI Scheduling",
          "Automation",
        ],
      },
    ],
  },
  {
    id: "tekion",
    name: "Tekion Corp",
    role: "Associate Product Manager",
    dates: "July 2022 – June 2025",
    product: "Cloud-Native Automotive Retail SaaS Platform",
    headline: "Customer experience, ML & operational innovation",
    story:
      "I turned complex automotive workflows into scalable digital products — combining customer experience, machine learning, and operational automation.",
    focusAreas: [
      "B2B2C",
      "Customer experience",
      "ML",
      "Workflow automation",
      "SaaS onboarding",
    ],
    initiatives: [
      {
        id: "tekion-onboarding",
        title: "Dealership Onboarding & Implementation Platform",
        why: "Onboarding involved manual forms, mapping, and configuration — hard to scale across implementations.",
        what: "Built a dealership onboarding tool to digitize and standardize platform activation.",
        how: "Mapped end-to-end onboarding; defined form/field mapping, validation, and configuration with implementation and engineering.",
        impact:
          "Less manual effort, more consistent process, and a scalable implementation model.",
        keywords: [
          "Customer Onboarding",
          "Implementation Automation",
          "Form Mapping",
          "Platform Configuration",
        ],
      },
      {
        id: "tekion-portal",
        title: "B2B2C After-Sales Consumer Portal",
        why: "After-sales relied on staff and offline touchpoints — friction for customers and heavy support load.",
        what: "Redesigned the B2B2C after-sales consumer portal for a digital-first experience.",
        how: "Journey mapping in Miro, prototypes in Figma, VOC analysis, and prioritized delivery with design and engineering.",
        impact: "25.4% higher platform adoption; 38.1% fewer support tickets.",
        keywords: [
          "B2B2C",
          "Consumer Experience",
          "UX",
          "Product Discovery",
          "Customer Journey",
        ],
      },
      {
        id: "tekion-ml-recs",
        title: "ML-Powered Recommendation Engine",
        why: "Service advisors need relevant recommendations at scale — generic lists don't convert.",
        what: "Architected and launched a collaborative-filtering recommendation engine for service upsell.",
        how: "SQL analysis, Stitch pipelines, and translation of model logic into advisor-facing UX with engineering.",
        impact: "19% increase in service-center upsell attach rates.",
        keywords: [
          "Machine Learning",
          "Recommendation Systems",
          "Personalization",
          "SQL",
          "Upsell",
        ],
      },
      {
        id: "tekion-documents",
        title: "Digital Document & E-Signature Platform",
        why: "Check-in was document-heavy — manual generation, processing, and signing slowed everyone down.",
        what: "Built a digital document configurator with AI-assisted PDF generation and e-sign workflows.",
        how: "Mapped lifecycle from configuration through signing; integrated generation and e-sign with engineering.",
        impact:
          "63.2% faster check-in, 40% less manual processing, ~$12K annual savings per dealership.",
        keywords: [
          "Document Management",
          "E-Signature",
          "PDF Generation",
          "Workflow Automation",
        ],
      },
      {
        id: "tekion-advisory",
        title: "Enterprise Product Discovery & Advisory Program",
        why: "Feature requests pile up without separating recurring customer problems from one-offs.",
        what: "Created an enterprise advisory group and structured Voice of Customer program.",
        how: "Engaged enterprise customers, translated feedback into requirements, and validated via beta programs.",
        impact:
          "Repeatable discovery → validation → delivery loop with stronger customer involvement.",
        keywords: [
          "Product Discovery",
          "Voice of Customer",
          "Enterprise SaaS",
          "Beta Programs",
        ],
      },
      {
        id: "tekion-data-driven",
        title: "Data-Driven Product Development",
        why: "Shipped features need measurement against customer and business outcomes.",
        what: "Institutionalized data-driven iteration across 20+ enhancements.",
        how: "A/B tests, Google Analytics, behavioral analysis, and VOC to guide prioritization.",
        impact:
          "Continuous experimentation focused on adoption, usability, and customer outcomes.",
        keywords: [
          "A/B Testing",
          "Product Analytics",
          "Conversion Optimization",
          "KPI Management",
        ],
      },
      {
        id: "tekion-ai-dev",
        title: "AI-Assisted Product Development",
        why: "Complex problems need fast prototyping before large engineering bets.",
        what: "Integrated AI-assisted development and rapid prototyping into the product process.",
        how: "GitHub Copilot and VS Code to explore logic and collaborate with engineering.",
        impact:
          "Faster solution exploration from concept to validated implementation.",
        keywords: [
          "Generative AI",
          "Rapid Prototyping",
          "AI-Assisted Development",
        ],
      },
      {
        id: "tekion-cross-functional",
        title: "Cross-Functional Product Leadership",
        why: "Enterprise SaaS needs alignment across engineering, design, implementation, and customers.",
        what: "Owned initiatives across CX, AI/ML, workflow automation, and platform capabilities.",
        how: "Requirements, backlog prioritization, and data-informed decisions with cross-functional partners.",
        impact:
          "Multiple shipped initiatives spanning CX, ML, documents, and onboarding — end-to-end ownership.",
        keywords: [
          "Product Strategy",
          "Roadmap",
          "Agile",
          "Cross-Functional Leadership",
        ],
      },
    ],
  },
];

export function getCompany(id: CompanyId): CompanyWork {
  const company = companies.find((c) => c.id === id);
  if (!company) throw new Error(`Unknown company: ${id}`);
  return company;
}
