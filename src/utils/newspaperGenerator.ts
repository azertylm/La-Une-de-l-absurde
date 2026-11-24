export type EditorialTone = 'scandale' | 'urgence' | 'champetre';

export type PressStampId =
  | 'none'
  | 'scoop'
  | 'gonflee'
  | 'secret'
  | 'voisin'
  | 'apero';

export type PhotoFilterId = 'color' | 'bw' | 'vintage';

export interface PressStampOption {
  id: PressStampId;
  label: string;
  stampText: string;
  colorHex: string;
}

export interface PhotoFilterOption {
  id: PhotoFilterId;
  label: string;
}

export interface AbsurdityLevelInfo {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  kicker: string;
}

export interface DemoPhotoScene {
  id: string;
  bg1: string;
  bg2: string;
  accent: string;
  title: string;
  subtitle: string;
  kicker: string;
}

export interface EyewitnessQuote {
  quote: string;
  witness: string;
}

export interface UneContent {
  headline: string;
  subtitle: string;
  caption: string;
  article: string;
  weather: string;
  eyewitness: EyewitnessQuote;
  classifiedAd: string;
  horoscope: string;
  editionNumber: number;
  tone: EditorialTone;
  absurdityLevel: 1 | 2 | 3 | 4 | 5;
  stamp: PressStampId;
  photoFilter: PhotoFilterId;
}

export interface UneEdition extends UneContent {
  id: string;
  date: string;
  photoDataUrl: string;
  anecdote: string;
  createdAt: number;
}

export const PRESS_STAMPS: readonly PressStampOption[] = [
  { id: 'none', label: 'Aucun', stampText: '', colorHex: '#0f172a' },
  { id: 'scoop', label: 'Scoop', stampText: 'SCOOP DU SIÈCLE', colorHex: '#dc2626' },
  { id: 'gonflee', label: 'Gonflée', stampText: 'INFO 100 % GONFLÉE', colorHex: '#b45309' },
  { id: 'secret', label: 'Confidentiel', stampText: 'TOP SECRET', colorHex: '#1d4ed8' },
  { id: 'voisin', label: 'Témoin', stampText: 'VU PAR LE VOISIN', colorHex: '#047857' },
  { id: 'apero', label: 'Apéro', stampText: 'ALERTE APÉRO', colorHex: '#be185d' },
];

export const PHOTO_FILTERS: readonly PhotoFilterOption[] = [
  { id: 'color', label: 'Couleur' },
  { id: 'bw', label: 'Presse N&B' },
  { id: 'vintage', label: 'Archive 1974' },
];

export const ABSURDITY_LEVELS: readonly AbsurdityLevelInfo[] = [
  { level: 1, label: 'Potin de palier', kicker: 'Bruit de couloir vérifié à 12 %' },
  { level: 2, label: 'Émoi au quartier', kicker: 'Le trottoir d’en face s’interroge' },
  { level: 3, label: 'Scandale cantonal', kicker: 'Tout le département retient son souffle' },
  { level: 4, label: 'Crise diplomatique', kicker: 'Des experts en pantoufles convoqués' },
  { level: 5, label: 'Panique planétaire', kicker: 'L’ONU interrompt la pause café' },
];

export const DEMO_ANECDOTES: readonly string[] = [
  "Tonton Michel a raté le cochonnet de trois mètres et a officiellement accusé la rotation de la Terre. Les voisins ont applaudi son fair-play inexistant.",
  "Mon vélo a décidé de perdre sa chaîne exactement devant la boulangerie à l'heure de pointe. J'ai fini la course à pied avec une baguette sous le bras.",
  "Le barbecue familial a failli déclencher une alerte météo à cause de trois saucisses trop grillées. Tout le monde a prétendu que c'était « fumé à l'ancienne ».",
  "Notre chat a pris le contrôle absolu du canapé pendant 6 heures d'affilée et a refusé toute négociation diplomatique.",
  "La machine à café du bureau a refusé de démarrer lundi matin avant 9 h 12. Une cellule de crise a immédiatement été ouverte autour d'un paquet de madeleines.",
  "Tata Josiane a tenté de plier une carte routière de 1996 en plein vent. Elle a finalement construit un abri de fortune pour trois randonneurs égarés.",
];

const LOUFOQUE_SUBJECTS = [
  'Tonton Gérard en claquettes-chaussettes',
  'Un pigeon visiblement syndiqué',
  'La boulangère armée d’une baguette tradition',
  'Notre chat ministre du canapé',
  'Le voisin du 3e avec son sécateur de compétition',
  'Une tondeuse à gazon révoltée',
  'Le club local de tricot extrême',
  'Mon grille-pain doté d’une volonté propre',
];

const LOUFOQUE_ACTIONS = [
  'a bloqué le rond-point pendant 4 minutes pour débattre de la meilleure recette de quiche',
  'a exigé un recomptage officiel des points lors d’une partie de belote tendue',
  'a déclenché l’alarme incendie en essayant de réchauffer un croissant de la veille',
  'a refusé de céder le dernier transat au soleil malgré trois offres de limonade',
  'a inauguré par erreur un concours de mauvais perdants sur le parking du marché',
  'a réussi l’exploit de perdre ses lunettes alors qu’elles étaient posées sur son front',
  'a tenté de dresser une table de camping dans le sens inverse du vent',
];

const LOUFOQUE_TWISTS = [
  'La fanfare municipale a proposé un hommage improvisé au tambourin.',
  'Trois témoins assurent que c’est la faute du changement d’heure.',
  'Les autorités locales recommandent de garder un paquet de chouquettes à portée de main.',
  'Une commission d’enquête indépendante devrait se réunir après la sieste.',
  'Les voisins réclament déjà une adaptation au cinéma avec effets spéciaux.',
];

export const DEMO_PHOTO_SCENES: readonly DemoPhotoScene[] = [
  {
    id: 'boulangerie',
    bg1: '#EA580C',
    bg2: '#FACC15',
    accent: '#FEF08A',
    kicker: 'DOCUMENT EXCLUSIF · RUE PRINCIPALE',
    title: 'ALERTE BOULANGERIE',
    subtitle: 'Notre envoyé spécial était sur place avant la cuisson',
  },
  {
    id: 'cycliste',
    bg1: '#0284C7',
    bg2: '#1D4ED8',
    accent: '#BAE6FD',
    kicker: 'INSTANTANÉ SPORTIF · 2 KM/H',
    title: 'EXPLOIT CYCLISTE',
    subtitle: 'Chaîne tombée, dignité intacte malgré le public',
  },
  {
    id: 'felin',
    bg1: '#059669',
    bg2: '#065F46',
    accent: '#A7F3D0',
    kicker: 'CRISE DIPLOMATIQUE AU SALON',
    title: 'COUP D’ÉTAT FÉLIN',
    subtitle: 'Le canapé ne répond plus depuis 14 h 15',
  },
  {
    id: 'petanque',
    bg1: '#B45309',
    bg2: '#78350F',
    accent: '#FDE68A',
    kicker: 'TERRAIN MUNICIPAL · ENQUÊTE',
    title: 'AFFAIRE DU COCHONNET',
    subtitle: 'Les géophysiciens étudient la pente du gravier',
  },
  {
    id: 'barbecue',
    bg1: '#B91C1C',
    bg2: '#F97316',
    accent: '#FED7AA',
    kicker: 'PANACHE DE FUMÉE · JARDIN SUD',
    title: 'BARBECUE EN ALERTE',
    subtitle: 'Trois merguez déclarées « cuisson volcanique »',
  },
  {
    id: 'pigeons',
    bg1: '#4338CA',
    bg2: '#0F766E',
    accent: '#C7D2FE',
    kicker: 'PLACE DU MARCHÉ · 11 H 04',
    title: 'SOMMET DES PIGEONS',
    subtitle: 'Négociations serrées autour d’une miette de brioche',
  },
];

export const TONE_LABELS: Record<EditorialTone, { label: string; description: string }> = {
  scandale: {
    label: 'Scandale',
    description: 'Ton dramatique de grand quotidien régional',
  },
  urgence: {
    label: 'Urgence',
    description: 'Style flash info haletant et envoyés spéciaux',
  },
  champetre: {
    label: 'Terroir',
    description: 'Verbe savoureux de gazette de village',
  },
};

const HEADLINES_BY_TONE: Record<EditorialTone, readonly string[]> = {
  scandale: [
    'STUPÉFACTION GÉNÉRALE : UN INCIDENT DU QUOTIDIEN FAIT TREMBLER LE QUARTIER !',
    'EXCLUSIF : LA VÉRITÉ ÉCLATE ENFIN SUR CETTE AFFAIRE HORS NORMES !',
    'SCANDALE DE PROXIMITÉ : LES TÉMOINS N’EN CROIENT TOUJOURS PAS LEURS YEUX !',
    'RÉVÉLATIONS CHOCS : PERSONNE N’AVAIT PRÉVU UN TEL COUPS DE THÉÂTRE AU COIN DE LA RUE !',
  ],
  urgence: [
    'ALERTE INFO : TOUT LE SECTEUR RETENU EN HALEINE PAR UN REBONDISSEMENT INÉDIT !',
    'FLASH SPÉCIAL : LA RÉDACTION DÉPLOIE SES TROTTINETTES D’INTERVENTION !',
    'DERNIÈRE MINUTE : UN ÉVÉNEMENT BANAL PREND UNE AMPLEUR HISTORIQUE !',
    'ÉDITION SPÉCIALE : LES SIRÈNES DU BON SENS SONNENT DANS TOUTE LA COMMUNE !',
  ],
  champetre: [
    'GRAND ÉMOI AU BOURG : ON N’AVAIT PLUS VU ÇA DEPUIS LA KERMESSE DE 1998 !',
    'CHRONIQUE DU TERROIR : QUAND LE QUOTIDIEN DÉPASSE L’IMAGINATION !',
    'TOUT LE CANTON EN PARLE : L’EXPLOIT QUE PERSONNE N’AVAIT PRÉVU !',
    'GAZETTE EN ÉBULLITION : UN MOMENT D’ANTHOLOGIE ENTRE LA MAIRIE ET LE LAVOIR !',
  ],
};

const LEVEL_PREFIXES: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'CONFIDENTIEL · ',
  2: '',
  3: '',
  4: 'CRISE MAJEURE · ',
  5: 'ALERTE PLANÉTAIRE · ',
};

const CAPTIONS_BY_TONE: Record<EditorialTone, readonly string[]> = {
  scandale: [
    'Cliché d’archive pris quelques secondes avant que tout le monde n’éclate de rire (DR / La Une de l’Absurde).',
    'Document exclusif authentifié par trois voisins unanimes et un chien perplexe (Photo : Rédaction).',
  ],
  urgence: [
    'Image transmise par notre envoyé très spécial en direct du trottoir d’en face (DR / Le Bazar).',
    'Capture d’urgence prise entre deux gorgées de café tiède et un fou rire mal dissimulé.',
  ],
  champetre: [
    'Photographie déjà pressentie pour le calendrier annuel de l’amicale locale (DR / Le Bazar).',
    'Scène mémorable immortalisée sous l’œil attentif des habitués du banc municipal.',
  ],
};

const WEATHERS_BY_TONE: Record<EditorialTone, readonly string[]> = {
  scandale: [
    'Soleil radieux avec 80 % de risques de mauvaise foi en fin de journée et rafales d’apéro vers 19 h.',
    'Ciel dégagé, légère brise d’ironie venant du sud et averses soudaines de fous rires localisés.',
    'Températures idéales pour débattre de tout et de rien, pression atmosphérique en hausse près de la machine à café.',
  ],
  urgence: [
    'Vigilance jaune croissants chauds jusqu’à midi, suivie d’éclaircies diplomatiques sur toute la terrasse.',
    'Courants d’air spectaculaires autour des commentaires de comptoir, visibilité parfaite sur les excuses improbables.',
  ],
  champetre: [
    'Douceur printanière propice aux discussions prolongées devant la boulangerie et vent léger de bonne humeur.',
    'Beau temps stable pour refaire le monde à l’ombre, avec 100 % de chances de second café.',
  ],
};

const EYEWITNESSES: readonly EyewitnessQuote[] = [
  {
    quote: '« Je n’avais pas vu un tel rebondissement depuis la grande pénurie de chouquettes de 2004. »',
    witness: 'M. Bernard, champion départemental de sieste',
  },
  {
    quote: '« J’ai tout vu depuis ma fenêtre entre deux arrosages de géraniums : c’était grandiose. »',
    witness: 'Mme Odette, observatrice officielle du 2e étage',
  },
  {
    quote: '« Mes calculs sont formels : la gravité locale a clairement choisi son camp aujourd’hui. »',
    witness: 'Pr. Kévin, expert autoproclamé en balistique de jardin',
  },
  {
    quote: '« Si on m’avait raconté ça au marché, j’aurais demandé un rab de radis pour vérifier. »',
    witness: 'Lucette, présidente du comité des potins vérifiés à peu près',
  },
  {
    quote: '« J’en ai lâché ma cuillère en bois. Franchement, ça mérite au moins une plaque en laiton. »',
    witness: 'Jean-Claude, stratège en barbecue de précision',
  },
];

const CLASSIFIED_ADS: readonly string[] = [
  'Vends parapluie qui ne s’ouvre que par grand soleil. Idéal pour faire bonne figure. Prix : 2 croissants.',
  'Cherche personne sachant replier une tente « 2 secondes » en moins de trois quarts d’heure. Urgent.',
  'Échange chausson gauche orphelin contre chausson droit aventurier, pointure 42 ou approchant.',
  'Perdu motivation du lundi matin près de la bouilloire. Forte récompense en blagues douteuses.',
  'Loue tabouret bancal spécial réunions rapides : personne ne reste assis plus de 4 minutes.',
  'Donne conseils non sollicités sur la cuisson des pâtes. Disponible 24 h/24 au rayon épicerie.',
];

const HOROSCOPES: readonly string[] = [
  'Votre chaise grincera exactement au moment le plus solennel de la journée, provoquant un respect inattendu.',
  'Jupiter aligné avec votre cafetière annonce une idée brillante immédiatement oubliée en changeant de pièce.',
  'Un inconnu vous sourira dans la rue ; vérifiez tout de même que vous n’avez pas gardé vos pantoufles.',
  'Journée idéale pour avoir raison avec beaucoup d’aplomb sur un sujet que vous découvrez à l’instant.',
];

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateAnecdote(raw: string): ValidationResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Écrivez une anecdote (ou cliquez sur « Scoop loufoque ») avant d’imprimer la Une.',
    };
  }
  if (trimmed.length < 8) {
    return {
      valid: false,
      error: 'Ajoutez quelques mots de plus pour que notre rédaction puisse dramatiser votre histoire.',
    };
  }
  return { valid: true };
}

export function pickNextDemoAnecdote(current: string, randomIndex?: number): string {
  const normalized = current.trim();
  const pool = DEMO_ANECDOTES.filter((item) => item !== normalized);
  const list = pool.length > 0 ? pool : DEMO_ANECDOTES;
  const idx =
    typeof randomIndex === 'number'
      ? Math.abs(randomIndex) % list.length
      : Math.floor(Math.random() * list.length);
  return list[idx];
}

export function generateRandomLoufoqueAnecdote(seed?: number): string {
  const pick = (arr: readonly string[], salt: number) => {
    const idx =
      typeof seed === 'number'
        ? Math.abs(seed * 7 + salt * 3) % arr.length
        : Math.floor(Math.random() * arr.length);
    return arr[idx];
  };
  const subject = pick(LOUFOQUE_SUBJECTS, 1);
  const action = pick(LOUFOQUE_ACTIONS, 2);
  const twist = pick(LOUFOQUE_TWISTS, 3);
  return `${subject} ${action}. ${twist}`;
}

export function pickNextDemoScene(currentId: string | null): DemoPhotoScene {
  const pool = DEMO_PHOTO_SCENES.filter((scene) => scene.id !== currentId);
  const list = pool.length > 0 ? pool : DEMO_PHOTO_SCENES;
  return list[Math.floor(Math.random() * list.length)];
}

export function formatFrenchEditionDate(date: Date = new Date()): string {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function ensureSentenceEnding(text: string): string {
  const clean = text.trim();
  if (!clean) return '';
  return /[.!?…]$/.test(clean) ? clean : `${clean}.`;
}

export function truncateAtWordBoundary(text: string, maxLength = 95): string {
  const clean = text.trim();
  if (clean.length <= maxLength) return clean;
  const sliced = clean.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = lastSpace > 24 ? sliced.slice(0, lastSpace) : sliced;
  return `${base.replace(/[,;:\s]+$/, '')}…`;
}

export interface BuildUneOptions {
  tone?: EditorialTone;
  absurdityLevel?: 1 | 2 | 3 | 4 | 5;
  stamp?: PressStampId;
  photoFilter?: PhotoFilterId;
  variantSeed?: number;
}

export function buildSatiricalUne(
  anecdote: string,
  options: BuildUneOptions = {}
): UneContent {
  const tone = options.tone ?? 'scandale';
  const absurdityLevel = options.absurdityLevel ?? 3;
  const stamp = options.stamp ?? 'scoop';
  const photoFilter = options.photoFilter ?? 'color';
  const variantSeed = options.variantSeed;

  const clean = ensureSentenceEnding(anecdote.trim() || DEMO_ANECDOTES[0]);
  const shortLead = (clean.split(/[.!?]/)[0] || clean).trim();
  const truncatedLead = truncateAtWordBoundary(shortLead, 95);

  const headlines = HEADLINES_BY_TONE[tone];
  const captions = CAPTIONS_BY_TONE[tone];
  const weathers = WEATHERS_BY_TONE[tone];

  const pick = <T,>(arr: readonly T[], offset = 0): T => {
    const idx =
      typeof variantSeed === 'number'
        ? Math.abs(variantSeed + offset) % arr.length
        : Math.floor(Math.random() * arr.length);
    return arr[idx];
  };

  const baseHeadline = pick(headlines, 0);
  const prefix = LEVEL_PREFIXES[absurdityLevel];
  const headline = prefix && !baseHeadline.startsWith(prefix) ? `${prefix}${baseHeadline}` : baseHeadline;

  const extraEscalation =
    absurdityLevel >= 4
      ? ' Plusieurs satellites d’observation auraient même pivoté par simple curiosité, tandis qu’un colloque de spécialistes en bonnet de laine réclame déjà un jour férié commémoratif.'
      : absurdityLevel === 1
        ? ' Le quartier tente malgré tout de reprendre le cours normal de ses courses de pain.'
        : '';

  let subtitle = '';
  let article = '';

  if (tone === 'urgence') {
    subtitle = `Alerte en direct de notre rédaction : « ${truncatedLead} »`;
    article = `Dépêchés sur les lieux en trottinette électrique toutes sirènes hurlantes, nos correspondants ont confirmé l’impensable. ${clean} Plusieurs analystes de quartier, interrogés à chaud devant le kiosque, estiment qu’il faudra « au moins un café bien serré pour s’en remettre ».${extraEscalation}\n\nUne conférence de presse improvisée devrait se tenir avant le dîner. D’ici là, nos équipes maintiennent un dispositif spécial équipé de carnets neufs et de viennoiseries de première nécessité.`;
  } else if (tone === 'champetre') {
    subtitle = `Toute la commune en discute encore : « ${truncatedLead} »`;
    article = `Rarement une scène aura autant marqué les esprits entre la place du marché et le banc du square. ${clean} Les témoins présents sur place ont salué à l’unanimité le panache de l’instant, promettant d’enjoliver légèrement les faits à chaque repas dominical.${extraEscalation}\n\nDe source généralement bien informée, une plaque commémorative en carton plume serait déjà à l’étude. Le calme est revenu sur le secteur, non sans quelques éclats de rire prolongés.`;
  } else {
    subtitle = `Retour en urgence sur cet événement historique : « ${truncatedLead} »`;
    article = `Selon nos envoyés très spéciaux dépêchés sur place en trottinette, personne ne s’attendait à une telle tournure des événements. ${clean} Les experts internationaux, immédiatement contactés par notre rédaction, parlent déjà d’un « tournant majeur pour le moral du voisinage ».${extraEscalation}\n\nMalgré l’émotion palpable, une cellule de soutien psychologique équipée de croissants chauds a été déployée. La population reste mobilisée dans le calme et la bonne humeur en attendant le prochain rebondissement.`;
  }

  const editionNumber =
    typeof variantSeed === 'number'
      ? 1400 + (Math.abs(variantSeed) % 500)
      : 1400 + Math.floor(Math.random() * 500);

  return {
    headline,
    subtitle,
    caption: pick(captions, 1),
    article,
    weather: pick(weathers, 2),
    eyewitness: pick(EYEWITNESSES, 3),
    classifiedAd: pick(CLASSIFIED_ADS, 4),
    horoscope: pick(HOROSCOPES, 5),
    editionNumber,
    tone,
    absurdityLevel,
    stamp,
    photoFilter,
  };
}

export function splitArticleIntoColumns(article: string): [string, string] {
  const words = article.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return [article.trim(), ''];
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(' '), words.slice(half).join(' ')];
}

export function getStampOption(id: PressStampId): PressStampOption {
  return PRESS_STAMPS.find((s) => s.id === id) ?? PRESS_STAMPS[0];
}
