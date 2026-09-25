import { ROUTES } from '../../constants/routes';
import type { Translations } from '../types';

const navPaths = {
  mainNavigation: [
    {
      label: 'Particuliers',
      to: ROUTES.individuals,
      children: [
        { label: 'Retraite', to: ROUTES.retirement },
        { label: 'Placements financiers et gestion de fortune', to: ROUTES.financialInvestments },
        { label: 'Investissements alternatifs', to: ROUTES.alternativeInvestments },
        { label: 'Planification successorale', to: ROUTES.estatePlanning },
        { label: 'Immobilier et hypothèques', to: ROUTES.realEstate },
        { label: 'Impôts', to: ROUTES.taxes },
      ],
    },
    {
      label: 'À propos',
      to: ROUTES.about,
      children: [
        { label: 'Notre équipe', to: ROUTES.aboutTeam },
        { label: 'Conformité réglementaire', to: `${ROUTES.about}#regulatory-compliance` },
        { label: 'Conseil indépendant', to: ROUTES.aboutIndependentAdvice },
        { label: 'Notre régulation', to: ROUTES.aboutHowWeAreRegulated },
        { label: 'Emplois et carrières', to: ROUTES.aboutJobs },
        { label: 'Contact et assistance', to: ROUTES.aboutContact },
        { label: 'Exemples de clients', to: ROUTES.aboutClientStories },
      ],
    },
  ],
  quickLinks: [
    {
      label: 'Finance',
      to: ROUTES.financialInvestments,
      children: [
        { label: 'Placements financiers et gestion de fortune', to: ROUTES.financialInvestments },
        { label: 'Investissements alternatifs', to: ROUTES.alternativeInvestments },
        { label: 'Marchés et analyses', to: ROUTES.stockExchangesAndMarkets },
        { label: 'Dépositaire et partenaires bancaires', to: ROUTES.banking },
        { label: 'Immobilier et hypothèques', to: ROUTES.realEstate },
        { label: 'Portail financier Helfenstein', to: ROUTES.financialPortal },
      ],
    },
    {
      label: 'À propos',
      to: ROUTES.about,
      children: [
        { label: 'Notre équipe', to: ROUTES.aboutTeam },
        { label: 'Conformité réglementaire', to: ROUTES.regulatoryAndCompliance },
        { label: 'Conseil indépendant', to: ROUTES.aboutIndependentAdvice },
        { label: 'Notre régulation', to: ROUTES.aboutHowWeAreRegulated },
        { label: 'Emplois et carrières', to: ROUTES.aboutJobs },
        { label: 'Contact et assistance', to: ROUTES.aboutContact },
        { label: 'Exemples de clients', to: ROUTES.aboutClientStories },
      ],
    },
    { label: 'Retraite', to: ROUTES.retirement },
    { label: 'Investissements alternatifs', to: ROUTES.alternativeInvestments },
    { label: 'Planification successorale', to: ROUTES.estatePlanning },
    { label: 'Immobilier', to: ROUTES.realEstate },
    { label: 'Impôts', to: ROUTES.taxes },
    { label: 'Prévoyance', to: ROUTES.pensionPlanning },
  ],
  topMenu: [
    {
      label: 'Expertise',
      to: ROUTES.expertise,
      children: [
        { label: 'Retraite', to: ROUTES.retirement },
        { label: 'Placements financiers et gestion de fortune', to: ROUTES.financialInvestments },
        { label: 'Investissements alternatifs', to: ROUTES.alternativeInvestments },
        { label: 'Planification successorale', to: ROUTES.estatePlanning },
        { label: 'Immobilier et hypothèques', to: ROUTES.realEstate },
        { label: 'Impôts', to: ROUTES.taxes },
        { label: 'Prévoyance', to: ROUTES.pensionPlanning },
      ],
    },
    { label: 'Rendez-vous', to: ROUTES.appointments },
    { label: 'Analyses', to: ROUTES.insights },
    { label: 'Portail financier Helfenstein', to: ROUTES.financialPortal },
  ],
  actionLinks: [
    { label: 'Emplois', to: ROUTES.aboutJobs },
    { label: 'Contact et assistance', to: ROUTES.aboutContact },
    { label: 'S\'abonner à la newsletter', to: ROUTES.newsletter },
  ],
  legalLinks: [
    { label: 'Mentions légales', to: ROUTES.legalNotices },
    { label: 'Protection des données', to: ROUTES.privacyPolicy },
    { label: 'Documents et informations', to: ROUTES.documentsAndInformation },
    { label: 'Rapports d\'audit', to: ROUTES.auditReports },
    { label: 'Réglementation et conformité', to: ROUTES.regulatoryAndCompliance },
    { label: 'Impressum', to: ROUTES.impressum },
  ],
};

export const fr: Translations = {
  meta: {
    siteName: 'Helfenstein Group',
    defaultTitle:
      'Helfenstein Group – Conseil indépendant à honoraires pour la clientèle privée dans le monde',
    defaultDescription:
      'Conseil indépendant en planification de la retraite, placements financiers, planification successorale, immobilier, impôts, assurances et prévoyance. Rémunérés uniquement par nos clients ; nous ne détenons aucun avoir de la clientèle.',
    teamDescription:
      'Des conseillers indépendants qui ne rendent de comptes qu\'à leurs clients – Helfenstein Group.',
    notFoundTitle: 'Page introuvable',
  },
  ui: {
    search: 'Rechercher',
    menu: 'Menu',
    login: 'Connexion',
    makeAppointment: 'Prendre rendez-vous',
    arrangeAppointment: 'Fixer un rendez-vous',
    orderForFree: 'Commander gratuitement',
    subscribeNow: 'S\'abonner maintenant',
    signUpForFree: 'S\'inscrire gratuitement',
    readMore: 'En savoir plus',
    backToHome: 'Retour à la page d\'accueil',
    popularTopics: 'Thèmes populaires',
    pageNotFound: 'Page introuvable',
    pageNotFoundBody:
      'La page que vous recherchez n\'existe pas ou a été déplacée. Veuillez utiliser la navigation ci-dessus ou reprendre depuis l\'un des thèmes ci-dessous.',
    news: 'Actualités',
    ourOffering: 'Notre offre',
    stockExchangeAndMarkets: 'Marchés et analyses',
    moreStockMarketNews: 'Plus d\'actualités et d\'analyses de marché',
    marketData: 'Données de marché',
    marketDataCaption:
      'Niveaux indicatifs des indices et des devises avec la variation depuis la clôture précédente',
    instrument: 'Instrument',
    level: 'Niveau',
    change: 'Variation',
    moreOfferings: 'Plus d\'offres',
    propertyType: 'Type de bien',
    whatWeDoForYou: 'Ce que nous faisons pour vous',
    relatedArticles: 'Articles connexes',
    team: 'Équipe',
    teamSubtitle: 'Des conseillers indépendants qui ne rendent de comptes qu\'à leurs clients',
    featuredMemberLead:
      'Friedrich Hartmann dirige la stratégie d\'investissement d\'Helfenstein et l\'allocation de capital à long terme.',
    about: 'À propos',
    results: 'Réalisations',
    colleagues: 'Collègues',
    knowledgeHub: 'Centre de connaissances',
    position: 'Fonction',
    skipToSearch: 'Aller à la recherche',
    skipToNav: 'Aller à la navigation principale',
    skipToMain: 'Aller au contenu principal',
    skipToFooter: 'Aller à la navigation du pied de page',
    searchWebsite: 'Rechercher sur le site',
    searchPlaceholder: 'Que recherchez-vous ?',
    reset: 'Réinitialiser',
    searchSubmit: 'Rechercher',
    noResults: 'Aucun résultat pour',
    cookieNotice: 'Avis relatif aux cookies',
    cookieBody:
      'Ce site utilise des cookies et d\'autres technologies de suivi. Pour plus d\'informations, veuillez consulter nos',
    legalNotice: 'Mentions légales',
    privacyPolicy: 'Protection des données',
    dismissCookie: 'Fermer l\'avis relatif aux cookies',
    findUsOn: 'Retrouvez-nous également sur :',
    externalLink: '(lien externe)',
    externalLinkNewWindow: '(lien externe, s\'ouvre dans une nouvelle fenêtre)',
    home: 'Accueil',
    finmaAlt: 'FINMA – Établissements, personnes et produits autorisés',
    logoAria: 'Helfenstein Group – accueil',
    mainNav: 'Navigation principale',
    topNav: 'Navigation supérieure',
    quickLinks: 'Liens rapides',
    footerNav: 'Navigation du pied de page',
    legalNav: 'Mentions légales',
    subscribeNewsletter: 'S\'abonner à la newsletter',
    forIndividuals: 'Pour les particuliers',
    clientStories: 'Exemples de clients',
    verifyAuthorisation: 'Vérifier notre autorisation',
    relatedService: 'Service associé',
    allInsights: 'Toutes les analyses',
    meetSpecialists: 'Nos spécialistes',
    regulatoryChallenges: 'Défis réglementaires',
    howWeHelp: 'Comment nous aidons',
    adviceDisclaimer:
      'Informations générales uniquement. Ne constitue pas un conseil personnalisé en investissement, fiscalité ou droit. Helfenstein Group ne détient aucun avoir de la clientèle ; la conservation reste auprès de la banque de votre choix, sous votre contrôle.',
    verified: 'Vérifié',
    viewOnMap: 'Voir sur la carte',
    trustSignals: 'Vérification et contact',
    officeAddress: 'Siège',
    ombudsmanHeading: 'Ombudsman',
    ombudsmanReference: 'Référence',
    verifiedFinma: 'Vérifié — ouvre le registre officiel FINMA',
    verifiedLei: 'Vérifié — ouvre l’enregistrement LEI Bloomberg',
    verifiedHelp: 'Vérifié — ouvre l’annuaire HELP.ch',
    verifiedOsfin: 'Vérifié — ouvre la page de surveillance OSFINcontrol',
    verifiedAudit: 'Vérifié — ouvre l’extrait Zefix (organe de révision)',
    portalShort: 'Portail',
    finmaCardTitle: 'Gestionnaire de fortune FINMA',
    leiCardTitle: 'Identifiant d’entité juridique',
    helpCardTitle: 'Annuaire HELP.ch',
    auditCardTitle: 'Organe de révision',
    auditCardDetail: 'Audit et dépôts | Organe de révision inscrit au Zefix',
    authorisationNo: 'N°',
    professionalFocus: 'Priorités professionnelles',
    languages: 'Langues',
    finmaAdviserLabel: 'N° de conseiller enregistré FINMA',
    cfaRegistryLabel: 'N° au registre CFA',
    advisesUnder: 'Conseille dans le cadre de l’autorisation FINMA {no} de {firm}.',
    verifyFinmaRegister: 'Vérifiez la société au registre FINMA',
    confirmCfa: 'confirmez la charte CFA dans l’annuaire du CFA Institute',
    loading: 'Chargement…',
    loadingTeam: 'Chargement de l’équipe…',
    teamUnavailable: 'La liste de l’équipe n’a pas pu être chargée.',
    clearSearch: 'Effacer la recherche',
    searchHint: 'Saisissez au moins deux caractères pour lancer la recherche.',
  },
  nav: navPaths,
  home: {
    testimonial: {
      quote:
        'Auprès de la banque dépositaire de votre choix, les clients bénéficient de coûts inférieurs et d\'une sécurité accrue.',
      positionLabel: 'Fonction',
      position: 'Directeur, opérations clients',
      imageAlt: 'Portrait de Marc Weber, directeur des opérations clients chez Helfenstein',
      ctaLabel: 'Prendre rendez-vous',
    },
    newsletter: {
      text: 'Des informations concrètes sur la prévoyance, les impôts, les placements et l\'immobilier – écrites pour la clientèle privée, sans promotion de produits.',
      linkLabel: 'Abonnez-vous à notre newsletter (en anglais, allemand, français et italien).',
    },
  },
  content: {
    articles: {},
    offers: [
      {
        id: 'checklist-retirement',
        title: 'Check-list pour planifier votre retraite',
        tag: 'Fiche d\'information',
        teaser:
          'La retraite marque le passage à un nouveau chapitre de la vie — également sur le plan financier. Pour pouvoir envisager sereinement vos années de retraite, vous devrez prendre un certain nombre de décisions très importantes.',
        cta: 'Commander gratuitement',
        imageAlt: 'Check-list imprimée pour la planification de la retraite',
      },
      {
        id: 'free-first-meeting',
        title: 'Premier entretien gratuit',
        tag: 'Rendez-vous',
        teaser: 'Échangez avec un expert d\'Helfenstein. Le premier entretien est gratuit.',
        cta: 'Fixer un rendez-vous',
      },
      {
        id: 'phishing-protection',
        title: 'Protégez vos avoirs contre le phishing',
        tag: 'Fiche d\'information',
        teaser:
          'Notre guide gratuit vous montre comment reconnaître les messages frauduleux, ce qu\'il faut vérifier avant de donner suite à une instruction, et que faire dans la première heure si quelque chose tourne mal.',
        cta: 'Commander gratuitement',
      },
    ],
    solutions: [
      {
        title: 'Planification de la retraite',
        text: 'Nous modélisons vos revenus de retraite année par année, par écrit, afin que vous voyiez exactement ce que vous pouvez vous permettre — avant de prendre des décisions irréversibles.',
      },
      {
        title: 'Pilier 3a avec placements indiciels',
        text: 'Nous vous aidons à placer votre pilier 3a dans des solutions indicielles à faibles coûts, déposées auprès de la banque ou de la fondation de votre choix. Sur une vie professionnelle, des frais inférieurs peuvent représenter des dizaines de milliers de francs.',
      },
      {
        title: 'Conseil fiscal',
        text: 'Nos experts vous montrent comment structurer, des années à l\'avance, vos décisions de prévoyance, immobilières et de domicile — là où se réalisent les véritables économies d\'impôts.',
      },
      {
        title: 'Mandats de gestion de fortune',
        text: 'Une stratégie claire, une mise en œuvre à faibles coûts et un accompagnement continu — gérés par nous, déposés auprès de votre banque. Vous savez toujours ce que vous détenez, ce que cela coûte et pourquoi.',
      },
    ],
    property: {
      type: 'Maison unifamiliale',
      imageAlt: 'Vue aérienne d\'une maison unifamiliale avec jardin',
      specs: [
        { label: 'Adresse' },
        { label: 'Nombre de pièces' },
        { label: 'Surface habitable' },
        { label: 'Surface du terrain' },
        { label: 'Année de construction' },
        { label: 'Prix de vente' },
      ],
    },
  },
  topics: {
    [ROUTES.individuals]: {
      path: ROUTES.individuals,
      breadcrumb: ['Particuliers'],
      title: 'Particuliers',
      subtitle: 'Un conseil indépendant pour chaque étape de la vie.',
      intro: [
        'Helfenstein Group conseille les particuliers et les familles — et eux seuls — en matière de retraite, de placements, de planification successorale, d\'immobilier, d\'impôts et de prévoyance. Nous sommes rémunérés uniquement par nos clients, jamais par des banques, des assureurs ou des fournisseurs de produits, et nous ne détenons jamais vos avoirs. Chaque recommandation n\'a qu\'un seul objectif : votre intérêt.',
        'Chaque mandat commence par une analyse écrite de votre situation. Vous décidez ensuite si et comment vous souhaitez travailler avec nous.',
      ],
      highlights: [
        { title: 'Retraite', text: 'Déterminez précisément quand vous pouvez vous permettre de cesser toute activité professionnelle et ce que cela coûtera.' },
        { title: 'Placements', text: 'Une stratégie claire, mise en œuvre avec des fonds indiciels à faibles coûts auprès de votre propre banque et réexaminée en continu.' },
        { title: 'Planification successorale', text: 'Testaments, conventions matrimoniales et donations organisés pour que vos volontés soient juridiquement sécurisées.' },
        { title: 'Impôts', text: 'Une planification fiscale à long terme, pour que les grandes décisions soient structurées avant le dépôt de la déclaration.' },
      ],
    },
    [ROUTES.retirement]: {
      path: ROUTES.retirement,
      breadcrumb: ['Particuliers', 'Retraite'],
      title: 'Planification de la retraite',
      subtitle: 'Sachez dès aujourd\'hui à quoi ressemblera votre retraite.',
      intro: [
        'La retraite est la décision financière la plus importante que la plupart des personnes prennent. Rente ou capital, retraite anticipée ou retrait échelonné, montant que vous pouvez dépenser en toute sécurité chaque année — ces choix sont irréversibles et interagissent les uns avec les autres.',
        'Nos spécialistes modélisent vos revenus et vos avoirs année par année, par écrit, afin que vous puissiez voir les conséquences de chaque option avant de vous engager.',
      ],
      highlights: [
        { title: 'Rente ou capital', text: 'Une comparaison côte à côte des deux options sur l\'ensemble de votre espérance de vie.' },
        { title: 'Retraite anticipée', text: 'Ce que coûte réellement un arrêt deux ou trois ans plus tôt, après impôts.' },
        { title: 'Planification des retraits', text: 'L\'ordre dans lequel puiser dans l\'AVS, la caisse de pension et les avoirs privés.' },
        { title: 'Contrôle budgétaire', text: 'Une vision réaliste des dépenses que vos avoirs permettront réellement de couvrir.' },
      ],
    },
    [ROUTES.financialInvestments]: {
      path: ROUTES.financialInvestments,
      breadcrumb: ['Particuliers', 'Placements financiers et gestion de fortune'],
      title: 'Placements financiers et gestion de fortune',
      subtitle: 'Une stratégie simple, mise en œuvre efficacement.',
      intro: [
        'Nous combinons une stratégie de placement clairement définie avec une mise en œuvre à faibles coûts et un accompagnement actif. Votre portefeuille est déposé à votre nom auprès de la banque de votre choix ; nous le gérons, nous ne le détenons jamais. Vous savez toujours ce que vous détenez, combien cela coûte et pourquoi cela figure dans votre portefeuille.',
        'Comme Helfenstein Group ne perçoit aucune rétrocession, le seul honoraire que vous payez est celui convenu avec nous.',
      ],
      highlights: [
        { title: 'Mandats de gestion de fortune', text: 'Gestion discrétionnaire à partir d\'un noyau indiciel largement diversifié.' },
        { title: 'Placements indiciels', text: 'Des frais courants représentant une fraction de ceux des fonds gérés activement.' },
        { title: 'Analyse de portefeuille', text: 'Un second avis écrit sur le portefeuille que vous détenez aujourd\'hui.' },
        { title: 'Vos avoirs restent auprès de votre banque', text: 'Helfenstein Group ne détient jamais d\'avoirs de la clientèle. La conservation reste auprès de la banque de votre choix, à votre nom et sous votre contrôle.' },
      ],
    },
    [ROUTES.alternativeInvestments]: {
      path: ROUTES.alternativeInvestments,
      breadcrumb: ['Finance', 'Investissements alternatifs'],
      title: 'Investissements alternatifs',
      subtitle: 'Marchés privés, actifs réels et crypto — uniquement là où ils ont leur place.',
      intro: [
        'Les investissements alternatifs se situent hors des actions et obligations cotées : private equity et private credit, fonds spéculatifs, matières premières, infrastructures, fonds immobiliers sélectionnés et actifs numériques tels que les cryptomonnaies. Ils peuvent ajouter des sources de rendement, mais aussi des coûts, de la complexité, des périodes de blocage et, dans certains cas, le risque d\'une perte totale. Nous partons d\'une allocation de cœur écrite. Les alternatives sont un satellite, jamais un substitut à un portefeuille diversifié détenu à votre nom auprès de la banque de votre choix.',
        'Les cryptomonnaies sont l\'alternative dont la plupart des clients parlent en premier. Le bitcoin, l\'ether et les jetons qui les suivent sont très volatils, ne versent aucun revenu fiable et peuvent tomber à zéro. Ce ne sont pas une monnaie au sens habituel, ni un dépôt bancaire, et ils ne sont pas couverts par un système de garantie des dépôts. Des plateformes, des prestataires de portefeuilles et des produits de « rendement » ont fait faillite, ont été piratés ou se sont révélés non autorisés. Toute allocation dont nous discutons est dimensionnée pour une perte que vous pouvez supporter — une fois le reste de votre plan en place.',
        'Helfenstein Group ne détient aucun avoir de la clientèle et n\'exploite ni plateforme d\'échange ni portefeuille crypto. Si des actifs numériques ont une place dans votre plan, ils restent auprès d\'un dépositaire de votre choix — une banque ou un prestataire spécialisé pouvant les détenir à votre nom. Nous ne percevons aucune rétrocession d\'émetteurs de jetons ni de plateformes. Le premier entretien sert à décider si des alternatives, y compris la crypto, ont réellement leur place dans votre situation.',
      ],
      highlights: [
        { title: 'Marchés privés', text: 'Actions et crédit non cotés : blocages plus longs, moins de transparence et des minimums plus élevés qu\'un fonds coté.' },
        { title: 'Actifs réels', text: 'Matières premières, infrastructures et fonds immobiliers sélectionnés comme diversifiants — pas comme décoration.' },
        { title: 'Crypto et actifs numériques', text: 'Un satellite petit et facultatif, après un budget de risque écrit. Volatilité, conservation et risque de fraude d\'abord. Rien ici n\'est une recommandation d\'achat.' },
        { title: 'L\'adéquation d\'abord', text: 'Les règles LSFin s\'appliquent toujours. Si vous ne pouvez pas expliquer la position, elle n\'a pas sa place dans le portefeuille.' },
      ],
    },
    [ROUTES.estatePlanning]: {
      path: ROUTES.estatePlanning,
      breadcrumb: ['Particuliers', 'Planification successorale'],
      title: 'Planification successorale',
      subtitle: 'Réglez votre succession tant que cela reste simple.',
      intro: [
        'Le droit successoral suisse répartit rarement une succession comme les personnes le supposent. Sans testament, les partenaires non mariés n\'héritent de rien et les conjoints survivants se retrouvent souvent en copropriété avec les enfants.',
        'Nous vous montrons ce que la loi ferait dans votre cas, et quels instruments — testaments, conventions matrimoniales, donations, directives anticipées — permettront de réaliser ce que vous souhaitez réellement.',
      ],
      highlights: [
        { title: 'Testaments et pactes successoraux', text: 'Rédigés de manière à être valables, dans le respect des parts réservataires.' },
        { title: 'Conventions matrimoniales', text: 'Coordination du régime matrimonial avec votre planification successorale.' },
        { title: 'Donations et avances', text: 'Transmission de patrimoine de votre vivant sans créer de litiges.' },
        { title: 'Exécuteurs testamentaires', text: 'Une partie neutre pour administrer la succession et soulager votre famille.' },
      ],
    },
    [ROUTES.realEstate]: {
      path: ROUTES.realEstate,
      breadcrumb: ['Particuliers', 'Immobilier et hypothèques'],
      title: 'Immobilier et hypothèques',
      subtitle: 'Financez votre bien aux meilleures conditions disponibles.',
      intro: [
        'Les taux hypothécaires varient considérablement entre les banques, les assureurs et les caisses de pension. Sur une hypothèque importante, l\'écart entre le prestataire le moins cher et le plus cher représente facilement plusieurs milliers de francs par an.',
        'Helfenstein Group compare le marché en permanence, négocie en votre nom et vérifie la capacité financière bien avant l\'échéance de votre taux fixe. Nous ne recevons rien d\'aucun prêteur : la recommandation est simplement la meilleure offre disponible.',
      ],
      highlights: [
        { title: 'Comparaison hypothécaire', text: 'Conditions actuelles de plus d\'une centaine de prêteurs suisses.' },
        { title: 'Refinancement', text: 'Un appel d\'offres structuré à l\'échéance de votre taux fixe actuel.' },
        { title: 'Capacité financière', text: 'Un contrôle prudent qui reste valable même en cas de hausse des taux d\'intérêt.' },
        { title: 'Achat et vente', text: 'Estimations et accompagnement tout au long de la transaction.' },
      ],
    },
    [ROUTES.taxes]: {
      path: ROUTES.taxes,
      breadcrumb: ['Particuliers', 'Impôts'],
      title: 'Conseil fiscal',
      subtitle: 'Optimisez votre situation fiscale à long terme.',
      intro: [
        'La plupart des économies d\'impôts ne se trouvent pas dans la déclaration annuelle, mais dans des décisions prises des années auparavant : la manière dont vous vous constituez une prévoyance, le moment où vous retirez votre capital de prévoyance, votre lieu de domicile et la manière dont vous détenez votre bien immobilier.',
        'Nos experts vous montrent comment structurer ces décisions dans le bon ordre — comme nous ne vendons aucun produit, le conseil porte sur votre situation fiscale et sur rien d\'autre.',
      ],
      highlights: [
        { title: 'Déclarations fiscales', text: 'Établies et déposées pour les particuliers et les indépendants.' },
        { title: 'Retraits de capital de prévoyance', text: 'Échelonnés sur plusieurs années pour limiter la progression fiscale.' },
        { title: 'Fiscalité immobilière', text: 'Valeur locative imputée, entretien et investissements créateurs de valeur.' },
        { title: 'Déménagement', text: 'Ce qu\'un changement de canton ou de commune vaut réellement.' },
      ],
    },
    [ROUTES.insurance]: {
      path: ROUTES.insurance,
      breadcrumb: ['Particuliers', 'Assurances'],
      title: 'Assurances',
      subtitle: 'Couvrez les risques qui comptent, abandonnez ceux qui ne comptent pas.',
      intro: [
        'De nombreux ménages sont simultanément surassurés pour de petits risques abordables et sous-assurés contre ceux qui menaceraient réellement leurs finances — l\'invalidité et la perte de revenu.',
        'Nous examinons vos polices au regard des lacunes de votre couverture AVS et de caisse de pension, et restructurons le portefeuille en fonction de vos besoins réels.',
      ],
      highlights: [
        { title: 'Analyse des risques', text: 'Ce que l\'AVS et votre caisse de pension verseraient réellement.' },
        { title: 'Assurance-vie et invalidité', text: 'Une couverture dimensionnée à vos obligations, et non à un objectif de vente.' },
        { title: 'Assurance-maladie', text: 'Franchise et modèle choisis sur la base du calcul, réexaminés chaque année.' },
        { title: 'Protection contre le phishing', text: 'Un guide gratuit pour repérer les messages frauduleux et réagir vite si l\'un d\'eux passe.' },
      ],
    },
    [ROUTES.pensionPlanning]: {
      path: ROUTES.pensionPlanning,
      breadcrumb: ['Particuliers', 'Prévoyance'],
      title: 'Prévoyance',
      subtitle: 'Constituez efficacement votre troisième pilier.',
      intro: [
        'Le pilier 3a est l\'instrument d\'économie d\'impôts le plus efficace pour la plupart des personnes en Suisse, et la différence entre un compte d\'épargne et une solution indicielle bien choisie se chiffre en dizaines de milliers de francs sur une vie professionnelle.',
        'Nous vous aidons à choisir le véhicule, la stratégie et le moment du retrait.',
      ],
      highlights: [
        { title: 'Pilier 3a avec placements indiciels', text: 'Des solutions indicielles à faibles coûts, choisies pour vous et déposées auprès du prestataire de votre choix.' },
        { title: 'Rachats volontaires', text: 'Quand un rachat à la caisse de pension est réellement rentable.' },
        { title: 'Plusieurs comptes', text: 'Des retraits échelonnés qui réduisent l\'impôt sur le capital.' },
        { title: 'Libre passage', text: 'Où placer votre capital entre deux emplois.' },
      ],
    },
    [ROUTES.banking]: {
      path: ROUTES.banking,
      breadcrumb: ['Particuliers', 'Conservation et partenaires bancaires'],
      title: 'Conservation et partenaires bancaires',
      subtitle: 'Vos avoirs restent auprès de votre propre banque.',
      intro: [
        'Helfenstein Group ne détient jamais d\'avoirs de la clientèle. Vos titres et vos liquidités restent sur un compte à votre nom auprès d\'une banque dépositaire de votre choix, qui vous adresse ses relevés directement ; nous y ajoutons la gestion de portefeuille et le conseil.',
        'Nous vous aidons à choisir un dépositaire, à comparer ce que chacun facture et à vous assurer que le reporting est clair. Les frais de conservation et de transaction sont fixés et facturés par votre banque, jamais par nous.',
      ],
      highlights: [
        { title: 'Des avoirs à votre nom', text: 'Conservation ségréguée auprès d\'une banque de votre choix, sous votre contrôle.' },
        { title: 'Choisir un dépositaire', text: 'Une comparaison à conditions égales des tarifs et des prestations de conservation.' },
        { title: 'Hypothèques', text: 'Financement obtenu sur la base de conditions comparées.' },
        { title: 'Sécurité', text: 'Accès multifacteur et surveillance de la fraude assurée par votre banque.' },
      ],
    },
    [ROUTES.about]: {
      path: ROUTES.about,
      breadcrumb: ['À propos'],
      title: 'À propos',
      subtitle: 'Un conseil indépendant depuis Lucerne.',
      intro: [
        'Helfenstein Group est un conseiller et gestionnaire de fortune indépendant établi à Lucerne. Nous conseillons les particuliers et les familles — jamais des institutions ni des entreprises — en matière de gestion de fortune, de conseil financier, de planification de la retraite et de financement, où qu\'ils vivent.',
        'Nous figurons au registre de la FINMA en qualité de gestionnaire de fortune autorisé et sommes surveillés par OSFINcontrol AG. Nos revenus proviennent exclusivement des honoraires convenus avec nos clients, et nous ne détenons aucun avoir de la clientèle : la conservation reste auprès de la banque de votre choix, sous votre contrôle.',
      ],
      highlights: [
        { title: 'Notre équipe', text: 'Des spécialistes qui vous accompagnent sur le long terme.' },
        { title: 'Conformité réglementaire', text: 'Autorisation FINMA, surveillance OSFINcontrol et notre enregistrement Bloomberg LEI.' },
        { title: 'Conseil indépendant', text: 'Aucune rétrocession, aucun objectif de vente de produits.' },
        { title: 'Exemples de clients', text: 'Des exemples anonymisés de conseil délivré en pratique.' },
      ],
    },
    [ROUTES.aboutIndependentAdvice]: {
      path: ROUTES.aboutIndependentAdvice,
      breadcrumb: ['À propos', 'Conseil indépendant'],
      title: 'Conseil indépendant',
      subtitle: 'Rémunérés par nos clients. Par personne d\'autre.',
      intro: [
        'La plupart des conseils financiers sont financés par les produits qu\'ils recommandent. Cet arrangement est invisible pour le client et favorise systématiquement les solutions les plus coûteuses.',
        'Helfenstein Group est rémunérée uniquement par ses clients — des particuliers et des familles, jamais des institutions ni des entreprises. Nous publions nos honoraires, reversons toute rétrocession que nous ne pouvons éviter, nos conseillers n\'ont aucun objectif de vente de produits, et nous ne détenons jamais vos avoirs : la conservation reste auprès de la banque de votre choix, à votre nom et sous votre contrôle.',
      ],
      highlights: [
        { title: 'Transparence des honoraires', text: 'Vous connaissez le coût avant de prendre toute décision.' },
        { title: 'Aucune rétrocession', text: 'Tout paiement de tiers vous est crédité.' },
        { title: 'Analyse écrite', text: 'Des recommandations que vous pouvez lire, vérifier et conserver.' },
        { title: 'Premier entretien gratuit', text: 'La consultation initiale ne vous coûte rien.' },
      ],
    },
    [ROUTES.aboutOffice]: {
      path: ROUTES.aboutOffice,
      breadcrumb: ['À propos', 'Notre site'],
      title: 'Notre site',
      subtitle: 'Établis à Lucerne, au service de clients privés dans le monde.',
      intro: [
        'Helfenstein Asset Management AG a son siège à la Pilatusstrasse 23, à Lucerne. Nous conseillons nos clients en allemand, français, italien et anglais.',
        'Appelez le +41 41 211 29 29 ou fixez un premier entretien gratuit.',
      ],
      highlights: [
        { title: 'Bureau de Lucerne', text: 'Pilatusstrasse 23, 6003 Luzern.' },
        { title: 'Téléphone', text: '+41 41 211 29 29, en semaine pendant les heures de bureau.' },
        { title: 'Langues', text: 'Allemand, français, italien et anglais.' },
        { title: 'Rendez-vous', text: 'En personne à Lucerne ou par visioconférence.' },
      ],
    },
    [ROUTES.aboutPortrait]: {
      path: ROUTES.aboutPortrait,
      breadcrumb: ['À propos', 'Portrait'],
      title: 'Portrait',
      subtitle: 'Un gestionnaire de fortune lucernois au modèle de conseil clair.',
      intro: [
        'Helfenstein Group conseille depuis son bureau de Lucerne les particuliers et les familles en matière de gestion de fortune, de conseil financier, de planification de la retraite et de financement. Nous n\'intervenons pas pour des institutions ni pour des entreprises.',
        'Les avoirs des clients sont conservés auprès d\'une banque dépositaire de votre choix, jamais par nous. Nous sommes autorisés par la FINMA en qualité de gestionnaire de fortune et surveillés par OSFINcontrol AG.',
      ],
      highlights: [
        { title: 'Gestion de fortune', text: 'Des mandats construits autour d\'un processus de placement clair.' },
        { title: 'Conseil financier', text: 'Retraite, financement et planification personnelle aux côtés des placements.' },
        { title: 'Partenaires de conservation', text: 'Conservation ségréguée à votre nom auprès d\'une banque de votre choix.' },
        { title: 'Lucerne', text: 'Pilatusstrasse 23, 6003 Luzern.' },
      ],
    },
    [ROUTES.aboutCompanyInformation]: {
      path: ROUTES.aboutCompanyInformation,
      breadcrumb: ['À propos', 'Informations sur la société'],
      title: 'Informations sur la société',
      subtitle: 'Qui nous sommes sur le papier, et comment nous joindre.',
      intro: [
        'Cette page réunit les données enregistrées de Helfenstein Asset Management AG, qui opère sous le nom de Helfenstein Group, ainsi que nos contacts médias.',
        'Pour toute question relative au conseil ou à un mandat existant, veuillez utiliser la page de contact.',
      ],
      highlights: [
        { title: 'Profil de la société', text: 'Raison sociale, IDE, LEI et adresse à Lucerne.' },
        { title: 'Régulation', text: 'Gestionnaire de fortune FINMA ; surveillé par OSFINcontrol AG.' },
        { title: 'Prestations', text: 'Conseil indépendant et gestion de fortune pour la clientèle privée.' },
        { title: 'Contact', text: '+41 41 211 29 29 · Pilatusstrasse 23, Luzern.' },
      ],
    },
    [ROUTES.aboutJobs]: {
      path: ROUTES.aboutJobs,
      breadcrumb: ['À propos', 'Emplois et carrières'],
      title: 'Emplois et carrières',
      subtitle: 'Un conseil sans objectifs de vente.',
      intro: [
        'Comme Helfenstein Group ne tire aucun revenu de produits et ne détient aucun avoir de la clientèle, nos conseillers sont évalués sur la qualité de leur conseil plutôt que sur les volumes vendus. Cela transforme fondamentalement le métier.',
        'Nous sommes toujours heureux d\'échanger avec des conseillers, des spécialistes et des jeunes diplômés qui souhaitent travailler ainsi.',
      ],
      highlights: [
        { title: 'Postes de conseil', text: 'Fonctions en contact direct avec la clientèle en retraite, fiscalité et placements.' },
        { title: 'Spécialistes', text: 'Actuariat, droit, informatique et opérations bancaires.' },
        { title: 'Jeunes diplômés', text: 'Programmes d\'entrée structurés avec un mentor.' },
        { title: 'Travailler chez Helfenstein', text: 'Modèles flexibles et formation continue.' },
      ],
    },
    [ROUTES.aboutContact]: {
      path: ROUTES.aboutContact,
      breadcrumb: ['À propos', 'Contact et assistance'],
      title: 'Contact et assistance',
      subtitle: 'Nous sommes heureux de vous entendre.',
      intro: [
        'Appelez-nous, écrivez-nous ou fixez un premier entretien gratuit dans notre bureau de Lucerne ou par visioconférence. Nos conseillers parlent allemand, français, italien et anglais — et aucun d\'entre eux n\'a quoi que ce soit à vous vendre.',
        'Pour toute question relative au Portail financier Helfenstein, notre équipe d\'assistance est disponible en semaine pendant les heures de bureau.',
      ],
      highlights: [
        { title: 'Téléphone', text: '+41 41 211 29 29, du lundi au vendredi de 08h00 à 18h00.' },
        { title: 'Adresse', text: 'Pilatusstrasse 23, 6003 Luzern, Suisse.' },
        { title: 'Rendez-vous', text: 'Réservez un premier entretien gratuit en ligne en quelques minutes.' },
        { title: 'Assistance portail', text: 'Aide pour la connexion, l\'accès à deux facteurs et le reporting.' },
      ],
    },
    [ROUTES.appointments]: {
      path: ROUTES.appointments,
      breadcrumb: ['Rendez-vous'],
      title: 'Prendre rendez-vous',
      subtitle: 'Le premier entretien est gratuit.',
      intro: [
        'Échangez avec un conseiller de Helfenstein Group au sujet de votre retraite, de vos placements, de vos impôts ou de votre hypothèque. La première consultation ne coûte rien et ne vous engage à rien — et comme nous sommes rémunérés uniquement par nos clients, personne dans la pièce ne cherche à vous vendre un produit.',
        'Choisissez l\'horaire qui vous convient — dans notre bureau de Lucerne ou par visioconférence — et indiquez-nous brièvement ce que vous souhaitez aborder.',
      ],
      highlights: [
        { title: 'Premier entretien gratuit', text: 'Environ une heure, en personne ou par visioconférence.' },
        { title: 'Analyse écrite', text: 'Une proposition concrète fait suite au premier entretien.' },
        { title: 'Sans engagement', text: 'Vous décidez ensuite si vous souhaitez poursuivre.' },
        { title: 'Toute langue', text: 'Allemand, français, italien ou anglais.' },
      ],
      ctaLabel: 'Fixer un rendez-vous',
    },
    [ROUTES.expertise]: {
      path: ROUTES.expertise,
      breadcrumb: ['Expertise'],
      title: 'Expertise',
      subtitle: 'Connaissances, études et outils de nos spécialistes.',
      intro: [
        'Helfenstein Group publie des analyses sur la retraite, la prévoyance, les impôts, les hypothèques et les placements, ainsi que des check-lists que vous pouvez commander gratuitement.',
        'Commencez par le rapport Horizon, parcourez les insights par thème ou ouvrez l\'index complet des articles. Comme nous ne vendons aucun produit, ce que vous lisez ici est notre propre analyse et non un argumentaire de vente.',
      ],
      highlights: [
        { title: 'Rapport Horizon 2026', text: 'Prévoyance, hypothèques et évolutions de la LSFin en langage clair.' },
        { title: 'Index des insights', text: 'Tous les articles classés par date, avec des thèmes.' },
        { title: 'Fiches d\'information', text: 'Guides imprimés concis, envoyés gratuitement.' },
        { title: 'Premier entretien gratuit', text: 'Une heure avec un conseiller, à Lucerne ou par visioconférence.' },
      ],
    },
    [ROUTES.financialPortal]: {
      path: ROUTES.financialPortal,
      breadcrumb: ['Portail financier Helfenstein'],
      title: 'Portail financier Helfenstein',
      subtitle: 'Votre portefeuille, vos documents, vos marchés.',
      intro: [
        'Le Portail financier Helfenstein vous offre une vue consolidée des comptes et portefeuilles que vous détenez auprès de votre banque dépositaire, ainsi que de l\'ensemble de vos documents et des données de marché actuelles.',
        'Vos avoirs restent auprès de votre banque — le portail est votre fenêtre sur ceux-ci, et non un lieu où de l\'argent est détenu.',
      ],
      highlights: [
        { title: 'Vue d\'ensemble du portefeuille', text: 'Performance consolidée de l\'ensemble de vos avoirs.' },
        { title: 'Documents', text: 'Relevés et documents fiscaux dans une archive unique.' },
        { title: 'Reporting', text: 'Performance, coûts et allocation sur l\'ensemble de vos positions, expliqués en langage clair.' },
        { title: 'Sécurité', text: 'Authentification à deux facteurs à chaque connexion.' },
      ],
    },
    [ROUTES.stockExchangesAndMarkets]: {
      path: ROUTES.stockExchangesAndMarkets,
      breadcrumb: ['Marchés et analyses'],
      title: 'Marchés et analyses',
      subtitle: 'Cours, actualités et notre point de vue indépendant.',
      intro: [
        'Données de marché, commentaires et outils utiles au même endroit, gratuits une fois inscrit. Nous publions nos propres analyses parce que nous ne vendons aucun produit — ce que vous lisez ici est notre opinion, pas un argumentaire de vente.',
        'Suivez les indices, les devises, les taux d\'intérêt et les titres individuels, et définissez des alertes sur les positions qui comptent pour vous.',
      ],
      highlights: [
        { title: 'Cours de marché', text: 'Actions, indices et devises suisses et internationaux.' },
        { title: 'Listes de surveillance', text: 'Suivez les titres qui vous intéressent et définissez des alertes.' },
        { title: 'Analyses', text: 'Commentaires de nos spécialistes en placements.' },
        { title: 'Outils', text: 'Filtres, graphiques et simulations de portefeuille.' },
      ],
      ctaLabel: 'S\'inscrire gratuitement',
    },
    [ROUTES.newsletter]: {
      path: ROUTES.newsletter,
      breadcrumb: ['S\'abonner à la newsletter'],
      title: 'S\'abonner à notre newsletter',
      subtitle: 'Des informations indépendantes, sans rien à vous vendre.',
      intro: [
        'Des informations concrètes et indépendantes sur la prévoyance, les impôts, les placements et l\'immobilier — écrites pour la clientèle privée, sans promotion de produits. Publiée en anglais, allemand, français et italien.',
        'Vous pouvez sélectionner les thèmes qui vous intéressent et vous désabonner à tout moment en un clic.',
      ],
      highlights: [
        { title: 'Prévoyance', text: 'AVS, prévoyance professionnelle et pilier 3a.' },
        { title: 'Impôts', text: 'Échéances, déductions et possibilités de planification.' },
        { title: 'Placements', text: 'Stratégie, coûts et commentaire de marché.' },
        { title: 'Immobilier', text: 'Taux hypothécaires et marché immobilier.' },
      ],
      ctaLabel: 'S\'abonner maintenant',
    },
    [ROUTES.checklistRetirementPlanning]: {
      path: ROUTES.checklistRetirementPlanning,
      breadcrumb: ['Check-list pour planifier votre retraite'],
      title: 'Check-list pour planifier votre retraite',
      subtitle: 'Commandez la fiche d\'information gratuitement.',
      intro: [
        'La retraite marque le passage à un nouveau chapitre de la vie — également sur le plan financier. Pour pouvoir envisager sereinement vos années de retraite, vous devrez prendre un certain nombre de décisions très importantes.',
        'Notre check-list vous guide pas à pas, à partir d\'environ dix ans avant la date prévue de votre cessation d\'activité.',
      ],
      highlights: [
        { title: 'Dix ans avant', text: 'Combler les lacunes de cotisation et examiner votre caisse de pension.' },
        { title: 'Cinq ans avant', text: 'Choisir entre rente et capital, planifier les retraits.' },
        { title: 'Un an avant', text: 'S\'inscrire auprès de la caisse de compensation AVS, ajuster les assurances.' },
        { title: 'Après la retraite', text: 'Gérer les retraits, les impôts et votre succession.' },
      ],
      ctaLabel: 'Commander gratuitement',
    },
    [ROUTES.phishingProtection]: {
      path: ROUTES.phishingProtection,
      breadcrumb: ['Protégez vos avoirs contre le phishing'],
      title: 'Protégez vos avoirs contre le phishing',
      subtitle: 'Un guide pratique pour la clientèle privée.',
      intro: [
        'Le phishing est devenu la voie la plus courante d\'accès non autorisé aux comptes financiers. Même des personnes prudentes et bien informées sont parfois prises au piège par un message convaincant.',
        'Notre guide gratuit explique comment les fraudeurs ciblent les investisseurs privés, ce qu\'il faut vérifier avant de donner suite à un message qui semble provenir de votre banque ou de nous, et que faire — et qui appeler — dans la première heure si quelque chose tourne mal. Comme vos avoirs sont déposés auprès de votre banque et jamais auprès de Helfenstein Group, nous expliquons également quelles mesures de sécurité votre banque met à disposition et comment les utiliser.',
      ],
      highlights: [
        { title: 'Comment fonctionnent les attaques', text: 'Les messages, appels et faux sites utilisés contre les investisseurs privés.' },
        { title: 'Ce qu\'il faut vérifier', text: 'La poignée de contrôles qui déjoue presque toutes les tentatives.' },
        { title: 'Les protections de votre banque', text: 'Les mesures offertes par votre banque dépositaire, et comment les activer.' },
        { title: 'Si quelque chose tourne mal', text: 'Qui appeler dans la première heure, et dans quel ordre.' },
      ],
      ctaLabel: 'Commander gratuitement',
    },
  },
  legal: {
    'legal-notices': {
      slug: 'legal-notices',
      title: 'Mentions légales',
      sections: [
        {
          paragraphs: [
            'Les informations publiées sur ce site web sont fournies à titre d\'information générale uniquement. Elles ne constituent ni une offre, ni une recommandation, ni une invitation à acheter ou vendre un instrument financier, ni un conseil en placement, juridique ou fiscal. Helfenstein Asset Management AG (Helfenstein Group) est un conseiller et gestionnaire de fortune indépendant ; la société ne détient pas d\'avoirs de la clientèle, ceux-ci restant auprès de la banque dépositaire choisie par le client.',
          ],
        },
        {
          heading: 'Absence de garantie',
          paragraphs: [
            'Bien que le contenu de ce site web soit élaboré avec soin, aucune garantie n\'est donnée quant à son exactitude, son exhaustivité ou son actualité. La responsabilité pour toute perte résultant de l\'utilisation de ce site web est exclue dans la mesure permise par la loi.',
            'Les données de marché et les cours sont indicatifs et peuvent être différés. Ils ne conviennent pas comme base de décisions de placement.',
          ],
        },
        {
          heading: 'Liens vers des sites tiers',
          paragraphs: [
            'Ce site web contient des liens vers des sites exploités par des tiers. Ces liens sont fournis uniquement par commodité. Nous n\'avons aucun contrôle sur le contenu de ces sites et n\'en assumons aucune responsabilité.',
          ],
        },
        {
          heading: 'Propriété intellectuelle',
          paragraphs: [
            'L\'ensemble du contenu de ce site web est protégé par le droit d\'auteur. Toute reproduction, transmission ou modification, en tout ou en partie, requiert un consentement écrit préalable.',
          ],
        },
        {
          heading: 'Droit applicable',
          paragraphs: [
            'Applicable Law: Swiss substantive law (excluding CISG) | Jurisdiction: Courts of Lucerne, Canton of Luzern',
            'L\'utilisation de ce site web est régie par le droit matériel suisse, à l\'exclusion de la Convention de Vienne (CVIM). Le for exclusif est celui des tribunaux de Lucerne, canton de Lucerne.',
          ],
        },
      ],
    },
    'privacy-policy': {
      slug: 'privacy-policy',
      title: 'Protection des données',
      sections: [
        {
          paragraphs: [
            'Nous prenons la protection de vos données personnelles au sérieux et les traitons conformément à la loi fédérale suisse sur la protection des données et, le cas échéant, au Règlement général sur la protection des données.',
          ],
        },
        {
          heading: 'Quelles données nous traitons',
          paragraphs: [
            'Lorsque vous visitez ce site web, nous traitons des données techniques telles que les pages consultées, l\'heure de la requête, le navigateur et le système d\'exploitation utilisés, ainsi qu\'une adresse IP abrégée.',
            'Si vous nous contactez, commandez une fiche d\'information ou fixez un rendez-vous, nous traitons les coordonnées et autres informations que vous nous communiquez afin de répondre à votre demande.',
          ],
        },
        {
          heading: 'Cookies et suivi',
          paragraphs: [
            'Nous utilisons des cookies techniquement nécessaires au fonctionnement du site web et, avec votre consentement, des cookies qui nous aident à comprendre comment le site est utilisé afin de l\'améliorer.',
            'Vous pouvez retirer votre consentement à tout moment et supprimer les cookies via les paramètres de votre navigateur.',
          ],
        },
        {
          heading: 'Communication à des tiers',
          paragraphs: [
            'Nous ne communiquons des données personnelles à des tiers que lorsque cela est nécessaire pour fournir nos services, lorsque vous y avez consenti ou lorsque nous y sommes légalement tenus.',
          ],
        },
        {
          heading: 'Vos droits',
          paragraphs: [
            'Vous avez le droit de demander des informations sur les données personnelles que nous détenons à votre sujet, et de faire corriger des données inexactes ou supprimer des données traitées illicitement.',
          ],
        },
        {
          heading: 'Responsable du traitement',
          paragraphs: [
            'Helfenstein Asset Management AG (Helfenstein Group), Pilatusstrasse 23, 6003 Luzern, Suisse. Téléphone : +41 41 211 29 29.',
            'Data Protection Registration: CHE-111.708.730 | Registered with: Swiss Federal Data Protection Commissioner (FDPIC)',
            'La nLPD révisée n\'attribue pas de numéro de licence public au responsable du traitement. CHE-111.708.730 est notre IDE, utilisé auprès du Préposé fédéral à la protection des données (https://www.edoeb.admin.ch).',
          ],
        },
      ],
    },
    'documents-and-information': {
      slug: 'documents-and-information',
      title: 'Documents et informations',
      sections: [
        {
          paragraphs: [
            'Cette section regroupe les documents réglementaires et les informations clients relatifs à nos services.',
          ],
        },
        {
          heading: 'Informations clients',
          paragraphs: [
            'Conditions générales, barème des honoraires et frais, et informations sur les risques liés au trading d\'instruments financiers.',
          ],
        },
        {
          heading: 'Loi sur les services financiers',
          paragraphs: [
            'Informations sur nos services, la segmentation clientèle, le traitement des conflits d\'intérêts et notre affiliation à la Finanzombudsstelle Schweiz (FINOS), Freigutstrasse 8, 8002 Zürich, +41 44 552 08 00, info@finos.ch, référence FINOS-111.708.730.',
          ],
        },
        {
          heading: 'Informations sur la société',
          paragraphs: [
            'Helfenstein Asset Management AG (opérant sous le nom de Helfenstein Group) publie sur ce site web les informations réglementaires et les informations destinées aux clients. La société est un conseiller indépendant rémunéré exclusivement par honoraires et un gestionnaire de fortune autorisé par la FINMA (FINMA Portfolio Manager Authorisation No: CH-111.708.730 | Decision Date: 12.01.2022 ; Ongoing Supervision: OSFINcontrol AG | Affiliation Ref: OSFIN-111.708.730 | Since: 12.01.2022) ; elle ne détient aucun avoir de la clientèle.',
            'Commercial Register Extract available upon request | Registry Court: Luzern | UID: CHE-111.708.730',
          ],
        },
      ],
    },
    'audit-reports': {
      slug: 'audit-reports',
      title: 'Rapports d\'audit',
      sections: [
        {
          paragraphs: [
            'Helfenstein Asset Management AG est soumise au Code des obligations. L\'organe de révision actuel, ou une décision d\'opting-out valable, est l\'inscription déposée au registre du commerce du canton de Lucerne.',
          ],
        },
        {
          heading: 'Vérification',
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
          heading: 'Éditeur',
          paragraphs: [
            'Helfenstein Asset Management AG',
            'Pilatusstrasse 23, 6003 Luzern, Suisse.',
            'Téléphone : +41 41 211 29 29',
            'UID : CHE-111.708.730',
            'LEI : 894500URZFTDV5G7F357',
          ],
        },
        {
          heading: 'Activité',
          paragraphs: [
            'Conseil financier indépendant rémunéré exclusivement par honoraires et gestion de fortune pour la clientèle privée dans le monde : retraite, placements, impôts, immobilier et planification successorale. Les avoirs des clients restent auprès de la banque de votre choix, et non auprès de la société.',
          ],
        },
        {
          heading: 'Surveillance',
          paragraphs: [
            'Helfenstein Asset Management AG est inscrite auprès de la FINMA en tant que gestionnaire de fortune et est supervisée par OSFINcontrol AG.',
            'FINMA Portfolio Manager Authorisation No: CH-111.708.730 | Decision Date: 12.01.2022.',
            'Ongoing Supervision: OSFINcontrol AG | Affiliation Ref: OSFIN-111.708.730 | Since: 12.01.2022.',
            'Les autorisations peuvent être vérifiées dans le registre officiel de la FINMA (https://www.finma.ch/fr/finma-public/etablissements-personnes-et-produits-autorises/).',
            'Enregistrement LEI : https://search.gleif.org/#/record/894500URZFTDV5G7F357',
            'Organe de médiation : Finanzombudsstelle Schweiz (FINOS), Freigutstrasse 8, 8002 Zürich, +41 44 552 08 00, info@finos.ch, référence FINOS-111.708.730.',
          ],
        },
      ],
    },
  },
  team: {
    sections: {
      investment: 'Équipe de gestion',
      business: 'Développement commercial',
      investors: 'Conseillers à la clientèle',
    },
    featuredLead:
      'Friedrich Hartmann dirige la stratégie d\'investissement d\'Helfenstein et l\'allocation de capital à long terme.',
    members: {
      'friedrich-hartmann': {
        slug: 'friedrich-hartmann',
        role: 'Président et CIO',
        regulatoryNote:
          'Cadre dirigeant au sein de l’organisation de conseil de Helfenstein Asset Management.',
        about: [
          'Friedrich Hartmann dirige la stratégie d\'investissement d\'Helfenstein et apporte plus de 30 ans d\'expérience à la construction de portefeuille et à l\'allocation de capital à long terme. Son approche repose sur la qualité des entreprises, des valorisations disciplinées et le maintien du cap lorsque les conditions de marché changent. En tant que président et CIO, il fixe le cadre d\'investissement et guide l\'appréciation du risque par l\'équipe. Il accorde une importance particulière à un raisonnement clair et à la patience de tenir une conviction tout en restant ouvert à de nouveaux éléments.',
          'Sa philosophie d\'investissement part d\'une question simple : qu\'est-ce qui rend une entreprise digne d\'être détenue sur un cycle de marché complet ? Il encourage l\'équipe à tester les hypothèses de chaque thèse et à examiner comment les positions interagissent dans le portefeuille. Dans les échanges avec les clients, il explique le lien entre valorisation, incertitude et le temps nécessaire pour qu\'une thèse se développe.',
        ].join('\n\n'),
        focus: [
          'Stratégie d’investissement et allocation de capital à long terme',
          'Construction de portefeuille et appréciation du risque',
          'Valorisation fondamentale et discipline d’investissement',
          'Direction du processus de recherche d’investissement',
        ],
        results: ['Plus de 30 ans à façonner l\'approche d\'investissement de la société.'],
      },
      'karin-vogel': {
        slug: 'karin-vogel',
        role: 'Gérante de portefeuille',
        about: [
          'Karin Vogel est spécialisée dans les actions européennes de moyenne capitalisation. Elle combine une recherche détaillée sur les entreprises et une évaluation disciplinée de la valorisation. Son expérience dans des maisons value en Espagne nourrit une compréhension pratique des entreprises régionales et de leurs positions concurrentielles. Analyste principale du fonds Continental Value depuis 2016, elle examine la génération de trésorerie, les décisions de direction et la durabilité des résultats. Karin aide aussi les clients à comprendre, dans un langage clair, le raisonnement derrière les positions du portefeuille.',
          'Sa recherche va au-delà de la croissance affichée pour examiner comment les entreprises financent leur expansion, protègent leurs marges et allouent le capital. Elle porte une attention particulière au lien entre performance opérationnelle et flux de trésorerie, afin de remettre en question des prévisions trop optimistes. Dans les discussions de portefeuille, Karin présente à la fois l\'opportunité et les conditions qui pourraient affaiblir la thèse.',
        ].join('\n\n'),
        focus: [
          'Recherche sur les moyennes capitalisations européennes',
          'Analyse des flux de trésorerie et qualité des résultats',
          'Valorisation et évaluation du management',
          'Explications claires des positions du portefeuille',
        ],
        results: [
          'Analyste principale du fonds Continental Value depuis 2016.',
          'Trois participations industrielles étudiées devenues des positions de long terme.',
        ],
      },
      'lukas-steiner': {
        slug: 'lukas-steiner',
        role: 'Gérant de portefeuille',
        about: [
          'Lukas Steiner se concentre sur les actions européennes, avec une responsabilité particulière pour les participations ibériques de la société. Formé à Vienne et à Londres, il combine l\'analyse fondamentale et un intérêt pour les cycles du capital et les forces économiques qui façonnent les rendements. Son travail sur la discipline de portefeuille a contribué à une baisse de 22 % du turnover moyen. Il privilégie des positions soigneusement étudiées et une approche mesurée du trading, chaque décision étant jugée au regard de la thèse de long terme.',
          'Un thème central de son travail est la manière dont l\'investissement, la concurrence et les conditions de financement influencent la rentabilité future. Il examine si les résultats actuels reflètent une position durable ou un moment favorable du cycle. Dans les discussions de portefeuille, il insiste sur les raisons de détenir une entreprise, les évolutions qui justifieraient une réévaluation et le coût de changements inutiles.',
        ].join('\n\n'),
        focus: [
          'Analyse des actions européennes et ibériques',
          'Recherche sur les cycles du capital',
          'Valorisation de long terme et timing d’investissement',
          'Rotation du portefeuille et discipline de négociation',
        ],
        results: ['Baisse de 22 % du turnover moyen du portefeuille.'],
      },
      'maximilian-berger': {
        slug: 'maximilian-berger',
        role: 'Gérant de portefeuille',
        about: [
          'Maximilian Berger apporte une expérience d\'audit à l\'investissement actions, avec une attention particulière à la qualité comptable, à la solidité du bilan et à la fiabilité des résultats publiés. Il co-gère des participations européennes positionnées de manière défensive dans la gamme Global Value. En 2023, il a dirigé la revue des normes de reporting de l\'univers d\'investissement. Sa contribution consiste à examiner ce qui se trouve derrière les chiffres affichés, afin d\'aider l\'équipe à remettre en question les hypothèses et à repérer des faiblesses financières avant d\'engager du capital.',
          'Son style d\'analyse repose sur la réconciliation : vérifier si le compte de résultat, le bilan et le tableau des flux de trésorerie racontent la même histoire. Il suit les mouvements du fonds de roulement, les engagements de financement et les hypothèses qui sous-tendent les valeurs d\'actifs. Cette perspective enrichit les débats d\'investissement, surtout lorsqu\'une valorisation apparemment attractive doit être pesée face à des risques financiers ou comptables moins visibles.',
        ].join('\n\n'),
        focus: [
          'Analyse des états financiers et qualité comptable',
          'Résilience du bilan et risques de financement',
          'Recherche actions européennes défensives',
          'Revue des normes de reporting des entreprises',
        ],
        results: [
          'A dirigé en 2023 la revue des normes de reporting de la société.',
          'A identifié deux risques de bilan avant qu\'ils n\'attirent une attention plus large du marché.',
        ],
      },
      'julian-vogt': {
        slug: 'julian-vogt',
        role: 'Gérant de portefeuille',
        about: [
          'Julian Vogt associe une formation en droit et en gestion à un travail centré sur la gouvernance et les décisions d\'investissement. Il a élaboré la check-list de gouvernance utilisée avant les nouvelles positions importantes, en intégrant structures de propriété, droits des actionnaires et incitations du management au processus de recherche. Parallèlement à ses responsabilités de portefeuille, il accompagne les analystes juniors dans la rédaction des thèses et le dimensionnement des positions. Son approche relie la solidité d\'une entreprise aux conditions dans lesquelles les investisseurs participent à son avenir.',
          'Il examine comment les structures et les décisions de direction influencent la position des actionnaires dans le temps. Sa recherche considère si les incitations favorisent une allocation responsable du capital et si la gouvernance soutient la stratégie annoncée. Avec les analystes moins expérimentés, il insiste sur un raisonnement concis, des hypothèses explicites et une explication claire des éléments qui feraient changer une vue d\'investissement.',
        ].join('\n\n'),
        focus: [
          'Gouvernance et intérêts des actionnaires',
          'Structures de propriété et incitations du management',
          'Élaboration des thèses d’investissement',
          'Mentorat des analystes et discussions de dimensionnement',
        ],
        results: [
          'A contribué au traitement de la complexité juridique et réglementaire de trois participations transfrontalières.',
        ],
      },
      'ken-wagner': {
        slug: 'ken-wagner',
        role: 'Gérant de portefeuille',
        about: [
          'Ken Wagner relie l\'équipe d\'investissement européenne d\'Helfenstein aux opportunités cotées en Asie. Il a mis en place en 2019 la couverture de recherche Asie-Pacifique de la société, avec une lecture régionale fondée sur les documents d\'entreprises et le dialogue avec les intervenants de marché. Il parle mandarin, allemand et espagnol, et facilite les échanges entre marchés et partenaires de recherche. Il a identifié quatre investissements qui représentaient plus de 8 % du portefeuille global. Ken cherche à comprendre les entreprises dans leur contexte local tout en évaluant comment chaque opportunité s\'inscrit dans le cadre de valorisation et de risque du portefeuille.',
          'Sa recherche tient compte des différences de publication, de structures de propriété et de conditions concurrentielles dans la région. Il apporte ces éléments aux discussions avec ses collègues européens. Son approche combine une lecture attentive de l\'information financière et un intérêt pour la façon dont les entreprises génèrent du cash, financent leur expansion et traitent les actionnaires minoritaires.',
        ].join('\n\n'),
        focus: [
          'Recherche actions Asie-Pacifique',
          'Analyse régionale des entreprises et des secteurs',
          'Coordination de la recherche entre marchés',
          'Communication multilingue avec les partenaires de recherche',
        ],
        results: ['Quatre investissements identifiés, représentant plus de 8 % du portefeuille global.'],
      },
      'stefan-richter': {
        slug: 'stefan-richter',
        role: 'Gérant de portefeuille',
        about: [
          'Stefan Richter a rejoint Helfenstein en 2015, avec une expérience de la recherche d\'investissement et de l\'analyse des entreprises industrielles. Il se concentre sur les sociétés dont les avantages concurrentiels et les flux de trésorerie peuvent traverser des conditions économiques changeantes. Il a élaboré la watchlist transition énergétique de la société, qui donne au comité d\'investissement une base structurée pour examiner les entreprises concernées par ce mouvement de long terme. Sa recherche relie les évolutions sectorielles aux fondamentaux, avec une attention particulière au capital nécessaire pour soutenir la croissance future.',
          'Il étudie le lien entre demande industrielle, capacité de production et investissement requis pour maintenir une position concurrentielle. Dans la recherche sur la transition énergétique, il distingue les thèmes sectoriels larges de l\'économie de chaque entreprise. Son approche demande comment une opportunité se traduit en résultats et en cash-flow, et si le bilan peut soutenir l\'investissement nécessaire dans les phases moins favorables du cycle.',
        ].join('\n\n'),
        focus: [
          'Analyse des entreprises industrielles et cycliques',
          'Recherche sur la transition énergétique',
          'Évaluation des investissements et des flux de trésorerie',
          'Résilience des entreprises à travers les cycles',
        ],
        results: ['Membre de l\'équipe Helfenstein depuis 2015.'],
      },
      'greta-keller': {
        slug: 'greta-keller',
        role: 'Analyste junior',
        about: [
          'Greta Keller contribue à la recherche sur les plus petites entreprises de consommation et industrielles en Allemagne, en Autriche et en Suisse. Elle a rejoint Helfenstein en 2023 après un stage en relations investisseurs, avec une formation en administration des affaires et un fort intérêt pour la modélisation financière. Son travail combine l\'analyse des publications d\'entreprises et l\'évaluation de l\'évolution des comportements clients. Aux côtés des gérants, elle aide à transformer des idées de recherche en thèses structurées et en suivi continu.',
          'Son approche part des moteurs du chiffre d\'affaires, des marges et du fonds de roulement. Elle s\'intéresse particulièrement à la façon dont les changements de demande apparaissent dans les résultats et si les explications de la direction sont confirmées par les chiffres. Dans la préparation de la recherche, elle veille à des hypothèses transparentes et à des documents bien organisés, afin que les collègues plus expérimentés puissent revoir un modèle et en discuter les conclusions.',
        ].join('\n\n'),
        focus: [
          'Recherche small caps consommation et industrie',
          'Modélisation financière et publications d’entreprises',
          'Tendances de consommation et performance opérationnelle',
          'Soutien à la recherche dans la région DACH',
        ],
        results: [
          'A rejoint l\'équipe d\'investissement en 2023.',
          'Première note d\'analyste parvenue au portefeuille en six semaines.',
        ],
      },
      'tobias-brandt': {
        slug: 'tobias-brandt',
        role: 'Directeur général',
        about: [
          'Tobias Brandt dirige le développement de la clientèle chez Helfenstein, fort d\'une expérience en private banking et en vente actions. Il travaille avec les clients potentiels pour comprendre leurs priorités et les mettre en relation avec les équipes d\'investissement et de conseil les mieux placées. Son travail a contribué à une croissance de 40 % de la clientèle privée en quatre ans. Il a aussi lancé le programme de formation des clients, qui réunit plus de 600 participants par an. Il parle allemand, anglais et espagnol, et place des explications claires et des attentes bien définies au centre de la relation.',
          'Il aborde le développement commercial comme le début d\'une relation de conseil durable. Les premiers échanges portent sur ce que les clients veulent atteindre, leur mode de communication préféré et ce qu\'ils attendent d\'un accompagnement professionnel. Par le programme de formation, il encourage des questions informées et une meilleure compréhension de l\'approche de la société.',
        ].join('\n\n'),
        focus: [
          'Développement de la clientèle privée et des relations',
          'Premiers échanges sur les besoins et les attentes',
          'Formation des clients et communication d’investissement',
          'Coordination entre clients potentiels et conseillers',
        ],
        results: [
          'Croissance de 40 % de la clientèle privée en quatre ans.',
          'Plus de 600 participants par an au programme de formation des clients.',
        ],
      },
      'markus-engel': {
        slug: 'markus-engel',
        role: 'Directeur, communication clients',
        about: [
          'Markus Engel dirige la communication clients et le marketing d\'Helfenstein. Il traduit la réflexion d\'investissement en reporting clair et en correspondance cohérente. Il a repensé les documents utilisés par l\'équipe de conseil et supervise des communications qui accompagnent plus de 12 000 interactions clients par an. Son objectif est d\'aider les clients à comprendre les décisions de portefeuille, les évolutions de marché et l\'information utile à leur situation. Il travaille étroitement avec les collègues de l\'investissement et du conseil pour que la communication externe reste précise, utile et cohérente.',
          'Il aborde chaque message du point de vue du lecteur : ce qui s\'est passé, pourquoi cela compte et si un échange avec un conseiller est nécessaire. Cela guide son travail sur la structure du reporting, la cohérence éditoriale et la présentation de sujets complexes. Il veille aussi à expliquer l\'incertitude clairement, afin qu\'un texte concis conserve le contexte dont les clients ont besoin.',
        ].join('\n\n'),
        focus: [
          'Reporting client et direction éditoriale',
          'Communication sur les investissements et les marchés',
          'Cohérence de la correspondance client',
          'Coordination avec les équipes d’investissement et de conseil',
        ],
        results: ['Communications accompagnant plus de 12 000 interactions clients par an.'],
      },
      'marc-weber': {
        slug: 'marc-weber',
        role: 'Directeur, opérations clients',
        regulatoryNote:
          'Cadre dirigeant responsable des opérations clients et de la coordination de la conservation.',
        about: [
          'Marc Weber supervise les opérations clients et coordonne les relations d\'Helfenstein avec les banques dépositaires. Issu du private banking, il se concentre sur l\'administration des comptes, les arrangements de conservation et la clarté du reporting. Sa revue des conditions de conservation et de règlement a contribué à réduire les coûts correspondants de 18 % depuis 2020. Travaillant en allemand, français et anglais, il relie clients, conseillers et partenaires bancaires pour un service ordonné et réactif.',
          'Son approche rend compréhensibles les responsabilités du conseiller, du dépositaire et du client. Il porte attention aux détails pratiques qui influencent la qualité de service, notamment l\'exhaustivité des informations de compte et le traitement des demandes en cours. Il apporte aussi un regard attentif aux coûts dans les relations bancaires, en considérant l\'effet des arrangements opérationnels sur l\'expérience du client.',
        ].join('\n\n'),
        focus: [
          'Opérations clients et administration des comptes',
          'Coordination des relations avec les banques dépositaires',
          'Revue des conditions de conservation et des coûts de règlement',
          'Clarté du reporting et suivi opérationnel',
        ],
        results: ['Baisse de 18 % des coûts de conservation et de règlement des clients depuis 2020.'],
      },
      'anja-hoffmann': {
        slug: 'anja-hoffmann',
        role: 'Conseillère à la clientèle',
        about: [
          'Anja Hoffmann s\'appuie sur une expérience en relations investisseurs de sociétés cotées pour expliquer clairement les décisions de portefeuille et les situer dans les priorités financières plus larges des clients. Elle gère les relations avec plus de 180 clients privés et familles, avec un accent sur la retraite et la planification de long terme. Son score de satisfaction a atteint 4,8 sur 5 dans la dernière enquête annuelle. Elle organise aussi les séminaires semestriels de la société à Lucerne. En allemand et en anglais, elle apporte une approche directe et structurée à des conversations qui peuvent autrement paraître complexes.',
          'Elle relie l\'information d\'investissement aux décisions qu\'un foyer doit réellement prendre. Plutôt que de laisser les clients avec une collection d\'observations de marché, elle clarifie ce que ces évolutions signifient pour la prochaine discussion sur leurs projets. Son expérience en relations investisseurs se traduit par un choix attentif des mots et par l\'explication du raisonnement, y compris les hypothèses et les incertitudes.',
        ].join('\n\n'),
        focus: [
          'Relations avec les clients privés et les familles',
          'Discussions de retraite et de planification à long terme',
          'Explication des décisions de portefeuille',
          'Séminaires clients et éducation financière',
        ],
        results: [
          'Relations avec plus de 180 clients privés et familles.',
          'Score de satisfaction de 4,8 sur 5 dans la dernière enquête annuelle.',
        ],
      },
      'florian-bauer': {
        slug: 'florian-bauer',
        role: 'Conseiller à la clientèle',
        about: [
          'Florian Bauer conseille les ménages sur la structure de portefeuille et le rééquilibrage annuel, avec une responsabilité particulière pour les clients germanophones vivant hors de Suisse. Il privilégie des explications pratiques, un suivi attentif et la continuité entre les revues formelles. Son travail de service a ramené le délai moyen de réponse aux demandes sous quatre heures ouvrables. Il offre un point de contact clair pour les questions du quotidien, tout en reliant les échanges aux objectifs d\'investissement et à l\'évolution des circonstances.',
          'Ses revues sont détaillées : positionnement du portefeuille, changement de situation et sujets qui demandent une attention supplémentaire. Pour les clients vivant à l\'étranger, il insiste sur une communication organisée et une responsabilité claire du suivi. Il vise un service courant fiable, afin que les questions sur les rapports, les changements de portefeuille ou les prochaines revues soient traitées avec le bon contexte et une étape suivante claire.',
        ].join('\n\n'),
        focus: [
          'Revues de portefeuille des ménages',
          'Discussions de rééquilibrage annuel',
          'Accompagnement des clients germanophones à l’étranger',
          'Service réactif et suivi organisé',
        ],
        results: ['Délai moyen de réponse aux demandes clients ramené sous quatre heures ouvrables.'],
      },
      'andrew-ramsden': {
        slug: 'andrew-ramsden',
        role: 'Conseiller à la clientèle',
        about: [
          'Andrew Ramsden apporte 30 ans d\'expérience de la relation client à la planification de la retraite et des investissements. Il conseille plus de 40 familles et les aide à voir comment leurs portefeuilles peuvent soutenir des besoins de revenu changeants et des priorités de long terme. Il a dirigé la couverture de la clientèle privée chez un gestionnaire londonien. Il a conçu la revue de préretraite utilisée par l\'équipe de conseil d\'Helfenstein, point de départ structuré pour discuter de la préparation à la retraite, des retraits et des décisions à suivre dans le temps.',
          'Ses conversations portent sur le passage de l\'accumulation au prélèvement, y compris l\'équilibre entre revenu régulier, réserves disponibles et besoins d\'investissement de plus long terme. Il attache de l\'importance à revoir les hypothèses lorsque la situation familiale évolue. Son approche est posée et accessible : elle laisse aux clients le temps d\'examiner les arbitrages et de situer chaque décision dans un plan de retraite plus large.',
        ].join('\n\n'),
        focus: [
          'Préparation de la retraite et planification du revenu',
          'Retraits de portefeuille et besoins de trésorerie',
          'Relations de conseil familiales de long terme',
          'Revues structurées de préretraite',
        ],
        results: [
          '30 ans d\'expérience de la relation client.',
          'Accompagnement retraite et retraits pour plus de 40 familles.',
        ],
      },
      'erik-schneider': {
        slug: 'erik-schneider',
        role: 'Conseiller à la clientèle',
        about: [
          'Erik Schneider apporte 20 ans d\'expérience dans les fonds, les plateformes de conseil et le private banking. Depuis son arrivée chez Helfenstein en 2016, il se concentre sur des relations de long terme et la continuité lorsque les marchés changent. Son travail de suivi a contribué à conserver 98 % des actifs pendant la volatilité de 2022. Son passé de directeur de private banking nourrit une approche mesurée des discussions de portefeuille et du service. Il aide les clients à distinguer les mouvements de court terme des éléments qui comptent pour leur plan, en gardant les échanges ancrés dans leurs priorités.',
          'Il accorde de l\'importance à l\'histoire des décisions d\'un client, y compris ses expériences de marché passées et ce qu\'il attend d\'un accompagnement. Cette perspective l\'aide à cadrer les discussions en période d\'incertitude sans perdre de vue les objectifs initiaux. Son approche combine des explications accessibles et la volonté de revoir d\'anciennes hypothèses, car une relation de longue date doit aussi s\'adapter.',
        ].join('\n\n'),
        focus: [
          'Relations de long terme avec la clientèle privée',
          'Discussions de portefeuille en période d’incertitude',
          'Expérience des fonds et des plateformes de conseil',
          'Revues continues des priorités des clients',
        ],
        results: ['A contribué à conserver 98 % des actifs pendant la volatilité de marché de 2022.'],
      },
      'andrew-savage': {
        slug: 'andrew-savage',
        role: 'Conseiller à la clientèle',
        about: [
          'Andrew Savage se concentre sur l\'accueil des clients, le reporting d\'investissement et la coordination des relations impliquant plusieurs banques dépositaires. Il a accompagné l\'intégration de 110 clients privés sur deux ans et a contribué à refondre le reporting trimestriel ; la mesure de satisfaction citée a ensuite progressé de 8 points. Travaillant en anglais et en français, il relie les clients à l\'équipe d\'investissement et organise le suivi. Son approche rend l\'information facile à parcourir et veille à ce que les clients comprennent les prochaines étapes de leur relation avec la société.',
          'Il porte une attention particulière au début de la relation, lorsque les clients ont besoin de comprendre clairement les documents, les responsabilités et les modalités de communication. Lorsque plusieurs banques sont impliquées, il aide à rassembler l\'information disponible dans une vue plus cohérente. Il traite aussi le reporting comme un point de départ de discussion, pour identifier les questions qui méritent l\'attention à la revue suivante.',
        ].join('\n\n'),
        focus: [
          'Accueil des nouveaux clients et suivi',
          'Reporting trimestriel et explications aux clients',
          'Coordination entre plusieurs dépositaires',
          'Communication entre clients et collègues d’investissement',
        ],
        results: [
          '110 nouveaux clients privés accueillis en deux ans.',
          'Hausse de huit points de la mesure de satisfaction après la refonte du reporting.',
        ],
      },
      'birgit-schulz': {
        slug: 'birgit-schulz',
        role: 'Conseillère à la clientèle',
        about: [
          'Birgit Schulz apporte une expérience de contrôle qualité au service client, avec des points forts en documentation, en transferts de comptes et en exactitude des dossiers. Elle a contribué à reconstruire les standards CRM de l\'équipe et a porté l\'exhaustivité des données enregistrées au-dessus de 99 %. Elle accompagne des clients des pays nordiques et du Benelux et traite les sujets administratifs complexes avec une suite d\'actions claire et un suivi rigoureux. Son travail soutient la continuité au sein de l\'équipe de conseil et offre un interlocuteur organisé lors des changements de compte.',
          'Elle considère des dossiers exacts comme une part essentielle d\'un bon service : ils permettent aux collègues de savoir ce qui a été convenu et ce qui reste ouvert. Dans les transferts, elle identifie tôt les dépendances et tient les parties concernées informées. Son attention à la documentation facilite aussi les passations, afin que les clients n\'aient pas à répéter le contexte lorsque plusieurs équipes interviennent.',
        ].join('\n\n'),
        focus: [
          'Documentation client et exactitude des dossiers',
          'Coordination des transferts de comptes',
          'Standards CRM et exhaustivité de l’information',
          'Service aux clients nordiques et du Benelux',
        ],
        results: ['Exhaustivité des dossiers clients portée au-dessus de 99 %.'],
      },
      'alexander-koch': {
        slug: 'alexander-koch',
        role: 'Conseiller senior à la clientèle',
        about: [
          'Alexander Koch travaille avec des clients dont les affaires couvrent plusieurs banques, plusieurs pays ou des étapes de détention d\'entreprise. Depuis 2022, il traite les dossiers de clientèle privée transfrontalière de la société et a mis au point un processus pour consolider l\'information provenant de plusieurs dépositaires. Son objectif est de donner une vue d\'ensemble plus claire à des arrangements qui peuvent sinon rester fragmentés. Il coordonne les discussions et le suivi, et aide les clients à envisager les décisions de portefeuille en même temps que les transitions d\'entreprise et les priorités de retraite.',
          'Il commence par comprendre comment les différentes parties des finances d\'un client se relient, plutôt que d\'évaluer chaque compte isolément. Lorsqu\'une transition d\'entreprise change la finalité des actifs investis, il aide à ordonner les questions à traiter. Il attache de l\'importance à un partage clair de l\'information et à une suite de décisions définie, afin que des arrangements complexes soient plus simples à discuter et à revoir.',
        ].join('\n\n'),
        focus: [
          'Relations de clientèle privée complexes',
          'Coordination transfrontalière',
          'Consolidation des informations multi-dépositaires',
          'Discussions de transition d’entreprise et de retraite',
        ],
        results: ['Responsable des dossiers de clientèle privée transfrontalière depuis 2022.'],
      },
      'leon-roth': {
        slug: 'leon-roth',
        role: 'Conseiller à la clientèle',
        about: [
          'Leon Roth coordonne le service client entre les équipes de conseil et les équipes opérationnelles d\'Helfenstein. Il suit les demandes liées à plus de 400 dossiers clients actifs, oriente les questions vers les bons collègues et maintient le suivi. Il a introduit des modèles de réponse partagés qui ont réduit de 50 % les erreurs de transmission interne et amélioré la cohérence lorsque les demandes passent d\'une équipe à l\'autre. Sa contribution est pratique : conserver le contexte et aider les clients à avancer avec une communication claire.',
          'Il suit la demande, son historique et la personne responsable de l\'action suivante. C\'est particulièrement utile lorsqu\'une question implique à la fois un conseiller et un spécialiste opérationnel. Il veille à la continuité, avec des mises à jour qui expliquent l\'avancement et ce qui peut encore être nécessaire.',
        ].join('\n\n'),
        focus: [
          'Coordination du service client entre équipes',
          'Suivi des demandes et des actions',
          'Transmissions internes cohérentes',
          'Résolution des demandes de service complexes',
        ],
        results: [
          'Coordination du service sur plus de 400 dossiers clients actifs.',
          'Baisse de 50 % des erreurs de transmission interne après l\'introduction de modèles de réponse partagés.',
        ],
      },
      'henrik-meier': {
        slug: 'henrik-meier',
        role: 'Conseiller à la clientèle',
        about: [
          'Henrik Meier associe des responsabilités de service client et un travail d\'écriture. Il produit la lettre mensuelle de la société pour plus de 8 000 abonnés et contribue à l\'édition des publications en allemand. Il transforme les contributions de l\'équipe d\'investissement et les mises à jour de marché en explications concises. Des objets et une structure plus clairs ont augmenté les taux d\'ouverture des e-mails de 19 %. Il porte une attention particulière à la structure, au choix des mots et à la pertinence, afin de maintenir un standard cohérent dans la correspondance courante et les communications régulières.',
          'Pour lui, la clarté tient autant au choix et à l\'ordre des informations qu\'à la simplification du langage. Il cherche à rendre le point principal facile à identifier tout en conservant le détail nécessaire. Sa place entre le service client et la communication l\'aide à anticiper les questions que les lecteurs peuvent avoir sur les mises à jour de la société.',
        ].join('\n\n'),
        focus: [
          'Lettres et mises à jour mensuelles aux clients',
          'Édition en langue allemande',
          'Explications d’investissement accessibles',
          'Structure cohérente des communications écrites',
        ],
        results: [
          'Lettre mensuelle aux clients touchant plus de 8 000 abonnés.',
          'Hausse de 19 % des taux d\'ouverture après des objets et une structure plus clairs.',
        ],
      },
    },
  },
};
