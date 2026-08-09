export const site = {
  name: "Saurabh Shrivastava",
  title: "Strategic Product Manager",
  positioning: "AI-Powered SaaS & Omnichannel Communications | GTM & Monetization",
  tagline:
    "4+ years building AI-powered B2B/B2B2C SaaS platforms, backed by 8+ years driving growth, sales, and operations.",
  location: "Bangalore, India",
  email: "saurabh_shrivastava_pcpm08@execed.isb.edu",
  emailAlt: "saurabh.shrivastava22@gmail.com",
  phone: "+91-9038066701",
  linkedin: "https://www.linkedin.com/in/connectwithsaurabh",
  resumePath: "/resume.pdf",
  copyright: `© ${new Date().getFullYear()} Saurabh Shrivastava. All rights reserved.`,
  openTo: "Open to mid-management Product Manager roles — let's talk.",
};

export const about = `Results-driven Product Manager with 4+ years of dedicated product leadership building AI-powered B2B/B2B2C SaaS platforms, backed by 8+ years of cross-functional experience in growth, sales, and operations. I own flagship products end-to-end — from pricing and GTM strategy to AI/ML feature delivery — and specialize in applying generative AI, machine learning, and omnichannel communication architectures to solve real operational problems in regulated, high-scale industries like automotive retail.`;

export const impactStats = [
  {
    value: "$2M",
    label: "Incremental revenue via ML-driven pricing",
    detail: "20.1% paid SKU adoption",
  },
  {
    value: "62%",
    label: "Faster lead response with AI automation",
    detail: "18.6% more BDC bookings",
  },
  {
    value: "25.4%",
    label: "Increase in platform adoption",
    detail: "38.1% drop in support tickets",
  },
  {
    value: "63.2%",
    label: "Reduction in customer check-in time",
    detail: "~$12K saved per dealership / year",
  },
  {
    value: "27.2%",
    label: "Growth in omnichannel interactions",
    detail: "30.3% mobile conversion lift",
  },
  {
    value: "19%",
    label: "Increase in upsell attach rate",
    detail: "ML recommendation engine",
  },
];

export const skillGroups = [
  {
    title: "Product Strategy",
    items: [
      "Go-To-Market (GTM) Strategy",
      "Pricing & Monetization",
      "SKU Definition",
      "Competitive & Market Research",
      "OKRs",
      "Product Lifecycle Management",
      "Roadmap Development",
    ],
  },
  {
    title: "AI & ML Capabilities",
    items: [
      "Generative AI Features",
      "LLM-Powered Workflows",
      "Prompt Engineering",
      "ML Recommendation Systems",
      "Conversational Automation",
      "AI-Assisted Scheduling",
      "Voice AI Telephony",
      "Text-to-Speech (TTS)",
      "Speech-to-Text (STT)",
    ],
  },
  {
    title: "Product Execution",
    items: [
      "Agile/Scrum",
      "API-First Architecture",
      "B2B2C SaaS Portals",
      "A/B Testing",
      "Conversion Rate Optimization",
      "Usability Testing",
      "Rapid Prototyping",
    ],
  },
  {
    title: "Data & Compliance",
    items: [
      "Data-Driven Decision Making",
      "Funnel Analysis",
      "GDPR & CCPA Compliance",
      "KPI/Metrics Ownership",
      "SQL",
    ],
  },
  {
    title: "Tools",
    items: [
      "Jira",
      "Confluence",
      "Notion",
      "TestRail",
      "Figma",
      "Miro",
      "Google Analytics",
      "Pendo",
      "Postman",
      "REST APIs",
      "Salesforce",
      "Twilio",
      "Deepgram",
      "OpenAI APIs",
      "Cursor",
      "GitHub Copilot",
    ],
  },
];

export type Project = {
  id: string;
  company: "Tekion" | "Solera";
  title: string;
  role: string;
  summary: string;
  responsibilities: string[];
  impact: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "tekion-consumer-portal",
    company: "Tekion",
    title: "B2B2C After-Sales Consumer Portal Revamp",
    role: "Associate Product Manager",
    summary:
      "End-to-end revamp of Tekion’s consumer portal — a B2B2C platform where customers track vehicle service status, appointments, and after-sales journeys across dealership networks.",
    responsibilities: [
      "Redesigned the full after-sales customer journey with Figma prototypes and Miro journey maps",
      "Ran usability testing and Voice of Customer loops to prioritize high-friction flows",
      "Partnered with engineering and design to ship a digital-first service tracking experience",
      "Instrumented adoption and support-ticket metrics to guide iteration",
    ],
    impact: [
      "+25.4% platform adoption",
      "−38.1% incoming support tickets",
    ],
    tags: ["B2B2C", "Service Tracking", "UX", "Automotive"],
  },
  {
    id: "tekion-recommendation",
    company: "Tekion",
    title: "ML-Powered Recommendation Engine",
    role: "Associate Product Manager",
    summary:
      "Collaborative-filtering recommendation engine that personalizes service upsell suggestions using customer and vehicle history instead of generic catalogs.",
    responsibilities: [
      "Architected product requirements for personalized service recommendations",
      "Analyzed datasets in SQL and coordinated data pipelines via Stitch",
      "Defined success metrics around attach rate and service advisor adoption",
      "Aligned dealership workflows so recommendations surfaced at decision moments",
    ],
    impact: ["+19% upsell attach rate across dealership service centers"],
    tags: ["ML", "Personalization", "SQL", "Upsell"],
  },
  {
    id: "tekion-pdf-esign",
    company: "Tekion",
    title: "PDF Configurator, AI Document Manager & E-Sign",
    role: "Associate Product Manager",
    summary:
      "Document configurator with AI-assisted PDF generation and integrated e-signature workflows to replace slow, manual dealership paperwork at check-in.",
    responsibilities: [
      "Defined configurator rules, templates, and e-sign handoffs for service documents",
      "Accelerated delivery with AI-assisted prototyping (GitHub Copilot) alongside eng partners",
      "Reduced manual processing steps for advisors and customers",
      "Tied check-in time and cost savings to dealership ROI narratives for GTM",
    ],
    impact: [
      "−63.2% customer check-in time",
      "−40% manual processing",
      "~$12K annual savings per dealership",
    ],
    tags: ["PDF", "E-Sign", "Automation", "AI"],
  },
  {
    id: "tekion-onboarding",
    company: "Tekion",
    title: "Enterprise Onboarding Tool",
    role: "Associate Product Manager",
    summary:
      "Onboarding tooling built to compress dealership and product onboarding timelines — turning fragmented setup steps into a guided, trackable workflow for faster time-to-value.",
    responsibilities: [
      "Mapped onboarding bottlenecks across configuration, training, and go-live readiness",
      "Designed a guided onboarding flow that reduced handoff ambiguity between teams",
      "Created visibility into onboarding status for stakeholders and implementation partners",
      "Prioritized the highest-friction setup tasks that delayed customer activation",
    ],
    impact: ["Reduced onboarding timeline through guided, trackable activation"],
    tags: ["Onboarding", "Ops", "Time-to-Value"],
  },
  {
    id: "solera-omnichannel",
    company: "Solera",
    title: "Omnichannel Communications Suite",
    role: "Product Manager (Product Owner)",
    summary:
      "0-to-1 omnichannel CRM spanning email, text/WhatsApp, and web-based video calling — unifying fragmented dealer–customer conversations into one operating system for BDCs.",
    responsibilities: [
      "Led launch across text, WhatsApp, and web video calling for 4,000+ dealerships",
      "Directed AI-driven calling and LLM-powered Smart Compose for agent workflows",
      "Cut lead response latency with automation and routing improvements",
      "Partnered with compliance, design, and engineering for regulated communications",
    ],
    impact: [
      "+27.2% customer interactions",
      "+30.3% mobile conversion",
      "Lead response 12.5 → 4.8 minutes",
      "+18.6% BDC bookings",
    ],
    tags: ["Omnichannel", "CRM", "Voice AI", "Video"],
  },
  {
    id: "solera-universal-profile",
    company: "Solera",
    title: "Universal Customer Profile",
    role: "Product Manager (Product Owner)",
    summary:
      "Unified customer profile that stitches communication history, preferences, and dealership touchpoints into a single view — so teams act on one source of truth instead of siloed channel logs.",
    responsibilities: [
      "Defined the profile data model across communications and digital retail signals",
      "Prioritized identity resolution and timeline views for BDC and sales workflows",
      "Aligned Salesforce enablement so profiles powered day-to-day selling motions",
      "Instrumented profile usage to validate adoption by frontline teams",
    ],
    impact: [
      "Single customer view across email, text, and video touchpoints",
      "Stronger personalization and faster agent context switching",
    ],
    tags: ["Customer 360", "CRM", "Identity", "Salesforce"],
  },
  {
    id: "solera-dealer-web",
    company: "Solera",
    title: "Dynamic Dealer Website & Real-Time Inventory",
    role: "Product Manager (Product Owner)",
    summary:
      "Dynamic dealer website tooling with real-time inventory integrations so digital storefronts stay accurate without manual listing upkeep.",
    responsibilities: [
      "Launched website tooling with live inventory sync for dealership storefronts",
      "Reduced deployment friction for onboarding new dealer sites",
      "Coordinated integrations that sync 100K+ listings daily",
      "Partnered with sales on packaging and enablement",
    ],
    impact: [
      "−35% onboarding & deployment time",
      "100K+ listings synced daily",
    ],
    tags: ["Inventory", "Websites", "Integrations"],
  },
  {
    id: "solera-monetization",
    company: "Solera",
    title: "Monetization, SKUs & GTM Strategy",
    role: "Product Manager (Product Owner)",
    summary:
      "Pricing, SKU definition, and go-to-market strategy for paid platform capabilities — including ML-informed pricing experiments that unlocked incremental revenue without alienating dealers.",
    responsibilities: [
      "Defined SKUs, pricing tiers, and packaging for paid features",
      "Ran ML-driven pricing experiments against adoption and revenue goals",
      "Built GTM narratives with Salesforce enablement and Pendo analytics",
      "Balanced monetization with dealer price sensitivity",
    ],
    impact: ["$2M incremental revenue", "20.1% adoption of paid SKUs"],
    tags: ["GTM", "Pricing", "Monetization"],
  },
];

export type WorkCaseStudy = {
  id: string;
  company: string;
  title: string;
  context: string;
  challenge: string;
  whatIDid: string;
  impact: string[];
};

export const workCaseStudies: WorkCaseStudy[] = [
  {
    id: "omnichannel-crm",
    company: "Solera Holdings",
    title: "0-to-1 Omnichannel CRM Launch",
    context:
      "Automotive CRM and digital retailing platform (DealerFire) serving 4,000+ dealerships.",
    challenge:
      "Dealer–customer communication was fragmented across disconnected text, call, and web channels — slowing lead response and hurting conversion.",
    whatIDid:
      "Led a 0-to-1 launch of an omnichannel CRM spanning text, WhatsApp, and web-based video calling; directed AI-driven calling and LLM-powered Smart Compose to automate agent workflows.",
    impact: [
      "+27.2% customer interactions",
      "+30.3% mobile conversion",
      "Lead response cut from 12.5 to 4.8 minutes",
      "+18.6% BDC bookings",
    ],
  },
  {
    id: "dealer-website",
    company: "Solera Holdings",
    title: "Dynamic Dealer Website & Real-Time Inventory",
    context:
      "Dealerships needed faster, more accurate digital storefronts without manual inventory upkeep.",
    challenge:
      "Static sites and delayed inventory updates created trust gaps and slowed dealer launches.",
    whatIDid:
      "Launched a dynamic dealer website tool with real-time inventory integrations, syncing 100K+ listings daily.",
    impact: ["Reduced onboarding and deployment time by 35%"],
  },
  {
    id: "monetization",
    company: "Solera Holdings",
    title: "Monetization & GTM Strategy",
    context:
      "Platform needed a scalable path to paid-feature revenue without alienating price-sensitive dealers.",
    challenge:
      "Feature value was real, but packaging and pricing lacked a clear adoption path.",
    whatIDid:
      "Defined SKUs, pricing tiers, and GTM strategy; ran ML-driven pricing experiments.",
    impact: ["$2M incremental revenue", "20.1% adoption of paid SKUs"],
  },
  {
    id: "consumer-portal",
    company: "Tekion Corp",
    title: "B2B2C After-Sales Consumer Portal Revamp",
    context:
      "After-sales consumer portal for customers tracking vehicle service across a B2B2C dealership network.",
    challenge:
      "High support-ticket volume and low engagement pointed to a broken customer journey.",
    whatIDid:
      "Redesigned the end-to-end portal using Figma for UI prototyping and Miro for mapping the digital-first customer journey, grounded in usability testing.",
    impact: ["+25.4% platform adoption", "−38.1% support tickets"],
  },
  {
    id: "recommendation-engine",
    company: "Tekion Corp",
    title: "ML-Powered Recommendation Engine",
    context:
      "Service upsell suggestions were generic and not personalized to customer history.",
    challenge:
      "Advisors lacked timely, relevant recommendations at the moment of service decision.",
    whatIDid:
      "Architected and launched a collaborative-filtering recommendation engine, analyzing datasets in SQL and integrating data pipelines via Stitch.",
    impact: ["+19% upsell attach rate across dealership service centers"],
  },
  {
    id: "document-esign",
    company: "Tekion Corp",
    title: "AI-Assisted Document Configurator & E-Sign",
    context:
      "Manual document processing and check-in were slow and costly at scale.",
    challenge:
      "Paper-heavy workflows inflated labor cost and customer wait time.",
    whatIDid:
      "Built a document configurator with AI-assisted PDF generation and integrated e-signature workflows, accelerating development using GitHub Copilot.",
    impact: [
      "−63.2% check-in time",
      "−40% manual processing",
      "~$12K annual savings per dealership",
    ],
  },
];

export type PortfolioCaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  github: string;
  stack: string[];
  summary: string;
  highlights: string[];
};

export const portfolioCaseStudies: PortfolioCaseStudy[] = [
  {
    slug: "youtube-music-premium",
    title: "YouTube Music Premium+",
    subtitle: "Executive product proposal & planning package",
    href: "/case-studies/youtube-music-premium",
    github: "https://github.com/saurabhshrivastavapcpm08-ai/yt_casestudy",
    stack: ["Vite", "React", "TypeScript", "Framer Motion"],
    summary:
      "A visual business proposal for a new YouTube Music Premium+ tier — combining Hi-Res audio, Gemini-powered music intelligence, wearable adaptive listening, and Pixel ecosystem integration into a monetizable product narrative.",
    highlights: [
      "Consumer pillars: Hear Better, Know More, Move Better",
      "PRD + engineering specs + MVP→V2 roadmap",
      "Personas, north-star metrics, and packaging strategy",
    ],
  },
  {
    slug: "tara-hr-coworker",
    title: "Tara AI — HR Coworker",
    subtitle: "Recruitment coworker prototype",
    href: "/case-studies/tara-hr-coworker",
    github: "https://github.com/saurabhshrivastavapcpm08-ai/hr-coworker",
    stack: ["FastAPI", "React", "TypeScript", "Vite"],
    summary:
      "An AI recruitment coworker prototype that helps talent teams manage jobs, rank candidates, and chat through suggested next actions — demonstrating product thinking across backend APIs and a polished recruiter UI.",
    highlights: [
      "Jobs & candidate pipeline APIs",
      "Score-ranked candidate workspace",
      "Chat coworker with suggested actions",
    ],
  },
];

export const experience = [
  {
    company: "Solera Holdings, LLC",
    role: "Product Manager (Product Owner)",
    dates: "Jul 2025 – Present",
    location: "Bangalore, India",
    bullets: [
      "Own automotive CRM & digital retailing product (DealerFire) serving 4,000+ dealerships",
      "Led 0-to-1 omnichannel CRM (text, WhatsApp, web video) and AI agent workflows",
      "Built universal customer profile foundations across communications channels",
      "Defined SKUs, pricing, and GTM — $2M incremental revenue, 20.1% paid SKU adoption",
      "Drove GDPR/CCPA readiness and API-first platformization",
    ],
  },
  {
    company: "Tekion Corp",
    role: "Associate Product Manager",
    dates: "Jul 2022 – Jun 2025",
    location: "Bangalore, India",
    bullets: [
      "Core ownership: B2B2C after-sales consumer portal, ML recommendations, document manager",
      "Revamped service-tracking portal for customers across dealership networks",
      "Launched PDF configurator, e-sign platform, and recommendation engine",
      "Created onboarding tooling to compress activation timelines",
      "Delivered 20+ enhancements via A/B testing and VOC insights",
    ],
  },
  {
    company: "Prior Experience",
    role: "Key Account Manager / Operations Manager / Business Development",
    dates: "Dec 2015 – Jun 2022",
    location: "India",
    bullets: [
      "Zepo, NoBroker, Aashir's Lifestyle, Integri Marine, BYJU'S, Sandigan Ship Management",
      "Built foundations in client relationships, operations, and B2B growth strategy",
      "Scaled revenue 15× at Aashir's Lifestyle; led e-commerce onboardings and logistics optimization",
    ],
  },
];

export const education = [
  {
    school: "Indian School of Business (ISB)",
    credential: "Professional Certificate in Product Management",
    dates: "Aug 2023 – Mar 2024",
  },
  {
    school: "Indian Maritime University (MERI)",
    credential: "B.Tech, Marine Engineering",
    dates: "Aug 2010 – Sep 2014",
  },
];

export const certifications = [
  "Generative AI for Product Managers",
  "Becoming an AI-First Product Leader",
  "Foundations of Project Management (Google)",
  "Agile with Atlassian Jira",
  "Learning SQL Programming",
  "Operations Management: Analysis and Improvement Methods",
];

export const navItems = [
  { href: "/#introduction", label: "Introduction" },
  { href: "/#work", label: "Work" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#skills", label: "Skills" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#contact", label: "Contact" },
];
