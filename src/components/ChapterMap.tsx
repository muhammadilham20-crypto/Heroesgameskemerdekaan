import React from 'react';
import { ChapterData } from '../data/chapters';
import { Character } from '../types/game';
import { HeroAvatar } from './HeroAvatar';
import { sound } from '../utils/audio';
import { CheckCircle2, Lock, ArrowRight, MapPin, Calendar, Award } from 'lucide-react';

interface ChapterMapProps {
  chapters: ChapterData[];
  unlockedChapters: number[];
  completedChapters: number[];
  currentChapter: number;
  hero: Character;
  studentName: string;
  totalXp: number;
  onSelectChapter: (chapterId: number) => void;
  onOpenCertificate: () => void;
}

export const ChapterMap: React.FC<ChapterMapProps> = ({
  chapters,
  unlockedChapters,
  completedChapters,
  hero,
  studentName,
  totalXp,
  onSelectChapter,
  onOpenCertificate
}) => {
  const allCompleted = completedChapters.length === chapters.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Player Header Card */}
      <div className="bg-gradient-to-r from-stone-800 via-stone-850 to-stone-800 border border-stone-700/80 rounded-2xl p-5 md:p-6 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <HeroAvatar heroId={hero.id} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                {hero.epithet}
              </span>
              <span className="text-xs text-stone-400">| {hero.traitName}</span>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-stone-100 mt-1">
              {studentName}
            </h2>
            <p className="text-xs text-stone-400">
              Mewakili Keteladanan: <span className="text-amber-200">{hero.name}</span>
            </p>
          </div>
        </div>

        {/* Stats & Certificate CTA */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-stone-700/60">
          <div className="text-right">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Total Pengalaman</span>
            <span className="font-mono text-xl font-bold text-amber-400 tabular-nums">{totalXp} XP</span>
          </div>

          <div className="text-right pl-4 border-l border-stone-700">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Misi Terselesaikan</span>
            <span className="font-mono text-xl font-bold text-emerald-400 tabular-nums">
              {completedChapters.length} / {chapters.length}
            </span>
          </div>

          {allCompleted && (
            <button
              onClick={() => {
                sound.playFanfare();
                onOpenCertificate();
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-stone-950 font-bold rounded-xl text-xs shadow-md cursor-pointer transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Kartu Nilai</span>
            </button>
          )}
        </div>
      </div>

      {/* Timeline Chapter List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg md:text-xl font-bold text-stone-200">
            PETA PERJALANAN SEJARAH KEMERDEKAAN
          </h3>
          <span className="text-xs text-stone-400">Urutan Kronologis Peristiwa</span>
        </div>

        {chapters.map((ch, idx) => {
          const isUnlocked = unlockedChapters.includes(ch.id);
          const isCompleted = completedChapters.includes(ch.id);

          return (
            <div
              key={ch.id}
              className={`relative rounded-2xl border p-5 md:p-6 transition-all duration-200 ${
                isCompleted
                  ? 'bg-stone-850/90 border-emerald-700/60 shadow-md'
                  : isUnlocked
                  ? 'bg-stone-800/90 border-amber-500/70 shadow-lg ring-1 ring-amber-500/30'
                  : 'bg-stone-900/60 border-stone-800 opacity-60'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Chapter Left Info */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg shrink-0 border ${
                      isCompleted
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                        : isUnlocked
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                        : 'bg-stone-800 border-stone-700 text-stone-500'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {ch.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {ch.location}
                      </span>
                    </div>

                    <h4 className="font-display text-lg md:text-xl font-bold text-stone-100">
                      {ch.title}
                    </h4>
                    <p className="text-xs md:text-sm text-stone-300 mt-1 max-w-2xl">
                      {ch.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Action Button & Status */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  {isCompleted ? (
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Selesai
                      </span>
                      <button
                        onClick={() => {
                          sound.playClick();
                          onSelectChapter(ch.id);
                        }}
                        className="px-3.5 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-medium rounded-lg cursor-pointer transition-colors"
                      >
                        Main Ulang
                      </button>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onSelectChapter(ch.id);
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold rounded-xl text-xs shadow-md cursor-pointer transition-all"
                    >
                      <span>Mulai Babak</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 text-stone-500 rounded-lg text-xs font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Terkunci</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
