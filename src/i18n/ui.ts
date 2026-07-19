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
  },
  hero: {
    kicker: 'Signalement de sentiers, sans friction',
    h1a: 'Un arbre tombé, un sentier lessivé, une pancarte brisée ?',
    h1b: 'Signalé en 30 secondes',
    lead: 'Le visiteur scanne le code QR au départ du sentier, décrit le problème, et l’équipe du sentier le reçoit — géolocalisé, photographié, prêt à trier. Aucun compte. Aucune application à installer. Même sans réseau.',
    ctaPrimary: 'Réclamez votre territoire',
    ctaSecondary: 'Comment ça marche',
    ctaNote: 'Gratuit pour les clubs de bénévoles.',
  },
  sticker: {
    caption: 'L’autocollant au départ du sentier — c’est toute l’installation.',
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
    note: 'Envie de garder vos points d’un appareil à l’autre ? Créez un compte dans l’application — facultatif, pour toujours. L’anonymat reste la voie par défaut.',
  },
  rewards: {
    kicker: 'La boucle des récompenses',
    title: 'Vos points deviennent des récompenses',
    lead: 'Chaque signalement confirmé et chaque correctif validé donne des points. Les équipes vérifiées les transforment en vraies récompenses — offertes par ceux qui gèrent le terrain.',
    badge: 'Bientôt',
    cards: [
      {
        title: 'Gagnés sur le terrain',
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
    note: 'Le catalogue de récompenses arrive avec la vérification des territoires. Les points, eux, se cumulent déjà.',
  },
  stewards: {
    kicker: 'Côté gestionnaire',
    title: 'Votre terrain, vos signalements, vos bénévoles',
    lead: 'TrailSnag donne à votre équipe des yeux sur le téléphone de chaque visiteur — et une file de triage pour agir.',
    features: [
      {
        title: 'Une file de triage, pas une boîte courriel',
        body: 'Chaque signalement arrive géolocalisé et photographié sur la carte de votre territoire. Validez, corrigez, fermez — l’historique reste.',
      },
      {
        title: 'La preuve que vous avez répondu',
        body: 'La carte publique montre ce qui est signalé et ce qui est réglé. Votre registre documente la réponse de votre équipe, problème par problème.',
      },
      {
        title: 'Des bénévoles récompensés',
        body: 'Les correctifs validés donnent des points à vos bénévoles — et votre équipe décide de ce qu’ils valent : un accès gratuit, un rabais, un morceau à vos couleurs. Vous fixez le catalogue, TrailSnag tient le registre.',
      },
      {
        title: 'Des autocollants QR, un par départ de sentier',
        body: 'Votre installation, c’est des autocollants résistants aux intempéries. Pas de borne, pas de matériel, pas de formation des visiteurs.',
      },
    ],
  },
  audiences: {
    kicker: 'Pour qui',
    title: 'Des clubs de bénévoles aux municipalités',
    cards: [
      {
        title: 'Clubs et comités de bénévoles',
        badge: 'Gratuit, pour toujours',
        body: 'Vos sentiers, votre file de signalements, vos bénévoles reconnus. Le forfait bénévole ne coûte rien et ne coûtera jamais rien.',
      },
      {
        title: 'Propriétaires de terres et de boisés',
        badge: 'Votre carnet de terrain',
        body: 'Votre terrain, votre registre : marquez le chicot à abattre, le ponceau bouché, la clôture à réparer. Vous êtes votre propre équipe — et rien ne se perd, même sans réseau.',
      },
      {
        title: 'Centres de plein air et parcs régionaux',
        badge: 'Par territoire',
        body: 'Un canal d’intake visiteur qui documente votre diligence, saison après saison. Forfait par territoire — écrivez-nous pour un projet pilote.',
      },
      {
        title: 'Municipalités et MRC',
        badge: 'Le 311 des sentiers',
        body: 'Vos sentiers sont l’angle mort du 311. TrailSnag route les signalements vers l’équipe responsable du terrain — pas vers une file générique.',
      },
    ],
  },
  ctaBand: {
    title: 'Prêt à garder vos sentiers ouverts ?',
    body: 'Réclamez votre territoire et chaque visiteur devient une paire d’yeux pour votre équipe — travaillez dès aujourd’hui, la vérification vient ensuite.',
    cta: 'Réclamez votre territoire',
    mailLead: 'ou écrivez-nous :',
  },
  footer: {
    tagline: 'Pour les équipes qui gardent les sentiers ouverts.',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    contact: 'Contact',
    madeIn: 'Conçu au Québec',
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
  },
  hero: {
    kicker: 'Trail reporting, without the friction',
    h1a: 'A downed tree, a washed-out trail, a broken sign?',
    h1b: 'Reported in 30 seconds',
    lead: 'A visitor scans the QR code at the trailhead, describes the problem, and the trail crew has it — geolocated, photographed, ready to triage. No account. No app to install. Even with no signal.',
    ctaPrimary: 'Claim your land',
    ctaSecondary: 'How it works',
    ctaNote: 'Free for volunteer clubs.',
  },
  sticker: {
    caption: 'The sticker at the trailhead — that is the whole install.',
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
    note: 'Want your points to follow you across devices? Create an account in the app — optional, forever. Anonymous stays the default.',
  },
  rewards: {
    kicker: 'The reward loop',
    title: 'Your points become rewards',
    lead: 'Every confirmed report and every validated fix earns points. Verified stewards turn them into real rewards — funded by the people who run the land.',
    badge: 'Coming soon',
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
    note: 'The rewards catalog arrives with territory verification. The points already add up today.',
  },
  stewards: {
    kicker: 'For stewards',
    title: 'Your land, your snags, your volunteers',
    lead: 'TrailSnag gives your crew eyes on every visitor’s phone — and a triage queue to act on what they see.',
    features: [
      {
        title: 'A triage queue, not an inbox',
        body: 'Every report lands geolocated and photographed on your territory’s map. Validate, fix, close — the history stays.',
      },
      {
        title: 'Proof you responded',
        body: 'The public map shows what’s reported and what’s resolved. Your log documents your crew’s response, problem by problem.',
      },
      {
        title: 'Volunteers, rewarded',
        body: 'Validated fixes earn your volunteers points — and your crew decides what they’re worth: a free pass, a discount, gear in your colours. You set the catalog, TrailSnag keeps the ledger.',
      },
      {
        title: 'QR stickers, one per trailhead',
        body: 'Your install is weatherproof stickers. No kiosk, no hardware, no visitor training.',
      },
    ],
  },
  audiences: {
    kicker: 'Who it serves',
    title: 'From volunteer clubs to municipalities',
    cards: [
      {
        title: 'Volunteer clubs and committees',
        badge: 'Free, forever',
        body: 'Your trails, your report queue, your volunteers recognized. The volunteer plan costs nothing and never will.',
      },
      {
        title: 'Private landowners',
        badge: 'Your land log',
        body: 'Your land, your log: mark the dead snag to fell, the plugged culvert, the fence to mend. You are your own crew — and nothing gets lost, even offline.',
      },
      {
        title: 'Outdoor centres and regional parks',
        badge: 'Per territory',
        body: 'A visitor intake channel that documents your diligence, season after season. Per-territory plans — write to us about a pilot.',
      },
      {
        title: 'Municipalities and RCMs',
        badge: 'The trails 311',
        body: 'Trails are the blind spot of 311. TrailSnag routes reports to the crew responsible for the land — not to a generic queue.',
      },
    ],
  },
  ctaBand: {
    title: 'Ready to keep your trails open?',
    body: 'Claim your land and every visitor becomes a pair of eyes for your crew — work from today, verification comes after.',
    cta: 'Claim your land',
    mailLead: 'or write to us:',
  },
  footer: {
    tagline: 'For the crews that keep trails open.',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    madeIn: 'Made in Québec',
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
