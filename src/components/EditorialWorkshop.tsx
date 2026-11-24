import React, { useRef } from 'react';
import {
  Camera,
  Dices,
  Flame,
  Image as ImageIcon,
  Mic,
  MicOff,
  Newspaper,
  Shuffle,
  Stamp,
  Trash2,
} from 'lucide-react';
import {
  ABSURDITY_LEVELS,
  EditorialTone,
  PHOTO_FILTERS,
  PRESS_STAMPS,
  PhotoFilterId,
  PressStampId,
  TONE_LABELS,
} from '../utils/newspaperGenerator';

interface EditorialWorkshopProps {
  photoDataUrl: string | null;
  anecdote: string;
  tone: EditorialTone;
  absurdityLevel: 1 | 2 | 3 | 4 | 5;
  stamp: PressStampId;
  photoFilter: PhotoFilterId;
  isRecording: boolean;
  validationError: string | null;
  isSimpleMode: boolean;
  onSelectFile: (file: File) => void;
  onClearPhoto: () => void;
  onUseDemoPhoto: () => void;
  onChangeAnecdote: (value: string) => void;
  onUseDemoAnecdote: () => void;
  onGenerateLoufoqueScoop: () => void;
  onToggleDictation: () => void;
  onChangeTone: (tone: EditorialTone) => void;
  onChangeAbsurdityLevel: (level: 1 | 2 | 3 | 4 | 5) => void;
  onChangeStamp: (stamp: PressStampId) => void;
  onChangePhotoFilter: (filter: PhotoFilterId) => void;
  onPrintUne: () => void;
}

const TONE_KEYS: EditorialTone[] = ['scandale', 'urgence', 'champetre'];

export const EditorialWorkshop: React.FC<EditorialWorkshopProps> = ({
  photoDataUrl,
  anecdote,
  tone,
  absurdityLevel,
  stamp,
  photoFilter,
  isRecording,
  validationError,
  isSimpleMode,
  onSelectFile,
  onClearPhoto,
  onUseDemoPhoto,
  onChangeAnecdote,
  onUseDemoAnecdote,
  onGenerateLoufoqueScoop,
  onToggleDictation,
  onChangeTone,
  onChangeAbsurdityLevel,
  onChangeStamp,
  onChangePhotoFilter,
  onPrintUne,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const currentAbsurdity =
    ABSURDITY_LEVELS.find((item) => item.level === absurdityLevel) ?? ABSURDITY_LEVELS[2];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelectFile(file);
    }
    event.target.value = '';
  };

  const photoFilterClass =
    photoFilter === 'bw'
      ? 'grayscale contrast-125'
      : photoFilter === 'vintage'
        ? 'sepia-[.65] contrast-110 brightness-95'
        : '';

  return (
    <section
      aria-labelledby="workshop-heading"
      className="no-print lg:col-span-5 rounded-2xl p-5 sm:p-6 border-2 border-[#0f172a] dark:border-slate-600 bg-[#fefce8] dark:bg-[#161f30] shadow-pop space-y-5"
    >
      <div className="space-y-1.5">
        <p className="text-xs font-extrabold tracking-wide text-[#713f12] dark:text-amber-300">
          Presse Satirique · Le Bazar du Jour
        </p>
        <h1
          id="workshop-heading"
          className="font-editorial text-2xl sm:text-[30px] font-black leading-tight text-[#0f172a] dark:text-white [text-wrap:balance]"
        >
          La Une de l’Absurde
        </h1>
        <p className="text-[15px] text-[#334155] dark:text-slate-300 leading-relaxed">
          Transformez une photo du quotidien et deux phrases banales en scandale loufoque à la Une.
        </p>
      </div>

      {/* Zone Photo */}
      <div className="space-y-2.5">
        <div className="relative">
          <label
            htmlFor="uneFileInput"
            className="block cursor-pointer rounded-xl border-2 border-dashed border-[#0f172a] dark:border-slate-500 bg-white dark:bg-[#0f172a] p-4 text-center hover:bg-amber-50/70 dark:hover:bg-slate-800/80 transition-colors focus-within:ring-2 focus-within:ring-indigo-500"
          >
            <input
              ref={fileInputRef}
              id="uneFileInput"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="sr-only"
            />
            {photoDataUrl ? (
              <div className="space-y-2">
                <img
                  src={photoDataUrl}
                  alt="Aperçu de la photo choisie pour la Une"
                  referrerPolicy="no-referrer"
                  className={`max-h-52 w-full mx-auto rounded-lg object-cover border-2 border-[#0f172a] dark:border-slate-600 transition-all ${photoFilterClass}`}
                />
                <span className="inline-block text-xs font-bold text-slate-600 dark:text-slate-300">
                  Touchez l’image pour la remplacer
                </span>
              </div>
            ) : (
              <div className="py-4 space-y-1.5">
                <div className="w-11 h-11 rounded-full bg-amber-100 dark:bg-slate-800 text-[#0f172a] dark:text-amber-300 mx-auto flex items-center justify-center">
                  <Camera className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="font-extrabold text-[15px] sm:text-base text-[#0f172a] dark:text-white">
                  Prendre ou importer une photo
                </p>
                <p className="text-xs text-[#64748b] dark:text-slate-400">
                  Un repas, une partie de pétanque, un vélo en panne…
                </p>
              </div>
            )}
          </label>

          {photoDataUrl && (
            <button
              type="button"
              onClick={onClearPhoto}
              aria-label="Retirer la photo sélectionnée"
              className="absolute top-2.5 right-2.5 w-9 h-9 rounded-lg border-2 border-[#0f172a] bg-white/95 dark:bg-slate-900/95 text-[#0f172a] dark:text-slate-100 hover:bg-red-50 dark:hover:bg-red-950/60 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <button
          id="btnUneDemoPhoto"
          type="button"
          onClick={onUseDemoPhoto}
          className="w-full min-h-[44px] px-4 py-2 rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#0f172a] dark:text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <ImageIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Utiliser une photo démo illustrée</span>
        </button>

        {/* Filtre Photo Presse */}
        {!isSimpleMode && (
          <div className="space-y-1.5 pt-0.5">
            <span className="block text-xs font-extrabold text-[#334155] dark:text-slate-300">
              Tirage photo
            </span>
            <div
              role="group"
              aria-label="Tirage photo"
              className="grid grid-cols-3 gap-1.5 p-1 rounded-xl border-2 border-[#0f172a] dark:border-slate-600 bg-white dark:bg-slate-900"
            >
              {PHOTO_FILTERS.map((opt) => {
                const active = photoFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangePhotoFilter(opt.id)}
                    aria-pressed={active}
                    className={`min-h-[34px] px-2 rounded-lg text-xs font-extrabold whitespace-nowrap cursor-pointer transition-colors ${
                      active
                        ? 'bg-[#0f172a] dark:bg-amber-400 text-yellow-300 dark:text-[#0f172a]'
                        : 'text-[#334155] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Zone Anecdote */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <label
            htmlFor="uneAnecdote"
            className="text-xs font-extrabold text-[#334155] dark:text-slate-200"
          >
            Votre anecdote (2 phrases)
          </label>
          <div className="flex items-center gap-1.5">
            <button
              id="btnUneDemoAnecdote"
              type="button"
              onClick={onUseDemoAnecdote}
              className="min-h-[34px] px-2.5 rounded-lg border-2 border-[#0f172a] dark:border-slate-500 bg-white dark:bg-slate-800 text-[#0f172a] dark:text-white font-bold text-xs hover:bg-amber-200 dark:hover:bg-slate-700 inline-flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
            >
              <Dices className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Démo</span>
            </button>
            <button
              id="btnLoufoqueScoop"
              type="button"
              onClick={onGenerateLoufoqueScoop}
              className="min-h-[34px] px-2.5 rounded-lg border-2 border-[#0f172a] dark:border-amber-400 bg-amber-300 dark:bg-amber-500/20 text-[#0f172a] dark:text-amber-200 font-extrabold text-xs hover:bg-amber-400 dark:hover:bg-amber-500/30 inline-flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
            >
              <Shuffle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Scoop loufoque</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <textarea
            id="uneAnecdote"
            rows={3}
            value={anecdote}
            onChange={(e) => onChangeAnecdote(e.target.value)}
            aria-invalid={Boolean(validationError)}
            aria-describedby={validationError ? 'anecdote-error' : undefined}
            placeholder="Ex : Tonton Michel a raté le cochonnet de trois mètres et a accusé la rotation de la Terre…"
            className="flex-1 p-3.5 rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium text-[15px] sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            id="btnUneMic"
            type="button"
            onClick={onToggleDictation}
            aria-pressed={isRecording}
            aria-label={
              isRecording ? 'Arrêter la dictée vocale' : 'Dicter votre anecdote au micro'
            }
            className={`w-[50px] h-[50px] rounded-xl border-2 border-[#0f172a] dark:border-slate-400 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-pop-sm shrink-0 cursor-pointer transition-colors ${
              isRecording ? 'mic-recording' : ''
            }`}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Mic className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {validationError && (
          <p
            id="anecdote-error"
            role="alert"
            className="text-xs font-bold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 rounded-lg px-3 py-2"
          >
            {validationError}
          </p>
        )}
      </div>

      {/* Réglages loufoques (masqués en Mode simple pour épurer au maximum) */}
      {!isSimpleMode && (
        <div className="space-y-4 pt-1 border-t border-[#0f172a]/15 dark:border-slate-700/80">
          {/* Ton éditorial */}
          <div className="space-y-1.5">
            <span className="block text-xs font-extrabold text-[#334155] dark:text-slate-300">
              Ton de la rédaction
            </span>
            <div
              role="group"
              aria-label="Ton de la rédaction"
              className="grid grid-cols-3 gap-1.5 p-1 rounded-xl border-2 border-[#0f172a] dark:border-slate-600 bg-white dark:bg-slate-900"
            >
              {TONE_KEYS.map((key) => {
                const active = tone === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onChangeTone(key)}
                    aria-pressed={active}
                    className={`min-h-[38px] px-2 py-1.5 rounded-lg text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#0f172a] dark:bg-amber-400 text-yellow-300 dark:text-[#0f172a]'
                        : 'text-[#334155] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {TONE_LABELS[key].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Thermomètre de Mauvaise Foi / Dramatisation (1 à 5) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-[#334155] dark:text-slate-300 inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-600 dark:text-red-400" aria-hidden="true" />
                <span>Degré de dramatisation</span>
              </span>
              <span className="text-xs font-extrabold text-red-700 dark:text-amber-300 tabular-nums">
                {absurdityLevel}/5 · {currentAbsurdity.label}
              </span>
            </div>
            <div
              role="group"
              aria-label="Degré de dramatisation de 1 à 5"
              className="grid grid-cols-5 gap-1.5"
            >
              {ABSURDITY_LEVELS.map((item) => {
                const active = absurdityLevel === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => onChangeAbsurdityLevel(item.level)}
                    aria-pressed={active}
                    aria-label={`Niveau ${item.level} sur 5 : ${item.label}`}
                    className={`min-h-[38px] rounded-lg border-2 font-extrabold text-sm tabular-nums cursor-pointer transition-colors ${
                      active
                        ? 'border-[#0f172a] dark:border-amber-400 bg-red-600 text-white'
                        : 'border-[#0f172a]/35 dark:border-slate-600 bg-white dark:bg-slate-900 text-[#0f172a] dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.level}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">{currentAbsurdity.kicker}</p>
          </div>

          {/* Tampon de la rédaction */}
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold text-[#334155] dark:text-slate-300 inline-flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-[#0f172a] dark:text-amber-300" aria-hidden="true" />
              <span>Tampon de la rédaction</span>
            </span>
            <div
              role="group"
              aria-label="Tampon de la rédaction"
              className="grid grid-cols-3 gap-1.5"
            >
              {PRESS_STAMPS.map((opt) => {
                const active = stamp === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeStamp(opt.id)}
                    aria-pressed={active}
                    className={`min-h-[36px] px-2 rounded-lg border-2 text-xs font-extrabold whitespace-nowrap cursor-pointer transition-colors ${
                      active
                        ? 'border-[#0f172a] dark:border-amber-400 bg-[#0f172a] dark:bg-amber-400 text-yellow-300 dark:text-[#0f172a]'
                        : 'border-[#0f172a]/30 dark:border-slate-600 bg-white dark:bg-slate-900 text-[#334155] dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bouton principal Imprimer la Une */}
      <button
        id="btnPrintUne"
        type="button"
        onClick={onPrintUne}
        className="w-full min-h-[54px] px-5 py-3 rounded-xl border-2 border-[#0f172a] dark:border-amber-400 bg-[#0f172a] dark:bg-amber-400 hover:bg-slate-800 dark:hover:bg-amber-300 text-yellow-300 dark:text-[#0f172a] font-extrabold text-base shadow-pop active:translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
      >
        <Newspaper className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span>Imprimer la Une</span>
      </button>
    </section>
  );
};
