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
        { label: 'Pianificazione successoria', to: ROUTES.estatePlanning },
        { label: 'Immobili e ipoteche', to: ROUTES.realEstate },
        { label: 'Imposte', to: ROUTES.taxes },
      ],
    },
    {
      label: 'Chi siamo',
      to: ROUTES.about,
      children: [
        { label: 'Il nostro team', to: `${ROUTES.about}#our-team` },
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
    { label: 'Previdenza', to: ROUTES.retirement },
    { label: 'Investimenti', to: ROUTES.financialInvestments },
    { label: 'Pianificazione successoria', to: ROUTES.estatePlanning },
    { label: 'Immobili', to: ROUTES.realEstate },
    { label: 'Imposte', to: ROUTES.taxes },
    { label: 'Previdenza complementare', to: ROUTES.pensionPlanning },
    { label: 'Chi siamo', to: ROUTES.about },
    { label: 'Conformità normativa', to: ROUTES.regulatoryAndCompliance },
    { label: 'Il nostro team', to: ROUTES.aboutTeam },
  ],
  topMenu: [
    { label: 'Appuntamenti', to: ROUTES.appointments },
    { label: 'Competenza', to: ROUTES.expertise },
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
    { label: 'Regolamentazione e conformità', to: ROUTES.regulatoryAndCompliance },
    { label: 'Impressum', to: ROUTES.impressum },
  ],
};

export const it: Translations = {
  meta: {
    siteName: 'Helfenstein Group',
    defaultTitle:
      'Helfenstein Group – Consulenza indipendente a onorario per la clientela privata in Svizzera',
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
      'Friedrich Hartmann guida la filosofia di investimento e l’allocazione del capitale a lungo termine di Helfenstein.',
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
      'Solo informazioni generali. Non costituisce consulenza personalizzata in materia di investimenti, fiscalità o diritto. Helfenstein Group non detiene patrimoni della clientela; la custodia è interamente affidata a banche depositarie svizzere partner.',
  },
  nav: navPaths,
  home: {
    testimonial: {
      quote:
        'Presso partner di custodia svizzeri selezionati, i clienti beneficiano di costi inferiori e maggiore sicurezza.',
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
    articles: {
      'compulsory-insurance-switzerland': {
        slug: 'compulsory-insurance-switzerland',
        tagline: 'Assicurazioni',
        title: 'Assicurazioni obbligatorie in Svizzera',
        teaser:
          'Quando stranieri si trasferiscono per la prima volta in Svizzera e vi lavorano, devono sapere quali assicurazioni sono prescritte per legge.',
        body: [
          'Chiunque stabilisca la propria residenza in Svizzera è tenuto per legge a stipulare determinate assicurazioni. Quali di esse si applicano dipende dallo status di soggiorno, dalla situazione professionale e dalle circostanze familiari.',
          'L\'assicurazione malattie di base è obbligatoria per tutte le persone residenti in Svizzera e deve essere sottoscritta entro tre mesi dall\'arrivo. La copertura decorre dalla data di ingresso, senza lacune – ma i premi sono dovuti a partire da quella data.',
          'I dipendenti sono automaticamente assicurati contro gli infortuni professionali tramite il datore di lavoro. La copertura per infortuni non professionali è inclusa non appena si lavora almeno otto ore settimanali presso lo stesso datore di lavoro.',
          'Chiunque possieda un veicolo a motore necessita di un\'assicurazione di responsabilità civile prima che il veicolo possa essere immatricolato. In molti cantoni, l\'assicurazione immobiliare è obbligatoria.',
        ],
      },
      'save-on-taxes-with-pillar-3a': {
        slug: 'save-on-taxes-with-pillar-3a',
        tagline: 'Pilastro 3a',
        title: 'Come risparmiare sulle imposte con il pilastro 3a',
        teaser:
          'Chi utilizza il pilastro 3a, oltre ai pilastri AVS e cassa pensione, per risparmiare in vista della vecchiaia può dedurre i versamenti dal reddito imponibile.',
        body: [
          'Il pilastro 3a è il modo più diffuso per risparmiare sulle imposte in Svizzera. I versamenti possono essere dedotti integralmente dal reddito imponibile, fino a un importo massimo annuo periodicamente adeguato. Poiché siamo remunerati soltanto da Lei, possiamo raccomandare il fornitore 3a più adatto – banca, fondazione o assicuratore – senza alcuna preferenza nostra.',
          'I dipendenti affiliati a una cassa pensione possono versare ogni anno fino a un importo fisso in franchi. I lavoratori indipendenti senza cassa pensione possono contribuire fino al 20 per cento del reddito netto da lavoro dipendente, entro un limite massimo.',
          'I patrimoni del pilastro 3a sono esenti dall\'imposta patrimoniale e i rendimenti sono esenti dall\'imposta sul reddito finché restano sul conto. Al prelievo, il capitale è tassato separatamente dagli altri redditi a un\'aliquota ridotta.',
          'Distribuire i risparmi su più conti e prelevarli in anni diversi mantiene bassa la progressione e può far risparmiare diverse migliaia di franchi.',
        ],
      },
      'tips-for-foreigners-buying-real-estate': {
        slug: 'tips-for-foreigners-buying-real-estate',
        tagline: 'Immobili',
        title: 'Consigli per stranieri che desiderano acquistare un immobile',
        teaser:
          'Esistono diversi fattori che gli acquirenti stranieri dovrebbero considerare quando acquistano un immobile in Svizzera. L\'acquisto immobiliare è un investimento rilevante, che comporta anche un certo rischio.',
        body: [
          'I cittadini stranieri residenti in Svizzera con permesso C possono acquistare immobili alle stesse condizioni dei cittadini svizzeri. I titolari di un permesso B possono acquistare un\'abitazione per uso proprio nel luogo di residenza.',
          'Gli istituti di credito richiedono generalmente almeno il 20 per cento del prezzo d\'acquisto a titolo di capitale proprio, di cui almeno il 10 per cento deve provenire da fonti diverse dalla previdenza professionale.',
          'La capacità di sostenere l\'onere finanziario viene valutata in modo prudente: i costi imputati dell\'ipoteca, della manutenzione e dell\'ammortamento non dovrebbero superare circa un terzo del reddito lordo.',
          'Gli acquirenti devono prevedere spese notarili, tasse di registro fondiario e imposta sul trasferimento immobiliare, che variano sensibilmente da cantone a cantone.',
        ],
      },
      'is-it-worth-paying-more-into-your-pension-fund': {
        slug: 'is-it-worth-paying-more-into-your-pension-fund',
        tagline: 'Cassa pensione',
        title: 'Conviene versare di più nella cassa pensione?',
        teaser:
          'Con versamenti volontari nella cassa pensione è possibile risparmiare molto sulle imposte e disporre di maggiori mezzi di sussistenza in età avanzata.',
        imageAlt: 'Tabella che mostra i rendimenti di un versamento volontario nella cassa pensione',
        body: [
          'Gli acquisti volontari di prestazioni supplementari nella cassa pensione sono integralmente deducibili dal reddito imponibile nell\'anno in cui vengono effettuati. Per i contribuenti con redditi elevati ciò può significare un risparmio immediato pari a un terzo o più dell\'importo versato.',
          'Il capitale cresce esente da imposta sul reddito e patrimoniale fino al momento del prelievo. Più lungo è il periodo residuo fino al pensionamento, maggiore è l\'effetto composto del vantaggio d\'interesse.',
          'Gli acquisti effettuati nei tre anni precedenti al pensionamento non possono essere prelevati in capitale senza perdere la deduzione fiscale; il tempismo è quindi determinante.',
          'Prima di effettuare un acquisto, verifichi il grado di copertura della Sua cassa pensione e confronti il tasso di conversione con quanto potrebbe ottenere investendo la stessa somma privatamente.',
        ],
      },
      'financial-investments-what-you-need-know': {
        slug: 'financial-investments-what-you-need-know',
        tagline: 'Investimenti finanziari',
        title: 'Investimenti finanziari: ciò che deve sapere',
        teaser:
          'Chi desidera investire denaro con successo dovrebbe adottare un approccio strutturato e, innanzitutto, definire la strategia d\'investimento appropriata.',
        body: [
          'Una solida strategia d\'investimento parte dalle Sue circostanze personali: quanto del Suo patrimonio può vincolare, per quanto tempo e quanta oscillazione è in grado di sopportare.',
          'Solo una volta fissata la strategia segue la scelta dei singoli investimenti. Fondi indicizzati diversificati e a basso costo sono il mattoncino più efficiente per la maggior parte degli investitori.',
          'I costi sono una delle poche certezze negli investimenti. Ogni franco risparmiato sulle commissioni resta investito e si capitalizza per l\'intera durata del detenimento – ed è per questo che un consulente che non riceve alcuna parte di quelle commissioni è l\'unico a non avere motivo di trascurarle.',
        ],
      },
      'all-you-need-to-know-about-etfs': {
        slug: 'all-you-need-to-know-about-etfs',
        tagline: 'Investimenti',
        title: 'Tutto ciò che deve sapere sugli ETF',
        teaser: 'Gli ETF sono economici, trasparenti e liquidi, e offrono numerosi altri vantaggi.',
        body: [
          'Gli exchange traded fund replicano un indice e possono essere acquistati e venduti in borsa durante l\'intera giornata di negoziazione, come un\'azione.',
          'Poiché sono gestiti passivamente, i loro costi correnti ammontano a una frazione di quelli dei fondi gestiti attivamente – tipicamente poche centesimi di percento per gli indici ampi e liquidi.',
          'Presti attenzione al metodo di replica, al domicilio del fondo e all\'entità del tracking difference, e non solo alla commissione nominale.',
        ],
      },
      'current-mortgage-interest-rates-comparison': {
        slug: 'current-mortgage-interest-rates-comparison',
        tagline: 'Ipoteche',
        title: 'Tassi ipotecari attuali – un confronto',
        teaser:
          'Helfenstein confronta continuamente i tassi ipotecari attuali dei principali fornitori in Svizzera.',
        body: [
          'I tassi ipotecari differiscono sensibilmente tra banche, assicuratori e casse pensioni – spesso di oltre mezzo punto percentuale per una identica durata fissa.',
          'Su un\'ipoteca di un milione di franchi, tale differenza corrisponde a diverse migliaia di franchi all\'anno, il che rende il confronto delle offerte una delle ore più redditizie che possa dedicare.',
          'I tassi sono anche negoziabili. I tassi pubblicati sono prezzi di listino, e un mutuatario ben preparato con solida capacità di sostenere l\'onere finanziario può generalmente ottenere condizioni migliori.',
        ],
      },
    },
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
        text: 'La aiutiamo a collocare il pilastro 3a in soluzioni indicizzate a basso costo, depositate presso la banca o la fondazione svizzera di Sua scelta. Nell\'arco di una vita lavorativa, commissioni più basse possono valere decine di migliaia di franchi.',
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
    marketVideo: {
      slug: 'helfenstein-financial-portal',
      tagline: 'Helfenstein Financial Portal',
      title: 'Una visione chiara di tutto ciò che possiede',
      teaser: 'Video di Helfenstein Group (1:46 minuti)',
      videoNote: 'Video di Helfenstein Group (1:46 minuti)',
      body: [
        'Helfenstein Financial Portal riunisce in un\'unica vista le posizioni che detiene presso tutte le Sue banche partner svizzere, i Suoi documenti e i dati di mercato aggiornati.',
        'Watchlist, alert e analisi del portafoglio sono inclusi senza costi aggiuntivi. I Suoi patrimoni restano sempre presso la Sua banca; le eventuali transazioni sono eseguite dalla banca depositaria.',
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
        'Combiniamo una strategia d\'investimento chiaramente definita con un\'implementazione a basso costo e un\'assistenza attiva. Il Suo portafoglio è intestato a Lei presso una banca svizzera di Sua scelta; noi lo gestiamo, non lo deteniamo mai. Sa sempre cosa possiede, quanto costa e perché è nel Suo portafoglio.',
        'Poiché Helfenstein Group non percepisce retrocessioni, l\'unica commissione che paga è quella concordata con noi.',
      ],
      highlights: [
        { title: 'Mandati di gestione patrimoniale', text: 'Gestione discrezionale a partire da un nucleo indicizzato ampiamente diversificato.' },
        { title: 'Investimenti indicizzati', text: 'Costi correnti pari a una frazione di quelli dei fondi gestiti attivamente.' },
        { title: 'Analisi del portafoglio', text: 'Un secondo parere scritto sul portafoglio che detiene oggi.' },
        { title: 'I Suoi patrimoni restano presso la Sua banca', text: 'Helfenstein Group non detiene mai patrimoni della clientela. La custodia resta presso banche svizzere consolidate, a Suo nome.' },
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
        'Helfenstein Group non detiene mai patrimoni della clientela. I Suoi titoli e la Sua liquidità restano su un conto intestato a Lei presso una banca depositaria svizzera, che Le invia direttamente i rendiconti; noi vi aggiungiamo la gestione del portafoglio e la consulenza.',
        'La aiutiamo a scegliere un depositario, a confrontare quanto addebita ciascuno e ad assicurarsi che il reporting sia chiaro. Le commissioni di custodia e di transazione sono fissate e addebitate dalla Sua banca, mai da noi.',
      ],
      highlights: [
        { title: 'Patrimoni a Suo nome', text: 'Custodia segregata presso una banca svizzera autorizzata di Sua scelta.' },
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
        'Helfenstein Group è una società svizzera indipendente di consulenza e gestione patrimoniale con sede a Lucerna. Consigliamo persone e famiglie private – mai istituzioni o aziende – in materia di gestione patrimoniale, consulenza finanziaria, previdenza e finanziamenti.',
        'Siamo iscritti presso la FINMA come gestori patrimoniali autorizzati e sottoposti alla vigilanza di OSFINcontrol AG. Il nostro reddito proviene esclusivamente dagli onorari concordati con i nostri clienti e non deteniamo patrimoni della clientela: la custodia resta presso banche partner svizzere.',
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
        'La maggior parte della consulenza finanziaria in Svizzera è finanziata dai prodotti che raccomanda. Questo rapporto è invisibile al cliente e favorisce sistematicamente soluzioni costose.',
        'Helfenstein Group è remunerata esclusivamente dai propri clienti – persone e famiglie private, mai istituzioni o aziende. Pubblichiamo i nostri onorari, accreditiamo qualsiasi retrocessione che non possiamo evitare, i nostri consulenti non hanno obiettivi di vendita di prodotti e non deteniamo mai i Suoi patrimoni: la custodia resta presso banche partner svizzere, a Suo nome.',
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
      subtitle: 'Con sede a Lucerna, al servizio di clienti in tutta la Svizzera.',
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
        'I patrimoni della clientela sono custoditi presso partner di custodia svizzeri selezionati, mai da noi. Siamo autorizzati dalla FINMA come gestori patrimoniali e sottoposti alla vigilanza di OSFINcontrol AG.',
      ],
      highlights: [
        { title: 'Gestione patrimoniale', text: 'Mandati costruiti attorno a un processo d\'investimento chiaro.' },
        { title: 'Consulenza finanziaria', text: 'Previdenza, finanziamenti e pianificazione personale accanto agli investimenti.' },
        { title: 'Partner di custodia', text: 'Custodia segregata a Suo nome presso banche svizzere autorizzate.' },
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
        'Il Portale finanziario Helfenstein Le offre una visione consolidata dei conti e dei portafogli che detiene presso le Sue banche partner svizzere, insieme a tutti i Suoi documenti e ai dati di mercato aggiornati.',
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
            'Le informazioni pubblicate su questo sito web sono fornite esclusivamente a scopo informativo generale. Non costituiscono un\'offerta, una raccomandazione o un invito ad acquistare o vendere strumenti finanziari, né costituiscono consulenza in materia di investimenti, legale o fiscale. Helfenstein Asset Management AG (Helfenstein Group) è una consulente e gestore patrimoniale indipendente; non detiene patrimoni della clientela, che restano presso la banca depositaria svizzera del cliente.',
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
            'L\'utilizzo di questo sito web è regolato dal diritto svizzero. Il foro esclusivo è Lucerna, Svizzera.',
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
            'Informazioni sui nostri servizi, segmentazione dei clienti, gestione dei conflitti d\'interessi e la nostra affiliazione a un ufficio di conciliazione.',
          ],
        },
        {
          heading: 'Informazioni societarie',
          paragraphs: [
            'Helfenstein Asset Management AG (operante come Helfenstein Group) pubblica su questo sito web le informazioni regolamentari e quelle destinate alla clientela. La società è una consulente indipendente remunerata esclusivamente a onorario e un gestore patrimoniale autorizzato dalla FINMA; non detiene patrimoni della clientela. Per le iscrizioni più recenti consulti il registro di commercio svizzero (IDI CHE-111.708.730).',
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
            'Consulenza finanziaria indipendente remunerata esclusivamente a onorario e gestione patrimoniale per la clientela privata: previdenza, investimenti, imposte, immobili e pianificazione successoria. I patrimoni della clientela sono custoditi presso banche partner svizzere e non dalla società.',
          ],
        },
        {
          heading: 'Sorveglianza',
          paragraphs: [
            'Helfenstein Asset Management AG è iscritta presso la FINMA come gestore di portafoglio ed è sottoposta a vigilanza di OSFINcontrol AG.',
            'Le autorizzazioni possono essere verificate nel registro ufficiale della FINMA (https://www.finma.ch/it/finma-public/istituti-persone-e-prodotti-autorizzati/).',
            'Registrazione LEI: https://search.gleif.org/#/record/894500URZFTDV5G7F357',
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
      'Friedrich Hartmann guida la filosofia d\'investimento e l\'allocazione del capitale a lungo termine di Helfenstein.',
    members: {
      'friedrich-hartmann': {
        slug: 'friedrich-hartmann',
        role: 'Presidente e CIO',
        about:
          'Friedrich Hartmann ha plasmato la cultura d\'investimento di Helfenstein per oltre trent\'anni. Lettore disciplinato e appassionato di camminate, guida ancora oggi la costruzione del portafoglio e definisce il quadro di valore a lungo termine della società.',
        results: [
          'Ha costruito la strategia azionaria di punta di Helfenstein fin dalla sua origine; rendimento annuo composto dell\'11,4% dal 2004.',
          'Tre volte indicato tra i principali gestori value in Europa da rating indipendenti di fondi.',
          'Autore de In Long Horizon, sul capitale paziente e l\'investimento consapevole dei cicli.',
        ],
      },
      'karin-vogel': {
        slug: 'karin-vogel',
        role: 'Gestore di portafoglio',
        about:
          'Karin Vogel è entrata in Helfenstein da boutique value di Madrid e Saragozza. Copre le mid-cap europee con uno stile forense bottom-up e un approccio calmo e diretto con i clienti.',
        results: [
          'CFA Charterholder; analista principale del fondo Continental Value dal 2016.',
          'Il portafoglio ha sovraperformato il benchmark del 2,8% annualizzato negli ultimi cinque anni.',
          'Riconosciuta internamente per aver trasformato tre partecipazioni industriali trascurate in posizioni core a lungo termine.',
        ],
      },
      'lukas-steiner': {
        slug: 'lukas-steiner',
        role: 'Gestore di portafoglio',
        about:
          'Lukas Steiner si è formato a Vienna e Londra prima di entrare in Helfenstein. Combina analisi fondamentale azionaria con un vivo interesse per l\'economia austriaca e il calcio – di solito in quest\'ordine nei giorni di partita.',
        results: [
          'Gestisce la componente azionaria iberica della società insieme ai co-gestori europei.',
          'Ha ridotto il turnover medio del portafoglio del 22% migliorando al contempo il tasso di successo sulle nuove idee.',
          'Relatore regolare al forum di ricerca interno di Helfenstein sul timing dei cicli di capitale.',
        ],
      },
      'maximilian-berger': {
        slug: 'maximilian-berger',
        role: 'Gestore di portafoglio',
        about:
          'Maximilian Berger è passato dalla revisione alla gestione di portafoglio, portando con sé uno sguardo critico sulla qualità contabile. I colleghi lo descrivono come riservato in riunione e instancabile nel workbook.',
        results: [
          'Ha segnalato per tempo due rischi di bilancio che in seguito sono diventati ampiamente discussi sul mercato.',
          'Co-gestisce partecipazioni europee difensive nella gamma Global Value.',
          'Ha guidato la revisione del 2023 degli standard di reporting nell\'universo investibile di Helfenstein.',
        ],
      },
      'julian-vogt': {
        slug: 'julian-vogt',
        role: 'Gestore di portafoglio',
        about:
          'Julian Vogt possiede lauree in giurisprudenza e economia e un profondo interesse per la teoria del capitale. Fuori dall\'ufficio è più probabile trovarlo su un campo da golf o a rivedere un film preferito che a controllare i prezzi.',
        results: [
          'Ha strutturato la checklist di governance di Helfenstein ora utilizzata prima di ogni nuova posizione rilevante.',
          'Ha contribuito a ridurre gli attriti legali e regolamentari in tre partecipazioni transfrontaliere.',
          'Fa da mentore ai analisti junior nella redazione di tesi e nel dimensionamento delle posizioni.',
        ],
      },
      'ken-wagner': {
        slug: 'ken-wagner',
        role: 'Gestore di portafoglio',
        about:
          'Ken Wagner collega il desk europeo di Helfenstein con opportunità quotate in Asia. Nato a Taipei e formatosi a Barcellona, viaggia spesso e legge i documenti societari con la stessa pazienza.',
        results: [
          'Ha avviato la prima copertura di ricerca Asia-Pacifico dedicata di Helfenstein nel 2019.',
          'Ha individuato quattro investimenti che oggi rappresentano oltre l\'8% del portafoglio globale.',
          'Parla fluentemente mandarino, tedesco e spagnolo; referente principale per i broker regionali.',
        ],
      },
      'stefan-richter': {
        slug: 'stefan-richter',
        role: 'Gestore di portafoglio',
        about:
          'Stefan Richter ha trascorso anni lato sell-side prima di entrare in Helfenstein. Appassionato di trail running quando non è in ufficio, preferisce imprese che possono capitalizzare silenziosamente attraverso i cicli.',
        results: [
          'Ex responsabile ricerca di un gruppo industriale quotato; entrato in Helfenstein nel 2015.',
          'Performance nel quartile superiore sulle partecipazioni cicliche nel periodo 2020–2022.',
          'Ha costruito la watchlist transizione energetica adottata dall\'intero comitato investimenti.',
        ],
      },
      'greta-keller': {
        slug: 'greta-keller',
        role: 'Analista junior',
        about:
          'Greta Keller è entrata in Helfenstein dopo un tirocinio in investor relations ed è rapidamente passata al piano investimenti. Porta competenze di modellizzazione aggiornate e un occhio insolitamente acuto per i trend di consumo.',
        results: [
          'Laureata con il massimo dei voti in economia aziendale; entrata nel team nel 2023.',
          'Prima nota analitica portata al portafoglio entro sei settimane dall\'inizio.',
          'Supporta la copertura di titoli consumer e industriali small-cap nella regione DACH.',
        ],
      },
      'tobias-brandt': {
        slug: 'tobias-brandt',
        role: 'Amministratore delegato',
        about:
          'Tobias Brandt guida lo sviluppo della clientela di Helfenstein dopo esperienze in private banking e equity sales. Di solito è la prima persona con cui parla un potenziale cliente prima che venga fissato un primo incontro.',
        results: [
          'Ha fatto crescere la base di clientela privata di Helfenstein del 40% in quattro anni.',
          'Ha lanciato il programma di formazione per i clienti della società, oggi frequentato da oltre 600 persone all\'anno.',
          'In precedenza ha diretto la copertura della clientela privata per l\'Iberia presso una piattaforma multi-asset europea.',
        ],
      },
      'markus-engel': {
        slug: 'markus-engel',
        role: 'Direttore, comunicazione con la clientela',
        about:
          'Markus Engel dirige la comunicazione con la clientela e il marketing. Cordiale al telefono e preciso nel follow-up, mantiene coerente la voce esterna di Helfenstein con il modo in cui i portafogli sono effettivamente gestiti.',
        results: [
          'Ha ricostruito il reporting e la corrispondenza con la clientela utilizzati dall\'intero team di consulenza.',
          'Ha introdotto il formato della lettera trimestrale ora citato da diversi titoli economici nazionali.',
          'Guida il team che gestisce oltre 12\'000 contatti clienti all\'anno.',
        ],
      },
      'marc-weber': {
        slug: 'marc-weber',
        role: 'Managing Director, Client Operations',
        about:
          'Marc Weber coordina le operazioni clienti e i rapporti con le nostre banche depositarie. Proviene dal private banking e si assicura che i clienti ricevano un reporting chiaro dalla banca che custodisce i loro patrimoni, a Lucerna e in tutta la Svizzera.',
        results: [
          'Ha ridotto del 18% dal 2020 i costi di custodia e regolamento che i clienti Helfenstein pagano alla propria banca.',
          'Ha guidato la revisione che ha trasferito i clienti su conti di custodia segregati intestati a loro nome.',
          'Negozia le condizioni di custodia con le nostre banche partner svizzere per conto della clientela privata.',
        ],
      },
      'anja-hoffmann': {
        slug: 'anja-hoffmann',
        role: 'Consulente alla clientela',
        about:
          'Anja Hoffmann è passata alla gestione patrimoniale dalle IR di società quotate. I clienti apprezzano il suo stile diretto e il modo in cui spiega movimenti complessi del portafoglio in linguaggio chiaro.',
        results: [
          'Gestisce relazioni con oltre 180 clienti privati e famiglie.',
          'Punteggio di soddisfazione clienti di 4,8/5 nell\'ultimo sondaggio annuale.',
          'Organizza i seminari semestrali per la clientela di Helfenstein a Lucerna.',
        ],
      },
      'florian-bauer': {
        slug: 'florian-bauer',
        role: 'Consulente alla clientela',
        about:
          'Florian Bauer segue clienti che si aspettano dettaglio, non dramma. Ex appassionato di tennis convertito a sciatore del weekend, è affidabile sotto pressione e raramente manca una richiamata.',
        results: [
          'Consiglia le famiglie sulla struttura del portafoglio e sul ribilanciamento annuale.',
          'Ha ridotto il tempo medio di risposta alle richieste a meno di quattro ore lavorative.',
          'Referente principale per i clienti di lingua tedesca residenti fuori dalla Svizzera.',
        ],
      },
      'andrew-ramsden': {
        slug: 'andrew-ramsden',
        role: 'Consulente alla clientela',
        about:
          'Andrew Ramsden porta tre decenni di esperienza nella relazione con la clientela al desk di consulenza di Helfenstein. Misurato e accessibile, è la persona che i clienti chiamano quando una decisione richiede chiarezza, non spin.',
        results: [
          'Consiglia oltre 40 famiglie su pensionamento e pianificazione dei prelievi.',
          'Ha sviluppato l\'analisi scritta di pre-pensionamento oggi usata da tutto il team di consulenza.',
          'Ex responsabile della copertura della clientela privata presso un gestore di Londra prima di entrare in Helfenstein nel 2019.',
        ],
      },
      'erik-schneider': {
        slug: 'erik-schneider',
        role: 'Consulente alla clientela',
        about:
          'Erik Schneider ha trascorso due decenni tra fondi e piattaforme di consulenza. Stabile e senza fretta, è spesso la prima persona che i clienti di lunga data chiedono quando i mercati diventano turbolenti.',
        results: [
          'Gestisce il portafoglio clienti con la più lunga anzianità di Helfenstein, risalente al 2008.',
          'Ha contribuito a trattenere il 98% degli asset durante il picco di volatilità del 2022.',
          'Ex direttore private banking prima di entrare in Helfenstein nel 2016.',
        ],
      },
      'andrew-savage': {
        slug: 'andrew-savage',
        role: 'Consulente alla clientela',
        about:
          'Andrew Savage si specializza nell\'onboarding di nuovi clienti e in un reporting accurato. Energico nelle riunioni e meticoloso nel follow-up, collega il team di investimento e i clienti senza perdere il dettaglio.',
        results: [
          'Ha accolto 110 nuovi clienti privati negli ultimi due anni.',
          'Ha ricostruito il pacchetto di reporting trimestrale inviato a ogni cliente; la soddisfazione è salita di otto punti.',
          'Referente principale per i clienti con patrimoni presso più di una banca depositaria.',
        ],
      },
      'birgit-schulz': {
        slug: 'birgit-schulz',
        role: 'Consulente alla clientela',
        about:
          'Birgit Schulz è entrata nei servizi finanziari dopo una carriera nel controllo qualità – un background che emerge nel modo in cui documenta ogni interazione con i clienti. Calma, metodica e difficile da turbare.',
        results: [
          'Ha ricostruito gli standard di igiene CRM del team; completezza dati ora superiore al 99%.',
          'Supporta clienti nordici e del Benelux in tre lingue.',
          'Riconosciuta per aver risolto i trasferimenti di conti legacy più complessi della società.',
        ],
      },
      'alexander-koch': {
        slug: 'alexander-koch',
        role: 'Consulente senior alla clientela',
        about:
          'Alexander Koch segue clienti con situazioni più complesse: più banche, patrimoni in più di un Paese oppure un\'attività che viene liquidata in vista della pensione. Giovane, ma già un interlocutore affidabile nelle conversazioni difficili.',
        results: [
          'Segue dal 2022 i casi di clientela privata transfrontaliera della società.',
          'Ha creato il processo di consolidamento per i clienti con patrimoni presso più depositari.',
          'Coordina il questionario sulle preferenze di sostenibilità previsto dalla LSerFi.',
        ],
      },
      'leon-roth': {
        slug: 'leon-roth',
        role: 'Consulente alla clientela',
        about:
          'Leon Roth mantiene in funzione il servizio clienti di Helfenstein. I colleghi contano su di lui per collegare il desk giusto al momento giusto senza che i clienti si sentano passati di mano in mano.',
        results: [
          'Coordina richieste inter-team per oltre 400 dossier clienti attivi.',
          'Ha introdotto modelli di risposta condivisi che hanno dimezzato gli errori di passaggio interno.',
          'Noto per trasformare casi di servizio difficili in fedeltà clienti a lungo termine.',
        ],
      },
      'henrik-meier': {
        slug: 'henrik-meier',
        role: 'Consulente alla clientela',
        about:
          'Henrik Meier scrive gli aggiornamenti quotidiani per i clienti e supporta il team comunicazione. Chiaro, conciso e leggermente musicale fuori dal lavoro – suona la chitarra in una band d\'ufficio migliore di quanto sembri.',
        results: [
          'Produce la lettera mensile ai clienti, letta da oltre 8\'000 abbonati.',
          'Ha contribuito ad aumentare del 19% i tassi di apertura e-mail grazie a oggetti e struttura più chiari.',
          'Redattore di riserva per tutte le pubblicazioni esterne in lingua tedesca.',
        ],
      },
    },
  },
};
