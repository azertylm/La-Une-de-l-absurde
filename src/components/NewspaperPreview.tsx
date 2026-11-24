import React from 'react';
import {
  CloudSun,
  Download,
  MessageSquareQuote,
  Newspaper,
  Radio,
  RefreshCw,
  Square,
  Tag,
} from 'lucide-react';
import { UneEdition, getStampOption } from '../utils/newspaperGenerator';

interface NewspaperPreviewProps {
  edition: UneEdition | null;
  isFlashSpeaking: boolean;
  onFlashInfo: () => void;
  onStopAudio: () => void;
  onRerollAngle: () => void;
  onDownloadPng: () => void;
  onLoadQuickExample: () => void;
}

export const NewspaperPreview: React.FC<NewspaperPreviewProps> = ({
  edition,
  isFlashSpeaking,
  onFlashInfo,
  onStopAudio,
  onRerollAngle,
  onDownloadPng,
  onLoadQuickExample,
}) => {
  if (!edition) {
    return (
      <section
        aria-label="Aperçu du journal en attente d'impression"
        className="lg:col-span-7 rounded-2xl p-6 sm:p-8 border-4 border-[#0f172a] dark:border-slate-600 newsprint-bg shadow-pop space-y-6"
      >
        <div className="border-b-4 border-double border-[#0f172a] dark:border-slate-500 pb-3 text-center">
          <div className="flex items-center justify-between text-[11px] font-extrabold border-b border-[#0f172a]/70 dark:border-slate-600 pb-1.5 mb-2 text-[#334155] dark:text-slate-300">
            <span>Édition Spéciale</span>
            <span>Rotative prête</span>
            <span>Prix : 1 Sourire</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-black tracking-tight leading-none text-[#0f172a] dark:text-white">
            LE BAZAR DU JOUR
          </h2>
          <p className="text-xs italic text-[#475569] dark:text-slate-400 mt-1.5">
            « L’information vérifiée à peu près, dramatisée avec passion »
          </p>
        </div>

        <div className="py-6 sm:py-10 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl border-2 border-[#0f172a] dark:border-slate-500 bg-amber-100 dark:bg-slate-800 text-[#0f172a] dark:text-amber-300 mx-auto flex items-center justify-center">
            <Newspaper className="w-7 h-7" aria-hidden="true" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-editorial text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white [text-wrap:balance]">
              Votre Une apparaîtra ici dès l’impression
            </h3>
            <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
              Choisissez un cliché, réglez le degré de dramatisation, tamponnez votre scoop et
              lancez la rotative.
            </p>
          </div>
          <button
            type="button"
            onClick={onLoadQuickExample}
            className="min-h-[44px] px-5 py-2.5 rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-[#0f172a] dark:text-white font-extrabold text-sm shadow-pop-sm cursor-pointer transition-colors"
          >
            Prévisualiser un exemple complet
          </button>
        </div>
      </section>
    );
  }

  const activeStamp = getStampOption(edition.stamp);
  const photoFilterClass =
    edition.photoFilter === 'bw'
      ? 'grayscale contrast-125'
      : edition.photoFilter === 'vintage'
        ? 'sepia-[.65] contrast-110 brightness-95'
        : '';

  return (
    <article
      id="newspaperCard"
      aria-label="Journal imprimé La Une de l'Absurde — Le Bazar du Jour"
      className="print-broadsheet lg:col-span-7 rounded-2xl p-5 sm:p-7 border-4 border-[#0f172a] dark:border-slate-500 newsprint-bg shadow-pop space-y-4"
    >
      {/* En-tête du journal */}
      <div className="border-b-4 border-double border-[#0f172a] dark:border-slate-500 pb-2.5 text-center">
        <div className="flex items-center justify-between gap-2 text-[11px] font-extrabold border-b border-[#0f172a] dark:border-slate-600 pb-1.5 mb-2 text-[#334155] dark:text-slate-300 tabular-nums">
          <span>Édition Spéciale · N° {edition.editionNumber}</span>
          <span id="newsDate" className="capitalize truncate">
            {edition.date}
          </span>
          <span className="whitespace-nowrap">Prix : 1 Sourire</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-black tracking-tight leading-none text-[#0f172a] dark:text-white">
          LE BAZAR DU JOUR
        </h2>
        <p className="text-xs italic text-[#475569] dark:text-slate-400 mt-1">
          « L’information vérifiée à peu près, dramatisée avec passion »
        </p>
      </div>

      {/* Titre & Chapô */}
      <div className="space-y-1.5 text-center">
        <h3
          id="newsHeadline"
          className="editorial-headline font-editorial text-2xl sm:text-[28px] font-black uppercase leading-tight text-red-700 dark:text-red-400 [text-wrap:balance]"
        >
          {edition.headline}
        </h3>
        <p
          id="newsSubtitle"
          className="font-editorial italic text-base sm:text-lg font-bold text-[#1e293b] dark:text-slate-200 leading-snug"
        >
          {edition.subtitle}
        </p>
      </div>

      {/* Photo de Une avec filtre presse et tampon */}
      <figure className="space-y-1.5">
        <div className="relative overflow-hidden rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-slate-200 dark:bg-slate-800">
          <img
            id="newsPhoto"
            src={edition.photoDataUrl}
            alt="Illustration de la Une du journal Le Bazar du Jour"
            referrerPolicy="no-referrer"
            className={`w-full max-h-[300px] object-cover transition-all ${photoFilterClass}`}
          />
          {activeStamp.id !== 'none' && (
            <div
              data-testid="press-stamp"
              style={{
                borderColor: activeStamp.colorHex,
                color: activeStamp.colorHex,
              }}
              className="pointer-events-none absolute top-3.5 right-3.5 px-3 py-1 rounded border-[3px] bg-white/92 dark:bg-slate-950/90 font-black uppercase tracking-wider text-xs sm:text-sm -rotate-6 shadow-sm"
            >
              {activeStamp.stampText}
            </div>
          )}
        </div>
        <figcaption
          id="newsCaption"
          className="text-xs italic text-[#475569] dark:text-slate-400 text-center"
        >
          {edition.caption}
        </figcaption>
      </figure>

      {/* Article 2 colonnes avec lettrine éditoriale */}
      <div
        id="newsArticle"
        className="editorial-article columns-1 sm:columns-2 gap-6 text-[15px] leading-relaxed text-[#0f172a] dark:text-slate-100 border-t border-[#0f172a]/20 dark:border-slate-600/60 pt-3.5 whitespace-pre-line first-letter:font-editorial first-letter:text-4xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-red-700 dark:first-letter:text-red-400"
      >
        {edition.article}
      </div>

      {/* Encadrés loufoques : Témoin Improbable + Petite Annonce & Horoscope */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-amber-50/90 dark:bg-slate-800/80 space-y-1.5">
          <p className="text-xs font-extrabold uppercase tracking-wide text-[#713f12] dark:text-amber-300 flex items-center gap-1.5">
            <MessageSquareQuote className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Parole de témoin</span>
          </p>
          <p
            id="newsEyewitness"
            className="font-editorial italic text-sm font-bold text-[#0f172a] dark:text-white leading-snug"
          >
            {edition.eyewitness.quote}
          </p>
          <p className="text-xs text-[#475569] dark:text-slate-300">
            — {edition.eyewitness.witness}
          </p>
        </div>

        <div className="p-3.5 rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-white/90 dark:bg-slate-800/80 space-y-1.5">
          <p className="text-xs font-extrabold uppercase tracking-wide text-[#0f172a] dark:text-amber-300 flex items-center gap-1.5">
            <Tag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Petite annonce & Astres</span>
          </p>
          <p
            id="newsClassified"
            className="text-xs font-semibold text-[#1e293b] dark:text-slate-100 leading-relaxed"
          >
            {edition.classifiedAd}
          </p>
          <p className="text-xs italic text-[#475569] dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-700">
            Horoscope express : {edition.horoscope}
          </p>
        </div>
      </div>

      {/* Encadré Météo Absurde du Jour */}
      <div className="p-3.5 rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-sky-50 dark:bg-slate-800/90 flex items-start gap-3">
        <CloudSun
          className="w-6 h-6 text-sky-700 dark:text-sky-300 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-[#0f172a] dark:text-sky-200">
            Météo Absurde du Jour
          </p>
          <p
            id="newsWeather"
            className="text-sm font-medium text-[#1e293b] dark:text-slate-200 mt-0.5 leading-relaxed"
          >
            {edition.weather}
          </p>
        </div>
      </div>

      {/* Barre d'actions du journal */}
      <div className="no-print space-y-2 pt-3 border-t border-[#0f172a]/20 dark:border-slate-600/60">
        <div className="flex items-center gap-2">
          <button
            id="btnFlashInfo"
            type="button"
            onClick={onFlashInfo}
            aria-pressed={isFlashSpeaking}
            className={`flex-1 min-h-[46px] px-3.5 py-2 rounded-xl border-2 border-[#0f172a] dark:border-red-400 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              isFlashSpeaking
                ? 'bg-red-800 text-yellow-200'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <Radio className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{isFlashSpeaking ? 'Flash Info en cours…' : 'Mode Flash Info'}</span>
          </button>

          <button
            id="btnUneStopAudio"
            type="button"
            onClick={onStopAudio}
            aria-label="Arrêter le Flash Info"
            className="w-[46px] h-[46px] rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#0f172a] dark:text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          >
            <Square className="w-4 h-4 fill-current" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onRerollAngle}
            aria-label="Générer une autre variante de titre, témoin et météo"
            title="Nouvelle variante"
            className="min-h-[46px] px-3 rounded-xl border-2 border-[#0f172a] dark:border-slate-500 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#0f172a] dark:text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Autre angle</span>
          </button>
        </div>

        <button
          id="btnUneDownload"
          type="button"
          onClick={onDownloadPng}
          className="w-full min-h-[46px] px-4 py-2 rounded-xl border-2 border-[#0f172a] dark:border-amber-400 bg-yellow-400 hover:bg-yellow-300 text-[#0f172a] font-extrabold text-sm shadow-pop-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Télécharger la Une (PNG)</span>
        </button>
      </div>
    </article>
  );
};
