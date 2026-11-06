import React, { useState } from 'react';
import { TextChangeItem, Character } from '../types/game';
import { sound } from '../utils/audio';
import { FileText, CheckCircle2, Search, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

interface ProclamationPuzzleProps {
  snippets: { id: number; text: string; correctOrder: number }[];
  textChanges: TextChangeItem[];
  hero: Character;
  onComplete: (score: number, accuracy: number) => void;
}

export const ProclamationPuzzle: React.FC<ProclamationPuzzleProps> = ({
  snippets,
  textChanges,
  hero,
  onComplete
}) => {
  // Phase 1: Puzzle Ordering
  // Phase 2: Historic Spellings Discovery
  const [phase, setPhase] = useState<'ordering' | 'investigation'>('ordering');

  // Ordering state
  const [orderedSnippets, setOrderedSnippets] = useState(() => {
    // start shuffled
    return [...snippets].sort(() => Math.random() - 0.5);
  });
  const [isOrderingCorrect, setIsOrderingCorrect] = useState(false);

  // Investigation state
  const [changesList, setChangesList] = useState(textChanges);
  const [activeExplanation, setActiveExplanation] = useState<string | null>(null);

  const moveSnippet = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newItems = [...orderedSnippets];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setOrderedSnippets(newItems);
  };

  const verifyOrder = () => {
    const isCorrect = orderedSnippets.every((item, idx) => item.correctOrder === idx + 1);
    if (isCorrect) {
      sound.playSuccess();
      setIsOrderingCorrect(true);
    } else {
      sound.playError();
      alert('Urutan naskah belum tepat. Ingat susunan: 1. Judul Proklamasi, 2. Kalimat Kemerdekaan, 3. Kalimat Pemindahan Kekuasaan, 4. Titi Mangsa & Penandatangan.');
    }
  };

  const handleRevealChange = (changeId: string) => {
    sound.playClick();
    setChangesList((prev) =>
      prev.map((c) => (c.id === changeId ? { ...c, identified: true } : c))
    );
    const item = changesList.find((c) => c.id === changeId);
    if (item) {
      setActiveExplanation(
        `[${item.originalText} ➔ ${item.revisedText}]: Dilakukan oleh ${item.actor}. Makna Sejarah: ${item.historicalSignificance}`
      );
    }
  };

  const allDiscovered = changesList.every((c) => c.identified);

  const handleFinalFinish = () => {
    sound.playSuccess();
    const baseScore = 150;
    const heroBonus = hero.id === 'hatta' ? 30 : 0;
    onComplete(baseScore + heroBonus, 100);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-stone-800 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-amber-200 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>RUANG RAHASIA MAEDA: REKONSTRUKSI TEKS PROKLAMASI</span>
          </h3>
          <p className="text-xs md:text-sm text-stone-300 mt-1">
            {phase === 'ordering'
              ? 'Tantangan 1: Susun urutan draft naskah proklamasi secara runtut dan tepat.'
              : 'Tantangan 2: Temukan 3 perubahan ejaan bersejarah antara tulisan tangan Bung Karno dan ketikan Sayuti Melik.'}
          </p>
        </div>
        <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800">
          {phase === 'ordering' ? 'Tahap 1 / 2' : 'Tahap 2 / 2'}
        </span>
      </div>

      {hero.id === 'hatta' && (
        <div className="mb-4 p-2.5 bg-sky-950/40 border border-sky-600/50 rounded-xl text-xs text-sky-300 flex items-center gap-2">
          <Search className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Analisis Logika Bung Hatta Aktif: Cermati kalimat kedua tentang tata cara pemindahan kekuasaan yang disumbangkan oleh Bung Hatta! (+30 XP Bonus)</span>
        </div>
      )}

      {/* PHASE 1: ORDERING */}
      {phase === 'ordering' && (
        <div>
          <div className="space-y-3 mb-6">
            {orderedSnippets.map((snippet, idx) => (
              <div
                key={snippet.id}
                className="flex items-center gap-3 bg-stone-800/90 border border-stone-700/80 p-4 rounded-xl shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-750 flex items-center justify-center font-mono font-bold text-xs text-amber-400 shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 text-xs md:text-sm text-stone-100 font-mono whitespace-pre-line leading-relaxed">
                  {snippet.text}
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => moveSnippet(idx, 'up')}
                    disabled={idx === 0 || isOrderingCorrect}
                    className="p-1 rounded bg-stone-700 hover:bg-stone-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-stone-200"
                    title="Geser ke Atas"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveSnippet(idx, 'down')}
                    disabled={idx === orderedSnippets.length - 1 || isOrderingCorrect}
                    className="p-1 rounded bg-stone-700 hover:bg-stone-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-stone-200"
                    title="Geser ke Bawah"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!isOrderingCorrect ? (
            <div className="text-center">
              <button
                onClick={verifyOrder}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs cursor-pointer shadow-md transition-all"
              >
                Uji Ketepatan Urutan Naskah
              </button>
            </div>
          ) : (
            <div className="p-4 bg-emerald-950/60 border border-emerald-600 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs md:text-sm text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Urutan Naskah Sempurna! Lanjut menyelidiki perubahan ejaan Sayuti Melik.</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  setPhase('investigation');
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs cursor-pointer"
              >
                <span>Tahap 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: INVESTIGATION */}
      {phase === 'investigation' && (
        <div>
          <p className="text-xs text-stone-300 mb-4">
            Klik masing-masing 3 kartu di bawah ini untuk mengungkap perubahan kata yang dilakukan saat naskah diketik di mesin tik oleh Sayuti Melik:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {changesList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleRevealChange(item.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  item.identified
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-stone-800/80 border-stone-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-stone-400">
                    {item.identified ? '✓ Teridentifikasi' : 'Klik untuk Telaah'}
                  </span>
                  <span className="text-xs text-amber-400 font-semibold">{item.actor}</span>
                </div>
                <div className="text-xs text-stone-300 space-y-1">
                  <div>
                    <span className="text-rose-400 font-mono line-through mr-1">
                      {item.originalText}
                    </span>
                    <span className="text-stone-500">➔</span>
                    <span className="text-emerald-300 font-mono font-bold ml-1">
                      {item.revisedText}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activeExplanation && (
            <div className="p-4 bg-stone-800/90 border border-amber-900/40 rounded-xl text-xs md:text-sm text-stone-200 mb-6 leading-relaxed">
              <span className="text-amber-400 font-semibold block mb-1">Catatan Sejarawan:</span>
              {activeExplanation}
            </div>
          )}

          {allDiscovered && (
            <div className="text-center pt-2">
              <button
                onClick={handleFinalFinish}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg"
              >
                <span>Selesaikan Ruang Rahasia Maeda & Buka Babak Final</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
