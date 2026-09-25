import { ROUTES } from '../../constants/routes';
import type { Translations } from '../types';

const navPaths = {
  mainNavigation: [
    {
      label: 'Privati',
      to: ROUTES.individuals,
      children: [
        { label: 'Previdenza', to: ROUTES.retirement },
        { label: 'Investimenti finanziari e gestione del patrimonio', to: ROUTES.financialInvestments },
        { label: 'Investimenti alternativi', to: ROUTES.alternativeInvestments },
        { label: 'Pianificazione successoria', to: ROUTES.estatePlanning },
        { label: 'Immobili e ipoteche', to: ROUTES.realEstate },
        { label: 'Imposte', to: ROUTES.taxes },
      ],
    },
    {
      label: 'Chi siamo',
      to: ROUTES.about,
      children: [
        { label: 'Il nostro team', to: ROUTES.aboutTeam },
        { label: 'Conformità normativa', to: `${ROUTES.about}#regulatory-compliance` },
        { label: 'Consulenza indipendente', to: ROUTES.aboutIndependentAdvice },
        { label: 'Come siamo regolamentati', to: ROUTES.aboutHowWeAreRegulated },
        { label: 'Lavoro e carriera', to: ROUTES.aboutJobs },
        { label: 'Contatto e assistenza', to: ROUTES.aboutContact },
        { label: 'Storie di clienti', to: ROUTES.aboutClientStories },
      ],
    },
  ],
  quickLinks: [
    {
      label: 'Finanza',
      to: ROUTES.financialInvestments,
      children: [
        { label: 'Investimenti finanziari e gestione del patrimonio', to: ROUTES.financialInvestments },
        { label: 'Investimenti alternativi', to: ROUTES.alternativeInvestments },
        { label: 'Mercati e analisi', to: ROUTES.stockExchangesAndMarkets },
        { label: 'Custodia e partner bancari', to: ROUTES.banking },
        { label: 'Immobili e ipoteche', to: ROUTES.realEstate },
        { label: 'Portale finanziario Helfenstein', to: ROUTES.financialPortal },
      ],
    },
    {
      label: 'Chi siamo',
      to: ROUTES.about,
      children: [
        { label: 'Il nostro team', to: ROUTES.aboutTeam },
        { label: 'Conformità normativa', to: ROUTES.regulatoryAndCompliance },
        { label: 'Consulenza indipendente', to: ROUTES.aboutIndependentAdvice },
        { label: 'Come siamo regolamentati', to: ROUTES.aboutHowWeAreRegulated },
        { label: 'Lavoro e carriera', to: ROUTES.aboutJobs },
        { label: 'Contatto e assistenza', to: ROUTES.aboutContact },
        { label: 'Storie di clienti', to: ROUTES.aboutClientStories },
      ],
    },
    { label: 'Previdenza', to: ROUTES.retirement },
    { label: 'Investimenti alternativi', to: ROUTES.alternativeInvestments },
    { label: 'Pianificazione successoria', to: ROUTES.estatePlanning },
    { label: 'Immobili', to: ROUTES.realEstate },
    { label: 'Imposte', to: ROUTES.taxes },
    { label: 'Previdenza complementare', to: ROUTES.pensionPlanning },
  ],
  topMenu: [
    {
      label: 'Competenza',
      to: ROUTES.expertise,
      children: [
        { label: 'Previdenza', to: ROUTES.retirement },
        { label: 'Investimenti finanziari e gestione del patrimonio', to: ROUTES.financialInvestments },
        { label: 'Investimenti alternativi', to: ROUTES.alternativeInvestments },
        { label: 'Pianificazione successoria', to: ROUTES.estatePlanning },
        { label: 'Immobili e ipoteche', to: ROUTES.realEstate },
        { label: 'Imposte', to: ROUTES.taxes },
        { label: 'Previdenza complementare', to: ROUTES.pensionPlanning },
      ],
    },
    { label: 'Appuntamenti', to: ROUTES.appointments },
    { label: 'Insights', to: ROUTES.insights },
    { label: 'Portale finanziario Helfenstein', to: ROUTES.financialPortal },
  ],
  actionLinks: [
    { label: 'Lavoro', to: ROUTES.aboutJobs },
    { label: 'Contatto e assistenza', to: ROUTES.aboutContact },
    { label: 'Iscriversi alla newsletter', to: ROUTES.newsletter },
  ],
  legalLinks: [
    { label: 'Note legali', to: ROUTES.legalNotices },
    { label: 'Protezione dei dati', to: ROUTES.privacyPolicy },
    { label: 'Documenti e informazioni', to: ROUTES.documentsAndInformation },
    { label: 'Relazioni di revisione', to: ROUTES.auditReports },
    { label: 'Regolamentazione e conformità', to: ROUTES.regulatoryAndCompliance },
    { label: 'Impressum', to: ROUTES.impressum },
  ],
};

export const it: Translations = {
  meta: {
    siteName: 'Helfenstein Group',
    defaultTitle:
      'Helfenstein Group – Consulenza indipendente a onorario per la clientela privata nel mondo',
    defaultDescription:
      'Consulenza indipendente su previdenza, investimenti finanziari, pianificazione successoria, immobili, imposte, assicurazioni e casse pensione. Siamo remunerati soltanto dai nostri clienti e non deteniamo patrimoni della clientela.',
    teamDescription:
      'Consulenti indipendenti che rispondono soltanto ai propri clienti – Helfenstein Group.',
    notFoundTitle: 'Pagina non trovata',
  },
  ui: {
    search: 'Cerca',
    menu: 'Menu',
    login: 'Login',
    makeAppointment: 'Fissare un appuntamento',
    arrangeAppointment: 'Fissare un appuntamento',
    orderForFree: 'Ordinare gratuitamente',
    subscribeNow: 'Iscriversi ora',
    signUpForFree: 'Registrarsi gratuitamente',
    readMore: 'Per saperne di più',
    backToHome: 'Torna alla pagina iniziale',
    popularTopics: 'Argomenti popolari',
    pageNotFound: 'Pagina non trovata',
    pageNotFoundBody:
      'La pagina cercata non esiste o è stata spostata. Utilizzi la navigazione in alto o scelga uno degli argomenti qui sotto.',
    news: 'Notizie',
    ourOffering: 'La nostra offerta',
    stockExchangeAndMarkets: 'Mercati e analisi',
    moreStockMarketNews: 'Altre notizie e analisi di mercato',
    marketData: 'Dati di mercato',
    marketDataCaption:
      'Livelli indicativi di indici e valute con variazione rispetto alla chiusura precedente',
    instrument: 'Strumento',
    level: 'Livello',
    change: 'Variazione',
    moreOfferings: 'Altre offerte',
    propertyType: 'Tipo di immobile',
    whatWeDoForYou: 'Cosa facciamo per Lei',
    relatedArticles: 'Articoli correlati',
    team: 'Team',
    teamSubtitle: 'Consulenti indipendenti che rispondono soltanto ai propri clienti',
    featuredMemberLead:
      'Friedrich Hartmann guida la strategia di investimento e l’allocazione del capitale a lungo termine di Helfenstein.',
    about: 'Informazioni',
    results: 'Risultati',
    colleagues: 'Colleghi',
    knowledgeHub: 'Hub di conoscenza',
    position: 'Posizione',
    skipToSearch: 'Vai alla ricerca',
    skipToNav: 'Vai alla navigazione principale',
    skipToMain: 'Vai al contenuto principale',
    skipToFooter: 'Vai alla navigazione del piè di pagina',
    searchWebsite: 'Cerca nel sito',
    searchPlaceholder: 'Cosa sta cercando?',
    reset: 'Reimpostare',
    searchSubmit: 'Cerca',
    noResults: 'Nessun risultato per',
    cookieNotice: 'Avviso sui cookie',
    cookieBody:
      'Questo sito utilizza cookie e altre tecnologie di tracciamento. Per maggiori informazioni consulti le nostre',
    legalNotice: 'Note legali',
    privacyPolicy: 'Protezione dei dati',
    dismissCookie: 'Chiudi avviso sui cookie',
    findUsOn: 'Ci trovi anche su:',
    externalLink: '(link esterno)',
    externalLinkNewWindow: '(link esterno, si apre in una nuova finestra)',
    home: 'Home',
    finmaAlt: 'FINMA — Istituti, persone e prodotti autorizzati',
    logoAria: 'Helfenstein Group — home',
    mainNav: 'Navigazione principale',
    topNav: 'Navigazione superiore',
    quickLinks: 'Link rapidi',
    footerNav: 'Navigazione del piè di pagina',
    legalNav: 'Note legali',
    subscribeNewsletter: 'Iscriversi alla newsletter',
    forIndividuals: 'Per i privati',
    clientStories: 'Storie di clienti',
    verifyAuthorisation: 'Verificare la nostra autorizzazione',
    relatedService: 'Servizio correlato',
    allInsights: 'Tutti gli insights',
    meetSpecialists: 'I nostri specialisti',
    regulatoryChallenges: 'Sfide normative',
    howWeHelp: 'Come aiutiamo',
    adviceDisclaimer:
      'Solo informazioni generali. Non costituisce consulenza personalizzata in materia di investimenti, fiscalità o diritto. Helfenstein Group non detiene patrimoni della clientela; la custodia resta presso la banca di Sua scelta, sotto il Suo controllo.',
    verified: 'Verificato',
    viewOnMap: 'Vedi sulla mappa',
    trustSignals: 'Verifica e contatto',
    officeAddress: 'Sede',
    ombudsmanHeading: 'Ombudsman',
    ombudsmanReference: 'Riferimento',
    verifiedFinma: 'Verificato — apre il registro ufficiale FINMA',
    verifiedLei: 'Verificato — apre il record LEI Bloomberg',
    verifiedHelp: 'Verificato — apre l’elenco HELP.ch',
    verifiedOsfin: 'Verificato — apre la pagina di vigilanza OSFINcontrol',
    verifiedAudit: 'Verificato — apre l’estratto Zefix (ufficio di revisione)',
  },
  nav: navPaths,
  home: {
    testimonial: {
      quote:
        'Presso la banca depositaria di Sua scelta, i clienti beneficiano di costi inferiori e maggiore sicurezza.',
      positionLabel: 'Posizione',
      position: 'Managing Director, Client Operations',
      imageAlt: 'Ritratto di Marc Weber, Managing Director, Client Operations di Helfenstein',
      ctaLabel: 'Fissare un appuntamento',
    },
    newsletter: {
      text: 'Aggiornamenti concreti su previdenza, imposte, investimenti e immobili – scritti per la clientela privata, senza pubblicità di prodotti.',
      linkLabel: 'Si iscriva alla newsletter (in inglese, tedesco, francese e italiano).',
    },
  },
  content: {
    articles: {},
    offers: [
      {
        id: 'checklist-retirement',
        title: 'Checklist per la pianificazione della previdenza',
        tag: 'Scheda informativa',
        teaser:
          'Il pensionamento segna il passaggio a un nuovo capitolo della vita – anche dal punto di vista finanziario. Per poter guardare con serenità agli anni della pensione, dovrà prendere diverse decisioni molto rilevanti.',
        cta: 'Ordinare gratuitamente',
        imageAlt: 'Checklist stampata per la pianificazione della previdenza',
      },
      {
        id: 'free-first-meeting',
        title: 'Primo colloquio gratuito',
        tag: 'Appuntamento',
        teaser: 'Parli con un esperto di Helfenstein. Il primo colloquio è gratuito.',
        cta: 'Fissare un appuntamento',
      },
      {
        id: 'phishing-protection',
        title: 'Protegga il Suo patrimonio dal phishing',
        tag: 'Scheda informativa',
        teaser:
          'La nostra guida gratuita Le mostra come riconoscere i messaggi fraudolenti, che cosa verificare prima di dar seguito a un\'istruzione e cosa fare nella prima ora se qualcosa va storto.',
        cta: 'Ordinare gratuitamente',
      },
    ],
    solutions: [
      {
        title: 'Pianificazione previdenziale',
        text: 'Modelliamo il Suo reddito da pensione anno per anno, per iscritto, così da farLe vedere esattamente cosa può permettersi – prima di prendere decisioni irreversibili.',
      },
      {
        title: 'Pilastro 3a con investimenti indicizzati',
        text: 'La aiutiamo a collocare il pilastro 3a in soluzioni indicizzate a basso costo, depositate presso la banca o la fondazione di Sua scelta. Nell\'arco di una vita lavorativa, commissioni più basse possono valere decine di migliaia di franchi.',
      },
      {
        title: 'Consulenza fiscale',
        text: 'I nostri esperti Le mostrano come strutturare con anni di anticipo le decisioni previdenziali, immobiliari e di domicilio – è lì che si realizzano i veri risparmi fiscali.',
      },
      {
        title: 'Mandati di gestione patrimoniale',
        text: 'Una strategia chiara, un\'implementazione a basso costo e un\'assistenza continua – gestiti da noi, depositati presso la Sua banca. Sa sempre cosa possiede, quanto costa e perché.',
      },
    ],
    property: {
      type: 'Casa unifamiliare',
      imageAlt: 'Vista aerea di una casa unifamiliare con giardino',
      specs: [
        { label: 'Indirizzo' },
        { label: 'Numero di locali' },
        { label: 'Superficie abitabile' },
        { label: 'Superficie del terreno' },
        { label: 'Anno di costruzione' },
        { label: 'Prezzo di vendita' },
      ],
    },
  },
  topics: {
    [ROUTES.individuals]: {
      path: ROUTES.individuals,
      breadcrumb: ['Privati'],
      title: 'Privati',
      subtitle: 'Consulenza indipendente per ogni fase della vita.',
      intro: [
        'Helfenstein Group consiglia persone e famiglie private – e soltanto loro – in materia di previdenza, investimenti, pianificazione successoria, immobili, imposte e previdenza complementare. Siamo remunerati unicamente dai nostri clienti, mai da banche, assicuratori o fornitori di prodotti, e non deteniamo mai i Suoi patrimoni. Ogni raccomandazione ha un solo scopo: il Suo interesse.',
        'Ogni mandato inizia con un\'analisi scritta della Sua situazione. Deciderà in seguito se e come desidera collaborare con noi.',
      ],
      highlights: [
        { title: 'Previdenza', text: 'Determini con precisione quando può permettersi di smettere di lavorare e quanto le costerà.' },
        { title: 'Investimenti', text: 'Una strategia chiara, implementata con fondi indicizzati a basso costo presso la Sua banca e rivista continuamente.' },
        { title: 'Pianificazione successoria', text: 'Testamenti, contratti matrimoniali e donazioni strutturati affinché le Sue volontà siano legalmente tutelate.' },
        { title: 'Imposte', text: 'Pianificazione fiscale a lungo termine, così che le decisioni importanti siano strutturate prima della dichiarazione.' },
      ],
    },
    [ROUTES.retirement]: {
      path: ROUTES.retirement,
      breadcrumb: ['Privati', 'Previdenza'],
      title: 'Pianificazione previdenziale',
      subtitle: 'Sappia già oggi come sarà la Sua pensione.',
      intro: [
        'Il pensionamento è la decisione finanziaria più rilevante per la maggior parte delle persone. Rendita o capitale, pensionamento anticipato o prelievo graduale, quanto può spendere in sicurezza ogni anno – queste scelte sono irreversibili e interagiscono tra loro.',
        'I nostri specialisti modellano per iscritto reddito e patrimonio anno per anno, affinché possa valutare le conseguenze di ciascuna opzione prima di impegnarsi.',
      ],
      highlights: [
        { title: 'Rendita o capitale', text: 'Un confronto affiancato di entrambe le opzioni per l\'intera aspettativa di vita.' },
        { title: 'Pensionamento anticipato', text: 'Quanto costa realmente smettere di lavorare due o tre anni prima, al netto delle imposte.' },
        { title: 'Pianificazione dei prelievi', text: 'L\'ordine in cui prelevare AVS, cassa pensione e patrimoni privati.' },
        { title: 'Verifica del budget', text: 'Una visione realistica delle spese che i Suoi patrimoni possono effettivamente sostenere.' },
      ],
    },
    [ROUTES.financialInvestments]: {
      path: ROUTES.financialInvestments,
      breadcrumb: ['Privati', 'Investimenti finanziari e gestione patrimoniale'],
      title: 'Investimenti finanziari e gestione patrimoniale',
      subtitle: 'Una strategia semplice, implementata in modo efficiente.',
      intro: [
        'Combiniamo una strategia d\'investimento chiaramente definita con un\'implementazione a basso costo e un\'assistenza attiva. Il Suo portafoglio è intestato a Lei presso una banca di Sua scelta; noi lo gestiamo, non lo deteniamo mai. Sa sempre cosa possiede, quanto costa e perché è nel Suo portafoglio.',
        'Poiché Helfenstein Group non percepisce retrocessioni, l\'unica commissione che paga è quella concordata con noi.',
      ],
      highlights: [
        { title: 'Mandati di gestione patrimoniale', text: 'Gestione discrezionale a partire da un nucleo indicizzato ampiamente diversificato.' },
        { title: 'Investimenti indicizzati', text: 'Costi correnti pari a una frazione di quelli dei fondi gestiti attivamente.' },
        { title: 'Analisi del portafoglio', text: 'Un secondo parere scritto sul portafoglio che detiene oggi.' },
        { title: 'I Suoi patrimoni restano presso la Sua banca', text: 'Helfenstein Group non detiene mai patrimoni della clientela. La custodia resta presso la banca di Sua scelta, a Suo nome e sotto il Suo controllo.' },
      ],
    },
    [ROUTES.alternativeInvestments]: {
      path: ROUTES.alternativeInvestments,
      breadcrumb: ['Finanza', 'Investimenti alternativi'],
      title: 'Investimenti alternativi',
      subtitle: 'Mercati privati, attività reali e cripto — solo dove hanno senso.',
      intro: [
        'Gli investimenti alternativi stanno al di fuori di azioni e obbligazioni quotate: private equity e private credit, hedge fund, materie prime, infrastrutture, fondi immobiliari selezionati e attività digitali come le criptovalute. Possono aggiungere fonti di rendimento, ma anche costi, complessità, periodi di vincolo e, in alcuni casi, il rischio di una perdita totale. Partiamo da un\'allocazione di nucleo scritta. Le alternative sono un satellite, mai un sostituto di un portafoglio diversificato intestato a Lei presso la banca di Sua scelta.',
        'Le criptovalute sono l\'alternativa di cui la maggior parte dei clienti chiede per prima. Bitcoin, ether e i token che li seguono sono molto volatili, non pagano un reddito affidabile e possono scendere a zero. Non sono una valuta in senso ordinario, né un deposito bancario, e non sono coperti da un sistema di garanzia dei depositi. Borse, gestori di wallet e prodotti di «rendimento» sono falliti, sono stati violati o si sono rivelati non autorizzati. Qualsiasi allocazione di cui parliamo è dimensionata su una perdita che Lei può sostenere — dopo che il resto del piano è a posto.',
        'Helfenstein Group non detiene patrimoni della clientela e non gestisce una borsa cripto né un wallet. Se le attività digitali hanno un posto nel Suo piano, restano presso un depositario di Sua scelta — una banca o un fornitore specializzato che possa detenerle a Suo nome. Non percepiamo retrocessioni da emittenti di token o piattaforme. Il primo colloquio serve a decidere se le alternative, cripto comprese, appartengono affatto alla Sua situazione.',
      ],
      highlights: [
        { title: 'Mercati privati', text: 'Capitale e credito non quotati: vincoli più lunghi, meno trasparenza e minimi più elevati rispetto a un fondo quotato.' },
        { title: 'Attività reali', text: 'Materie prime, infrastrutture e fondi immobiliari selezionati come diversificatori — non come decorazione.' },
        { title: 'Cripto e attività digitali', text: 'Un satellite piccolo e facoltativo, dopo un budget di rischio scritto. Prima vengono volatilità, custodia e rischio di frode. Nulla di quanto segue è una raccomandazione di acquisto.' },
        { title: 'Idoneità prima di tutto', text: 'Le regole LSerFi restano applicabili. Se non sa spiegare la posizione, non appartiene al portafoglio.' },
      ],
    },
    [ROUTES.estatePlanning]: {
      path: ROUTES.estatePlanning,
      breadcrumb: ['Privati', 'Pianificazione successoria'],
      title: 'Pianificazione successoria',
      subtitle: 'Regoli la Sua successione finché è ancora semplice.',
      intro: [
        'Il diritto successorio svizzero raramente distribuisce un patrimonio come le persone immaginano. Senza testamento, i partner non sposati non ereditano nulla e i coniugi superstiti spesso finiscono per condividere i beni con i figli.',
        'Le mostriamo cosa farebbe la legge nel Suo caso e quali strumenti – testamenti, contratti matrimoniali, donazioni, direttive anticipate – realizzano ciò che intende effettivamente.',
      ],
      highlights: [
        { title: 'Testamenti e contratti di successione', text: 'Redatti in modo valido, nel rispetto delle quote legali.' },
        { title: 'Contratti matrimoniali', text: 'Coordinamento del regime matrimoniale con la Sua pianificazione successoria.' },
        { title: 'Donazioni e anticipi', text: 'Trasferimento di patrimoni in vita senza creare controversie.' },
        { title: 'Esecutori testamentari', text: 'Una parte neutrale che amministra la successione e solleva la famiglia.' },
      ],
    },
    [ROUTES.realEstate]: {
      path: ROUTES.realEstate,
      breadcrumb: ['Privati', 'Immobili e ipoteche'],
      title: 'Immobili e ipoteche',
      subtitle: 'Finanzi il Suo immobile alle migliori condizioni disponibili.',
      intro: [
        'I tassi ipotecari differiscono sensibilmente tra banche, assicuratori e casse pensioni. Su un\'ipoteca rilevante, lo scarto tra il fornitore più economico e quello più costoso può facilmente ammontare a diverse migliaia di franchi all\'anno.',
        'Helfenstein Group confronta continuamente il mercato, negozia per Suo conto e verifica la capacità di sostenere l\'onere finanziario ben prima della scadenza del Suo tasso fisso. Non riceviamo nulla dagli istituti di credito: la raccomandazione è semplicemente l\'offerta migliore disponibile.',
      ],
      highlights: [
        { title: 'Confronto ipotecario', text: 'Condizioni attuali di oltre cento istituti di credito svizzeri.' },
        { title: 'Rifinanziamento', text: 'Un\'offerta strutturata quando scade il Suo tasso fisso attuale.' },
        { title: 'Capacità di sostenere l\'onere', text: 'Una verifica prudente che regge anche a tassi d\'interesse più elevati.' },
        { title: 'Acquisto e vendita', text: 'Perizie e assistenza per l\'intera transazione.' },
      ],
    },
    [ROUTES.taxes]: {
      path: ROUTES.taxes,
      breadcrumb: ['Privati', 'Imposte'],
      title: 'Consulenza fiscale',
      subtitle: 'Ottimizzi la Sua situazione fiscale a lungo termine.',
      intro: [
        'La maggior parte dei risparmi fiscali non si trova nella dichiarazione annuale, ma in decisioni prese anni prima: come risparmia per la previdenza, quando preleva il capitale pensionistico, dove vive e come detiene i Suoi immobili.',
        'I nostri esperti Le mostrano come strutturare tali decisioni nell\'ordine giusto – poiché non vendiamo prodotti, la consulenza riguarda la Sua posizione fiscale e nient\'altro.',
      ],
      highlights: [
        { title: 'Dichiarazioni fiscali', text: 'Redazione e presentazione per privati e lavoratori indipendenti.' },
        { title: 'Prelievi di capitale pensionistico', text: 'Distribuiti su più anni per mantenere bassa la progressione.' },
        { title: 'Impostazione immobiliare', text: 'Valore locativo imputato, manutenzione e investimenti che aumentano il valore.' },
        { title: 'Trasferimento di domicilio', text: 'Quanto vale realmente un cambio di cantone o di comune.' },
      ],
    },
    [ROUTES.insurance]: {
      path: ROUTES.insurance,
      breadcrumb: ['Privati', 'Assicurazioni'],
      title: 'Assicurazioni',
      subtitle: 'Copra i rischi che contano, elimini quelli superflui.',
      intro: [
        'Molte famiglie sono contemporaneamente sovrassicurate per rischi piccoli e accessibili e sottoassicurate per quelli che metterebbero realmente a repentaglio le finanze – invalidità e perdita di guadagno.',
        'Esaminiamo le Sue polizze rispetto alle lacune della copertura AVS e della cassa pensione e ricostruiamo il portafoglio attorno a ciò di cui ha effettivamente bisogno.',
      ],
      highlights: [
        { title: 'Analisi dei rischi', text: 'Cosa pagherebbero realmente AVS e cassa pensione.' },
        { title: 'Vita e invalidità', text: 'Copertura dimensionata sui Suoi obblighi, non su un obiettivo di vendita.' },
        { title: 'Assicurazione malattie', text: 'Franchigia e modello scelti sulla base del calcolo, rivisti ogni anno.' },
        { title: 'Protezione dal phishing', text: 'Una guida gratuita per riconoscere i messaggi fraudolenti e reagire in fretta se uno di essi passa.' },
      ],
    },
    [ROUTES.pensionPlanning]: {
      path: ROUTES.pensionPlanning,
      breadcrumb: ['Privati', 'Pianificazione previdenziale complementare'],
      title: 'Pianificazione previdenziale complementare',
      subtitle: 'Costruisca il terzo pilastro in modo efficiente.',
      intro: [
        'Il pilastro 3a è lo strumento di risparmio fiscale più efficace disponibile per la maggior parte delle persone in Svizzera, e la differenza tra un conto di risparmio e una soluzione indicizzata ben scelta può ammontare a decine di migliaia di franchi nel corso della vita lavorativa.',
        'La aiutiamo a scegliere il veicolo, la strategia e il tempismo del prelievo.',
      ],
      highlights: [
        { title: 'Pilastro 3a con investimenti indicizzati', text: 'Soluzioni indicizzate a basso costo, scelte per Lei e depositate presso il fornitore che preferisce.' },
        { title: 'Acquisti volontari', text: 'Quando conviene davvero versare nella cassa pensione.' },
        { title: 'Più conti', text: 'Prelievi scaglionati che riducono l\'imposta sul capitale.' },
        { title: 'Libero passaggio', text: 'Dove collocare il capitale tra un impiego e l\'altro.' },
      ],
    },
    [ROUTES.banking]: {
      path: ROUTES.banking,
      breadcrumb: ['Privati', 'Custodia e banche partner'],
      title: 'Custodia e banche partner',
      subtitle: 'I Suoi patrimoni restano presso la Sua banca.',
      intro: [
        'Helfenstein Group non detiene mai patrimoni della clientela. I Suoi titoli e la Sua liquidità restano su un conto intestato a Lei presso una banca depositaria di Sua scelta, che Le invia direttamente i rendiconti; noi vi aggiungiamo la gestione del portafoglio e la consulenza.',
        'La aiutiamo a scegliere un depositario, a confrontare quanto addebita ciascuno e ad assicurarsi che il reporting sia chiaro. Le commissioni di custodia e di transazione sono fissate e addebitate dalla Sua banca, mai da noi.',
      ],
      highlights: [
        { title: 'Patrimoni a Suo nome', text: 'Custodia segregata presso una banca di Sua scelta, sotto il Suo controllo.' },
        { title: 'Scegliere un depositario', text: 'Un confronto omogeneo di condizioni di custodia e servizio.' },
        { title: 'Ipoteche', text: 'Finanziamento strutturato su condizioni verificate mediante confronto.' },
        { title: 'Sicurezza', text: 'Accesso multifattoriale e monitoraggio delle frodi offerto dalla Sua banca.' },
      ],
    },
    [ROUTES.about]: {
      path: ROUTES.about,
      breadcrumb: ['Chi siamo'],
      title: 'Chi siamo',
      subtitle: 'Consulenza indipendente da Lucerna.',
      intro: [
        'Helfenstein Group è un consulente e gestore patrimoniale indipendente con sede a Lucerna. Consigliamo persone e famiglie private – mai istituzioni o aziende – in materia di gestione patrimoniale, consulenza finanziaria, previdenza e finanziamenti, ovunque vivano.',
        'Siamo iscritti presso la FINMA come gestori patrimoniali autorizzati e sottoposti alla vigilanza di OSFINcontrol AG. Il nostro reddito proviene esclusivamente dagli onorari concordati con i nostri clienti e non deteniamo patrimoni della clientela: la custodia resta presso la banca di Sua scelta, sotto il Suo controllo.',
      ],
      highlights: [
        { title: 'Il nostro team', text: 'Specialisti che La accompagnano a lungo termine.' },
        { title: 'Conformità normativa', text: 'Autorizzazione FINMA, vigilanza OSFINcontrol e il nostro record Bloomberg LEI.' },
        { title: 'Consulenza indipendente', text: 'Nessuna retrocessione, nessun obiettivo di vendita di prodotti.' },
        { title: 'Storie di clienti', text: 'Esempi anonimizzati di consulenza nella pratica.' },
      ],
    },
    [ROUTES.aboutIndependentAdvice]: {
      path: ROUTES.aboutIndependentAdvice,
      breadcrumb: ['Chi siamo', 'Consulenza indipendente'],
      title: 'Consulenza indipendente',
      subtitle: 'Remunerati dai nostri clienti. Da nessun altro.',
      intro: [
        'La maggior parte della consulenza finanziaria è finanziata dai prodotti che raccomanda. Questo rapporto è invisibile al cliente e favorisce sistematicamente soluzioni costose.',
        'Helfenstein Group è remunerata esclusivamente dai propri clienti – persone e famiglie private, mai istituzioni o aziende. Pubblichiamo i nostri onorari, accreditiamo qualsiasi retrocessione che non possiamo evitare, i nostri consulenti non hanno obiettivi di vendita di prodotti e non deteniamo mai i Suoi patrimoni: la custodia resta presso la banca di Sua scelta, a Suo nome e sotto il Suo controllo.',
      ],
      highlights: [
        { title: 'Trasparenza delle commissioni', text: 'Conosce il costo prima di decidere qualsiasi cosa.' },
        { title: 'Nessuna retrocessione', text: 'Qualsiasi pagamento di terzi Le viene accreditato.' },
        { title: 'Analisi scritta', text: 'Raccomandazioni che può leggere, verificare e conservare.' },
        { title: 'Primo colloquio gratuito', text: 'La consulenza iniziale non Le costa nulla.' },
      ],
    },
    [ROUTES.aboutOffice]: {
      path: ROUTES.aboutOffice,
      breadcrumb: ['Chi siamo', 'La nostra sede'],
      title: 'La nostra sede',
      subtitle: 'Con sede a Lucerna, al servizio di clienti privati nel mondo.',
      intro: [
        'Helfenstein Asset Management AG ha sede in Pilatusstrasse 23, a Lucerna. Consigliamo i nostri clienti in tedesco, francese, italiano e inglese.',
        'Ci chiami allo +41 41 211 29 29 oppure fissi un primo colloquio gratuito.',
      ],
      highlights: [
        { title: 'Ufficio di Lucerna', text: 'Pilatusstrasse 23, 6003 Luzern.' },
        { title: 'Telefono', text: '+41 41 211 29 29, nei giorni feriali durante gli orari d\'ufficio.' },
        { title: 'Lingue', text: 'Tedesco, francese, italiano e inglese.' },
        { title: 'Appuntamenti', text: 'Di persona a Lucerna oppure in videochiamata.' },
      ],
    },
    [ROUTES.aboutPortrait]: {
      path: ROUTES.aboutPortrait,
      breadcrumb: ['Chi siamo', 'Ritratto'],
      title: 'Ritratto',
      subtitle: 'Un gestore patrimoniale lucernese con un modello di consulenza chiaro.',
      intro: [
        'Helfenstein Group consiglia dal proprio ufficio di Lucerna persone e famiglie private in materia di gestione patrimoniale, consulenza finanziaria, previdenza e finanziamenti. Non operiamo per istituzioni o aziende.',
        'I patrimoni della clientela sono custoditi presso una banca depositaria di Sua scelta, mai da noi. Siamo autorizzati dalla FINMA come gestori patrimoniali e sottoposti alla vigilanza di OSFINcontrol AG.',
      ],
      highlights: [
        { title: 'Gestione patrimoniale', text: 'Mandati costruiti attorno a un processo d\'investimento chiaro.' },
        { title: 'Consulenza finanziaria', text: 'Previdenza, finanziamenti e pianificazione personale accanto agli investimenti.' },
        { title: 'Partner di custodia', text: 'Custodia segregata a Suo nome presso una banca di Sua scelta.' },
        { title: 'Lucerna', text: 'Pilatusstrasse 23, 6003 Luzern.' },
      ],
    },
    [ROUTES.aboutCompanyInformation]: {
      path: ROUTES.aboutCompanyInformation,
      breadcrumb: ['Chi siamo', 'Informazioni societarie'],
      title: 'Informazioni societarie',
      subtitle: 'Chi siamo sulla carta e come raggiungerci.',
      intro: [
        'Questa pagina riunisce i dati registrati di Helfenstein Asset Management AG, che opera con il nome Helfenstein Group, insieme ai nostri contatti media.',
        'Per domande sulla consulenza o su un mandato in essere, utilizzi invece la pagina dei contatti.',
      ],
      highlights: [
        { title: 'Profilo societario', text: 'Ragione sociale, IDI, LEI e indirizzo a Lucerna.' },
        { title: 'Regolamentazione', text: 'Gestore patrimoniale FINMA; vigilanza di OSFINcontrol AG.' },
        { title: 'Servizi', text: 'Consulenza indipendente e gestione patrimoniale per la clientela privata.' },
        { title: 'Contatto', text: '+41 41 211 29 29 · Pilatusstrasse 23, Luzern.' },
      ],
    },
    [ROUTES.aboutJobs]: {
      path: ROUTES.aboutJobs,
      breadcrumb: ['Chi siamo', 'Lavoro e carriera'],
      title: 'Lavoro e carriera',
      subtitle: 'Consulenza senza obiettivi di vendita.',
      intro: [
        'Poiché Helfenstein Group non guadagna sui prodotti e non detiene patrimoni della clientela, i nostri consulenti sono valutati sulla qualità del consiglio e non sui volumi venduti. Questo cambia radicalmente il lavoro.',
        'Siamo sempre lieti di ricevere candidature da consulenti, specialisti e neolaureati che desiderano lavorare così.',
      ],
      highlights: [
        { title: 'Ruoli di consulenza', text: 'Posizioni a contatto con i clienti in previdenza, imposte e investimenti.' },
        { title: 'Specialisti', text: 'Attuariato, diritto, IT e operazioni bancarie.' },
        { title: 'Neolaureati', text: 'Programmi di ingresso strutturati con un mentore.' },
        { title: 'Lavorare presso Helfenstein', text: 'Modelli flessibili e formazione continua.' },
      ],
    },
    [ROUTES.aboutContact]: {
      path: ROUTES.aboutContact,
      breadcrumb: ['Chi siamo', 'Contatto e assistenza'],
      title: 'Contatto e assistenza',
      subtitle: 'Siamo lieti di sentirLa.',
      intro: [
        'Ci chiami, ci scriva o fissi un primo colloquio gratuito nel nostro ufficio di Lucerna oppure in videochiamata. I nostri consulenti parlano tedesco, francese, italiano e inglese – e nessuno di loro ha qualcosa da venderLe.',
        'Per domande sul Portale finanziario Helfenstein, il nostro team di assistenza è disponibile nei giorni feriali durante l\'orario d\'ufficio.',
      ],
      highlights: [
        { title: 'Telefono', text: '+41 41 211 29 29, nei giorni feriali 08:00–18:00.' },
        { title: 'Indirizzo', text: 'Pilatusstrasse 23, 6003 Luzern, Svizzera.' },
        { title: 'Appuntamenti', text: 'Prenoti un primo colloquio gratuito online in pochi minuti.' },
        { title: 'Assistenza portale', text: 'Aiuto per login, accesso a due fattori e reporting.' },
      ],
    },
    [ROUTES.appointments]: {
      path: ROUTES.appointments,
      breadcrumb: ['Appuntamenti'],
      title: 'Fissare un appuntamento',
      subtitle: 'Il primo colloquio è gratuito.',
      intro: [
        'Parli con un consulente di Helfenstein Group della Sua previdenza, dei Suoi investimenti, delle Sue imposte o della Sua ipoteca. La prima consulenza non costa nulla e non La vincola in alcun modo – e poiché siamo remunerati soltanto dai nostri clienti, nessuno nella stanza sta cercando di venderLe un prodotto.',
        'Scelga l\'orario che preferisce – nel nostro ufficio di Lucerna oppure in videochiamata – e ci indichi brevemente di cosa desidera parlare.',
      ],
      highlights: [
        { title: 'Primo colloquio gratuito', text: 'Circa un\'ora, di persona o in videoconferenza.' },
        { title: 'Analisi scritta', text: 'Una proposta concreta segue al primo colloquio.' },
        { title: 'Senza impegno', text: 'Decide in seguito se procedere.' },
        { title: 'Qualsiasi lingua', text: 'Tedesco, francese, italiano o inglese.' },
      ],
      ctaLabel: 'Fissare un appuntamento',
    },
    [ROUTES.expertise]: {
      path: ROUTES.expertise,
      breadcrumb: ['Competenze'],
      title: 'Competenze',
      subtitle: 'Conoscenze, studi e strumenti dei nostri specialisti.',
      intro: [
        'Helfenstein Group pubblica analisi su previdenza, pensioni, imposte, ipoteche e investimenti, insieme a checklist che può ordinare gratuitamente.',
        'Inizi dal rapporto Horizon, sfogli gli insights per argomento oppure apra l\'indice completo degli articoli. Poiché non vendiamo prodotti, ciò che legge qui è la nostra analisi e non un argomento di vendita.',
      ],
      highlights: [
        { title: 'Rapporto Horizon 2026', text: 'Previdenza, ipoteche e novità LSerFi in un linguaggio chiaro.' },
        { title: 'Indice degli insights', text: 'Tutti gli articoli ordinati per data, con i relativi argomenti.' },
        { title: 'Schede informative', text: 'Guide stampate concise, inviateLe gratuitamente.' },
        { title: 'Primo colloquio gratuito', text: 'Un\'ora con un consulente, a Lucerna o in videochiamata.' },
      ],
    },
    [ROUTES.financialPortal]: {
      path: ROUTES.financialPortal,
      breadcrumb: ['Portale finanziario Helfenstein'],
      title: 'Portale finanziario Helfenstein',
      subtitle: 'Il Suo portafoglio, i Suoi documenti, i Suoi mercati.',
      intro: [
        'Il Portale finanziario Helfenstein Le offre una visione consolidata dei conti e dei portafogli che detiene presso la Sua banca depositaria, insieme a tutti i Suoi documenti e ai dati di mercato aggiornati.',
        'I Suoi patrimoni restano presso la Sua banca: il portale è la Sua finestra su di essi, non un luogo in cui viene custodito denaro.',
      ],
      highlights: [
        { title: 'Panoramica del portafoglio', text: 'Performance consolidata di tutte le Sue partecipazioni.' },
        { title: 'Documenti', text: 'Estratti conto e documenti fiscali in un unico archivio.' },
        { title: 'Reporting', text: 'Performance, costi e allocazione su tutte le posizioni, spiegati in modo chiaro.' },
        { title: 'Sicurezza', text: 'Autenticazione a due fattori ad ogni accesso.' },
      ],
    },
    [ROUTES.stockExchangesAndMarkets]: {
      path: ROUTES.stockExchangesAndMarkets,
      breadcrumb: ['Mercati e analisi'],
      title: 'Mercati e analisi',
      subtitle: 'Prezzi, notizie e il nostro punto di vista indipendente.',
      intro: [
        'Dati di mercato, commenti e strumenti utili in un unico luogo, gratuiti dopo la registrazione. Pubblichiamo analisi proprie perché non vendiamo prodotti: ciò che legge qui è la nostra opinione, non un argomento di vendita.',
        'Segua indici, valute, tassi d\'interesse e singoli titoli e imposti alert sulle posizioni che Le interessano.',
      ],
      highlights: [
        { title: 'Prezzi di mercato', text: 'Azioni, indici e valute svizzeri e internazionali.' },
        { title: 'Watchlist', text: 'Segua i titoli che Le interessano e imposti alert.' },
        { title: 'Analisi', text: 'Commenti dei nostri specialisti d\'investimento.' },
        { title: 'Strumenti', text: 'Screener, grafici e simulazioni di portafoglio.' },
      ],
      ctaLabel: 'Registrarsi gratuitamente',
    },
    [ROUTES.newsletter]: {
      path: ROUTES.newsletter,
      breadcrumb: ['Iscriversi alla newsletter'],
      title: 'Iscriversi alla nostra newsletter',
      subtitle: 'Aggiornamenti indipendenti, senza nulla da vendere.',
      intro: [
        'Aggiornamenti concreti e indipendenti su previdenza, imposte, investimenti e immobili – scritti per la clientela privata, senza pubblicità di prodotti. Pubblicata in inglese, tedesco, francese e italiano.',
        'Può selezionare gli argomenti che La interessano e disiscriversi in qualsiasi momento con un solo clic.',
      ],
      highlights: [
        { title: 'Previdenza', text: 'AVS, regime professionale e pilastro 3a.' },
        { title: 'Imposte', text: 'Scadenze, deduzioni e opportunità di pianificazione.' },
        { title: 'Investimenti', text: 'Strategia, costi e commento di mercato.' },
        { title: 'Immobili', text: 'Tassi ipotecari e mercato immobiliare.' },
      ],
      ctaLabel: 'Iscriversi ora',
    },
    [ROUTES.checklistRetirementPlanning]: {
      path: ROUTES.checklistRetirementPlanning,
      breadcrumb: ['Checklist per la pianificazione della previdenza'],
      title: 'Checklist per la pianificazione della previdenza',
      subtitle: 'Ordini la scheda informativa gratuitamente.',
      intro: [
        'Il pensionamento segna il passaggio a un nuovo capitolo della vita – anche dal punto di vista finanziario. Per poter guardare con serenità agli anni della pensione, dovrà prendere diverse decisioni molto rilevanti.',
        'La nostra checklist La accompagna passo dopo passo, a partire da circa dieci anni prima della data prevista per smettere di lavorare.',
      ],
      highlights: [
        { title: 'Dieci anni prima', text: 'Colmi le lacune contributive e verifichi la Sua cassa pensione.' },
        { title: 'Cinque anni prima', text: 'Decida tra rendita e capitale, pianifichi i prelievi.' },
        { title: 'Un anno prima', text: 'Si registri presso l\'ufficio di compensazione AVS, adegui le assicurazioni.' },
        { title: 'Dopo il pensionamento', text: 'Gestisca i prelievi, le imposte e la Sua successione.' },
      ],
      ctaLabel: 'Ordinare gratuitamente',
    },
    [ROUTES.phishingProtection]: {
      path: ROUTES.phishingProtection,
      breadcrumb: ['Protegga il Suo patrimonio dal phishing'],
      title: 'Protegga il Suo patrimonio dal phishing',
      subtitle: 'Una guida pratica per la clientela privata.',
      intro: [
        'Il phishing è diventato la via più comune per accedere indebitamente a conti finanziari. Anche persone attente e informate possono occasionalmente cadere in una trappola di un messaggio convincente.',
        'La nostra guida gratuita spiega come i truffatori prendono di mira gli investitori privati, che cosa verificare prima di dar seguito a un messaggio che sembra provenire dalla Sua banca o da noi, e cosa fare – e chi chiamare – nella prima ora se qualcosa va storto. Poiché i Suoi patrimoni sono depositati presso la Sua banca e mai presso Helfenstein Group, spieghiamo anche quali misure di sicurezza offre la Sua banca e come utilizzarle.',
      ],
      highlights: [
        { title: 'Come funzionano gli attacchi', text: 'I messaggi, le telefonate e i siti falsi usati contro gli investitori privati.' },
        { title: 'Cosa verificare', text: 'I pochi controlli che fermano quasi ogni tentativo.' },
        { title: 'Le protezioni della Sua banca', text: 'Quali misure offre la Sua banca depositaria e come attivarle.' },
        { title: 'Se qualcosa va storto', text: 'Chi chiamare nella prima ora e in quale ordine.' },
      ],
      ctaLabel: 'Ordinare gratuitamente',
    },
  },
  legal: {
    'legal-notices': {
      slug: 'legal-notices',
      title: 'Note legali',
      sections: [
        {
          paragraphs: [
            'Le informazioni pubblicate su questo sito web sono fornite esclusivamente a scopo informativo generale. Non costituiscono un\'offerta, una raccomandazione o un invito ad acquistare o vendere strumenti finanziari, né costituiscono consulenza in materia di investimenti, legale o fiscale. Helfenstein Asset Management AG (Helfenstein Group) è una consulente e gestore patrimoniale indipendente; non detiene patrimoni della clientela, che restano presso la banca depositaria scelta dal cliente.',
          ],
        },
        {
          heading: 'Nessuna garanzia',
          paragraphs: [
            'Sebbene i contenuti di questo sito web siano redatti con cura, non viene fornita alcuna garanzia quanto alla loro accuratezza, completezza o attualità. La responsabilità per eventuali perdite derivanti dall\'utilizzo di questo sito web è esclusa nella misura consentita dalla legge.',
            'I dati e i prezzi di mercato sono indicativi e possono essere in ritardo. Non sono idonei come base per decisioni d\'investimento.',
          ],
        },
        {
          heading: 'Link a siti di terzi',
          paragraphs: [
            'Questo sito web contiene link a siti web gestiti da terzi. Tali link sono forniti esclusivamente per comodità. Non abbiamo alcun controllo sui contenuti di tali siti e non ne assumiamo responsabilità.',
          ],
        },
        {
          heading: 'Proprietà intellettuale',
          paragraphs: [
            'Tutti i contenuti di questo sito web sono protetti dal diritto d\'autore. La riproduzione, la trasmissione o la modifica, integralmente o parzialmente, richiede il consenso scritto preventivo.',
          ],
        },
        {
          heading: 'Diritto applicabile',
          paragraphs: [
            'Applicable Law: Swiss substantive law (excluding CISG) | Jurisdiction: Courts of Lucerne, Canton of Luzern',
            'L\'utilizzo di questo sito web è regolato dal diritto sostanziale svizzero, con esclusione della Convenzione di Vienna (CISG). Il foro esclusivo è quello dei tribunali di Lucerna, Cantone di Lucerna.',
          ],
        },
      ],
    },
    'privacy-policy': {
      slug: 'privacy-policy',
      title: 'Protezione dei dati',
      sections: [
        {
          paragraphs: [
            'Prendiamo sul serio la protezione dei Suoi dati personali e li trattiamo conformemente alla Legge federale svizzera sulla protezione dei dati e, ove applicabile, al Regolamento generale sulla protezione dei dati.',
          ],
        },
        {
          heading: 'Quali dati trattiamo',
          paragraphs: [
            'Quando visita questo sito web trattiamo dati tecnici quali le pagine richieste, l\'ora della richiesta, il browser e il sistema operativo utilizzati e un indirizzo IP abbreviato.',
            'Se ci contatta, ordina una scheda informativa o fissa un appuntamento, trattiamo i dati di contatto e le altre informazioni che ci fornisce al fine di rispondere alla Sua richiesta.',
          ],
        },
        {
          heading: 'Cookie e tracciamento',
          paragraphs: [
            'Utilizziamo cookie tecnicamente necessari per il funzionamento del sito web e – con il Suo consenso – cookie che ci aiutano a comprendere come il sito web viene utilizzato affinché possiamo migliorarlo.',
            'Può revocare il Suo consenso in qualsiasi momento ed eliminare i cookie tramite le impostazioni del Suo browser.',
          ],
        },
        {
          heading: 'Comunicazione a terzi',
          paragraphs: [
            'Comunichiamo dati personali a terzi solo quando necessario per fornire i nostri servizi, quando ha dato il Suo consenso o quando siamo legalmente obbligati a farlo.',
          ],
        },
        {
          heading: 'I Suoi diritti',
          paragraphs: [
            'Ha il diritto di richiedere informazioni sui dati personali che conserviamo e di far correggere dati inesatti o cancellare dati trattati illecitamente.',
          ],
        },
        {
          heading: 'Titolare del trattamento',
          paragraphs: [
            'Helfenstein Asset Management AG (Helfenstein Group), Pilatusstrasse 23, 6003 Luzern, Svizzera. Telefono: +41 41 211 29 29.',
            'Data Protection Registration: CHE-111.708.730 | Registered with: Swiss Federal Data Protection Commissioner (FDPIC)',
            'La nLPD riveduta non rilascia un numero di licenza pubblico al titolare. CHE-111.708.730 è il nostro IDI, usato presso l\'Incaricato federale della protezione dei dati (https://www.edoeb.admin.ch).',
          ],
        },
      ],
    },
    'documents-and-information': {
      slug: 'documents-and-information',
      title: 'Documenti e informazioni',
      sections: [
        {
          paragraphs: [
            'Questa sezione riunisce i documenti regolamentari e le informazioni per i clienti relativi ai nostri servizi.',
          ],
        },
        {
          heading: 'Informazioni per i clienti',
          paragraphs: [
            'Condizioni generali, tariffario delle commissioni e informazioni sui rischi connessi alla negoziazione di strumenti finanziari.',
          ],
        },
        {
          heading: 'Legge sui servizi finanziari',
          paragraphs: [
            'Informazioni sui nostri servizi, segmentazione dei clienti, gestione dei conflitti d\'interessi e la nostra affiliazione alla Finanzombudsstelle Schweiz (FINOS), Freigutstrasse 8, 8002 Zürich, +41 44 552 08 00, info@finos.ch, riferimento FINOS-111.708.730.',
          ],
        },
        {
          heading: 'Informazioni societarie',
          paragraphs: [
            'Helfenstein Asset Management AG (operante come Helfenstein Group) pubblica su questo sito web le informazioni regolamentari e quelle destinate alla clientela. La società è una consulente indipendente remunerata esclusivamente a onorario e un gestore patrimoniale autorizzato dalla FINMA (FINMA Portfolio Manager Authorisation No: CH-111.708.730 | Decision Date: 12.01.2022; Ongoing Supervision: OSFINcontrol AG | Affiliation Ref: OSFIN-111.708.730 | Since: 12.01.2022); non detiene patrimoni della clientela.',
            'Commercial Register Extract available upon request | Registry Court: Luzern | UID: CHE-111.708.730',
          ],
        },
      ],
    },
    'audit-reports': {
      slug: 'audit-reports',
      title: 'Relazioni di revisione',
      sections: [
        {
          paragraphs: [
            'Helfenstein Asset Management AG è soggetta al Codice delle obbligazioni. L\'ufficio di revisione attuale, o una valida delibera di opting-out, è l\'iscrizione depositata presso l\'ufficio del registro di commercio del Cantone di Lucerna.',
          ],
        },
        {
          heading: 'Verifica',
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
          heading: 'Editore',
          paragraphs: [
            'Helfenstein Asset Management AG',
            'Pilatusstrasse 23, 6003 Luzern, Svizzera.',
            'Telefono: +41 41 211 29 29',
            'UID: CHE-111.708.730',
            'LEI: 894500URZFTDV5G7F357',
          ],
        },
        {
          heading: 'Attività',
          paragraphs: [
            'Consulenza finanziaria indipendente remunerata esclusivamente a onorario e gestione patrimoniale per la clientela privata nel mondo: previdenza, investimenti, imposte, immobili e pianificazione successoria. I patrimoni della clientela restano presso la banca di Sua scelta e non presso la società.',
          ],
        },
        {
          heading: 'Sorveglianza',
          paragraphs: [
            'Helfenstein Asset Management AG è iscritta presso la FINMA come gestore di portafoglio ed è sottoposta a vigilanza di OSFINcontrol AG.',
            'FINMA Portfolio Manager Authorisation No: CH-111.708.730 | Decision Date: 12.01.2022.',
            'Ongoing Supervision: OSFINcontrol AG | Affiliation Ref: OSFIN-111.708.730 | Since: 12.01.2022.',
            'Le autorizzazioni possono essere verificate nel registro ufficiale della FINMA (https://www.finma.ch/it/finma-public/istituti-persone-e-prodotti-autorizzati/).',
            'Registrazione LEI: https://search.gleif.org/#/record/894500URZFTDV5G7F357',
            'Ufficio di conciliazione: Finanzombudsstelle Schweiz (FINOS), Freigutstrasse 8, 8002 Zürich, +41 44 552 08 00, info@finos.ch, riferimento FINOS-111.708.730.',
          ],
        },
      ],
    },
  },
  team: {
    sections: {
      investment: 'Team investimenti',
      business: 'Sviluppo commerciale',
      investors: 'Consulenti alla clientela',
    },
    featuredLead:
      'Friedrich Hartmann guida la strategia d\'investimento e l\'allocazione del capitale a lungo termine di Helfenstein.',
    members: {
      'friedrich-hartmann': {
        slug: 'friedrich-hartmann',
        role: 'Presidente e CIO',
        about: [
          'Friedrich Hartmann guida la strategia d\'investimento di Helfenstein e porta più di 30 anni di esperienza nella costruzione del portafoglio e nell\'allocazione del capitale a lungo termine. Il suo approccio si concentra sulla qualità delle imprese, su valutazioni disciplinate e sulla capacità di mantenere la prospettiva quando le condizioni di mercato cambiano. Come presidente e CIO definisce il quadro di investimento e orienta la valutazione del rischio del team. Dà particolare importanza a un ragionamento chiaro e alla pazienza di tenere una convinzione restando aperti a nuove evidenze.',
          'La sua filosofia parte da una domanda semplice: che cosa rende un\'impresa degna di essere posseduta lungo un intero ciclo di mercato? Incoraggia il team a verificare le ipotesi di ogni tesi e a considerare come le singole posizioni interagiscono nel portafoglio. Nei colloqui con i clienti spiega il rapporto tra valutazione, incertezza e il tempo necessario perché una tesi si sviluppi.',
        ].join('\n\n'),
        results: ['Più di 30 anni a plasmare l\'approccio di investimento della società.'],
      },
      'karin-vogel': {
        slug: 'karin-vogel',
        role: 'Gestore di portafoglio',
        about: [
          'Karin Vogel è specializzata nelle azioni europee a media capitalizzazione e unisce ricerca dettagliata sulle società e una valutazione disciplinata. L\'esperienza in boutique value in Spagna le dà una comprensione pratica delle imprese regionali e delle loro posizioni competitive. Analista principale del fondo Continental Value dal 2016, esamina generazione di cassa, decisioni del management e tenuta degli utili. Aiuta inoltre i clienti a capire, in un linguaggio chiaro, il ragionamento dietro le posizioni del portafoglio.',
          'La sua ricerca va oltre la crescita di superficie per esaminare come le società finanziano l\'espansione, proteggono i margini e allocano il capitale. Presta particolare attenzione al rapporto tra risultato operativo e flusso di cassa, per mettere in discussione previsioni troppo ottimistiche. Nelle discussioni di portafoglio presenta sia l\'opportunità sia le condizioni che potrebbero indebolire la tesi.',
        ].join('\n\n'),
        results: [
          'Analista principale del fondo Continental Value dal 2016.',
          'Tre partecipazioni industriali studiate diventate posizioni di lungo periodo.',
        ],
      },
      'lukas-steiner': {
        slug: 'lukas-steiner',
        role: 'Gestore di portafoglio',
        about: [
          'Lukas Steiner si concentra sulle azioni europee, con una responsabilità particolare per le partecipazioni iberiche della società. Formatosi a Vienna e a Londra, unisce l\'analisi fondamentale a un interesse per i cicli del capitale e per le forze economiche che determinano i rendimenti. Il suo lavoro sulla disciplina di portafoglio ha contribuito a una riduzione del 22% del turnover medio. Privilegia posizioni studiate con cura e un approccio misurato alle negoziazioni, valutando ogni decisione rispetto alla tesi di lungo periodo.',
          'Un tema centrale del suo lavoro è il modo in cui investimento, concorrenza e condizioni di finanziamento influenzano la redditività futura. Considera se gli utili correnti riflettono una posizione sostenibile o un momento favorevole del ciclo. Nelle discussioni di portafoglio sottolinea le ragioni per detenere una società, gli sviluppi che giustificherebbero una revisione e i costi di cambiamenti non necessari.',
        ].join('\n\n'),
        results: ['Riduzione del 22% del turnover medio di portafoglio.'],
      },
      'maximilian-berger': {
        slug: 'maximilian-berger',
        role: 'Gestore di portafoglio',
        about: [
          'Maximilian Berger porta un\'esperienza di revisione nell\'investimento azionario, con particolare attenzione alla qualità contabile, alla solidità di bilancio e all\'affidabilità degli utili riportati. Co-gestisce partecipazioni europee difensive nella gamma Global Value. Nel 2023 ha guidato la revisione degli standard di reporting dell\'universo investibile. Il suo contributo è l\'esame di ciò che sta dietro le cifre di superficie, per aiutare il team a mettere in discussione le ipotesi e a individuare debolezze finanziarie prima di impiegare capitale.',
          'Il suo stile analitico si fonda sulla riconciliazione: verifica se conto economico, stato patrimoniale e rendiconto finanziario raccontano la stessa storia. Osserva i movimenti del capitale circolante, gli impegni di finanziamento e le ipotesi alla base dei valori delle attività. Questa prospettiva arricchisce i dibattiti di investimento, soprattutto quando valutazioni apparentemente attraenti vanno pesate rispetto a rischi finanziari o contabili meno visibili.',
        ].join('\n\n'),
        results: [
          'Ha guidato nel 2023 la revisione degli standard di reporting della società.',
          'Ha individuato due rischi di bilancio prima che attirassero un\'attenzione più ampia del mercato.',
        ],
      },
      'julian-vogt': {
        slug: 'julian-vogt',
        role: 'Gestore di portafoglio',
        about: [
          'Julian Vogt unisce una formazione in diritto e in economia a un lavoro centrato sulla governance e sulle decisioni di investimento. Ha elaborato la checklist di governance usata prima delle nuove posizioni rilevanti, portando nel processo di ricerca strutture proprietarie, diritti degli azionisti e incentivi del management. Accanto alle responsabilità di portafoglio, affianca gli analisti junior nella stesura delle tesi e nel dimensionamento delle posizioni. Il suo approccio collega la solidità di un\'impresa alle condizioni con cui gli investitori partecipano al suo futuro.',
          'Esamina come strutture societarie e decisioni del management influenzino nel tempo la posizione degli azionisti. La sua ricerca considera se gli incentivi favoriscano un\'allocazione responsabile del capitale e se la governance sostenga la strategia dichiarata. Con gli analisti meno esperti insiste su un ragionamento conciso, ipotesi esplicite e una spiegazione chiara delle evidenze che farebbero cambiare una view.',
        ].join('\n\n'),
        results: [
          'Ha contribuito al lavoro sulla complessità legale e regolamentare di tre partecipazioni transfrontaliere.',
        ],
      },
      'ken-wagner': {
        slug: 'ken-wagner',
        role: 'Gestore di portafoglio',
        about: [
          'Ken Wagner collega il team di investimento europeo di Helfenstein alle opportunità quotate in Asia. Nel 2019 ha avviato la copertura di ricerca Asia-Pacifico della società, con una prospettiva regionale fondata sui documenti societari e sul dialogo con gli operatori di mercato. Parla mandarino, tedesco e spagnolo e sostiene la comunicazione tra mercati e partner di ricerca. Ha individuato quattro investimenti che rappresentavano più dell\'8% del portafoglio globale. Cerca di capire le imprese nel loro contesto locale e, allo stesso tempo, come ogni opportunità si inserisca nel quadro di valutazione e di rischio del portafoglio.',
          'La sua ricerca tiene conto delle differenze di informativa, delle strutture proprietarie e delle condizioni competitive nella regione. Porta questi elementi nelle discussioni con i colleghi europei. Il suo approccio unisce una lettura attenta delle informazioni finanziarie e un interesse per il modo in cui le imprese generano cassa, finanziano l\'espansione e trattano gli azionisti di minoranza.',
        ].join('\n\n'),
        results: ['Quattro investimenti individuati, pari a più dell\'8% del portafoglio globale.'],
      },
      'stefan-richter': {
        slug: 'stefan-richter',
        role: 'Gestore di portafoglio',
        about: [
          'Stefan Richter è in Helfenstein dal 2015 e porta esperienza di ricerca di investimento e di analisi delle imprese industriali. Si concentra su società i cui vantaggi competitivi e flussi di cassa possono resistere a condizioni economiche mutevoli. Ha sviluppato la watchlist sulla transizione energetica, che dà al comitato investimenti una base strutturata per esaminare le imprese interessate da questo cambiamento di lungo periodo. La sua ricerca collega gli sviluppi di settore ai fondamentali, con particolare attenzione al capitale necessario per sostenere la crescita futura.',
          'Studia il rapporto tra domanda industriale, capacità produttiva e investimento richiesto per mantenere la posizione competitiva. Nella ricerca sulla transizione energetica distingue i temi di settore ampi dall\'economia della singola impresa. Il suo approccio chiede come un\'opportunità si traduca in utili e flusso di cassa e se il bilancio possa sostenere l\'investimento necessario nelle fasi meno favorevoli del ciclo.',
        ].join('\n\n'),
        results: ['Nel team Helfenstein dal 2015.'],
      },
      'greta-keller': {
        slug: 'greta-keller',
        role: 'Analista junior',
        about: [
          'Greta Keller supporta la ricerca sulle imprese più piccole dei settori dei consumi e industriale in Germania, Austria e Svizzera. È entrata in Helfenstein nel 2023 dopo un tirocinio in investor relations, con una formazione in economia aziendale e un forte interesse per la modellizzazione finanziaria. Il suo lavoro unisce l\'analisi dei documenti societari e la valutazione dei cambiamenti nel comportamento dei clienti. Accanto ai gestori, aiuta a trasformare idee di ricerca in tesi strutturate e in un monitoraggio continuo.',
          'Il suo approccio parte dai driver di ricavi, margini e capitale circolante. Le interessa in particolare come i cambiamenti della domanda compaiano nei risultati e se le spiegazioni del management siano sostenute dai numeri. Nella preparazione della ricerca insiste su ipotesi trasparenti e su materiale ben organizzato, così che i colleghi più esperti possano rivedere un modello e discuterne le conclusioni.',
        ].join('\n\n'),
        results: [
          'Entrata nel team di investimento nel 2023.',
          'Prima nota analitica arrivata al portafoglio entro sei settimane.',
        ],
      },
      'tobias-brandt': {
        slug: 'tobias-brandt',
        role: 'Amministratore delegato',
        about: [
          'Tobias Brandt guida lo sviluppo della clientela di Helfenstein, con esperienza in private banking e vendita azionaria. Lavora con i potenziali clienti per capire le loro priorità e metterli in contatto con i team di investimento e di consulenza più adatti. Il suo lavoro ha contribuito a una crescita del 40% della clientela privata in quattro anni. Ha inoltre avviato il programma di formazione per i clienti, che raggiunge più di 600 partecipanti all\'anno. Parla tedesco, inglese e spagnolo e mette spiegazioni chiare e aspettative definite al centro della relazione.',
          'Considera lo sviluppo commerciale come l\'inizio di una relazione di consulenza duratura. I primi colloqui riguardano ciò che i clienti vogliono ottenere, come preferiscono comunicare e che cosa si aspettano da un supporto professionale. Attraverso il programma di formazione incoraggia domande informate e una migliore comprensione dell\'approccio della società.',
        ].join('\n\n'),
        results: [
          'Crescita del 40% della clientela privata in quattro anni.',
          'Più di 600 partecipanti all\'anno al programma di formazione per i clienti.',
        ],
      },
      'markus-engel': {
        slug: 'markus-engel',
        role: 'Direttore, comunicazione con la clientela',
        about: [
          'Markus Engel dirige la comunicazione con la clientela e il marketing di Helfenstein. Traduce il ragionamento di investimento in reporting chiaro e corrispondenza coerente. Ha ridisegnato i materiali usati dal team di consulenza e segue comunicazioni che accompagnano più di 12\'000 interazioni con i clienti all\'anno. Il suo obiettivo è aiutare i clienti a capire le decisioni di portafoglio, gli sviluppi di mercato e le informazioni rilevanti per la loro situazione. Lavora a stretto contatto con i colleghi di investimento e consulenza perché la comunicazione esterna resti precisa, utile e coerente.',
          'Affronta ogni comunicazione dal punto di vista di chi legge: che cosa è successo, perché conta e se serve un confronto con un consulente. Questo orienta il lavoro su struttura del reporting, coerenza editoriale e presentazione di temi complessi. Dà anche importanza a spiegare l\'incertezza con chiarezza, così che un testo conciso conservi il contesto di cui i clienti hanno bisogno.',
        ].join('\n\n'),
        results: ['Comunicazioni a supporto di più di 12\'000 interazioni con i clienti all\'anno.'],
      },
      'marc-weber': {
        slug: 'marc-weber',
        role: 'Managing Director, Client Operations',
        about: [
          'Marc Weber sovrintende alle operazioni clienti e coordina i rapporti di Helfenstein con le banche depositarie. Con un\'esperienza di private banking, si concentra sull\'amministrazione dei conti, sugli assetti di custodia e sulla chiarezza del reporting. La sua revisione delle condizioni di custodia e regolamento ha contribuito a ridurre i relativi costi dei clienti del 18% dal 2020. Lavora in tedesco, francese e inglese e collega clienti, consulenti e partner bancari per un servizio ordinato e reattivo.',
          'Il suo approccio rende comprensibili le responsabilità del consulente, della banca depositaria e del cliente. Presta attenzione ai dettagli pratici che influenzano la qualità del servizio, tra cui la completezza delle informazioni di conto e la gestione delle richieste aperte. Porta anche uno sguardo attento ai costi nei rapporti bancari, considerando come gli assetti operativi incidano sull\'esperienza complessiva del cliente.',
        ].join('\n\n'),
        results: ['Riduzione del 18% dei costi di custodia e regolamento dei clienti dal 2020.'],
      },
      'anja-hoffmann': {
        slug: 'anja-hoffmann',
        role: 'Consulente alla clientela',
        about: [
          'Anja Hoffmann attinge a un\'esperienza di investor relations di società quotate per spiegare con chiarezza le decisioni di portafoglio e collocarle nelle priorità finanziarie più ampie dei clienti. Gestisce relazioni con più di 180 clienti privati e famiglie, con un\'attenzione a previdenza e pianificazione di lungo periodo. Il suo punteggio di soddisfazione ha raggiunto 4,8 su 5 nell\'ultimo sondaggio annuale. Organizza inoltre i seminari semestrali della società a Lucerna. In tedesco e in inglese porta un approccio diretto e strutturato a conversazioni che altrimenti possono sembrare complesse.',
          'Nei colloqui collega le informazioni di investimento alle decisioni che una famiglia deve davvero prendere. Invece di lasciare i clienti con una raccolta di osservazioni di mercato, chiarisce che cosa quegli sviluppi significano per la discussione successiva sui loro piani. L\'esperienza di investor relations si vede nella scelta attenta delle parole e nella spiegazione del ragionamento, comprese ipotesi e incertezze.',
        ].join('\n\n'),
        results: [
          'Relazioni con più di 180 clienti privati e famiglie.',
          'Punteggio di soddisfazione di 4,8 su 5 nell\'ultimo sondaggio annuale.',
        ],
      },
      'florian-bauer': {
        slug: 'florian-bauer',
        role: 'Consulente alla clientela',
        about: [
          'Florian Bauer consiglia le famiglie sulla struttura del portafoglio e sul ribilanciamento annuale, con una responsabilità particolare per i clienti di lingua tedesca che vivono fuori dalla Svizzera. Privilegia spiegazioni pratiche, un follow-up attento e continuità tra le revisioni formali. Il suo lavoro sul servizio ha portato il tempo medio di risposta alle richieste sotto le quattro ore lavorative. Offre un riferimento chiaro per le domande quotidiane e tiene i colloqui collegati agli obiettivi di investimento e al cambiamento delle circostanze.',
          'Le sue revisioni sono orientate al dettaglio: come è posizionato il portafoglio, se le circostanze sono cambiate e quali temi richiedono ulteriore attenzione. Per i clienti all\'estero dà particolare importanza a una comunicazione organizzata e a una responsabilità chiara del follow-up. Mira a un servizio ordinario affidabile, così che le domande su report, cambiamenti di portafoglio o revisioni imminenti siano trattate con il contesto giusto e un passo successivo chiaro.',
        ].join('\n\n'),
        results: ['Tempo medio di risposta alle richieste dei clienti ridotto a meno di quattro ore lavorative.'],
      },
      'andrew-ramsden': {
        slug: 'andrew-ramsden',
        role: 'Consulente alla clientela',
        about: [
          'Andrew Ramsden porta 30 anni di esperienza nella relazione con la clientela alla pianificazione previdenziale e degli investimenti. Consiglia più di 40 famiglie e le aiuta a considerare come i portafogli possano sostenere bisogni di reddito che cambiano e priorità di lungo periodo. Ha diretto la copertura della clientela privata presso un gestore di Londra. Ha sviluppato la revisione pre-pensionamento usata dal team di consulenza di Helfenstein, un punto di partenza strutturato per discutere preparazione, prelievi e decisioni da seguire nel tempo.',
          'I suoi colloqui affrontano il passaggio dall\'accumulo al prelievo, compreso l\'equilibrio tra reddito regolare, riserve disponibili e bisogni di investimento di più lungo periodo. Dà particolare valore alla revisione delle ipotesi quando cambiano le circostanze familiari. Il suo modo è misurato e accessibile: lascia ai clienti lo spazio per considerare i trade-off e capire come ogni decisione entri in un piano previdenziale più ampio.',
        ].join('\n\n'),
        results: [
          '30 anni di esperienza nella relazione con la clientela.',
          'Consulenza su previdenza e prelievi per più di 40 famiglie.',
        ],
      },
      'erik-schneider': {
        slug: 'erik-schneider',
        role: 'Consulente alla clientela',
        about: [
          'Erik Schneider porta 20 anni di esperienza tra fondi, piattaforme di consulenza e private banking. Da quando è entrato in Helfenstein nel 2016 si concentra su relazioni di lungo periodo e sulla continuità al cambiare delle condizioni di mercato. Il suo lavoro di relazione ha contribuito a trattenere il 98% degli asset durante la volatilità di mercato del 2022. Il passato da direttore di private banking informa un approccio misurato ai colloqui di portafoglio e al servizio. Aiuta i clienti a distinguere gli sviluppi di breve periodo da ciò che conta per i loro piani, tenendo le conversazioni ancorate alle priorità individuali.',
          'Dà valore a capire la storia delle decisioni di un cliente, comprese le esperienze di mercato precedenti e le aspettative verso il supporto agli investimenti. Questa prospettiva lo aiuta a inquadrare le discussioni nei periodi di incertezza senza perdere di vista gli obiettivi originari. Il suo approccio unisce spiegazioni accessibili e la disponibilità a rivedere ipotesi precedenti, perché anche una relazione di lunga data deve adattarsi.',
        ].join('\n\n'),
        results: ['Ha contribuito a trattenere il 98% degli asset durante la volatilità di mercato del 2022.'],
      },
      'andrew-savage': {
        slug: 'andrew-savage',
        role: 'Consulente alla clientela',
        about: [
          'Andrew Savage si concentra sull\'onboarding dei clienti, sul reporting degli investimenti e sul coordinamento delle relazioni che coinvolgono più banche depositarie. Ha accompagnato l\'ingresso di 110 clienti privati in due anni e ha contribuito a ridisegnare il reporting trimestrale; in seguito la misura di soddisfazione riportata è salita di 8 punti. Lavora in inglese e francese, collega i clienti al team di investimento e tiene ordinato il follow-up. Il suo approccio rende le informazioni facili da consultare e fa sì che i clienti capiscano i passi successivi nel rapporto con la società.',
          'Presta particolare attenzione alle prime fasi della relazione, quando i clienti hanno bisogno di capire con chiarezza documenti, responsabilità e modalità di comunicazione. Dove sono coinvolte più banche, aiuta a riunire le informazioni disponibili in una visione più coerente. Considera inoltre il reporting come punto di partenza della discussione, per individuare le domande che meritano attenzione alla revisione successiva.',
        ].join('\n\n'),
        results: [
          '110 nuovi clienti privati accolti in due anni.',
          'Aumento di otto punti della misura di soddisfazione dopo la revisione del reporting.',
        ],
      },
      'birgit-schulz': {
        slug: 'birgit-schulz',
        role: 'Consulente alla clientela',
        about: [
          'Birgit Schulz porta un\'esperienza di controllo qualità nel servizio alla clientela, con punti di forza in documentazione, trasferimenti di conto e accuratezza dei dati. Ha contribuito a ricostruire gli standard CRM del team e ha portato la completezza dei dati registrati sopra il 99%. Segue clienti nei Paesi nordici e nel Benelux e affronta le questioni amministrative complesse con una sequenza chiara di azioni e un follow-up accurato. Il suo lavoro sostiene la continuità nel team di consulenza e offre un riferimento organizzato durante i cambi di conto.',
          'Considera registrazioni accurate una parte essenziale di un buon servizio: permettono ai colleghi di capire che cosa è stato concordato e che cosa resta aperto. Nei trasferimenti individua presto le dipendenze e tiene informate le parti coinvolte. L\'attenzione alla documentazione facilita anche i passaggi di consegne, così i clienti non devono ripetere il contesto quando intervengono più team.',
        ].join('\n\n'),
        results: ['Completezza dei dati clienti portata sopra il 99%.'],
      },
      'alexander-koch': {
        slug: 'alexander-koch',
        role: 'Consulente senior alla clientela',
        about: [
          'Alexander Koch lavora con clienti i cui affari riguardano più banche, più Paesi o fasi della proprietà di un\'impresa. Dal 2022 segue i casi di clientela privata transfrontaliera della società e ha sviluppato un processo per consolidare le informazioni di più depositari. Il suo obiettivo è dare una visione d\'insieme più chiara ad assetti che altrimenti restano frammentati. Coordina discussioni e follow-up e aiuta i clienti a considerare le decisioni di portafoglio insieme alle transizioni d\'impresa e alle priorità previdenziali.',
          'Parte dal capire come le diverse parti delle finanze di un cliente si collegano, invece di valutare ogni conto isolatamente. Quando una transizione d\'impresa cambia lo scopo degli asset investiti, aiuta a ordinare le domande da affrontare. Dà particolare valore a un\'informazione chiara e a una sequenza definita di decisioni, così che assetti complessi siano più semplici da discutere e rivedere.',
        ].join('\n\n'),
        results: ['Responsabile dei casi di clientela privata transfrontaliera dal 2022.'],
      },
      'leon-roth': {
        slug: 'leon-roth',
        role: 'Consulente alla clientela',
        about: [
          'Leon Roth coordina il servizio clienti tra i team di consulenza e quelli operativi di Helfenstein. Segue richieste legate a più di 400 dossier clienti attivi, indirizza le domande ai colleghi giusti e tiene il follow-up in carreggiata. Ha introdotto modelli di risposta condivisi che hanno ridotto del 50% gli errori di passaggio interno e migliorato la coerenza quando le richieste passano da un team all\'altro. Il suo contributo è pratico: mantenere il contesto e aiutare i clienti a orientarsi con una comunicazione chiara.',
          'Tiene traccia della richiesta, del suo contesto e della persona responsabile del passo successivo. È particolarmente utile quando una domanda coinvolge sia un consulente sia uno specialista operativo. Punta alla continuità, con aggiornamenti che spiegano l\'avanzamento e che cosa può ancora servire.',
        ].join('\n\n'),
        results: [
          'Coordinamento del servizio su più di 400 dossier clienti attivi.',
          'Riduzione del 50% degli errori di passaggio interno dopo l\'introduzione di modelli di risposta condivisi.',
        ],
      },
      'henrik-meier': {
        slug: 'henrik-meier',
        role: 'Consulente alla clientela',
        about: [
          'Henrik Meier unisce responsabilità di servizio clienti e un lavoro sulla comunicazione scritta. Produce la lettera mensile della società per più di 8\'000 abbonati e supporta l\'editing delle pubblicazioni in tedesco. Trasforma i contributi del team di investimento e gli aggiornamenti di mercato in spiegazioni concise. Oggetti e struttura più chiari hanno aumentato i tassi di apertura delle e-mail del 19%. Presta particolare attenzione a struttura, formulazione e rilevanza, per mantenere uno standard coerente nella corrispondenza quotidiana e nelle comunicazioni periodiche.',
          'Per lui la chiarezza è tanto una questione di scelta e ordine delle informazioni quanto di semplificazione del linguaggio. Nei testi cerca di rendere il punto principale facile da individuare, conservando il dettaglio necessario. La sua posizione tra servizio clienti e comunicazione lo aiuta ad anticipare le domande che i lettori possono avere sugli aggiornamenti della società.',
        ].join('\n\n'),
        results: [
          'Lettera mensile ai clienti per più di 8\'000 abbonati.',
          'Aumento del 19% dei tassi di apertura dopo oggetti e struttura più chiari.',
        ],
      },
    },
  },
};
