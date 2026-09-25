import { company } from './company';
import type { ExpertiseTag } from './topics';

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  section: 'investment' | 'business' | 'investors';
  photo?: string;
  featured?: boolean;
  /** Shown only on the member profile page. Two paragraphs, separated by a blank line. */
  about: string;
  /** Professional focus points shown on the member profile. */
  focus?: string[];
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
    about: [
      'Friedrich Hartmann leads Helfenstein’s investment strategy, bringing more than 30 years of experience to portfolio construction and long-term capital allocation. His approach centres on understanding business quality, paying disciplined valuations and maintaining perspective through changing market conditions. As Chairman and CIO, he sets the investment framework and guides the team’s assessment of risk. He places particular emphasis on clear investment reasoning and the patience to hold convictions while remaining open to new evidence.',
      'His investment philosophy starts with a straightforward question: what makes a business worth owning over a full market cycle? He encourages the team to test the assumptions behind each investment case and consider how individual holdings interact within the portfolio. In client discussions, his emphasis is on explaining the relationship between valuation, uncertainty and the time required for an investment thesis to develop.',
    ].join('\n\n'),
    focus: [
      'Investment strategy and long-term capital allocation',
      'Portfolio construction and risk assessment',
      'Fundamental valuation and investment discipline',
      'Leadership of the investment research process',
    ],
    results: ['More than 30 years shaping the firm’s investment approach.'],
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
    about: [
      'Karin Vogel specialises in European mid-cap equities, combining detailed company research with a disciplined assessment of valuation. Her background with boutique value-investment firms in Spain informs a practical understanding of regional businesses and their competitive positions. A lead analyst on the Continental Value fund since 2016, she examines cash generation, management decisions and the durability of earnings. Karin also helps clients understand the reasoning behind portfolio holdings in clear, accessible language.',
      'Her research looks beyond headline growth to examine how companies fund expansion, protect margins and allocate capital. She gives particular attention to the relationship between operating performance and cash flow, using it to challenge optimistic forecasts. In portfolio discussions, Karin sets out both the opportunity and the conditions that could weaken the investment case, supporting a balanced assessment of each holding.',
    ].join('\n\n'),
    focus: [
      'European mid-cap company research',
      'Cash-flow analysis and earnings quality',
      'Valuation and management assessment',
      'Clear explanations of portfolio holdings',
    ],
    results: [
      'Lead analyst on the Continental Value fund since 2016.',
      'Three researched industrial holdings developed into core long-term positions.',
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
    about: [
      'Lukas Steiner focuses on European equities, with particular responsibility for the firm’s Iberian holdings. Having trained in Vienna and London, he combines fundamental company analysis with an interest in capital cycles and the economic forces shaping business returns. His work on portfolio discipline contributed to a 22% reduction in average turnover. Lukas favours carefully researched positions and a measured approach to trading, assessing each decision against the portfolio’s long-term investment case.',
      'A central theme in his work is how investment, competition and financing conditions influence future profitability. He considers whether current earnings reflect a sustainable position or a favourable point in the cycle. Within portfolio discussions, Lukas emphasises the reasons for owning a company, the developments that would justify a reassessment and the costs associated with unnecessary changes to established positions.',
    ].join('\n\n'),
    focus: [
      'European and Iberian equity analysis',
      'Capital-cycle research',
      'Long-term valuation and investment timing',
      'Portfolio turnover and trading discipline',
    ],
    results: ['22% reduction in average portfolio turnover.'],
  },
  {
    slug: 'maximilian-berger',
    name: 'Maximilian Berger',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/maximilian-berger.png',
    about: [
      'Maximilian Berger brings an audit background to equity investing, with a particular focus on accounting quality, balance-sheet strength and the reliability of reported earnings. He co-manages defensively positioned European holdings within the Global Value range. In 2023, he led the firm’s review of reporting standards across its investment universe. His contribution is a detailed examination of what sits behind the headline figures, helping the team challenge assumptions and identify financial weaknesses before committing capital.',
      'His analytical style is grounded in reconciliation: checking whether the income statement, balance sheet and cash-flow statement tell a consistent story. He pays attention to working-capital movements, financing commitments and the assumptions underlying reported asset values. This perspective adds depth to the team’s investment debates, particularly when apparently attractive valuations need to be weighed against less visible financial or accounting risks.',
    ].join('\n\n'),
    focus: [
      'Financial-statement analysis and accounting quality',
      'Balance-sheet resilience and financing risks',
      'Defensive European equity research',
      'Review of corporate reporting standards',
    ],
    results: [
      'Led the firm’s reporting-standards review in 2023.',
      'Identified two balance-sheet risks before they attracted wider market attention.',
    ],
  },
  {
    slug: 'julian-vogt',
    name: 'Julian Vogt',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/julian-vogt.png',
    about: [
      'Julian Vogt combines a background in law and business with a focus on corporate governance and investment decision-making. He developed the governance checklist used ahead of new large portfolio positions, bringing ownership structures, shareholder rights and management incentives into the research process. Alongside his portfolio responsibilities, he mentors junior analysts on investment-thesis writing and position sizing. Julian’s approach connects the strength of a business with the terms on which investors participate in its future.',
      'He examines how corporate structures and management decisions influence the position of shareholders over time. His research considers whether incentives encourage responsible capital allocation and whether a company’s governance supports its stated strategy. When working with less experienced analysts, Julian emphasises concise reasoning, explicit assumptions and a clear explanation of the evidence that would cause an investment view to change.',
    ].join('\n\n'),
    focus: [
      'Corporate governance and shareholder interests',
      'Ownership structures and management incentives',
      'Investment-thesis development',
      'Analyst mentoring and position-sizing discussions',
    ],
    results: ['Supported work on legal and regulatory complexity in three cross-border holdings.'],
  },
  {
    slug: 'ken-wagner',
    name: 'Ken Wagner',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/ken-wagner.png',
    about: [
      'Ken Wagner connects Helfenstein’s European investment team with opportunities in Asian-listed companies. He established the firm’s dedicated Asia-Pacific research coverage in 2019, developing a regional perspective grounded in company filings and ongoing dialogue with market participants. Fluent in Mandarin, German and Spanish, he supports communication across markets and research partners. He sourced four investments that represented more than 8% of the global portfolio. Ken focuses on understanding businesses in their local context while assessing how each opportunity fits the wider portfolio’s valuation and risk framework.',
      'His research takes account of differences in disclosure practices, ownership structures and the competitive conditions facing companies across the region. He brings these considerations into discussions with European colleagues, helping them assess opportunities with appropriate local context. Ken’s approach combines close reading of financial information with an interest in how businesses generate cash, finance expansion and treat minority shareholders.',
    ].join('\n\n'),
    focus: [
      'Asia-Pacific equity research',
      'Regional company and industry analysis',
      'Cross-market research coordination',
      'Multilingual communication with research partners',
    ],
    results: ['Four investments sourced, representing more than 8% of the global portfolio.'],
  },
  {
    slug: 'stefan-richter',
    name: 'Stefan Richter',
    role: 'Portfolio manager',
    section: 'investment',
    photo: '/team/stefan-richter.png',
    about: [
      'Stefan Richter joined Helfenstein in 2015, bringing experience in investment research and the analysis of industrial businesses. He focuses on companies whose competitive strengths and cash flows can endure changing economic conditions. Stefan developed the firm’s energy-transition watchlist, giving the investment committee a structured basis for examining the businesses affected by this long-term shift. His research connects industry developments with company fundamentals, with particular attention to the capital required to sustain future growth.',
      'He studies the relationship between industrial demand, production capacity and the investment needed to maintain a company’s competitive position. In energy-transition research, he distinguishes broad sector themes from the economics of individual businesses. Stefan’s approach asks how an opportunity translates into earnings and cash flow, and whether the balance sheet can support the investment required through less favourable phases of the cycle.',
    ].join('\n\n'),
    focus: [
      'Industrial and cyclical company analysis',
      'Energy-transition investment research',
      'Capital expenditure and cash-flow assessment',
      'Business resilience across economic cycles',
    ],
    results: ['Member of the Helfenstein team since 2015.'],
  },
  {
    slug: 'greta-keller',
    name: 'Greta Keller',
    role: 'Junior analyst',
    section: 'investment',
    photo: '/team/greta-keller.png',
    about: [
      'Greta Keller supports research into smaller consumer and industrial companies across Germany, Austria and Switzerland. She joined Helfenstein in 2023 following an internship in investor relations, bringing a business-administration background and a strong interest in financial modelling. Her work combines analysis of company disclosures with an assessment of changing customer behaviour. Working alongside the portfolio managers, Greta helps translate emerging research ideas into clearly structured investment cases and ongoing company monitoring.',
      'Her analytical approach begins with the underlying drivers of revenue, margins and working capital. She is particularly interested in how shifts in demand become visible in company results and whether management’s explanations are supported by the figures. In preparing research, Greta emphasises transparent assumptions and well-organised supporting material, making it easier for senior colleagues to review a model and challenge its conclusions.',
    ].join('\n\n'),
    focus: [
      'Small-cap consumer and industrial research',
      'Financial modelling and company disclosures',
      'Consumer trends and operating performance',
      'Research support across the DACH region',
    ],
    results: [
      'Joined the investment team in 2023.',
      'First analyst note reached the portfolio within six weeks.',
    ],
  },
  {
    slug: 'tobias-brandt',
    name: 'Tobias Brandt',
    role: 'Managing director',
    section: 'business',
    photo: '/team/tobias-brandt.png',
    about: [
      'Tobias Brandt leads client development at Helfenstein, drawing on experience in private banking and equity sales. He works with prospective clients to understand their priorities and introduce the investment and advisory teams best placed to support them. His client-development work contributed to 40% growth in the private-client base over four years. Tobias also launched the firm’s client-education programme, which attracts more than 600 attendees annually. Fluent in German, English and Spanish, he places clear explanations and well-defined expectations at the centre of the client relationship.',
      'He approaches business development as the beginning of an ongoing advisory relationship. Early conversations focus on what clients want to achieve, how they prefer to communicate and what they expect from professional investment support. Through the education programme, Tobias encourages informed questions and a better understanding of the firm’s approach, helping prospective and established clients participate more confidently in discussions about their finances.',
    ].join('\n\n'),
    focus: [
      'Private-client development and relationship building',
      'Initial needs and expectations discussions',
      'Client education and investment communication',
      'Coordination between prospective clients and advisers',
    ],
    results: [
      '40% growth in the private-client base over four years.',
      'More than 600 attendees annually at the client-education programme.',
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
    about: [
      'Markus Engel leads Helfenstein’s client communications and marketing, translating investment thinking into clear reporting and consistent correspondence. He redesigned the materials used across the advisory team and oversees communications supporting more than 12,000 client interactions each year. His focus is on helping clients understand portfolio decisions, market developments and the information relevant to their circumstances. Markus works closely with investment and advisory colleagues to keep the firm’s external communications precise, useful and consistent.',
      'He approaches each communication from the reader’s perspective: what has happened, why it matters and whether it calls for a discussion with an adviser. This shapes his work on reporting structure, editorial consistency and the presentation of complex topics. Markus also places emphasis on explaining uncertainty clearly, so that concise writing preserves the context clients need to understand an investment decision.',
    ].join('\n\n'),
    focus: [
      'Client reporting and editorial direction',
      'Investment and market communications',
      'Consistency across client correspondence',
      'Coordination with investment and advisory teams',
    ],
    results: ['Communications supporting more than 12,000 client interactions each year.'],
  },
  {
    slug: 'marc-weber',
    name: 'Marc Weber',
    role: 'Managing Director, Client Operations',
    section: 'business',
    photo: '/team/marc-weber.png',
    about: [
      'Marc Weber oversees client operations and coordinates Helfenstein’s relationships with custodian banks. Drawing on a private-banking background, he focuses on account administration, custody arrangements and the clarity of client reporting. His review of custody and settlement terms helped reduce related client costs by 18% from 2020. Working in German, French and English, Marc connects clients, advisers and banking partners to support an orderly and responsive service.',
      'His approach is to make the responsibilities of the adviser, the custodian and the client easy to understand. He pays attention to the practical details that influence service quality, including the completeness of account information and the handling of outstanding requests. Marc also brings a cost-conscious perspective to banking relationships, considering how operational arrangements affect the client’s overall experience and ongoing administration.',
    ].join('\n\n'),
    focus: [
      'Client operations and account administration',
      'Custodian-bank relationship coordination',
      'Custody terms and settlement-cost review',
      'Reporting clarity and operational follow-through',
    ],
    results: ['18% reduction in client custody and settlement costs since 2020.'],
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
    about: [
      'Andrew Ramsden brings 30 years of client-relationship experience to retirement and investment planning. He advises more than 40 families, helping them consider how their portfolios can support changing income needs and long-term priorities. His background includes leading private-client coverage at a London-based investment manager. Andrew developed the pre-retirement review used across Helfenstein’s advisory team, creating a structured starting point for discussions about retirement readiness, withdrawals and the decisions that need attention over time.',
      'His conversations address the transition from accumulating wealth to drawing on it, including the balance between regular income, accessible reserves and longer-term investment needs. He places particular value on revisiting assumptions as family circumstances evolve. Andrew’s manner is deliberate and accessible, giving clients room to consider the trade-offs involved and understand how individual decisions fit into a broader retirement plan.',
    ].join('\n\n'),
    focus: [
      'Retirement preparation and income planning',
      'Portfolio withdrawals and changing cash needs',
      'Long-term family advisory relationships',
      'Structured pre-retirement reviews',
    ],
    results: [
      '30 years of client-relationship experience.',
      'Retirement and drawdown guidance for more than 40 families.',
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
    about: [
      'Andrew Savage focuses on client onboarding, investment reporting and the coordination of relationships involving multiple custodian banks. He has supported the onboarding of 110 private clients over a two-year period and helped redesign the firm’s quarterly reporting pack, following which the reported client-satisfaction measure rose by 8 points. Working in English and French, Andrew connects clients with the investment team and keeps follow-up organised. His approach centres on making information easy to navigate and ensuring that clients understand the next steps in their relationship with the firm.',
      'He pays particular attention to the early stages of a relationship, when clients need a clear understanding of documentation, responsibilities and communication arrangements. Where several banks are involved, he helps bring the available information into a more coherent view. Andrew also treats reporting as a starting point for discussion, helping clients identify the questions that deserve attention at their next review.',
    ].join('\n\n'),
    focus: [
      'New-client onboarding and follow-up',
      'Quarterly reporting and client explanations',
      'Coordination across multiple custodians',
      'Communication between clients and investment colleagues',
    ],
    results: [
      '110 new private clients onboarded over two years.',
      'Eight-point increase in the reported satisfaction measure after the reporting redesign.',
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
    about: [
      'Anja Hoffmann draws on a background in listed-company investor relations to explain portfolio decisions clearly and place them in the context of clients’ wider financial priorities. She manages relationships with more than 180 private clients and families, with a focus on retirement and long-term planning. Her client-satisfaction score reached 4.8 out of 5 in the latest annual survey. Anja also organises the firm’s twice-yearly client seminars in Lucerne. Working in German and English, she brings a direct, structured approach to conversations that can otherwise feel complex.',
      'She approaches client meetings by connecting investment information to the decisions a household actually faces. Rather than leaving clients with a collection of market observations, she seeks to clarify what those developments mean for the next discussion about their plans. Her investor-relations experience informs a careful choice of language and a preference for explaining the reasoning behind decisions, including the assumptions and uncertainties involved.',
    ].join('\n\n'),
    focus: [
      'Private-client and family relationships',
      'Retirement and long-term planning discussions',
      'Explanation of portfolio decisions',
      'Client seminars and financial education',
    ],
    results: [
      'Relationships with more than 180 private clients and families.',
      'Client-satisfaction score of 4.8 out of 5 in the latest annual survey.',
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
    about: [
      'Florian Bauer advises households on portfolio structure and annual rebalancing, with particular responsibility for German-speaking clients living outside Switzerland. He focuses on practical explanations, careful follow-up and continuity between formal portfolio reviews. His work on client service helped bring average query response times below four business hours. Florian’s approach gives clients a clear point of contact for everyday questions while keeping discussions connected to their broader investment objectives and changing circumstances.',
      'His review style is detail-oriented, covering how a portfolio is positioned, whether circumstances have changed and which matters require further attention. For clients living abroad, he places particular emphasis on organised communication and clear responsibility for follow-up. Florian aims to make routine service dependable, so that questions about reports, portfolio changes or upcoming reviews are handled with appropriate context and a clear next step.',
    ].join('\n\n'),
    focus: [
      'Household portfolio reviews',
      'Annual rebalancing discussions',
      'Support for German-speaking clients abroad',
      'Responsive service and organised follow-up',
    ],
    results: ['Average client-query response time reduced to under four business hours.'],
  },
  {
    slug: 'erik-schneider',
    name: 'Erik Schneider',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/erik-schneider.png',
    about: [
      'Erik Schneider brings 20 years of experience across investment funds, advisory platforms and private banking. Since joining Helfenstein in 2016, he has focused on maintaining long-term client relationships and providing continuity through changing market conditions. His relationship-management work helped retain 98% of assets during the market volatility of 2022. His background as a private-banking director informs a measured approach to portfolio discussions and client service. Erik helps clients distinguish short-term market developments from the considerations that matter to their financial plans, keeping conversations grounded in their individual priorities.',
      'He places value on understanding the history behind a client’s decisions, including previous market experiences and their expectations of investment support. This perspective helps him frame discussions during periods of uncertainty without losing sight of the original objectives. Erik’s approach combines accessible explanations with a willingness to revisit earlier assumptions, recognising that a long-standing relationship still needs to adapt as the client’s circumstances develop.',
    ].join('\n\n'),
    focus: [
      'Long-term private-client relationships',
      'Portfolio discussions during market uncertainty',
      'Investment-fund and advisory-platform experience',
      'Ongoing reviews of client priorities',
    ],
    results: ['Helped retain 98% of assets during the market volatility of 2022.'],
  },
  {
    slug: 'birgit-schulz',
    name: 'Birgit Schulz',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/birgit-schulz.png',
    about: [
      'Birgit Schulz brings a quality-control background to client service, with particular strengths in documentation, account transfers and the accuracy of client records. She helped rebuild the team’s CRM standards, raising recorded data completeness above 99%. Supporting clients in the Nordic and Benelux regions, Birgit approaches complex administrative matters with a clear sequence of actions and thorough follow-through. Her work supports continuity across the advisory team and gives clients an organised point of contact during account changes.',
      'She treats accurate records as an essential part of good service: they allow colleagues to understand what has been agreed and what remains outstanding. In account-transfer matters, her approach is to identify dependencies early and keep the relevant parties informed. Birgit’s attention to documentation also supports smoother handovers, reducing the need for clients to repeat background information when several teams are involved.',
    ].join('\n\n'),
    focus: [
      'Client documentation and record accuracy',
      'Account-transfer coordination',
      'CRM standards and information completeness',
      'Service support for Nordic and Benelux clients',
    ],
    results: ['Client-record completeness increased to above 99%.'],
  },
  {
    slug: 'alexander-koch',
    name: 'Alexander Koch',
    role: 'Senior client adviser',
    section: 'investors',
    photo: '/team/alexander-koch.png',
    about: [
      'Alexander Koch works with clients whose financial affairs span several banks, countries or stages of business ownership. Since 2022, he has handled the firm’s cross-border private-client cases and developed a process for consolidating information from multiple custodians. His focus is on bringing a clearer overall view to arrangements that can otherwise become fragmented. Alexander coordinates the relevant discussions and follow-up, helping clients consider portfolio decisions alongside business transitions and their longer-term retirement priorities.',
      'He begins by understanding how the different parts of a client’s finances relate to one another, rather than assessing each account in isolation. Where a business transition changes the purpose of invested assets, he helps organise the questions that need to be addressed. Alexander places particular value on clear information sharing and a defined sequence of decisions, making complex arrangements easier to discuss and review.',
    ].join('\n\n'),
    focus: [
      'Complex private-client relationships',
      'Cross-border coordination',
      'Consolidation of multi-custodian information',
      'Business-transition and retirement discussions',
    ],
    results: ['Responsible for cross-border private-client cases since 2022.'],
  },
  {
    slug: 'leon-roth',
    name: 'Leon Roth',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/leon-roth.png',
    about: [
      'Leon Roth focuses on coordinating client service across Helfenstein’s advisory and operational teams. He supports requests associated with more than 400 active client files, helping enquiries reach the appropriate colleagues and keeping follow-up on track. Leon introduced shared response templates that reduced internal handover errors by 50%, improving consistency as requests moved between teams. His contribution is practical and client-focused: maintaining context as requests move between teams and helping clients navigate service matters with clear communication and dependable coordination.',
      'He approaches service coordination by keeping track of the request, its background and the person responsible for the next action. This is especially useful when a client’s question involves both an adviser and an operational specialist. Leon’s emphasis is on maintaining continuity throughout that process, with updates that explain progress clearly and help clients understand what information or action may still be needed.',
    ].join('\n\n'),
    focus: [
      'Cross-team client-service coordination',
      'Request tracking and follow-through',
      'Consistent internal handovers',
      'Resolution of complex service enquiries',
    ],
    results: [
      'Service coordination across more than 400 active client files.',
      '50% reduction in internal handover errors after shared response templates were introduced.',
    ],
  },
  {
    slug: 'henrik-meier',
    name: 'Henrik Meier',
    role: 'Client adviser',
    section: 'investors',
    photo: '/team/henrik-meier.png',
    about: [
      'Henrik Meier combines client-service responsibilities with a focus on written communications. He produces the firm’s monthly client letter for more than 8,000 subscribers and supports the editing of German-language publications. His work turns investment-team input and market updates into concise explanations that clients can readily follow. Improvements to subject lines and content structure helped increase email open rates by 19%. Henrik pays particular attention to structure, wording and relevance, helping maintain a consistent standard across everyday correspondence and the firm’s regular client communications.',
      'He considers clarity a matter of selecting and ordering information as much as simplifying language. In his writing, he aims to make the main point easy to identify while preserving the detail needed to understand it. His position between client service and communications brings a useful perspective to editorial work, helping him anticipate the questions readers may have about the firm’s updates and explanations.',
    ].join('\n\n'),
    focus: [
      'Monthly client letters and updates',
      'German-language editing',
      'Accessible investment explanations',
      'Consistent structure across written communications',
    ],
    results: [
      'Monthly client letter reaching more than 8,000 subscribers.',
      '19% increase in email open rates after improvements to subject lines and structure.',
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
