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
      label: 'À propos',
      to: ROUTES.about,
      children: [
        { label: 'Notre équipe', to: `${ROUTES.about}#our-team` },
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
    { label: 'Retraite', to: ROUTES.retirement },
    { label: 'Placements', to: ROUTES.financialInvestments },
    { label: 'Planification successorale', to: ROUTES.estatePlanning },
    { label: 'Immobilier', to: ROUTES.realEstate },
    { label: 'Impôts', to: ROUTES.taxes },
    { label: 'Prévoyance', to: ROUTES.pensionPlanning },
    { label: 'À propos', to: ROUTES.about },
    { label: 'Conformité réglementaire', to: ROUTES.regulatoryAndCompliance },
    { label: 'Notre équipe', to: ROUTES.aboutTeam },
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
    siteName: 'Helfenstein Group',
    defaultTitle:
      'Helfenstein Group – Conseil indépendant à honoraires pour la clientèle privée en Suisse',
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
    allInsights: 'Tous les insights',
    meetSpecialists: 'Nos spécialistes',
    regulatoryChallenges: 'Défis réglementaires',
    howWeHelp: 'Comment nous aidons',
    adviceDisclaimer:
      'Informations générales uniquement. Ne constitue pas un conseil personnalisé en investissement, fiscalité ou droit. Helfenstein Group ne détient aucun avoir de la clientèle ; la conservation est assurée intégralement par des banques dépositaires suisses partenaires.',
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
      text: 'Des informations concrètes sur la prévoyance, les impôts, les placements et l\'immobilier – écrites pour la clientèle privée, sans promotion de produits.',
      linkLabel: 'Abonnez-vous à notre newsletter (en anglais, allemand, français et italien).',
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
          'Le pilier 3a est le moyen le plus répandu d\'économiser des impôts en Suisse. Les cotisations peuvent être déduites intégralement du revenu imposable, dans la limite d\'un plafond annuel ajusté périodiquement. Comme nous sommes rémunérés uniquement par vous, nous pouvons recommander le prestataire 3a qui vous convient le mieux — banque, fondation ou assureur — sans préférence propre.',
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
          'Les coûts comptent parmi les rares certitudes en matière de placement. Chaque franc économisé en frais reste investi et se capitalise sur toute la durée de détention — raison pour laquelle un conseiller qui ne touche aucune part de ces frais est le seul à n\'avoir aucun motif de les négliger.',
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
        text: 'Nous vous aidons à placer votre pilier 3a dans des solutions indicielles à faibles coûts, déposées auprès de la banque ou de la fondation suisse de votre choix. Sur une vie professionnelle, des frais inférieurs peuvent représenter des dizaines de milliers de francs.',
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
    marketVideo: {
      slug: 'helfenstein-financial-portal',
      tagline: 'Portail financier Helfenstein',
      title: 'Une vue claire de tout ce que vous détenez',
      teaser: 'Vidéo de Helfenstein Group (1:46 minute)',
      videoNote: 'Vidéo de Helfenstein Group (1:46 minute)',
      body: [
        'Le Portail financier Helfenstein réunit en une seule vue vos positions auprès de tous vos partenaires bancaires suisses, vos documents et les données de marché actuelles.',
        'Listes de surveillance, alertes et analyse de portefeuille sont inclus sans frais supplémentaires. Vos avoirs restent en tout temps auprès de votre banque ; toute transaction est exécutée par votre banque dépositaire.',
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
        'Nous combinons une stratégie de placement clairement définie avec une mise en œuvre à faibles coûts et un accompagnement actif. Votre portefeuille est déposé à votre nom auprès de la banque suisse de votre choix ; nous le gérons, nous ne le détenons jamais. Vous savez toujours ce que vous détenez, combien cela coûte et pourquoi cela figure dans votre portefeuille.',
        'Comme Helfenstein Group ne perçoit aucune rétrocession, le seul honoraire que vous payez est celui convenu avec nous.',
      ],
      highlights: [
        { title: 'Mandats de gestion de fortune', text: 'Gestion discrétionnaire à partir d\'un noyau indiciel largement diversifié.' },
        { title: 'Placements indiciels', text: 'Des frais courants représentant une fraction de ceux des fonds gérés activement.' },
        { title: 'Analyse de portefeuille', text: 'Un second avis écrit sur le portefeuille que vous détenez aujourd\'hui.' },
        { title: 'Vos avoirs restent auprès de votre banque', text: 'Helfenstein Group ne détient jamais d\'avoirs de la clientèle. La conservation reste assurée par des banques suisses établies, à votre nom.' },
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
        'Helfenstein Group ne détient jamais d\'avoirs de la clientèle. Vos titres et vos liquidités restent sur un compte à votre nom auprès d\'une banque dépositaire suisse, qui vous adresse ses relevés directement ; nous y ajoutons la gestion de portefeuille et le conseil.',
        'Nous vous aidons à choisir un dépositaire, à comparer ce que chacun facture et à vous assurer que le reporting est clair. Les frais de conservation et de transaction sont fixés et facturés par votre banque, jamais par nous.',
      ],
      highlights: [
        { title: 'Des avoirs à votre nom', text: 'Conservation ségréguée auprès d\'une banque suisse autorisée de votre choix.' },
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
        'Helfenstein Group est une société suisse indépendante de conseil et de gestion de fortune établie à Lucerne. Nous conseillons les particuliers et les familles — jamais des institutions ni des entreprises — en matière de gestion de fortune, de conseil financier, de planification de la retraite et de financement.',
        'Nous figurons au registre de la FINMA en qualité de gestionnaire de fortune autorisé et sommes surveillés par OSFINcontrol AG. Nos revenus proviennent exclusivement des honoraires convenus avec nos clients, et nous ne détenons aucun avoir de la clientèle : la conservation est assurée par des partenaires bancaires suisses.',
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
        'La plupart des conseils financiers en Suisse sont financés par les produits qu\'ils recommandent. Cet arrangement est invisible pour le client et favorise systématiquement les solutions les plus coûteuses.',
        'Helfenstein Group est rémunérée uniquement par ses clients — des particuliers et des familles, jamais des institutions ni des entreprises. Nous publions nos honoraires, reversons toute rétrocession que nous ne pouvons éviter, nos conseillers n\'ont aucun objectif de vente de produits, et nous ne détenons jamais vos avoirs : la conservation reste assurée par des partenaires bancaires suisses, à votre nom.',
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
      subtitle: 'Établis à Lucerne, au service de clients dans toute la Suisse.',
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
        'Les avoirs des clients sont conservés auprès de partenaires de conservation suisses sélectionnés, jamais par nous. Nous sommes autorisés par la FINMA en qualité de gestionnaire de fortune et surveillés par OSFINcontrol AG.',
      ],
      highlights: [
        { title: 'Gestion de fortune', text: 'Des mandats construits autour d\'un processus de placement clair.' },
        { title: 'Conseil financier', text: 'Retraite, financement et planification personnelle aux côtés des placements.' },
        { title: 'Partenaires de conservation', text: 'Conservation ségréguée à votre nom auprès de banques suisses autorisées.' },
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
        'Le Portail financier Helfenstein vous offre une vue consolidée des comptes et portefeuilles que vous détenez auprès de vos partenaires bancaires suisses, ainsi que de l\'ensemble de vos documents et des données de marché actuelles.',
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
            'Les informations publiées sur ce site web sont fournies à titre d\'information générale uniquement. Elles ne constituent ni une offre, ni une recommandation, ni une invitation à acheter ou vendre un instrument financier, ni un conseil en placement, juridique ou fiscal. Helfenstein Asset Management AG (Helfenstein Group) est un conseiller et gestionnaire de fortune indépendant ; la société ne détient pas d\'avoirs de la clientèle, ceux-ci restant auprès de la banque dépositaire suisse du client.',
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
            'L\'utilisation de ce site web est régie par le droit suisse. Le for exclusif est Lucerne, Suisse.',
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
          heading: 'Informations sur la société',
          paragraphs: [
            'Helfenstein Asset Management AG (opérant sous le nom de Helfenstein Group) publie sur ce site web les informations réglementaires et les informations destinées aux clients. La société est un conseiller indépendant rémunéré exclusivement par honoraires et un gestionnaire de fortune autorisé par la FINMA ; elle ne détient aucun avoir de la clientèle. Pour les inscriptions les plus récentes, consultez le registre du commerce suisse (IDE CHE-111.708.730).',
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
            'Conseil financier indépendant rémunéré exclusivement par honoraires et gestion de fortune pour la clientèle privée : retraite, placements, impôts, immobilier et planification successorale. Les avoirs des clients sont conservés auprès de partenaires bancaires suisses, et non par la société.',
          ],
        },
        {
          heading: 'Surveillance',
          paragraphs: [
            'Helfenstein Asset Management AG est inscrite auprès de la FINMA en tant que gestionnaire de fortune et est supervisée par OSFINcontrol AG.',
            'Les autorisations peuvent être vérifiées dans le registre officiel de la FINMA (https://www.finma.ch/fr/finma-public/etablissements-personnes-et-produits-autorises/).',
            'Enregistrement LEI : https://search.gleif.org/#/record/894500URZFTDV5G7F357',
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
          'Tobias Brandt dirige le développement de la clientèle chez Helfenstein après des expériences en private banking et en vente actions. C\'est en général la première personne à laquelle un client potentiel parle avant qu\'un premier rendez-vous soit fixé.',
        results: [
          'A développé la clientèle privée d\'Helfenstein de 40 % en quatre ans.',
          'A lancé le programme de formation des clients de la société, suivi chaque année par plus de 600 personnes.',
          'A auparavant dirigé la couverture de la clientèle privée pour l\'Ibérie sur une plateforme multi-actifs européenne.',
        ],
      },
      'markus-engel': {
        slug: 'markus-engel',
        role: 'Directeur, communication clients',
        about:
          'Markus Engel dirige la communication clients et le marketing. Chaleureux au téléphone et précis dans le suivi, il maintient la voix externe d\'Helfenstein cohérente avec la gestion réelle des portefeuilles.',
        results: [
          'A reconstruit le reporting et la correspondance clients utilisés par l\'ensemble de l\'équipe de conseil.',
          'A introduit le format de lettre trimestrielle désormais cité par plusieurs titres économiques nationaux.',
          'Dirige l\'équipe qui traite plus de 12 000 contacts clients par an.',
        ],
      },
      'marc-weber': {
        slug: 'marc-weber',
        role: 'Directeur, opérations clients',
        about:
          'Marc Weber coordonne les opérations clients et les relations avec nos banques dépositaires. Issu du private banking, il veille à ce que les clients reçoivent un reporting clair de la banque qui conserve leurs avoirs, à Lucerne et dans toute la Suisse.',
        results: [
          'A réduit de 18 % depuis 2020 les frais de conservation et de règlement que les clients d\'Helfenstein versent à leur banque.',
          'A dirigé la revue qui a transféré les clients vers des comptes de conservation ségrégués à leur propre nom.',
          'Négocie les conditions de conservation avec nos partenaires bancaires suisses au nom de la clientèle privée.',
        ],
      },
      'anja-hoffmann': {
        slug: 'anja-hoffmann',
        role: 'Conseillère à la clientèle',
        about:
          'Anja Hoffmann est passée de l\'IR de sociétés cotées à la gestion d\'actifs. Les clients apprécient son style direct et sa façon d\'expliquer des mouvements de portefeuille complexes en langage clair.',
        results: [
          'Gère les relations avec plus de 180 clients privés et familles.',
          'Score de satisfaction client de 4,8/5 lors de la dernière enquête annuelle.',
          'Organise les séminaires clients semestriels d\'Helfenstein à Lucerne.',
        ],
      },
      'florian-bauer': {
        slug: 'florian-bauer',
        role: 'Conseiller à la clientèle',
        about:
          'Florian Bauer s\'occupe des clients qui attendent du détail, pas du sensationnalisme. Ancien passionné de tennis devenu skieur du week-end, il est fiable sous pression et rappelle rarement en retard.',
        results: [
          'Conseille les ménages sur la structure de portefeuille et le rééquilibrage annuel.',
          'A réduit le délai moyen de réponse aux demandes à moins de quatre heures ouvrables.',
          'Contact principal pour les clients germanophones résidant hors de Suisse.',
        ],
      },
      'andrew-ramsden': {
        slug: 'andrew-ramsden',
        role: 'Conseiller à la clientèle',
        about:
          'Andrew Ramsden apporte trois décennies d\'expérience de la relation client au desk de conseil d\'Helfenstein. Mesuré et accessible, c\'est la personne que les clients appellent lorsqu\'une décision exige de la clarté plutôt que du spin.',
        results: [
          'Conseille plus de 40 familles sur la retraite et la planification des retraits.',
          'A conçu l\'analyse écrite de préretraite désormais utilisée par toute l\'équipe de conseil.',
          'Ancien responsable de la couverture clientèle privée chez un gestionnaire londonien avant de rejoindre Helfenstein en 2019.',
        ],
      },
      'erik-schneider': {
        slug: 'erik-schneider',
        role: 'Conseiller à la clientèle',
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
        role: 'Conseiller à la clientèle',
        about:
          'Andrew Savage se spécialise dans l\'accueil des nouveaux clients et la qualité du reporting. Énergique en réunion et méticuleux dans le suivi, il relie l\'équipe de gestion et les clients sans perdre le détail.',
        results: [
          'A accueilli 110 nouveaux clients privés au cours des deux dernières années.',
          'A reconstruit le pack de reporting trimestriel envoyé à chaque client ; la satisfaction a gagné huit points.',
          'Contact principal pour les clients dont les avoirs sont répartis entre plusieurs banques dépositaires.',
        ],
      },
      'birgit-schulz': {
        slug: 'birgit-schulz',
        role: 'Conseillère à la clientèle',
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
        role: 'Conseiller senior à la clientèle',
        about:
          'Alexander Koch conseille les clients aux situations plus complexes — plusieurs banques, des avoirs dans plus d\'un pays, ou une entreprise qui se prépare à la retraite de son propriétaire. Jeune, mais déjà un interlocuteur de confiance dans les conversations difficiles.',
        results: [
          'Traite depuis 2022 les dossiers de clientèle privée transfrontalière de la société.',
          'A conçu le processus de consolidation pour les clients détenant des avoirs auprès de plusieurs dépositaires.',
          'Coordonne le questionnaire sur les préférences de durabilité prévu par la LSFin.',
        ],
      },
      'leon-roth': {
        slug: 'leon-roth',
        role: 'Conseiller à la clientèle',
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
        role: 'Conseiller à la clientèle',
        about:
          'Henrik Meier rédige les mises à jour quotidiennes aux clients et soutient l\'équipe communication. Clair, concis et légèrement mélomane en dehors du travail — il joue de la guitare dans un groupe de bureau qui sonne mieux qu\'il n\'en a l\'air.',
        results: [
          'Produit la lettre mensuelle aux clients, lue par plus de 8 000 abonnés.',
          'A contribué à augmenter les taux d\'ouverture des e-mails de 19 % grâce à des objets et structures plus clairs.',
          'Rédacteur adjoint pour l\'ensemble des publications externes en langue allemande.',
        ],
      },
    },
  },
};
