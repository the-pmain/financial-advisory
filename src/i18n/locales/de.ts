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
        { label: 'Alternative Anlagen', to: ROUTES.alternativeInvestments },
        { label: 'Nachlassplanung', to: ROUTES.estatePlanning },
        { label: 'Immobilien & Hypotheken', to: ROUTES.realEstate },
        { label: 'Steuern', to: ROUTES.taxes },
      ],
    },
    {
      label: 'Über uns',
      to: ROUTES.about,
      children: [
        { label: 'Unser Team', to: ROUTES.aboutTeam },
        { label: 'Regulatorische Compliance', to: `${ROUTES.about}#regulatory-compliance` },
        { label: 'Unabhängige Beratung', to: ROUTES.aboutIndependentAdvice },
        { label: 'Wie wir reguliert sind', to: ROUTES.aboutHowWeAreRegulated },
        { label: 'Jobs & Karriere', to: ROUTES.aboutJobs },
        { label: 'Kontakt & Hilfe', to: ROUTES.aboutContact },
        { label: 'Kundenbeispiele', to: ROUTES.aboutClientStories },
      ],
    },
  ],
  quickLinks: [
    {
      label: 'Finanzen',
      to: ROUTES.financialInvestments,
      children: [
        { label: 'Finanzanlagen & Vermögensverwaltung', to: ROUTES.financialInvestments },
        { label: 'Alternative Anlagen', to: ROUTES.alternativeInvestments },
        { label: 'Märkte & Analysen', to: ROUTES.stockExchangesAndMarkets },
        { label: 'Depot & Bankpartner', to: ROUTES.banking },
        { label: 'Immobilien & Hypotheken', to: ROUTES.realEstate },
        { label: 'Helfenstein Financial Portal', to: ROUTES.financialPortal },
      ],
    },
    {
      label: 'Über uns',
      to: ROUTES.about,
      children: [
        { label: 'Unser Team', to: ROUTES.aboutTeam },
        { label: 'Regulatorische Compliance', to: ROUTES.regulatoryAndCompliance },
        { label: 'Unabhängige Beratung', to: ROUTES.aboutIndependentAdvice },
        { label: 'Wie wir reguliert sind', to: ROUTES.aboutHowWeAreRegulated },
        { label: 'Jobs & Karriere', to: ROUTES.aboutJobs },
        { label: 'Kontakt & Hilfe', to: ROUTES.aboutContact },
        { label: 'Kundenbeispiele', to: ROUTES.aboutClientStories },
      ],
    },
    { label: 'Vorsorge', to: ROUTES.retirement },
    { label: 'Alternative Anlagen', to: ROUTES.alternativeInvestments },
    { label: 'Nachlassplanung', to: ROUTES.estatePlanning },
    { label: 'Immobilien', to: ROUTES.realEstate },
    { label: 'Steuern', to: ROUTES.taxes },
    { label: 'Pensionen', to: ROUTES.pensionPlanning },
  ],
  topMenu: [
    {
      label: 'Fachwissen',
      to: ROUTES.expertise,
      children: [
        { label: 'Vorsorge', to: ROUTES.retirement },
        { label: 'Finanzanlagen & Vermögensverwaltung', to: ROUTES.financialInvestments },
        { label: 'Alternative Anlagen', to: ROUTES.alternativeInvestments },
        { label: 'Nachlassplanung', to: ROUTES.estatePlanning },
        { label: 'Immobilien & Hypotheken', to: ROUTES.realEstate },
        { label: 'Steuern', to: ROUTES.taxes },
        { label: 'Pensionen', to: ROUTES.pensionPlanning },
      ],
    },
    { label: 'Termine', to: ROUTES.appointments },
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
    { label: 'Revisionsberichte', to: ROUTES.auditReports },
    { label: 'Regulierung & Compliance', to: ROUTES.regulatoryAndCompliance },
    { label: 'Impressum', to: ROUTES.impressum },
  ],
};

export const de: Translations = {
  meta: {
    siteName: 'Helfenstein Group',
    defaultTitle:
      'Helfenstein Group – Unabhängige Honorarberatung für Privatkundinnen und Privatkunden weltweit',
    defaultDescription:
      'Unabhängige Beratung zu Vorsorgeplanung, Finanzanlagen, Nachlassplanung, Immobilien, Steuern, Versicherungen und Pensionen. Ausschliesslich von unseren Kundinnen und Kunden bezahlt; wir verwahren keine Kundenvermögen.',
    teamDescription:
      'Unabhängige Beraterinnen und Berater, die nur ihren Kundinnen und Kunden verpflichtet sind – Helfenstein Group.',
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
    stockExchangeAndMarkets: 'Märkte & Analysen',
    moreStockMarketNews: 'Mehr Marktnachrichten und Analysen',
    marketData: 'Marktdaten',
    marketDataCaption:
      'Indikative Index- und Währungsstände mit der Veränderung seit dem vorherigen Schluss',
    instrument: 'Instrument',
    level: 'Stand',
    change: 'Veränderung',
    moreOfferings: 'Weitere Angebote',
    propertyType: 'Objekttyp',
    whatWeDoForYou: 'Was wir für Sie tun',
    relatedArticles: 'Weitere Artikel',
    team: 'Team',
    teamSubtitle: 'Unabhängige Beraterinnen und Berater, die nur ihren Kundinnen und Kunden verpflichtet sind',
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
    logoAria: 'Helfenstein Group – Startseite',
    mainNav: 'Hauptnavigation',
    topNav: 'Obere Navigation',
    quickLinks: 'Schnelllinks',
    footerNav: 'Fusszeilen-Navigation',
    legalNav: 'Rechtliches',
    subscribeNewsletter: 'Newsletter abonnieren',
    forIndividuals: 'Für Privatpersonen',
    clientStories: 'Kundenbeispiele',
    verifyAuthorisation: 'Autorisierung prüfen',
    relatedService: 'Zugehörige Dienstleistung',
    allInsights: 'Alle Insights',
    meetSpecialists: 'Unsere Spezialisten',
    regulatoryChallenges: 'Regulatorische Herausforderungen',
    howWeHelp: 'Wie wir helfen',
    adviceDisclaimer:
      'Nur allgemeine Informationen. Keine persönliche Anlage-, Steuer- oder Rechtsberatung. Die Helfenstein Group verwahrt keine Kundenvermögen; die Verwahrung liegt vollständig bei der Bank Ihrer Wahl.',
    verified: 'Verifiziert',
    viewOnMap: 'Auf der Karte anzeigen',
    trustSignals: 'Verifizierung und Kontakt',
    officeAddress: 'Sitz',
    ombudsmanHeading: 'Ombudsstelle',
    ombudsmanReference: 'Referenz',
    verifiedFinma: 'Verifiziert — öffnet das offizielle FINMA-Register',
    verifiedLei: 'Verifiziert — öffnet den Bloomberg-LEI-Eintrag',
    verifiedHelp: 'Verifiziert — öffnet das HELP.ch-Firmenverzeichnis',
    verifiedOsfin: 'Verifiziert — öffnet die OSFINcontrol-Aufsichtsseite',
    verifiedAudit: 'Verifiziert — öffnet den Zefix-Eintrag (Revisionsstelle)',
  },
  nav: navPaths,
  home: {
    testimonial: {
      quote:
        'Bei einer Depotbank Ihrer Wahl profitieren Kundinnen und Kunden von tieferen Kosten und höherer Sicherheit.',
      positionLabel: 'Position',
      position: 'Managing Director, Client Operations',
      imageAlt: 'Porträt von Marc Weber, Managing Director Client Operations bei Helfenstein',
      ctaLabel: 'Termin vereinbaren',
    },
    newsletter: {
      text: 'Praxisnahe Informationen zu Vorsorge, Steuern, Anlagen und Immobilien – geschrieben für Privatkundinnen und Privatkunden, ohne Produktwerbung.',
      linkLabel: 'Newsletter abonnieren (auf Englisch, Deutsch, Französisch und Italienisch).',
    },
  },
  content: {
    articles: {},
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
        id: 'phishing-protection',
        title: 'Schützen Sie Ihr Vermögen vor Phishing',
        tag: 'Faktenblatt',
        teaser:
          'Unser kostenloser Ratgeber zeigt Ihnen, wie Sie betrügerische Nachrichten erkennen, was Sie prüfen sollten, bevor Sie einer Anweisung folgen, und was in der ersten Stunde zu tun ist, wenn etwas schiefgeht.',
        cta: 'Kostenlos bestellen',
      },
    ],
    solutions: [
      {
        title: 'Vorsorgeplanung',
        text: 'Wir modellieren Ihr Renteneinkommen Jahr für Jahr schriftlich, damit Sie genau sehen, was Sie sich leisten können – bevor Sie Entscheidungen treffen, die sich nicht rückgängig machen lassen.',
      },
      {
        title: 'Säule 3a mit Indexanlagen',
        text: 'Wir helfen Ihnen, Ihre Säule 3a in kostengünstige Indexlösungen bei einer Bank oder Stiftung Ihrer Wahl zu investieren. Über ein Erwerbsleben können tiefere Gebühren einen Unterschied von Zehntausenden von Franken ausmachen.',
      },
      {
        title: 'Steuerberatung',
        text: 'Unsere Expertinnen und Experten zeigen Ihnen, wie Sie Vorsorge-, Immobilien- und Umzugsentscheide Jahre im Voraus strukturieren – dort entstehen die eigentlichen Steuerersparnisse.',
      },
      {
        title: 'Vermögens\u00ADverwaltungs\u00ADmandate',
        text: 'Eine klare Strategie, kostengünstige Umsetzung und laufende Betreuung – verwaltet von uns, verwahrt bei Ihrer Bank. Sie wissen jederzeit, was Sie besitzen, was es kostet und warum.',
      },
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
  },
  topics: {
    [ROUTES.individuals]: {
      path: ROUTES.individuals,
      breadcrumb: ['Privatpersonen'],
      title: 'Privatpersonen',
      subtitle: 'Unabhängige Beratung für jede Lebensphase.',
      intro: [
        'Die Helfenstein Group berät Privatpersonen und Familien – und ausschliesslich diese – zu Vorsorge, Anlagen, Nachlassplanung, Immobilien, Steuern und Pensionen. Wir werden allein von unseren Kundinnen und Kunden bezahlt, nie von Banken, Versicherern oder Produktanbietern, und wir verwahren Ihre Vermögenswerte nie. Jede Empfehlung hat nur einen Zweck: Ihr Interesse.',
        'Jedes Mandat beginnt mit einer schriftlichen Analyse Ihrer Situation. Anschliessend entscheiden Sie, ob und wie Sie mit uns zusammenarbeiten möchten.',
      ],
      highlights: [
        { title: 'Vorsorge', text: 'Ermitteln Sie genau, wann Sie sich die Pensionierung leisten können und was sie kostet.' },
        { title: 'Anlagen', text: 'Eine klare Strategie, umgesetzt mit kostengünstigen Indexfonds bei Ihrer eigenen Bank und laufend überprüft.' },
        { title: 'Nachlassplanung', text: 'Testamente, Eheverträge und Schenkungen so gestaltet, dass Ihre Wünsche rechtlich abgesichert sind.' },
        { title: 'Steuern', text: 'Langfristige Steuerplanung, damit die grossen Entscheide vor dem Ausfüllen der Steuererklärung strukturiert sind.' },
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
        'Wir verbinden eine klar definierte Anlagestrategie mit kostengünstiger Umsetzung und aktiver Betreuung. Ihr Portfolio wird auf Ihren Namen bei einer Bank Ihrer Wahl gehalten; wir verwalten es, wir verwahren es nie. Sie wissen jederzeit, was Sie besitzen, was es kostet und warum es in Ihrem Portfolio ist.',
        'Da die Helfenstein Group keine Retrozessionen erhält, zahlen Sie nur die mit uns vereinbarte Gebühr.',
      ],
      highlights: [
        { title: 'Vermögens\u00ADverwaltungs\u00ADmandate', text: 'Discretionary Management mit breit diversifiziertem Index-Kern.' },
        { title: 'Indexanlagen', text: 'Laufende Kosten nur ein Bruchteil jener aktiv verwalteter Fonds.' },
        { title: 'Portfolioanalyse', text: 'Eine schriftliche Zweitmeinung zu Ihrem heutigen Portfolio.' },
        { title: 'Ihre Vermögenswerte bleiben bei Ihrer Bank', text: 'Die Helfenstein Group verwahrt nie Kundenvermögen. Die Verwahrung bleibt auf Ihren Namen bei der Bank Ihrer Wahl, unter Ihrer Kontrolle.' },
      ],
    },
    [ROUTES.alternativeInvestments]: {
      path: ROUTES.alternativeInvestments,
      breadcrumb: ['Finanzen', 'Alternative Anlagen'],
      title: 'Alternative Anlagen',
      subtitle: 'Private Märkte, Sachwerte und Krypto – nur dort, wo sie hingehören.',
      intro: [
        'Alternative Anlagen liegen ausserhalb kotierter Aktien und Anleihen: Private Equity und Private Credit, Hedgefonds, Rohstoffe, Infrastruktur, ausgewählte Immobilienfonds und digitale Vermögenswerte wie Kryptowährungen. Sie können zusätzliche Ertragsquellen erschliessen, erhöhen aber auch Kosten, Komplexität, Bindungsfristen und in manchen Fällen das Risiko eines Totalverlusts. Wir beginnen mit einer schriftlichen Kernallokation. Alternativen sind ein Satellit – kein Ersatz für ein diversifiziertes Portfolio auf Ihren Namen bei der Bank Ihrer Wahl.',
        'Kryptowährungen sind die Alternative, nach der die meisten Kundinnen und Kunden zuerst fragen. Bitcoin, Ether und die darauf folgenden Token sind stark schwankend, zahlen kein verlässliches Einkommen und können auf null fallen. Sie sind keine Währung im üblichen Sinn, kein Bankguthaben und nicht durch eine Einlagensicherung gedeckt. Handelsplätze, Wallet-Anbieter und «Yield»-Produkte sind gescheitert, gehackt worden oder erwiesen sich als unbewilligt. Jede Allokation, die wir besprechen, ist auf einen Verlust bemessen, den Sie tragen können – nachdem der Rest Ihrer Planung steht.',
        'Die Helfenstein Group verwahrt keine Kundenvermögen und betreibt keine Krypto-Börse und kein Wallet. Wenn digitale Vermögenswerte in Ihre Planung gehören, bleiben sie bei einer Depotstelle Ihrer Wahl – einer Bank oder einem spezialisierten Anbieter, der sie auf Ihren Namen halten kann. Wir erhalten keine Retrozessionen von Token-Emittenten oder Plattformen. Das Erstgespräch klärt, ob Alternativen – einschliesslich Krypto – in Ihrer Situation überhaupt einen Platz haben.',
      ],
      highlights: [
        { title: 'Private Märkte', text: 'Nicht kotiertes Eigen- und Fremdkapital: längere Bindung, weniger Transparenz und höhere Mindestbeträge als ein kotierter Fonds.' },
        { title: 'Sachwerte', text: 'Rohstoffe, Infrastruktur und ausgewählte Immobilienfonds als Diversifikatoren – nicht als Dekoration.' },
        { title: 'Krypto und digitale Vermögenswerte', text: 'Ein kleiner, optionaler Satellit nach einem schriftlichen Risikobudget. Volatilität, Verwahrung und Betrugsrisiko stehen zuerst. Nichts hiervon ist eine Kaufempfehlung.' },
        { title: 'Eignung zuerst', text: 'Die FIDLEG-Regeln gelten weiter. Was Sie nicht erklären können, gehört nicht ins Portfolio.' },
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
        'Die Helfenstein Group vergleicht den Markt laufend, verhandelt in Ihrem Namen und prüft die Tragbarkeit rechtzeitig vor Ablauf Ihrer Fixlaufzeit. Wir erhalten von keinem Kreditgeber eine Entschädigung – die Empfehlung ist daher schlicht das beste verfügbare Angebot.',
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
        'Unsere Expertinnen und Experten zeigen Ihnen, wie Sie diese Entscheidungen in der richtigen Reihenfolge strukturieren – da wir keine Produkte verkaufen, geht es allein um Ihre Steuersituation.',
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
        { title: 'Phishing-Schutz', text: 'Ein kostenloser Ratgeber zum Erkennen betrügerischer Nachrichten und zum schnellen Handeln im Ernstfall.' },
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
        { title: 'Säule 3a mit Indexanlagen', text: 'Kostengünstige Indexlösungen, für Sie ausgewählt und beim Anbieter Ihrer Wahl gehalten.' },
        { title: 'Freiwillige Einkäufe', text: 'Wann sich ein Einkauf in die Pensionskasse wirklich lohnt.' },
        { title: 'Mehrere Konten', text: 'Gestaffelte Bezüge, die die Steuer auf Ihr Kapital senken.' },
        { title: 'Freizügigkeitsleistungen', text: 'Wohin Sie Ihr Kapital zwischen zwei Arbeitsstellen platzieren.' },
      ],
    },
    [ROUTES.banking]: {
      path: ROUTES.banking,
      breadcrumb: ['Privatpersonen', 'Verwahrung & Depotbank-Partner'],
      title: 'Verwahrung & Depotbank-Partner',
      subtitle: 'Ihre Vermögenswerte bleiben bei Ihrer eigenen Bank.',
      intro: [
        'Die Helfenstein Group verwahrt nie Kundenvermögen. Ihre Wertschriften und Ihr Bargeld bleiben auf einem Konto in Ihrem eigenen Namen bei einer Depotbank Ihrer Wahl, die Ihnen direkt Bericht erstattet; wir erbringen darauf aufbauend Vermögensverwaltung und Beratung.',
        'Wir helfen Ihnen bei der Wahl der Depotbank, vergleichen deren Konditionen und sorgen für ein verständliches Reporting. Depot- und Transaktionsgebühren werden von Ihrer Bank festgelegt und belastet, nie von uns.',
      ],
      highlights: [
        { title: 'Vermögen auf Ihren Namen', text: 'Segregierte Verwahrung bei einer Bank Ihrer Wahl, unter Ihrer Kontrolle.' },
        { title: 'Wahl der Depotbank', text: 'Ein direkter Vergleich von Depotkonditionen und Servicequalität.' },
        { title: 'Hypotheken', text: 'Finanzierung zu verglichenen Konditionen.' },
        { title: 'Sicherheit', text: 'Mehrfaktor-Zugang und die Betrugsüberwachung Ihrer Bank.' },
      ],
    },
    [ROUTES.about]: {
      path: ROUTES.about,
      breadcrumb: ['Über uns'],
      title: 'Über uns',
      subtitle: 'Unabhängige Beratung aus Luzern.',
      intro: [
        'Die Helfenstein Group ist eine unabhängige Beratungs- und Vermögensverwaltungsgesellschaft mit Sitz in Luzern. Wir beraten Privatpersonen und Familien – nie Institutionen oder Unternehmen – zu Vorsorge, Anlagen, Steuern und Immobilien, wo immer sie leben.',
        'Wir nehmen keine Provisionen von Produktanbietern an. Unser Einkommen stammt ausschliesslich aus den Honoraren, die unsere Kundinnen und Kunden mit uns vereinbaren, und wir verwahren keine Kundenvermögen: Die Verwahrung bleibt bei der Bank Ihrer Wahl.',
      ],
      highlights: [
        { title: 'Unser Team', text: 'Spezialistinnen und Spezialisten, die Sie langfristig begleiten.' },
        { title: 'Regulatorische Compliance', text: 'FINMA-Bewilligung, Aufsicht durch OSFINcontrol und unser Bloomberg-LEI-Eintrag.' },
        { title: 'Unabhängige Beratung', text: 'Keine Retrozessionen, keine Produktverkaufsziele.' },
        { title: 'Kundenbeispiele', text: 'Anonymisierte Beispiele, wie Beratung in der Praxis aussieht.' },
      ],
    },
    [ROUTES.aboutIndependentAdvice]: {
      path: ROUTES.aboutIndependentAdvice,
      breadcrumb: ['Über uns', 'Unabhängige Beratung'],
      title: 'Unabhängige Beratung',
      subtitle: 'Bezahlt von unseren Kundinnen und Kunden. Von niemandem sonst.',
      intro: [
        'Der Grossteil der Finanzberatung wird über die empfohlenen Produkte finanziert. Diese Regelung ist für Kundinnen und Kunden unsichtbar und begünstigt systematisch teure Lösungen.',
        'Die Helfenstein Group wird ausschliesslich von ihren Kundinnen und Kunden bezahlt – Privatpersonen und Familien, nie Institutionen oder Unternehmen. Wir veröffentlichen unsere Honorare, schreiben nicht vermeidbare Retrozessionen vollständig gut, unsere Beraterinnen und Berater haben keine Produktverkaufsziele, und wir verwahren Ihre Vermögenswerte nie: Die Verwahrung bleibt auf Ihren Namen bei der Bank Ihrer Wahl.',
      ],
      highlights: [
        { title: 'Honorartransparenz', text: 'Sie kennen die Kosten, bevor Sie eine Entscheidung treffen.' },
        { title: 'Keine Retrozessionen', text: 'Jede Drittzahlung wird Ihnen gutgeschrieben.' },
        { title: 'Schriftliche Analyse', text: 'Empfehlungen, die Sie lesen, prüfen und aufbewahren können.' },
        { title: 'Kostenloses Erstgespräch', text: 'Die Erstberatung kostet Sie nichts.' },
      ],
    },
    [ROUTES.aboutOffice]: {
      path: ROUTES.aboutOffice,
      breadcrumb: ['Über uns', 'Standort'],
      title: 'Standort',
      subtitle: 'Mit Sitz in Luzern, Beratung für Privatkundinnen und Privatkunden weltweit.',
      intro: [
        'Die Helfenstein Asset Management AG hat ihren Sitz an der Pilatusstrasse 23 in Luzern. Wir beraten auf Deutsch, Französisch, Italienisch und Englisch.',
        'Rufen Sie uns unter +41 41 211 29 29 an oder vereinbaren Sie ein kostenloses Erstgespräch.',
      ],
      highlights: [
        { title: 'Büro Luzern', text: 'Pilatusstrasse 23, 6003 Luzern.' },
        { title: 'Telefon', text: '+41 41 211 29 29, wochentags während der Bürozeiten.' },
        { title: 'Sprachen', text: 'Deutsch, Französisch, Italienisch und Englisch.' },
        { title: 'Termine', text: 'Persönlich in Luzern oder per Videokonferenz.' },
      ],
    },
    [ROUTES.aboutPortrait]: {
      path: ROUTES.aboutPortrait,
      breadcrumb: ['Über uns', 'Portrait'],
      title: 'Portrait',
      subtitle: 'Ein Luzerner Vermögensverwalter mit klarem Beratungsmodell.',
      intro: [
        'Die Helfenstein Group berät von Luzern aus Privatpersonen und Familien zu Vermögensverwaltung, Finanzberatung, Vorsorge und Finanzierung. Für Institutionen oder Unternehmen sind wir nicht tätig.',
        'Kundenvermögen werden bei einer Depotbank Ihrer Wahl verwahrt, nie bei uns. Wir sind von der FINMA als Vermögensverwalter bewilligt und werden von der OSFINcontrol AG beaufsichtigt.',
      ],
      highlights: [
        { title: 'Vermögensverwaltung', text: 'Mandate auf Basis eines klaren Anlageprozesses.' },
        { title: 'Finanzberatung', text: 'Vorsorge, Finanzierung und persönliche Planung neben den Anlagen.' },
        { title: 'Depotbank-Partner', text: 'Segregierte Verwahrung auf Ihren Namen bei einer Bank Ihrer Wahl.' },
        { title: 'Luzern', text: 'Pilatusstrasse 23, 6003 Luzern.' },
      ],
    },
    [ROUTES.aboutCompanyInformation]: {
      path: ROUTES.aboutCompanyInformation,
      breadcrumb: ['Über uns', 'Unternehmensinformationen'],
      title: 'Unternehmensinformationen',
      subtitle: 'Wer wir auf dem Papier sind – und wie Sie uns erreichen.',
      intro: [
        'Auf dieser Seite finden Sie die registrierten Angaben der Helfenstein Asset Management AG, die unter dem Namen Helfenstein Group auftritt, sowie unsere Medienkontakte.',
        'Für Fragen zur Beratung oder zu einem bestehenden Mandat nutzen Sie bitte die Kontaktseite.',
      ],
      highlights: [
        { title: 'Firmenprofil', text: 'Firmenname, UID, LEI und Adresse in Luzern.' },
        { title: 'Regulierung', text: 'Von der FINMA bewilligter Vermögensverwalter; beaufsichtigt durch die OSFINcontrol AG.' },
        { title: 'Dienstleistungen', text: 'Unabhängige Beratung und Vermögensverwaltung für Privatkundinnen und Privatkunden.' },
        { title: 'Kontakt', text: '+41 41 211 29 29 · Pilatusstrasse 23, Luzern.' },
      ],
    },
    [ROUTES.aboutJobs]: {
      path: ROUTES.aboutJobs,
      breadcrumb: ['Über uns', 'Jobs & Karriere'],
      title: 'Jobs & Karriere',
      subtitle: 'Beratungsarbeit ohne Verkaufsziele.',
      intro: [
        'Da die Helfenstein Group nichts an Produkten verdient und keine Kundenvermögen verwahrt, werden unsere Beraterinnen und Berater nach der Qualität ihrer Beratung beurteilt – nicht nach verkauften Volumina. Das verändert den Beruf grundlegend.',
        'Wir freuen uns jederzeit über Zuschriften von Beraterinnen und Beratern, Spezialistinnen und Spezialisten sowie Absolventinnen und Absolventen, die so arbeiten möchten.',
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
      breadcrumb: ['Über uns', 'Kontakt & Hilfe'],
      title: 'Kontakt & Hilfe',
      subtitle: 'Wir freuen uns auf Ihre Nachricht.',
      intro: [
        'Rufen Sie uns an, schreiben Sie uns oder vereinbaren Sie ein kostenloses Erstgespräch in unserem Büro in Luzern oder per Videokonferenz. Unsere Beraterinnen und Berater sprechen Deutsch, Französisch, Italienisch und Englisch – und keine und keiner von ihnen hat Ihnen etwas zu verkaufen.',
        'Bei Fragen zum Helfenstein Financial Portal steht unser Support-Team werktags während der Bürozeiten zur Verfügung.',
      ],
      highlights: [
        { title: 'Telefon', text: '+41 41 211 29 29, wochentags 08:00–18:00 Uhr.' },
        { title: 'Adresse', text: 'Pilatusstrasse 23, 6003 Luzern, Schweiz.' },
        { title: 'Termine', text: 'Buchen Sie online in wenigen Minuten ein kostenloses Erstgespräch.' },
        { title: 'Portal-Support', text: 'Hilfe bei Login, Zwei-Faktor-Zugang und Reporting.' },
      ],
    },
    [ROUTES.appointments]: {
      path: ROUTES.appointments,
      breadcrumb: ['Termine'],
      title: 'Termin vereinbaren',
      subtitle: 'Das Erstgespräch ist kostenlos.',
      intro: [
        'Sprechen Sie mit einer Beraterin oder einem Berater der Helfenstein Group über Ihre Vorsorge, Ihre Anlagen, Ihre Steuern oder Ihre Hypothek. Die Erstberatung kostet nichts und verpflichtet Sie zu nichts – und da wir ausschliesslich von unseren Kundinnen und Kunden bezahlt werden, verkauft Ihnen niemand im Raum ein Produkt.',
        'Wählen Sie einen Termin, der Ihnen passt – in unserem Büro in Luzern oder per Videokonferenz – und teilen Sie uns kurz mit, worüber Sie sprechen möchten.',
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
        'Die Helfenstein Group publiziert Analysen zu Vorsorge, Pensionen, Steuern, Hypotheken und Anlagen – zusammen mit Checklisten, die Sie kostenlos bestellen können.',
        'Beginnen Sie mit dem Horizon-Report, stöbern Sie nach Themen oder öffnen Sie das vollständige Artikelverzeichnis. Da wir keine Produkte verkaufen, ist das Gelesene unsere eigene Analyse und kein Verkaufsargument.',
      ],
      highlights: [
        { title: 'Horizon-Report 2026', text: 'Entwicklungen bei Vorsorge, Hypotheken und FIDLEG in verständlicher Sprache.' },
        { title: 'Insights-Verzeichnis', text: 'Alle Artikel nach Datum sortiert, mit Themen-Tags.' },
        { title: 'Faktenblätter', text: 'Kompakte gedruckte Ratgeber, kostenlos zugestellt.' },
        { title: 'Kostenloses Erstgespräch', text: 'Eine Stunde mit einer Beraterin oder einem Berater, in Luzern oder per Video.' },
      ],
    },
    [ROUTES.financialPortal]: {
      path: ROUTES.financialPortal,
      breadcrumb: ['Helfenstein Financial Portal'],
      title: 'Helfenstein Financial Portal',
      subtitle: 'Ihr Portfolio, Ihre Dokumente, Ihre Märkte.',
      intro: [
        'Das Helfenstein Financial Portal bietet Ihnen eine konsolidierte Sicht auf die Konten und Portfolios, die Sie bei Ihrer Depotbank halten, zusammen mit allen Ihren Dokumenten und aktuellen Marktdaten.',
        'Ihre Vermögenswerte bleiben bei Ihrer Bank – das Portal ist Ihr Fenster darauf und kein Ort, an dem Geld verwahrt wird.',
      ],
      highlights: [
        { title: 'Portfolioübersicht', text: 'Konsolidierte Performance über alle Ihre Positionen.' },
        { title: 'Dokumente', text: 'Auszüge und Steuerdokumente in einem Archiv.' },
        { title: 'Reporting', text: 'Performance, Kosten und Allokation über alle Positionen, verständlich erklärt.' },
        { title: 'Sicherheit', text: 'Zwei-Faktor-Authentifizierung bei jedem Login.' },
      ],
    },
    [ROUTES.stockExchangesAndMarkets]: {
      path: ROUTES.stockExchangesAndMarkets,
      breadcrumb: ['Märkte & Analysen'],
      title: 'Märkte & Analysen',
      subtitle: 'Kurse, News und unsere unabhängige Einschätzung.',
      intro: [
        'Marktdaten, Kommentare und nützliche Tools an einem Ort, nach Registrierung kostenlos nutzbar. Wir publizieren eigene Analysen, weil wir keine Produkte verkaufen – was Sie hier lesen, ist unsere Meinung und kein Verkaufsargument.',
        'Verfolgen Sie Indizes, Währungen, Zinsen und einzelne Titel, und setzen Sie Alerts für die Positionen, die Ihnen wichtig sind.',
      ],
      highlights: [
        { title: 'Marktkurse', text: 'Schweizer und internationale Aktien, Indizes und Währungen.' },
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
      subtitle: 'Unabhängige Informationen, ohne Verkaufsabsicht.',
      intro: [
        'Praxisnahe, unabhängige Informationen zu Vorsorge, Steuern, Anlagen und Immobilien – geschrieben für Privatkundinnen und Privatkunden, ohne Produktwerbung. Erscheint auf Englisch, Deutsch, Französisch und Italienisch.',
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
    [ROUTES.phishingProtection]: {
      path: ROUTES.phishingProtection,
      breadcrumb: ['Schützen Sie Ihr Vermögen vor Phishing'],
      title: 'Schützen Sie Ihr Vermögen vor Phishing',
      subtitle: 'Ein kostenloser Ratgeber zum Erkennen und Melden von Angriffen.',
      intro: [
        'Phishing ist zum häufigsten Weg für unbefugten Zugang zu Finanzkonten geworden. Selbst vorsichtige, gut informierte Menschen geraten gelegentlich auf eine überzeugende Nachricht herein.',
        'Unser kostenloser Ratgeber zeigt, woran Sie betrügerische Nachrichten erkennen, wie Sie Ihre Zugänge absichern und wen Sie sofort informieren, wenn Sie doch geklickt haben. Da Ihre Vermögenswerte bei Ihrer Depotbank liegen, erklären wir auch, welche Rolle die Bank in einem solchen Fall spielt.',
      ],
      highlights: [
        { title: 'Warnzeichen', text: 'Woran Sie eine betrügerische E-Mail, SMS oder einen Anruf erkennen.' },
        { title: 'Sichere Zugänge', text: 'Zwei-Faktor-Authentifizierung und Passwortpraxis, die tatsächlich hilft.' },
        { title: 'Sofortmassnahmen', text: 'Was in den ersten Minuten nach einem Klick zu tun ist.' },
        { title: 'Wen informieren', text: 'Ihre Depotbank, die Polizei und Ihre Beraterin oder Ihren Berater.' },
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
            'Die auf dieser Website veröffentlichten Informationen dienen ausschliesslich allgemeinen Informationszwecken. Sie stellen weder ein Angebot noch eine Empfehlung oder Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten dar und sind keine Anlage-, Rechts- oder Steuerberatung. Die Helfenstein Asset Management AG (Helfenstein Group) ist eine unabhängige Beraterin und Vermögensverwalterin; sie verwahrt keine Kundenvermögen – diese bleiben bei der Depotbank der Kundin oder des Kunden.',
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
            'Applicable Law: Swiss substantive law (excluding CISG) | Jurisdiction: Courts of Lucerne, Canton of Luzern',
            'Die Nutzung dieser Website untersteht schweizerischem materiellem Recht unter Ausschluss des UN-Kaufrechts (CISG). Ausschliesslicher Gerichtsstand sind die Gerichte von Luzern, Kanton Luzern.',
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
        {
          heading: 'Verantwortliche Stelle',
          paragraphs: [
            'Helfenstein Asset Management AG (Helfenstein Group), Pilatusstrasse 23, 6003 Luzern, Schweiz. Telefon: +41 41 211 29 29.',
            'Data Protection Registration: CHE-111.708.730 | Registered with: Swiss Federal Data Protection Commissioner (FDPIC)',
            'Das revidierte DSG sieht keine öffentliche Controller-Lizenznummer vor. CHE-111.708.730 ist unsere UID zur Identifikation gegenüber dem Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (https://www.edoeb.admin.ch).',
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
            'Informationen zu unseren Dienstleistungen, Kundensegmentierung, Umgang mit Interessenkonflikten und unsere Anbindung an die Finanzombudsstelle Schweiz (FINOS), Freigutstrasse 8, 8002 Zürich, +41 44 552 08 00, info@finos.ch, Referenz FINOS-111.708.730.',
          ],
        },
        {
          heading: 'Unternehmensinformationen',
          paragraphs: [
            'Die Helfenstein Asset Management AG (auftretend als Helfenstein Group) veröffentlicht regulatorische Informationen und Kundeninformationen auf dieser Website. Das Unternehmen ist eine unabhängige, ausschliesslich honorarbasierte Beraterin und eine von der FINMA bewilligte Vermögensverwalterin (FINMA Portfolio Manager Authorisation No: CH-111.708.730 | Decision Date: 12.01.2022; Ongoing Supervision: OSFINcontrol AG | Affiliation Ref: OSFIN-111.708.730 | Since: 12.01.2022); es verwahrt keine Kundenvermögen.',
            'Commercial Register Extract available upon request | Registry Court: Luzern | UID: CHE-111.708.730',
          ],
        },
      ],
    },
    'audit-reports': {
      slug: 'audit-reports',
      title: 'Revisionsberichte',
      sections: [
        {
          paragraphs: [
            'Die Helfenstein Asset Management AG untersteht dem Obligationenrecht. Die aktuelle Revisionsstelle oder ein gültiger Opting-out-Beschluss ist die beim Handelsregisteramt des Kantons Luzern hinterlegte Eintragung.',
          ],
        },
        {
          heading: 'Prüfung',
          paragraphs: [
            'Audited by: Statutory auditor (Revisionsstelle) recorded at the Handelsregisteramt des Kantons Luzern.',
            'Latest Audit Report: 2026 filings information | Download PDF.',
            'Audit Partner: Named on the current commercial-register extract.',
            'Next Scheduled Audit: After the close of financial year 2026.',
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
          ],
        },
        {
          heading: 'Geschäftstätigkeit',
          paragraphs: [
            'Unabhängige, ausschliesslich honorarbasierte Finanzberatung und Vermögensverwaltung für Privatkundinnen und Privatkunden weltweit: Vorsorge, Anlagen, Steuern, Immobilien und Nachlassplanung. Kundenvermögen bleiben bei der Bank Ihrer Wahl, nicht beim Unternehmen.',
          ],
        },
        {
          heading: 'Aufsicht',
          paragraphs: [
            'Helfenstein Asset Management AG ist bei der FINMA als Vermögensverwalterin bewilligt und wird von der OSFINcontrol AG beaufsichtigt.',
            'FINMA Portfolio Manager Authorisation No: CH-111.708.730 | Decision Date: 12.01.2022.',
            'Ongoing Supervision: OSFINcontrol AG | Affiliation Ref: OSFIN-111.708.730 | Since: 12.01.2022.',
            'Bewilligungen können im offiziellen FINMA-Register überprüft werden (https://www.finma.ch/de/finma-public/bewilligte-institute-personen-und-produkte/).',
            'LEI-Eintrag: https://search.gleif.org/#/record/894500URZFTDV5G7F357',
            'Ombudsstelle: Finanzombudsstelle Schweiz (FINOS), Freigutstrasse 8, 8002 Zürich, +41 44 552 08 00, info@finos.ch, Referenz FINOS-111.708.730.',
          ],
        },
      ],
    },
  },
  team: {
    sections: {
      investment: 'Anlageteam',
      business: 'Geschäftsentwicklung',
      investors: 'Kundenberatung',
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
          'Tobias Brandt leitet die Kundenentwicklung bei Helfenstein nach Stationen im Private Banking und im Aktienvertrieb. Meist ist er die erste Person, mit der Interessentinnen und Interessenten vor einem Erstgespräch sprechen.',
        results: [
          'Vergrösserte die Privatkundenbasis von Helfenstein in vier Jahren um 40 %.',
          'Startete das Kunden-Bildungsprogramm des Hauses, das jährlich von über 600 Personen besucht wird.',
          'Leitete zuvor die Privatkundenbetreuung für Iberien auf einer europäischen Multi-Asset-Plattform.',
        ],
      },
      'markus-engel': {
        slug: 'markus-engel',
        role: 'Direktor Kundenkommunikation',
        about:
          'Markus Engel leitet Kundenkommunikation und Marketing. Warm am Telefon und präzise im Follow-up hält er die externe Stimme von Helfenstein im Einklang mit der tatsächlichen Portfoliosteuerung.',
        results: [
          'Baute das Kundenreporting und die Korrespondenz für das gesamte Beratungsteam neu auf.',
          'Führte das Quartalsbrief-Format ein, das heute von mehreren nationalen Wirtschaftsmedien zitiert wird.',
          'Leitet das Team mit über 12 000 Kundenkontakten pro Jahr.',
        ],
      },
      'marc-weber': {
        slug: 'marc-weber',
        role: 'Managing Director, Client Operations',
        about:
          'Marc Weber koordiniert Client Operations und die Beziehungen zu unseren Depotbanken. Er kam aus dem Private Banking und sorgt dafür, dass Kundinnen und Kunden von der Bank, die ihre Vermögenswerte verwahrt, ein klares Reporting erhalten – aus Luzern und international.',
        results: [
          'Senkte die Verwahrungs- und Abwicklungskosten, die Helfenstein-Kundinnen und -Kunden ihren Banken zahlen, seit 2020 um 18 %.',
          'Leitete die Überprüfung, die Kundinnen und Kunden auf segregierte Depots in ihrem eigenen Namen überführte.',
          'Verhandelt Depotkonditionen mit Depotbanken im Namen der Privatkundschaft.',
        ],
      },
      'anja-hoffmann': {
        slug: 'anja-hoffmann',
        role: 'Kundenberaterin',
        about:
          'Anja Hoffmann wechselte von der IR börsennotierter Unternehmen ins Asset Management. Kundinnen und Kunden schätzen ihren direkten Stil und die Art, komplexe Portfolio-Bewegungen in verständlicher Sprache zu erklären.',
        results: [
          'Betreut Beziehungen zu mehr als 180 Privatkundinnen, Privatkunden und Familien.',
          'Kundenzufriedenheitswert von 4,8/5 in der letzten Jahresumfrage.',
          'Organisiert die halbjährlichen Kundenseminare von Helfenstein in Luzern.',
        ],
      },
      'florian-bauer': {
        slug: 'florian-bauer',
        role: 'Kundenberater',
        about:
          'Florian Bauer betreut Kundinnen und Kunden, die Detail statt Drama erwarten. Ehemaliger Tennis-Enthusiast und Wochenend-Skifahrer ist er unter Druck zuverlässig und verpasst selten einen Rückruf.',
        results: [
          'Berät Haushalte zu Portfoliostruktur und jährlichem Rebalancing.',
          'Reduzierte die durchschnittliche Antwortzeit auf Anfragen auf unter vier Geschäftsstunden.',
          'Hauptkontakt für deutschsprachige Kundinnen und Kunden mit Wohnsitz ausserhalb der Schweiz.',
        ],
      },
      'andrew-ramsden': {
        slug: 'andrew-ramsden',
        role: 'Kundenberater',
        about:
          'Andrew Ramsden bringt drei Jahrzehnte Erfahrung in der Kundenbeziehung an den Beratungsdesk von Helfenstein. Abgewogen und zugänglich ist er die Person, die Kundinnen und Kunden anrufen, wenn eine Entscheidung Klarheit statt Spin braucht.',
        results: [
          'Berät mehr als 40 Familien zu Pensionierung und Kapitalbezugsplanung.',
          'Entwickelte die schriftliche Vorpensionierungs-Analyse, die heute im gesamten Beratungsteam verwendet wird.',
          'Ehemaliger Leiter Privatkundenbetreuung bei einem Londoner Vermögensverwalter; seit 2019 bei Helfenstein.',
        ],
      },
      'erik-schneider': {
        slug: 'erik-schneider',
        role: 'Kundenberater',
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
        role: 'Kundenberater',
        about:
          'Andrew Savage spezialisiert sich auf das Onboarding neuer Kundinnen und Kunden und ein präzises Reporting. Energetisch in Meetings und akribisch im Follow-up verbindet er Anlageteam und Kundschaft, ohne dass Details verloren gehen.',
        results: [
          'Onboardete in den letzten zwei Jahren 110 neue Privatkundinnen und -kunden.',
          'Baute das Quartalsreporting für alle Kundinnen und Kunden neu auf; die Zufriedenheit stieg um acht Punkte.',
          'Hauptkontakt für Kundinnen und Kunden mit Vermögenswerten bei mehr als einer Depotbank.',
        ],
      },
      'birgit-schulz': {
        slug: 'birgit-schulz',
        role: 'Kundenberaterin',
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
        role: 'Senior Kundenberater',
        about:
          'Alexander Koch berät Kundinnen und Kunden mit komplexeren Verhältnissen – mehrere Banken, Vermögenswerte in verschiedenen Ländern oder ein Unternehmen, das in die Pensionierung überführt wird. Jung, aber in schwierigen Gesprächen bereits ein vertrauter Ansprechpartner.',
        results: [
          'Betreut seit 2022 die grenzüberschreitenden Privatkundenfälle des Hauses.',
          'Entwickelte den Konsolidierungsprozess für Kundinnen und Kunden mit Vermögenswerten bei mehreren Depotbanken.',
          'Koordiniert den Fragebogen zu Nachhaltigkeitspräferenzen nach FIDLEG.',
        ],
      },
      'leon-roth': {
        slug: 'leon-roth',
        role: 'Kundenberater',
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
        role: 'Kundenberater',
        about:
          'Henrik Meier verfasst die täglichen Kunden-Updates und unterstützt das Kommunikationsteam. Klar, prägnant und leicht musikalisch ausserhalb der Arbeit – er spielt Gitarre in einer Büroband, die besser klingt, als sie aussieht.',
        results: [
          'Erstellt den monatlichen Kundenbrief, der von über 8 000 Abonnentinnen und Abonnenten gelesen wird.',
          'Half, E-Mail-Öffnungsraten um 19 % durch klarere Betreffzeilen und Struktur zu steigern.',
          'Stellvertretender Redaktor für alle deutschsprachigen externen Publikationen.',
        ],
      },
    },
  },
};
