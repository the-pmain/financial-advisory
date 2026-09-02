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
        { label: 'Planification successorale', to: ROUTES.estatePlanning },
        { label: 'Immobilier et hypothèques', to: ROUTES.realEstate },
        { label: 'Impôts', to: ROUTES.taxes },
      ],
    },
    {
      label: 'Entreprises',
      to: ROUTES.companies,
      children: [
        { label: 'Succession d\'entreprise', to: ROUTES.companiesSuccession },
        { label: 'Caisses de pension', to: ROUTES.companiesPensionFunds },
        { label: 'Prévoyance cadres', to: ROUTES.companiesManagementPensionPlans },
        { label: 'Gestion des assurances', to: ROUTES.companiesInsuranceManagement },
        { label: 'Création d\'entreprise', to: ROUTES.companiesEstablishing },
      ],
    },
    {
      label: 'À propos d\'Helfenstein',
      to: ROUTES.about,
      children: [
        { label: 'Conseil indépendant', to: ROUTES.aboutIndependentAdvice },
        { label: 'Notre régulation', to: ROUTES.aboutHowWeAreRegulated },
        { label: 'Emplois et carrières', to: ROUTES.aboutJobs },
        { label: 'Contact et assistance', to: ROUTES.aboutContact },
        { label: 'Équipe', to: ROUTES.aboutTeam },
        { label: 'Exemples de clients', to: ROUTES.aboutClientStories },
      ],
    },
  ],
  quickLinks: [
    { label: 'Retraite', to: ROUTES.retirement },
    { label: 'Placements', to: ROUTES.financialInvestments },
    { label: 'Entreprises', to: ROUTES.companies },
    { label: 'Immobilier', to: ROUTES.realEstate },
    { label: 'Impôts', to: ROUTES.taxes },
    { label: 'Prévoyance', to: ROUTES.pensionPlanning },
  ],
  topMenu: [
    { label: 'Rendez-vous', to: ROUTES.appointments },
    { label: 'Expertise', to: ROUTES.expertise },
    { label: 'Insights', to: ROUTES.insights },
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
    { label: 'Réglementation et conformité', to: ROUTES.regulatoryAndCompliance },
    { label: 'Impressum', to: ROUTES.impressum },
  ],
};

export const fr: Translations = {
  meta: {
    siteName: 'Helfenstein Asset Management AG',
    defaultTitle:
      'Helfenstein Asset Management AG – Gestion de fortune indépendante, conseil financier et planification de la retraite',
    defaultDescription:
      'Conseil indépendant en planification de la retraite, placements financiers, planification successorale, immobilier, impôts, assurances et prévoyance.',
    teamDescription: 'Des professionnels expérimentés de la gestion de placements chez Helfenstein Asset Management AG.',
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
    stockExchangeAndMarkets: 'Bourse et marchés',
    moreStockMarketNews: 'Plus d\'actualités boursières',
    marketData: 'Données de marché',
    marketDataCaption:
      'Niveaux indicatifs des indices et des devises avec la variation depuis la clôture précédente',
    instrument: 'Instrument',
    level: 'Niveau',
    change: 'Variation',
    moreMandates: 'Plus de mandats',
    moreOfferings: 'Plus d\'offres',
    propertyType: 'Type de bien',
    whatWeDoForYou: 'Ce que nous faisons pour vous',
    relatedArticles: 'Articles connexes',
    team: 'Équipe',
    teamSubtitle: 'Des professionnels expérimentés de la gestion de placements',
    featuredMemberLead:
      'Friedrich Hartmann dirige la philosophie d\'investissement d\'Helfenstein et l\'allocation de capital à long terme.',
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
    logoAria: 'Helfenstein Asset Management AG – accueil',
    mainNav: 'Navigation principale',
    topNav: 'Navigation supérieure',
    quickLinks: 'Liens rapides',
    footerNav: 'Navigation du pied de page',
    legalNav: 'Mentions légales',
    subscribeNewsletter: 'S\'abonner à la newsletter',
    forIndividuals: 'Pour les particuliers',
    forCompanies: 'Pour les entreprises',
    clientStories: 'Exemples de clients',
    verifyAuthorisation: 'Vérifier notre autorisation',
    relatedService: 'Service associé',
    allInsights: 'Tous les insights',
    meetSpecialists: 'Nos spécialistes',
    regulatoryChallenges: 'Défis réglementaires',
    howWeHelp: 'Comment nous aidons',
    adviceDisclaimer:
      'Informations générales uniquement. Ne constitue pas un conseil personnalisé en investissement, fiscalité ou droit.',
  },
  nav: navPaths,
  home: {
    testimonial: {
      quote:
        'Auprès de partenaires de conservation suisses sélectionnés, les clients bénéficient de coûts inférieurs et d\'une sécurité accrue.',
      positionLabel: 'Fonction',
      position: 'Directeur, opérations clients',
      imageAlt: 'Portrait de Marc Weber, directeur des opérations clients chez Helfenstein',
      ctaLabel: 'Prendre rendez-vous',
    },
    newsletter: {
      text: 'Recevez régulièrement des informations sur l\'optimisation de votre AVS, de votre prévoyance professionnelle et de votre pilier 3a.',
      linkLabel: 'Abonnez-vous à notre newsletter (en allemand, français et italien).',
    },
  },
  content: {
    articles: {
      'compulsory-insurance-switzerland': {
        slug: 'compulsory-insurance-switzerland',
        tagline: 'Assurances',
        title: 'Assurances obligatoires en Suisse',
        teaser:
          'Lorsque des étrangers s\'installent pour la première fois en Suisse et y exercent une activité professionnelle, ils doivent savoir quelles assurances la loi leur impose.',
        body: [
          'Toute personne qui s\'établit en Suisse est légalement tenue de souscrire un certain nombre d\'assurances. Celles qui s\'appliquent dépendent de votre statut de résidence, de votre situation professionnelle et de votre situation familiale.',
          'L\'assurance-maladie de base est obligatoire pour toute personne domiciliée en Suisse et doit être souscrite dans les trois mois suivant l\'arrivée. La couverture est rétroactive à la date d\'entrée, de sorte qu\'il n\'y a pas de lacune — mais les primes sont également dues à partir de cette date.',
          'Les salariés sont automatiquement assurés contre les accidents professionnels par leur employeur. La couverture des accidents non professionnels est incluse dès que vous travaillez au moins huit heures par semaine pour le même employeur.',
          'Toute personne propriétaire d\'un véhicule à moteur doit disposer d\'une assurance responsabilité civile avant que le véhicule ne puisse être immatriculé. Dans de nombreux cantons, l\'assurance immobilière est également obligatoire.',
        ],
      },
      'save-on-taxes-with-pillar-3a': {
        slug: 'save-on-taxes-with-pillar-3a',
        tagline: 'Pilier 3a',
        title: 'Comment économiser des impôts avec votre pilier 3a',
        teaser:
          'Toute personne qui utilise son pilier 3a, en complément de l\'AVS et de la caisse de pension, pour se constituer une prévoyance vieillesse peut déduire ses cotisations de son revenu imposable.',
        body: [
          'Le pilier 3a est le moyen le plus répandu d\'économiser des impôts en Suisse. Les cotisations peuvent être déduites intégralement du revenu imposable, dans la limite d\'un plafond annuel ajusté périodiquement.',
          'Les salariés affiliés à une caisse de pension peuvent verser chaque année un montant fixe en francs. Les indépendants sans caisse de pension peuvent cotiser jusqu\'à 20 pour cent de leur revenu net de l\'activité lucrative, dans la limite d\'un plafond.',
          'Les avoirs du pilier 3a sont exonérés de l\'impôt sur la fortune et les rendements sont exonérés de l\'impôt sur le revenu tant qu\'ils restent sur le compte. Lors du retrait, le capital est imposé séparément des autres revenus à un taux réduit.',
          'Répartir votre épargne sur plusieurs comptes et effectuer les retraits sur plusieurs années permet de limiter la progression fiscale et d\'économiser plusieurs milliers de francs.',
        ],
      },
      'tips-for-foreigners-buying-real-estate': {
        slug: 'tips-for-foreigners-buying-real-estate',
        tagline: 'Immobilier',
        title: 'Conseils pour les étrangers souhaitant acquérir un bien immobilier',
        teaser:
          'Plusieurs facteurs doivent être pris en compte par les acheteurs étrangers lors de l\'acquisition d\'un bien immobilier en Suisse. L\'achat immobilier constitue un investissement important, qui comporte également un certain risque.',
        body: [
          'Les ressortissants étrangers domiciliés en Suisse et titulaires d\'un permis C peuvent acquérir un bien immobilier aux mêmes conditions que les citoyens suisses. Les titulaires d\'un permis B peuvent acquérir un logement pour leur usage personnel à leur lieu de résidence.',
          'Les prêteurs exigent généralement au moins 20 pour cent du prix d\'achat à titre de fonds propres, dont au moins 10 pour cent doivent provenir de sources autres que les avoirs de prévoyance professionnelle.',
          'La capacité financière est évaluée de manière prudente : les charges imputées de l\'hypothèque, de l\'entretien et de l\'amortissement ne devraient pas dépasser environ un tiers du revenu brut.',
          'Les acheteurs doivent prévoir les honoraires du notaire, les frais du registre foncier et l\'impôt sur les gains immobiliers, qui varient considérablement d\'un canton à l\'autre.',
        ],
      },
      'is-it-worth-paying-more-into-your-pension-fund': {
        slug: 'is-it-worth-paying-more-into-your-pension-fund',
        tagline: 'Caisse de pension',
        title: 'Vaut-il la peine de cotiser davantage à sa caisse de pension ?',
        teaser:
          'Si vous effectuez des cotisations volontaires à votre caisse de pension, vous pouvez économiser considérablement en impôts et disposer de davantage de moyens pour votre retraite.',
        imageAlt: 'Tableau montrant le rendement d\'une cotisation volontaire à la caisse de pension',
        body: [
          'Les rachats volontaires de prestations de prévoyance professionnelle sont intégralement déductibles du revenu imposable l\'année où ils sont effectués. Pour les personnes à revenus élevés, cela peut représenter une économie immédiate d\'un tiers ou plus du montant versé.',
          'Le capital croît ensuite sans impôt sur le revenu ni impôt sur la fortune jusqu\'à son versement. Plus la période restant jusqu\'à la retraite est longue, plus l\'avantage d\'intérêt se capitalise.',
          'Les rachats effectués dans les trois années précédant la retraite ne peuvent pas être retirés sous forme de capital sans perdre la déduction fiscale ; le moment choisi est donc déterminant.',
          'Avant de racheter des prestations, vérifiez le taux de couverture de votre caisse de pension et comparez le taux de conversion avec ce que vous pourriez obtenir en investissant le même montant de manière privée.',
        ],
      },
      'financial-investments-what-you-need-know': {
        slug: 'financial-investments-what-you-need-know',
        tagline: 'Placements financiers',
        title: 'Placements financiers : ce qu\'il faut savoir',
        teaser:
          'Toute personne souhaitant investir avec succès devrait adopter une démarche structurée et, dans un premier temps, définir la stratégie de placement adéquate.',
        body: [
          'Une stratégie de placement solide commence par votre propre situation : quelle part de vos avoirs vous pouvez immobiliser, pour quelle durée, et quelle fluctuation vous pouvez accepter.',
          'Ce n\'est qu\'une fois la stratégie définie que le choix des placements individuels intervient. Des fonds indiciels largement diversifiés et à faibles coûts constituent le bloc de base le plus efficace pour la plupart des investisseurs.',
          'Les coûts comptent parmi les rares certitudes en matière de placement. Chaque franc économisé en frais reste investi et se capitalise sur toute la durée de détention.',
        ],
      },
      'all-you-need-to-know-about-etfs': {
        slug: 'all-you-need-to-know-about-etfs',
        tagline: 'Placements',
        title: 'Tout ce qu\'il faut savoir sur les ETF',
        teaser: 'Les ETF sont bon marché, transparents et liquides, et offrent de nombreux autres avantages.',
        body: [
          'Les fonds négociés en bourse (ETF) répliquent un indice et peuvent être achetés et vendus en bourse tout au long de la séance, comme une action.',
          'Parce qu\'ils sont gérés passivement, leurs frais courants ne représentent qu\'une fraction de ceux des fonds gérés activement — généralement quelques centièmes de pour cent pour les grands indices liquides.',
          'Accordez autant d\'attention à la méthode de réplication, au domicile du fonds et à l\'écart de suivi qu\'aux frais affichés.',
        ],
      },
      'current-mortgage-interest-rates-comparison': {
        slug: 'current-mortgage-interest-rates-comparison',
        tagline: 'Hypothèques',
        title: 'Taux hypothécaires actuels – comparaison',
        teaser:
          'Helfenstein compare en permanence les taux hypothécaires actuels des principaux établissements en Suisse.',
        body: [
          'Les taux hypothécaires varient fortement entre les banques, les assureurs et les caisses de pension — souvent de plus d\'un demi-point de pourcentage pour une durée fixe identique.',
          'Sur une hypothèque d\'un million de francs, cette différence représente plusieurs milliers de francs par an, ce qui fait de la comparaison des offres l\'une des heures les plus rentables que vous puissiez consacrer à votre patrimoine.',
          'Les taux sont également négociables. Les taux publiés sont des prix catalogue, et un emprunteur bien préparé disposant d\'une bonne capacité financière peut généralement obtenir de meilleures conditions.',
        ],
      },
    },
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
        id: 'phishing-insurance',
        title: 'Protégez vos avoirs avec l\'assurance phishing d\'Helfenstein',
        tag: 'Fiche d\'information',
        teaser:
          'L\'assurance phishing d\'Helfenstein vous protège contre toute attaque de phishing survenant malgré les mesures de sécurité et les précautions prises.',
        cta: 'Commander gratuitement',
      },
    ],
    solutions: [
      {
        title: 'Planification de la retraite',
        text: 'Planifiez votre retraite avec Helfenstein et soyez assuré de disposer d\'une sécurité financière une fois que vous aurez cessé toute activité professionnelle.',
      },
      {
        title: 'Pilier 3a avec placements indiciels',
        text: 'Chez Helfenstein, vous pouvez investir vos avoirs du pilier 3a dans les meilleurs fonds indiciels. Grâce à des frais inférieurs, vous pouvez générer des rendements supplémentaires de plusieurs milliers, voire dizaines de milliers de francs au fil des années.',
      },
      {
        title: 'Conseil fiscal',
        text: 'Nos experts vous montrent comment optimiser votre situation fiscale à long terme et économiser plusieurs milliers, voire dizaines de milliers de francs.',
      },
      {
        title: 'Mandats de gestion de fortune',
        text: 'Chez Helfenstein, nous combinons une stratégie de placement simple, une mise en œuvre efficace et un accompagnement actif. Trouvez le mandat qui vous convient.',
      },
    ],
    mandates: [
      {
        title:
          'Entreprise innovante à croissance rapide dans le domaine de la technologie du bâtiment et de l\'optimisation énergétique',
      },
      { title: 'Entreprise spécialisée en ingénierie industrielle de procédés avec technologie brevetée' },
      { title: 'L\'un des principaux fournisseurs suisses de matériaux d\'emballage logistique' },
      { title: 'Prestataire de services de télécommunications prospère' },
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
    marketVideo: {
      slug: 'helfenstein-financial-portal-pro',
      tagline: 'Portail financier Helfenstein Pro',
      title: 'La plateforme pour vos opérations en bourse',
      teaser: 'Vidéo d\'Helfenstein Asset Management (1:46 minute)',
      videoNote: 'Vidéo d\'Helfenstein Asset Management (1:46 minute)',
      body: [
        'Le Portail financier Helfenstein Pro réunit cours en temps réel, profondeur de marché, graphiques et saisie d\'ordres dans une vue unique.',
        'Listes de surveillance, alertes et analyse de portefeuille sont inclus sans frais supplémentaires, et les ordres peuvent être passés directement sur toutes les principales bourses suisses et internationales.',
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
        'Helfenstein conseille les clients privés en matière de retraite, de placements, de planification successorale, d\'immobilier, d\'impôts et de prévoyance. Nous sommes rémunérés exclusivement par nos clients — jamais par des fournisseurs de produits — de sorte que nos recommandations sont exemptes de tout intérêt commercial.',
        'Chaque mandat commence par une analyse écrite de votre situation. Vous décidez ensuite si et comment vous souhaitez travailler avec nous.',
      ],
      highlights: [
        { title: 'Retraite', text: 'Déterminez précisément quand vous pouvez vous permettre de cesser toute activité professionnelle et ce que cela coûtera.' },
        { title: 'Placements', text: 'Une stratégie claire mise en œuvre avec des fonds indiciels à faibles coûts et réexaminée en continu.' },
        { title: 'Planification successorale', text: 'Testaments, conventions matrimoniales et donations organisés pour que vos volontés soient juridiquement sécurisées.' },
        { title: 'Impôts', text: 'Une planification fiscale à long terme qui permet d\'économiser des milliers de francs de manière fiable.' },
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
        'Nous combinons une stratégie de placement clairement définie avec une mise en œuvre à faibles coûts et un accompagnement actif. Vous savez toujours ce que vous détenez, combien cela coûte et pourquoi cela figure dans votre portefeuille.',
        'Comme Helfenstein ne perçoit aucune rétrocession, le seul honoraire que vous payez est celui convenu avec nous.',
      ],
      highlights: [
        { title: 'Mandats de gestion de fortune', text: 'Gestion discrétionnaire à partir d\'un noyau indiciel largement diversifié.' },
        { title: 'Placements indiciels', text: 'Des frais courants représentant une fraction de ceux des fonds gérés activement.' },
        { title: 'Analyse de portefeuille', text: 'Un second avis écrit sur le portefeuille que vous détenez aujourd\'hui.' },
        { title: 'Conservation auprès de partenaires bancaires suisses', text: 'Des coûts inférieurs et aucun incitatif à renouveler inutilement votre portefeuille.' },
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
        'Helfenstein compare le marché en permanence, négocie en votre nom et vérifie la capacité financière bien avant l\'échéance de votre taux fixe.',
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
        'Nos experts vous montrent comment structurer ces décisions et économiser plusieurs milliers, voire dizaines de milliers de francs.',
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
        { title: 'Assurance phishing', text: 'Protection contre les attaques qui réussissent malgré les précautions.' },
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
        { title: 'Pilier 3a avec placements indiciels', text: 'Les meilleurs fonds indiciels, à une fraction des frais habituels.' },
        { title: 'Rachats volontaires', text: 'Quand un rachat à la caisse de pension est réellement rentable.' },
        { title: 'Plusieurs comptes', text: 'Des retraits échelonnés qui réduisent l\'impôt sur le capital.' },
        { title: 'Libre passage', text: 'Où placer votre capital entre deux emplois.' },
      ],
    },
    [ROUTES.banking]: {
      path: ROUTES.banking,
      breadcrumb: ['Particuliers', 'Services bancaires'],
      title: 'Services bancaires',
      subtitle: 'Conservation sécurisée via des partenaires bancaires suisses.',
      intro: [
        'Les avoirs des clients sont conservés auprès de partenaires de conservation suisses sélectionnés. Helfenstein Asset Management AG fournit la gestion de fortune et le conseil ; nous n\'exploitons pas de banque propre.',
        'Les clients bénéficient de frais de conservation transparents, de l\'absence de rétrocessions et de la protection suisse des dépôts.',
      ],
      highlights: [
        { title: 'Conservation de titres', text: 'Des tarifs de conservation forfaitaires et transparents, sans marges cachées.' },
        { title: 'Comptes et cartes', text: 'Services bancaires courants aux côtés de votre portefeuille de placements.' },
        { title: 'Hypothèques', text: 'Financement obtenu sur la base de conditions comparées.' },
        { title: 'Sécurité', text: 'Accès multifacteur et surveillance continue de la fraude.' },
      ],
    },
    [ROUTES.companies]: {
      path: ROUTES.companies,
      breadcrumb: ['Entreprises'],
      title: 'Entreprises',
      subtitle: 'Des caisses de pension à la planification de la succession.',
      intro: [
        'Helfenstein conseille les petites et moyennes entreprises suisses en matière de prévoyance professionnelle, de gestion des assurances, de constitution de société et de succession.',
        'Les entreprises qui collaborent avec Helfenstein économisent jusqu\'à 30 pour cent sur les primes de risque et les frais d\'administration tout en réduisant leur charge de travail interne.',
      ],
      highlights: [
        { title: 'Planification de la succession d\'entreprise', text: 'Évaluation, recherche d\'acquéreurs et gestion de la transaction.' },
        { title: 'Caisses de pension', text: 'Benchmarking et restructuration de votre régime de prévoyance professionnelle.' },
        { title: 'Plans de prévoyance pour la direction', text: 'Couverture complémentaire fiscalement avantageuse pour les hauts revenus.' },
        { title: 'Gestion des assurances', text: 'Un partenaire unique pour l\'ensemble du portefeuille d\'assurances de l\'entreprise.' },
      ],
    },
    [ROUTES.companiesSuccession]: {
      path: ROUTES.companiesSuccession,
      breadcrumb: ['Entreprises', 'Planification de la succession d\'entreprise'],
      title: 'Planification de la succession d\'entreprise',
      subtitle: 'Transmettez votre entreprise selon vos propres conditions.',
      intro: [
        'La vente d\'une entreprise est une opération que la plupart des propriétaires n\'effectuent qu\'une seule fois. L\'évaluation, la structuration fiscale, la recherche d\'acquéreurs et la négociation doivent s\'articuler, et le processus dure généralement un à deux ans.',
        'Helfenstein gère l\'ensemble de la transaction et défend vos intérêts de la première évaluation à la clôture.',
      ],
      highlights: [
        { title: 'Évaluation de l\'entreprise', text: 'Un chiffre défendable fondé sur des bénéfices durables.' },
        { title: 'Recherche d\'acquéreurs', text: 'Approche discrète d\'acquéreurs stratégiques et financiers.' },
        { title: 'Structuration fiscale', text: 'Organisation de la vente pour que le produit ne soit pas érodé par l\'impôt.' },
        { title: 'Gestion de la transaction', text: 'Due diligence, contrats et clôture coordonnés pour vous.' },
      ],
    },
    [ROUTES.companiesPensionFunds]: {
      path: ROUTES.companiesPensionFunds,
      breadcrumb: ['Entreprises', 'Caisses de pension'],
      title: 'Caisses de pension',
      subtitle: 'Économisez jusqu\'à 30 % sur les primes et l\'administration.',
      intro: [
        'Les coûts de prévoyance professionnelle comptent parmi les postes les plus importants et les moins examinés d\'une masse salariale suisse. Les primes de risque et les frais d\'administration varient fortement d\'un prestataire à l\'autre pour des prestations identiques.',
        'Nous comparons votre régime actuel au marché, lançons un appel d\'offres et gérons le transfert.',
      ],
      highlights: [
        { title: 'Benchmarking', text: 'Vos primes actuelles comparées au marché.' },
        { title: 'Appel d\'offres', text: 'Des offres comparables de l\'ensemble des prestataires pertinents.' },
        { title: 'Conception du plan', text: 'Des prestations structurées en fonction de votre personnel.' },
        { title: 'Administration', text: 'Déclarations salariales et modifications des affiliés prises en charge pour vous.' },
      ],
    },
    [ROUTES.companiesManagementPensionPlans]: {
      path: ROUTES.companiesManagementPensionPlans,
      breadcrumb: ['Entreprises', 'Plans de prévoyance pour la direction'],
      title: 'Plans de prévoyance pour la direction',
      subtitle: 'Couverture complémentaire pour les hauts revenus.',
      intro: [
        'Au-delà d\'un certain salaire, le régime de prévoyance professionnelle standard ne remplace qu\'une faible part du revenu. Un plan de prévoyance séparé pour la direction comble cette lacune et ouvre un potentiel considérable de cotisations déductibles fiscalement.',
        'Nous concevons le plan, le documentons et l\'intégrons au régime de base.',
      ],
      highlights: [
        { title: 'Plans 1e', text: 'Stratégies de placement individuelles pour les salaires au-delà du seuil.' },
        { title: 'Potentiel de rachat', text: 'Création de marge pour des cotisations volontaires déductibles.' },
        { title: 'Couverture des risques', text: 'Prestations en cas de décès et d\'invalidité adaptées au revenu.' },
        { title: 'Gouvernance', text: 'Règlements et reporting conformes aux exigences des réviseurs.' },
      ],
    },
    [ROUTES.companiesInsuranceManagement]: {
      path: ROUTES.companiesInsuranceManagement,
      breadcrumb: ['Entreprises', 'Gestion des assurances'],
      title: 'Gestion des assurances',
      subtitle: 'Un partenaire unique pour l\'ensemble de votre portefeuille d\'assurances.',
      intro: [
        'Les assurances d\'entreprise tendent à s\'accumuler plutôt qu\'à être conçues. Les polices se chevauchent, les montants assurés s\'éloignent de la réalité et les primes sont rarement remises en concurrence.',
        'Helfenstein dresse un inventaire, supprime les doublons et gère les renouvellements et les sinistres en votre nom.',
      ],
      highlights: [
        { title: 'Revue du portefeuille', text: 'Chaque police évaluée au regard de la couverture, des lacunes et du prix.' },
        { title: 'Appels d\'offres', text: 'Renouvellements mis en concurrence sur des bases comparables.' },
        { title: 'Gestion des sinistres', text: 'Nous vous représentons lorsqu\'un sinistre survient.' },
        { title: 'Reporting', text: 'Un aperçu annuel unique de la couverture et des coûts.' },
      ],
    },
    [ROUTES.companiesEstablishing]: {
      path: ROUTES.companiesEstablishing,
      breadcrumb: ['Entreprises', 'Création d\'entreprise'],
      title: 'Création d\'entreprise',
      subtitle: 'Notre boussole pour start-up vous guide de l\'idée au premier salaire.',
      intro: [
        'La création d\'une entreprise en Suisse implique une série de décisions — forme juridique, capital, assurances sociales, inscription à la TVA, prévoyance — dont chacune est difficile à modifier par la suite.',
        'La boussole pour start-up d\'Helfenstein vous guide dans le bon ordre, avec la documentation préparée pour vous.',
      ],
      highlights: [
        { title: 'Forme juridique', text: 'Entreprise individuelle, Sàrl ou SA — ce que chaque option implique réellement.' },
        { title: 'Assurances sociales', text: 'Affiliation et couvertures dont les indépendants sont dépourvus.' },
        { title: 'Prévoyance', text: 'Constitution d\'un pilier 3a et, le cas échéant, d\'un régime de prévoyance professionnelle.' },
        { title: 'Impôts et TVA', text: 'Seuils d\'inscription et obligations comptables.' },
      ],
    },
    [ROUTES.about]: {
      path: ROUTES.about,
      breadcrumb: ['À propos d\'Helfenstein'],
      title: 'À propos d\'Helfenstein',
      subtitle: 'Indépendants depuis 1993.',
      intro: [
        'Helfenstein Asset Management est une société suisse de conseil financier. Nous conseillons les clients privés en matière de retraite, de placements, d\'impôts et d\'immobilier.',
        'Nous n\'acceptons aucune commission de la part de fournisseurs de produits. Nos revenus proviennent exclusivement des honoraires convenus avec nos clients.',
      ],
      highlights: [
        { title: 'Conseil indépendant', text: 'Aucune rétrocession, aucun objectif de vente de produits.' },
        { title: 'Équipe', text: 'Des spécialistes qui vous accompagnent sur le long terme.' },
        { title: 'Emplois et carrières', text: 'Un conseil évalué sur la qualité, et non sur les volumes vendus.' },
        { title: 'Contact et assistance', text: 'Écrivez-nous, appelez-nous ou fixez un premier entretien.' },
      ],
    },
    [ROUTES.aboutIndependentAdvice]: {
      path: ROUTES.aboutIndependentAdvice,
      breadcrumb: ['À propos d\'Helfenstein', 'Conseil indépendant'],
      title: 'Conseil indépendant',
      subtitle: 'Rémunérés par nos clients. Par personne d\'autre.',
      intro: [
        'La plupart des conseils financiers en Suisse sont financés par les produits qu\'ils recommandent. Cet arrangement est invisible pour le client et favorise systématiquement les solutions les plus coûteuses.',
        'Helfenstein est rémunérée uniquement par ses clients. Nous publions nos honoraires, reversons toute rétrocession que nous ne pouvons éviter, et nos conseillers n\'ont aucun objectif de vente de produits.',
      ],
      highlights: [
        { title: 'Transparence des honoraires', text: 'Vous connaissez le coût avant de prendre toute décision.' },
        { title: 'Aucune rétrocession', text: 'Tout paiement de tiers vous est crédité.' },
        { title: 'Analyse écrite', text: 'Des recommandations que vous pouvez lire, vérifier et conserver.' },
        { title: 'Premier entretien gratuit', text: 'La consultation initiale ne vous coûte rien.' },
      ],
    },
    [ROUTES.aboutBranchOffices]: {
      path: ROUTES.aboutBranchOffices,
      breadcrumb: ['À propos d\'Helfenstein', 'Succursales'],
      title: 'Succursales',
      subtitle: 'Plus de trente sites en Suisse.',
      intro: [
        'Helfenstein conseille ses clients depuis des bureaux dans toutes les grandes régions économiques suisses, en allemand, français, italien et anglais.',
        'Trouvez le bureau le plus proche de chez vous et fixez un premier entretien gratuit.',
      ],
      highlights: [
        { title: 'Suisse alémanique', text: 'Zurich, Berne, Bâle, Lucerne, Saint-Gall, Aarau, Zoug et autres.' },
        { title: 'Suisse romande', text: 'Genève, Lausanne, Nyon, Fribourg, Neuchâtel, Sion.' },
        { title: 'Tessin', text: 'Lugano et Bellinzone.' },
        { title: 'Heures d\'ouverture', text: 'Du lundi au vendredi de 08h00 à 18h00, rendez-vous en dehors de ces horaires sur demande.' },
      ],
    },
    [ROUTES.aboutPortrait]: {
      path: ROUTES.aboutPortrait,
      breadcrumb: ['À propos d\'Helfenstein', 'Portrait'],
      title: 'Portrait',
      subtitle: 'Un groupe suisse de services financiers au modèle économique unique.',
      intro: [
        'Fondée en 1993, Helfenstein Asset Management est devenue l\'un des plus grands conseillers financiers indépendants de Suisse, avec sa propre banque de dépôt et sa courtage en assurances.',
        'Le groupe est coté à la Bourse suisse depuis 2007.',
      ],
      highlights: [
        { title: 'Partenaires de conservation', text: 'Conservation ségréguée auprès de banques suisses autorisées.' },
        { title: 'Helfenstein Insurance Services', text: 'Courtage pour les clients privés et les entreprises.' },
        { title: 'Direction', text: 'Direction générale et conseil d\'administration.' },
        { title: 'Historique', text: 'Trois décennies de conseil indépendant.' },
      ],
    },
    [ROUTES.aboutInvestorRelations]: {
      path: ROUTES.aboutInvestorRelations,
      breadcrumb: ['À propos d\'Helfenstein', 'Relations investisseurs'],
      title: 'Relations investisseurs',
      subtitle: 'Rapports, chiffres clés et calendrier financier.',
      intro: [
        'Les actions Helfenstein Asset Management AG sont cotées à la Bourse suisse. Cette section regroupe les rapports annuels et semestriels, les communiqués de presse, les présentations et le calendrier financier.',
        'Contactez notre équipe relations investisseurs pour toute question complémentaire.',
      ],
      highlights: [
        { title: 'Rapport annuel', text: 'États financiers complets et commentaire de la direction.' },
        { title: 'Rapport semestriel', text: 'Résultats intermédiaires et chiffres par segment.' },
        { title: 'Informations sur l\'action', text: 'Structure du capital, historique des dividendes et couverture analytique.' },
        { title: 'Calendrier financier', text: 'Dates de publication et assemblée générale annuelle.' },
      ],
    },
    [ROUTES.aboutJobs]: {
      path: ROUTES.aboutJobs,
      breadcrumb: ['À propos d\'Helfenstein', 'Emplois et carrières'],
      title: 'Emplois et carrières',
      subtitle: 'Un conseil sans objectifs de vente.',
      intro: [
        'Comme Helfenstein ne tire aucun revenu de produits, nos conseillers sont évalués sur la qualité de leur conseil plutôt que sur les volumes vendus. Cela transforme fondamentalement le métier.',
        'Nous recherchons continuellement des conseillers, des spécialistes et des jeunes diplômés dans le monde entier.',
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
      breadcrumb: ['À propos d\'Helfenstein', 'Contact et assistance'],
      title: 'Contact et assistance',
      subtitle: 'Nous sommes heureux de vous entendre.',
      intro: [
        'Appelez-nous, écrivez-nous ou fixez un premier entretien gratuit dans la succursale la plus proche de chez vous. Nos conseillers parlent allemand, français, italien et anglais.',
        'Pour toute question relative au Portail financier Helfenstein, notre équipe d\'assistance est disponible en semaine pendant les heures de bureau.',
      ],
      highlights: [
        { title: 'Téléphone', text: 'Du lundi au vendredi de 08h00 à 18h00 au numéro de votre bureau local.' },
        { title: 'Rendez-vous', text: 'Réservez un premier entretien gratuit en ligne en quelques minutes.' },
        { title: 'Assistance portail', text: 'Aide pour la connexion, l\'accès à deux facteurs et le trading.' },
        { title: 'Demandes médias', text: 'Notre équipe communication vous répondra rapidement.' },
      ],
    },
    [ROUTES.appointments]: {
      path: ROUTES.appointments,
      breadcrumb: ['Rendez-vous'],
      title: 'Prendre rendez-vous',
      subtitle: 'Le premier entretien est gratuit.',
      intro: [
        'Échangez avec un expert d\'Helfenstein au sujet de votre retraite, de vos placements, de vos impôts ou de votre hypothèque. La première consultation ne vous coûte rien et ne vous engage à rien.',
        'Choisissez une succursale et un horaire qui vous conviennent, et indiquez-nous brièvement ce que vous souhaitez aborder.',
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
        'Helfenstein publie des recherches sur la retraite, la prévoyance, les impôts, les hypothèques et les placements, ainsi que des calculateurs et des check-lists que vous pouvez utiliser vous-même.',
        'Tout le contenu est gratuit et ne nécessite aucune inscription.',
      ],
      highlights: [
        { title: 'Centre de connaissances', text: 'Plusieurs centaines d\'articles sur les finances personnelles en Suisse.' },
        { title: 'Calculateurs', text: 'Outils pour la retraite, la capacité hypothécaire et le pilier 3a.' },
        { title: 'Fiches d\'information', text: 'Guides imprimés concis, envoyés gratuitement.' },
        { title: 'Études', text: 'Recherches régulières sur les caisses de pension et les taux hypothécaires.' },
      ],
    },
    [ROUTES.financialPortal]: {
      path: ROUTES.financialPortal,
      breadcrumb: ['Portail financier Helfenstein'],
      title: 'Portail financier Helfenstein',
      subtitle: 'Votre portefeuille, vos documents, vos marchés.',
      intro: [
        'Le Portail financier Helfenstein vous offre une vue consolidée de vos comptes et portefeuilles, de l\'ensemble de vos documents et des données de marché en temps réel.',
        'La version Pro ajoute la profondeur de marché, des graphiques avancés et la saisie d\'ordres directe sur toutes les principales bourses.',
      ],
      highlights: [
        { title: 'Vue d\'ensemble du portefeuille', text: 'Performance consolidée de l\'ensemble de vos avoirs.' },
        { title: 'Documents', text: 'Relevés et documents fiscaux dans une archive unique.' },
        { title: 'Trading', text: 'Saisie d\'ordres sur les bourses suisses et internationales.' },
        { title: 'Sécurité', text: 'Authentification à deux facteurs à chaque connexion.' },
      ],
    },
    [ROUTES.stockExchangesAndMarkets]: {
      path: ROUTES.stockExchangesAndMarkets,
      breadcrumb: ['Cours et marchés'],
      title: 'Bourses et marchés Helfenstein',
      subtitle: 'Derniers cours, actualités et analyses.',
      intro: [
        'Informations fiables, cours en temps réel et outils utiles — le tout au même endroit, et gratuit une fois inscrit.',
        'Suivez les indices, les devises, les taux d\'intérêt et les titres individuels, et définissez des alertes sur les positions qui comptent pour vous.',
      ],
      highlights: [
        { title: 'Cours en temps réel', text: 'Actions, indices et devises suisses et internationaux.' },
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
      subtitle: 'Des informations régulières pour optimiser votre prévoyance.',
      intro: [
        'Recevez régulièrement des informations sur l\'optimisation de votre AVS, de votre prévoyance professionnelle et de votre pilier 3a. La newsletter est publiée en allemand, français et italien.',
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
    [ROUTES.phishingInsurance]: {
      path: ROUTES.phishingInsurance,
      breadcrumb: ['Assurance phishing Helfenstein'],
      title: 'Protégez vos avoirs avec l\'assurance phishing d\'Helfenstein',
      subtitle: 'Couverture pour les attaques qui réussissent malgré toutes les précautions.',
      intro: [
        'Le phishing est devenu la voie la plus courante d\'accès non autorisé aux comptes financiers. Même des personnes prudentes et bien informées sont parfois prises au piège par un message convaincant.',
        'L\'assurance phishing d\'Helfenstein couvre la perte financière si une attaque réussit malgré les mesures de sécurité et les précautions en place.',
      ],
      highlights: [
        { title: 'Ce qui est couvert', text: 'Pertes résultant de transactions non autorisées à la suite d\'une attaque.' },
        { title: 'Qui est couvert', text: 'Disponible pour les clients conseillés Helfenstein disposant d\'un arrangement de conservation éligible.' },
        { title: 'Prévention', text: 'Conseils pratiques pour reconnaître les messages frauduleux.' },
        { title: 'Sinistres', text: 'Un interlocuteur unique si quelque chose tourne mal.' },
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
            'Les informations publiées sur ce site web sont fournies à titre d\'information générale uniquement. Elles ne constituent ni une offre, ni une recommandation, ni une invitation à acheter ou vendre un instrument financier, ni un conseil en placement, juridique ou fiscal.',
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
            'L\'utilisation de ce site web est régie par le droit suisse. Le for exclusif est Zurich, Suisse.',
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
            'Informations sur nos services, la segmentation clientèle, le traitement des conflits d\'intérêts et notre affiliation à un organe de médiation.',
          ],
        },
        {
          heading: 'Rapports',
          paragraphs: [
            'Rapports annuels et semestriels d\'Helfenstein Asset Management AG, ainsi que communiqués de presse et présentations.',
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
            'LEI actif ; renouvellement dû le 4 novembre 2026.',
          ],
        },
        {
          heading: 'Activité',
          paragraphs: [
            'Gestion de fortune, conseil financier, planification de la retraite et conseil en financement.',
          ],
        },
        {
          heading: 'Surveillance',
          paragraphs: [
            'Helfenstein Asset Management AG est inscrite auprès de la FINMA en tant que gestionnaire de fortune et est supervisée par OSFINcontrol AG.',
          ],
        },
        {
          heading: 'Conception et réalisation',
          paragraphs: ['Réalisé avec React, Vite et Tailwind CSS.'],
        },
      ],
    },
  },
  team: {
    sections: {
      investment: 'Équipe de gestion',
      business: 'Développement commercial',
      investors: 'Relations investisseurs',
    },
    featuredLead:
      'Friedrich Hartmann dirige la philosophie d\'investissement d\'Helfenstein et l\'allocation de capital à long terme.',
    members: {
      'friedrich-hartmann': {
        slug: 'friedrich-hartmann',
        role: 'Président et CIO',
        about:
          'Friedrich Hartmann a façonné la culture d\'investissement d\'Helfenstein depuis plus de trente ans. Lecteur assidu et marcheur de longue distance, il dirige toujours la construction de portefeuille et définit le cadre de valeur à long terme de la société.',
        results: [
          'A bâti la stratégie actions phare d\'Helfenstein depuis sa création ; rendement annualisé composé de 11,4 % depuis 2004.',
          'Nommé à trois reprises parmi les principaux gérants value d\'Europe par des agences de notation indépendantes.',
          'Auteur de In Long Horizon, sur le capital patient et l\'investissement conscient des cycles.',
        ],
      },
      'karin-vogel': {
        slug: 'karin-vogel',
        role: 'Gérante de portefeuille',
        about:
          'Karin Vogel a rejoint Helfenstein après des expériences dans des maisons value de Madrid et Saragosse. Elle couvre les mid-caps européennes avec une approche forensique bottom-up et un style calme et direct avec les clients.',
        results: [
          'Titulaire du charter CFA ; analyste principale du fonds Continental Value depuis 2016.',
          'Portefeuille ayant surperformé son indice de référence de 2,8 % annualisés sur les cinq dernières années.',
          'Reconnue en interne pour avoir transformé trois participations industrielles négligées en positions de long terme.',
        ],
      },
      'lukas-steiner': {
        slug: 'lukas-steiner',
        role: 'Gérant de portefeuille',
        about:
          'Lukas Steiner s\'est formé à Vienne et à Londres avant de rejoindre Helfenstein. Il combine l\'analyse fondamentale actions avec un vif intérêt pour l\'économie autrichienne et le football — généralement dans cet ordre les jours de match.',
        results: [
          'Gère la poche actions ibériques de la société aux côtés des co-gérants européens.',
          'A réduit le turnover moyen du portefeuille de 22 % tout en améliorant le taux de réussite des nouvelles idées.',
          'Intervenant régulier au forum de recherche interne d\'Helfenstein sur le timing des cycles de capital.',
        ],
      },
      'maximilian-berger': {
        slug: 'maximilian-berger',
        role: 'Gérant de portefeuille',
        about:
          'Maximilian Berger est passé de l\'audit à la gestion de portefeuille, apportant un regard sceptique sur la qualité comptable. Ses collègues le décrivent comme discret en réunion et implacable dans les modèles.',
        results: [
          'A signalé précocement deux risques de bilan qui ont ensuite fait l\'objet d\'un large débat sur le marché.',
          'Co-gère les participations européennes positionnées de manière défensive dans la gamme Global Value.',
          'A dirigé la revue 2023 d\'Helfenstein sur les normes comptables dans l\'univers investissable.',
        ],
      },
      'julian-vogt': {
        slug: 'julian-vogt',
        role: 'Gérant de portefeuille',
        about:
          'Julian Vogt est titulaire de diplômes en droit et en gestion et nourrit un profond intérêt pour la théorie du capital. En dehors du bureau, il est plus susceptible d\'être sur un parcours de golf ou de revoir un film favori que de consulter les cours.',
        results: [
          'A structuré la check-list de gouvernance d\'Helfenstein désormais utilisée avant chaque nouvelle position importante.',
          'A contribué à réduire les frictions juridiques et réglementaires dans trois participations transfrontalières.',
          'Encadre les analystes juniors sur la rédaction de thèses et le dimensionnement des positions.',
        ],
      },
      'ken-wagner': {
        slug: 'ken-wagner',
        role: 'Gérant de portefeuille',
        about:
          'Ken Wagner fait le lien entre le desk européen d\'Helfenstein et les opportunités cotées en Asie. Né à Taipei et formé à Barcelone, il voyage souvent et lit les rapports annuels avec la même patience.',
        results: [
          'A ouvert la première couverture de recherche Asie-Pacifique dédiée d\'Helfenstein en 2019.',
          'A identifié quatre investissements représentant aujourd\'hui plus de 8 % du portefeuille global.',
          'Parle couramment mandarin, allemand et espagnol ; contact principal auprès des courtiers régionaux.',
        ],
      },
      'stefan-richter': {
        slug: 'stefan-richter',
        role: 'Gérant de portefeuille',
        about:
          'Stefan Richter a passé des années côté vente avant de rejoindre Helfenstein. Coureur de montagne en dehors du bureau, il préfère les entreprises capables de se développer discrètement à travers les cycles.',
        results: [
          'Ancien responsable de la recherche d\'un groupe industriel coté ; a rejoint Helfenstein en 2015.',
          'Performance dans le premier quartile sur les participations cycliques pendant la période 2020–2022.',
          'A constitué la watchlist transition énergétique de la société adoptée par le comité d\'investissement.',
        ],
      },
      'greta-keller': {
        slug: 'greta-keller',
        role: 'Analyste junior',
        about:
          'Greta Keller a rejoint Helfenstein après un stage en relations investisseurs et s\'est rapidement installée sur le floor de gestion. Elle apporte des compétences de modélisation récentes et un regard particulièrement aiguisé sur les tendances de consommation.',
        results: [
          'Diplômée major de promotion en administration des affaires ; a rejoint l\'équipe en 2023.',
          'Première note d\'analyste transmise au portefeuille dans les six semaines suivant son arrivée.',
          'Assure la couverture de small caps consommation et industrielles dans la région DACH.',
        ],
      },
      'tobias-brandt': {
        slug: 'tobias-brandt',
        role: 'Directeur général',
        about:
          'Tobias Brandt dirige le développement commercial d\'Helfenstein après des expériences en private banking et en vente actions. C\'est la personne la plus susceptible de savoir quelle institution est prête pour un échange approfondi.',
        results: [
          'A développé la clientèle institutionnelle d\'Helfenstein de 40 % en quatre ans.',
          'A lancé le programme de formation des conseillers de la société, suivi chaque année par plus de 600 professionnels.',
          'A auparavant dirigé les ventes pour l\'Ibérie et l\'Amérique latine sur une plateforme multi-actifs européenne.',
        ],
      },
      'markus-engel': {
        slug: 'markus-engel',
        role: 'Directeur, relations investisseurs',
        about:
          'Markus Engel dirige les relations investisseurs, le marketing et la communication. Chaleureux au téléphone et précis dans le suivi, il maintient la voix externe d\'Helfenstein cohérente avec la gestion réelle des portefeuilles.',
        results: [
          'A augmenté les actifs sous conseil de clients retail et professionnels de 850 Mio EUR en trois ans.',
          'A introduit le format de lettre trimestrielle désormais cité par plusieurs titres économiques nationaux.',
          'Dirige l\'équipe qui traite plus de 12 000 contacts clients par an.',
        ],
      },
      'marc-weber': {
        slug: 'marc-weber',
        role: 'Directeur, opérations clients',
        about:
          'Marc Weber coordonne les opérations clients et les arrangements de conservation chez Helfenstein Asset Management AG. Issu du private banking, il rend une infrastructure de niveau institutionnel accessible aux clients conseillés à Lucerne et en Suisse.',
        results: [
          'A réduit les coûts moyens de conservation et de règlement pour les clients d\'Helfenstein de 18 % depuis 2020.',
          'A supervisé la migration de plus de 4,2 Mrd EUR d\'actifs clients vers les comptes ségrégués de la banque.',
          'A étendu les services de dépôt aux caisses de pension, family offices et conseillers externes dans la région DACH.',
        ],
      },
      'anja-hoffmann': {
        slug: 'anja-hoffmann',
        role: 'Relations investisseurs',
        about:
          'Anja Hoffmann est passée de l\'IR de sociétés cotées à la gestion d\'actifs. Les clients apprécient son style direct et sa façon d\'expliquer des mouvements de portefeuille complexes en langage clair.',
        results: [
          'Gère les relations avec plus de 180 familles à haut patrimoine.',
          'Score de satisfaction client de 4,8/5 lors de la dernière enquête annuelle.',
          'Organise les journées investisseurs semestrielles d\'Helfenstein à Munich et Zurich.',
        ],
      },
      'florian-bauer': {
        slug: 'florian-bauer',
        role: 'Relations investisseurs',
        about:
          'Florian Bauer couvre les comptes institutionnels qui attendent du détail, pas du sensationnalisme. Ancien passionné de tennis devenu skieur du week-end, il est fiable sous pression et rappelle rarement en retard.',
        results: [
          'A contribué à 320 Mio EUR de collecte nette via les canaux de conseil en 2024.',
          'A réduit le délai moyen de réponse aux demandes à moins de quatre heures ouvrables.',
          'Contact principal pour les partenaires distributeurs du sud de l\'Allemagne et de l\'Autriche.',
        ],
      },
      'andrew-ramsden': {
        slug: 'andrew-ramsden',
        role: 'Relations investisseurs',
        about:
          'Andrew Ramsden apporte trois décennies d\'expérience en relations institutionnelles au desk investisseurs d\'Helfenstein. Mesuré et accessible, c\'est la personne que les consultants appellent lorsqu\'un mandat exige de la clarté plutôt que du spin.',
        results: [
          'A ouvert et approfondi des relations avec plus de 40 clients pensions et endowments en Europe.',
          'A dirigé la première roadshow pan-européenne auprès des consultants, obtenant trois mandats de conseil pluriannuels.',
          'Ancien responsable de la couverture clients chez un asset manager londonien avant de rejoindre Helfenstein en 2019.',
        ],
      },
      'erik-schneider': {
        slug: 'erik-schneider',
        role: 'Relations investisseurs',
        about:
          'Erik Schneider évolue depuis deux décennies dans l\'univers des fonds et des plateformes de conseil. Stable et posé, c\'est souvent la première personne que les clients de longue date demandent lorsque les marchés deviennent agités.',
        results: [
          'Gère le portefeuille clients le plus ancien d\'Helfenstein, remontant à 2008.',
          'A contribué à conserver 98 % des actifs pendant le pic de volatilité de 2022.',
          'Ancien directeur de private banking avant de rejoindre Helfenstein en 2016.',
        ],
      },
      'andrew-savage': {
        slug: 'andrew-savage',
        role: 'Relations investisseurs',
        about:
          'Andrew Savage se spécialise dans l\'accueil des investisseurs professionnels et la qualité du reporting. Énergique en réunion et méticuleux dans le suivi, il relie équipes d\'investissement et clients sans perdre le détail.',
        results: [
          'A accueilli 110 nouveaux investisseurs professionnels au cours des deux dernières années.',
          'A reconstruit le pack de reporting trimestriel utilisé par toutes les relations IR ; le NPS a gagné huit points.',
          'Contact principal pour les plateformes de conseil britanniques et irlandaises distribuant les stratégies Helfenstein.',
        ],
      },
      'birgit-schulz': {
        slug: 'birgit-schulz',
        role: 'Relations investisseurs',
        about:
          'Birgit Schulz est entrée dans les services financiers après une carrière en contrôle qualité — un parcours qui se reflète dans la documentation minutieuse de chaque interaction client. Calme, rigoureuse et difficile à déstabiliser.',
        results: [
          'A reconstruit les standards d\'hygiène CRM de l\'équipe ; complétude des données désormais supérieure à 99 %.',
          'Assiste les clients nordiques et du Benelux dans trois langues.',
          'Reconnue pour la résolution des transferts de comptes hérités les plus complexes de la société.',
        ],
      },
      'alexander-koch': {
        slug: 'alexander-koch',
        role: 'Clientèle institutionnelle',
        about:
          'Alexander Koch gère le pipeline institutionnel et les relations avec les consultants. Jeune mais déjà crédible en due diligence, il met en relation les équipes de gestion avec les bons partenaires externes.',
        results: [
          'A ajouté douze nouvelles relations avec des consultants en fonds depuis 2022.',
          'A contribué à remporter trois appels d\'offres institutionnels compétitifs en 2024.',
          'Coordonne les questionnaires ESG et les réponses aux appels d\'offres d\'Helfenstein.',
        ],
      },
      'leon-roth': {
        slug: 'leon-roth',
        role: 'Relations investisseurs',
        about:
          'Leon Roth veille au bon fonctionnement du service client d\'Helfenstein. Ses collègues comptent sur lui pour orienter la bonne équipe au bon moment sans que les clients aient l\'impression d\'être transférés.',
        results: [
          'Coordonne les demandes transversales pour plus de 400 dossiers clients actifs.',
          'A introduit des modèles de réponse partagés qui ont divisé par deux les erreurs de transmission interne.',
          'Reconnu pour transformer des cas de service difficiles en fidélité client à long terme.',
        ],
      },
      'henrik-meier': {
        slug: 'henrik-meier',
        role: 'Relations investisseurs',
        about:
          'Henrik Meier rédige les mises à jour quotidiennes aux clients et soutient l\'équipe communication. Clair, concis et légèrement mélomane en dehors du travail — il joue de la guitare dans un groupe de bureau qui sonne mieux qu\'il n\'en a l\'air.',
        results: [
          'Produit les lettres mensuelles aux participants lues par plus de 8 000 investisseurs.',
          'A contribué à augmenter les taux d\'ouverture des e-mails de 19 % grâce à des objets et structures plus clairs.',
          'Rédacteur adjoint pour l\'ensemble des publications externes en langue allemande.',
        ],
      },
    },
  },
};
