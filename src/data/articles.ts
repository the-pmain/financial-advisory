import { ROUTES } from '../constants/routes';
import type { Article } from './content';

const editorial = 'Helfenstein Editorial Team';

const reviewed = '2026-09-17';

function article(
  partial: Omit<Article, 'author' | 'lastReviewed'> & { readingTimeMinutes: number },
): Article {
  return {
    author: editorial,
    lastReviewed: reviewed,
    ...partial,
  };
}

/** Canonical insight articles. Home, Insights, Expertise and topic “related” lists use these only. */
export const insightCatalog: Article[] = [
  article({
    slug: 'fee-only-financial-advisors',
    tagline: 'Client education',
    title: 'The truth about fee-only financial advisors: what clients should know',
    teaser:
      'Fee-only is marketed as the cleaner model. It often is — but AUM fees, fund costs and currency spreads can still add up. Here is how to read a fee-only quote.',
    publishedDate: '2026-09-10',
    readingTimeMinutes: 12,
    body: [
      'A fee-only adviser is paid by the client: an assets-under-management (AUM) percentage, an hourly rate, a flat retainer, or a mix. A commission-based adviser is paid by product providers when you buy a fund, policy or structured note. “Fee-based” sits in between — a client fee plus commissions — and is the model most likely to be described as independent when it is not.',
      'Fee-only is marketed as superior because the adviser’s invoice is visible and there is no sales credit for putting you into a particular product. That removes a real conflict. It does not, by itself, make advice cheap, and it does not disclose every franc that leaves the portfolio. The rest of this article is the part of the conversation that the brochure often skips.',
    ],
    sections: [
      {
        heading: 'How fee-only models actually work',
        paragraphs: [
          'The most common private-client fee is an AUM charge, typically 0.5% to 2% a year of the portfolio the firm advises or manages. The percentage often tapers as assets rise. It is simple to invoice and it aligns the firm with keeping the relationship. It also means you pay more in francs as markets rise, even if the firm did no extra work that year.',
          'Hourly consulting is cleaner for a defined task — a second opinion, a pension-or-lump-sum note, a mortgage tender. Rates for senior private-client work in Switzerland commonly sit in the mid-hundreds of francs per hour. The risk is scope: an “hour” becomes a project, and the meter keeps running.',
          'A flat retainer (quarterly or annual) covers a named set of meetings and documents. It is predictable. It is also easy to under-specify: if the retainer does not say how many written analyses, reviews and calls are included, you are buying an open relationship at a closed price.',
          'On a CHF 1 million portfolio, an AUM fee of 0.5% to 2% is CHF 5,000 to CHF 20,000 a year, every year. Over a decade, before compounding, that is CHF 50,000 to CHF 200,000. Ask for the same number in francs, not only in basis points, and ask whether cash, mortgages and assets held “for reporting only” sit inside the fee base.',
        ],
      },
      {
        heading: 'The “no commissions” advantage',
        paragraphs: [
          'When the firm earns nothing from the product, it can recommend a low-cost index fund as easily as an in-house strategy. That is the real advantage: product selection is no longer a sales process. Conflicts of interest shrink. Suitability documents become easier to read because they are not also a prospectus for something the adviser is paid to place.',
          'The offset is the ongoing bill. A commission is often paid once, at purchase. An AUM fee is paid every year you stay. Over a long holding period the fee-only invoice can exceed the commission you avoided — especially if the portfolio is large, the AUM rate is not tapered, and the underlying funds still charge their own expenses. “No commissions” is not the same sentence as “low cost”.',
        ],
      },
      {
        heading: 'What fee-only does not always tell you',
        paragraphs: [
          'Fund expense ratios sit underneath the advisory fee. A 1% to 2% ongoing charge in an active fund is not the adviser’s fee and often does not appear on the same line. It still compounds against you. Ask for a look-through cost: advisory fee plus weighted fund TER plus estimated transaction costs.',
          'Dealing spreads, stamp taxes and custody charges are set by the bank, not by the adviser. They are still your money. Performance fees on alternatives — private equity, hedge funds, some structured products — can add another layer when a manager beats a hurdle. Currency conversion for a Swiss-franc household that holds euro or dollar assets is another quiet drain; even a fraction of a percent on each FX ticket adds up.',
          'Add those lines together and a “1% fee-only” relationship can cost well over 2% all-in. In some years that is more expensive than a commission-based purchase of a cheap, buy-and-hold index portfolio. The right question is not “are you fee-only?” It is “what is the total cost of ownership, in francs, this year?”',
        ],
      },
      {
        heading: 'Questions to ask your adviser',
        paragraphs: [
          'Ask for the total fee structure in one document: AUM, hourly, retainer, minimums, VAT, and what happens if you leave mid-year. Ask whether cash and “supervised but not managed” assets are in the base.',
          'Ask for underlying fund expenses as a portfolio-weighted TER, not a range. Ask how performance is measured net of all fees, including custody and FX. Ask for the FinSA fee disclosure and the client brochure before you sign a mandate — not after the first trade.',
          'If the answers arrive as marketing slides instead of numbers, treat that as information too.',
        ],
      },
    ],
    cta: {
      label: 'Schedule a fee transparency consultation',
      to: ROUTES.appointments,
    },
  }),

  article({
    slug: 'asset-custody-explained',
    tagline: 'Client education',
    title: 'Why “we never hold your assets” might not mean what you think',
    teaser:
      'Segregated custody is a real protection. It is not a substitute for knowing the bank, the mandate powers and who can move money.',
    publishedDate: '2026-09-08',
    readingTimeMinutes: 11,
    body: [
      'Helfenstein Group’s public line is simple: we are paid only by our clients, and we never hold your assets. The marketing message is maximum security — no commingling with the firm’s balance sheet, no custodian risk at the adviser. That part is true, and it matters.',
      'It is not the end of the story. Assets still sit somewhere. Someone still has the power to instruct a sale, a transfer or a change of account. “We never hold your assets” tells you who does not have custody. It does not, by itself, tell you who does — or what they are allowed to do.',
    ],
    sections: [
      {
        heading: 'Where are your assets actually held?',
        paragraphs: [
          'In a standard private-client setup the securities and cash sit at a third-party bank or broker, in an account in your name. In Switzerland that is often a private bank or a custody desk at a universal bank. The adviser has a mandate to view, and sometimes to trade, but the legal owner of the account is you.',
          'That is different from an adviser who is also the custodian, or who pools client money in an omnibus account. Advisory and custody are two jobs. Combining them concentrates risk. Separating them is the model we use: you choose the bank; we provide advice or discretionary management on top of it.',
          '“In your name” still needs a document. Ask for the account number, the exact legal name on the statement, and a sample bank statement that you can request directly from the bank — not only a PDF the adviser forwards.',
        ],
      },
      {
        heading: 'The hidden control points',
        paragraphs: [
          'A discretionary mandate lets the manager trade without calling you for each ticket. That is the point of the mandate. It is also a control you should size deliberately: permitted instruments, excluded markets, maximum cash, no leverage unless you asked for it.',
          'Some arrangements allow transfers between your own accounts at the same bank. Others allow wires to third parties up to a limit, or “signature card” authority that lets an individual approve payments. Those powers are not implied by “we do not hold assets”. They live in the bank forms and the power of attorney.',
          'Read the instruction letter. If it allows withdrawals to an account that is not yours, or if the same person can both trade and change payment details, you have a concentration of duty that custody segregation does not fix.',
        ],
      },
      {
        heading: 'Red flags in custody arrangements',
        paragraphs: [
          'No written custody agreement, or a verbal “the bank will send you something later”, is a reason to pause. So is a vague custodian — “a leading Swiss bank” without a legal name, city and BIC.',
          'Assets booked in an unfamiliar offshore vehicle — a Cayman or Luxembourg structure you did not ask for — need a separate explanation: who is the depository, who is the auditor, and why the holding cannot sit in your own account. A single point of contact for every transaction, with no bank login of your own, is another warning. You should be able to see the same positions the adviser sees, from the bank.',
        ],
      },
      {
        heading: 'Due diligence checklist',
        paragraphs: [
          'Write down the custodian’s legal name and address. Verify the account statements by logging in or calling the bank on a number you looked up yourself. Confirm that wire instructions print the bank’s name, not a personal account.',
          'If the custodian is a Swiss bank or securities firm, check the FINMA register. If it is a foreign bank, check the home regulator. Keep a copy of the mandate and the bank’s power-of-attorney form in your own files.',
        ],
      },
    ],
    cta: {
      label: 'Request a custody verification conversation',
      to: ROUTES.banking,
    },
  }),

  article({
    slug: 'alternatives-risk-analysis',
    tagline: 'Investment deep dives',
    title: 'Private equity and hedge funds: high returns or high risk?',
    teaser:
      'Alternatives are sold as sophisticated diversification. The J-curve, “2 and 20” and redemption gates are the parts to understand before you subscribe.',
    publishedDate: '2026-09-06',
    readingTimeMinutes: 13,
    body: [
      'Private equity, hedge funds, real assets and other alternatives are presented as tools for sophisticated portfolios: returns that do not move with listed markets, a hedge against inflation, access that ordinary funds cannot offer. Some of that can be true. Complexity is also a place where fees, valuation and liquidity hide.',
      'A written core of listed, low-cost assets should exist first. Alternatives are a satellite. If you cannot explain the holding, the lock-up and the all-in cost, it does not belong in the book yet. This article is a due-diligence note, not a recommendation to buy or avoid any product.',
    ],
    sections: [
      {
        heading: 'The private equity illusion',
        paragraphs: [
          'Private equity funds typically show a J-curve: fees and deal costs hit early, while realisations come later. The first years can look like losses even if the eventual outcome is acceptable. Marketing decks start the story at the exit, not at the capital call.',
          'Internal rate of return (IRR) is the industry’s favourite number. It is not the same as the cash you can spend. A promised 15% IRR can translate into a much lower annualised cash return once you account for delayed distributions, recycled capital and the years your money sat in uncalled commitments.',
          'Valuations are often mark-to-model, not mark-to-market. Smoothing makes the path look calmer than listed equity. That calm is not the same as safety. Ask for the actual cash-on-cash history, net of fees, for the specific vintage — not a blended track record across funds you cannot buy.',
        ],
      },
      {
        heading: 'Hedge fund fee structures explained',
        paragraphs: [
          'The classic “2 and 20” is a 2% annual management fee plus 20% of gains above a hurdle. On a year when the fund is flat, you still pay the 2%. On a year when it is up, you pay both. High-water marks are meant to stop the manager earning performance fees twice on the same recovery. Ask whether the mark resets, and on what schedule.',
          'Lock-ups and redemption gates limit when you can leave. That is how the manager funds illiquid positions. It is also how you can be stuck after a bad year. After fees, many hedge-fund programmes have a hard time beating a cheap equity-and-bond mix over a full cycle. Some do. The burden of proof is on the audited numbers, not the pitch.',
        ],
      },
      {
        heading: 'Liquidity mismatch risk',
        paragraphs: [
          'A fund that offers quarterly redemptions while holding assets it values once a year has a mismatch. In stress, gates close, side pockets isolate the unsellable names, and the liquid remaining investors fund the exit of others — or cannot exit at all.',
          'The 2008 episode is the case study still worth teaching: redemption queues, suspended NAVs, and clients who discovered that “monthly liquidity” was a brochure term. If your own spending plan needs that capital on a known date, an alternative with a gate is the wrong sleeve.',
        ],
      },
      {
        heading: 'Questions every client should ask',
        paragraphs: [
          'What is the actual historical net return for this vehicle, in francs, after every fee? May I see audited statements, not marketing slides? Who is the independent auditor, and how often do they sign? What happens to my holding if the manager fails, is acquired, or loses key people?',
          'If those answers are slow, partial or replaced by a story about access and exclusivity, you already have a useful signal.',
        ],
      },
    ],
    cta: {
      label: 'Talk through alternative-investment due diligence',
      to: ROUTES.alternativeInvestments,
    },
  }),

  article({
    slug: 'finma-regulation-guide',
    tagline: 'Regulatory compliance',
    title: 'The FINMA connection: what your Swiss financial advisor should disclose',
    teaser:
      'A LEI is not a licence. Here is how to read FINMA authorisation, what deposit protection covers — and what it does not.',
    publishedDate: '2026-09-04',
    readingTimeMinutes: 11,
    image: '/images/pension-fund-returns.png',
    imageAlt: 'Illustrative figures used to read costs and outcomes, not a forecast',
    body: [
      'FINMA is Switzerland’s financial-market supervisor. Firms that manage portfolios or provide certain financial services must be authorised and, for portfolio managers, supervised day to day by a recognised supervisory organisation. Websites often say “Swiss regulatory compliance”. The useful question is: which licence, which number, and can you open the register yourself?',
      'Proof is not a logo. Proof is an entry you can find on finma.ch, with a matching legal name, UID and — for a portfolio manager — an authorisation number and a supervisory organisation.',
    ],
    sections: [
      {
        heading: 'Types of FINMA authorisation',
        paragraphs: [
          'A bank licence is rare and comes with capital, liquidity and deposit-protection rules. An asset-manager or portfolio-manager authorisation is the relevant status for most independent advisers who run discretionary mandates. Collective-scheme managers and securities firms sit in other boxes. “Fiduciary” in everyday speech is not a FINMA category; discretionary versus advisory authority is a mandate question, not a substitute for a licence.',
          'Helfenstein Asset Management AG is listed by FINMA as an authorised portfolio manager (No. CH-111.708.730, decision 12.01.2022) and supervised by OSFINcontrol AG (OSFIN-111.708.730). Those numbers are meant to be checked, not believed on sight.',
        ],
      },
      {
        heading: 'The licence-number game',
        paragraphs: [
          'A Legal Entity Identifier (LEI) is a global ID used in reporting. It is not a regulatory licence. Many firms display a LEI because it looks official. It does not tell you that FINMA has authorised the firm to manage your portfolio.',
          '“Registered with FINMA” without a number is a phrase to slow down for. Look the legal name up on the official register. Match the address. If the site uses a trading name, confirm it maps to the authorised entity. If you cannot find the row, ask for the authorisation letter before you transfer assets or sign a mandate.',
        ],
      },
      {
        heading: 'What happens if things go wrong?',
        paragraphs: [
          'Swiss deposit protection (esisuisse) covers eligible bank deposits, generally up to CHF 100,000 per client per bank. It does not cover securities the same way, and it does not cover an adviser’s professional errors. Portfolio-manager clients are not in a bank compensation scheme for bad advice.',
          'Conduct complaints that cannot be resolved with the firm can go to the ombudsman — for Helfenstein, Finanzombudsstelle Schweiz (FINOS). That is mediation, not a guarantee of restitution. Cross-border enforcement, if the other party is abroad, is slower and less certain than a domestic court file.',
        ],
      },
      {
        heading: 'Verification checklist',
        paragraphs: [
          'Ask for the licence or authorisation number in writing. Open the FINMA register. Confirm the registered address is a real office, not only a mail drop. Confirm the scope: advisory, discretionary management, or both — and that it matches what you are being offered.',
          'Keep a screenshot of the register entry with the date you checked it.',
        ],
      },
    ],
    cta: {
      label: 'Schedule a regulatory compliance review',
      to: ROUTES.appointments,
    },
  }),

  article({
    slug: 'single-contact-risk',
    tagline: 'Operational due diligence',
    title: 'The single-point-of-contact risk in wealth management',
    teaser:
      'A named adviser feels personal. It becomes a problem if one person is also the only trader, the only reporter and the only succession plan.',
    publishedDate: '2026-09-02',
    readingTimeMinutes: 10,
    body: [
      'Private-client firms often lead with one face. The message is personal service: you know who to call. The hidden risk is key-person dependency. If that person is ill, leaves, or is the only one who understands your file, the relationship is more fragile than the brochure suggests.',
      'Helfenstein publishes a team, not a single employee. Still, every client should ask how work is split — advice, dealing, reporting, operations — and what happens if their principal contact is away. Personalized service should not mean a single point of failure.',
    ],
    sections: [
      {
        heading: 'Why firms hide their team size',
        paragraphs: [
          'A very small team has lower overhead and can look intimate. It can also mean one person reviews their own work. If the client relationship lives entirely with an individual, the firm has little franchise value and you have little continuity.',
          'Succession is the question owners postpone. Ask whether there is a written deputy, a shared CRM, and a documented investment process that another authorised person can run. If the answer is “we will introduce someone if needed”, you are buying a person, not a practice.',
        ],
      },
      {
        heading: 'Separation of duties',
        paragraphs: [
          'Fraud risk rises when the same individual can advise, place trades, change payment instructions and produce the only report you see. That is a control failure, whether the firm has two people or twenty.',
          'Ask who handles dealing, who prepares reports, and who can authorise a transfer. Ask to meet more than one professional before you commit capital. LinkedIn and the commercial register are reasonable places to confirm that the people you met exist as described.',
        ],
      },
      {
        heading: 'Questions about the team',
        paragraphs: [
          'How many advisers work on private-client files? Who covers trades, reporting and client service when your contact is on leave? What happens if that person leaves the firm? Can you meet the specialists who will actually do the tax, pension or investment work?',
          'A firm that is proud of its bench will introduce it. A firm that is not will change the subject.',
        ],
      },
      {
        heading: 'Red flags in team structure',
        paragraphs: [
          'No team page, a single photograph, or a headcount that does not match the register are reasons to ask more. So is an office that is only a co-working address with no named room and no reception that has heard of the firm.',
          'None of these is proof of misconduct. Together they mean you should slow the onboarding until the operating model is written down.',
        ],
      },
    ],
    cta: {
      label: 'Meet the team',
      to: ROUTES.aboutTeam,
    },
  }),

  article({
    slug: 'financial-portal-analysis',
    tagline: 'Technology and security',
    title: 'The financial portal: gateway or trap?',
    teaser:
      'A client dashboard is useful when it is a window onto your bank. It is a risk when it can change money movement or harvest a login.',
    publishedDate: '2026-08-28',
    readingTimeMinutes: 11,
    body: [
      'Helfenstein’s financial portal is offered as a consolidated view of accounts, documents and markets. Convenience is the pitch. The security question is whether the portal is a window or a place where money can be moved.',
      'On our model the portal does not receive or send funds. Access is issued after we know you — never through an unsolicited login link. That is the standard you should demand of any adviser dashboard, including ours.',
    ],
    sections: [
      {
        heading: 'What a good financial portal should have',
        paragraphs: [
          'Multi-factor authentication on every login. A feed from the custodian, not a spreadsheet someone typed. Valuations you can reconcile to the bank. Encrypted document storage. An audit trail of who viewed or downloaded what.',
          'If those are missing, you have a brochure site with a password, not a control environment.',
        ],
      },
      {
        heading: 'Red flags in portal design',
        paragraphs: [
          'A login on a domain that is not the firm’s usual site, a missing padlock, or a certificate that does not match the legal name are stop signs. So is a screen that lets you edit wire instructions without a second factor and a callback.',
          'Downloadable statements in an editable format, with no bank letterhead, are not evidence. Custom software is not automatically worse than a white-label platform — but someone should have audited it, and you should be allowed to ask for the summary.',
        ],
      },
      {
        heading: 'The credential-harvesting risk',
        paragraphs: [
          'Phishing works by imitating a portal you already trust. The email says your dashboard needs an update; the link is almost right. Session theft follows weak passwords and missing MFA. Wealth-management breaches in recent years have used exactly that pattern.',
          'Helfenstein will not ask you to send a password, disable two-factor authentication, or install remote-control software. If a message asks for that, it is not from the portal team. Open the site by typing the address you already use, or call a number you looked up yourself.',
        ],
      },
      {
        heading: 'Portal security checklist',
        paragraphs: [
          'Click the padlock and read the certificate. Turn on two-factor authentication before you store documents. Ask whether login history is visible. Prefer IP restrictions if you always sign in from the same country. Request a plain-language note on who hosts the data and where.',
        ],
      },
    ],
    cta: {
      label: 'Schedule a portal security review',
      to: ROUTES.appointments,
    },
  }),

  article({
    slug: 'appointment-data-collection',
    tagline: 'Client onboarding',
    title: 'Appointment systems: what your advisor collects before verifying you',
    teaser:
      'Booking forms ask for more than a time slot. Know what you are handing over, and when KYC should start.',
    publishedDate: '2026-08-22',
    readingTimeMinutes: 10,
    body: [
      'An online diary is convenient. It is also a data-collection point. Names, contact details, a sense of wealth and a short brief often go into a form before anyone has checked who you are — or who they are.',
      'That sequence is normal for a first meeting. It should stay light until the firm is prepared to run proper identification. Your data has value. Treat the booking step as the start of a relationship, not as a free-text box for your entire balance sheet.',
    ],
    sections: [
      {
        heading: 'Typical data collected in an initial appointment',
        paragraphs: [
          'Expect name, contact details, a preferred language and a short note on the topic. Some forms also ask for a wealth band, residency and whether you already have an adviser. Date of birth and full address belong to identification, not to a calendar invite.',
          'Source-of-wealth questions are required later under anti-money-laundering rules. They are not required to book a free first meeting.',
        ],
      },
      {
        heading: 'The verification gap',
        paragraphs: [
          'If a form asks for passport copies, account statements or tax returns before you have met anyone or seen a fee schedule, you are ahead of KYC and behind common sense. Identity theft does not need a full file — a name, a phone number and a wealth hint are already useful to a social engineer.',
          'A serious firm will explain what it stores, for how long, and under which privacy notice. It will not demand your entire life administration to reserve an hour.',
        ],
      },
      {
        heading: 'Questions hidden in appointment forms',
        paragraphs: [
          '“Annual income” can be planning, or it can be a sales qualifier. “Property abroad” can be estate work, or an upsell. “Considering inheritance” can open a useful conversation, or a product conversation. “Current adviser” can be continuity, or a poaching list.',
          'Answer what you are comfortable answering. The first meeting is to see whether the people in the room are worth a second.',
        ],
      },
      {
        heading: 'A sensible client sequence',
        paragraphs: [
          'Read the privacy notice before you submit. Ask what is stored and who sees it. After the meeting, verify FINMA authorisation yourself. Do not send bank documents until the fee structure is in writing and you have decided to proceed.',
        ],
      },
    ],
    cta: {
      label: 'Read how we book a first meeting',
      to: ROUTES.appointments,
    },
  }),

  article({
    slug: 'performance-fee-analysis',
    tagline: 'Fee structures',
    title: 'The performance fee trap: when “success” costs you more',
    teaser:
      '“We only win when you win” sounds fair. Hurdles, catch-up and a second AUM line can still make success expensive.',
    publishedDate: '2026-08-18',
    readingTimeMinutes: 11,
    body: [
      'Performance fees are sold as alignment: the manager earns more when you do. On alternatives, hedge funds and some private-equity vehicles they are standard. They can also be the most expensive line in the book once you add the management fee underneath.',
      'This is not an argument that performance fees are always wrong. It is an argument that you should be able to calculate them on a napkin before you sign.',
    ],
    sections: [
      {
        heading: 'How performance fees actually work',
        paragraphs: [
          'A hurdle (for example 8%) means the performance fee starts only after that return. A high-water mark means the manager should not earn a performance fee again until the previous peak is recovered. A catch-up clause can give the manager 100% of the gains above the hurdle until their share is “caught up” — which can consume a surprising slice of a good year.',
          'On CHF 1 million, a 2% management fee is CHF 20,000. A 20% performance fee on a 12% year after an 8% hurdle is another CHF 8,000 in a simple case — more if catch-up applies. Ask for a worked example on your own numbers, with and without a down year afterwards.',
        ],
      },
      {
        heading: 'The double-dip problem',
        paragraphs: [
          'AUM plus performance plus underlying fund TER plus spreads can land in a 3% to 5% total-cost band in an active alternative sleeve. That is a high hurdle for the manager to beat a cheap listed portfolio. If the same firm also charges a household AUM fee on the same assets, ask whether the alternative’s performance fee is extra or included.',
        ],
      },
      {
        heading: 'When performance fees backfire',
        paragraphs: [
          'A fee on upside, with little sharing of downside, invites more risk than you asked for. A flat market with a lot of trading can still generate costs even when the performance fee is zero. A lock-up after a poor year is how you pay for a decision you can no longer reverse.',
        ],
      },
      {
        heading: 'Negotiating clearer terms',
        paragraphs: [
          'Cap the performance share. Require a high-water mark that does not reset quietly. Set a floor: no performance fee in a year the portfolio is down. Compare the whole package with a flat AUM fee on a listed implementation. If the manager will not put the comparison on one page, you have your answer.',
        ],
      },
    ],
    cta: {
      label: 'Request a fee comparison conversation',
      to: ROUTES.appointments,
    },
  }),

  article({
    slug: 'testimonial-verification',
    tagline: 'Social proof',
    title: 'The testimonial game: are those client photos really your peers?',
    teaser:
      'Social proof should be checkable. Here is how to read testimonials, case studies and “trusted by families” claims.',
    publishedDate: '2026-08-12',
    readingTimeMinutes: 9,
    body: [
      'Advisory sites use testimonials because trust is the product. A photograph and a first name are easy to publish. They are also easy to fake. Clients should be able to test social proof the same way they test a licence number: with a method, not a feeling.',
      'Helfenstein publishes anonymised case studies and named specialists. We do not ask you to believe a stock face. If another firm’s site is built entirely of glowing, untraceable quotes, treat that as décor.',
    ],
    sections: [
      {
        heading: 'How to verify a testimonial',
        paragraphs: [
          'Reverse-image search the photograph. If it appears on a stock library or on three other advisers’ sites, it is not a client. Ask for a full first name, a relationship length, and whether you may speak to a reference under a confidentiality arrangement.',
          'A short video call with a reference client, organised by the firm, is more useful than a paragraph with a sunset.',
        ],
      },
      {
        heading: 'Red flags in fake social proof',
        paragraphs: [
          'Stock photography, “Client A” / “Family B”, no city, no date, and quotes that could sit on any firm in any country. Testimonials that pre-date the company’s register entry are another simple check.',
        ],
      },
      {
        heading: 'The professional-network gap',
        paragraphs: [
          'If the adviser claims a long relationship and the public profile of that person shows a different country, employer and timeline, ask. Multiple testimonials from one “family” under different surnames deserve a raised eyebrow. None of this replaces a written mandate review — it only tells you whether the shop window was dressed.',
        ],
      },
      {
        heading: 'Questions worth asking',
        paragraphs: [
          'May I speak to a reference client? What is the average relationship length? Do you have written consent to publish this quote? Can I see anonymised case numbers that match the story?',
          'A firm that does real work can describe a case without a photograph.',
        ],
      },
    ],
    cta: {
      label: 'Read anonymised client stories',
      to: ROUTES.aboutClientStories,
    },
  }),

  article({
    slug: 'swiss-advantage-truth',
    tagline: 'Geographic positioning',
    title: 'The Swiss advantage: real vs perceived benefits',
    teaser:
      'Swiss banking secrecy is largely gone. What remains is supervision, a currency and a habit of paperwork — if the firm is actually authorised.',
    publishedDate: '2026-08-06',
    readingTimeMinutes: 10,
    body: [
      '“Swiss-based” still sells. Privacy, stability and expertise are the words that follow. Some of that history is real. Some of it is a postcode on a slide. Clients should know which Swiss advantages still exist, and which ones were retired by automatic exchange of information and a tighter FINMA perimeter.',
      'A Lucerne office and a CHE number are facts. They are not, on their own, a reason to pay more or to skip due diligence.',
    ],
    sections: [
      {
        heading: 'The historical advantages — and what remains',
        paragraphs: [
          'Banking secrecy as the public imagined it is largely over for foreign tax authorities. Political neutrality and a long record of institutional continuity still matter to some families. The Swiss franc remains a funding and reporting currency people choose on purpose. FINMA and the supervisory organisations are a real framework — when the firm is inside it.',
        ],
      },
      {
        heading: 'What “Swiss-based” means today',
        paragraphs: [
          'An office in Zürich or Lucerne is not a licence. Virtual offices exist. Foreign managers have used a Swiss letterhead for credibility. A LEI issued in Switzerland does not mean FINMA authorised the activity you are buying.',
          'Ask for the legal entity, the UID, the FINMA row and a door you can visit. If the team you will work with sits in another country, that is fine — if it is disclosed, and if the contracting entity is the authorised one.',
        ],
      },
      {
        heading: 'The fee-premium question',
        paragraphs: [
          'Swiss private-client fees are often higher than the same work booked from a cheaper centre. Sometimes the premium buys documentation, supervision and a franc-based operating model. Sometimes it buys the word “Swiss”. Compare the all-in cost, including your own travel and the time zone you actually live in, with an authorised alternative you can also verify.',
        ],
      },
      {
        heading: 'Due diligence for a “Swiss” adviser',
        paragraphs: [
          'Check the UID on the official register. Check FINMA for licence type and scope. Confirm a physical address, not a P.O. box. Ask who you will speak to, in which language, and which entity signs the mandate.',
          'Swiss does not automatically mean better. Verified and written down does.',
        ],
      },
    ],
    cta: {
      label: 'Schedule a verification session',
      to: ROUTES.appointments,
    },
  }),
];

export const newsFeatured = insightCatalog[0];
export const newsSlim = [insightCatalog[1], insightCatalog[2]];
export const newsSecondary = insightCatalog[3];
export const marketArticles = [insightCatalog[2], insightCatalog[7], insightCatalog[0]];
export const insightArticles = insightCatalog.slice(4);

export const ARTICLE_SLUGS = insightCatalog.map((item) => item.slug);

export const OLD_ARTICLE_REDIRECTS: Record<string, string> = {
  'compulsory-insurance-switzerland': 'fee-only-financial-advisors',
  'save-on-taxes-with-pillar-3a': 'fee-only-financial-advisors',
  'tips-for-foreigners-buying-real-estate': 'swiss-advantage-truth',
  'is-it-worth-paying-more-into-your-pension-fund': 'performance-fee-analysis',
  'financial-investments-what-you-need-know': 'alternatives-risk-analysis',
  'all-you-need-to-know-about-etfs': 'alternatives-risk-analysis',
  'current-mortgage-interest-rates-comparison': 'swiss-advantage-truth',
  'horizon-report-2026': 'finma-regulation-guide',
  'how-to-spot-financial-scams-switzerland': 'financial-portal-analysis',
  'finsa-what-clients-should-know': 'finma-regulation-guide',
  'early-retirement-cost-check': 'fee-only-financial-advisors',
  'cantonal-tax-relocation-checklist': 'swiss-advantage-truth',
};
