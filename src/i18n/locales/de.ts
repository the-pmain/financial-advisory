import { ROUTES } from '../../constants/routes';
import type { Translations } from '../types';

const navPaths = {
  mainNavigation: [
    {
      label: 'Privatpersonen',
      to: ROUTES.individuals,
      children: [
        { label: 'Vorsorge', to: ROUTES.retirement },
        { label: 'Finanzanlagen & Vermögensverwaltung', to: ROUTES.financialInvestments },
        { label: 'Nachlassplanung', to: ROUTES.estatePlanning },
        { label: 'Immobilien & Hypotheken', to: ROUTES.realEstate },
        { label: 'Steuern', to: ROUTES.taxes },
      ],
    },
    {
      label: 'Unternehmen',
      to: ROUTES.companies,
      children: [
        { label: 'Unternehmensnachfolge', to: ROUTES.companiesSuccession },
        { label: 'Pensionskassen', to: ROUTES.companiesPensionFunds },
        { label: 'Kaderversicherungen', to: ROUTES.companiesManagementPensionPlans },
        { label: 'Versicherungsmanagement', to: ROUTES.companiesInsuranceManagement },
        { label: 'Firmengründung', to: ROUTES.companiesEstablishing },
      ],
    },
    {
      label: 'Über Helfenstein',
      to: ROUTES.about,
      children: [
        { label: 'Unabhängige Beratung', to: ROUTES.aboutIndependentAdvice },
        { label: 'Wie wir reguliert sind', to: ROUTES.aboutHowWeAreRegulated },
        { label: 'Jobs & Karriere', to: ROUTES.aboutJobs },
        { label: 'Kontakt & Hilfe', to: ROUTES.aboutContact },
        { label: 'Team', to: ROUTES.aboutTeam },
        { label: 'Kundenbeispiele', to: ROUTES.aboutClientStories },
      ],
    },
  ],
  quickLinks: [
    { label: 'Vorsorge', to: ROUTES.retirement },
    { label: 'Anlagen', to: ROUTES.financialInvestments },
    { label: 'Unternehmen', to: ROUTES.companies },
    { label: 'Immobilien', to: ROUTES.realEstate },
    { label: 'Steuern', to: ROUTES.taxes },
    { label: 'Pensionen', to: ROUTES.pensionPlanning },
  ],
  topMenu: [
    { label: 'Termine', to: ROUTES.appointments },
    { label: 'Fachwissen', to: ROUTES.expertise },
    { label: 'Insights', to: ROUTES.insights },
    { label: 'Helfenstein Financial Portal', to: ROUTES.financialPortal },
  ],
  actionLinks: [
    { label: 'Jobs', to: ROUTES.aboutJobs },
    { label: 'Kontakt & Hilfe', to: ROUTES.aboutContact },
    { label: 'Newsletter abonnieren', to: ROUTES.newsletter },
  ],
  legalLinks: [
    { label: 'Rechtliche Hinweise', to: ROUTES.legalNotices },
    { label: 'Datenschutzerklärung', to: ROUTES.privacyPolicy },
    { label: 'Dokumente und Informationen', to: ROUTES.documentsAndInformation },
    { label: 'Regulierung & Compliance', to: ROUTES.regulatoryAndCompliance },
    { label: 'Impressum', to: ROUTES.impressum },
  ],
};

export const de: Translations = {
  meta: {
    siteName: 'Helfenstein Asset Management AG',
    defaultTitle:
      'Helfenstein Asset Management AG – Unabhängige Vermögensverwaltung, Finanzberatung und Vorsorgeplanung',
    defaultDescription:
      'Unabhängige Beratung zu Vorsorgeplanung, Finanzanlagen, Nachlassplanung, Immobilien, Steuern, Versicherungen und Pensionen.',
    teamDescription: 'Erfahrene Anlageexperten bei Helfenstein Asset Management AG.',
    notFoundTitle: 'Seite nicht gefunden',
  },
  ui: {
    search: 'Suche',
    menu: 'Menü',
    login: 'Login',
    makeAppointment: 'Termin vereinbaren',
    arrangeAppointment: 'Termin anfragen',
    orderForFree: 'Kostenlos bestellen',
    subscribeNow: 'Jetzt abonnieren',
    signUpForFree: 'Kostenlos registrieren',
    readMore: 'Mehr erfahren',
    backToHome: 'Zurück zur Startseite',
    popularTopics: 'Beliebte Themen',
    pageNotFound: 'Seite nicht gefunden',
    pageNotFoundBody:
      'Die gesuchte Seite existiert nicht oder wurde verschoben. Bitte nutzen Sie die Navigation oben oder wählen Sie eines der Themen unten.',
    news: 'Aktuelles',
    ourOffering: 'Unser Angebot',
    stockExchangeAndMarkets: 'Börse und Märkte',
    moreStockMarketNews: 'Mehr Börsennachrichten',
    marketData: 'Marktdaten',
    marketDataCaption:
      'Indikative Index- und Währungsstände mit der Veränderung seit dem vorherigen Schluss',
    instrument: 'Instrument',
    level: 'Stand',
    change: 'Veränderung',
    moreMandates: 'Weitere Mandate',
    moreOfferings: 'Weitere Angebote',
    propertyType: 'Objekttyp',
    whatWeDoForYou: 'Was wir für Sie tun',
    relatedArticles: 'Weitere Artikel',
    team: 'Team',
    teamSubtitle: 'Erfahrene Anlageexperten',
    featuredMemberLead:
      'Friedrich Hartmann leitet die Anlagephilosophie und die langfristige Kapitalallokation von Helfenstein.',
    about: 'Über',
    results: 'Erfolge',
    colleagues: 'Kolleginnen und Kollegen',
    knowledgeHub: 'Wissensdatenbank',
    position: 'Position',
    skipToSearch: 'Zur Suche springen',
    skipToNav: 'Zur Hauptnavigation springen',
    skipToMain: 'Zum Hauptinhalt springen',
    skipToFooter: 'Zur Fusszeilen-Navigation springen',
    searchWebsite: 'Website durchsuchen',
    searchPlaceholder: 'Wonach suchen Sie?',
    reset: 'Zurücksetzen',
    searchSubmit: 'Suchen',
    noResults: 'Keine Ergebnisse für',
    cookieNotice: 'Cookie-Hinweis',
    cookieBody:
      'Diese Website verwendet Cookies und andere Tracking-Technologien. Weitere Informationen finden Sie in unseren',
    legalNotice: 'Rechtlichen Hinweisen',
    privacyPolicy: 'Datenschutzerklärung',
    dismissCookie: 'Cookie-Hinweis schliessen',
    findUsOn: 'Sie finden uns auch auf:',
    externalLink: '(externer Link)',
    externalLinkNewWindow: '(externer Link, öffnet in neuem Fenster)',
    home: 'Startseite',
    finmaAlt: 'FINMA – Bewilligte Institute, Personen und Produkte',
    logoAria: 'Helfenstein Asset Management AG – Startseite',
    mainNav: 'Hauptnavigation',
    topNav: 'Obere Navigation',
    quickLinks: 'Schnelllinks',
    footerNav: 'Fusszeilen-Navigation',
    legalNav: 'Rechtliches',
    subscribeNewsletter: 'Newsletter abonnieren',
    forIndividuals: 'Für Privatpersonen',
    forCompanies: 'Für Unternehmen',
    clientStories: 'Kundenbeispiele',
    verifyAuthorisation: 'Autorisierung prüfen',
    relatedService: 'Zugehörige Dienstleistung',
    allInsights: 'Alle Insights',
    meetSpecialists: 'Unsere Spezialisten',
    regulatoryChallenges: 'Regulatorische Herausforderungen',
    howWeHelp: 'Wie wir helfen',
    adviceDisclaimer:
      'Nur allgemeine Informationen. Keine persönliche Anlage-, Steuer- oder Rechtsberatung.',
  },
  nav: navPaths,
  home: {
    testimonial: {
      quote:
        'Bei ausgewählten Schweizer Depotbanken profitieren Kundinnen und Kunden von tieferen Kosten und höherer Sicherheit.',
      positionLabel: 'Position',
      position: 'Managing Director, Client Operations',
      imageAlt: 'Porträt von Marc Weber, Managing Director Client Operations bei Helfenstein',
      ctaLabel: 'Termin vereinbaren',
    },
    newsletter: {
      text: 'Erhalten Sie regelmässig Tipps zur Optimierung Ihrer AHV-, Berufsvorsorge- und Säule-3a-Vorsorge.',
      linkLabel: 'Newsletter abonnieren (auf Deutsch, Französisch und Italienisch).',
    },
  },
  content: {
    articles: {
      'compulsory-insurance-switzerland': {
        slug: 'compulsory-insurance-switzerland',
        tagline: 'Versicherungen',
        title: 'Obligatorische Versicherungen in der Schweiz',
        teaser:
          'Wenn Ausländerinnen und Ausländer zum ersten Mal in die Schweiz ziehen und hier arbeiten, sollten sie wissen, welche Versicherungen gesetzlich vorgeschrieben sind.',
        body: [
          'Jede Person, die ihren Wohnsitz in der Schweiz nimmt, ist gesetzlich verpflichtet, eine Reihe von Versicherungen abzuschliessen. Welche davon gelten, hängt von Ihrem Aufenthaltsstatus, Ihrer Erwerbssituation und Ihren familiären Verhältnissen ab.',
          'Die obligatorische Krankenversicherung gilt für alle in der Schweiz wohnhaften Personen und muss innerhalb von drei Monaten nach der Ankunft abgeschlossen werden. Der Versicherungsschutz gilt rückwirkend ab dem Einreisedatum – es entsteht also keine Lücke, jedoch sind die Prämien ebenfalls ab diesem Datum geschuldet.',
          'Arbeitnehmende sind über ihren Arbeitgeber automatisch gegen Berufsunfälle versichert. Die Deckung für Nichtberufsunfälle ist enthalten, sobald Sie mindestens acht Stunden pro Woche beim gleichen Arbeitgeber arbeiten.',
          'Wer ein Motorfahrzeug besitzt, benötigt vor der Zulassung eine Haftpflichtversicherung. In vielen Kantonen ist zudem eine Gebäudeversicherung obligatorisch.',
        ],
      },
      'save-on-taxes-with-pillar-3a': {
        slug: 'save-on-taxes-with-pillar-3a',
        tagline: 'Säule 3a',
        title: 'So sparen Sie Steuern mit der Säule 3a',
        teaser:
          'Wer neben AHV und Pensionskasse die Säule 3a zur Altersvorsorge nutzt, kann die Einzahlungen vom steuerbaren Einkommen abziehen.',
        body: [
          'Die Säule 3a ist in der Schweiz das beliebteste Instrument zur Steuerersparnis. Einzahlungen können vollständig vom steuerbaren Einkommen abgezogen werden, bis zu einem periodisch angepassten jährlichen Höchstbetrag.',
          'Arbeitnehmende mit Pensionskassenanschluss dürfen jährlich bis zu einem festgelegten Frankenbetrag einzahlen. Selbstständige ohne Pensionskasse können bis zu 20 Prozent ihres Nettoerwerbseinkommens einzahlen, innerhalb einer Obergrenze.',
          'Vermögen in der Säule 3a ist von der Vermögenssteuer befreit, und die Erträge sind solange steuerfrei, wie sie auf dem Konto verbleiben. Bei der Auszahlung wird das Kapital getrennt vom übrigen Einkommen zu einem reduzierten Satz besteuert.',
          'Wenn Sie Ihr Sparguthaben auf mehrere Konten verteilen und in verschiedenen Jahren auszahlen, bleibt die Progression tief – das kann mehrere tausend Franken einsparen.',
        ],
      },
      'tips-for-foreigners-buying-real-estate': {
        slug: 'tips-for-foreigners-buying-real-estate',
        tagline: 'Immobilien',
        title: 'Tipps für Ausländerinnen und Ausländer beim Immobilienkauf',
        teaser:
          'Beim Erwerb von Liegenschaften in der Schweiz sollten ausländische Käuferinnen und Käufer mehrere Faktoren berücksichtigen. Der Immobilienerwerb ist eine bedeutende Investition, die auch mit einem gewissen Risiko verbunden ist.',
        body: [
          'Ausländerinnen und Ausländer mit Wohnsitz in der Schweiz und C-Ausweis können Immobilien zu denselben Bedingungen erwerben wie Schweizer Bürgerinnen und Bürger. Inhaberinnen und Inhaber eines B-Ausweises dürfen an ihrem Wohnort eine Liegenschaft zum Eigenbedarf erwerben.',
          'Kreditgeber verlangen in der Regel mindestens 20 Prozent des Kaufpreises als Eigenmittel, wovon mindestens 10 Prozent aus anderen Quellen als der beruflichen Vorsorge stammen müssen.',
          'Die Tragbarkeit wird konservativ beurteilt: Die kalkulatorischen Kosten für Hypothek, Unterhalt und Amortisation sollten etwa ein Drittel des Bruttoeinkommens nicht übersteigen.',
          'Käuferinnen und Käufer sollten Notariatsgebühren, Grundbuchgebühren und Handänderungssteuern einplanen, die von Kanton zu Kanton erheblich variieren.',
        ],
      },
      'is-it-worth-paying-more-into-your-pension-fund': {
        slug: 'is-it-worth-paying-more-into-your-pension-fund',
        tagline: 'Pensionskasse',
        title: 'Lohnt sich eine freiwillige Einzahlung in die Pensionskasse?',
        teaser:
          'Mit freiwilligen Einzahlungen in Ihre Pensionskasse können Sie erheblich Steuern sparen und im Alter über mehr Mittel verfügen.',
        imageAlt: 'Tabelle mit der Rendite einer freiwilligen Pensionskasseneinzahlung',
        body: [
          'Freiwillige Einkäufe in die Pensionskasse sind im Jahr der Zahlung vollständig vom steuerbaren Einkommen abziehbar. Für Personen mit höherem Einkommen kann das eine unmittelbare Steuerersparnis von einem Drittel oder mehr des eingezahlten Betrags bedeuten.',
          'Das Kapital wächst anschliessend steuerfrei, bis es ausbezahlt wird. Je länger die verbleibende Zeit bis zur Pensionierung, desto stärker wirkt sich der Zinsvorteil aus.',
          'Einkäufe in den drei Jahren vor der Pensionierung können nicht als Kapital bezogen werden, ohne den Steuerabzug zu verlieren – das Timing ist daher entscheidend.',
          'Prüfen Sie vor einem Einkauf das Deckungsgrad Ihrer Pensionskasse und vergleichen Sie den Umwandlungssatz mit dem, was Sie mit dem gleichen Betrag privat anlegen könnten.',
        ],
      },
      'financial-investments-what-you-need-know': {
        slug: 'financial-investments-what-you-need-know',
        tagline: 'Finanzanlagen',
        title: 'Finanzanlagen: Was Sie wissen sollten',
        teaser:
          'Wer Geld erfolgreich anlegen möchte, sollte strukturiert vorgehen und zuerst die richtige Anlagestrategie festlegen.',
        body: [
          'Eine solide Anlagestrategie beginnt mit Ihrer eigenen Situation: Wie viel Ihres Vermögens Sie binden können, für wie lange und welche Schwankungen Sie verkraften.',
          'Erst wenn die Strategie steht, folgt die Auswahl einzelner Anlagen. Breit diversifizierte, kostengünstige Indexfonds sind für die meisten Anlegerinnen und Anleger der effizienteste Baustein.',
          'Kosten gehören zu den wenigen Gewissheiten beim Anlegen. Jeder Franken, den Sie an Gebühren sparen, bleibt investiert und wirkt über die gesamte Haltedauer.',
        ],
      },
      'all-you-need-to-know-about-etfs': {
        slug: 'all-you-need-to-know-about-etfs',
        tagline: 'Anlagen',
        title: 'Alles, was Sie über ETFs wissen müssen',
        teaser: 'ETFs sind günstig, transparent und liquide und bieten viele weitere Vorteile.',
        body: [
          'Exchange Traded Funds (ETFs) bilden einen Index ab und können wie eine Aktie während der gesamten Handelszeit an der Börse gekauft und verkauft werden.',
          'Da sie passiv verwaltet werden, liegen ihre laufenden Kosten nur bei einem Bruchteil jener aktiv verwalteter Fonds – typischerweise wenige Hundertstel Prozent bei grossen, liquiden Indizes.',
          'Achten Sie auf die Replikationsmethode, den Fondsdomizil und die Tracking-Differenz – nicht nur auf die ausgewiesene Gebühr.',
        ],
      },
      'current-mortgage-interest-rates-comparison': {
        slug: 'current-mortgage-interest-rates-comparison',
        tagline: 'Hypotheken',
        title: 'Aktuelle Hypothekarzinsen – ein Vergleich',
        teaser:
          'Helfenstein vergleicht laufend die aktuellen Hypothekarzinsen der wichtigsten Anbieter in der Schweiz.',
        body: [
          'Hypothekarzinsen unterscheiden sich deutlich zwischen Banken, Versicherern und Pensionskassen – oft um mehr als einen halben Prozentpunkt bei gleicher Fixlaufzeit.',
          'Bei einer Hypothek von einer Million Franken entspricht diese Differenz mehreren tausend Franken pro Jahr. Ein Angebotsvergleich ist daher eine der rentabelsten Stunden, die Sie investieren können.',
          'Zinsen sind verhandelbar. Die publizierten Sätze sind Listenpreise – gut vorbereitete Kreditnehmerinnen und Kreditnehmer mit solider Tragbarkeit können sie in der Regel verbessern.',
        ],
      },
    },
    offers: [
      {
        id: 'checklist-retirement',
        title: 'Checkliste für Ihre Vorsorgeplanung',
        tag: 'Faktenblatt',
        teaser:
          'Die Pensionierung markiert den Übergang in ein neues Lebenskapitel – auch finanziell. Um sich auf die goldenen Jahre freuen zu können, müssen Sie eine Reihe sehr bedeutender Entscheidungen treffen.',
        cta: 'Kostenlos bestellen',
        imageAlt: 'Gedruckte Checkliste für die Vorsorgeplanung',
      },
      {
        id: 'free-first-meeting',
        title: 'Kostenloses Erstgespräch',
        tag: 'Termin',
        teaser: 'Sprechen Sie mit einer Expertin oder einem Experten von Helfenstein. Das Erstgespräch ist kostenlos.',
        cta: 'Termin anfragen',
      },
      {
        id: 'phishing-insurance',
        title: 'Schützen Sie Ihr Vermögen mit der Helfenstein Phishing-Versicherung',
        tag: 'Faktenblatt',
        teaser:
          'Die Helfenstein Phishing-Versicherung schützt Sie vor Phishing-Angriffen, die trotz Sicherheitsmassnahmen und Vorsicht gelingen.',
        cta: 'Kostenlos bestellen',
      },
    ],
    solutions: [
      {
        title: 'Vorsorgeplanung',
        text: 'Planen Sie Ihre Pensionierung mit Helfenstein – und seien Sie versichert, dass Sie nach dem Berufsleben finanziell abgesichert sind.',
      },
      {
        title: 'Säule 3a mit Indexanlagen',
        text: 'Bei Helfenstein können Sie Ihr Säule-3a-Vermögen in die besten Indexfonds anlegen. Dank tieferer Gebühren erzielen Sie über die Jahre zusätzliche Renditen von mehreren tausend oder sogar zehntausend Franken.',
      },
      {
        title: 'Steuerberatung',
        text: 'Unsere Expertinnen und Experten zeigen Ihnen, wie Sie Ihre Steuersituation langfristig optimieren und mehrere tausend oder sogar zehntausend Franken sparen.',
      },
      {
        title: 'Vermögensverwaltungsmandate',
        text: 'Bei Helfenstein verbinden wir eine einfache Anlagestrategie, effiziente Umsetzung und aktive Betreuung. Finden Sie das passende Mandat für sich.',
      },
    ],
    mandates: [
      {
        title:
          'Innovatives, schnell wachsendes Unternehmen im Bereich Gebäudetechnik und Energieoptimierung',
      },
      { title: 'Spezialisiertes Industrieanlagenbau-Unternehmen mit patentierter Technologie' },
      { title: 'Einer der führenden Schweizer Anbieter von Logistikverpackungsmaterialien' },
      { title: 'Erfolgreicher Telekommunikations-Dienstleister' },
    ],
    property: {
      type: 'Einfamilienhaus',
      imageAlt: 'Luftaufnahme eines Einfamilienhauses mit Garten',
      specs: [
        { label: 'Adresse' },
        { label: 'Anzahl Zimmer' },
        { label: 'Wohnfläche' },
        { label: 'Grundstücksfläche' },
        { label: 'Baujahr' },
        { label: 'Verkaufspreis' },
      ],
    },
    marketVideo: {
      slug: 'helfenstein-financial-portal-pro',
      tagline: 'Helfenstein Financial Portal Pro',
      title: 'Die Plattform für Ihren Börsenhandel',
      teaser: 'Video von Helfenstein Asset Management (1:46 Minuten)',
      videoNote: 'Video von Helfenstein Asset Management (1:46 Minuten)',
      body: [
        'Das Helfenstein Financial Portal Pro vereint Echtzeitkurse, Markttiefe, Charting und Ordererfassung in einer Ansicht.',
        'Watchlists, Alerts und Portfolioanalyse sind ohne Aufpreis enthalten, und Orders können direkt an allen wichtigen Schweizer und internationalen Börsen platziert werden.',
      ],
    },
  },
  topics: {
    [ROUTES.individuals]: {
      path: ROUTES.individuals,
      breadcrumb: ['Privatpersonen'],
      title: 'Privatpersonen',
      subtitle: 'Unabhängige Beratung für jede Lebensphase.',
      intro: [
        'Helfenstein berät Privatkundinnen und Privatkunden zu Vorsorge, Anlagen, Nachlassplanung, Immobilien, Steuern und Pensionen. Wir werden ausschliesslich von unseren Kundinnen und Kunden bezahlt – nie von Produktanbietern –, sodass unsere Empfehlungen frei von Vertriebsinteressen sind.',
        'Jedes Mandat beginnt mit einer schriftlichen Analyse Ihrer Situation. Anschliessend entscheiden Sie, ob und wie Sie mit uns zusammenarbeiten möchten.',
      ],
      highlights: [
        { title: 'Vorsorge', text: 'Ermitteln Sie genau, wann Sie sich die Pensionierung leisten können und was sie kostet.' },
        { title: 'Anlagen', text: 'Eine klare Strategie mit kostengünstigen Indexfonds, laufend überprüft.' },
        { title: 'Nachlassplanung', text: 'Testamente, Eheverträge und Schenkungen so gestaltet, dass Ihre Wünsche rechtlich abgesichert sind.' },
        { title: 'Steuern', text: 'Langfristige Steuerplanung, die zuverlässig tausende Franken spart.' },
      ],
    },
    [ROUTES.retirement]: {
      path: ROUTES.retirement,
      breadcrumb: ['Privatpersonen', 'Vorsorge'],
      title: 'Vorsorgeplanung',
      subtitle: 'Wissen Sie heute, wie Ihre Pensionierung aussehen wird.',
      intro: [
        'Die Pensionierung ist die grösste finanzielle Entscheidung im Leben der meisten Menschen. Rente oder Kapital, Frühpensionierung oder schrittweiser Bezug, wie viel Sie jährlich sicher ausgeben können – diese Entscheidungen sind unwiderruflich und beeinflussen sich gegenseitig.',
        'Unsere Spezialistinnen und Spezialisten modellieren Ihre Einkünfte und Ihr Vermögen Jahr für Jahr schriftlich, damit Sie die Folgen jeder Option erkennen, bevor Sie sich festlegen.',
      ],
      highlights: [
        { title: 'Rente oder Kapital', text: 'Ein direkter Vergleich beider Optionen über Ihre gesamte Lebenserwartung.' },
        { title: 'Frühpensionierung', text: 'Was ein Ausstieg zwei oder drei Jahre früher wirklich kostet – nach Steuern.' },
        { title: 'Bezugsplanung', text: 'In welcher Reihenfolge AHV, Pensionskasse und privates Vermögen bezogen werden.' },
        { title: 'Budgetcheck', text: 'Ein realistischer Blick darauf, welche Ausgaben Ihr Vermögen tatsächlich trägt.' },
      ],
    },
    [ROUTES.financialInvestments]: {
      path: ROUTES.financialInvestments,
      breadcrumb: ['Privatpersonen', 'Finanzanlagen & Vermögensverwaltung'],
      title: 'Finanzanlagen & Vermögensverwaltung',
      subtitle: 'Eine einfache Strategie, effizient umgesetzt.',
      intro: [
        'Wir verbinden eine klar definierte Anlagestrategie mit kostengünstiger Umsetzung und aktiver Betreuung. Sie wissen jederzeit, was Sie besitzen, was es kostet und warum es in Ihrem Portfolio ist.',
        'Da Helfenstein keine Retrozessionen erhält, zahlen Sie nur die mit uns vereinbarte Gebühr.',
      ],
      highlights: [
        { title: 'Vermögensverwaltungsmandate', text: 'Discretionary Management mit breit diversifiziertem Index-Kern.' },
        { title: 'Indexanlagen', text: 'Laufende Kosten nur ein Bruchteil jener aktiv verwalteter Fonds.' },
        { title: 'Portfolioanalyse', text: 'Eine schriftliche Zweitmeinung zu Ihrem heutigen Portfolio.' },
        { title: 'Verwahrung bei ausgewählten Schweizer Depotbanken', text: 'Tiefere Kosten und kein Anreiz, Ihr Portfolio unnötig umzuschichten.' },
      ],
    },
    [ROUTES.estatePlanning]: {
      path: ROUTES.estatePlanning,
      breadcrumb: ['Privatpersonen', 'Nachlassplanung'],
      title: 'Nachlassplanung',
      subtitle: 'Regeln Sie Ihren Nachlass, solange es unkompliziert ist.',
      intro: [
        'Das Schweizer Erbrecht verteilt einen Nachlass selten so, wie die meisten Menschen annehmen. Ohne Testament erben unverheiratete Partnerinnen und Partner nichts, und überlebende Ehegatten teilen sich die Liegenschaft oft mit den Kindern.',
        'Wir zeigen Ihnen, was das Gesetz in Ihrem Fall tun würde, und welche Instrumente – Testamente, Eheverträge, Schenkungen, Patientenverfügungen – Ihre tatsächlichen Wünsche verwirklichen.',
      ],
      highlights: [
        { title: 'Testamente und Erbverträge', text: 'So formuliert, dass sie Bestand haben – unter Beachtung der Pflichtteile.' },
        { title: 'Eheverträge', text: 'Abstimmung des Güterrechts mit Ihrer Nachlassplanung.' },
        { title: 'Schenkungen und Vorbezüge', text: 'Vermögensübertragung zu Lebzeiten ohne Streitigkeiten.' },
        { title: 'Willensvollstreckerinnen und Willensvollstrecker', text: 'Eine neutrale Instanz, die den Nachlass abwickelt und Ihre Familie entlastet.' },
      ],
    },
    [ROUTES.realEstate]: {
      path: ROUTES.realEstate,
      breadcrumb: ['Privatpersonen', 'Immobilien & Hypotheken'],
      title: 'Immobilien & Hypotheken',
      subtitle: 'Finanzieren Sie Ihre Liegenschaft zu den besten verfügbaren Konditionen.',
      intro: [
        'Hypothekarzinsen unterscheiden sich erheblich zwischen Banken, Versicherern und Pensionskassen. Bei einer grossen Hypothek beträgt die Spanne zwischen dem günstigsten und teuersten Anbieter leicht mehrere tausend Franken pro Jahr.',
        'Helfenstein vergleicht den Markt laufend, verhandelt in Ihrem Namen und prüft die Tragbarkeit rechtzeitig vor Ablauf Ihrer Fixlaufzeit.',
      ],
      highlights: [
        { title: 'Hypothekenvergleich', text: 'Aktuelle Konditionen von mehr als hundert Schweizer Kreditgebern.' },
        { title: 'Refinanzierung', text: 'Ein strukturiertes Angebotsverfahren bei Ablauf Ihrer Fixhypothek.' },
        { title: 'Tragbarkeit', text: 'Eine konservative Prüfung, die auch bei höheren Zinsen Bestand hat.' },
        { title: 'Kauf und Verkauf', text: 'Schätzungen und Begleitung während der gesamten Transaktion.' },
      ],
    },
    [ROUTES.taxes]: {
      path: ROUTES.taxes,
      breadcrumb: ['Privatpersonen', 'Steuern'],
      title: 'Steuerberatung',
      subtitle: 'Optimieren Sie Ihre Steuerposition langfristig.',
      intro: [
        'Die meisten Steuerersparnisse entstehen nicht in der jährlichen Steuererklärung, sondern in Entscheidungen, die Jahre zuvor getroffen wurden: wie Sie vorsorgen, wann Sie Pensionskapital beziehen, wo Sie wohnen und wie Sie Ihre Liegenschaft halten.',
        'Unsere Expertinnen und Experten zeigen Ihnen, wie Sie diese Entscheidungen strukturieren und mehrere tausend oder sogar zehntausend Franken sparen.',
      ],
      highlights: [
        { title: 'Steuererklärungen', text: 'Erstellt und eingereicht für Privatpersonen und Selbstständige.' },
        { title: 'Pensionskapitalbezüge', text: 'Über mehrere Jahre gestaffelt, um die Progression tief zu halten.' },
        { title: 'Liegenschaftssteuern', text: 'Eigenmietwert, Unterhalt und wertvermehrende Investitionen.' },
        { title: 'Umzug', text: 'Was ein Kantons- oder Gemeindewechsel wirklich bringt.' },
      ],
    },
    [ROUTES.insurance]: {
      path: ROUTES.insurance,
      breadcrumb: ['Privatpersonen', 'Versicherungen'],
      title: 'Versicherungen',
      subtitle: 'Decken Sie die Risiken ab, die zählen – und lassen Sie andere weg.',
      intro: [
        'Viele Haushalte sind gleichzeitig überversichert bei kleinen, erschwinglichen Risiken und unterversichert gegen jene, die ihre Finanzen ernsthaft bedrohen würden – Invalidität und Erwerbsausfall.',
        'Wir prüfen Ihre Policen im Lichte der Lücken in Ihrer AHV- und Pensionskassendeckung und gestalten das Portfolio neu – orientiert an dem, was Sie wirklich brauchen.',
      ],
      highlights: [
        { title: 'Risikoanalyse', text: 'Was AHV und Ihre Pensionskasse tatsächlich auszahlen würden.' },
        { title: 'Lebens- und Erwerbsausfallversicherung', text: 'Deckung passend zu Ihren Verpflichtungen – nicht zu einem Verkaufsziel.' },
        { title: 'Krankenversicherung', text: 'Franchise und Modell rechnerisch gewählt, jährlich überprüft.' },
        { title: 'Phishing-Versicherung', text: 'Schutz vor Angriffen, die trotz Vorsicht gelingen.' },
      ],
    },
    [ROUTES.pensionPlanning]: {
      path: ROUTES.pensionPlanning,
      breadcrumb: ['Privatpersonen', 'Vorsorgeplanung'],
      title: 'Vorsorgeplanung',
      subtitle: 'Die dritte Säule effizient aufbauen.',
      intro: [
        'Die Säule 3a ist für die meisten Menschen in der Schweiz das wirksamste Steuersparinstrument – und der Unterschied zwischen einem Sparkonto und einer gut gewählten Indexlösung beläuft sich über ein Erwerbsleben auf Zehntausende von Franken.',
        'Wir helfen Ihnen bei der Wahl des Vehikels, der Strategie und des Bezugszeitpunkts.',
      ],
      highlights: [
        { title: 'Säule 3a mit Indexanlagen', text: 'Die besten Indexfonds – zu einem Bruchteil der üblichen Gebühren.' },
        { title: 'Freiwillige Einkäufe', text: 'Wann sich ein Einkauf in die Pensionskasse wirklich lohnt.' },
        { title: 'Mehrere Konten', text: 'Gestaffelte Bezüge, die die Steuer auf Ihr Kapital senken.' },
        { title: 'Freizügigkeitsleistungen', text: 'Wohin Sie Ihr Kapital zwischen zwei Arbeitsstellen platzieren.' },
      ],
    },
    [ROUTES.banking]: {
      path: ROUTES.banking,
      breadcrumb: ['Privatpersonen', 'Banking'],
      title: 'Banking',
      subtitle: 'Sichere Verwahrung über Schweizer Depotbank-Partner.',
      intro: [
        'Kundengelder werden bei ausgewählten Schweizer Depotbanken verwahrt. Helfenstein Asset Management AG erbringt Vermögensverwaltung und Beratung und betreibt keine eigene Bank.',
        'Kundinnen und Kunden profitieren von transparenten Depotgebühren, ohne Retrozessionen und mit Schweizer Einlagensicherung.',
      ],
      highlights: [
        { title: 'Wertpapierverwahrung', text: 'Transparente, pauschale Depotpreise ohne versteckte Margen.' },
        { title: 'Konten und Karten', text: 'Alltagsbanking neben Ihrem Anlageportfolio.' },
        { title: 'Hypotheken', text: 'Finanzierung zu verglichenen Konditionen.' },
        { title: 'Sicherheit', text: 'Mehrfaktor-Zugang und laufende Betrugsüberwachung.' },
      ],
    },
    [ROUTES.companies]: {
      path: ROUTES.companies,
      breadcrumb: ['Unternehmen'],
      title: 'Unternehmen',
      subtitle: 'Von Pensionskassen bis zur Nachfolgeplanung.',
      intro: [
        'Helfenstein berät kleine und mittlere Schweizer Unternehmen zu beruflicher Vorsorge, Versicherungsmanagement, Firmengründung und Nachfolge.',
        'Unternehmen, die mit Helfenstein zusammenarbeiten, sparen bis zu 30 Prozent bei Risikoprämien und Administrationskosten und reduzieren gleichzeitig ihren internen Aufwand.',
      ],
      highlights: [
        { title: 'Unternehmensnachfolge', text: 'Bewertung, Käufersuche und Transaktionsmanagement.' },
        { title: 'Pensionskassen', text: 'Benchmarking und Neustrukturierung Ihrer beruflichen Vorsorge.' },
        { title: 'Vorsorgepläne für das Management', text: 'Steuereffiziente Zusatzdeckung für höhere Einkommen.' },
        { title: 'Versicherungsmanagement', text: 'Eine Ansprechstelle für das gesamte Unternehmensversicherungsportfolio.' },
      ],
    },
    [ROUTES.companiesSuccession]: {
      path: ROUTES.companiesSuccession,
      breadcrumb: ['Unternehmen', 'Unternehmensnachfolge'],
      title: 'Unternehmensnachfolge',
      subtitle: 'Übergeben Sie Ihr Unternehmen zu Ihren Bedingungen.',
      intro: [
        'Den Verkauf eines Unternehmens vollziehen die meisten Eigentümerinnen und Eigentümer nur einmal. Bewertung, Steuerstrukturierung, Käufersuche und Verhandlung müssen zusammenpassen – der Prozess dauert typischerweise ein bis zwei Jahre.',
        'Helfenstein führt die gesamte Transaktion und vertritt Ihre Interessen von der ersten Bewertung bis zum Abschluss.',
      ],
      highlights: [
        { title: 'Unternehmensbewertung', text: 'Eine verteidigbare Zahl auf Basis nachhaltiger Erträge.' },
        { title: 'Käufersuche', text: 'Diskrete Ansprache strategischer und finanzieller Käufer.' },
        { title: 'Steuerstrukturierung', text: 'Verkauf so gestaltet, dass der Erlös nicht durch Steuern geschmälert wird.' },
        { title: 'Transaktionsmanagement', text: 'Due Diligence, Verträge und Abschluss für Sie koordiniert.' },
      ],
    },
    [ROUTES.companiesPensionFunds]: {
      path: ROUTES.companiesPensionFunds,
      breadcrumb: ['Unternehmen', 'Pensionskassen'],
      title: 'Pensionskassen',
      subtitle: 'Sparen Sie bis zu 30 % bei Prämien und Administration.',
      intro: [
        'Kosten der beruflichen Vorsorge gehören zu den grössten und am seltensten geprüften Posten auf einer Schweizer Lohnliste. Risikoprämien und Administrationsgebühren variieren bei identischen Leistungen stark zwischen Anbietern.',
        'Wir benchmarken Ihre aktuelle Lösung, schreiben aus und begleiten den Wechsel.',
      ],
      highlights: [
        { title: 'Benchmarking', text: 'Ihre aktuellen Prämien im Marktvergleich.' },
        { title: 'Ausschreibung', text: 'Vergleichbare Offerten aller relevanten Anbieter.' },
        { title: 'Planausgestaltung', text: 'Leistungen passend zu Ihrer Belegschaft.' },
        { title: 'Administration', text: 'Lohnmeldungen und Mitgliederänderungen für Sie erledigt.' },
      ],
    },
    [ROUTES.companiesManagementPensionPlans]: {
      path: ROUTES.companiesManagementPensionPlans,
      breadcrumb: ['Unternehmen', 'Vorsorgepläne für das Management'],
      title: 'Vorsorgepläne für das Management',
      subtitle: 'Zusatzdeckung für höhere Einkommen.',
      intro: [
        'Oberhalb eines bestimmten Lohns ersetzt die Standard-Berufsvorsorge nur einen kleinen Teil des Einkommens. Ein separater Managementplan schliesst diese Lücke und schafft erheblichen Spielraum für steuerlich abziehbare Beiträge.',
        'Wir gestalten den Plan, dokumentieren ihn und integrieren ihn in die Basislösung.',
      ],
      highlights: [
        { title: '1e-Pläne', text: 'Individuelle Anlagestrategien für Löhne oberhalb der Schwelle.' },
        { title: 'Einkaufspotenzial', text: 'Spielraum für abziehbare freiwillige Einzahlungen schaffen.' },
        { title: 'Risikodeckung', text: 'Todes- und Invaliditätsleistungen passend zum Einkommen.' },
        { title: 'Governance', text: 'Reglemente und Reporting, die den Revisoren genügen.' },
      ],
    },
    [ROUTES.companiesInsuranceManagement]: {
      path: ROUTES.companiesInsuranceManagement,
      breadcrumb: ['Unternehmen', 'Versicherungsmanagement'],
      title: 'Versicherungsmanagement',
      subtitle: 'Eine Ansprechstelle für Ihr gesamtes Versicherungsportfolio.',
      intro: [
        'Unternehmensversicherungen entstehen eher durch Anhäufung als durch Planung. Policen überlappen, Versicherungssummen weichen von der Realität ab, und Prämien werden selten neu ausgeschrieben.',
        'Helfenstein erstellt ein Inventar, beseitigt Doppelspurigkeiten und verwaltet Erneuerungen und Schadenfälle in Ihrem Namen.',
      ],
      highlights: [
        { title: 'Portfolio-Review', text: 'Jede Police auf Deckung, Lücken und Preis geprüft.' },
        { title: 'Ausschreibungen', text: 'Erneuerungen marktgerecht und vergleichbar ausgeschrieben.' },
        { title: 'Schadenmanagement', text: 'Wir vertreten Sie, wenn ein Schaden eintritt.' },
        { title: 'Reporting', text: 'Ein jährlicher Überblick über Deckung und Kosten.' },
      ],
    },
    [ROUTES.companiesEstablishing]: {
      path: ROUTES.companiesEstablishing,
      breadcrumb: ['Unternehmen', 'Firmengründung'],
      title: 'Firmengründung',
      subtitle: 'Unser Gründungskompass führt Sie von der Idee zum ersten Lohn.',
      intro: [
        'Eine Firmengründung in der Schweiz erfordert eine Abfolge von Entscheidungen – Rechtsform, Kapital, Sozialversicherungen, MWST-Anmeldung, Vorsorge –, die nachträglich nur schwer korrigiert werden können.',
        'Der Helfenstein Gründungskompass führt Sie in der richtigen Reihenfolge durch alle Schritte – mit vorbereiteten Unterlagen.',
      ],
      highlights: [
        { title: 'Rechtsform', text: 'Einzelunternehmen, GmbH oder AG – was jede Option wirklich bedeutet.' },
        { title: 'Sozialversicherungen', text: 'Anmeldung und die Deckung, die Selbstständige nicht haben.' },
        { title: 'Vorsorge', text: 'Aufbau einer Säule 3a und, wo sinnvoll, einer beruflichen Vorsorge.' },
        { title: 'Steuern und MWST', text: 'Anmeldeschwellen und Buchhaltungspflichten.' },
      ],
    },
    [ROUTES.about]: {
      path: ROUTES.about,
      breadcrumb: ['Über Helfenstein'],
      title: 'Über Helfenstein',
      subtitle: 'Unabhängig seit 1993.',
      intro: [
        'Helfenstein Asset Management ist eine Schweizer Finanzberatungsgesellschaft. Wir beraten Privatkundinnen und Privatkunden zu Vorsorge, Anlagen, Steuern und Immobilien.',
        'Wir nehmen keine Provisionen von Produktanbietern an. Unser Einkommen stammt ausschliesslich aus den Honoraren, die unsere Kundinnen und Kunden mit uns vereinbaren.',
      ],
      highlights: [
        { title: 'Unabhängige Beratung', text: 'Keine Retrozessionen, keine Produktverkaufsziele.' },
        { title: 'Team', text: 'Spezialistinnen und Spezialisten, die Sie langfristig begleiten.' },
        { title: 'Jobs & Karriere', text: 'Beratungsarbeit, beurteilt nach Qualität – nicht nach verkauften Volumina.' },
        { title: 'Kontakt & Hilfe', text: 'Schreiben Sie uns, rufen Sie an oder vereinbaren Sie ein Erstgespräch.' },
      ],
    },
    [ROUTES.aboutIndependentAdvice]: {
      path: ROUTES.aboutIndependentAdvice,
      breadcrumb: ['Über Helfenstein', 'Unabhängige Beratung'],
      title: 'Unabhängige Beratung',
      subtitle: 'Bezahlt von unseren Kundinnen und Kunden. Von niemandem sonst.',
      intro: [
        'Der Grossteil der Finanzberatung in der Schweiz wird über die empfohlenen Produkte finanziert. Diese Regelung ist für Kundinnen und Kunden unsichtbar und begünstigt systematisch teure Lösungen.',
        'Helfenstein wird ausschliesslich von seinen Kundinnen und Kunden bezahlt. Wir veröffentlichen unsere Honorare, leiten nicht vermeidbare Retrozessionen weiter, und unsere Beraterinnen und Berater haben keine Produktverkaufsziele.',
      ],
      highlights: [
        { title: 'Honorartransparenz', text: 'Sie kennen die Kosten, bevor Sie eine Entscheidung treffen.' },
        { title: 'Keine Retrozessionen', text: 'Jede Drittzahlung wird Ihnen gutgeschrieben.' },
        { title: 'Schriftliche Analyse', text: 'Empfehlungen, die Sie lesen, prüfen und aufbewahren können.' },
        { title: 'Kostenloses Erstgespräch', text: 'Die Erstberatung kostet Sie nichts.' },
      ],
    },
    [ROUTES.aboutBranchOffices]: {
      path: ROUTES.aboutBranchOffices,
      breadcrumb: ['Über Helfenstein', 'Filialen'],
      title: 'Filialen',
      subtitle: 'Mehr als dreißig Standorte in der ganzen Schweiz.',
      intro: [
        'Helfenstein berät Kundinnen und Kunden von Büros aus in allen wichtigen Schweizer Wirtschaftsregionen – auf Deutsch, Französisch, Italienisch und Englisch.',
        'Finden Sie die Filiale in Ihrer Nähe und vereinbaren Sie ein kostenloses Erstgespräch.',
      ],
      highlights: [
        { title: 'Deutschschweiz', text: 'Zürich, Bern, Basel, Luzern, St. Gallen, Aarau, Zug und mehr.' },
        { title: 'Westschweiz', text: 'Genf, Lausanne, Nyon, Freiburg, Neuenburg, Sion.' },
        { title: 'Tessin', text: 'Lugano und Bellinzona.' },
        { title: 'Öffnungszeiten', text: 'Wochentags 08:00–18:00 Uhr, Termine ausserhalb dieser Zeiten auf Anfrage.' },
      ],
    },
    [ROUTES.aboutPortrait]: {
      path: ROUTES.aboutPortrait,
      breadcrumb: ['Über Helfenstein', 'Portrait'],
      title: 'Portrait',
      subtitle: 'Eine Schweizer Finanzdienstleistungsgruppe mit einem Geschäftsmodell.',
      intro: [
        'Helfenstein Asset Management AG berät Privat- und Institutionelle Kundinnen und Kunden zu Vermögensverwaltung, Finanzberatung, Vorsorge und Finanzierung aus Luzern.',
        'Wir sind von der FINMA als Vermögensverwalter bewilligt und werden von der OSFINcontrol AG beaufsichtigt.',
      ],
      highlights: [
        { title: 'Depotbank-Partner', text: 'Segregierte Verwahrung bei bewilligten Schweizer Banken.' },
        { title: 'Helfenstein Insurance Services', text: 'Brokerage für Privat- und Firmenkundinnen und -kunden.' },
        { title: 'Management', text: 'Geschäftsleitung und Verwaltungsrat.' },
        { title: 'Geschichte', text: 'Drei Jahrzehnte unabhängiger Beratung.' },
      ],
    },
    [ROUTES.aboutInvestorRelations]: {
      path: ROUTES.aboutInvestorRelations,
      breadcrumb: ['Über Helfenstein', 'Investor Relations'],
      title: 'Investor Relations',
      subtitle: 'Berichte, Kennzahlen und Finanzkalender.',
      intro: [
        'Hier finden Sie Unternehmensinformationen, Medienkontakte und Antworten für professionelle Investorinnen und Investoren sowie Partner von Helfenstein Asset Management AG.',
        'Wenden Sie sich bei weiteren Fragen an unser Investor-Relations-Team.',
      ],
      highlights: [
        { title: 'Geschäftsbericht', text: 'Vollständige Finanzberichte und Kommentar der Geschäftsleitung.' },
        { title: 'Halbjahresbericht', text: 'Zwischenergebnisse und Segmentzahlen.' },
        { title: 'Aktieninformationen', text: 'Kapitalstruktur, Dividendengeschichte und Analystenabdeckung.' },
        { title: 'Finanzkalender', text: 'Publikationstermine und Generalversammlung.' },
      ],
    },
    [ROUTES.aboutJobs]: {
      path: ROUTES.aboutJobs,
      breadcrumb: ['Über Helfenstein', 'Jobs & Karriere'],
      title: 'Jobs & Karriere',
      subtitle: 'Beratungsarbeit ohne Verkaufsziele.',
      intro: [
        'Da Helfenstein nichts an Produkten verdient, werden unsere Beraterinnen und Berater nach der Qualität ihrer Beratung beurteilt – nicht nach verkauften Volumina. Das verändert den Beruf grundlegend.',
        'Wir suchen laufend Beraterinnen und Berater, Spezialistinnen und Spezialisten sowie Absolventinnen und Absolventen weltweit.',
      ],
      highlights: [
        { title: 'Beratungsrollen', text: 'Kundenorientierte Positionen in Vorsorge, Steuern und Anlagen.' },
        { title: 'Spezialistinnen und Spezialisten', text: 'Aktuarwissenschaft, Recht, IT und Bankbetrieb.' },
        { title: 'Absolventinnen und Absolventen', text: 'Strukturierte Einstiegsprogramme mit Mentorin oder Mentor.' },
        { title: 'Arbeiten bei Helfenstein', text: 'Flexible Modelle und kontinuierliche Weiterbildung.' },
      ],
    },
    [ROUTES.aboutContact]: {
      path: ROUTES.aboutContact,
      breadcrumb: ['Über Helfenstein', 'Kontakt & Hilfe'],
      title: 'Kontakt & Hilfe',
      subtitle: 'Wir freuen uns auf Ihre Nachricht.',
      intro: [
        'Rufen Sie uns an, schreiben Sie uns oder vereinbaren Sie ein kostenloses Erstgespräch in der Filiale in Ihrer Nähe. Unsere Beraterinnen und Berater sprechen Deutsch, Französisch, Italienisch und Englisch.',
        'Bei Fragen zum Helfenstein Financial Portal steht unser Support-Team werktags während der Bürozeiten zur Verfügung.',
      ],
      highlights: [
        { title: 'Telefon', text: 'Wochentags 08:00–18:00 Uhr unter der Nummer Ihrer Filiale.' },
        { title: 'Termine', text: 'Buchen Sie online in wenigen Minuten ein kostenloses Erstgespräch.' },
        { title: 'Portal-Support', text: 'Hilfe bei Login, Zwei-Faktor-Zugang und Handel.' },
        { title: 'Medienanfragen', text: 'Unser Kommunikationsteam meldet sich umgehend.' },
      ],
    },
    [ROUTES.appointments]: {
      path: ROUTES.appointments,
      breadcrumb: ['Termine'],
      title: 'Termin vereinbaren',
      subtitle: 'Das Erstgespräch ist kostenlos.',
      intro: [
        'Sprechen Sie mit einer Expertin oder einem Experten von Helfenstein über Ihre Vorsorge, Ihre Anlagen, Ihre Steuern oder Ihre Hypothek. Die Erstberatung kostet Sie nichts und verpflichtet Sie zu nichts.',
        'Wählen Sie eine Filiale und einen Termin, und teilen Sie uns kurz mit, worüber Sie sprechen möchten.',
      ],
      highlights: [
        { title: 'Kostenloses Erstgespräch', text: 'Etwa eine Stunde, persönlich oder per Videokonferenz.' },
        { title: 'Schriftliche Analyse', text: 'Auf das Erstgespräch folgt ein konkreter Vorschlag.' },
        { title: 'Unverbindlich', text: 'Sie entscheiden anschliessend, ob Sie fortfahren möchten.' },
        { title: 'Jede Sprache', text: 'Deutsch, Französisch, Italienisch oder Englisch.' },
      ],
      ctaLabel: 'Termin anfragen',
    },
    [ROUTES.expertise]: {
      path: ROUTES.expertise,
      breadcrumb: ['Fachwissen'],
      title: 'Fachwissen',
      subtitle: 'Wissen, Studien und Tools unserer Spezialistinnen und Spezialisten.',
      intro: [
        'Helfenstein publiziert Forschung zu Vorsorge, Pensionen, Steuern, Hypotheken und Anlagen – zusammen mit Rechnern und Checklisten, die Sie selbst nutzen können.',
        'Alles ist kostenlos und erfordert keine Registrierung.',
      ],
      highlights: [
        { title: 'Wissensdatenbank', text: 'Mehrere hundert Artikel zur persönlichen Finanzplanung in der Schweiz.' },
        { title: 'Rechner', text: 'Tools für Vorsorge, Hypothekartragbarkeit und Säule 3a.' },
        { title: 'Faktenblätter', text: 'Kompakte gedruckte Ratgeber, kostenlos zugestellt.' },
        { title: 'Studien', text: 'Regelmässige Forschung zu Pensionskassen und Hypothekarpreisen.' },
      ],
    },
    [ROUTES.financialPortal]: {
      path: ROUTES.financialPortal,
      breadcrumb: ['Helfenstein Financial Portal'],
      title: 'Helfenstein Financial Portal',
      subtitle: 'Ihr Portfolio, Ihre Dokumente, Ihre Märkte.',
      intro: [
        'Das Helfenstein Financial Portal bietet Ihnen eine konsolidierte Sicht auf Ihre Konten und Portfolios, alle Ihre Dokumente und Echtzeit-Marktdaten.',
        'Die Pro-Version ergänzt Markttiefe, erweitertes Charting und direkte Ordererfassung an allen wichtigen Börsen.',
      ],
      highlights: [
        { title: 'Portfolioübersicht', text: 'Konsolidierte Performance über alle Ihre Positionen.' },
        { title: 'Dokumente', text: 'Auszüge und Steuerdokumente in einem Archiv.' },
        { title: 'Handel', text: 'Ordererfassung an Schweizer und internationalen Börsen.' },
        { title: 'Sicherheit', text: 'Zwei-Faktor-Authentifizierung bei jedem Login.' },
      ],
    },
    [ROUTES.stockExchangesAndMarkets]: {
      path: ROUTES.stockExchangesAndMarkets,
      breadcrumb: ['Kurse und Märkte'],
      title: 'Helfenstein Börsen & Märkte',
      subtitle: 'Aktuelle Aktienkurse, News und Analysen.',
      intro: [
        'Verlässliche Informationen, Echtzeitkurse und nützliche Tools – alles an einem Ort und nach Registrierung kostenlos nutzbar.',
        'Verfolgen Sie Indizes, Währungen, Zinsen und einzelne Titel, und setzen Sie Alerts für die Positionen, die Ihnen wichtig sind.',
      ],
      highlights: [
        { title: 'Echtzeitkurse', text: 'Schweizer und internationale Aktien, Indizes und Währungen.' },
        { title: 'Watchlists', text: 'Verfolgen Sie die Titel, die Sie interessieren, und setzen Sie Alerts.' },
        { title: 'Analysen', text: 'Kommentare unserer Anlage-Spezialistinnen und -Spezialisten.' },
        { title: 'Tools', text: 'Screener, Charts und Portfoliosimulationen.' },
      ],
      ctaLabel: 'Kostenlos registrieren',
    },
    [ROUTES.newsletter]: {
      path: ROUTES.newsletter,
      breadcrumb: ['Newsletter abonnieren'],
      title: 'Newsletter abonnieren',
      subtitle: 'Regelmässige Tipps zur Optimierung Ihrer Vorsorge.',
      intro: [
        'Erhalten Sie regelmässig Informationen zur Optimierung Ihrer AHV-, Berufsvorsorge- und Säule-3a-Vorsorge. Der Newsletter erscheint auf Deutsch, Französisch und Italienisch.',
        'Sie können die Themen wählen, die Sie interessieren, und sich jederzeit mit einem Klick abmelden.',
      ],
      highlights: [
        { title: 'Vorsorge', text: 'AHV, berufliche Vorsorge und Säule 3a.' },
        { title: 'Steuern', text: 'Fristen, Abzüge und Planungsmöglichkeiten.' },
        { title: 'Anlagen', text: 'Strategie, Kosten und Marktkommentar.' },
        { title: 'Immobilien', text: 'Hypothekarzinsen und Immobilienmarkt.' },
      ],
      ctaLabel: 'Jetzt abonnieren',
    },
    [ROUTES.checklistRetirementPlanning]: {
      path: ROUTES.checklistRetirementPlanning,
      breadcrumb: ['Checkliste für Ihre Vorsorgeplanung'],
      title: 'Checkliste für Ihre Vorsorgeplanung',
      subtitle: 'Bestellen Sie das Faktenblatt kostenlos.',
      intro: [
        'Die Pensionierung markiert den Übergang in ein neues Lebenskapitel – auch finanziell. Um sich auf die goldenen Jahre freuen zu können, müssen Sie eine Reihe sehr bedeutender Entscheidungen treffen.',
        'Unsere Checkliste führt Sie Schritt für Schritt durch alle Punkte – beginnend etwa zehn Jahre vor dem geplanten Ausstieg aus dem Erwerbsleben.',
      ],
      highlights: [
        { title: 'Zehn Jahre vorher', text: 'Beitragslücken schliessen und Pensionskasse prüfen.' },
        { title: 'Fünf Jahre vorher', text: 'Entscheid Rente oder Kapital, Bezugsplanung.' },
        { title: 'Ein Jahr vorher', text: 'Anmeldung bei der Ausgleichskasse, Versicherungen anpassen.' },
        { title: 'Nach der Pensionierung', text: 'Entnahme, Steuern und Nachlass steuern.' },
      ],
      ctaLabel: 'Kostenlos bestellen',
    },
    [ROUTES.phishingInsurance]: {
      path: ROUTES.phishingInsurance,
      breadcrumb: ['Helfenstein Phishing-Versicherung'],
      title: 'Schützen Sie Ihr Vermögen mit der Helfenstein Phishing-Versicherung',
      subtitle: 'Deckung für Angriffe, die trotz aller Vorsicht gelingen.',
      intro: [
        'Phishing ist zum häufigsten Weg für unbefugten Zugang zu Finanzkonten geworden. Selbst vorsichtige, gut informierte Menschen geraten gelegentlich auf eine überzeugende Nachricht herein.',
        'Die Helfenstein Phishing-Versicherung deckt den finanziellen Verlust, wenn ein Angriff trotz Sicherheitsmassnahmen und Vorsicht gelingt.',
      ],
      highlights: [
        { title: 'Was ist gedeckt', text: 'Verluste aus unbefugten Transaktionen nach einem Angriff.' },
        { title: 'Wer ist gedeckt', text: 'Verfügbar für Helfenstein-Beratungskundinnen und -kunden mit geeigneter Depotlösung.' },
        { title: 'Prävention', text: 'Praktische Hinweise zum Erkennen betrügerischer Nachrichten.' },
        { title: 'Schadenfälle', text: 'Eine Ansprechstelle, wenn etwas schiefgeht.' },
      ],
      ctaLabel: 'Kostenlos bestellen',
    },
  },
  legal: {
    'legal-notices': {
      slug: 'legal-notices',
      title: 'Rechtliche Hinweise',
      sections: [
        {
          paragraphs: [
            'Die auf dieser Website veröffentlichten Informationen dienen ausschliesslich allgemeinen Informationszwecken. Sie stellen weder ein Angebot noch eine Empfehlung oder Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten dar und sind keine Anlage-, Rechts- oder Steuerberatung.',
          ],
        },
        {
          heading: 'Keine Gewähr',
          paragraphs: [
            'Obwohl der Inhalt dieser Website sorgfältig zusammengestellt wird, wird keine Gewähr für Richtigkeit, Vollständigkeit oder Aktualität übernommen. Die Haftung für Verluste aus der Nutzung dieser Website ist im gesetzlich zulässigen Umfang ausgeschlossen.',
            'Marktdaten und Kurse sind indikativ und können zeitverzögert sein. Sie eignen sich nicht als Grundlage für Anlageentscheidungen.',
          ],
        },
        {
          heading: 'Links zu Websites Dritter',
          paragraphs: [
            'Diese Website enthält Links zu Websites Dritter. Solche Links dienen ausschliesslich der Bequemlichkeit. Wir haben keinen Einfluss auf deren Inhalt und übernehmen dafür keine Verantwortung.',
          ],
        },
        {
          heading: 'Geistiges Eigentum',
          paragraphs: [
            'Der gesamte Inhalt dieser Website ist urheberrechtlich geschützt. Vervielfältigung, Übermittlung oder Bearbeitung, ganz oder teilweise, bedürfen der vorherigen schriftlichen Zustimmung.',
          ],
        },
        {
          heading: 'Anwendbares Recht',
          paragraphs: [
            'Die Nutzung dieser Website untersteht schweizerischem Recht. Gerichtsstand ist ausschliesslich Zürich, Schweiz.',
          ],
        },
      ],
    },
    'privacy-policy': {
      slug: 'privacy-policy',
      title: 'Datenschutzerklärung',
      sections: [
        {
          paragraphs: [
            'Wir nehmen den Schutz Ihrer Personendaten ernst und bearbeiten sie gemäss dem Schweizer Datenschutzgesetz und, soweit anwendbar, der Datenschutz-Grundverordnung (DSGVO).',
          ],
        },
        {
          heading: 'Welche Daten wir bearbeiten',
          paragraphs: [
            'Wenn Sie diese Website besuchen, bearbeiten wir technische Daten wie die abgerufenen Seiten, den Zeitpunkt der Anfrage, den verwendeten Browser und das Betriebssystem sowie eine gekürzte IP-Adresse.',
            'Wenn Sie uns kontaktieren, ein Faktenblatt bestellen oder einen Termin vereinbaren, bearbeiten wir die von Ihnen mitgeteilten Kontaktdaten und weiteren Angaben, um Ihre Anfrage zu beantworten.',
          ],
        },
        {
          heading: 'Cookies und Tracking',
          paragraphs: [
            'Wir verwenden Cookies, die für den Betrieb der Website technisch erforderlich sind, und – mit Ihrer Einwilligung – Cookies, die uns helfen zu verstehen, wie die Website genutzt wird, damit wir sie verbessern können.',
            'Sie können Ihre Einwilligung jederzeit widerrufen und Cookies in Ihren Browsereinstellungen löschen.',
          ],
        },
        {
          heading: 'Weitergabe an Dritte',
          paragraphs: [
            'Wir geben Personendaten nur dann an Dritte weiter, wenn dies zur Erbringung unserer Dienstleistungen erforderlich ist, Sie eingewilligt haben oder wir gesetzlich dazu verpflichtet sind.',
          ],
        },
        {
          heading: 'Ihre Rechte',
          paragraphs: [
            'Sie haben das Recht, Auskunft über die von uns über Sie bearbeiteten Personendaten zu verlangen sowie unrichtige Daten berichtigen oder unrechtmässig bearbeitete Daten löschen zu lassen.',
          ],
        },
      ],
    },
    'documents-and-information': {
      slug: 'documents-and-information',
      title: 'Dokumente und Informationen',
      sections: [
        {
          paragraphs: [
            'In diesem Bereich finden Sie die regulatorischen Dokumente und Kundeninformationen zu unseren Dienstleistungen.',
          ],
        },
        {
          heading: 'Kundeninformationen',
          paragraphs: [
            'Allgemeine Geschäftsbedingungen, Gebühren- und Tarifübersicht sowie Informationen zu den Risiken beim Handel mit Finanzinstrumenten.',
          ],
        },
        {
          heading: 'Finanzdienstleistungsgesetz (FIDLEG)',
          paragraphs: [
            'Informationen zu unseren Dienstleistungen, Kundensegmentierung, Umgang mit Interessenkonflikten und unsere Anbindung an eine Ombudsstelle.',
          ],
        },
        {
          heading: 'Berichte',
          paragraphs: [
            'Jahres- und Halbjahresberichte der Helfenstein Asset Management AG sowie Medienmitteilungen und Präsentationen.',
          ],
        },
      ],
    },
    impressum: {
      slug: 'impressum',
      title: 'Impressum',
      sections: [
        {
          heading: 'Herausgeber',
          paragraphs: [
            'Helfenstein Asset Management AG',
            'Pilatusstrasse 23, 6003 Luzern, Schweiz.',
            'Telefon: +41 41 211 29 29',
            'UID: CHE-111.708.730',
            'LEI: 894500URZFTDV5G7F357',
            'LEI aktiv; Erneuerung fällig am 4. November 2026.',
          ],
        },
        {
          heading: 'Geschäftstätigkeit',
          paragraphs: [
            'Vermögensverwaltung, Finanzberatung, Vorsorgeplanung und Finanzierungsberatung.',
          ],
        },
        {
          heading: 'Aufsicht',
          paragraphs: [
            'Helfenstein Asset Management AG ist bei der FINMA als Vermögensverwalterin bewilligt und wird von der OSFINcontrol AG beaufsichtigt.',
          ],
        },
        {
          heading: 'Design und Umsetzung',
          paragraphs: ['Erstellt mit React, Vite und Tailwind CSS.'],
        },
      ],
    },
  },
  team: {
    sections: {
      investment: 'Anlageteam',
      business: 'Geschäftsentwicklung',
      investors: 'Investor Relations',
    },
    featuredLead:
      'Friedrich Hartmann leitet die Anlagephilosophie und die langfristige Kapitalallokation von Helfenstein.',
    members: {
      'friedrich-hartmann': {
        slug: 'friedrich-hartmann',
        role: 'Vorsitzender und CIO',
        about:
          'Friedrich Hartmann prägt die Anlagekultur von Helfenstein seit mehr als drei Jahrzehnten. Disziplinierter Leser und Langstreckenwanderer leitet er weiterhin den Portfolioaufbau und definiert den langfristigen Value-Rahmen des Hauses.',
        results: [
          'Hat die Leitaktienstrategie von Helfenstein von Anfang an aufgebaut; annualisierte Gesamtrendite von 11,4 % seit 2004.',
          'Dreimal von unabhängigen Fondsratings zu Europas führenden Value-Managern gezählt.',
          'Autor von In Long Horizon über patientes Kapital und zyklusbewusstes Investieren.',
        ],
      },
      'karin-vogel': {
        slug: 'karin-vogel',
        role: 'Portfolio Managerin',
        about:
          'Karin Vogel kam von Boutique-Value-Häusern in Madrid und Saragossa zu Helfenstein. Sie deckt europäische Mid-Caps mit forensischem Bottom-up-Ansatz und ruhigem, direktem Kundenstil ab.',
        results: [
          'CFA Charterholder; Lead Analystin beim Continental Value Fund seit 2016.',
          'Portfolio übertraf den Benchmark in den letzten fünf Jahren annualisiert um 2,8 %.',
          'Intern anerkannt dafür, drei übersehene Industriebeteiligungen in Kernpositionen zu verwandeln.',
        ],
      },
      'lukas-steiner': {
        slug: 'lukas-steiner',
        role: 'Portfolio Manager',
        about:
          'Lukas Steiner bildete sich in Wien und London aus, bevor er zu Helfenstein kam. Er verbindet fundamentale Aktienanalyse mit grossem Interesse an österreichischer Wirtschaftstheorie und Fussball – an Spieltagen meist in dieser Reihenfolge.',
        results: [
          'Verwaltet den iberischen Aktiensleeve des Hauses gemeinsam mit europäischen Co-Managern.',
          'Senkte den durchschnittlichen Portfolio-Umschlag um 22 % bei verbesserter Trefferquote neuer Ideen.',
          'Regelmässiger Referent am internen Research-Forum von Helfenstein zum Kapitalzyklus-Timing.',
        ],
      },
      'maximilian-berger': {
        slug: 'maximilian-berger',
        role: 'Portfolio Manager',
        about:
          'Maximilian Berger wechselte vom Audit ins Portfolio Management und bringt einen skeptischen Blick für Bilanzqualität mit. Kolleginnen und Kollegen beschreiben ihn als ruhig in Meetings und unermüdlich in den Modellen.',
        results: [
          'Identifizierte früh zwei Bilanzrisiken, die später am Markt breit diskutiert wurden.',
          'Co-managiert defensiv positionierte europäische Beteiligungen in der Global Value Range.',
          'Leitete die Helfenstein-Review 2023 zu Reporting-Standards im investierbaren Universum.',
        ],
      },
      'julian-vogt': {
        slug: 'julian-vogt',
        role: 'Portfolio Manager',
        about:
          'Julian Vogt hat Abschlüsse in Recht und Betriebswirtschaft und ein tiefes Interesse an Kapitaltheorie. Ausserhalb des Büros ist er eher auf dem Golfplatz oder beim erneuten Ansehen eines Lieblingsfilms als beim Kurscheck.',
        results: [
          'Strukturierte die Governance-Checkliste von Helfenstein, die vor jeder grossen Neuposition verwendet wird.',
          'Half, rechtliche und regulatorische Reibungen in drei grenzüberschreitenden Beteiligungen zu reduzieren.',
          'Mentort Junior-Analystinnen und -Analysten bei Theseformulierung und Positionsgrösse.',
        ],
      },
      'ken-wagner': {
        slug: 'ken-wagner',
        role: 'Portfolio Manager',
        about:
          'Ken Wagner verbindet den europäischen Desk von Helfenstein mit asiatischen Börsen-Chancen. In Taipei geboren und in Barcelona ausgebildet, reist er häufig und liest Geschäftsberichte mit derselben Geduld.',
        results: [
          'Eröffnete 2019 die erste dedizierte Asien-Pazifik-Research-Abdeckung von Helfenstein.',
          'Identifizierte vier Investitionen, die heute mehr als 8 % des Globalportfolios ausmachen.',
          'Fliessend in Mandarin, Deutsch und Spanisch; Hauptkontakt für regionale Broker.',
        ],
      },
      'stefan-richter': {
        slug: 'stefan-richter',
        role: 'Portfolio Manager',
        about:
          'Stefan Richter verbrachte Jahre auf der Sell Side, bevor er zu Helfenstein kam. Bergläufer ausserhalb des Büros bevorzugt er Unternehmen, die leise über Zyklen hinweg wachsen können.',
        results: [
          'Ehemaliger Research-Chef eines börsennotierten Industriekonzerns; bei Helfenstein seit 2015.',
          'Top-Quartil-Performance bei zyklischen Beteiligungen in der Periode 2020–2022.',
          'Erstellte die Energiewende-Watchlist des Hauses, die vom gesamten Investment Committee übernommen wurde.',
        ],
      },
      'greta-keller': {
        slug: 'greta-keller',
        role: 'Junior Analystin',
        about:
          'Greta Keller kam nach einem Praktikum in Investor Relations zu Helfenstein und wechselte schnell auf den Investment Floor. Sie bringt frische Modellierungskompetenz und einen aussergewöhnlich scharfen Blick für Konsumententrends.',
        results: [
          'Absolvierte als Beste ihres Jahrgangs Betriebswirtschaft; trat 2023 dem Team bei.',
          'Erste Analysten-Note erreichte das Portfolio innerhalb von sechs Wochen nach dem Start.',
          'Unterstützt die Abdeckung von Small-Cap-Konsum- und Industrienamen in der DACH-Region.',
        ],
      },
      'tobias-brandt': {
        slug: 'tobias-brandt',
        role: 'Geschäftsführer',
        about:
          'Tobias Brandt leitet die Geschäftsentwicklung bei Helfenstein nach Stationen im Private Banking und im Aktienvertrieb. Er weiss am ehesten, welche Institution bereit für ein vertieftes Gespräch ist.',
        results: [
          'Vergrösserte die institutionelle Kundenbasis von Helfenstein in vier Jahren um 40 %.',
          'Startete das Berater-Ausbildungsprogramm des Hauses, das jährlich von über 600 Fachleuten besucht wird.',
          'Leitete zuvor den Vertrieb für Iberien und Lateinamerika auf einer europäischen Multi-Asset-Plattform.',
        ],
      },
      'markus-engel': {
        slug: 'markus-engel',
        role: 'Direktor Investor Relations',
        about:
          'Markus Engel leitet Investor Relations, Marketing und Kommunikation. Warm am Telefon und präzise im Follow-up hält er die externe Stimme von Helfenstein im Einklang mit der tatsächlichen Portfoliosteuerung.',
        results: [
          'Steigerte Retail- und professionelle Assets under Advice in drei Jahren um 850 Mio. EUR.',
          'Führte das Quartalsbrief-Format ein, das heute von mehreren nationalen Wirtschaftsmedien zitiert wird.',
          'Leitet das Team mit über 12 000 Kundenkontakten pro Jahr.',
        ],
      },
      'marc-weber': {
        slug: 'marc-weber',
        role: 'Managing Director, Client Operations',
        about:
          'Marc Weber koordiniert Client Operations und Depotbank-Arrangements bei Helfenstein Asset Management AG. Er kam aus dem Private Banking und macht institutionelle Infrastruktur für Beratungskundinnen und -kunden in Luzern und der Schweiz zugänglich.',
        results: [
          'Senkte die durchschnittlichen Verwahrungs- und Abwicklungskosten für Helfenstein-Kundinnen und -Kunden seit 2020 um 18 %.',
          'Überwachte die Migration von über 4,2 Mrd. EUR Kundenvermögen auf segregierte Konten der Bank.',
          'Erweiterte Depotservices auf Pensionskassen, Family Offices und externe Berater in der DACH-Region.',
        ],
      },
      'anja-hoffmann': {
        slug: 'anja-hoffmann',
        role: 'Investor Relations',
        about:
          'Anja Hoffmann wechselte von der IR börsennotierter Unternehmen ins Asset Management. Kundinnen und Kunden schätzen ihren direkten Stil und die Art, komplexe Portfolio-Bewegungen in verständlicher Sprache zu erklären.',
        results: [
          'Betreut Beziehungen zu mehr als 180 vermögenden Familien.',
          'Kundenzufriedenheitswert von 4,8/5 in der letzten Jahresumfrage.',
          'Organisiert die halbjährlichen Investorentage von Helfenstein in München und Zürich.',
        ],
      },
      'florian-bauer': {
        slug: 'florian-bauer',
        role: 'Investor Relations',
        about:
          'Florian Bauer betreut institutionelle Konten, die Detail statt Drama erwarten. Ehemaliger Tennis-Enthusiast und Wochenend-Skifahrer ist er unter Druck zuverlässig und verpasst selten einen Rückruf.',
        results: [
          'Unterstützte 2024 Nettozuflüsse von 320 Mio. EUR über Beratungskanäle.',
          'Reduzierte die durchschnittliche Antwortzeit auf Anfragen auf unter vier Geschäftsstunden.',
          'Hauptkontakt für Vertriebspartner in Süddeutschland und Österreich.',
        ],
      },
      'andrew-ramsden': {
        slug: 'andrew-ramsden',
        role: 'Investor Relations',
        about:
          'Andrew Ramsden bringt drei Jahrzehnte institutionelle Beziehungserfahrung an den Investor-Desk von Helfenstein. Abgewogen und zugänglich ist er die Person, die Consultants anrufen, wenn ein Mandat Klarheit statt Spin braucht.',
        results: [
          'Hat Beziehungen zu mehr als 40 Pensions- und Stiftungskunden in Europa aufgebaut und vertieft.',
          'Leitete die erste pan-europäische Consultant-Roadshow der Firma und sicherte drei mehrjährige Beratungsmandate.',
          'Ehemaliger Head of Client Coverage bei einem Londoner Asset Manager; seit 2019 bei Helfenstein.',
        ],
      },
      'erik-schneider': {
        slug: 'erik-schneider',
        role: 'Investor Relations',
        about:
          'Erik Schneider ist seit zwei Jahrzehnten in Fonds- und Beratungsplattformen tätig. Ruhig und unhurried ist er oft die erste Person, nach der langjährige Kundinnen und Kunden fragen, wenn die Märkte unruhig werden.',
        results: [
          'Betreut das älteste Kundenbuch von Helfenstein, zurückgehend bis 2008.',
          'Half, 98 % der Assets während des Volatilitätsanstiegs 2022 zu halten.',
          'Ehemaliger Private-Banking-Direktor, bei Helfenstein seit 2016.',
        ],
      },
      'andrew-savage': {
        slug: 'andrew-savage',
        role: 'Investor Relations',
        about:
          'Andrew Savage spezialisiert sich auf das Onboarding professioneller Anleger und präzises Reporting. Energetisch in Meetings und akribisch im Follow-up verbindet er Investmentteams und Kunden, ohne den Detailverlust.',
        results: [
          'Onboardete in den letzten zwei Jahren 110 neue professionelle Anlegerinnen und Anleger.',
          'Baute das Quartalsreporting für alle IR-Beziehungen neu auf; NPS stieg um acht Punkte.',
          'Hauptkontakt für britische und irische Beratungsplattformen, die Helfenstein-Strategien vertreiben.',
        ],
      },
      'birgit-schulz': {
        slug: 'birgit-schulz',
        role: 'Investor Relations',
        about:
          'Birgit Schulz kam nach einer Karriere in der Qualitätskontrolle in den Finanzdienstleistungssektor – ein Hintergrund, der sich in der akribischen Dokumentation jedes Kundenkontakts zeigt. Ruhig, gründlich und schwer aus der Ruhe zu bringen.',
        results: [
          'Baute die CRM-Hygienestandards des Teams neu auf; Datenvollständigkeit heute über 99 %.',
          'Betreut nordische und Benelux-Kundinnen und -Kunden in drei Sprachen.',
          'Anerkannt für die Lösung der komplexesten Legacy-Kontotransfers des Hauses.',
        ],
      },
      'alexander-koch': {
        slug: 'alexander-koch',
        role: 'Institutionelles Geschäft',
        about:
          'Alexander Koch betreut institutionelle Pipeline und Consultant Relations. Jung, aber bereits vertrauenswürdig in Due-Diligence-Meetings, verbindet er Investmentteams mit den richtigen externen Partnern.',
        results: [
          'Fügte seit 2022 zwölf neue Fondsberater-Beziehungen hinzu.',
          'Unterstützte den Gewinn von drei wettbewerbsorientierten institutionellen Ausschreibungen 2024.',
          'Koordiniert ESG-Fragebögen und RFP-Antworten von Helfenstein.',
        ],
      },
      'leon-roth': {
        slug: 'leon-roth',
        role: 'Investor Relations',
        about:
          'Leon Roth hält die Kundenservice-Maschine von Helfenstein am Laufen. Kolleginnen und Kollegen verlassen sich darauf, dass er zum richtigen Zeitpunkt den richtigen Desk verbindet, ohne dass Kundinnen und Kunden sich durchgereicht fühlen.',
        results: [
          'Koordiniert teamübergreifende Anfragen für mehr als 400 aktive Kundendossiers.',
          'Führte gemeinsame Antwortvorlagen ein, die interne Übergabefehler halbierten.',
          'Bekannt dafür, schwierige Servicefälle in langfristige Kundenloyalität zu verwandeln.',
        ],
      },
      'henrik-meier': {
        slug: 'henrik-meier',
        role: 'Investor Relations',
        about:
          'Henrik Meier verfasst die täglichen Kunden-Updates und unterstützt das Kommunikationsteam. Klar, prägnant und leicht musikalisch ausserhalb der Arbeit – er spielt Gitarre in einer Büroband, die besser klingt, als sie aussieht.',
        results: [
          'Erstellt monatliche Teilnehmerbriefe, die von über 8 000 Anlegerinnen und Anlegern gelesen werden.',
          'Half, E-Mail-Öffnungsraten um 19 % durch klarere Betreffzeilen und Struktur zu steigern.',
          'Stellvertretender Redaktor für alle deutschsprachigen externen Publikationen.',
        ],
      },
    },
  },
};
