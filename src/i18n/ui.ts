// All landing + chrome copy for both locales. French is written first and is
// the reference; `en` is typed against `fr`, so a missing or extra key is a
// compile error — the same FR/EN parity discipline as the app's messages/*.json.
// Vocabulary follows the app: « signalement », « l'équipe du sentier »,
// « réclamer un territoire ». Long-form legal text lives in its pages, not here.

const fr = {
  meta: {
    title: 'TrailSnag — Signalez un problème de sentier en 30 secondes',
    description:
      'Un arbre tombé, un sentier lessivé, une pancarte brisée ? Scannez le code QR au départ du sentier et signalez-le en moins de 30 secondes — aucun compte, aucune application, même sans réseau. Les équipes reçoivent, valident et corrigent.',
  },
  nav: {
    how: 'Comment ça marche',
    rewards: 'Récompenses',
    stewards: 'Pour les gestionnaires',
    contact: 'Contact',
    claim: 'Réclamez votre territoire',
    // The two doors into the app, short enough for the header on a phone.
    open: 'Signaler',
    desk: 'Gestionnaires',
    compare: 'Comparatif',
    pricing: 'Tarifs',
    main: 'Navigation principale',
  },
  hero: {
    kicker: 'Signalement de sentiers, sans friction',
    h1a: 'Un arbre tombé, un sentier lessivé, une pancarte brisée ?',
    h1b: 'Signalé en 30 secondes',
    lead: 'Ouvrez l’application, ou scannez le code QR au départ du sentier : décrivez le problème et l’équipe du sentier le reçoit — géolocalisé, photographié, prêt à trier. Aucun compte. Aucune application à installer. Même sans réseau.',
    ctaPrimary: 'Signaler un problème',
    ctaSecondary: 'Réclamez votre territoire',
    ctaNote: 'Aucun compte requis. Votre position trouve à qui appartient le terrain — placez-la à la main si le GPS ne répond pas. Le palier gratuit n’a pas de date de fin, quelle que soit votre organisation.',
  },
  sticker: {
    caption: 'L’autocollant au départ du sentier — c’est toute l’installation.',
    // The QR needs a printed sticker in reach; the app never does.
    orLead: 'Pas d’autocollant à portée ?',
    orCta: 'Ouvrir l’application',
  },
  how: {
    kicker: 'Côté visiteur',
    title: 'Trois gestes, pas de compte',
    steps: [
      {
        title: 'Scannez',
        body: 'Le code QR au départ du sentier ouvre le formulaire dans le navigateur. Rien à installer, rien à créer.',
      },
      {
        title: 'Décrivez',
        body: 'Une catégorie, une photo si vous voulez. La position GPS est captée toute seule.',
      },
      {
        title: 'Envoyé',
        body: 'Pas de signal en forêt ? Le signalement est gardé sur le téléphone et part tout seul au retour du réseau.',
      },
    ],
    note: 'Envie de garder vos points d’un appareil à l’autre ? Créez un compte dans l’application — facultatif, pour toujours. L’anonymat reste la voie par défaut. Et vos photos sont nettoyées de leurs métadonnées cachées (position, appareil) avant même de quitter votre téléphone.',
  },
  rewards: {
    kicker: 'La boucle des récompenses',
    title: 'Vos points deviennent des récompenses',
    lead: 'Chaque signalement confirmé et chaque correctif validé donne des points. Les équipes vérifiées les transforment en vraies récompenses — offertes par ceux qui gèrent le terrain.',
    cards: [
      {
        title: 'Cumulés sur le terrain',
        body: 'Les points viennent du vrai travail de sentier : un signalement confirmé par la communauté, un correctif validé par l’équipe. Pas de quiz, pas de tirage.',
      },
      {
        title: 'Échangés avec le gestionnaire',
        body: 'Un laissez-passer d’une journée, un rabais sur la passe de saison, le t-shirt du club : chaque équipe vérifiée publie ses propres récompenses et les honore elle-même.',
      },
      {
        title: 'Du terrain, pas d’une banque de points',
        body: 'La récompense vient du gestionnaire du territoire que vous avez aidé — le centre, le club, le propriétaire. Votre effort revient à la communauté du sentier, et elle vous le rend.',
      },
    ],
    note: 'Chaque équipe vérifiée décide de son catalogue ; les points se cumulent dès le premier signalement.',
  },
  stewards: {
    kicker: 'Côté gestionnaire',
    title: 'Votre terrain, vos signalements, vos bénévoles',
    lead: 'TrailSnag fait de chaque visiteur une paire d’yeux sur le terrain — et donne à votre équipe une file de triage pour agir.',
    cta: 'Ouvrir le tableau de bord',
    ctaNote: 'Connexion par Google, mot de passe, ou code envoyé par courriel.',
    // The four capabilities that lead with a screenshot on the home page; the
    // rest keep their compact line and carry their screen on the tour page.
    tourCta: 'Voir le tableau de bord en détail',
    moreLabel: 'Et aussi',
    // Alt text for every captured screen, beside the copy it describes and
    // inside the same FR/EN parity contract — a screenshot nobody can hear is
    // half a page.
    alts: {
      triage:
        'La file de triage : la carte du territoire avec les signalements géolocalisés, puis douze signalements avec leur état — à confirmer, confirmé, réglé, rejeté.',
      trails:
        'L’écran des sentiers : le rapport de réseau, une marche captée en attente de promotion avec ses deux tronçons, et l’état ouvert/prudence/fermé de chaque sentier.',
      'field-trace':
        'Un téléphone en train d’enregistrer une marche : 213 m captés, le tracé en orange qui suit le sentier, et l’avertissement de garder l’écran allumé.',
      stats:
        'Les statistiques du territoire : signalements au total, ouverts, validés, réglés, délai moyen, puis les exports CSV, GPX, KML et le rapport d’intervention PDF.',
      categories:
        'Le menu de signalement de l’organisme : les catégories par défaut suivies des siennes — frêne atteint par l’agrile, chicot à abattre, balise arrachée — en français et en anglais.',
      rewards:
        'Le catalogue de récompenses : laissez-passer, rabais de saison, tuque du réseau, et une demande d’échange en attente de décision.',
      integrations:
        'La section Intégrations : un point de terminaison 311 actif, les étapes qu’il reçoit, un bouton Tester, et la dernière livraison.',
      territory:
        'La fiche de territoire de l’organisme : son territoire dessiné sur la carte, avec le nom du réseau, les sports pratiqués et la superficie.',
    },
    features: [
      {
        key: 'triage',
        screens: ['triage'],
        title: 'Une file de triage, pas une boîte courriel',
        body: 'Chaque signalement arrive géolocalisé et photographié sur la carte de votre territoire. Validez, corrigez, fermez — l’historique reste, et un résumé horaire par courriel prévient chaque membre qui le veut.',
      },
      {
        key: 'trails',
        screens: ['trails', 'field-trace'],
        title: 'Vos sentiers, tracés par vous',
        body: 'Marchez un sentier, le téléphone en capte le tracé — même sans réseau. Dans le tableau de bord, faites-en le tracé officiel ou dessinez-le à la main, publiez-le sur la carte publique quand il est prêt — et un rapport vous dit ce qui manque.',
      },
      {
        key: 'categories',
        screens: ['categories'],
        title: 'Vos catégories, jusqu’à l’essence d’arbre',
        body: 'Le menu de signalement est le vôtre : ajoutez vos propres catégories — frêne atteint par l’agrile, chicot à abattre, balise arrachée — en français et en anglais. Les visiteurs signalent dans vos mots, et retirer une catégorie n’efface jamais l’historique.',
      },
      {
        key: 'proof',
        screens: ['stats'],
        title: 'La preuve que vous avez répondu',
        body: 'La carte publique montre ce qui est signalé et ce qui est réglé. Exportez le registre en CSV, GPX ou KML pour vos demandes de subvention — et produisez un rapport d’intervention PDF, problème par problème.',
      },
      {
        key: 'rewards',
        screens: ['rewards'],
        title: 'Des bénévoles récompensés',
        body: 'Les correctifs validés donnent des points à vos bénévoles — et votre équipe décide de ce qu’ils valent : un accès gratuit, un rabais, un morceau à vos couleurs. Vous fixez le catalogue, TrailSnag tient le registre.',
      },
      {
        // No screen: the desk prints the org's own origin into every sticker
        // card, so a captured one would publish the capture machine's address.
        // The hero's QrSticker already shows a real sticker, correctly addressed.
        key: 'stickers',
        screens: [],
        title: 'Des autocollants QR, un par départ de sentier',
        body: 'Imprimez-les vous-même depuis le tableau de bord : un fichier prêt à imprimer, dimensionné pour le vinyle autocollant, un code par départ de sentier — c’est toute l’installation. Pas de borne, pas de matériel, pas de formation des visiteurs.',
      },
      {
        key: 'integrations',
        screens: ['integrations'],
        title: 'Se branche à vos outils existants',
        body: 'Chaque étape du cycle de vie d’un signalement peut alimenter votre 311 ou votre système de bons de travail — un flux signé, testable en un clic, plus l’import CSV avec les mêmes noms de champs.',
      },
      {
        // No screenshot yet — the capture run has not been re-driven since this
        // shipped. The row stands on its words until it has one; what it must
        // never do is carry a « coming soon » badge, because the capability IS
        // deployed (0024, and three browser.trail-status specs).
        key: 'status',
        screens: [],
        title: 'L’état de vos sentiers, affiché partout',
        body: 'Déclarez chaque sentier ouvert, en prudence ou fermé : la carte publique colore le tracé, et une carte intégrable en une ligne montre le tout sur votre propre site web.',
      },
    ],
  },
  stewardPage: {
    metaTitle: 'TrailSnag pour les gestionnaires — le tableau de bord, écran par écran',
    metaDescription:
      'Ce que fait un gestionnaire de sentiers avec TrailSnag : trier les signalements sur la carte, tracer et publier ses sentiers, prouver ses interventions, récompenser ses bénévoles. Captures du vrai tableau de bord.',
    kicker: 'Le tableau de bord',
    title: 'Ce qu’un gestionnaire fait, écran par écran',
    lead: 'Voici le vrai tableau de bord, pas une maquette : chaque image ci-dessous est une capture du produit en marche, sur le territoire de démonstration d’un organisme fictif.',
    ctaPrimary: 'Réclamez votre territoire',
    ctaSecondary: 'Ouvrir le tableau de bord',
    landTitle: 'Votre territoire, à vous de le dire',
    landBody:
      'Réclamez votre terrain en le dessinant sur la carte : le tableau de bord ne s’ouvre que sur le territoire que vous gérez, et les signalements qui y tombent vous arrivent à vous.',
    closeTitle: 'Ce que ça prend pour commencer',
    closeBody:
      'Réclamez votre territoire, imprimez un autocollant par départ de sentier, et chaque visiteur devient une paire d’yeux pour votre équipe. Travaillez dès aujourd’hui, la vérification vient ensuite.',
  },
  audiences: {
    kicker: 'Pour qui',
    title: 'Des clubs de bénévoles aux municipalités',
    cards: [
      {
        title: 'Clubs et comités de bénévoles',
        badge: 'Gratuit, pour toujours',
        body: 'Vos sentiers, votre file de signalements, vos bénévoles reconnus. Le palier gratuit ne coûte rien, n’a pas de date de fin, et ne demande aucune entrevue.',
      },
      {
        title: 'Propriétaires de terres et de boisés',
        badge: 'Votre carnet de terrain',
        body: 'Votre terrain, votre registre, vos mots : tracez vos propres sentiers, marquez le frêne atteint par l’agrile, le chicot à abattre, la clôture à réparer. Vous êtes votre propre équipe — et rien ne se perd, même sans réseau.',
      },
      {
        title: 'Centres de plein air, zecs et parcs régionaux',
        badge: 'Le palier Parc',
        body: 'Un canal qui reçoit les signalements de vos visiteurs et documente votre diligence, saison après saison. Une zec, un parc régional et un centre de plein air paient le même tarif : il suit votre forme juridique, pas votre superficie.',
      },
      {
        title: 'Municipalités et MRC',
        badge: 'Le 311 des sentiers',
        body: 'Vos sentiers sont l’angle mort du 311. TrailSnag route les signalements vers l’équipe responsable du terrain — pas vers une file générique.',
      },
    ],
  },
  // The comparison page. Every cell here was read on a competitor's own public
  // pages — nothing is inferred from a
  // category. Three rules hold this copy together, and breaking one is how a
  // comparison page becomes a liability:
  //
  //   1. Say « ils exigent une application », NEVER « ils exigent un compte ».
  //      TrailsIQ's own page reads "No account, no sign-up. Anonymous by
  //      default." The account claim is false and a prospect disproves it in
  //      thirty seconds; the install claim is their own step 1.
  //   2. Every player carries a `better` line. A comparison that names no
  //      strength next door is an ad, and reads like one.
  //   3. Say « les données sont hébergées au Canada », never « tout reste au
  //      Canada » — Resend is a US processor — and the Loi 25 posture is
  //      « travaux en cours », never « conforme ».
  //
  // A company being Québécois is NOT data residency: several players here are
  // local companies that publish nothing about where the rows live, and the
  // copy says exactly that rather than crediting them with a claim they never
  // made.
  // §4 of the business plan is the source for every claim in this block, and
  // three of them are load-bearing. Halte is free FOREVER with no eligibility
  // interview and no annual review — the contrast with Trail Sentinel's
  // annually-reassessed community tier is the sale, so it is said out loud
  // rather than implied. The two closing sentences are the ones §4 puts in a
  // footer rather than a box: « hébergées au Canada » and never « tout reste
  // au Canada », because the email processor is American and the privacy
  // policy says so. And the cadastre is deliberately ABSENT from the grid —
  // the lot data is not loaded, so selling it would be selling an empty
  // picker.
  pricing: {
    title: 'Tarifs',
    lede: 'Un prix par organisation, taxes en sus. Deux tarifs publiés\u00a0: organismes et entreprises.',
    monthlySuffix: '/ mois',
    yearlyNote: 'ou {price} par année — deux mois offerts',
    yearlyCta: 'Payer {price} par année',
    taxes: 'Taxes en sus. Facturé par organisation, jamais à l\u2019utilisateur. Facture annuelle possible au même montant.',
    canada: 'Données hébergées au Canada. Nos courriels passent par un fournisseur américain.',
    territoire: 'Plus de dix territoires, ou une entente de service\u00a0? Parlons-en.',
    free: 'Gratuit sur tous les paliers\u00a0: le signalement sans compte ni application, les codes QR, la carte publique intégrable, le tracé de sentiers, les repères, les récompenses et vos exports CSV, GPX et KML — en tout temps, même si vous cessez de payer.',

    rate: {
      legend: 'Votre tarif',
      nonprofit: 'OBNL et organismes publics',
      commercial: 'Entreprise',
      test: 'OBNL, municipalité, MRC ou zec\u00a0: votre NEQ au paiement suffit. Aucune entrevue, aucune révision annuelle.',
    },

    anchorBadge: 'Le palier de référence',

    tiers: {
      halte: {
        name: 'Halte',
        who: 'Clubs de bénévoles, comités de sentiers, propriétaires de boisés',
        cta: 'Commencer — gratuit',
      },
      parc: {
        name: 'Parc',
        who: 'Zecs, centres de plein air, parcs régionaux, municipalités',
        cta: 'Choisir Parc',
      },
      reseau: {
        name: 'Réseau',
        who: 'MRC, regroupements régionaux de zecs, réseaux à plusieurs territoires',
        cta: 'Choisir Réseau',
      },
    },

    freeForever: 'Gratuit pour toujours, sans date de fin.',

    labels: {
      included: 'Compris',
      adds: 'En plus',
      territories: 'Territoires vérifiés inclus',
      support: 'Soutien',
    },

    rows: {
      base: 'Tout le produit',
      exports: 'Exports CSV, GPX et KML',
      inherits: 'Tout ce qu\u2019il y a dans Parc',
      resolution: 'Rapport d\u2019intervention PDF',
      network: 'Rapport de réseau',
      webhooks: 'Flux sortants signés vers vos systèmes',
    },

    support: {
      halte: 'Courriel',
      parc: 'Courriel, 3 jours ouvrables',
      reseau: 'Personne-ressource attitrée, 2 jours ouvrables',
    },
  },
  comparison: {
    metaTitle: 'TrailSnag comparé — ce qui existe pour la gestion de sentiers',
    metaDescription:
      'Un comparatif honnête des outils de sentiers offerts ici et ailleurs : TrailsIQ, Trail Sentinel, Vélo Québec, OuterSpatial, Ondago, Geotrek. Ce pour quoi chacun est le bon choix, et le seul mécanisme que nous n’avons trouvé nulle part ailleurs.',
    kicker: 'Le comparatif',
    title: 'Ce qui existe, et où nous nous distinguons',
    lead: 'Vous magasinez un outil de sentiers. Voici le terrain tel que nous l’avons lu — sources publiques, et pour chaque joueur ce qui nous sépare de lui. Quand un autre produit répond mieux à votre besoin, la carte le dit aussi : un comparatif qui gagne sur tous les axes n’informe personne.',
    readingNote: 'Lu sur les pages publiques de chaque fournisseur. Les fonctions et les prix changent. Nous ne publions pas les prix des autres — ils se démodent en silence, et c’est chez eux qu’il faut les lire.',
    fieldTitle: 'Le terrain, joueur par joueur',
    fieldLead: 'Six produits, classés par ce qu’ils ont en commun avec nous. Chaque carte dit d’abord ce qui nous sépare — puis, en une ligne, le besoin pour lequel il faut aller les voir plutôt que nous.',
    labels: {
      visitor: 'Comment le visiteur signale',
      data: 'Où sont les données',
      pricing: 'Modèle de prix',
      versus: 'Ce qui nous sépare',
      need: 'Ce pour quoi ils sont le bon choix',
    },
    players: [
      {
        key: 'trailsiq',
        name: 'TrailsIQ',
        origin: 'États-Unis',
        what: 'Plateforme de signalement de sentiers avec un palier gratuit. De tout le relevé, c’est celle dont la promesse ressemble le plus à la nôtre.',
        visitor: 'Leur application, téléchargée. Leur propre page de signalement fait de « ouvrir l’application » l’étape 1, avec l’App Store et Google Play comme seules portes — aucune option navigateur.',
        data: 'Aucune mention de résidence des données sur leur site.',
        pricing: 'Paliers publiés, dont un palier gratuit. Leur page n’indique aucune devise.',
        versus: 'Le signalement se fait dans le navigateur, depuis la pancarte. Personne qui a une barre de signal devant un arbre tombé ne télécharge une application — et nos données sont hébergées au Canada, ce que leur site ne dit nulle part.',
        need: 'Un palier gratuit qui en est vraiment un, et l’anonymat par défaut — sur cette moitié-là, ils sont aussi clairs que nous.',
      },
      {
        key: 'sentinel',
        name: 'Trail Sentinel',
        origin: 'Québec',
        what: 'Logiciel d’entretien de sentiers : tâches assignées, inventaire et inspection des ouvrages, rapports. Mobile et web.',
        visitor: 'Côté équipe. Le signalement vient de vos membres et de vos bénévoles, avec un compte ; nous n’avons trouvé aucune porte pour le visiteur de passage.',
        data: 'Entreprise d’ici, mais l’hébergement des données n’est indiqué nulle part sur leur site. Ce n’est pas la même chose.',
        pricing: 'Paliers publiés, plus un palier communautaire gratuit pour les clubs de bénévoles.',
        versus: 'Nos signalements viennent de vos visiteurs, pas seulement de votre équipe : chaque personne qui marche votre réseau devient une paire d’yeux, sans compte et sans application à installer.',
        need: 'Inspecter des ouvrages, assigner des travaux, compter des heures. C’est leur métier ; nous alimentons plutôt le système que vous avez déjà.',
      },
      {
        key: 'velo',
        name: 'Vélo Québec',
        origin: 'Québec',
        what: 'Une association, pas un logiciel. L’adhésion annuelle donne accès à VQ Gestionnaires — un outil bâti avec Mapgears — à une assurance, et à des rabais sur des logiciels tiers du domaine.',
        visitor: 'Aucune porte visiteur. VQ Gestionnaires sert le gestionnaire — inspections, accidents, assignation de travaux — et occupe l’autre bout de la chaîne que notre porte d’entrée.',
        data: 'Non indiquée.',
        pricing: 'Adhésion annuelle en dollars canadiens, à deux paliers selon que l’organisme est un OBNL ou non.',
        versus: 'Nous ouvrons la porte qu’ils n’ont pas : celle du visiteur. VQ Gestionnaires sert votre équipe ; TrailSnag sert les gens qui marchent votre réseau et vous envoie ce qu’ils voient.',
        need: 'Une assurance et un réseau d’adhérents. L’adhésion vaut ce qu’elle coûte — et elle se cumule avec nous.',
      },
      {
        key: 'outerspatial',
        name: 'OuterSpatial',
        origin: 'États-Unis',
        what: 'Plateforme de gestion de terres publiques et de communautés de plein air, adossée aux agences américaines.',
        visitor: 'Leur application, téléchargée.',
        data: 'États-Unis.',
        pricing: 'Non publié : ni montant ni page de prix sur leur site.',
        versus: 'Les données sont hébergées au Canada, l’interface est en français, et le prix est d’ici. Pour un organisme public soumis à la Loi 25, ça peut clore la question avant même la comparaison de fonctions.',
        need: 'Gérer des terres publiques américaines : leur écosystème est plus large que le nôtre, et leurs références plus lourdes.',
      },
      {
        key: 'ondago',
        name: 'Ondago',
        origin: 'Québec',
        what: 'Application mobile de cartographie de plein air, gratuite pour les organismes qui y publient leurs cartes officielles.',
        visitor: 'Le sens inverse du nôtre : le gestionnaire diffuse ses cartes, l’état de ses sentiers et des notifications vers le visiteur. Nous n’avons trouvé aucune porte pour que le visiteur, lui, signale un problème.',
        data: 'Entreprise d’ici ; l’hébergement des données n’est pas indiqué.',
        pricing: 'Non publié.',
        versus: 'Le sens du trafic est inverse : chez eux le gestionnaire diffuse, chez nous le visiteur signale et vous recevez. Ils montrent le chemin ; nous vous disons ce qui bloque dessus.',
        need: 'Publier une carte que vos visiteurs consultent pour se repérer. Sur ce terrain-là, ils ont déjà l’audience.',
      },
      {
        key: 'geotrek',
        name: 'Geotrek',
        origin: 'Libre, France',
        what: 'Suite libre sous licence BSD que vous hébergez vous-même : un site public de randonnée et une console de gestion.',
        visitor: 'Un formulaire de signalement dans le navigateur, sur la fiche du sentier, qui remonte dans la console. Rien à installer — c’est le seul du relevé qui rejoint le nôtre sur ce point, et il faut le dire.',
        data: 'Là où vous l’installez. C’est votre serveur, et votre responsabilité.',
        pricing: 'Gratuit et modifiable ; le coût réel est celui de l’héberger et de l’entretenir.',
        versus: 'Rien à héberger, rien à mettre à jour, et une carte publique qui refuse d’elle-même un tronçon sortant du terrain que vous détenez. Vous ouvrez le tableau de bord, c’est tout.',
        need: 'Vouloir le code entre vos mains, avec l’équipe technique pour l’héberger. Personne ne peut vous le retirer.',
      },
    ],
    ours: {
      kicker: 'Ce que nous n’avons trouvé nulle part ailleurs',
      title: 'Un sentier n’atteint la carte publique que là où quelqu’un répond du terrain — et c’est la géométrie qui en décide, jamais une case à cocher',
      lead: 'Chez tous les autres, le chemin est le même : l’organisation achète, son réseau obtient un formulaire. Chez nous, c’est le point GPS qui décide à qui va le signalement, et c’est la géométrie du territoire vérifié — pas une case à cocher — qui autorise la publication.',
      proofTitle: 'Ce que ça donne un mardi matin',
      proofBody: 'Un réseau de sept kilomètres dont un demi-kilomètre sort du terrain que l’organisme détient. La plateforme refuse de publier — pas seulement ce demi-kilomètre, mais le tronçon complet qui le contient — plutôt que de tracer un sentier public sur un terrain dont personne ne répond. Le régler demande une décision foncière : obtenir le terrain voisin, ou découper à la ligne de propriété. Aucun autre produit de ce relevé ne l’aurait signalé.',
      points: [
        {
          title: 'Publier exige un répondant, prouvé géométriquement',
          body: 'Une épingle et un tronçon n’atteignent la carte publique que là où un territoire vérifié les couvre. Corrigez une limite vers l’intérieur et ce qui repose sur le terrain que vous ne détenez plus s’éteint tout seul, sans aucun geste. Ce n’est pas une fonctionnalité : c’est une posture de responsabilité.',
        },
        {
          title: 'Les données sont hébergées au Canada',
          body: 'La base de données est dans Supabase à Montréal (ca-central-1), l’API tourne sur Fly à Toronto. Ce que nous ne dirons pas : que tout reste au Canada. Nos courriels transitent par un fournisseur américain, et notre posture Loi 25 est un travail en cours — pas une conformité déclarée. Vous pourrez vérifier les deux moitiés.',
        },
        {
          title: 'Le visiteur n’installe rien',
          body: 'Une pancarte, un appareil photo, un navigateur. La friction, ce n’est pas le compte — c’est le téléchargement : personne devant un arbre tombé, avec une barre de signal, n’installe une application. C’est le seul de nos arguments qui se prouve dans la pièce, avec votre téléphone, en trente secondes.',
        },
      ],
    },
    notUs: {
      title: 'Ce que nous ne faisons pas',
      lead: 'Trois choses que des produits de cette page font mieux, et que nous ne construirons pas. Le savoir avant de signer vaut mieux que de le découvrir après.',
      cards: [
        {
          title: 'L’assignation de bons de travail',
          body: 'Nous n’assignons pas de tâches à une équipe et nous ne comptons pas d’heures. Chaque étape du cycle de vie d’un signalement part plutôt vers le 311 ou le système de bons de travail que vous avez déjà, par un flux signé.',
        },
        {
          title: 'L’inspection d’ouvrages en profondeur',
          body: 'Inventaire des ponceaux et des passerelles, formulaires d’inspection, entretien préventif, dossiers de conformité : c’est le métier de Trail Sentinel, ils le publient, et il faudrait un an pour les rejoindre.',
        },
        {
          title: 'La cartographie grand public',
          body: 'Nous ne sommes pas une application de découverte de sentiers. Notre carte publique montre ce qui est signalé et ce qui est réglé sur les territoires dont quelqu’un répond — pas un catalogue de randonnées à faire.',
        },
      ],
    },
    correctionTitle: 'Nous avons mal lu votre produit ?',
    correctionBody: 'Cette page est une lecture de pages publiques à une date donnée, faite par nous, sur nos concurrents. Elle peut vieillir et elle peut se tromper. Si une ligne est inexacte, écrivez-nous : nous corrigerons et nous laisserons la date en évidence.',
    landingLead: 'Vous comparez plusieurs outils ?',
    landingCta: 'Voyez ce qui existe, et où nous nous distinguons',
  },
  ctaBand: {
    title: 'Prêt à garder vos sentiers ouverts ?',
    body: 'Réclamez votre territoire et chaque visiteur devient une paire d’yeux pour votre équipe — travaillez dès aujourd’hui, la vérification vient ensuite.',
    cta: 'Réclamez votre territoire',
    reportLead: 'Simple visiteur ?',
    reportCta: 'Signalez un problème maintenant',
    mailLead: 'ou écrivez-nous :',
  },
  footer: {
    tagline: 'Pour ceux qui gardent leurs sentiers ouverts.',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    contact: 'Contact',
  },
  langSwitch: { label: 'English', short: 'EN' },
  notFound: {
    title: 'Hors sentier',
    body: 'Cette page n’existe pas — ou plus. Revenez au départ du sentier.',
    back: 'Retour à l’accueil',
  },
} as const;

type Dict = {
  [K in keyof typeof fr]: DeepString<(typeof fr)[K]>;
};

type DeepString<T> = T extends string
  ? string
  : T extends boolean
    ? boolean
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepString<U>>
      : { [K in keyof T]: DeepString<T[K]> };

const en: Dict = {
  meta: {
    title: 'TrailSnag — Report a trail problem in 30 seconds',
    description:
      'A downed tree, a washed-out trail, a broken sign? Scan the QR code at the trailhead and report it in under 30 seconds — no account, no app, even with no signal. Trail crews receive, validate, and fix.',
  },
  nav: {
    how: 'How it works',
    rewards: 'Rewards',
    stewards: 'For stewards',
    contact: 'Contact',
    claim: 'Claim your land',
    open: 'Report',
    desk: 'Stewards',
    compare: 'Comparison',
    pricing: 'Pricing',
    main: 'Main navigation',
  },
  hero: {
    kicker: 'Trail reporting, without the friction',
    h1a: 'A downed tree, a washed-out trail, a broken sign?',
    h1b: 'Reported in 30 seconds',
    lead: 'Open the app, or scan the QR code at the trailhead: describe the problem and the trail crew has it — geolocated, photographed, ready to triage. No account. No app to install. Even with no signal.',
    ctaPrimary: 'Report an issue',
    ctaSecondary: 'Claim your land',
    ctaNote: 'No account needed. Your position finds whose land you are on — place it by hand if GPS will not answer. The free tier has no end date, whatever your organisation is.',
  },
  sticker: {
    caption: 'The sticker at the trailhead — that is the whole install.',
    orLead: 'No sticker in reach?',
    orCta: 'Open the app',
  },
  how: {
    kicker: 'For visitors',
    title: 'Three moves, no account',
    steps: [
      {
        title: 'Scan',
        body: 'The QR code at the trailhead opens the form in the browser. Nothing to install, nothing to sign up for.',
      },
      {
        title: 'Describe',
        body: 'A category, a photo if you want one. The GPS position is captured on its own.',
      },
      {
        title: 'Sent',
        body: 'No signal in the woods? The report is kept on the phone and sends itself when the network comes back.',
      },
    ],
    note: 'Want your points to follow you across devices? Create an account in the app — optional, forever. Anonymous stays the default. And your photos are scrubbed of their hidden metadata (position, device) before they even leave your phone.',
  },
  rewards: {
    kicker: 'The reward loop',
    title: 'Your points become rewards',
    lead: 'Every confirmed report and every validated fix earns points. Verified stewards turn them into real rewards — funded by the people who run the land.',
    cards: [
      {
        title: 'Earned on the trail',
        body: 'Points come from real trail work: a report confirmed by the community, a fix validated by the crew. No quizzes, no draws.',
      },
      {
        title: 'Redeemed with the land owner',
        body: 'A free day pass, a season-pass discount, the club t-shirt: each verified steward publishes its own rewards and honours them itself.',
      },
      {
        title: 'From the land, not a points bank',
        body: 'The reward comes from the steward of the territory you helped — the centre, the club, the landowner. Your effort goes back to the trail’s community, and it gives back.',
      },
    ],
    note: 'Each verified steward decides its own catalog; the points add up from the first report.',
  },
  stewards: {
    kicker: 'For stewards',
    title: 'Your land, your snags, your volunteers',
    lead: 'TrailSnag turns every visitor into a pair of eyes on the ground — and gives your crew a triage queue to act.',
    cta: 'Open the steward desk',
    ctaNote: 'Sign in with Google, a password, or a code sent to your email.',
    tourCta: 'See the steward desk in detail',
    moreLabel: 'And also',
    alts: {
      triage:
        'The triage queue: the territory map with geolocated reports, then twelve reports with their state — to confirm, confirmed, fixed, rejected.',
      trails:
        'The trails screen: the network report, a captured walk waiting to be promoted with its two stretches, and each trail’s open/caution/closed status.',
      'field-trace':
        'A phone recording a walk: 213 m captured, the orange line following the trail, and the warning to keep the screen on.',
      stats:
        'Territory stats: total reports, open, validated, fixed, average time to fix, then the CSV, GPX, KML exports and the intervention-report PDF.',
      categories:
        'The org’s report menu: the default categories followed by its own — ash hit by the emerald borer, dead snag to fell, torn-off blaze — in French and English.',
      rewards:
        'The reward catalog: day pass, season discount, network toque, and one redemption request awaiting a decision.',
      integrations:
        'The Integrations section: an active 311 endpoint, the lifecycle steps it receives, a Test button, and the last delivery.',
      territory:
        'The org’s land record: its territory drawn on the map, with the network name, the sports practised and the area.',
    },
    features: [
      {
        key: 'triage',
        screens: ['triage'],
        title: 'A triage queue, not an inbox',
        body: 'Every report lands geolocated and photographed on your territory’s map. Validate, fix, close — the history stays, and an hourly email digest keeps every member who wants it in the loop.',
      },
      {
        key: 'trails',
        screens: ['trails', 'field-trace'],
        title: 'Your trails, traced by you',
        body: 'Walk a trail and the phone captures the line — even with no signal. At the steward desk, make it the official route or draw it by hand, publish it to the public map when it is ready — and a report tells you what is missing.',
      },
      {
        key: 'categories',
        screens: ['categories'],
        title: 'Your categories, down to the tree species',
        body: 'The report menu is yours: add your own categories — an ash hit by the emerald borer, a dead snag to fell, a torn-off blaze — in French and English. Visitors report in your words, and retiring a category never erases the history.',
      },
      {
        key: 'proof',
        screens: ['stats'],
        title: 'Proof you responded',
        body: 'The public map shows what’s reported and what’s resolved. Export the log as CSV, GPX or KML for your grant files — and produce an intervention-report PDF, problem by problem.',
      },
      {
        key: 'rewards',
        screens: ['rewards'],
        title: 'Volunteers, rewarded',
        body: 'Validated fixes earn your volunteers points — and your crew decides what they’re worth: a free pass, a discount, gear in your colours. You set the catalog, TrailSnag keeps the ledger.',
      },
      {
        key: 'stickers',
        screens: [],
        title: 'QR stickers, one per trailhead',
        body: 'Print them yourself from the steward desk: a print-ready file sized for adhesive vinyl, one code per trailhead — that is the whole install. No kiosk, no hardware, no visitor training.',
      },
      {
        key: 'integrations',
        screens: ['integrations'],
        title: 'Feeds the tools you already run',
        body: 'Every step of a report’s lifecycle can feed your 311 or work-order system — a signed feed you can test in one click, plus CSV import with the same field names.',
      },
      {
        key: 'status',
        screens: [],
        title: 'Your trails’ status, shown everywhere',
        body: 'Declare each trail open, caution or closed: the public map colors the line, and a one-line embeddable map shows it all on your own website.',
      },
    ],
  },
  stewardPage: {
    metaTitle: 'TrailSnag for stewards — the desk, screen by screen',
    metaDescription:
      'What a trail steward does with TrailSnag: triage reports on the map, trace and publish trails, prove the work was done, reward volunteers. Screenshots of the real steward desk.',
    kicker: 'The steward desk',
    title: 'What a steward does, screen by screen',
    lead: 'This is the real desk, not a mockup: every image below is a screenshot of the running product, on the demonstration territory of a fictional organisation.',
    ctaPrimary: 'Claim your land',
    ctaSecondary: 'Open the steward desk',
    landTitle: 'Your territory, on your word',
    landBody:
      'Claim your land by drawing it on the map: the desk opens only on the territory you steward, and the reports that land inside it come to you.',
    closeTitle: 'What it takes to start',
    closeBody:
      'Claim your land, print one sticker per trailhead, and every visitor becomes a pair of eyes for your crew. Work from today, verification comes after.',
  },
  audiences: {
    kicker: 'Who it serves',
    title: 'From volunteer clubs to municipalities',
    cards: [
      {
        title: 'Volunteer clubs and committees',
        badge: 'Free, forever',
        body: 'Your trails, your report queue, your volunteers credited. The free tier costs nothing, has no end date, and asks for no interview.',
      },
      {
        title: 'Private landowners',
        badge: 'Your land log',
        body: 'Your land, your log, your words: trace your own trails, mark the ash hit by the borer, the dead snag to fell, the fence to mend. You are your own crew — and nothing gets lost, even offline.',
      },
      {
        title: 'Outdoor centres, ZECs and regional parks',
        badge: 'The Parc tier',
        body: 'A channel that takes your visitors’ reports and documents your diligence, season after season. A zec, a regional park and an outdoor centre pay the same rate: it follows your legal form, not your area.',
      },
      {
        title: 'Municipalities and RCMs',
        badge: 'The trails 311',
        body: 'Trails are the blind spot of 311. TrailSnag routes reports to the crew responsible for the land — not to a generic queue.',
      },
    ],
  },
  pricing: {
    title: 'Pricing',
    lede: 'One price per organisation, taxes extra. Two published rates: non-profits and businesses.',
    monthlySuffix: '/ month',
    yearlyNote: 'or {price} a year — two months free',
    yearlyCta: 'Pay {price} a year',
    taxes: 'Taxes extra. Billed per organisation, never per user. An annual invoice is available at the same amount.',
    canada: 'Data hosted in Canada. Our emails go through an American provider.',
    territoire: 'More than ten territories, or a service agreement? Let us talk.',
    free: 'Free on every tier: reporting with no account and no app, QR codes, the embeddable public map, trail tracing, markers, rewards and your CSV, GPX and KML exports — any time, even if you stop paying.',

    rate: {
      legend: 'Your rate',
      nonprofit: 'Non-profits and public bodies',
      commercial: 'Business',
      test: 'Non-profit, municipality, RCM or zec: your NEQ at checkout is the whole test. No interview, no annual review.',
    },

    anchorBadge: 'Our reference tier',

    tiers: {
      halte: {
        name: 'Halte',
        who: 'Volunteer clubs, trail committees, woodlot owners',
        cta: 'Start — free',
      },
      parc: {
        name: 'Parc',
        who: 'ZECs, outdoor centres, regional parks, municipalities',
        cta: 'Choose Parc',
      },
      reseau: {
        name: 'Réseau',
        who: 'RCMs, regional zec groupings, networks with several territories',
        cta: 'Choose Réseau',
      },
    },

    freeForever: 'Free forever, with no end date.',

    labels: {
      included: 'Included',
      adds: 'Adds',
      territories: 'Verified territories included',
      support: 'Support',
    },

    rows: {
      base: 'The whole product',
      exports: 'CSV, GPX and KML exports',
      inherits: 'Everything in Parc',
      resolution: 'Intervention report PDF',
      network: 'Network report',
      webhooks: 'Signed outbound feeds to your systems',
    },

    support: {
      halte: 'Email',
      parc: 'Email, 3 business days',
      reseau: 'Named contact, 2 business days',
    },
  },
  comparison: {
    metaTitle: 'TrailSnag compared — what else exists for trail operations',
    metaDescription:
      'An honest comparison of the trail tools available here and elsewhere: TrailsIQ, Trail Sentinel, Vélo Québec, OuterSpatial, Ondago, Geotrek. What each one is the right choice for, and the one mechanism we found nowhere else.',
    kicker: 'The comparison',
    title: 'What exists, and where we differ',
    lead: 'You are shopping for a trail tool. Here is the field as we read it — public sources, and for each player what separates us from it. Where another product answers your need better, the card says so too: a comparison that wins on every axis informs nobody.',
    readingNote: 'Read from each vendor’s own public pages. Features and prices change. We do not publish other people’s prices — they go stale quietly, and their own site is where you should read them.',
    fieldTitle: 'The field, player by player',
    fieldLead: 'Six products, ordered by how much they overlap with us. Every card leads with what separates us — then, in one line, the need for which you should go to them rather than to us.',
    labels: {
      visitor: 'How a visitor reports',
      data: 'Where the data lives',
      pricing: 'Pricing model',
      versus: 'Where we differ',
      need: 'Where they are the right choice',
    },
    players: [
      {
        key: 'trailsiq',
        name: 'TrailsIQ',
        origin: 'United States',
        what: 'A trail reporting platform with a free tier. Of everything in this survey, its promise is the closest to ours.',
        visitor: 'Their app, downloaded. Their own reporting page makes “open the app” step 1, with the App Store and Google Play as the only doors — no browser option.',
        data: 'No mention of data residency anywhere on their site.',
        pricing: 'Published tiers, including a free one. Their page states no currency.',
        versus: 'Reporting happens in the browser, from the sign. Nobody standing in front of a fallen tree with one bar of signal downloads an app — and our data is hosted in Canada, which their site states nowhere.',
        need: 'A free tier that really is one, and anonymity by default — on that half they are as clear as we are.',
      },
      {
        key: 'sentinel',
        name: 'Trail Sentinel',
        origin: 'Québec',
        what: 'Trail maintenance software: assigned tasks, structure inventory and inspection, reports. Mobile and web.',
        visitor: 'Crew-side. Reports come from your members and volunteers, with an account; we found no door for the visitor passing through.',
        data: 'A local company, but data hosting is stated nowhere on their site. Those are not the same thing.',
        pricing: 'Published tiers, plus a free community tier for volunteer clubs.',
        versus: 'Our reports come from your visitors, not only your crew: everyone walking your network becomes a pair of eyes, with no account and no app to install.',
        need: 'Inspecting structures, assigning work, counting hours. That is their trade; we feed the system you already run instead.',
      },
      {
        key: 'velo',
        name: 'Vélo Québec',
        origin: 'Québec',
        what: 'An association, not a piece of software. Annual membership opens access to VQ Gestionnaires — a tool built with Mapgears — to insurance, and to discounts on third-party software in the field.',
        visitor: 'No visitor door. VQ Gestionnaires serves the manager — inspections, incidents, work assignment — and occupies the other end of the chain from our front door.',
        data: 'Not stated.',
        pricing: 'Annual membership in Canadian dollars, at two tiers depending on whether the organisation is a non-profit.',
        versus: 'We open the door they do not have: the visitor’s. VQ Gestionnaires serves your crew; TrailSnag serves the people walking your network and sends you what they see.',
        need: 'Insurance and a network of managers. The membership is worth what it costs — and it stacks with us.',
      },
      {
        key: 'outerspatial',
        name: 'OuterSpatial',
        origin: 'United States',
        what: 'A public-lands and outdoor-community management platform, backed by US agencies.',
        visitor: 'Their app, downloaded.',
        data: 'United States.',
        pricing: 'Not published: no amount and no pricing page on their site.',
        versus: 'The data is hosted in Canada, the interface is in French, and the price is local. For a public body under Law 25 that can settle the question before the feature comparison even starts.',
        need: 'Managing US public lands: their ecosystem is broader than ours, and their references heavier.',
      },
      {
        key: 'ondago',
        name: 'Ondago',
        origin: 'Québec',
        what: 'A mobile outdoor mapping app, free for organisations that publish their official maps in it.',
        visitor: 'The opposite direction from ours: the manager pushes maps, trail conditions and notifications out to the visitor. We found no door for the visitor to report a problem back.',
        data: 'A local company; data hosting is not stated.',
        pricing: 'Not published.',
        versus: 'The traffic runs the other way: there the manager broadcasts, here the visitor reports and you receive. They show the way; we tell you what is blocking it.',
        need: 'Publishing a map your visitors consult to find their way. On that ground they already have the audience.',
      },
      {
        key: 'geotrek',
        name: 'Geotrek',
        origin: 'Open source, France',
        what: 'A BSD-licensed open-source suite you host yourself: a public hiking site and a management console.',
        visitor: 'A report form in the browser, on the trail’s own page, landing in the console. Nothing to install — it is the only one in this survey that meets ours on that point, and that deserves saying.',
        data: 'Wherever you install it. It is your server, and your responsibility.',
        pricing: 'Free and modifiable; the real cost is hosting and maintaining it.',
        versus: 'Nothing to host, nothing to update, and a public map that refuses on its own any stretch leaving the ground you hold. You open the desk, that is all.',
        need: 'Wanting the code in your hands, with the technical crew to host it. Nobody can take it back.',
      },
    ],
    ours: {
      kicker: 'What we found nowhere else',
      title: 'A trail reaches the public map only where somebody answers for the ground — and geometry decides that, never a checkbox',
      lead: 'Everywhere else the path is the same: the organisation buys, its network gets a form. Here the GPS point decides who receives the report, and it is the geometry of verified land — not a checkbox — that authorises publishing.',
      proofTitle: 'What that looks like on a Tuesday morning',
      proofBody: 'A seven-kilometre network with half a kilometre leaving the ground the organisation holds. The platform refuses to publish — not just that half-kilometre, but the whole stretch containing it — rather than draw a public trail across land nobody answers for. Fixing it takes a land decision: get the neighbouring ground, or cut at the property line. Nothing else in this survey would have raised it.',
      points: [
        {
          title: 'Publishing needs someone answerable, proven geometrically',
          body: 'A pin and a stretch reach the public map only where verified land covers them. Correct a boundary inward and whatever sits on ground you no longer hold goes dark on its own, with no action taken on it. That is not a feature: it is a posture about responsibility.',
        },
        {
          title: 'The data is hosted in Canada',
          body: 'The database sits in Supabase in Montréal (ca-central-1), the API runs on Fly in Toronto. What we will not say is that everything stays in Canada. Our email goes through a US processor, and our Law 25 posture is work in progress — not declared compliance. You can check both halves.',
        },
        {
          title: 'The visitor installs nothing',
          body: 'A sign, a camera, a browser. The friction is not the account — it is the download: nobody standing in front of a fallen tree with one bar of signal installs an app. It is the only one of our arguments that proves itself in the room, on your phone, in thirty seconds.',
        },
      ],
    },
    notUs: {
      title: 'What we do not do',
      lead: 'Three things products on this page do better, and that we will not build. Knowing it before you sign beats discovering it after.',
      cards: [
        {
          title: 'Work-order assignment',
          body: 'We do not assign tasks to a crew and we do not count hours. Every step of a report’s lifecycle goes out instead to the 311 or work-order system you already run, over a signed feed.',
        },
        {
          title: 'Deep structure inspection',
          body: 'Culvert and boardwalk inventories, inspection forms, preventive maintenance, compliance files: that is Trail Sentinel’s trade, they publish it, and it would take a year to catch up.',
        },
        {
          title: 'Consumer mapping',
          body: 'We are not a trail-discovery app. Our public map shows what is reported and what is fixed on land somebody answers for — not a catalogue of hikes to go do.',
        },
      ],
    },
    correctionTitle: 'Did we read your product wrong?',
    correctionBody: 'This page is one reading of public pages on one date, done by us, about our competitors. It can age and it can be wrong. If a line is inaccurate, write to us: we will correct it and leave the date in plain sight.',
    landingLead: 'Comparing a few tools?',
    landingCta: 'See what exists, and where we differ',
  },
  ctaBand: {
    title: 'Ready to keep your trails open?',
    body: 'Claim your land and every visitor becomes a pair of eyes for your crew — work from today, verification comes after.',
    cta: 'Claim your land',
    reportLead: 'Just visiting?',
    reportCta: 'Report an issue now',
    mailLead: 'or write to us:',
  },
  footer: {
    tagline: 'For those who keep their trails open.',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
  },
  langSwitch: { label: 'Français', short: 'FR' },
  notFound: {
    title: 'Off trail',
    body: 'This page doesn’t exist — or not anymore. Head back to the trailhead.',
    back: 'Back to the home page',
  },
};

export const ui = { fr, en } as const;

export type { Dict };
