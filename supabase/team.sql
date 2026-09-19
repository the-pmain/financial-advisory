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
    'Friedrich Hartmann has shaped Helfenstein’s investment culture for more than thirty years. A disciplined reader and long-distance walker, he still leads portfolio construction and sets the firm’s long-term value framework.',
    ARRAY['Built Helfenstein’s flagship equity strategy from inception; compound annual return of 11.4% since 2004.', 'Named among Europe’s leading value managers three times by independent fund ratings.', 'Author of In Long Horizon, on patient capital and cycle-aware investing.'],
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
    'Karin Vogel joined Helfenstein from boutique value houses in Madrid and Zaragoza. She covers European mid-caps with a forensic, bottom-up style and a calm, direct manner with clients.',
    ARRAY['CFA Charterholder; lead analyst on the Continental Value fund since 2016.', 'Portfolio outperformed its benchmark by 2.8% annualised over the last five years.', 'Recognised internally for turning three overlooked industrial holdings into core long-term positions.'],
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
    'Lukas Steiner trained in Vienna and London before settling at Helfenstein. He blends fundamental equity work with a keen interest in Austrian economics and football—usually in that order on match days.',
    ARRAY['Manages the firm’s Iberian equity sleeve alongside European co-managers.', 'Cut average portfolio turnover by 22% while improving hit rate on new ideas.', 'Regular speaker at Helfenstein’s internal research forum on capital-cycle timing.'],
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
    'Maximilian Berger moved from audit into portfolio management, bringing a sceptical eye for accounting quality. Colleagues describe him as quiet in meetings and relentless in the workbook.',
    ARRAY['Flagged two balance-sheet risks early that later became widely discussed in the market.', 'Co-manages defensively positioned European holdings in the Global Value range.', 'Led Helfenstein’s 2023 review of reporting standards across the investable universe.'],
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
    'Julian Vogt holds degrees in law and business and a deep interest in capital theory. Outside the office he is more likely to be on a golf course or rewatching a favourite film than checking prices.',
    ARRAY['Structured Helfenstein’s governance checklist now used before every new large position.', 'Helped reduce legal and regulatory friction in three cross-border holdings.', 'Mentors junior analysts on thesis writing and position sizing.'],
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
    'Ken Wagner bridges Helfenstein’s European desk with Asian-listed opportunities. Born in Taipei and educated in Barcelona, he travels often and reads company filings with the same patience.',
    ARRAY['Opened Helfenstein’s first dedicated Asia-Pacific research coverage in 2019.', 'Sourced four investments now representing more than 8% of the global portfolio.', 'Fluent in Mandarin, German and Spanish; primary contact for regional brokers.'],
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
    'Stefan Richter spent years on the sell side before joining Helfenstein. A mountain runner when not in the office, he prefers businesses that can compound quietly through cycles.',
    ARRAY['Former head of research at a listed industrial group; joined Helfenstein in 2015.', 'Top-quartile performance on cyclical holdings during the 2020–2022 period.', 'Built the firm’s energy-transition watchlist adopted by the full investment committee.'],
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
    'Greta Keller joined Helfenstein after an internship in investor relations and quickly moved onto the investment floor. She brings fresh modelling skills and an unusually sharp eye for consumer trends.',
    ARRAY['Graduated top of her class in business administration; joined the team in 2023.', 'First analyst note to reach the portfolio within six weeks of starting.', 'Supports coverage of small-cap consumer and industrial names across the DACH region.'],
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
    'Tobias Brandt leads client development at Helfenstein after stints in private banking and equity sales. He is usually the first person a prospective client speaks to before a first meeting is arranged.',
    ARRAY['Grew Helfenstein’s private client base by 40% in four years.', 'Launched the firm’s client-education programme, now attended by 600+ people yearly.', 'Previously directed private-client coverage for Iberia at a European multi-asset platform.'],
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
    'Markus Engel runs client communications and marketing. Warm on calls and precise in follow-up, he keeps Helfenstein’s external voice consistent with how portfolios are actually run.',
    ARRAY['Rebuilt the client reporting and correspondence used across the advisory team.', 'Introduced quarterly letter format now cited by several national business titles.', 'Leads the team that handles more than 12,000 client touchpoints per year.'],
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
    'Marc Weber coordinates client operations and the relationships with our custodian banks. He joined from private banking and makes sure clients get clear reporting from the bank that holds their assets, from Lucerne and internationally.',
    ARRAY['Reduced the custody and settlement costs Helfenstein clients pay their banks by 18% since 2020.', 'Led the review that moved clients onto segregated custody accounts held in their own names.', 'Negotiates custody terms with custodian banks on behalf of private clients.'],
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
    'Andrew Ramsden brings three decades of client relationship experience to Helfenstein’s advisory desk. Measured and approachable, he is the person clients call when a decision needs clarity rather than spin.',
    ARRAY['Advises more than 40 families on retirement and drawdown planning.', 'Built the written pre-retirement review now used across the advisory team.', 'Former head of private client coverage at a London-based manager before joining Helfenstein in 2019.'],
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
    'Andrew Savage specialises in onboarding new clients and keeping reporting sharp. Energetic in meetings and meticulous in follow-up, he bridges the investment team and clients without losing the detail.',
    ARRAY['Onboarded 110 new private clients over the past two years.', 'Rebuilt the quarterly reporting pack sent to every client; satisfaction rose eight points.', 'Primary contact for clients with assets held across more than one custodian bank.'],
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
    'Anja Hoffmann moved into asset management from listed-company IR. Clients appreciate her direct style and the way she explains complex portfolio moves in plain language.',
    ARRAY['Manages relationships with more than 180 private clients and families.', 'Client satisfaction score of 4.8/5 in last annual survey.', 'Organises Helfenstein’s twice-yearly client seminars in Lucerne.'],
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
    'Florian Bauer looks after clients who expect detail, not drama. A former tennis addict turned weekend skier, he is reliable under pressure and rarely misses a callback.',
    ARRAY['Advises households on portfolio structure and annual rebalancing.', 'Reduced average query response time to under four business hours.', 'Key contact for German-speaking clients resident outside Switzerland.'],
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
    'Erik Schneider has spent two decades around funds and advisory platforms. Steady and unhurried, he is often the first person long-standing clients ask for when markets turn noisy.',
    ARRAY['Maintains Helfenstein’s longest-tenured client book, dating back to 2008.', 'Helped retain 98% of assets during the 2022 volatility spike.', 'Former private-banking director before joining Helfenstein in 2016.'],
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
    'Birgit Schulz joined financial services after a career in quality control—a background that shows in how she documents every client interaction. Calm, thorough, and hard to fluster.',
    ARRAY['Rebuilt the team’s CRM hygiene standards; data completeness now above 99%.', 'Supports Nordic and Benelux clients across three languages.', 'Recognised for resolving the firm’s most complex legacy account transfers.'],
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
    'Alexander Koch advises clients with more complex affairs — several banks, assets in more than one country, or a business being wound down into retirement. Young but already trusted in difficult conversations.',
    ARRAY['Handles the firm’s cross-border private client cases since 2022.', 'Built the consolidation process for clients holding assets at several custodians.', 'Coordinates Helfenstein’s sustainability preference questionnaire under FinSA.'],
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
    'Leon Roth keeps Helfenstein’s client service machine running smoothly. Colleagues rely on him to connect the right desk at the right moment without clients feeling passed around.',
    ARRAY['Coordinates cross-team requests for more than 400 active client files.', 'Introduced shared response templates that halved internal handoff errors.', 'Known for turning difficult service cases into long-term client loyalty.'],
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
    'Henrik Meier writes the day-to-day client updates and supports the communications team. Clear, concise and slightly musical outside work—he plays guitar in a office band that is better than it sounds.',
    ARRAY['Produces the monthly client letter read by more than 8,000 subscribers.', 'Helped lift email open rates by 19% through clearer subject lines and structure.', 'Backup editor for all German-language external publications.'],
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
