import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AlphabetteHeader } from './components/AlphabetteHeader';
import { EditorialWorkshop } from './components/EditorialWorkshop';
import { NewspaperPreview } from './components/NewspaperPreview';
import { EditionArchive } from './components/EditionArchive';
import {
  DEMO_ANECDOTES,
  DEMO_PHOTO_SCENES,
  EditorialTone,
  PhotoFilterId,
  PressStampId,
  UneEdition,
  buildSatiricalUne,
  formatFrenchEditionDate,
  generateRandomLoufoqueAnecdote,
  pickNextDemoAnecdote,
  pickNextDemoScene,
  validateAnecdote,
} from './utils/newspaperGenerator';
import {
  playNewsJingle,
  playShutter,
  playStampSound,
  speakFrench,
  stopSpeech,
} from './utils/audioEffects';
import { createDemoImage, exportNewspaperPNG, processImageFile } from './utils/canvasMedia';

const STORAGE_DARK_KEY = 'alphabette_dark_mode_v1';
const STORAGE_BIG_KEY = 'alphabette_big_mode_v1';
const STORAGE_ARCHIVE_KEY = 'une_absurde_editions_v2';

interface BrowserSpeechRecognition {
  lang: string;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_DARK_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isBigMode, setIsBigMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_BIG_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
  const [isHeaderSpeaking, setIsHeaderSpeaking] = useState<boolean>(false);
  const [isFlashSpeaking, setIsFlashSpeaking] = useState<boolean>(false);

  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [lastDemoSceneId, setLastDemoSceneId] = useState<string | null>(null);
  const [anecdote, setAnecdote] = useState<string>('');
  const [tone, setTone] = useState<EditorialTone>('scandale');
  const [absurdityLevel, setAbsurdityLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [stamp, setStamp] = useState<PressStampId>('scoop');
  const [photoFilter, setPhotoFilter] = useState<PhotoFilterId>('color');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const [editions, setEditions] = useState<UneEdition[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ARCHIVE_KEY);
      return saved ? (JSON.parse(saved) as UneEdition[]) : [];
    } catch {
      return [];
    }
  });
  const [currentEdition, setCurrentEdition] = useState<UneEdition | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const flashTimerRef = useRef<number | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const variantCounterRef = useRef<number>(1);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_DARK_KEY, String(isDark));
    } catch {
      // Ignore storage errors
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BIG_KEY, String(isBigMode));
    } catch {
      // Ignore storage errors
    }
  }, [isBigMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ARCHIVE_KEY, JSON.stringify(editions.slice(0, 6)));
    } catch {
      // Ignore storage quota errors
    }
  }, [editions]);

  useEffect(() => {
    return () => {
      stopSpeech();
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
    };
  }, []);

  const cancelAllSpeech = useCallback(() => {
    if (flashTimerRef.current) {
      window.clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
    }
    stopSpeech();
    setIsHeaderSpeaking(false);
    setIsFlashSpeaking(false);
  }, []);

  const handleToggleHeaderReadAloud = useCallback(() => {
    if (isHeaderSpeaking) {
      cancelAllSpeech();
      return;
    }
    cancelAllSpeech();
    const textToRead = currentEdition
      ? `La Une de l'Absurde, Le Bazar du Jour, édition du ${currentEdition.date}. ${currentEdition.headline}. ${currentEdition.subtitle}. ${currentEdition.article}. Témoignage recueilli : ${currentEdition.eyewitness.quote}. Météo absurde du jour : ${currentEdition.weather}`
      : `La Une de l'Absurde. Transformez une photo du quotidien et deux phrases banales en scandale loufoque à la Une du Bazar du Jour.`;

    const started = speakFrench(textToRead, {
      rate: 1.0,
      onStart: () => setIsHeaderSpeaking(true),
      onEnd: () => setIsHeaderSpeaking(false),
      onError: () => setIsHeaderSpeaking(false),
    });

    if (!started) {
      showToast('Synthèse vocale indisponible sur ce navigateur.');
    }
  }, [cancelAllSpeech, currentEdition, isHeaderSpeaking, showToast]);

  const handleEnableSimpleMode = useCallback(() => {
    setIsSimpleMode((prev) => {
      const next = !prev;
      if (next) {
        setIsBigMode(true);
        showToast('Mode simple activé : lecture agrandie et interface épurée.');
      } else {
        showToast('Mode simple désactivé.');
      }
      return next;
    });
  }, [showToast]);

  const handleSelectFile = useCallback(
    async (file: File) => {
      try {
        playShutter();
        const dataUrl = await processImageFile(file);
        setPhotoDataUrl(dataUrl);
        setLastDemoSceneId(null);
        showToast('Photo chargée pour la Une !');
      } catch {
        showToast('Impossible de charger cette photo. Essayez un autre format.');
      }
    },
    [showToast]
  );

  const handleUseDemoPhoto = useCallback(() => {
    playShutter();
    const scene = pickNextDemoScene(lastDemoSceneId);
    const dataUrl = createDemoImage(scene);
    setPhotoDataUrl(dataUrl);
    setLastDemoSceneId(scene.id);
    showToast(`Photo démo « ${scene.title} » prête !`);
  }, [lastDemoSceneId, showToast]);

  const handleUseDemoAnecdote = useCallback(() => {
    setAnecdote((prev) => pickNextDemoAnecdote(prev));
    setValidationError(null);
  }, []);

  const handleGenerateLoufoqueScoop = useCallback(() => {
    const generated = generateRandomLoufoqueAnecdote();
    setAnecdote(generated);
    setValidationError(null);
    showToast('Scoop 100 % loufoque inventé par la rédaction !');
  }, [showToast]);

  const handleChangeStamp = useCallback((nextStamp: PressStampId) => {
    setStamp(nextStamp);
    if (nextStamp !== 'none') {
      playStampSound();
    }
    setCurrentEdition((prev) => (prev ? { ...prev, stamp: nextStamp } : prev));
  }, []);

  const handleChangePhotoFilter = useCallback((nextFilter: PhotoFilterId) => {
    setPhotoFilter(nextFilter);
    setCurrentEdition((prev) => (prev ? { ...prev, photoFilter: nextFilter } : prev));
  }, []);

  const handleToggleDictation = useCallback(() => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const win = window as unknown as {
      SpeechRecognition?: new () => BrowserSpeechRecognition;
      webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
    };
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      showToast('Dictée vocale indisponible sur ce navigateur.');
      return;
    }

    const rec = new SpeechRec();
    rec.lang = 'fr-FR';
    recognitionRef.current = rec;
    setIsRecording(true);
    rec.onresult = (ev) => {
      const transcript = ev.results?.[0]?.[0]?.transcript?.trim();
      if (transcript) {
        setAnecdote((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setValidationError(null);
      }
    };
    rec.onend = () => {
      setIsRecording(false);
    };
    rec.onerror = () => {
      setIsRecording(false);
      showToast('Dictée interrompue. Vérifiez l’accès au micro.');
    };
    rec.start();
  }, [isRecording, showToast]);

  const printEditionFromInputs = useCallback(
    (
      inputAnecdote: string,
      inputPhoto: string | null,
      inputTone: EditorialTone,
      inputAbsurdity: 1 | 2 | 3 | 4 | 5,
      inputStamp: PressStampId,
      inputFilter: PhotoFilterId
    ) => {
      cancelAllSpeech();
      const validation = validateAnecdote(inputAnecdote);
      if (!validation.valid) {
        const msg = validation.error || 'Écrivez une anecdote avant d’imprimer.';
        setValidationError(msg);
        showToast(msg);
        return;
      }

      setValidationError(null);
      let finalPhoto = inputPhoto;
      if (!finalPhoto) {
        finalPhoto = createDemoImage({
          id: 'flash-special',
          bg1: '#DC2626',
          bg2: '#F59E0B',
          accent: '#FEF08A',
          kicker: 'ÉDITION SPÉCIALE · LA UNE DE L’ABSURDE',
          title: 'FLASH SPÉCIAL',
          subtitle: 'Image exclusive de la rédaction',
        });
        setPhotoDataUrl(finalPhoto);
      }

      if (inputStamp !== 'none') {
        playStampSound();
      }

      variantCounterRef.current += 1;
      const generated = buildSatiricalUne(inputAnecdote, {
        tone: inputTone,
        absurdityLevel: inputAbsurdity,
        stamp: inputStamp,
        photoFilter: inputFilter,
      });
      const edition: UneEdition = {
        ...generated,
        id: `une-${Date.now()}-${variantCounterRef.current}`,
        date: formatFrenchEditionDate(new Date()),
        photoDataUrl: finalPhoto,
        anecdote: inputAnecdote.trim(),
        createdAt: Date.now(),
      };

      setCurrentEdition(edition);
      setEditions((prev) => [edition, ...prev.filter((item) => item.id !== edition.id)].slice(0, 6));
      showToast(`Édition n° ${edition.editionNumber} sortie des rotatives !`);
    },
    [cancelAllSpeech, showToast]
  );

  const handlePrintUne = useCallback(() => {
    printEditionFromInputs(anecdote, photoDataUrl, tone, absurdityLevel, stamp, photoFilter);
  }, [absurdityLevel, anecdote, photoDataUrl, photoFilter, printEditionFromInputs, stamp, tone]);

  const handleLoadQuickExample = useCallback(() => {
    playShutter();
    const demoScene = DEMO_PHOTO_SCENES[0];
    const demoPhoto = createDemoImage(demoScene);
    const demoText = DEMO_ANECDOTES[0];
    setPhotoDataUrl(demoPhoto);
    setLastDemoSceneId(demoScene.id);
    setAnecdote(demoText);
    printEditionFromInputs(demoText, demoPhoto, tone, absurdityLevel, stamp, photoFilter);
  }, [absurdityLevel, photoFilter, printEditionFromInputs, stamp, tone]);

  const handleRerollAngle = useCallback(() => {
    if (!currentEdition) return;
    cancelAllSpeech();
    variantCounterRef.current += 1;
    const regenerated = buildSatiricalUne(currentEdition.anecdote, {
      tone,
      absurdityLevel,
      stamp,
      photoFilter,
      variantSeed: variantCounterRef.current,
    });
    const updated: UneEdition = {
      ...currentEdition,
      ...regenerated,
    };
    setCurrentEdition(updated);
    setEditions((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    showToast('Nouvelle variante loufoque imprimée !');
  }, [absurdityLevel, cancelAllSpeech, currentEdition, photoFilter, showToast, stamp, tone]);

  const handleFlashInfo = useCallback(() => {
    if (!currentEdition) return;
    cancelAllSpeech();
    playNewsJingle();
    setIsFlashSpeaking(true);

    flashTimerRef.current = window.setTimeout(() => {
      const ok = speakFrench(
        `Flash info spécial La Une de l'Absurde ! ${currentEdition.headline}. ${currentEdition.subtitle}. ${currentEdition.article}. Et voici la réaction d'un témoin : ${currentEdition.eyewitness.quote}, selon ${currentEdition.eyewitness.witness}. Côté météo : ${currentEdition.weather}`,
        {
          rate: 1.05,
          onStart: () => setIsFlashSpeaking(true),
          onEnd: () => setIsFlashSpeaking(false),
          onError: () => setIsFlashSpeaking(false),
        }
      );
      if (!ok) {
        setIsFlashSpeaking(false);
        showToast('Synthèse vocale indisponible sur ce navigateur.');
      }
    }, 1150);
  }, [cancelAllSpeech, currentEdition, showToast]);

  const handleDownloadPng = useCallback(async () => {
    if (!currentEdition) return;
    const ok = await exportNewspaperPNG(currentEdition);
    showToast(ok ? 'Image PNG téléchargée !' : 'Échec de la génération PNG.');
  }, [currentEdition, showToast]);

  const handleResetHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectArchive = useCallback(
    (edition: UneEdition) => {
      cancelAllSpeech();
      setCurrentEdition(edition);
      setAnecdote(edition.anecdote);
      setPhotoDataUrl(edition.photoDataUrl);
      setTone(edition.tone);
      setAbsurdityLevel(edition.absurdityLevel ?? 3);
      setStamp(edition.stamp ?? 'scoop');
      setPhotoFilter(edition.photoFilter ?? 'color');
      setValidationError(null);
      showToast(`Édition n° ${edition.editionNumber} rouverte.`);
    },
    [cancelAllSpeech, showToast]
  );

  const handleDeleteArchive = useCallback(
    (id: string) => {
      setEditions((prev) => prev.filter((item) => item.id !== id));
      if (currentEdition?.id === id) {
        setCurrentEdition(null);
      }
      showToast('Édition retirée des archives.');
    },
    [currentEdition?.id, showToast]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1220] text-[#0F172A] dark:text-[#F1F5F9] transition-colors">
      <AlphabetteHeader
        appTitle="La Une de l'Absurde"
        appSubtitle="LE BAZAR DU JOUR"
        isDark={isDark}
        onToggleDark={() => setIsDark((prev) => !prev)}
        isBigMode={isBigMode}
        onToggleBigMode={() => setIsBigMode((prev) => !prev)}
        isSimpleMode={isSimpleMode}
        onEnableSimpleMode={handleEnableSimpleMode}
        isSpeaking={isHeaderSpeaking}
        onToggleReadAloud={handleToggleHeaderReadAloud}
        onResetHome={handleResetHome}
        onNotify={showToast}
      />

      <main
        className={`app-main-content flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ${
          isBigMode ? 'big-mode' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <EditorialWorkshop
            photoDataUrl={photoDataUrl}
            anecdote={anecdote}
            tone={tone}
            absurdityLevel={absurdityLevel}
            stamp={stamp}
            photoFilter={photoFilter}
            isRecording={isRecording}
            validationError={validationError}
            isSimpleMode={isSimpleMode}
            onSelectFile={handleSelectFile}
            onClearPhoto={() => setPhotoDataUrl(null)}
            onUseDemoPhoto={handleUseDemoPhoto}
            onChangeAnecdote={(val) => {
              setAnecdote(val);
              if (validationError) setValidationError(null);
            }}
            onUseDemoAnecdote={handleUseDemoAnecdote}
            onGenerateLoufoqueScoop={handleGenerateLoufoqueScoop}
            onToggleDictation={handleToggleDictation}
            onChangeTone={setTone}
            onChangeAbsurdityLevel={setAbsurdityLevel}
            onChangeStamp={handleChangeStamp}
            onChangePhotoFilter={handleChangePhotoFilter}
            onPrintUne={handlePrintUne}
          />

          <NewspaperPreview
            edition={currentEdition}
            isFlashSpeaking={isFlashSpeaking}
            onFlashInfo={handleFlashInfo}
            onStopAudio={cancelAllSpeech}
            onRerollAngle={handleRerollAngle}
            onDownloadPng={handleDownloadPng}
            onLoadQuickExample={handleLoadQuickExample}
          />
        </div>

        <EditionArchive
          editions={editions}
          activeId={currentEdition?.id ?? null}
          onSelect={handleSelectArchive}
          onDelete={handleDeleteArchive}
        />
      </main>

      <footer className="no-print py-5 px-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80">
        La Une de l’Absurde · Le Bazar du Jour · Écosystème Alphabette
      </footer>

      {toastMessage && (
        <div
          id="toast"
          role="status"
          aria-live="polite"
          className="no-print fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[92vw] px-4 py-2.5 rounded-xl bg-[#0f172a] dark:bg-slate-900 text-white font-bold text-sm border-2 border-yellow-400 shadow-lg text-center"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
