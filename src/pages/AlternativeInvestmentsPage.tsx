import { useEffect, useState, type ReactNode } from 'react';
import { ROUTES } from '../constants/routes';
import { company } from '../data/company';
import { findArticle } from '../data/content';
import { topicByPath } from '../data/topics';
import {
  assetThemes,
  atkinsVideo,
  educationNav,
  educationSections,
  educationSources,
  finkVideo,
  nearestNavId,
  offeringCompare,
  ownershipFlow,
} from '../data/alternativeEducation';
import { AppointmentButton } from '../components/appointments/AppointmentModal';
import { useT } from '../i18n';
import { SectionTitle } from '../components/ui/primitives';
import { AdviceDisclaimer } from '../components/widgets/AdviceDisclaimer';
import { ArticleSlim } from '../components/widgets/ArticleTeaser';
import { ClickToLoadVideo } from '../components/widgets/ClickToLoadVideo';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { SpecialistsBand } from '../components/widgets/SpecialistsBand';

const sectionClass = 'scroll-mt-[140px]';
const prose = 'text-vz-ink max-w-[940px] text-[19px] leading-[1.55] max-mob:text-[18px]';
const note = 'text-vz-gray max-w-[940px] text-[15px] leading-[1.65]';

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-vz-blue-link decoration-vz-rule underline decoration-1 underline-offset-4 hover:text-vz-orange"
    >
      {children}
      <span className="visually-hidden"> (external link, opens in a new window)</span>
    </a>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-vz-orange m-0 mb-3 text-[13px] leading-[1.5] font-semibold tracking-[0.095em] uppercase">
      {children}
    </p>
  );
}

function useReadingSection() {
  const [activeId, setActiveId] = useState(educationSections[0]?.id ?? 'education');

  useEffect(() => {
    const mark = () => {
      const line = 160;
      let current = educationSections[0]?.id ?? 'education';
      for (const section of educationSections) {
        const node = document.getElementById(section.id);
        if (node && node.getBoundingClientRect().top <= line) current = section.id;
      }
      setActiveId(current);
    };

    mark();
    window.addEventListener('scroll', mark, { passive: true });
    window.addEventListener('resize', mark);
    return () => {
      window.removeEventListener('scroll', mark);
      window.removeEventListener('resize', mark);
    };
  }, []);

  return nearestNavId(activeId);
}

/**
 * Alternative investments as a client-education article: cryptocurrency,
 * tokenization, STOs, finance-leader sources, real-asset themes and risks.
 * The site header and footer stay in place; this is the article only.
 */
export function AlternativeInvestmentsPage() {
  const t = useT();
  const currentNav = useReadingSection();
  const topic = topicByPath.get(ROUTES.alternativeInvestments);
  const related = (topic?.relatedSlugs ?? [])
    .map((slug) => findArticle(slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));

  return (
    <article aria-labelledby="education-title">
      <nav aria-label="Educational topics" className="border-vz-rule -mt-1 mb-8 border-b pb-4">
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          {educationNav.map((item) => {
            const current = item.id === currentNav;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current ? 'true' : undefined}
                  className={`text-[18px] leading-[1.45] underline-offset-4 hover:underline hover:decoration-1 max-mob:text-[16px] ${
                    current ? 'text-vz-ink font-semibold underline decoration-1' : 'text-vz-ink font-normal no-underline'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <header id="education" className={`${sectionClass} grid grid-cols-[minmax(0,1.25fr)_minmax(280px,1fr)] items-center gap-10 max-tab:grid-cols-1`}>
        <div>
          <Kicker>Understanding digital ownership</Kicker>
          <h1 id="education-title" className="mb-4">
            The Next Evolution of Investing
          </h1>
          <p className="text-vz-ink m-0 text-[34px] leading-[1.25] font-light max-lap:text-[28px] max-mob:text-[24px]">
            From physical assets to digital ownership.
          </p>
          <p className={`${prose} mt-8`}>
            For generations, investors have owned shares in businesses, financed infrastructure and invested in
            property. Blockchain technology is changing how these interests can be recorded and administered.
            Understanding that change begins with separating the technology from the investment itself.
          </p>
          <a
            href="#perspectives"
            className="border-vz-blue text-vz-ink hover:bg-vz-blue mt-2 inline-flex max-w-full items-center justify-center rounded-full border px-[18px] py-[10px] text-[15px] leading-[1.45] font-semibold no-underline hover:text-white"
          >
            Hear from Larry Fink, Jenny Johnson & Paul Atkins ↓
          </a>
        </div>
        <figure className="border-vz-orange-btn m-0 min-w-0 border-b-2">
          <img
            src="/images/alternative-investments/lead-wind.webp"
            width={1122}
            height={1402}
            alt="Illustrative offshore wind turbines at sunset, representing investment in physical energy infrastructure."
            fetchPriority="high"
            className="h-[290px] w-full object-cover object-[center_58%] max-tab:h-[240px]"
          />
          <figcaption className="text-vz-ink py-3 text-[15px] leading-[1.5]">
            Real assets. A new way to record investment rights.
            <span className="text-vz-gray mt-1 block text-[13px]">
              AI-generated illustration · not an offered project
            </span>
          </figcaption>
        </figure>
      </header>

      <section id="crypto" aria-labelledby="crypto-title" className={`${sectionClass} mt-12 max-lap:mt-10`}>
        <SectionTitle id="crypto-title">From cryptocurrency to smart contracts</SectionTitle>
        <p className={prose}>
          <strong>Cryptocurrency</strong> is a digital asset secured using cryptography. Bitcoin demonstrated how a
          network could maintain a shared transaction record without a single central operator. Bitcoin itself is not
          ownership of a business or a physical asset, and its price can fluctuate sharply.
        </p>
        <p className={prose}>
          A <strong>blockchain</strong> is the shared ledger behind such a network. Platforms including Ethereum added{' '}
          <strong>smart contracts</strong>: software that carries out predefined instructions when called and its
          conditions are met. This can support transfers and payment administration. Code still depends on reliable
          information, sound design and enforceable legal arrangements.
        </p>
      </section>

      <section id="tokenization" aria-labelledby="tokenization-title" className={`${sectionClass} mt-12 max-lap:mt-10`}>
        <SectionTitle id="tokenization-title">What does tokenization mean?</SectionTitle>
        <p className={prose}>
          <strong>Tokenization</strong> represents an asset or defined financial rights as a digital token recorded on a
          ledger. A token may represent shares, debt or a fund interest. The legal documents determine what the investor
          owns and can claim.
        </p>
        <figure className="border-vz-rule my-7 border-y py-6">
          <figcaption className="text-vz-gray mb-5 text-[15px] font-semibold">An illustrative solar project</figcaption>
          <ol className="m-0 grid list-none grid-cols-3 gap-7 p-0 max-tab:grid-cols-1 max-tab:gap-6">
            {ownershipFlow.map((item, index) => (
              <li
                key={item.step}
                className={`relative max-tab:border-l-4 max-tab:border-[#e5e8eb] max-tab:pl-4 ${
                  index > 0 ? 'border-l-4 border-[#e5e8eb] pl-5' : ''
                }`}
              >
                <span
                  aria-hidden
                  className="text-vz-orange border-vz-orange-btn mb-[18px] grid size-12 place-items-center rounded-full border text-[16px] font-semibold"
                >
                  {item.step}
                </span>
                <strong className="text-vz-ink block text-[20px] leading-[1.3]">{item.title}</strong>
                <span className="text-vz-ink mt-2 block text-[17px] leading-[1.6]">{item.text}</span>
              </li>
            ))}
          </ol>
        </figure>
        <p className={note}>
          “Real-world assets” (RWA) is a broad term covering financial claims and assets brought onto these systems. A
          token does not automatically give direct ownership of a building, power plant or commodity.
        </p>
      </section>

      <section id="stos" aria-labelledby="stos-title" className={`${sectionClass} mt-12 max-lap:mt-10`}>
        <SectionTitle id="stos-title">An STO: familiar investment rights, a digital format</SectionTitle>
        <p className={prose}>
          A <strong>Security Token Offering (STO)</strong> is an offering of securities represented by tokens. It may
          involve equity, debt or other investment rights and can be structured as a private offering. Applicable
          securities laws still matter; “STO” does not mean regulatory approval or a public listing.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-7 max-tab:grid-cols-1">
          {offeringCompare.map((item) => (
            <div key={item.kicker} className="border-l-4 border-[#e5e8eb] pl-[18px]">
              <Kicker>{item.kicker}</Kicker>
              <p className="text-vz-ink m-0 text-[18px] leading-[1.55]">{item.text}</p>
            </div>
          ))}
        </div>
        <figure className="border-vz-orange-btn mt-7 max-w-[940px] border-l-[3px] py-1 pl-6">
          <blockquote className="text-vz-ink m-0 font-sans text-[24px] leading-[1.5] font-normal tracking-normal max-mob:text-[20px]">
            “Tokenized securities are still securities.”
          </blockquote>
          <figcaption className={`${note} mt-3`}>
            <ExternalLink href="https://www.sec.gov/newsroom/speeches-statements/peirce-statement-tokenized-securities-070925">
              Hester M. Peirce, U.S. SEC Commissioner, 9 July 2025
            </ExternalLink>
            <span className="mt-1 block">A U.S. regulatory perspective, not an endorsement of any investment.</span>
          </figcaption>
        </figure>
      </section>

      <section id="institutions" aria-labelledby="institutions-title" className={`${sectionClass} mt-12 max-lap:mt-10`}>
        <SectionTitle id="institutions-title">Why institutions are exploring it</SectionTitle>
        <p className={prose}>
          Banks and market infrastructure providers are examining shared records, coordinated asset and payment
          settlement, and programmable administration. Some structures can also divide investments into smaller units.
          The{' '}
          <ExternalLink href="https://www.bis.org/publications/aer-2025/next-generation-monetary-financial-system">
            Bank for International Settlements
          </ExternalLink>{' '}
          has explored these potential efficiencies.
        </p>
        <p className={prose}>
          These developments could change how securities are issued and transferred. They do not ensure better returns
          or an active market. A blockchain operating around the clock does not mean an investor can sell at any time.
        </p>
      </section>

      <section id="perspectives" aria-labelledby="perspectives-title" className={`${sectionClass} mt-12 max-lap:mt-10`}>
        <Kicker>Perspectives from finance leaders</Kicker>
        <SectionTitle id="perspectives-title">Hear from the people shaping the conversation</SectionTitle>
        <p className={note}>
          These public discussions address tokenization, securities and market infrastructure. They provide context for
          understanding STOs; they do not endorse {company.groupName} or any private project.
        </p>
        <div className="mt-7 grid grid-cols-2 items-center gap-8 max-tab:grid-cols-1">
          <ClickToLoadVideo
            videoId={finkVideo.id}
            title={finkVideo.title}
            label={finkVideo.label}
            hostedMeta={finkVideo.hostedMeta}
            hostedNote={finkVideo.hostedNote}
            linkMeta={finkVideo.linkMeta}
            linkNote={finkVideo.linkNote}
            youtube={finkVideo.youtube}
          />
          <div>
            <h3 className="text-vz-ink mb-1 text-[22px]">Larry Fink</h3>
            <p className="text-vz-orange m-0 mb-4 text-[15px] leading-[1.55]">BlackRock Chairman & CEO</p>
            <blockquote className="text-vz-ink m-0 mb-4 max-w-[540px] font-sans text-[24px] leading-[1.45] font-medium tracking-normal max-mob:text-[20px]">
              “we’re just at the beginning of the tokenization of all assets”
            </blockquote>
            <p className="text-vz-ink text-[17px] leading-[1.6]">
              In this CNBC interview, Fink discusses real estate, equities and bonds as part of the wider move towards
              tokenization.
            </p>
            <p className="text-[16px] leading-[1.6]">
              <ExternalLink href={finkVideo.transcript}>Read BlackRock’s interview transcript ↗</ExternalLink>
              {' · '}
              <ExternalLink href={finkVideo.youtube}>Watch on YouTube ↗</ExternalLink>
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-8 max-tab:grid-cols-1">
          <div className="border-l-4 border-[#e5e8eb] pl-5">
            <Kicker>Asset management in practice</Kicker>
            <h3 className="text-vz-ink mb-1 text-[22px]">Jenny Johnson</h3>
            <p className="text-vz-orange m-0 mb-4 text-[15px] leading-[1.55]">Franklin Templeton CEO</p>
            <p className="text-vz-ink text-[17px] leading-[1.6]">
              Explains how blockchain-based shareholder records support tokenized funds, drawing on Franklin
              Templeton’s experience.
            </p>
            <p className="text-vz-ink text-[17px] leading-[1.6]">
              Her discussion forms part of the Federal Reserve’s <em>Tokenized Products</em> panel, alongside
              representatives of BlackRock, DRW and JPMorgan.
            </p>
            <p className={note}>Federal Reserve · 21 October 2025</p>
            <p className="text-[16px] leading-[1.7]">
              <ExternalLink href="https://www.federalreserve.gov/conferences/payments-innovation-conference.htm">
                Watch the official conference recordings ↗
              </ExternalLink>
            </p>
            <p className="text-[16px] leading-[1.7]">
              <ExternalLink href="https://www.federalreserve.gov/mediacenter/files/payments-conference-panel-4-transcript.pdf">
                Read the panel transcript (PDF) ↗
              </ExternalLink>
            </p>
          </div>
          <div className="border-l-4 border-[#e5e8eb] pl-5">
            <Kicker>A regulatory perspective</Kicker>
            <h3 className="text-vz-ink mb-1 text-[22px]">Paul Atkins</h3>
            <p className="text-vz-orange m-0 mb-4 text-[15px] leading-[1.55]">
              U.S. SEC Chairman at the time of the talk
            </p>
            <p className="text-vz-ink text-[17px] leading-[1.6]">
              Discusses public and private markets, innovation and regulation. His published Project Crypto speech
              addresses tokenized securities.
            </p>
            <ClickToLoadVideo
              videoId={atkinsVideo.id}
              title={atkinsVideo.title}
              label={atkinsVideo.label}
              hostedMeta={atkinsVideo.hostedMeta}
              hostedNote={atkinsVideo.hostedNote}
              linkMeta={atkinsVideo.linkMeta}
              linkNote={atkinsVideo.linkNote}
              youtube={atkinsVideo.youtube}
              compact
            />
            <p className={`${note} mt-4`}>
              <ExternalLink href={atkinsVideo.youtube}>Watch on YouTube ↗</ExternalLink>
              {' · '}
              <ExternalLink href={atkinsVideo.speech}>Read SEC speech, 31 July 2025 ↗</ExternalLink>
            </p>
          </div>
        </div>
      </section>

      <section id="real-assets" aria-labelledby="real-assets-title" className={`${sectionClass} mt-12 max-lap:mt-10`}>
        <SectionTitle id="real-assets-title">Where digital ownership meets the real economy</SectionTitle>
        <p className={prose}>
          Real-asset-backed structures may involve interests in businesses or projects across the following themes.
          These are illustrative examples, not current offerings.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-6 max-tab:grid-cols-1">
          <figure className="m-0 min-w-0">
            <img
              src="/images/alternative-investments/copper-mine.webp"
              width={1672}
              height={941}
              alt="Illustrative terraced copper mine showing mineral resources and extraction infrastructure."
              loading="lazy"
              decoding="async"
              className="h-[255px] w-full bg-[#e9eced] object-cover max-tab:h-auto max-tab:aspect-video"
            />
            <figcaption className="border-vz-rule flex items-center gap-3 border-b py-3 text-[16px] leading-[1.5] font-semibold">
              <span aria-hidden className="text-vz-orange-btn text-[13px] font-medium tracking-[0.08em]">
                01
              </span>
              Resources & productive assets
            </figcaption>
          </figure>
          <figure className="m-0 min-w-0">
            <img
              src="/images/alternative-investments/property-charging.webp"
              width={1672}
              height={941}
              alt="Illustrative commercial buildings and electric vehicle charging stations, representing property and infrastructure."
              loading="lazy"
              decoding="async"
              className="h-[255px] w-full bg-[#e9eced] object-cover max-tab:h-auto max-tab:aspect-video"
            />
            <figcaption className="border-vz-rule flex items-center gap-3 border-b py-3 text-[16px] leading-[1.5] font-semibold">
              <span aria-hidden className="text-vz-orange-btn text-[13px] font-medium tracking-[0.08em]">
                02
              </span>
              Property & essential infrastructure
            </figcaption>
          </figure>
        </div>
        <p className={`${note} mt-3`}>AI-generated illustrations of asset themes, not actual investment projects.</p>
        <div className="mt-7 grid grid-cols-4 gap-5 max-lap:grid-cols-2 max-mob:grid-cols-1">
          {assetThemes.map((theme, index) => (
            <div
              key={theme.title}
              className={`min-w-0 border-l-4 border-[#e5e8eb] pl-4 ${
                index === 0 ? 'border-l-0 pl-0 max-lap:border-l-4 max-lap:pl-4' : ''
              }`}
            >
              <h3 className="text-vz-ink mb-2 text-[20px] leading-[1.35]">{theme.title}</h3>
              <p className="text-vz-ink m-0 text-[16px] leading-[1.55]">{theme.text}</p>
            </div>
          ))}
        </div>
        <p className={`${note} mt-5`}>
          “Asset-backed” is a claim to examine. Verify the assets, legal security, valuation and creditor priority.
          Physical assets can lose value and do not guarantee repayment.
        </p>
      </section>

      <section id="private" aria-labelledby="private-title" className={`${sectionClass} border-vz-rule mt-10 border-t pt-7`}>
        <Kicker>Private project opportunities</Kicker>
        <SectionTitle id="private-title">A considered route to private markets</SectionTitle>
        <p className={`${prose} text-[18px]`}>
          {company.groupName} provides information about curated private project opportunities, subject to availability,
          investor eligibility and jurisdiction. Each project requires careful assessment of its commercial fundamentals,
          legal rights, fees and exit restrictions.
        </p>
        <p className={`${prose} text-[18px]`}>
          We provide information and advice within our agreed services.{' '}
          <strong>
            Clients retain control of their assets and investment decisions; {company.groupName} does not provide
            custody through this service.
          </strong>{' '}
          Separate issuer, platform and custody arrangements must be understood. Curation does not guarantee
          performance or suitability.
        </p>
        <AppointmentButton className="mt-2">{t.ui.makeAppointment}</AppointmentButton>
      </section>

      <section
        id="considerations"
        aria-labelledby="considerations-title"
        className={`${sectionClass} mt-12 max-lap:mt-10`}
      >
        <SectionTitle id="considerations-title">Investor considerations</SectionTitle>
        <p className={prose}>
          <strong>Capital is at risk. You could lose all of your investment.</strong> Projects are private; availability
          and eligibility vary. Investments may be illiquid, subject to transfer restrictions and difficult to value.
          Returns, income and exits are not guaranteed.
        </p>
        <p className={prose}>
          Due diligence is required. Review the issuer, asset evidence, legal rights, fees, conflicts, tax, custody and
          offering documents. Project failures, counterparty default, cyberattacks, smart-contract defects and
          regulatory changes can cause loss. Tokenization does not remove these risks.
        </p>
        <p className={prose}>
          This page is educational information, not an offer or personalised recommendation. Assess suitability and seek
          appropriate independent legal and tax advice. Investor protections depend on the structure and jurisdiction.
        </p>
      </section>

      <details className="border-vz-rule mt-8 border-t">
        <summary className="text-vz-gray cursor-pointer py-4 text-[15px]">Sources & further reading</summary>
        <ul className="mb-2 list-disc pl-6">
          {educationSources.map((source) => (
            <li key={source.href} className="text-vz-gray py-1 text-[15px] leading-[1.7]">
              <ExternalLink href={source.href}>{source.label}</ExternalLink>
            </li>
          ))}
          <li className="text-vz-gray py-1 text-[15px] leading-[1.7]">
            Sources checked 22 September 2026. Regulatory references are jurisdiction-specific. No cited institution
            endorses this page or any project.
          </li>
        </ul>
      </details>

      {topic?.expertiseTags && (
        <div className="mt-12 max-lap:mt-10">
          <SpecialistsBand tags={topic.expertiseTags} />
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-12 max-lap:mt-10">
          <SectionTitle>Related articles</SectionTitle>
          <div className="grid grid-cols-2 gap-x-[68px] max-tab:grid-cols-1 max-tab:gap-x-0">
            {related.map((article) => (
              <ArticleSlim key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 max-w-[802px] max-lap:mt-10">
        <AdviceDisclaimer />
      </div>

      <div className="mt-12 max-lap:mt-10">
        <NewsletterCta />
      </div>
    </article>
  );
}
