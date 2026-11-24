import React from 'react';
import { Trash2 } from 'lucide-react';
import { UneEdition } from '../utils/newspaperGenerator';

interface EditionArchiveProps {
  editions: UneEdition[];
  activeId: string | null;
  onSelect: (edition: UneEdition) => void;
  onDelete: (id: string) => void;
}

export const EditionArchive: React.FC<EditionArchiveProps> = ({
  editions,
  activeId,
  onSelect,
  onDelete,
}) => {
  if (editions.length === 0) return null;

  return (
    <section
      aria-labelledby="archive-heading"
      className="no-print max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <div>
          <h2
            id="archive-heading"
            className="font-editorial text-xl font-black text-[#0f172a] dark:text-white"
          >
            Archives de la rédaction
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Vos éditions récentes conservées sur cet appareil ({editions.length})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {editions.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              className={`rounded-xl border-2 p-3 flex items-center gap-3 transition-colors ${
                isActive
                  ? 'border-[#0f172a] dark:border-amber-400 bg-amber-50/80 dark:bg-slate-800'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131b2b]'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 rounded-lg"
              >
                <img
                  src={item.photoDataUrl}
                  alt={`Miniature édition n° ${item.editionNumber}`}
                  referrerPolicy="no-referrer"
                  className="w-16 h-14 rounded-lg object-cover border border-slate-300 dark:border-slate-600 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                    N° {item.editionNumber} · {item.date}
                  </p>
                  <p className="font-editorial font-bold text-sm text-[#0f172a] dark:text-white truncate">
                    {item.headline}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
                    {item.anecdote}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onDelete(item.id)}
                aria-label={`Supprimer l'édition numéro ${item.editionNumber}`}
                className="w-9 h-9 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
