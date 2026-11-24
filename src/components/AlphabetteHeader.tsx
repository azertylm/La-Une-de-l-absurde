import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart2,
  Check,
  Crown,
  Heart,
  LayoutGrid,
  Moon,
  MoreHorizontal,
  Star,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { ALPHABETTE_APPS, ALPHABETTE_LANGUAGES } from '../data/alphabetteSuite';

type ActiveModal =
  | null
  | 'all-apps'
  | 'new-apps'
  | 'subscription'
  | 'donate'
  | 'install'
  | 'feedback'
  | 'language';

interface AlphabetteHeaderProps {
  appTitle: string;
  appSubtitle: string;
  isDark: boolean;
  onToggleDark: () => void;
  isBigMode: boolean;
  onToggleBigMode: () => void;
  isSimpleMode: boolean;
  onEnableSimpleMode: () => void;
  isSpeaking: boolean;
  onToggleReadAloud: () => void;
  onResetHome: () => void;
  onNotify: (message: string) => void;
}

const STORAGE_FAVORITES_KEY = 'alphabette_favorite_apps_v1';
const STORAGE_PINNED_KEY = 'alphabette_pinned_bazar_v1';
const STORAGE_LANG_KEY = 'alphabette_lang_v1';

export const AlphabetteHeader: React.FC<AlphabetteHeaderProps> = ({
  appTitle,
  appSubtitle,
  isDark,
  onToggleDark,
  isBigMode,
  onToggleBigMode,
  isSimpleMode,
  onEnableSimpleMode,
  isSpeaking,
  onToggleReadAloud,
  onResetHome,
  onNotify,
}) => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      return saved ? (JSON.parse(saved) as string[]) : ['une-absurde'];
    } catch {
      return ['une-absurde'];
    }
  });
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_PINNED_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [selectedLang, setSelectedLang] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_LANG_KEY) || 'FR';
    } catch {
      return 'FR';
    }
  });
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota issues
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PINNED_KEY, String(isPinned));
    } catch {
      // Ignore storage quota issues
    }
  }, [isPinned]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, selectedLang);
    } catch {
      // Ignore storage quota issues
    }
  }, [selectedLang]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!activeModal) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveModal(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [activeModal]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTogglePin = () => {
    const next = !isPinned;
    setIsPinned(next);
    setMenuOpen(false);
    onNotify(next ? 'Application épinglée dans votre en-tête.' : 'Épingle retirée.');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setFeedbackText('');
    onNotify('Merci pour votre avis ! Il a bien été enregistré.');
    setTimeout(() => {
      setFeedbackSent(false);
      setActiveModal(null);
    }, 1200);
  };

  const newApps = ALPHABETTE_APPS.filter((a) => a.isNew);

  return (
    <>
      <header
        className="no-print sticky top-0 z-40 w-full select-none"
        style={{ fontSize: '16px', lineHeight: 1.2 }}
      >
        {/* 1. BARRE SUPÉRIEURE (Top Bar Écosystème) */}
        <div
          className={`w-full flex items-center justify-between flex-nowrap gap-[4px] min-[400px]:gap-[6px] h-[46px] sm:h-[50px] px-[8px] min-[400px]:px-[10px] sm:px-[16px] text-white transition-colors ${
            isDark ? 'bg-[#0b1220]' : 'bg-[#182334]'
          }`}
        >
          {/* Bloc gauche : Logo + .eu + Toutes les applis + NEW */}
          <div className="flex items-center flex-nowrap gap-[4px] min-[400px]:gap-[6px] sm:gap-[10px] min-w-0">
            <a
              href="https://alphabette.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[5px] min-[400px]:gap-[6px] sm:gap-[8px] shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 rounded-full"
              aria-label="Accéder à alphabette.fr"
            >
              <span className="w-[24px] h-[24px] min-[400px]:w-[26px] min-[400px]:h-[26px] sm:w-[28px] sm:h-[28px] rounded-full bg-[#3355d1] flex items-center justify-center font-extrabold text-[14px] sm:text-[16px] text-white leading-none shrink-0">
                a
              </span>
              <span className="font-bold lowercase tracking-tight text-[14px] min-[400px]:text-[15px] sm:text-[17px] text-white whitespace-nowrap">
                alphabette
              </span>
            </a>

            <a
              href="https://alphabette.eu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Laboratoire alphabette.eu"
              className="w-[30px] h-[30px] min-[400px]:w-[34px] min-[400px]:h-[34px] sm:w-[36px] sm:h-[36px] rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-[11.5px] min-[400px]:text-[12px] sm:text-[13px] font-semibold text-white shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              .eu
            </a>

            <button
              type="button"
              onClick={() => setActiveModal('all-apps')}
              aria-label="Toutes les applis de la suite Alphabette"
              className="w-[30px] h-[30px] min-[400px]:w-[34px] min-[400px]:h-[34px] sm:w-auto sm:h-[36px] sm:px-[10px] rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-[6px] text-white shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              <LayoutGrid className="w-[15px] h-[15px] min-[400px]:w-[17px] min-[400px]:h-[17px] shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline text-[12.5px] font-semibold whitespace-nowrap">
                Toutes les applis
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('new-apps')}
              aria-label="Nouveautés de la suite Alphabette"
              className="w-[30px] h-[30px] min-[400px]:w-[34px] min-[400px]:h-[34px] sm:w-[36px] sm:h-[36px] rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              <span className="px-[4px] py-[2px] rounded-[4px] bg-gradient-to-b from-sky-200 to-sky-400 text-[#0f172a] text-[8.5px] min-[400px]:text-[9px] font-extrabold uppercase tracking-tight leading-none">
                NEW
              </span>
            </button>
          </div>

          {/* Bloc droite : Bouton Abonnement */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setActiveModal('subscription')}
              aria-label="Informations sur l'abonnement Alphabette"
              className="h-[32px] min-[400px]:h-[34px] sm:h-[36px] px-[8px] min-[400px]:px-[10px] sm:px-[14px] rounded-full bg-white/10 hover:bg-white/15 border-[1.5px] border-[#f59e0b] flex items-center gap-[4px] min-[400px]:gap-[5px] sm:gap-[6px] text-[#fbbf24] font-bold text-[11.5px] min-[400px]:text-[12.5px] sm:text-[13.5px] whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              <Crown className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] text-[#f59e0b] shrink-0" aria-hidden="true" />
              <span>Abonnement</span>
            </button>
          </div>
        </div>

        {/* 2. BARRE INFÉRIEURE (Barre d'Application & Accessibilité) */}
        <div
          className={`w-full flex items-center justify-between flex-nowrap gap-[4px] min-[400px]:gap-[6px] h-[54px] sm:h-[58px] px-[8px] min-[400px]:px-[10px] sm:px-[16px] border-b transition-colors ${
            isDark
              ? 'bg-[#0f172a] border-[#334155] text-white'
              : 'bg-white border-[#e2e8f0] text-[#0f172a]'
          }`}
        >
          {/* Bloc gauche : Titre & Sous-titre */}
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <button
              type="button"
              onClick={onResetHome}
              className="flex items-center gap-[3px] min-[400px]:gap-[4px] text-left min-w-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 rounded"
            >
              <span
                className={`font-extrabold tracking-tight text-[13px] min-[400px]:text-[14.5px] sm:text-[20px] truncate leading-tight ${
                  isDark ? 'text-white' : 'text-[#3f51b5]'
                }`}
              >
                {appTitle}
              </span>
              {isPinned && (
                <Star
                  className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] text-amber-400 fill-amber-400 shrink-0"
                  aria-label="Application épinglée"
                />
              )}
            </button>
            <span className="text-[9px] sm:text-[10.5px] uppercase tracking-[0.04em] text-[#64748b] dark:text-[#94a3b8] font-semibold truncate leading-tight mt-[1px]">
              {appSubtitle}
            </span>
          </div>

          {/* Bloc droite : 5 boutons d'accessibilité stricts */}
          <div className="flex items-center flex-nowrap gap-[3px] min-[400px]:gap-[4px] sm:gap-[7px] shrink-0">
            {/* 1. Bouton Don */}
            <button
              type="button"
              onClick={() => setActiveModal('donate')}
              aria-label="Faire un don pour soutenir Alphabette"
              className="w-[32px] h-[32px] min-[400px]:w-[34px] min-[400px]:h-[34px] sm:w-[38px] sm:h-[38px] rounded-[9px] sm:rounded-[11px] bg-[#db2777] hover:bg-[#be185d] text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              <Heart className="w-[16px] h-[16px] min-[400px]:w-[17px] min-[400px]:h-[17px] sm:w-[18px] sm:h-[18px] fill-white" aria-hidden="true" />
            </button>

            {/* 2. Bouton BIG */}
            <button
              type="button"
              onClick={onToggleBigMode}
              aria-pressed={isBigMode}
              aria-label={isBigMode ? 'Désactiver le mode grand texte BIG' : 'Activer le mode grand texte BIG'}
              className={`h-[32px] min-[400px]:h-[34px] sm:h-[38px] px-[6px] min-[400px]:px-[8px] sm:px-[11px] rounded-[9px] sm:rounded-[11px] flex items-center gap-[3px] sm:gap-[4px] font-extrabold text-[11.5px] min-[400px]:text-[12px] sm:text-[14px] text-white shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                isBigMode
                  ? 'bg-[#312e81] ring-2 ring-amber-400'
                  : 'bg-[#4338ca] hover:bg-[#3730a3]'
              }`}
            >
              <span>BIG</span>
              <BarChart2 className="w-[13px] h-[13px] min-[400px]:w-[14px] min-[400px]:h-[14px] sm:w-[15px] sm:h-[15px] shrink-0" aria-hidden="true" />
            </button>

            {/* 3. Bouton Mode Nuit / Jour */}
            <button
              type="button"
              onClick={onToggleDark}
              aria-label={isDark ? 'Passer en mode jour' : 'Passer en mode nuit'}
              className={`w-[32px] h-[32px] min-[400px]:w-[34px] min-[400px]:h-[34px] sm:w-[38px] sm:h-[38px] rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                isDark
                  ? 'bg-[#1e293b] border-[#334155] text-[#fbbf24] hover:bg-[#334155]'
                  : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#334155] hover:bg-[#e2e8f0]'
              }`}
            >
              {isDark ? (
                <Sun className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px]" aria-hidden="true" />
              ) : (
                <Moon className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px]" aria-hidden="true" />
              )}
            </button>

            {/* 4. Bouton Lecture à haute voix */}
            <button
              type="button"
              onClick={onToggleReadAloud}
              aria-pressed={isSpeaking}
              aria-label={
                isSpeaking
                  ? 'Arrêter la lecture à haute voix'
                  : 'Lire le contenu de la page à haute voix'
              }
              className={`w-[32px] h-[32px] min-[400px]:w-[34px] min-[400px]:h-[34px] sm:w-[38px] sm:h-[38px] rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                isSpeaking
                  ? 'bg-[#047857] border-[#047857] text-white'
                  : isDark
                    ? 'bg-[#1e293b] border-[#334155] text-slate-200 hover:bg-[#334155]'
                    : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#334155] hover:bg-[#e2e8f0]'
              }`}
            >
              {isSpeaking ? (
                <VolumeX className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px]" aria-hidden="true" />
              ) : (
                <Volume2 className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px]" aria-hidden="true" />
              )}
            </button>

            {/* 5. Bouton Plus d'options (...) */}
            <div ref={menuContainerRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-label="Plus d'options"
                className={`w-[32px] h-[32px] min-[400px]:w-[34px] min-[400px]:h-[34px] sm:w-[38px] sm:h-[38px] rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                  isDark
                    ? 'bg-[#1e293b] border-[#334155] text-slate-200 hover:bg-[#334155]'
                    : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#334155] hover:bg-[#e2e8f0]'
                }`}
              >
                <MoreHorizontal className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  aria-label="Menu d'options de l'application"
                  className="absolute right-0 mt-[8px] w-[260px] rounded-[14px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] shadow-xl py-[6px] z-50 text-[14px] text-slate-800 dark:text-slate-100"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleTogglePin}
                    className="w-full px-[14px] py-[10px] text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors cursor-pointer"
                  >
                    <span>⭐ Épingler cette appli</span>
                    {isPinned && <Check className="w-[15px] h-[15px] text-amber-500" aria-hidden="true" />}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveModal('subscription');
                    }}
                    className="w-full px-[14px] py-[10px] text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors cursor-pointer"
                  >
                    <span>👤 Mon inscription</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onEnableSimpleMode();
                    }}
                    className="w-full px-[14px] py-[10px] text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors cursor-pointer"
                  >
                    <span>🧘 Mode simple</span>
                    {isSimpleMode && <Check className="w-[15px] h-[15px] text-indigo-500" aria-hidden="true" />}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveModal('install');
                    }}
                    className="w-full px-[14px] py-[10px] text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors cursor-pointer"
                  >
                    <span>📱 Installer sur mon téléphone</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveModal('feedback');
                    }}
                    className="w-full px-[14px] py-[10px] text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors cursor-pointer"
                  >
                    <span>💬 Donner mon avis</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      window.print();
                    }}
                    className="w-full px-[14px] py-[10px] text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors cursor-pointer"
                  >
                    <span>🖨️ Imprimer</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveModal('language');
                    }}
                    className="w-full px-[14px] py-[10px] text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors cursor-pointer"
                  >
                    <span>🌐 Langue</span>
                    <span className="text-[12px] font-bold text-indigo-600 dark:text-indigo-300">
                      {selectedLang}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MODALES AUTONOMES DE LA DOUBLE BARRE */}
      {activeModal && (
        <div
          className="no-print fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="alphabette-modal-title"
            className="w-full max-w-[480px] max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-slate-100 shadow-2xl p-5 sm:p-6"
          >
            {/* Modale : Toutes les applis */}
            {activeModal === 'all-apps' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 id="alphabette-modal-title" className="text-lg font-extrabold">
                      Toutes les applis
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Suite Alphabette · Touchez l’étoile pour mettre en favori
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Fermer la fenêtre Toutes les applis"
                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <ul className="divide-y divide-slate-200 dark:divide-slate-700/80">
                  {ALPHABETTE_APPS.map((app) => {
                    const isFav = favorites.includes(app.id);
                    return (
                      <li key={app.id} className="py-3 flex items-center justify-between gap-3">
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-w-0 flex-1 group"
                        >
                          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                            {app.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {app.category} · {app.tagline}
                          </div>
                        </a>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(app.id)}
                          aria-label={
                            isFav
                              ? `Retirer ${app.name} des favoris`
                              : `Ajouter ${app.name} aux favoris`
                          }
                          aria-pressed={isFav}
                          className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-lg shrink-0 cursor-pointer"
                        >
                          {isFav ? '⭐' : '☆'}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full min-h-[44px] rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-bold text-sm hover:opacity-90 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            )}

            {/* Modale : Nouveautés (NEW) */}
            {activeModal === 'new-apps' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 id="alphabette-modal-title" className="text-lg font-extrabold">
                      Nouveautés Alphabette
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Les dernières applications sorties du laboratoire
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Fermer la fenêtre Nouveautés"
                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <ul className="divide-y divide-slate-200 dark:divide-slate-700/80">
                  {newApps.map((app) => {
                    const isFav = favorites.includes(app.id);
                    return (
                      <li key={app.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-sm text-slate-900 dark:text-white">
                            {app.name}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                            {app.tagline}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(app.id)}
                          aria-label={
                            isFav
                              ? `Retirer ${app.name} des favoris`
                              : `Ajouter ${app.name} aux favoris`
                          }
                          aria-pressed={isFav}
                          className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-lg shrink-0 cursor-pointer"
                        >
                          {isFav ? '⭐' : '☆'}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full min-h-[44px] rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-bold text-sm hover:opacity-90 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            )}

            {/* Modale : Abonnement */}
            {activeModal === 'subscription' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" aria-hidden="true" />
                    <h2 id="alphabette-modal-title" className="text-lg font-extrabold">
                      Abonnement Alphabette
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Fermer la fenêtre Abonnement"
                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  Lancement de l’abonnement payant le <strong>7 mai</strong> : profitez d’un compte
                  unique, sans publicité et respectueux de votre vie privée.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Une application
                    </p>
                    <p className="text-2xl font-extrabold mt-1 tabular-nums text-slate-900 dark:text-white">
                      15 € <span className="text-sm font-semibold text-slate-500">/ an</span>
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Accès complet à votre appli préférée.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-amber-500 bg-amber-50/70 dark:bg-amber-950/30">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                      Suite complète
                    </p>
                    <p className="text-2xl font-extrabold mt-1 tabular-nums text-slate-900 dark:text-white">
                      40 € <span className="text-sm font-semibold text-slate-500 dark:text-slate-300">/ an</span>
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-200 mt-1">
                      Toutes les applis Alphabette incluses.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full min-h-[44px] rounded-xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold text-sm hover:opacity-90 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            )}

            {/* Modale : Don / Soutien */}
            {activeModal === 'donate' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600 fill-pink-600" aria-hidden="true" />
                    <h2 id="alphabette-modal-title" className="text-lg font-extrabold">
                      Soutenir Alphabette
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Fermer la fenêtre Soutenir"
                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  Alphabette développe des applications simples, lisibles et indépendantes, sans
                  revente de données. Votre soutien permet de maintenir les serveurs et créer de
                  nouveaux outils accessibles à tous.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://alphabette.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[44px] px-4 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-bold text-sm flex items-center justify-center"
                  >
                    Soutenir sur alphabette.fr
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="min-h-[44px] px-4 rounded-xl border border-slate-300 dark:border-slate-600 font-bold text-sm cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}

            {/* Modale : Installer sur mon téléphone */}
            {activeModal === 'install' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 id="alphabette-modal-title" className="text-lg font-extrabold">
                    Installer sur mon téléphone
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Fermer la fenêtre d'installation"
                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <li>
                    <strong>Sur Android (Chrome) :</strong> touchez les trois points en haut à
                    droite puis choisissez <em>« Installer l’application »</em> ou{' '}
                    <em>« Ajouter à l’écran d’accueil »</em>.
                  </li>
                  <li>
                    <strong>Sur iPhone / iPad (Safari) :</strong> touchez le bouton{' '}
                    <em>Partager</em> en bas de l’écran puis <em>« Sur l’écran d’accueil »</em>.
                  </li>
                </ol>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full min-h-[44px] rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-bold text-sm cursor-pointer"
                >
                  Compris
                </button>
              </div>
            )}

            {/* Modale : Donner mon avis */}
            {activeModal === 'feedback' && (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 id="alphabette-modal-title" className="text-lg font-extrabold">
                    Donner mon avis
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Fermer la fenêtre Donner mon avis"
                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {feedbackSent ? (
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    Merci ! Votre message a bien été pris en compte par la rédaction Alphabette.
                  </p>
                ) : (
                  <>
                    <label
                      htmlFor="alphabette-feedback-input"
                      className="block text-sm text-slate-700 dark:text-slate-200 font-medium"
                    >
                      Une idée d’amélioration ou un clin d’œil pour La Une de l’Absurde ?
                    </label>
                    <textarea
                      id="alphabette-feedback-input"
                      rows={3}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Écrivez votre message ici…"
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm cursor-pointer"
                      >
                        Envoyer
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="min-h-[44px] px-4 rounded-xl border border-slate-300 dark:border-slate-600 font-bold text-sm cursor-pointer"
                      >
                        Fermer
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}

            {/* Modale : Langue */}
            {activeModal === 'language' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 id="alphabette-modal-title" className="text-lg font-extrabold">
                    Langue de l’interface
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Fermer le sélecteur de langue"
                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {ALPHABETTE_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang.code);
                        onNotify(`Langue définie sur ${lang.label}.`);
                        setActiveModal(null);
                      }}
                      className={`w-full min-h-[44px] px-4 rounded-xl border flex items-center justify-between text-sm font-semibold cursor-pointer ${
                        selectedLang === lang.code
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-200'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-xs font-extrabold">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
