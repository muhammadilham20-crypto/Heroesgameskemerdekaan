import React, { useState } from 'react';
import { ChapterData } from '../data/chapters';
import { Character } from '../types/game';
import { MatchUpGame } from './MatchUpGame';
import { MusyawarahGame } from './MusyawarahGame';
import { DialektikaGame } from './DialektikaGame';
import { ProclamationPuzzle } from './ProclamationPuzzle';
import { GuardianChallenge } from './GuardianChallenge';
import { sound } from '../utils/audio';
import { Calendar, MapPin, Award, BookOpen, ArrowRight, CheckCircle2, ChevronRight, Shield } from 'lucide-react';

interface ChapterStageProps {
  chapter: ChapterData;
  hero: Character;
  unityMeter: number;
  traitUsesRemaining: number;
  onUseTrait: () => void;
  onUpdateUnity: (delta: number) => void;
  onFinishChapter: (chapterId: number, xpEarned: number, accuracy: number) => void;
  onOpenJournal: () => void;
}

export const ChapterStage: React.FC<ChapterStageProps> = ({
  chapter,
  hero,
  unityMeter,
  traitUsesRemaining,
  onUseTrait,
  onUpdateUnity,
  onFinishChapter,
  onOpenJournal
}) => {
  // Phase inside the chapter:
  // 'intro' -> 'minigame' -> 'battle' -> 'cleared'
  const [phase, setPhase] = useState<'intro' | 'minigame' | 'battle' | 'cleared'>('intro');
  const [chapterXp, setChapterXp] = useState(0);
  const [accuracyRecords, setAccuracyRecords] = useState<number[]>([]);

  const handleStartMinigame = () => {
    sound.playClick();
    if (chapter.matchPairs || chapter.dialogueNodes || chapter.proclamationSnippets) {
      setPhase('minigame');
    } else {
      setPhase('battle');
    }
  };

  const handleMinigameComplete = (earnedXp: number, accuracy: number) => {
    setChapterXp((prev) => prev + earnedXp);
    setAccuracyRecords((prev) => [...prev, accuracy]);
    if (chapter.battles && chapter.battles.length > 0) {
      setPhase('battle');
    } else {
      handleCompleteChapter();
    }
  };

  const handleBattleComplete = (earnedXp: number, accuracy: number) => {
    setChapterXp((prev) => prev + earnedXp);
    setAccuracyRecords((prev) => [...prev, accuracy]);
    handleCompleteChapter();
  };

  const handleCompleteChapter = () => {
    sound.playFanfare();
    setPhase('cleared');
  };

  const handleProceedToMap = () => {
    const avgAccuracy =
      accuracyRecords.length > 0
        ? Math.round(accuracyRecords.reduce((a, b) => a + b, 0) / accuracyRecords.length)
        : 100;
    onFinishChapter(chapter.id, chapterXp, avgAccuracy);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Chapter Breadcrumb & Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-400 font-mono">BABAK 0{chapter.id}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            {chapter.period}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 hidden sm:inline-flex">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            {chapter.location}
          </span>
        </div>

        <button
          onClick={onOpenJournal}
          className="flex items-center gap-1 text-amber-300 hover:text-amber-200 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Buka Jurnal</span>
        </button>
      </div>

      {/* PHASE 1: NARRATIVE INTRO */}
      {phase === 'intro' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-100 tracking-tight">
              {chapter.title}
            </h2>
            <p className="text-sm md:text-base text-amber-300 font-medium mt-1">
              {chapter.subtitle}
            </p>
          </div>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 mb-8 text-stone-300 text-xs md:text-sm leading-relaxed">
            {chapter.narrativeIntro.map((para, idx) => (
              <p key={idx} className="bg-stone-850/60 p-4 rounded-xl border border-stone-800/80">
                {para}
              </p>
            ))}
          </div>

          {/* Educational Goals */}
          <div className="bg-stone-800/90 border border-amber-900/50 rounded-xl p-5 mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Target Capaian Pembelajaran (Kurikulum Merdeka):</span>
            </h4>
            <ul className="space-y-2">
              {chapter.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-stone-200">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Start Mission Button */}
          <div className="text-center pt-2">
            <button
              onClick={handleStartMinigame}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-red-950/40 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              <span>Mulai Petualangan Sejarah Babak Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: MINIGAME */}
      {phase === 'minigame' && (
        <div>
          {chapter.id === 1 && chapter.matchPairs && (
            <MatchUpGame
              pairs={chapter.matchPairs}
              hero={hero}
              onComplete={handleMinigameComplete}
            />
          )}

          {chapter.id === 2 && chapter.dialogueNodes && (
            <MusyawarahGame
              dialogueNodes={chapter.dialogueNodes}
              hero={hero}
              onUpdateUnity={onUpdateUnity}
              onComplete={handleMinigameComplete}
            />
          )}

          {chapter.id === 3 && chapter.dialogueNodes && (
            <DialektikaGame
              dialogueNodes={chapter.dialogueNodes}
              hero={hero}
              onUpdateUnity={onUpdateUnity}
              onComplete={handleMinigameComplete}
            />
          )}

          {chapter.id === 4 && chapter.proclamationSnippets && chapter.textChanges && (
            <ProclamationPuzzle
              snippets={chapter.proclamationSnippets}
              textChanges={chapter.textChanges}
              hero={hero}
              onComplete={handleMinigameComplete}
            />
          )}

          {chapter.id === 5 && (
            <GuardianChallenge
              battles={chapter.battles}
              hero={hero}
              unityMeter={unityMeter}
              traitUsesRemaining={traitUsesRemaining}
              onUseTrait={onUseTrait}
              onUpdateUnity={onUpdateUnity}
              onComplete={handleMinigameComplete}
            />
          )}
        </div>
      )}

      {/* PHASE 3: BATTLE OF ARGUMENTS (For Chapters 1-4 that have battle rounds) */}
      {phase === 'battle' && (
        <GuardianChallenge
          battles={chapter.battles}
          hero={hero}
          unityMeter={unityMeter}
          traitUsesRemaining={traitUsesRemaining}
          onUseTrait={onUseTrait}
          onUpdateUnity={onUpdateUnity}
          onComplete={handleBattleComplete}
        />
      )}

      {/* PHASE 4: CHAPTER CLEARED CELEBRATION */}
      {phase === 'cleared' && (
        <div className="bg-stone-900 border border-emerald-600/70 rounded-2xl p-6 md:p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center mb-4">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-1">
            BABAK SELESAI DENGAN KEGEMILANGAN
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-100 mb-2">
            Misi Babak 0{chapter.id} Berhasil Dituntaskan!
          </h2>
          <p className="text-xs md:text-sm text-stone-300 max-w-lg mx-auto mb-6">
            Selamat! Kamu telah meresapi dan mempraktikkan pilar Profil Pelajar Pancasila dalam babak bersejarah ini.
          </p>

          {/* Reward Badges */}
          <div className="inline-flex items-center gap-6 bg-stone-850 border border-stone-750 px-6 py-3 rounded-xl mb-8">
            <div>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">XP Diperoleh</span>
              <span className="font-mono text-lg font-bold text-amber-400 tabular-nums">+{chapterXp} XP</span>
            </div>
            <div className="w-px h-8 bg-stone-700" />
            <div>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Jurnal Kebangsaan</span>
              <span className="text-xs font-semibold text-emerald-400">Halaman Terbuka!</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playBookOpen();
                onOpenJournal();
              }}
              className="px-5 py-2.5 bg-stone-800 hover:bg-stone-750 text-amber-300 border border-amber-800/60 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Baca Catatan Jurnal Babak Ini
            </button>
            <button
              onClick={handleProceedToMap}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
            >
              Kembali ke Peta Misi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
