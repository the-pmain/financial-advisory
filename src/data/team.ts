import { company } from './company';
import type { ExpertiseTag } from './topics';

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  section: 'investment' | 'business' | 'investors';
  photo?: string;
  featured?: boolean;
  /** Shown only on the member profile page. */
  about: string;
  results: string[];
  credentials?: string[];
  languages?: string[];
  regulatoryNote?: string;
  /** Documentation ID under the firm’s FINMA portfolio-manager authorisation. */
  finmaAdviserNo?: string;
  /** Documentation ref for CFA Institute directory search; not a CFA serial. */
  cfaRegistryNo?: string;
  expertise?: ExpertiseTag[];
};

export type TeamSection = {
  id: TeamMember['section'];
  title: string;
  members: TeamMember[];
};

/** Catalog for i18n, prerender slugs, and SQL emit. Pages load live rows from GET /api/employees. */
export const teamMembers: TeamMember[] = [
  {
    slug: 'friedrich-hartmann',
    name: 'Friedrich Hartmann',
    role: 'Chairman and CIO',
    section: 'investment',
    photo: '/team/friedrich-hartmann.png',
    about:
      'Friedrich Hartmann has shaped Helfenstein’s investment culture for more than thirty years. A disciplined reader and long-distance walker, he still leads portfolio construction and sets the firm’s long-term value framework.',
    results: [
      'Built Helfenstein’s flagship equity strategy from inception; compound annual return of 11.4% since 2004.',
      'Named among Europe’s leading value managers three times by independent fund ratings.',
      'Author of In Long Horizon, on patient capital and cycle-aware investing.',
    ],
    credentials: ['Swiss banking diploma', 'CFA Charterholder'],
    languages: ['German', 'English', 'French'],
    finmaAdviserNo: 'CH-111.708.730/FH',
    cfaRegistryNo: 'CFAFH01',
    regulatoryNote: 'Senior manager within Helfenstein Asset Management’s advisory organisation.',
    expertise: ['investments', 'retirement', 'pensions'],
  },
  {
    slug: 'karin-vogel',
    name: 'Karin Vogel',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/karin-vogel.png',
    about:
      'Karin Vogel joined Helfenstein from boutique value houses in Madrid and Zaragoza. She covers European mid-caps with a forensic, bottom-up style and a calm, direct manner with clients.',
    results: [
      'CFA Charterholder; lead analyst on the Continental Value fund since 2016.',
      'Portfolio outperformed its benchmark by 2.8% annualised over the last five years.',
      'Recognised internally for turning three overlooked industrial holdings into core long-term positions.',
    ],
    credentials: ['CFA Charterholder'],
    languages: ['German', 'Spanish', 'English'],
    finmaAdviserNo: 'CH-111.708.730/KV',
    cfaRegistryNo: 'CFAKV01',
    expertise: ['investments'],
  },
  {
    slug: 'lukas-steiner',
    name: 'Lukas Steiner',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/lukas-steiner.png',
    about:
      'Lukas Steiner trained in Vienna and London before settling at Helfenstein. He blends fundamental equity work with a keen interest in Austrian economics and football—usually in that order on match days.',
    results: [
      'Manages the firm’s Iberian equity sleeve alongside European co-managers.',
      'Cut average portfolio turnover by 22% while improving hit rate on new ideas.',
      'Regular speaker at Helfenstein’s internal research forum on capital-cycle timing.',
    ],
  },
  {
    slug: 'maximilian-berger',
    name: 'Maximilian Berger',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/maximilian-berger.png',
    about:
      'Maximilian Berger moved from audit into portfolio management, bringing a sceptical eye for accounting quality. Colleagues describe him as quiet in meetings and relentless in the workbook.',
    results: [
      'Flagged two balance-sheet risks early that later became widely discussed in the market.',
      'Co-manages defensively positioned European holdings in the Global Value range.',
      'Led Helfenstein’s 2023 review of reporting standards across the investable universe.',
    ],
  },
  {
    slug: 'julian-vogt',
    name: 'Julian Vogt',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/julian-vogt.png',
    about:
      'Julian Vogt holds degrees in law and business and a deep interest in capital theory. Outside the office he is more likely to be on a golf course or rewatching a favourite film than checking prices.',
    results: [
      'Structured Helfenstein’s governance checklist now used before every new large position.',
      'Helped reduce legal and regulatory friction in three cross-border holdings.',
      'Mentors junior analysts on thesis writing and position sizing.',
    ],
  },
  {
    slug: 'ken-wagner',
    name: 'Ken Wagner',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/ken-wagner.png',
    about:
      'Ken Wagner bridges Helfenstein’s European desk with Asian-listed opportunities. Born in Taipei and educated in Barcelona, he travels often and reads company filings with the same patience.',
    results: [
      'Opened Helfenstein’s first dedicated Asia-Pacific research coverage in 2019.',
      'Sourced four investments now representing more than 8% of the global portfolio.',
      'Fluent in Mandarin, German and Spanish; primary contact for regional brokers.',
    ],
  },
  {
    slug: 'stefan-richter',
    name: 'Stefan Richter',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/stefan-richter.png',
    about:
      'Stefan Richter spent years on the sell side before joining Helfenstein. A mountain runner when not in the office, he prefers businesses that can compound quietly through cycles.',
    results: [
      'Former head of research at a listed industrial group; joined Helfenstein in 2015.',
      'Top-quartile performance on cyclical holdings during the 2020–2022 period.',
      'Built the firm’s energy-transition watchlist adopted by the full investment committee.',
    ],
  },
  {
    slug: 'greta-keller',
    name: 'Greta Keller',
    role: 'Junior analyst',
    section: 'investment',
    photo: '/team/greta-keller.png',
    about:
      'Greta Keller joined Helfenstein after an internship in investor relations and quickly moved onto the investment floor. She brings fresh modelling skills and an unusually sharp eye for consumer trends.',
    results: [
      'Graduated top of her class in business administration; joined the team in 2023.',
      'First analyst note to reach the portfolio within six weeks of starting.',
      'Supports coverage of small-cap consumer and industrial names across the DACH region.',
    ],
  },
  {
    slug: 'tobias-brandt',
    name: 'Tobias Brandt',
    role: 'Managing director',
    section: 'business',
    photo: '/team/tobias-brandt.png',
    about:
      'Tobias Brandt leads client development at Helfenstein after stints in private banking and equity sales. He is usually the first person a prospective client speaks to before a first meeting is arranged.',
    results: [
      'Grew Helfenstein’s private client base by 40% in four years.',
      'Launched the firm’s client-education programme, now attended by 600+ people yearly.',
      'Previously directed private-client coverage for Iberia at a European multi-asset platform.',
    ],
    languages: ['German', 'English', 'Spanish'],
    expertise: ['pensions', 'insurance', 'retirement'],
  },
  {
    slug: 'markus-engel',
    name: 'Markus Engel',
    role: 'Director, client communications',
    section: 'business',
    photo: '/team/markus-engel.png',
    about:
      'Markus Engel runs client communications and marketing. Warm on calls and precise in follow-up, he keeps Helfenstein’s external voice consistent with how portfolios are actually run.',
    results: [
      'Rebuilt the client reporting and correspondence used across the advisory team.',
      'Introduced quarterly letter format now cited by several national business titles.',
      'Leads the team that handles more than 12,000 client touchpoints per year.',
    ],
  },
  {
    slug: 'marc-weber',
    name: 'Marc Weber',
    role: 'Managing Director, Client Operations',
    section: 'business',
    photo: '/team/marc-weber.png',
    about:
      'Marc Weber coordinates client operations and the relationships with our custodian banks. He joined from private banking and makes sure clients get clear reporting from the bank that holds their assets, from Lucerne and internationally.',
    results: [
      'Reduced the custody and settlement costs Helfenstein clients pay their banks by 18% since 2020.',
      'Led the review that moved clients onto segregated custody accounts held in their own names.',
      'Negotiates custody terms with custodian banks on behalf of private clients.',
    ],
    credentials: ['Swiss banking diploma'],
    languages: ['German', 'French', 'English'],
    finmaAdviserNo: 'CH-111.708.730/MW',
    regulatoryNote: 'Senior manager responsible for client operations and custody coordination.',
    expertise: ['investments'],
  },
  {
    slug: 'andrew-ramsden',
    name: 'Andrew Ramsden',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/andrew-ramsden.png',
    about:
      'Andrew Ramsden brings three decades of client relationship experience to Helfenstein’s advisory desk. Measured and approachable, he is the person clients call when a decision needs clarity rather than spin.',
    results: [
      'Advises more than 40 families on retirement and drawdown planning.',
      'Built the written pre-retirement review now used across the advisory team.',
      'Former head of private client coverage at a London-based manager before joining Helfenstein in 2019.',
    ],
    credentials: ['IMC', 'CFA Level II'],
    languages: ['English', 'German'],
    finmaAdviserNo: 'CH-111.708.730/AR',
    expertise: ['investments', 'pensions', 'retirement'],
  },
  {
    slug: 'andrew-savage',
    name: 'Andrew Savage',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/andrew-savage.png',
    about:
      'Andrew Savage specialises in onboarding new clients and keeping reporting sharp. Energetic in meetings and meticulous in follow-up, he bridges the investment team and clients without losing the detail.',
    results: [
      'Onboarded 110 new private clients over the past two years.',
      'Rebuilt the quarterly reporting pack sent to every client; satisfaction rose eight points.',
      'Primary contact for clients with assets held across more than one custodian bank.',
    ],
    languages: ['English', 'French'],
    expertise: ['investments', 'taxes', 'real-estate'],
  },
  {
    slug: 'anja-hoffmann',
    name: 'Anja Hoffmann',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/anja-hoffmann.png',
    about:
      'Anja Hoffmann moved into asset management from listed-company IR. Clients appreciate her direct style and the way she explains complex portfolio moves in plain language.',
    results: [
      'Manages relationships with more than 180 private clients and families.',
      'Client satisfaction score of 4.8/5 in last annual survey.',
      'Organises Helfenstein’s twice-yearly client seminars in Lucerne.',
    ],
    credentials: ['CFP®'],
    languages: ['German', 'English'],
    finmaAdviserNo: 'CH-111.708.730/AH',
    expertise: ['retirement', 'taxes', 'estate'],
  },
  {
    slug: 'florian-bauer',
    name: 'Florian Bauer',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/florian-bauer.png',
    about:
      'Florian Bauer looks after clients who expect detail, not drama. A former tennis addict turned weekend skier, he is reliable under pressure and rarely misses a callback.',
    results: [
      'Advises households on portfolio structure and annual rebalancing.',
      'Reduced average query response time to under four business hours.',
      'Key contact for German-speaking clients resident outside Switzerland.',
    ],
  },
  {
    slug: 'erik-schneider',
    name: 'Erik Schneider',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/erik-schneider.png',
    about:
      'Erik Schneider has spent two decades around funds and advisory platforms. Steady and unhurried, he is often the first person long-standing clients ask for when markets turn noisy.',
    results: [
      'Maintains Helfenstein’s longest-tenured client book, dating back to 2008.',
      'Helped retain 98% of assets during the 2022 volatility spike.',
      'Former private-banking director before joining Helfenstein in 2016.',
    ],
  },
  {
    slug: 'birgit-schulz',
    name: 'Birgit Schulz',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/birgit-schulz.png',
    about:
      'Birgit Schulz joined financial services after a career in quality control—a background that shows in how she documents every client interaction. Calm, thorough, and hard to fluster.',
    results: [
      'Rebuilt the team’s CRM hygiene standards; data completeness now above 99%.',
      'Supports Nordic and Benelux clients across three languages.',
      'Recognised for resolving the firm’s most complex legacy account transfers.',
    ],
  },
  {
    slug: 'alexander-koch',
    name: 'Alexander Koch',
    role: 'Senior client adviser',
    section: 'investors',
    photo: '/team/alexander-koch.png',
    about:
      'Alexander Koch advises clients with more complex affairs — several banks, assets in more than one country, or a business being wound down into retirement. Young but already trusted in difficult conversations.',
    results: [
      'Handles the firm’s cross-border private client cases since 2022.',
      'Built the consolidation process for clients holding assets at several custodians.',
      'Coordinates Helfenstein’s sustainability preference questionnaire under FinSA.',
    ],
  },
  {
    slug: 'leon-roth',
    name: 'Leon Roth',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/leon-roth.png',
    about:
      'Leon Roth keeps Helfenstein’s client service machine running smoothly. Colleagues rely on him to connect the right desk at the right moment without clients feeling passed around.',
    results: [
      'Coordinates cross-team requests for more than 400 active client files.',
      'Introduced shared response templates that halved internal handoff errors.',
      'Known for turning difficult service cases into long-term client loyalty.',
    ],
  },
  {
    slug: 'henrik-meier',
    name: 'Henrik Meier',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/henrik-meier.png',
    about:
      'Henrik Meier writes the day-to-day client updates and supports the communications team. Clear, concise and slightly musical outside work—he plays guitar in a office band that is better than it sounds.',
    results: [
      'Produces the monthly client letter read by more than 8,000 subscribers.',
      'Helped lift email open rates by 19% through clearer subject lines and structure.',
      'Backup editor for all German-language external publications.',
    ],
  },
];

export const featuredMember = teamMembers[0];

const SECTION_TITLES: Record<TeamMember['section'], string> = {
  investment: 'Investment team',
  business: 'Business development',
  investors: 'Client advisers',
};

export function featuredFrom(members: TeamMember[]): TeamMember | undefined {
  return members.find((member) => member.featured) ?? members[0];
}

export function teamBySlugFrom(members: TeamMember[]): Map<string, TeamMember> {
  return new Map(members.map((member) => [member.slug, member]));
}

export function teamSectionsFrom(members: TeamMember[]): TeamSection[] {
  const featured = featuredFrom(members);
  return (['investment', 'business', 'investors'] as const).map((id) => ({
    id,
    title: SECTION_TITLES[id],
    members: members.filter(
      (member) => member.section === id && member.slug !== featured?.slug,
    ),
  }));
}

export const teamSections: TeamSection[] = teamSectionsFrom(teamMembers);

export const teamBySlug = teamBySlugFrom(teamMembers);

const CFA_DIRECTORY = 'https://www.cfainstitute.org/en/membership/directory';

function adviserInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => !/^(de|del|la|las|los|y)$/i.test(part))
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Firm-authorisation documentation ID, unique per adviser. */
export function finmaAdviserNoFor(member: TeamMember): string {
  return member.finmaAdviserNo ?? `${company.regulation.finmaAuthorisationNo}/${adviserInitials(member.name)}`;
}

export function cfaDirectoryUrl(): string {
  return CFA_DIRECTORY;
}

export function teamByExpertise(
  tags: ExpertiseTag[] | undefined,
  members: TeamMember[] = teamMembers,
): TeamMember[] {
  if (!tags?.length) return [];
  const set = new Set(tags);
  return members.filter((m) => m.expertise?.some((tag) => set.has(tag))).slice(0, 4);
}
