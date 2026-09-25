-- Team roster from /about/team (src/data/team.ts).
-- Paste into the Supabase SQL editor and run.
-- Then upload public/team/*.png into Storage bucket "team" using the same filenames.

create extension if not exists pgcrypto;

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role text not null,
  section text not null
    check (section in ('investment', 'business', 'investors')),
  photo_path text not null,
  photo_storage_path text not null,
  about text not null,
  results text[] not null default '{}',
  credentials text[] not null default '{}',
  languages text[] not null default '{}',
  regulatory_note text null,
  finma_adviser_no text null,
  cfa_registry_no text null,
  expertise text[] not null default '{}',
  sort_order integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_members_slug_len check (char_length(slug) between 2 and 80),
  constraint team_members_name_len check (char_length(trim(name)) >= 2),
  constraint team_members_photo_path check (photo_path like '/team/%.png'),
  constraint team_members_photo_storage check (photo_storage_path like '%.png')
);

create index if not exists team_members_section_sort_idx
  on public.team_members (section, sort_order, name);

create index if not exists team_members_featured_idx
  on public.team_members (featured)
  where featured;

create or replace function public.set_team_members_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists team_members_set_updated_at on public.team_members;
create trigger team_members_set_updated_at
before update on public.team_members
for each row execute procedure public.set_team_members_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'team',
  'team',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists team_portraits_public_read on storage.objects;
create policy team_portraits_public_read
on storage.objects
for select
to public
using (bucket_id = 'team');

alter table public.team_members enable row level security;

drop policy if exists team_members_public_read on public.team_members;
create policy team_members_public_read
on public.team_members
for select
to anon, authenticated
using (true);

revoke all on table public.team_members from anon, authenticated;
grant select on table public.team_members to anon, authenticated;
grant select, insert, update, delete on table public.team_members to service_role;

insert into public.team_members (
  slug,
  name,
  role,
  section,
  photo_path,
  photo_storage_path,
  about,
  results,
  credentials,
  languages,
  regulatory_note,
  finma_adviser_no,
  cfa_registry_no,
  expertise,
  sort_order,
  featured
)
values
  (
    'friedrich-hartmann',
    'Friedrich Hartmann',
    'Chairman and CIO',
    'investment',
    '/team/friedrich-hartmann.png',
    'friedrich-hartmann.png',
    'Friedrich Hartmann leads Helfenstein’s investment strategy, bringing more than 30 years of experience to portfolio construction and long-term capital allocation. His approach centres on understanding business quality, paying disciplined valuations and maintaining perspective through changing market conditions. As Chairman and CIO, he sets the investment framework and guides the team’s assessment of risk. He places particular emphasis on clear investment reasoning and the patience to hold convictions while remaining open to new evidence.

His investment philosophy starts with a straightforward question: what makes a business worth owning over a full market cycle? He encourages the team to test the assumptions behind each investment case and consider how individual holdings interact within the portfolio. In client discussions, his emphasis is on explaining the relationship between valuation, uncertainty and the time required for an investment thesis to develop.',
    ARRAY['More than 30 years shaping the firm’s investment approach.'],
    ARRAY['Swiss banking diploma', 'CFA Charterholder'],
    ARRAY['German', 'English', 'French'],
    'Senior manager within Helfenstein Asset Management’s advisory organisation.',
    'CH-111.708.730/FH',
    'CFAFH01',
    ARRAY['investments', 'retirement', 'pensions'],
    0,
    true
  ),
  (
    'karin-vogel',
    'Karin Vogel',
    'Portfolio manager',
    'investment',
    '/team/karin-vogel.png',
    'karin-vogel.png',
    'Karin Vogel specialises in European mid-cap equities, combining detailed company research with a disciplined assessment of valuation. Her background with boutique value-investment firms in Spain informs a practical understanding of regional businesses and their competitive positions. A lead analyst on the Continental Value fund since 2016, she examines cash generation, management decisions and the durability of earnings. Karin also helps clients understand the reasoning behind portfolio holdings in clear, accessible language.

Her research looks beyond headline growth to examine how companies fund expansion, protect margins and allocate capital. She gives particular attention to the relationship between operating performance and cash flow, using it to challenge optimistic forecasts. In portfolio discussions, Karin sets out both the opportunity and the conditions that could weaken the investment case, supporting a balanced assessment of each holding.',
    ARRAY['Lead analyst on the Continental Value fund since 2016.', 'Three researched industrial holdings developed into core long-term positions.'],
    ARRAY['CFA Charterholder'],
    ARRAY['German', 'Spanish', 'English'],
    null,
    'CH-111.708.730/KV',
    'CFAKV01',
    ARRAY['investments'],
    1,
    false
  ),
  (
    'lukas-steiner',
    'Lukas Steiner',
    'Portfolio manager',
    'investment',
    '/team/lukas-steiner.png',
    'lukas-steiner.png',
    'Lukas Steiner focuses on European equities, with particular responsibility for the firm’s Iberian holdings. Having trained in Vienna and London, he combines fundamental company analysis with an interest in capital cycles and the economic forces shaping business returns. His work on portfolio discipline contributed to a 22% reduction in average turnover. Lukas favours carefully researched positions and a measured approach to trading, assessing each decision against the portfolio’s long-term investment case.

A central theme in his work is how investment, competition and financing conditions influence future profitability. He considers whether current earnings reflect a sustainable position or a favourable point in the cycle. Within portfolio discussions, Lukas emphasises the reasons for owning a company, the developments that would justify a reassessment and the costs associated with unnecessary changes to established positions.',
    ARRAY['22% reduction in average portfolio turnover.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    2,
    false
  ),
  (
    'maximilian-berger',
    'Maximilian Berger',
    'Portfolio manager',
    'investment',
    '/team/maximilian-berger.png',
    'maximilian-berger.png',
    'Maximilian Berger brings an audit background to equity investing, with a particular focus on accounting quality, balance-sheet strength and the reliability of reported earnings. He co-manages defensively positioned European holdings within the Global Value range. In 2023, he led the firm’s review of reporting standards across its investment universe. His contribution is a detailed examination of what sits behind the headline figures, helping the team challenge assumptions and identify financial weaknesses before committing capital.

His analytical style is grounded in reconciliation: checking whether the income statement, balance sheet and cash-flow statement tell a consistent story. He pays attention to working-capital movements, financing commitments and the assumptions underlying reported asset values. This perspective adds depth to the team’s investment debates, particularly when apparently attractive valuations need to be weighed against less visible financial or accounting risks.',
    ARRAY['Led the firm’s reporting-standards review in 2023.', 'Identified two balance-sheet risks before they attracted wider market attention.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    3,
    false
  ),
  (
    'julian-vogt',
    'Julian Vogt',
    'Portfolio manager',
    'investment',
    '/team/julian-vogt.png',
    'julian-vogt.png',
    'Julian Vogt combines a background in law and business with a focus on corporate governance and investment decision-making. He developed the governance checklist used ahead of new large portfolio positions, bringing ownership structures, shareholder rights and management incentives into the research process. Alongside his portfolio responsibilities, he mentors junior analysts on investment-thesis writing and position sizing. Julian’s approach connects the strength of a business with the terms on which investors participate in its future.

He examines how corporate structures and management decisions influence the position of shareholders over time. His research considers whether incentives encourage responsible capital allocation and whether a company’s governance supports its stated strategy. When working with less experienced analysts, Julian emphasises concise reasoning, explicit assumptions and a clear explanation of the evidence that would cause an investment view to change.',
    ARRAY['Supported work on legal and regulatory complexity in three cross-border holdings.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    4,
    false
  ),
  (
    'ken-wagner',
    'Ken Wagner',
    'Portfolio manager',
    'investment',
    '/team/ken-wagner.png',
    'ken-wagner.png',
    'Ken Wagner connects Helfenstein’s European investment team with opportunities in Asian-listed companies. He established the firm’s dedicated Asia-Pacific research coverage in 2019, developing a regional perspective grounded in company filings and ongoing dialogue with market participants. Fluent in Mandarin, German and Spanish, he supports communication across markets and research partners. He sourced four investments that represented more than 8% of the global portfolio. Ken focuses on understanding businesses in their local context while assessing how each opportunity fits the wider portfolio’s valuation and risk framework.

His research takes account of differences in disclosure practices, ownership structures and the competitive conditions facing companies across the region. He brings these considerations into discussions with European colleagues, helping them assess opportunities with appropriate local context. Ken’s approach combines close reading of financial information with an interest in how businesses generate cash, finance expansion and treat minority shareholders.',
    ARRAY['Four investments sourced, representing more than 8% of the global portfolio.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    5,
    false
  ),
  (
    'stefan-richter',
    'Stefan Richter',
    'Portfolio manager',
    'investment',
    '/team/stefan-richter.png',
    'stefan-richter.png',
    'Stefan Richter joined Helfenstein in 2015, bringing experience in investment research and the analysis of industrial businesses. He focuses on companies whose competitive strengths and cash flows can endure changing economic conditions. Stefan developed the firm’s energy-transition watchlist, giving the investment committee a structured basis for examining the businesses affected by this long-term shift. His research connects industry developments with company fundamentals, with particular attention to the capital required to sustain future growth.

He studies the relationship between industrial demand, production capacity and the investment needed to maintain a company’s competitive position. In energy-transition research, he distinguishes broad sector themes from the economics of individual businesses. Stefan’s approach asks how an opportunity translates into earnings and cash flow, and whether the balance sheet can support the investment required through less favourable phases of the cycle.',
    ARRAY['Member of the Helfenstein team since 2015.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    6,
    false
  ),
  (
    'greta-keller',
    'Greta Keller',
    'Junior analyst',
    'investment',
    '/team/greta-keller.png',
    'greta-keller.png',
    'Greta Keller supports research into smaller consumer and industrial companies across Germany, Austria and Switzerland. She joined Helfenstein in 2023 following an internship in investor relations, bringing a business-administration background and a strong interest in financial modelling. Her work combines analysis of company disclosures with an assessment of changing customer behaviour. Working alongside the portfolio managers, Greta helps translate emerging research ideas into clearly structured investment cases and ongoing company monitoring.

Her analytical approach begins with the underlying drivers of revenue, margins and working capital. She is particularly interested in how shifts in demand become visible in company results and whether management’s explanations are supported by the figures. In preparing research, Greta emphasises transparent assumptions and well-organised supporting material, making it easier for senior colleagues to review a model and challenge its conclusions.',
    ARRAY['Joined the investment team in 2023.', 'First analyst note reached the portfolio within six weeks.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    7,
    false
  ),
  (
    'tobias-brandt',
    'Tobias Brandt',
    'Managing director',
    'business',
    '/team/tobias-brandt.png',
    'tobias-brandt.png',
    'Tobias Brandt leads client development at Helfenstein, drawing on experience in private banking and equity sales. He works with prospective clients to understand their priorities and introduce the investment and advisory teams best placed to support them. His client-development work contributed to 40% growth in the private-client base over four years. Tobias also launched the firm’s client-education programme, which attracts more than 600 attendees annually. Fluent in German, English and Spanish, he places clear explanations and well-defined expectations at the centre of the client relationship.

He approaches business development as the beginning of an ongoing advisory relationship. Early conversations focus on what clients want to achieve, how they prefer to communicate and what they expect from professional investment support. Through the education programme, Tobias encourages informed questions and a better understanding of the firm’s approach, helping prospective and established clients participate more confidently in discussions about their finances.',
    ARRAY['40% growth in the private-client base over four years.', 'More than 600 attendees annually at the client-education programme.'],
    '{}',
    ARRAY['German', 'English', 'Spanish'],
    null,
    null,
    null,
    ARRAY['pensions', 'insurance', 'retirement'],
    8,
    false
  ),
  (
    'markus-engel',
    'Markus Engel',
    'Director, client communications',
    'business',
    '/team/markus-engel.png',
    'markus-engel.png',
    'Markus Engel leads Helfenstein’s client communications and marketing, translating investment thinking into clear reporting and consistent correspondence. He redesigned the materials used across the advisory team and oversees communications supporting more than 12,000 client interactions each year. His focus is on helping clients understand portfolio decisions, market developments and the information relevant to their circumstances. Markus works closely with investment and advisory colleagues to keep the firm’s external communications precise, useful and consistent.

He approaches each communication from the reader’s perspective: what has happened, why it matters and whether it calls for a discussion with an adviser. This shapes his work on reporting structure, editorial consistency and the presentation of complex topics. Markus also places emphasis on explaining uncertainty clearly, so that concise writing preserves the context clients need to understand an investment decision.',
    ARRAY['Communications supporting more than 12,000 client interactions each year.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    9,
    false
  ),
  (
    'marc-weber',
    'Marc Weber',
    'Managing Director, Client Operations',
    'business',
    '/team/marc-weber.png',
    'marc-weber.png',
    'Marc Weber oversees client operations and coordinates Helfenstein’s relationships with custodian banks. Drawing on a private-banking background, he focuses on account administration, custody arrangements and the clarity of client reporting. His review of custody and settlement terms helped reduce related client costs by 18% from 2020. Working in German, French and English, Marc connects clients, advisers and banking partners to support an orderly and responsive service.

His approach is to make the responsibilities of the adviser, the custodian and the client easy to understand. He pays attention to the practical details that influence service quality, including the completeness of account information and the handling of outstanding requests. Marc also brings a cost-conscious perspective to banking relationships, considering how operational arrangements affect the client’s overall experience and ongoing administration.',
    ARRAY['18% reduction in client custody and settlement costs since 2020.'],
    ARRAY['Swiss banking diploma'],
    ARRAY['German', 'French', 'English'],
    'Senior manager responsible for client operations and custody coordination.',
    'CH-111.708.730/MW',
    null,
    ARRAY['investments'],
    10,
    false
  ),
  (
    'andrew-ramsden',
    'Andrew Ramsden',
    'Client adviser',
    'investors',
    '/team/andrew-ramsden.png',
    'andrew-ramsden.png',
    'Andrew Ramsden brings 30 years of client-relationship experience to retirement and investment planning. He advises more than 40 families, helping them consider how their portfolios can support changing income needs and long-term priorities. His background includes leading private-client coverage at a London-based investment manager. Andrew developed the pre-retirement review used across Helfenstein’s advisory team, creating a structured starting point for discussions about retirement readiness, withdrawals and the decisions that need attention over time.

His conversations address the transition from accumulating wealth to drawing on it, including the balance between regular income, accessible reserves and longer-term investment needs. He places particular value on revisiting assumptions as family circumstances evolve. Andrew’s manner is deliberate and accessible, giving clients room to consider the trade-offs involved and understand how individual decisions fit into a broader retirement plan.',
    ARRAY['30 years of client-relationship experience.', 'Retirement and drawdown guidance for more than 40 families.'],
    ARRAY['IMC', 'CFA Level II'],
    ARRAY['English', 'German'],
    null,
    'CH-111.708.730/AR',
    null,
    ARRAY['investments', 'pensions', 'retirement'],
    11,
    false
  ),
  (
    'andrew-savage',
    'Andrew Savage',
    'Client adviser',
    'investors',
    '/team/andrew-savage.png',
    'andrew-savage.png',
    'Andrew Savage focuses on client onboarding, investment reporting and the coordination of relationships involving multiple custodian banks. He has supported the onboarding of 110 private clients over a two-year period and helped redesign the firm’s quarterly reporting pack, following which the reported client-satisfaction measure rose by 8 points. Working in English and French, Andrew connects clients with the investment team and keeps follow-up organised. His approach centres on making information easy to navigate and ensuring that clients understand the next steps in their relationship with the firm.

He pays particular attention to the early stages of a relationship, when clients need a clear understanding of documentation, responsibilities and communication arrangements. Where several banks are involved, he helps bring the available information into a more coherent view. Andrew also treats reporting as a starting point for discussion, helping clients identify the questions that deserve attention at their next review.',
    ARRAY['110 new private clients onboarded over two years.', 'Eight-point increase in the reported satisfaction measure after the reporting redesign.'],
    '{}',
    ARRAY['English', 'French'],
    null,
    null,
    null,
    ARRAY['investments', 'taxes', 'real-estate'],
    12,
    false
  ),
  (
    'anja-hoffmann',
    'Anja Hoffmann',
    'Client adviser',
    'investors',
    '/team/anja-hoffmann.png',
    'anja-hoffmann.png',
    'Anja Hoffmann draws on a background in listed-company investor relations to explain portfolio decisions clearly and place them in the context of clients’ wider financial priorities. She manages relationships with more than 180 private clients and families, with a focus on retirement and long-term planning. Her client-satisfaction score reached 4.8 out of 5 in the latest annual survey. Anja also organises the firm’s twice-yearly client seminars in Lucerne. Working in German and English, she brings a direct, structured approach to conversations that can otherwise feel complex.

She approaches client meetings by connecting investment information to the decisions a household actually faces. Rather than leaving clients with a collection of market observations, she seeks to clarify what those developments mean for the next discussion about their plans. Her investor-relations experience informs a careful choice of language and a preference for explaining the reasoning behind decisions, including the assumptions and uncertainties involved.',
    ARRAY['Relationships with more than 180 private clients and families.', 'Client-satisfaction score of 4.8 out of 5 in the latest annual survey.'],
    ARRAY['CFP®'],
    ARRAY['German', 'English'],
    null,
    'CH-111.708.730/AH',
    null,
    ARRAY['retirement', 'taxes', 'estate'],
    13,
    false
  ),
  (
    'florian-bauer',
    'Florian Bauer',
    'Client adviser',
    'investors',
    '/team/florian-bauer.png',
    'florian-bauer.png',
    'Florian Bauer advises households on portfolio structure and annual rebalancing, with particular responsibility for German-speaking clients living outside Switzerland. He focuses on practical explanations, careful follow-up and continuity between formal portfolio reviews. His work on client service helped bring average query response times below four business hours. Florian’s approach gives clients a clear point of contact for everyday questions while keeping discussions connected to their broader investment objectives and changing circumstances.

His review style is detail-oriented, covering how a portfolio is positioned, whether circumstances have changed and which matters require further attention. For clients living abroad, he places particular emphasis on organised communication and clear responsibility for follow-up. Florian aims to make routine service dependable, so that questions about reports, portfolio changes or upcoming reviews are handled with appropriate context and a clear next step.',
    ARRAY['Average client-query response time reduced to under four business hours.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    14,
    false
  ),
  (
    'erik-schneider',
    'Erik Schneider',
    'Client adviser',
    'investors',
    '/team/erik-schneider.png',
    'erik-schneider.png',
    'Erik Schneider brings 20 years of experience across investment funds, advisory platforms and private banking. Since joining Helfenstein in 2016, he has focused on maintaining long-term client relationships and providing continuity through changing market conditions. His relationship-management work helped retain 98% of assets during the market volatility of 2022. His background as a private-banking director informs a measured approach to portfolio discussions and client service. Erik helps clients distinguish short-term market developments from the considerations that matter to their financial plans, keeping conversations grounded in their individual priorities.

He places value on understanding the history behind a client’s decisions, including previous market experiences and their expectations of investment support. This perspective helps him frame discussions during periods of uncertainty without losing sight of the original objectives. Erik’s approach combines accessible explanations with a willingness to revisit earlier assumptions, recognising that a long-standing relationship still needs to adapt as the client’s circumstances develop.',
    ARRAY['Helped retain 98% of assets during the market volatility of 2022.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    15,
    false
  ),
  (
    'birgit-schulz',
    'Birgit Schulz',
    'Client adviser',
    'investors',
    '/team/birgit-schulz.png',
    'birgit-schulz.png',
    'Birgit Schulz brings a quality-control background to client service, with particular strengths in documentation, account transfers and the accuracy of client records. She helped rebuild the team’s CRM standards, raising recorded data completeness above 99%. Supporting clients in the Nordic and Benelux regions, Birgit approaches complex administrative matters with a clear sequence of actions and thorough follow-through. Her work supports continuity across the advisory team and gives clients an organised point of contact during account changes.

She treats accurate records as an essential part of good service: they allow colleagues to understand what has been agreed and what remains outstanding. In account-transfer matters, her approach is to identify dependencies early and keep the relevant parties informed. Birgit’s attention to documentation also supports smoother handovers, reducing the need for clients to repeat background information when several teams are involved.',
    ARRAY['Client-record completeness increased to above 99%.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    16,
    false
  ),
  (
    'alexander-koch',
    'Alexander Koch',
    'Senior client adviser',
    'investors',
    '/team/alexander-koch.png',
    'alexander-koch.png',
    'Alexander Koch works with clients whose financial affairs span several banks, countries or stages of business ownership. Since 2022, he has handled the firm’s cross-border private-client cases and developed a process for consolidating information from multiple custodians. His focus is on bringing a clearer overall view to arrangements that can otherwise become fragmented. Alexander coordinates the relevant discussions and follow-up, helping clients consider portfolio decisions alongside business transitions and their longer-term retirement priorities.

He begins by understanding how the different parts of a client’s finances relate to one another, rather than assessing each account in isolation. Where a business transition changes the purpose of invested assets, he helps organise the questions that need to be addressed. Alexander places particular value on clear information sharing and a defined sequence of decisions, making complex arrangements easier to discuss and review.',
    ARRAY['Responsible for cross-border private-client cases since 2022.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    17,
    false
  ),
  (
    'leon-roth',
    'Leon Roth',
    'Client adviser',
    'investors',
    '/team/leon-roth.png',
    'leon-roth.png',
    'Leon Roth focuses on coordinating client service across Helfenstein’s advisory and operational teams. He supports requests associated with more than 400 active client files, helping enquiries reach the appropriate colleagues and keeping follow-up on track. Leon introduced shared response templates that reduced internal handover errors by 50%, improving consistency as requests moved between teams. His contribution is practical and client-focused: maintaining context as requests move between teams and helping clients navigate service matters with clear communication and dependable coordination.

He approaches service coordination by keeping track of the request, its background and the person responsible for the next action. This is especially useful when a client’s question involves both an adviser and an operational specialist. Leon’s emphasis is on maintaining continuity throughout that process, with updates that explain progress clearly and help clients understand what information or action may still be needed.',
    ARRAY['Service coordination across more than 400 active client files.', '50% reduction in internal handover errors after shared response templates were introduced.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    18,
    false
  ),
  (
    'henrik-meier',
    'Henrik Meier',
    'Client adviser',
    'investors',
    '/team/henrik-meier.png',
    'henrik-meier.png',
    'Henrik Meier combines client-service responsibilities with a focus on written communications. He produces the firm’s monthly client letter for more than 8,000 subscribers and supports the editing of German-language publications. His work turns investment-team input and market updates into concise explanations that clients can readily follow. Improvements to subject lines and content structure helped increase email open rates by 19%. Henrik pays particular attention to structure, wording and relevance, helping maintain a consistent standard across everyday correspondence and the firm’s regular client communications.

He considers clarity a matter of selecting and ordering information as much as simplifying language. In his writing, he aims to make the main point easy to identify while preserving the detail needed to understand it. His position between client service and communications brings a useful perspective to editorial work, helping him anticipate the questions readers may have about the firm’s updates and explanations.',
    ARRAY['Monthly client letter reaching more than 8,000 subscribers.', '19% increase in email open rates after improvements to subject lines and structure.'],
    '{}',
    '{}',
    null,
    null,
    null,
    '{}',
    19,
    false
  )
on conflict (slug) do update set
  name = excluded.name,
  role = excluded.role,
  section = excluded.section,
  photo_path = excluded.photo_path,
  photo_storage_path = excluded.photo_storage_path,
  about = excluded.about,
  results = excluded.results,
  credentials = excluded.credentials,
  languages = excluded.languages,
  regulatory_note = excluded.regulatory_note,
  finma_adviser_no = excluded.finma_adviser_no,
  cfa_registry_no = excluded.cfa_registry_no,
  expertise = excluded.expertise,
  sort_order = excluded.sort_order,
  featured = excluded.featured;

-- Optional: tie intake clients to this roster once the table is seeded.
-- alter table public.clients
--   add constraint clients_instructed_person_fk
--   foreign key (instructed_person_slug)
--   references public.team_members (slug)
--   on update cascade
--   on delete set null;
