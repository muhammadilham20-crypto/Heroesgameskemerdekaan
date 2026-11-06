import React, { useState } from 'react';
import { JournalEntry } from '../types/game';
import { CHAPTERS_DATA } from '../data/chapters';
import { sound } from '../utils/audio';
import { BookOpen, X, Printer, Calendar, MapPin, Quote, ShieldCheck, Lock } from 'lucide-react';

interface NationalJournalProps {
  unlockedChapters: number[];
  onClose: () => void;
}

export const NationalJournal: React.FC<NationalJournalProps> = ({
  unlockedChapters,
  onClose
}) => {
  const [activeChapterId, setActiveChapterId] = useState<number>(unlockedChapters[0] || 1);

  const activeEntry: JournalEntry =
    CHAPTERS_DATA.find((c) => c.id === activeChapterId)?.journal || CHAPTERS_DATA[0].journal;
  const isUnlocked = unlockedChapters.includes(activeChapterId);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-900/60 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-850/80">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-display text-lg font-bold text-stone-100">
                JURNAL KEBANGSAAN
              </h3>
              <p className="text-xs text-stone-400">
                Buku Catatan Sejarah & Nilai-Nilai Luhur Pancasila
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-lg text-xs font-medium cursor-pointer transition-colors border border-stone-700"
              title="Cetak Catatan Belajar"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Catatan</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-stone-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chapter Tabs */}
        <div className="flex items-center overflow-x-auto border-b border-stone-800 bg-stone-900 px-4 py-2 gap-2 game-scroll shrink-0">
          {CHAPTERS_DATA.map((ch) => {
            const unlocked = unlockedChapters.includes(ch.id);
            const isActive = activeChapterId === ch.id;

            return (
              <button
                key={ch.id}
                onClick={() => {
                  sound.playBookOpen();
                  setActiveChapterId(ch.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : unlocked
                    ? 'bg-stone-800/80 text-stone-300 hover:bg-stone-750 hover:text-white'
                    : 'bg-stone-900 text-stone-600 cursor-not-allowed'
                }`}
              >
                {!unlocked && <Lock className="w-3 h-3 text-stone-600" />}
                <span>Babak 0{ch.id}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto game-scroll flex-1 space-y-6">
          {!isUnlocked ? (
            <div className="text-center py-12">
              <Lock className="w-10 h-10 text-stone-600 mx-auto mb-3" />
              <h4 className="font-display text-lg font-bold text-stone-400">
                Halaman Jurnal Masih Terkunci
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Selesaikan misi Babak 0{activeChapterId} pada peta untuk membuka rangkuman sejarah dan mutiara hikmah kebangsaan ini.
              </p>
            </div>
          ) : (
            <div>
              {/* Entry Meta */}
              <div className="border-b border-stone-800 pb-4 mb-5">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Catatan Sejarah Babak 0{activeEntry.chapterId}
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-stone-100">
                  {activeEntry.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 mt-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {activeEntry.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {activeEntry.location}
                  </span>
                </div>
              </div>

              {/* Historical Summary */}
              <div className="bg-stone-850/80 border border-stone-800 p-4 rounded-xl mb-5">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Ringkasan Peristiwa Sejarah:
                </h4>
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                  {activeEntry.historicalSummary}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-stone-850/80 border border-stone-800 p-4 rounded-xl mb-5">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                  Poin Kunci Edukasi (Kurikulum Merdeka):
                </h4>
                <ul className="space-y-2">
                  {activeEntry.keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-stone-200">
                      <span className="text-amber-400 font-bold shrink-0">•</span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-r from-amber-950/40 to-stone-900 border border-amber-800/40 p-4 rounded-xl mb-5 flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-amber-200 italic leading-relaxed">
                  {activeEntry.inspirationalQuote}
                </p>
              </div>

              {/* Pancasila Reflection */}
              <div className="bg-emerald-950/30 border border-emerald-800/40 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    Refleksi Karakter Pelajar Pancasila:
                  </h4>
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                    {activeEntry.pancasilaReflection}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
