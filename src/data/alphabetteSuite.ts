export interface AlphabetteAppItem {
  id: string;
  name: string;
  tagline: string;
  url: string;
  category: string;
  isNew?: boolean;
}

export const ALPHABETTE_APPS: AlphabetteAppItem[] = [
  {
    id: 'une-absurde',
    name: "La Une de l'Absurde",
    tagline: 'Transformez vos petits tracas en scandales loufoques à la Une',
    url: 'https://alphabette.fr',
    category: 'Humour & Presse',
    isNew: true,
  },
  {
    id: 'info-perso',
    name: 'Info Perso',
    tagline: 'Votre fiche essentielle et vos repères utiles hors connexion',
    url: 'https://alphabette.fr',
    category: 'Quotidien',
  },
  {
    id: 'mots-melanges',
    name: 'Mots Croisés Doux',
    tagline: 'Grilles lisibles grand format pour entretenir la mémoire',
    url: 'https://alphabette.fr',
    category: 'Jeux & Culture',
    isNew: true,
  },
  {
    id: 'carnet-recettes',
    name: 'Carnet de Cuisine',
    tagline: 'Vos recettes familiales illustrées et prêtes à imprimer',
    url: 'https://alphabette.fr',
    category: 'Maison',
  },
  {
    id: 'echo-photo',
    name: 'Album Souvenir',
    tagline: 'Légendez et racontez vos photos de famille à voix haute',
    url: 'https://alphabette.fr',
    category: 'Famille',
    isNew: true,
  },
  {
    id: 'meteo-claire',
    name: 'Météo Claire',
    tagline: 'Prévisions limpides en grands caractères sans publicité',
    url: 'https://alphabette.fr',
    category: 'Quotidien',
  },
  {
    id: 'bloc-vocal',
    name: 'Mémo Vocal',
    tagline: 'Dictez vos listes et idées, relisez-les en un geste',
    url: 'https://alphabette.fr',
    category: 'Productivité',
  },
  {
    id: 'atelier-lettres',
    name: 'Atelier Courrier',
    tagline: 'Modèles simples pour écrire et imprimer vos courriers',
    url: 'https://alphabette.fr',
    category: 'Démarches',
  },
];

export const ALPHABETTE_LANGUAGES = [
  { code: 'FR', label: 'Français (France)', active: true },
  { code: 'BE', label: 'Français (Belgique)', active: false },
  { code: 'CH', label: 'Français (Suisse)', active: false },
  { code: 'CA', label: 'Français (Québec)', active: false },
] as const;
