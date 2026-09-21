// ============================================================
// WNRS brand facts — single source of truth.
// Edit copy here; pages and components consume these objects.
// ============================================================

import { withBase } from './base';

export const SITE = {
  name: 'WNRS',
  legalName: 'World Net Recovery Systems',
  url: 'https://wnrs.com',
  title: 'Debt Collection & Accounts Receivable Management | WNRS',
  description:
    'WNRS recovers unpaid accounts receivable at every stage of delinquency. 1,200+ professionals, 8 hubs, and 50+ years across the Americas. Talk to an expert.',
  tagline: 'Debt collection experts. Receivables recovered fast.',
  slogan: 'Your Receivables. Recovered. Fast.',
} as const;

export const EMAIL = 'info@wnrs.com';
export const EMAIL_HREF = 'mailto:info@wnrs.com';
export const PHONE = '1-866-252-3961';
export const PHONE_DISPLAY = '1866 252-3961';
export const PHONE_HREF = 'tel:+18662523961';
export const PORTAL_URL = 'https://online.wnrs.com';
export const HQ = 'Miami, FL';

export const LOCALES = [
  { code: 'en', hreflang: 'en', label: 'EN', name: 'English', href: 'https://wnrs.com', host: 'wnrs.com' },
  { code: 'pt', hreflang: 'pt-BR', label: 'BR', name: 'Português', href: 'https://wnrs.com.br', host: 'wnrs.com.br' },
  { code: 'es', hreflang: 'es', label: 'ES', name: 'Español', href: 'https://wnrs.com.mx', host: 'wnrs.com.mx' },
] as const;

export const NAV_LINKS = [
  { href: withBase('/services'), label: 'Services' },
  { href: withBase('/about-us'), label: 'About Us' },
] as const;

export const FOOTER_LINKS = [
  { href: withBase('/services'), label: 'Services' },
  { href: withBase('/about-us'), label: 'About Us' },
  { href: withBase('/insights'), label: 'Insights' },
  { href: withBase('/#contact'), label: 'Contact' },
  { href: withBase('/terms'), label: 'Terms of service' },
  { href: withBase('/privacy'), label: 'Privacy policy' },
] as const;

/** Blog posts for /insights/. Add entries here as articles ship. */
export type InsightPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};
export const INSIGHTS: InsightPost[] = [];

/** Hero proof stats (homepage strip). */
export const STATS = [
  { n: '1,200+', k: 'Professionals' },
  { n: '8', k: 'Global recovery hubs' },
  { n: '50+', k: 'Years of performance' },
  { n: '30+', k: 'Countries served' },
] as const;

/** Key stats as shown on the live homepage (check-list, not big numerals). */
export const KEY_STATS = [
  '#1 Agency for fortune 500 clients',
  '50+ years of proven performance',
  '30+ countries served',
  '20+ languages covered',
  '500,000+ interactions every month',
  '99.9997% system uptime',
  'People + Process + Technology = Total Integration',
  'Top Rated Customer Satisfaction',
] as const;

/** Client marks used in the live Elementor carousel. */
export const CLIENT_LOGOS = [
  { src: withBase('/clients/ups.png'), alt: 'UPS' },
  { src: withBase('/clients/ternium.png'), alt: 'Ternium' },
  { src: withBase('/clients/intertek.png'), alt: 'Intertek' },
  { src: withBase('/clients/seaboard.png'), alt: 'Seaboard Marine' },
  { src: withBase('/clients/sap.png'), alt: 'SAP' },
  { src: withBase('/clients/pg.png'), alt: 'Procter & Gamble' },
  { src: withBase('/clients/dhl.png'), alt: 'DHL' },
  { src: withBase('/clients/amex.png'), alt: 'American Express' },
  { src: withBase('/clients/avis.png'), alt: 'Avis' },
  { src: withBase('/clients/carnival.png'), alt: 'Carnival' },
  { src: withBase('/clients/maersk.png'), alt: 'Maersk' },
  { src: withBase('/clients/nike.png'), alt: 'Nike' },
  { src: withBase('/clients/aeromexico.png'), alt: 'Aeroméxico' },
  { src: withBase('/clients/ef.png'), alt: 'EF Education First' },
] as const;

/** Homepage “pick your service” tiles — live Elementor labels, mapped to service slugs. */
export const HOME_PICKER = [
  { href: withBase('/early-stage-arm'), label: 'Administrative Collection' },
  { href: withBase('/specialized-arm'), label: 'Specialized Collection' },
  { href: withBase('/late-stage-arm'), label: 'Extrajudicial Collection' },
  { href: withBase('/financial-skip-tracing'), label: 'Financial Investigation' },
  { href: withBase('/attorney-intervention'), label: 'Judicial Collection' },
  { href: withBase('/#contact'), label: 'Customer Experience Management' },
] as const;

export interface Service {
  slug: string;
  name: string;
  navLabel: string;
  short: string;
  tagline: string;
  intro: string;
  overview: string[];
  benefits: string[];
  included: string[];
  ic: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'early-stage-arm',
    name: 'Early Stage Collection',
    navLabel: 'Early Stage Collection',
    ic: '1–60 DAYS · FIRST-PARTY',
    short: 'WNRS’s early stage collection services are built for companies looking to target customers in the earlier life cycle stages.',
    tagline: 'Stop delinquency early, without souring the relationship.',
    intro:
      'WNRS’s early stage collection services are built for companies looking to target customers in the earlier life cycle stages. Our world-class collections expertise provides a customer-oriented, cost-effective approach that greatly reduces the probability of balances moving to later aging buckets. For today’s globally competitive companies, there is no other choice – leverage world in class services – or be left behind.',
    overview: [
      'Early Stage Collection is built to maintain the client’s brand image. Handled strategically and diplomatically, by highly talented, multilingual collections professionals, trained to maintain the utmost courtesy towards our client’s customers. By using proprietary segmentation, structuring, and analytic models, we are able to determine the best method of intervention and best agent to deal with and deploy the collections strategy on every specific case.',
      'Our trained professionals support our client’s collections processes across multiple industries and geographies by performing a strategic one-on-one campaigns, (typically in the name of the client). We understand the key to our success is a customer service approach that works personally and firmly with every customer while concretely maintaining our client’s valued relationships.',
    ],
    benefits: [
      'Increased Cash Flow',
      'Improved Days Sales Outstanding (DSO)',
      'Shorter Turnover Rate',
      'Reduction in Operating Expenses',
      'Drastic Reduction in accounts that enter into delinquency status',
      'Reduced write-offs',
      'Customer master record updates',
      'Add-ons: Cash Application, Deductions Management, Dispute Resolution, O2C Services',
      '24/7 online account tracking, monitoring, and status updates',
    ],
    included: [
      'First-party, brand-safe outreach in the client’s name',
      'Segmentation, scoring, and agent matching per account',
      'Multilingual coverage aligned to the debtor’s language',
      'Payment reminders, billing questions, and early follow-up',
      'Reporting, QA, and a named point of contact',
    ],
  },
  {
    slug: 'late-stage-arm',
    name: 'Late Stage Collection',
    navLabel: 'Late Stage Collection',
    ic: 'PRE-CHARGE-OFF · CONCENTRATED',
    short: 'Companies face a common problem on customer accounts as they near their charge off date.',
    tagline: 'A winning strategy for accounts that are about to age out.',
    intro:
      'Companies face a familiar problem as customer accounts near charge-off: collectability falls, internal teams are stretched, and a generic call-center approach burns the file. WNRS late-stage collection concentrates experienced collectors, industry-specific campaigns, skip tracing, and attorney backup on this segment.',
    overview: [
      'After decades of industry-specific collections systems, we do not staff late-stage work with high-turnover temps. Agents are trained on your industry, compliance requirements, and peak-performance playbooks.',
      'Campaigns can include customized billing, national and international skip tracing, 24/7 tracking, and attorney intervention when the file warrants it.',
      'Stay focused on the core business. Do not let inaction tax the bottom line as accounts slide past recoverability.',
    ],
    benefits: [
      'Increased cash flow',
      'Higher returns on aged inventory',
      'Better location rates on skip accounts',
      'Optimized working capital',
      'Lasting customer relations where recovery is still relationship-based',
      'Client satisfaction through transparent reporting',
    ],
    included: [
      'Seasoned collectors — not a revolving call-center bench',
      'Specialized and customized billing campaigns',
      'National and international skip tracing and investigations',
      '24/7 online tracking, monitoring, and reporting',
      'Attorney intervention when necessary',
    ],
  },
  {
    slug: 'specialized-arm',
    name: 'Specialized Collection',
    navLabel: 'Specialized Collection',
    ic: 'SENSITIVE · MULTIDISCIPLINARY',
    short: 'Not all AR programs are created equal. WNRS’s SU (Specialized Unit) is a division of WNRS trained to conduct special purpose and sensitive collection operations.',
    tagline: 'A dedicated unit for matters that a standard desk cannot touch.',
    intro:
      'Not every AR program is the same. WNRS Specialized Unit (SU) handles special-purpose and sensitive collections — typically for government and select multinationals. Multidisciplinary professionals combine conventional and unconventional tactics on complex multi-party disputes with financial, legal, operational, political, and regulatory dimensions.',
    overview: [
      'SU teams mobilize wherever the file requires: complex bankruptcy and non-bankruptcy commercial disputes, government-related matters, and cases that need industry-specific expertise from assessment through settlement.',
      'The unit has supported market-shaping matters across the Americas — from large commercial settlements to government-related disputes in the U.S., Mexico, Canada, Brazil, and elsewhere.',
      'We bring insight to strengths, weaknesses, damages, and timing so clients can decide how far to press a file — and then execute.',
    ],
    benefits: [
      'Industry-specific, multidisciplinary experts',
      'Worldwide deployment and reach',
      'Dispute and fraud coverage: financial, legal, operational, transactional, political, regulatory',
      'National and international investigators and field specialists',
      'Litigation consulting, valuation, and trial support when needed',
      'Attorney intervention when needed',
    ],
    included: [
      'Early case assessment and discovery support',
      'Case strategy, damages analysis, and settlement services',
      'Sensitive-file handling for government and multinational clients',
      'Coordination with legal, investigative, and field resources',
      'Consolidated reporting through WNRS',
    ],
  },
  {
    slug: 'financial-skip-tracing',
    name: 'Financial Skip Tracing',
    navLabel: 'Financial Skip Tracing',
    ic: 'INVESTIGATION · LOCATION',
    short: 'The globalized nature of today’s economy has facilitated the ability of customers to incur O2C issues and then simply relocate their activity, in efforts to avoid location.',
    tagline: 'Location and financial investigation that a database search cannot replace.',
    intro:
      'A global economy makes it easier for counterparties to relocate activity and avoid contact. WNRS skip tracing combines technology with investigators, international offices, and field skill — especially where public databases are thin or the debtor is deliberately opaque.',
    overview: [
      'Financial investigations complement collection: we do not stop at a last-known address. We look for the person, the entity, and the assets that can satisfy the claim.',
      'Experience matters on shadowy files and on debts that originate in markets with unsophisticated communications infrastructure. Algorithms help; trained investigators close.',
    ],
    benefits: [
      'Corporate structure decomposition',
      'Corporate veil piercing analysis',
      'Corporate banking details',
      'Employment history',
      'Real property, vehicle, and lien information',
      'Judgment and bankruptcy information',
      'Personal location, contact, and banking details',
    ],
    included: [
      'Skip tracing across national and international footprints',
      'Asset and entity investigation in support of recovery',
      'Integration with early-stage, late-stage, and attorney workstreams',
      'Discreet handling of sensitive commercial files',
    ],
  },
  {
    slug: 'attorney-intervention',
    name: 'Attorney Intervention',
    navLabel: 'Attorney Intervention',
    ic: 'LITIGATION · ENFORCEMENT',
    short: 'Over the years and through our global locations, we have built an international network of attorneys as well as bankruptcy attorneys.',
    tagline: 'Litigation and judgment enforcement, managed in one place.',
    intro:
      'WNRS has built an international network of collections and bankruptcy attorneys across U.S. jurisdictions, Canada, Mexico, Latin America, Central America, the Caribbean, and Western Europe. Attorney Intervention deploys legal enforcement when a file needs more than outreach.',
    overview: [
      'From litigation through judgment enforcement, network attorneys bring proven legal collection experience. WNRS manages progress and keeps you current at every stage.',
      'We analyze whether litigation is worth it — consolidation, investigation, execution, and timing — then, if you proceed, track the matter in one consolidated view.',
    ],
    benefits: [
      'One-stop consolidation of legal recovery',
      'Detailed reporting through proceedings',
      'Levy and execution of assets',
      'Civil (and, where applicable, criminal) sanctions support',
      'Wage, bank, and investment-account garnishment',
      'Real-property seizure and vehicle impoundment where lawful',
      'Corporate veil-piercing actions',
    ],
    included: [
      'Pre-litigation analysis of recoverability and cost',
      'Attorney placement in the right jurisdiction',
      'Judgment enforcement and asset execution',
      'Bankruptcy-attorney coverage in key markets',
      'Centralized status tracking through WNRS',
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** Hub order on /services/ — matches live Elementor. */
export const SERVICE_HUB_ORDER = [
  'early-stage-arm',
  'late-stage-arm',
  'attorney-intervention',
  'financial-skip-tracing',
  'specialized-arm',
] as const;

export const getServicesForHub = () =>
  SERVICE_HUB_ORDER.map((slug) => getService(slug)).filter(Boolean) as Service[];

export const DIFFERENTIATORS = [
  {
    h: 'The first results within days',
    p: "On average within the first 15 days you'll start seeing recovery results hitting the books.",
    img: withBase('/brand/illustration-3.png'),
  },
  {
    h: 'World-class talent',
    p: "We carefully select and train expert teams to act as an extension of your own brand. Rest assured, you'll get faster, transparent, and predictable results that recover debt and restore cashflow.",
    img: withBase('/brand/illustration-2.png'),
  },
  {
    h: 'Tailored expertise & strategies',
    p: 'Unlike other agencies cookie-cutter approaches, we build hyper personalized go-to-market strategies that align perfectly with your unique brand, business objectives, and combine over 50 years of best practices.',
    img: withBase('/brand/illustration-4.png'),
  },
] as const;

export const PROCESS_STEPS = [
  {
    num: '01',
    h: 'Unpaid Invoice(s)',
    p: "You're losing money — and time. We step in fast.",
  },
  {
    num: '02',
    h: 'Account(s) Assessment',
    p: 'We vet the debtor, map the terrain, and execute the recovery plan.',
  },
  {
    num: '03',
    h: 'Negotiations',
    p: 'We reach out directly— in their language, on their turf.',
  },
  {
    num: '04',
    h: 'Enforcement',
    p: 'We always take the next appropriate steps to advance recovery.',
  },
  {
    num: '05',
    h: 'Funds Recovered',
    p: 'You get results — with full transparency, every step of the way. CX services optional.',
  },
] as const;

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I don't know how they do it, but WNRS was able to recover what my entire staff of 60 in house lawyers was unable to recover for years. One thing is clear, every craftsman to his trade. ",
    name: 'Juan Romero',
    title: 'President',
    company: 'Cemex',
  },
];

export interface Vertical {
  slug: string;
  name: string;
  kind: 'industry' | 'sector';
  featured?: boolean;
  ic: string;
  short: string;
  intro: string;
  overview: string;
  audience: string;
  benefits: string[];
}

const COLLECTION_BENEFITS = [
  'Early-stage and late-stage collections',
  'A/R management and invoice support',
  'Demand-letter campaigns',
  'Financial skip tracing',
  'Attorney intervention when warranted',
  '24/7 online account tracking',
];

export const SECTORS: Vertical[] = [
  {
    slug: 'business',
    name: 'Business',
    kind: 'sector',
    ic: 'MID-MARKET',
    short: 'Collection programs sized for growing companies that need cash back without a full in-house desk.',
    intro:
      'Whether you collect from businesses or you are one, WNRS has the experience to put a definitive accounts receivable program around your book — without the overhead of standing up a recovery team.',
    overview:
      'Mid-market companies often outgrow ad-hoc collections and under-invest in a dedicated collections function. We plug in trained collectors, reporting, and skip tracing so finance leaders can stay on growth work. Clients in this sector typically see material cash-flow lift once outreach is consistent and professional.',
    audience: 'Privately held and mid-market companies across B2B and B2C books.',
    benefits: ['Increased cash flow — clients in this sector have seen lifts around 85%', ...COLLECTION_BENEFITS],
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    kind: 'sector',
    ic: 'GLOBAL · FORTUNE 500',
    short: 'Scale recovery across regions, languages, and legal regimes.',
    intro:
      'Global enterprises need collections that match their footprint: multiple jurisdictions, languages, and brand standards. WNRS runs that program as an extension of corporate finance and legal.',
    overview:
      'Enterprise files are large, political, and visible. We staff multilingual teams, specialized units, and attorney networks so recovery does not stop at a country border. Reporting is built for treasury, shared services, and audit — not a spreadsheet dump.',
    audience: 'Multinationals and Fortune 500 finance organizations.',
    benefits: ['Increased cash flow — clients in this sector have seen lifts around 80%', ...COLLECTION_BENEFITS],
  },
  {
    slug: 'government',
    name: 'Government',
    kind: 'sector',
    ic: 'PUBLIC SECTOR',
    short: 'Sensitive recovery for public entities and government-related commercial claims.',
    intro:
      'Public-sector and government-related receivables demand discretion, compliance, and reach. WNRS supports government entities and contractors with collections that can move from administrative outreach to specialized and legal enforcement.',
    overview:
      'Government files often mix commercial, regulatory, and political constraints. Our specialized unit and attorney network are used to that mix. We report clearly, document thoroughly, and escalate only when the file supports it.',
    audience: 'Government entities, agencies, and government contractors.',
    benefits: ['Increased cash flow — clients in this sector have seen lifts around 75%', ...COLLECTION_BENEFITS],
  },
  {
    slug: 'utilities',
    name: 'Utilities',
    kind: 'sector',
    ic: 'REGULATED',
    short: 'Accounts receivable programs for regulated utility and public-service books.',
    intro:
      'Utilities run high-volume, regulated receivables where customer treatment and documentation matter as much as dollars recovered. WNRS supports that book with trained outreach and compliant escalation.',
    overview:
      'From past-due residential and commercial accounts to complex B2B utility claims, we align to tariff rules, hardship programs, and brand standards. The aim is recovered revenue without unnecessary disconnection or reputational damage.',
    audience: 'Electric, gas, water, telecom-adjacent, and public-service operators.',
    benefits: COLLECTION_BENEFITS,
  },
];

export const INDUSTRIES: Vertical[] = [
  {
    slug: 'education-research',
    name: 'Education & Research',
    kind: 'industry',
    featured: true,
    ic: 'TUITION · GRANTS · LENDING',
    short: 'Receivables programs for schools, research programs, and education lenders.',
    intro:
      'Language schools, specialized courses, research programs, study-abroad, online learning, public and private universities, technical schools, and education lenders all run distinct receivable books. WNRS has the experience to service them.',
    overview:
      'No two education programs are the same. We work with schools and research facilities to pick the right mix of early intervention, loan servicing, and third-party recovery. Collectors are trained on student-borrower circumstances and the laws that govern them, and the program is built to protect the institution’s image.',
    audience: 'Universities, technical schools, research programs, and education lenders.',
    benefits: [
      'Early intervention collections',
      'Third-party collections',
      'A/R management and loan servicing',
      'Invoicing (print, mail, and electronic)',
      'Customer care and demand letters',
      'Back-office support',
      'Attorney intervention and skip tracing',
      'Payment processing',
    ],
  },
  {
    slug: 'travel-transportation',
    name: 'Travel & Transportation',
    kind: 'industry',
    featured: true,
    ic: 'CARRIERS · FLEETS · BOOKINGS',
    short: 'Recovery for carriers, logistics, travel operators, and transportation networks.',
    intro:
      'Travel and transportation books move fast: unpaid freight, corporate travel, tours, and equipment charges age while assets and counterparties keep moving. WNRS recovers those receivables across borders and languages.',
    overview:
      'We train on your tariffs, contracts, and customer mix — airlines, logistics, freight, passenger, and travel operators. Outreach happens in the debtor’s language. Skip tracing and attorney backup are available when a counterparty has relocated or is simply not paying.',
    audience: 'Airlines, freight and logistics, passenger transport, and travel operators.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'retail',
    name: 'Retail',
    kind: 'industry',
    featured: true,
    ic: 'STORE · ECOMMERCE · CREDIT',
    short: 'High-volume retail and ecommerce receivables, without overwhelming working capital.',
    intro:
      'Electronics, mass merchandise, food service, safety products, apparel, and more: retail runs thousands of transactions a day — in person and online, on cards, leases, checks, and notes. It is one of WNRS’s largest client categories.',
    overview:
      'Do not let receivables management choke working capital. WNRS associates learn your products, policies, and culture so they function as an extension of the store and the brand. We resolve collections and billing on time, preserve image on customer-facing files, and report status in real time.',
    audience: 'Brick-and-mortar, omnichannel, and ecommerce retailers.',
    benefits: [
      'Industry experience across retail formats',
      'Issue resolution that protects company image',
      'Online account input, audits, invoices, and real-time status',
      'Full range of A/R management and collection services',
      'Increased cash flow, reduced write-offs, reduced delinquencies',
    ],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    kind: 'industry',
    featured: true,
    ic: 'B2B · TRADE CREDIT',
    short: 'Trade-credit recovery for manufacturers who need DSO down and disputes closed.',
    intro:
      'Electronics, building materials, auto and auto-parts, and other manufacturers use WNRS for A/R management and collections on trade-credit books.',
    overview:
      'Before work starts, we make sure representatives understand your processes, payment plans, credit criteria, and brand. Then they manage receivables, resolve disputes, collect delinquencies, and support goods recovery when needed — without adding overhead to the plant.',
    audience: 'Discrete and process manufacturers selling on trade terms.',
    benefits: [
      'Faster collection times',
      'Increased revenue and cash flow',
      'Higher customer satisfaction on resolved disputes',
      'Decreased DSO and write-offs',
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    kind: 'industry',
    featured: true,
    ic: 'FEES · RETAINERS',
    short: 'Collect for firms that sell expertise — without damaging client relationships.',
    intro:
      'Law, accounting, consulting, engineering, and other professional firms carry aged WIP and unpaid invoices that in-house teams are reluctant to chase. WNRS recovers those fees with the discretion the relationship requires.',
    overview:
      'Professional-services receivables are relationship-heavy. We work the file with your billing policies in mind, document every contact, and escalate only when the engagement is truly over. The firm stays focused on delivery; we stay focused on getting paid.',
    audience: 'Law firms, consultancies, accounting firms, and other fee-for-service practices.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'aerospace-defense',
    name: 'Defense & Security',
    kind: 'industry',
    ic: 'CONTRACT · COMPLIANCE',
    short: 'Discreet collections for aerospace, defense, and dual-use commercial claims.',
    intro:
      'Aerospace and defense receivables sit on long contracts, government flow-downs, and counterparties that may be anywhere in the supply chain. WNRS handles those files with the confidentiality and documentation the sector expects.',
    overview:
      'From commercial aviation suppliers to defense contractors, we align recovery to contract terms, offset rights, and jurisdictional complexity. Specialized unit and attorney resources are available on sensitive or cross-border matters.',
    audience: 'OEMs, suppliers, and contractors in aerospace and defense.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'construction-operations',
    name: 'Construction & Operations',
    kind: 'industry',
    ic: 'PROJECTS · RETAINAGE',
    short: 'Recover progress billings, retainage, and vendor balances on project work.',
    intro:
      'Construction and operations companies live on progress billings, change orders, and retainage — all of which can stall. WNRS works those receivables so cash is not trapped in completed work.',
    overview:
      'We train on your contract forms and project structure, then pursue owners, GCs, and vendors as the file requires. Documentation-heavy disputes are a normal part of this book; we treat them as such rather than as simple past-due calls.',
    audience: 'General contractors, specialty trades, and facilities operators.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'banking',
    name: 'Banking',
    kind: 'industry',
    ic: 'REGULATED CREDIT',
    short: 'Compliant recovery support for banks and credit portfolios.',
    intro:
      'Banks need collection partners who understand regulated credit, documentation, and customer treatment. WNRS supports banking collections and related commercial recovery with trained, auditable processes.',
    overview:
      'We work within your compliance framework — contact rules, hardship, and escalation — and report in a form credit-risk and collections leadership can use. Skip tracing and attorney intervention are available on commercial and charged-off files.',
    audience: 'Retail, commercial, and specialty banking collections teams.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'consumer-products',
    name: 'Consumer Products',
    kind: 'industry',
    ic: 'CPG · TRADE',
    short: 'Trade and consumer receivables for CPG and branded goods.',
    intro:
      'Consumer-product companies carry distributor, retailer, and sometimes direct-to-consumer balances. WNRS recovers those books while protecting brand equity at the shelf and online.',
    overview:
      'We handle trade deductions, slow-pay retail, and aged consumer accounts with industry-aware scripts and dispute workflows. The aim is cash back without a public fight that costs more than the invoice.',
    audience: 'CPG manufacturers, brands, and consumer-goods distributors.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'chemicals',
    name: 'Chemicals',
    kind: 'industry',
    ic: 'TRADE CREDIT · B2B',
    short: 'B2B recovery for chemical producers and distributors selling on terms.',
    intro:
      'Chemical producers and distributors extend significant trade credit. When invoices age, WNRS steps in with B2B collectors who understand contracts, logistics claims, and international counterparties.',
    overview:
      'Files in this sector often mix product, freight, and quality disputes. We separate collectible balances from genuine claims, then pursue the rest with the right mix of outreach, investigation, and legal backup.',
    audience: 'Commodity and specialty chemical companies and their distributors.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'engineering',
    name: 'Engineering',
    kind: 'industry',
    ic: 'PROJECT FEES',
    short: 'Fee recovery for engineering firms on project and retainer work.',
    intro:
      'Engineering firms invoice against milestones and retainers that clients delay. WNRS recovers those professional fees with the care a continuing project relationship requires.',
    overview:
      'We work from your SOWs and change-order trail, not a generic dunning letter. Where the relationship is over, we escalate; where it is not, we keep the tone professional and the file documented.',
    audience: 'Civil, industrial, and specialty engineering practices.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'gaming-hospitality-leisure',
    name: 'Gaming Hospitality & Leisure',
    kind: 'industry',
    ic: 'MARKERS · FOLIOS · EVENTS',
    short: 'Receivables for casinos, hotels, leisure operators, and related venues.',
    intro:
      'Gaming, hospitality, and leisure generate markers, folios, group events, and vendor balances that need discreet, fast recovery. WNRS has worked this sector across the Americas.',
    overview:
      'Tone and timing matter in hospitality. We recover what is owed without turning a guest or a group account into a public dispute, and we escalate through skip tracing or counsel when the file is no longer a guest-relations problem.',
    audience: 'Casinos, hotels, resorts, and leisure operators.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'government-contracting',
    name: 'Government Contracting',
    kind: 'industry',
    ic: 'PRIME · SUB · FLOW-DOWN',
    short: 'Commercial recovery around government contracts and subcontractor chains.',
    intro:
      'Government contractors carry receivables against primes, subs, and agencies that do not behave like ordinary trade credit. WNRS supports that book with documentation discipline and specialized resources.',
    overview:
      'We understand flow-downs, assignment, and the pace of public-sector payment. When a commercial dispute sits next to a government contract, specialized unit and attorney resources are available.',
    audience: 'Primes, subcontractors, and vendors on government work.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    kind: 'industry',
    ic: 'PATIENT · PAYER',
    short: 'Healthcare A/R for hospitals, physician groups, and related facilities.',
    intro:
      'WNRS healthcare clients have included government-owned hospitals, nonprofit community hospitals, religiously affiliated hospitals, large physician groups, and investor-owned facilities.',
    overview:
      'Medical A/R is complex: managed-care reimbursement, Medicare and Medicaid rules, and third-party liability. We manage on-time, outstanding, and write-off patient and payer files with collectors trained for this market.',
    audience: 'Hospitals, physician groups, and healthcare facilities.',
    benefits: [
      'Patient and payer follow-up on aged balances',
      'Support on managed-care, Medicare, and Medicaid-related files',
      'Third-party liability collections',
      'Reduced write-offs and improved cash on self-pay and residual balances',
    ],
  },
  {
    slug: 'high-tech',
    name: 'High-tech',
    kind: 'industry',
    ic: 'SAAS · HARDWARE · CHANNEL',
    short: 'Collections for technology companies with channel, SaaS, and hardware books.',
    intro:
      'High-tech receivables mix subscriptions, hardware, and channel partners — often across borders. WNRS recovers those balances with multilingual teams and modern reporting.',
    overview:
      'We work expired subscriptions, unpaid hardware, and distributor defaults without treating every file like a consumer debt. Channel and enterprise accounts get a B2B posture; consumer tech accounts get a CX-aware one.',
    audience: 'Software, hardware, and technology-services companies.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'industrial-machinery-components',
    name: 'Industrial Machinery & Components',
    kind: 'industry',
    ic: 'CAPEX · SPARES',
    short: 'Capex and spare-parts recovery for industrial equipment sellers.',
    intro:
      'Machinery and component suppliers invoice large capital equipment and ongoing spares. When either ages, WNRS pursues the commercial claim — including counterparties that have reorganized or relocated.',
    overview:
      'These files often justify skip tracing and, if needed, attorney intervention. We assess recoverability before recommending legal spend, then execute the plan you approve.',
    audience: 'OEMs and distributors of industrial machinery and components.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    kind: 'industry',
    ic: 'PREMIUM · SUBROGATION',
    short: 'Premium, deductible, and subrogation recovery for insurers and MGAs.',
    intro:
      'Insurers and managing agents carry premium, deductible, and subrogation balances that need a specialist desk. WNRS provides that desk with compliant contact and documentation.',
    overview:
      'We work the file to your product rules and regulatory constraints, report in a form claims and finance can use, and escalate stubborn commercial recoveries through investigation or counsel.',
    audience: 'Carriers, MGAs, and related insurance operations.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'life-sciences',
    name: 'Life Sciences',
    kind: 'industry',
    ic: 'PHARMA · DEVICE · RESEARCH',
    short: 'Receivables for pharma, device, and life-science research organizations.',
    intro:
      'Life-sciences companies invoice hospitals, distributors, research partners, and governments. WNRS recovers those books with the confidentiality the sector requires.',
    overview:
      'Contracts are long, counterparties are sophisticated, and some files are politically sensitive. Specialized unit support is available when a standard commercial desk is not enough.',
    audience: 'Pharma, medical device, biotech, and research organizations.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'media',
    name: 'Media',
    kind: 'industry',
    ic: 'ADVERTISING · LICENSING',
    short: 'Advertising, licensing, and subscription recovery for media companies.',
    intro:
      'Media receivables — advertising, licensing, subscriptions, production — age while the next cycle is already selling. WNRS keeps that book moving.',
    overview:
      'We understand agency billing, make-goods, and subscription dunning. Collectors work the commercial file without treating a media buyer like a consumer debtor.',
    audience: 'Publishers, broadcasters, digital media, and production companies.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'mill-products',
    name: 'Mill Products',
    kind: 'industry',
    ic: 'PAPER · PACKAGING · FOREST',
    short: 'Trade-credit recovery for paper, packaging, and mill-product producers.',
    intro:
      'Mill-product companies invoice distributors and converters on terms that can stall when commodity prices move. WNRS recovers those commercial balances with a B2B desk used to this book.',
    overview:
      'We work aged invoices, quality disputes, and slow-pay trade accounts so working capital is not trapped in finished goods. Skip tracing and attorney backup are available on stubborn files.',
    audience: 'Paper, packaging, lumber, and mill-product manufacturers and distributors.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'mining',
    name: 'Mining',
    kind: 'industry',
    ic: 'COMMODITY · TRADE',
    short: 'Cross-border commercial recovery for mining and related trade.',
    intro:
      'Mining companies and their suppliers operate across borders with large invoices and counterparties that can be hard to locate. WNRS brings international offices and investigation to those files.',
    overview:
      'We combine commercial collections with skip tracing and, when warranted, attorney intervention in the jurisdictions where assets actually sit.',
    audience: 'Producers, traders, and suppliers in mining.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    kind: 'industry',
    ic: 'UPSTREAM · MIDSTREAM · TRADE',
    short: 'Energy-sector collections for operators, service companies, and traders.',
    intro:
      'Oil and gas receivables are large, contractual, and often international. WNRS recovers them with collectors and investigators used to energy counterparties.',
    overview:
      'Joint-interest, services, and trade invoices each need a different posture. We scope the file, then apply early-stage, late-stage, specialized, or legal tools as recoverability demands.',
    audience: 'Operators, oilfield services, midstream, and energy traders.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'wholesale-distribution',
    name: 'Wholesale Distribution',
    kind: 'industry',
    ic: 'TRADE CREDIT',
    short: 'High-volume trade-credit recovery for wholesalers and distributors.',
    intro:
      'Wholesale distributors live on trade credit. When customers slow-pay or disappear, working capital tightens immediately. WNRS is built for that book.',
    overview:
      'We work aged invoices at volume, update customer records, and escalate skips and disputes without waiting for a quarter-end surprise. Reporting is built for credit managers.',
    audience: 'Wholesalers and distributors on open-account terms.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'sports-entertainment',
    name: 'Sports & Entertainment',
    kind: 'industry',
    ic: 'RIGHTS · TICKETS · SPONSORS',
    short: 'Recovery for rights, tickets, sponsorships, and venue-related receivables.',
    intro:
      'Sports and entertainment companies invoice sponsors, venues, talent, and ticket buyers. WNRS recovers those balances with discretion around public brands.',
    overview:
      'A sponsorship dispute is not a utility bill. We match tone to the relationship, document the file, and use specialized or legal resources when a high-value counterparty will not close.',
    audience: 'Leagues, teams, venues, promoters, and entertainment companies.',
    benefits: COLLECTION_BENEFITS,
  },
  {
    slug: 'telecommunications',
    name: 'Telecommunications',
    kind: 'industry',
    ic: 'SUBSCRIBER · CARRIER',
    short: 'Subscriber and carrier receivables for telecom operators.',
    intro:
      'Telecom books combine high-volume subscriber delinquency with wholesale carrier claims. WNRS covers both with process, language coverage, and reporting.',
    overview:
      'We align to your disconnect rules, regulatory constraints, and brand. Carrier and enterprise files get a B2B desk; subscriber files get scaled, compliant outreach.',
    audience: 'Wireline, wireless, and wholesale telecom operators.',
    benefits: COLLECTION_BENEFITS,
  },
];

export const VERTICALS: Vertical[] = [...SECTORS, ...INDUSTRIES];
export const FEATURED_INDUSTRIES = INDUSTRIES.filter((i) => i.featured);
export const getVertical = (slug: string) => VERTICALS.find((v) => v.slug === slug);

/** Industry picker order on /services/#industries — live Elementor grid. */
export const INDUSTRY_HUB = [
  'consumer-products',
  'chemicals',
  'aerospace-defense',
  'education-research',
  'engineering',
  'gaming-hospitality-leisure',
  'government-contracting',
  'healthcare',
  'high-tech',
  'industrial-machinery-components',
  'insurance',
  'life-sciences',
  'manufacturing',
  'media',
  'mill-products',
  'mining',
  'oil-gas',
  'professional-services',
  'retail',
  'sports-entertainment',
  'telecommunications',
] as const;

export const ABOUT = {
  lede: 'WNRS is a leading global provider of customized debt collection and accounts receivable management services. For over half a century, WNRS has been helping companies in a diverse range of industries increase cash flow and reduce operating expenses through results-driven recovery solutions. Every step of the debt recovery process — design, implementation, management — is built to deliver results.',
  body: [
    'Through its headquarters in Miami, FL, WNRS oversees the company’s business operation centers in U.S., Canada, & Latin America. Get to know more about our services and find out what results WNRS can bring to you.',
    'When it comes to choosing the appropriate company to handle your company’s account receivables, look no further than WNRS. Not only have our proven systems worked for thousands of clients for over thirty years, but also, our team of networked offices, subsidiaries, research & investigation experts, multi-lingual debt collection specialists, and governmental partners have provided our clients with a synergistic collection program that is unrivaled in the collections industry.',
  ],
  vision: 'Our vision simply stated is to resolve account receivable issues through expert customer service.',
  mission:
    'We have the mission to continue to strengthen our worldwide position as the premier provider of customized accounts receivable management services to our diversified client groups.',
  objectives: [
    'To continuously improve, innovate, and stay on the forefront of market conditions affecting our global customer base',
    'To reduce our customer’s operating expenses',
    'To maximize our customer’s cash flow',
    'To constantly seek and offer tangible results',
    'To constantly seek faster and more efficient processing, billing, and collection times when servicing our customer’s accounts.',
    'To implement and create industry best practices that serve our customer’s needs',
    'To maintain firm our client’s prized customer and business relations',
  ],
  features: [
    {
      h: 'Top business processes',
      p: 'Account-level processes, personnel, and data-flow systems generate continuous revenue at every stage — from independently owned companies to Fortune 500 accounts.',
    },
    {
      h: 'Talented human capital',
      p: 'Results-driven experts train against client practices and objectives. Retention programs translate into consistent, high-quality service. There is no substitute for people who know this work.',
    },
    {
      h: 'Innovative technology',
      p: 'Centers connect over a closed network so associates work from current data. Operations run on proprietary software with VoIP, predictive dialers, call recording, secure transport, WAN, mirrored storage, and automated processors — built to scale.',
    },
    {
      h: '24×7 account tracking',
      p: 'Clients log in to monitor listed accounts in real time. The portal is the same system operations use — full transparency on progress, not a delayed summary.',
    },
    {
      h: 'Global Leader',
      p: 'WNRS has earned the title of “de-facto leader in accounts receivable management”. From innovative processes, to talented human capital and data-flow systems, WNRS generates continuous revenue for clients at all stages — from independently owned companies to Fortune 500 accounts.',
    },
  ],
} as const;

export const HOME = {
  kicker: 'Debt collection experts',
  h1a: 'Your Receivables.',
  h1b: 'Recovered.',
  h1c: 'Fast.',
  lede: 'With over 1,200 professionals, 8 global recovery hubs, and half a century of experience, we address all stages of delinquency to manage risk, reduce expenses, and increase recovery rates– at scale.',
  logosLabel: 'Finance leaders at top global and regional companies trust WNRS',
  servicesEyebrow: 'Services',
  servicesH2: 'Custom fit, Hyper specialized, receivable and CX services done for you',
  servicesSub:
    'Built to outperform any market, companies using our services recover 3x or more — 10x faster compared to traditional in-house teams. All while preserving valued customer experiences.',
  apartEyebrow: 'Why WNRS',
  apartH2: 'What sets us apart',
  apartSub:
    'For the last 50 years, WNRS has been the top debt collection and accounts receivable management agency for fortune 500 companies throughout the americas region. Here’s why:',
  processEyebrow: 'How it works',
  processH2: 'From debt to cashflow',
  processSub: 'We take care of the entire recovery journey — from unpaid invoices to recovered revenue. Real-time technology, data-driven decisions.',
  recognizedH2: '#1 agency for Fortune 500 clients and government throughout the Americas',
  quotesEyebrow: 'What our clients say',
  quotesH2: 'Results clients talk about',
  quotesSub:
    'For over 50 years, WNRS has been the top accounts receivable agency for B2B and B2C companies across 30+ industries. Here’s why:',
  ctaH: 'Recover and restore your cashflow now.',
  ctaP: 'Book a meeting today and find out why WNRS has been ranked the #1 agency in the accounts receivable and debt management space for nearly half a decade.',
} as const;

/** Live wnrs.com/about-us “Recognized by” marks, plus WSJ and Reuters (not on the live WP page). */
export const PRESS_LOGOS = [
  { src: withBase('/press/bloomberg.png'), alt: 'Bloomberg' },
  { src: withBase('/press/el-financiero.png'), alt: 'El Financiero' },
  { src: withBase('/press/art-americas.png'), alt: 'Art / Americas Society' },
  { src: withBase('/press/latin-trade.webp'), alt: 'Latin Trade' },
  // Compact official-style wordmark — live wnrs.com has no WSJ asset. Wordmark style
  // matches the public-domain masthead on Wikimedia (PD-textlogo).
  { src: withBase('/press/wsj.png'), alt: 'The Wall Street Journal', wide: true },
  // Official Reuters wordmark (navy + dotted globe) from Wikimedia Commons PD-textlogo.
  { src: withBase('/press/reuters.png'), alt: 'Reuters', wide: true },
] as const;

export const LINKEDIN_URL = 'https://www.linkedin.com/company/wnrscollections';

export type SeoEntry = {
  title: string;
  description: string;
};

/**
 * Unique `<title>` + meta description per route. Edit here; pages pass these
 * into BaseLayout. Target ~150–160 characters on descriptions, with a soft CTA
 * where it reads naturally.
 *
 * Keys are production paths (no `/wnrs` prefix).
 */
export const PAGE_SEO: Record<string, SeoEntry> = {
  '/': {
    title: SITE.title,
    description: SITE.description,
  },
  '/about-us': {
    title: 'About Us | Debt Collection Experts | WNRS',
    description:
      'WNRS is a Miami-based debt collection and accounts receivable firm: 50+ years, 1,200+ professionals, and recovery hubs across the Americas. Talk to an expert.',
  },
  '/services': {
    title: 'Collection Services by Type & Industry | WNRS',
    description:
      'Explore WNRS collection and accounts receivable services by type, sector, and industry — early stage through attorney intervention. Talk to an expert.',
  },
  '/insights': {
    title: 'Insights on Collections & Receivables | WNRS',
    description:
      'WNRS Insights: practical notes on debt collection, accounts receivable recovery, and cashflow for finance teams across the Americas. Read the latest.',
  },
  '/privacy': {
    title: 'Privacy Policy | WNRS',
    description:
      'How the WNRS marketing site handles information. Client files stay on online.wnrs.com — this site does not host collections data. Questions welcome.',
  },
  '/terms': {
    title: 'Terms of Service | WNRS',
    description:
      'Terms for the public WNRS marketing website. Collection work is governed by a separate client agreement, not these pages. Contact us with questions.',
  },
  '/404': {
    title: 'Page Not Found | WNRS',
    description:
      'That URL is not on the WNRS marketing site. Return home for debt collection and accounts receivable services across the Americas.',
  },
  '/pt': {
    title: 'WNRS Brasil | Cobrança e gestão de recebíveis',
    description:
      'WNRS — especialistas em cobrança e gestão de contas a receber nas Américas. Site em português em construção. Fale conosco.',
  },
  '/es': {
    title: 'WNRS México | Cobranza y gestión de cuentas por cobrar',
    description:
      'WNRS — expertos en cobranza y gestión de cuentas por cobrar en las Américas. Sitio en español en construcción. Contáctenos.',
  },
  '/early-stage-arm': {
    title: 'Early Stage Collection | Debt Collection | WNRS',
    description:
      'First-party early stage collection from WNRS — stop delinquency in the first 1–60 days without souring customer relationships. Talk to an expert.',
  },
  '/late-stage-arm': {
    title: 'Late Stage Collection | Pre-Charge-Off Recovery | WNRS',
    description:
      'Late stage collection for accounts nearing charge-off. Seasoned collectors, skip tracing, and attorney backup from WNRS. Recover more before write-off. Talk to an expert.',
  },
  '/specialized-arm': {
    title: 'Specialized Collection | Sensitive ARM | WNRS',
    description:
      'WNRS Specialized Unit handles sensitive, multi-party collections for government and multinationals. Complex disputes, discreet recovery. Talk to an expert.',
  },
  '/financial-skip-tracing': {
    title: 'Financial Skip Tracing | Location & Assets | WNRS',
    description:
      'WNRS skip tracing locates debtors and assets when public databases fall short. International investigators plus field work. Talk to an expert.',
  },
  '/attorney-intervention': {
    title: 'Attorney Intervention | Legal Collections | WNRS',
    description:
      'Litigation and judgment enforcement through WNRS’s international attorney network. One desk from recoverability analysis to execution. Talk to an expert.',
  },
  '/business': {
    title: 'Business Debt Collection | Mid-Market ARM | WNRS',
    description:
      'Accounts receivable and debt collection sized for mid-market companies. WNRS plugs in collectors, reporting, and skip tracing. Talk to an expert.',
  },
  '/enterprise': {
    title: 'Enterprise Debt Collection | Global ARM | WNRS',
    description:
      'Enterprise collections across regions, languages, and legal regimes. WNRS runs recovery as an extension of corporate finance. Talk to an expert.',
  },
  '/government': {
    title: 'Government Debt Collection | Public Sector ARM | WNRS',
    description:
      'Discreet debt collection for public entities and government-related commercial claims. Compliant outreach through legal enforcement. Talk to an expert.',
  },
  '/utilities': {
    title: 'Utilities Debt Collection | Regulated ARM | WNRS',
    description:
      'Accounts receivable programs for regulated utilities. WNRS recovers past-due balances with compliant, brand-safe outreach. Talk to an expert.',
  },
  '/education-research': {
    title: 'Education & Research Debt Collection | WNRS',
    description:
      'Debt collection for schools, research programs, and education lenders. WNRS recovers tuition and loan balances while protecting the institution. Talk to an expert.',
  },
  '/travel-transportation': {
    title: 'Travel & Transportation Debt Collection | WNRS',
    description:
      'Freight, corporate travel, and carrier receivables recovered across borders. WNRS collections for travel and transportation books. Talk to an expert.',
  },
  '/retail': {
    title: 'Retail Debt Collection | Ecommerce & Store ARM | WNRS',
    description:
      'High-volume retail and ecommerce debt collection without choking working capital. WNRS collectors work as an extension of your brand. Talk to an expert.',
  },
  '/manufacturing': {
    title: 'Manufacturing Debt Collection | Trade Credit ARM | WNRS',
    description:
      'Trade-credit recovery for manufacturers. WNRS lowers DSO, closes disputes, and collects delinquencies without adding plant overhead. Talk to an expert.',
  },
  '/professional-services': {
    title: 'Professional Services Debt Collection | WNRS',
    description:
      'Collect aged WIP and unpaid invoices for law, accounting, and consulting firms — without damaging client relationships. Discretion first. Talk to an expert.',
  },
  '/aerospace-defense': {
    title: 'Defense & Security Debt Collection | WNRS',
    description:
      'Discreet collections for aerospace, defense, and dual-use commercial claims. WNRS handles contract-heavy, cross-border files. Talk to an expert.',
  },
  '/construction-operations': {
    title: 'Construction Debt Collection | Retainage & Billings | WNRS',
    description:
      'Recover progress billings, retainage, and vendor balances on project work. WNRS construction collections trained on contract forms. Talk to an expert.',
  },
  '/banking': {
    title: 'Banking Debt Collection | Regulated Credit | WNRS',
    description:
      'Compliant recovery support for banks and credit portfolios. WNRS works inside your contact rules with auditable reporting. Talk to an expert.',
  },
  '/consumer-products': {
    title: 'Consumer Products Debt Collection | CPG ARM | WNRS',
    description:
      'Trade and consumer receivables for CPG and branded goods. WNRS recovers distributor and retail balances while protecting brand equity. Talk to an expert.',
  },
  '/chemicals': {
    title: 'Chemicals Debt Collection | B2B Trade Credit | WNRS',
    description:
      'B2B recovery for chemical producers and distributors. WNRS separates collectible balances from quality and freight claims. Talk to an expert.',
  },
  '/engineering': {
    title: 'Engineering Debt Collection | Project Fees | WNRS',
    description:
      'Fee recovery for engineering firms on milestone and retainer work. WNRS works from your SOWs, not a generic dunning letter. Talk to an expert.',
  },
  '/gaming-hospitality-leisure': {
    title: 'Hospitality & Gaming Debt Collection | WNRS',
    description:
      'Receivables for casinos, hotels, and leisure operators. WNRS recovers markers, folios, and group balances with discretion. Talk to an expert.',
  },
  '/government-contracting': {
    title: 'Government Contracting Debt Collection | WNRS',
    description:
      'Commercial recovery around primes, subcontractors, and agency payment. WNRS understands flow-downs and public-sector pace. Talk to an expert.',
  },
  '/healthcare': {
    title: 'Healthcare Debt Collection | Patient & Payer ARM | WNRS',
    description:
      'Healthcare A/R for hospitals and physician groups. WNRS works patient, payer, and third-party liability balances with trained collectors. Talk to an expert.',
  },
  '/high-tech': {
    title: 'High-Tech Debt Collection | SaaS & Hardware ARM | WNRS',
    description:
      'Collections for software, hardware, and channel partners. WNRS recovers subscriptions and distributor defaults across borders. Talk to an expert.',
  },
  '/industrial-machinery-components': {
    title: 'Industrial Machinery Debt Collection | WNRS',
    description:
      'Capex and spare-parts recovery for industrial equipment sellers. WNRS assesses recoverability before recommending legal spend. Talk to an expert.',
  },
  '/insurance': {
    title: 'Insurance Debt Collection | Premium & Subrogation | WNRS',
    description:
      'Premium, deductible, and subrogation recovery for insurers and MGAs. A specialist desk with compliant contact and reporting. Talk to an expert.',
  },
  '/life-sciences': {
    title: 'Life Sciences Debt Collection | Pharma & Device | WNRS',
    description:
      'Receivables for pharma, device, and research organizations. WNRS recovers hospital, distributor, and government balances discreetly. Talk to an expert.',
  },
  '/media': {
    title: 'Media Debt Collection | Advertising & Licensing | WNRS',
    description:
      'Advertising, licensing, and subscription recovery for media companies. WNRS works agency billing without treating buyers like consumers. Talk to an expert.',
  },
  '/mill-products': {
    title: 'Mill Products Debt Collection | Paper & Packaging | WNRS',
    description:
      'Trade-credit recovery for paper, packaging, and mill-product producers. WNRS works aged invoices, quality disputes, and slow-pay trade. Talk to an expert.',
  },
  '/mining': {
    title: 'Mining Debt Collection | Cross-Border Trade | WNRS',
    description:
      'Cross-border commercial recovery for mining and related trade. WNRS brings international offices and investigation to large invoices. Talk to an expert.',
  },
  '/oil-gas': {
    title: 'Oil & Gas Debt Collection | Energy ARM | WNRS',
    description:
      'Energy-sector collections for operators, service companies, and traders. WNRS scopes joint-interest, services, and trade invoices. Talk to an expert.',
  },
  '/wholesale-distribution': {
    title: 'Wholesale Distribution Debt Collection | WNRS',
    description:
      'High-volume trade-credit recovery for wholesalers and distributors. WNRS works aged invoices at volume for credit managers. Talk to an expert.',
  },
  '/sports-entertainment': {
    title: 'Sports & Entertainment Debt Collection | WNRS',
    description:
      'Recovery for rights, tickets, sponsorships, and venue receivables. WNRS matches tone to public brands, then escalates if needed. Talk to an expert.',
  },
  '/telecommunications': {
    title: 'Telecommunications Debt Collection | WNRS',
    description:
      'Subscriber and carrier receivables for telecom operators. WNRS covers high-volume delinquency and wholesale claims with compliant outreach. Talk to an expert.',
  },
};

/** Look up PAGE_SEO by production path (`/about-us`, `/retail`, …). */
export function getSeo(path: string): SeoEntry {
  const key = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  return PAGE_SEO[key] ?? { title: SITE.title, description: SITE.description };
}
