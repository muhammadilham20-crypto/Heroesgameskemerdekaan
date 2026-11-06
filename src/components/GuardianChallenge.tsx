import React, { useState } from 'react';
import { QuestionBattle, Character } from '../types/game';
import { HeroAvatar } from './HeroAvatar';
import { sound } from '../utils/audio';
import { Shield, Sparkles, CheckCircle, AlertTriangle, ArrowRight, Flame, Swords, Zap, HelpCircle } from 'lucide-react';

interface GuardianChallengeProps {
  battles: QuestionBattle[];
  hero: Character;
  unityMeter: number;
  traitUsesRemaining: number;
  onUseTrait: () => void;
  onUpdateUnity: (delta: number) => void;
  onComplete: (score: number, accuracy: number) => void;
}

export const GuardianChallenge: React.FC<GuardianChallengeProps> = ({
  battles,
  hero,
  unityMeter,
  traitUsesRemaining,
  onUseTrait,
  onUpdateUnity,
  onComplete
}) => {
  const [currentBattleIndex, setCurrentBattleIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [hiddenOptionIndex, setHiddenOptionIndex] = useState<number | null>(null);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // RPG Battle Arena state
  const [enemyHp, setEnemyHp] = useState<number>(100);
  const [battleFx, setBattleFx] = useState<{
    type: 'hit-enemy' | 'hit-player' | 'trait' | null;
    text: string;
  }>({ type: null, text: '' });
  const [showHint, setShowHint] = useState<boolean>(false);

  const battle = battles[currentBattleIndex];

  // Render Enemy Visuals
  const renderEnemyVisual = (threatName: string) => {
    return (
      <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto flex items-center justify-center">
        {/* Dark Aura Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-900/40 blur-xl animate-pulse" />

        <svg viewBox="0 0 140 140" className="w-full h-full relative z-10 drop-shadow-lg">
          <defs>
            <radialGradient id="enemyGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7c2d12" />
              <stop offset="50%" stopColor="#450a0a" />
              <stop offset="100%" stopColor="#18181b" />
            </radialGradient>
          </defs>

          {/* Dark Cloud / Shadow Entity */}
          <path
            d="M30 75 C20 60, 30 35, 55 40 C65 20, 95 20, 105 40 C125 35, 135 60, 125 78 C135 100, 115 125, 90 120 C80 130, 50 130, 42 120 C20 120, 15 95, 30 75 Z"
            fill="url(#enemyGrad)"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="4 2"
          />

          {/* Glowing Red Eyes of Doubt/Hoax */}
          <circle cx="55" cy="65" r="7" fill="#ef4444" />
          <circle cx="55" cy="65" r="3" fill="#ffffff" />
          <circle cx="85" cy="65" r="7" fill="#ef4444" />
          <circle cx="85" cy="65" r="3" fill="#ffffff" />

          {/* Glaring mouth */}
          <path d="M52 92 Q70 82 88 92" stroke="#f87171" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Chains / Lightning of conflict */}
          <path d="M40 45 L30 30 M100 45 L115 30 M70 125 L70 135" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOptionIndex(index);
    setIsAnswered(true);

    const option = battle.options[index];
    if (option.isCorrect) {
      sound.playSlash();
      setEnemyHp(0);
      setBattleFx({
        type: 'hit-enemy',
        text: '⚔️ CRITICAL HIT! Argumen Kebangsaan Menembus Hoaks! (-100 HP Lawan)'
      });
      setCorrectAnswersCount((prev) => prev + 1);
      setTotalXpEarned((prev) => prev + 100);
      onUpdateUnity(10);
    } else {
      sound.playError();
      setEnemyHp((prev) => Math.max(30, prev - 20));
      setBattleFx({
        type: 'hit-player',
        text: '💥 SERANGAN GAGAL! Kabut Keraguan Mengurangi Semangat Persatuan (-12 HP)'
      });
      onUpdateUnity(-12);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentBattleIndex < battles.length - 1) {
      setCurrentBattleIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
      setHiddenOptionIndex(null);
      setEnemyHp(100);
      setBattleFx({ type: null, text: '' });
      setShowHint(false);
    } else {
      const accuracy = Math.round((correctAnswersCount / battles.length) * 100);
      onComplete(totalXpEarned, accuracy);
    }
  };

  const handleTriggerTrait = () => {
    if (traitUsesRemaining <= 0) return;
    sound.playTraitActive();
    onUseTrait();

    setBattleFx({
      type: 'trait',
      text: `⚡ JURUS KETELADANAN AKTIF: ${hero.traitName}!`
    });

    // Character effects in RPG battle
    if (hero.id === 'hatta') {
      const wrongIdx = battle.options.findIndex((opt) => !opt.isCorrect);
      if (wrongIdx !== -1) {
        setHiddenOptionIndex(wrongIdx);
      }
    } else if (hero.id === 'soekarno') {
      onUpdateUnity(20);
    } else if (hero.id === 'fatmawati') {
      onUpdateUnity(100 - unityMeter);
    } else if (hero.id === 'soepomo') {
      const correctIdx = battle.options.findIndex((opt) => opt.isCorrect);
      setSelectedOptionIndex(correctIdx);
      setIsAnswered(true);
      setEnemyHp(0);
      setCorrectAnswersCount((prev) => prev + 1);
      setTotalXpEarned((prev) => prev + 100);
      onUpdateUnity(10);
    } else if (hero.id === 'yamin' || hero.id === 'sukarni') {
      setTotalXpEarned((prev) => prev + 50);
      onUpdateUnity(15);
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 md:p-6 shadow-2xl">
      {/* RPG Top Banner */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-800 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-600 flex items-center justify-center text-red-400">
            <Swords className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base md:text-lg font-bold text-stone-100 flex items-center gap-2">
              <span>ARENA PERTEMPURAN IDEOLOGI & PENGETAHUAN</span>
            </h3>
            <span className="text-[11px] text-stone-400 font-mono">
              Ronde {currentBattleIndex + 1} dari {battles.length} · Tantangan Melawan {battle.threatName}
            </span>
          </div>
        </div>

        {/* Trait Activation Button */}
        <button
          onClick={handleTriggerTrait}
          disabled={traitUsesRemaining <= 0 || isAnswered}
          className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs font-bold transition-all ${
            traitUsesRemaining > 0 && !isAnswered
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 cursor-pointer shadow-lg shadow-amber-950/40 ring-1 ring-amber-400'
              : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-50'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Jurus: {hero.traitName} ({traitUsesRemaining}x)</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* RPG BATTLE ARENA (HERO VS ENEMY DUAL STANCE) */}
      {/* ============================================================ */}
      <div className="relative bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 rounded-2xl p-4 md:p-6 border border-stone-800 mb-6 overflow-hidden">
        {/* Floating Battle Message Banner */}
        {battleFx.text && (
          <div
            className={`text-center py-2 px-4 rounded-xl text-xs font-bold mb-4 animate-bounce ${
              battleFx.type === 'hit-enemy'
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                : battleFx.type === 'hit-player'
                ? 'bg-rose-950 border border-rose-500 text-rose-300'
                : 'bg-amber-950 border border-amber-500 text-amber-300'
            }`}
          >
            {battleFx.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* LEFT: HERO SIDE */}
          <div className="flex items-center gap-4 bg-stone-900/90 border border-stone-750 p-4 rounded-xl">
            <HeroAvatar heroId={hero.id} size="lg" className="shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-sm text-stone-100 truncate">
                  {hero.name}
                </span>
                <span className="text-[10px] text-amber-400 font-mono">SEKOLAH SMP</span>
              </div>
              <span className="text-[11px] text-amber-300/80 block mb-2">{hero.epithet}</span>

              {/* Player HP Bar (Semangat Persatuan) */}
              <div>
                <div className="flex justify-between text-[11px] text-stone-400 mb-1">
                  <span>Semangat Persatuan (HP):</span>
                  <span className="font-mono font-bold text-stone-200 tabular-nums">{unityMeter}/100</span>
                </div>
                <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden border border-stone-700">
                  <div
                    className={`h-full transition-all duration-300 ${
                      unityMeter > 60 ? 'bg-emerald-500' : unityMeter > 30 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.max(0, Math.min(100, unityMeter))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ENEMY THREAT SIDE */}
          <div className="flex items-center gap-4 bg-stone-900/90 border border-red-950/60 p-4 rounded-xl">
            <div className="flex-1 min-w-0 order-2 md:order-1 text-right">
              <div className="flex items-center justify-between md:justify-end gap-2 mb-1">
                <span className="text-[10px] text-rose-400 font-mono uppercase">MUSUH IDEOLOGI</span>
                <span className="font-display font-bold text-sm text-rose-200 truncate">
                  {battle.threatName}
                </span>
              </div>
              <span className="text-[11px] text-stone-400 block mb-2 line-clamp-1">
                {battle.threatDescription}
              </span>

              {/* Enemy Health Bar */}
              <div>
                <div className="flex justify-between text-[11px] text-stone-400 mb-1">
                  <span>Daya Tahan Hoaks:</span>
                  <span className="font-mono font-bold text-rose-300 tabular-nums">{enemyHp}/100</span>
                </div>
                <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden border border-stone-700">
                  <div
                    className="h-full bg-rose-600 transition-all duration-300"
                    style={{ width: `${enemyHp}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 shrink-0">
              {renderEnemyVisual(battle.threatName)}
            </div>
          </div>
        </div>
      </div>

      {/* Battle Scenario Context */}
      <div className="bg-stone-850/80 border border-stone-800 p-3.5 rounded-xl mb-5 flex items-start gap-3">
        <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-stone-300 leading-relaxed">
          <span className="font-semibold text-amber-300">Skenario Lapangan: </span>
          {battle.scenario}
        </div>
      </div>

      {/* Main Question & Argument Combat */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm md:text-base font-bold text-stone-100 leading-snug">
            ⚔️ Serang dengan Argumen Kebangsaan yang Tepat:
          </h4>
          <button
            onClick={() => {
              sound.playShield();
              setShowHint(!showHint);
            }}
            className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Tutup Petunjuk' : 'Buka Tameng Petunjuk'}</span>
          </button>
        </div>

        {showHint && (
          <div className="p-3 bg-amber-950/40 border border-amber-700/50 rounded-xl text-xs text-amber-200 mb-3">
            <span className="font-bold">Petunjuk Nilai: </span>
            Ingat prinsip Profil Pelajar Pancasila ({battle.pancasilaPillar}). Fokuslah pada solusi yang menyatukan, bukan yang memperuncing perpecahan atau kepasifan.
          </div>
        )}

        <p className="text-xs md:text-sm text-stone-200 font-medium mb-3 bg-stone-800/80 p-3 rounded-lg border border-stone-700">
          {battle.question}
        </p>

        {/* Option Cards */}
        <div className="space-y-3">
          {battle.options.map((option, idx) => {
            if (hiddenOptionIndex === idx) return null; // eliminated by Bung Hatta's trait

            const isSelected = selectedOptionIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs md:text-sm leading-relaxed ${
                  isAnswered
                    ? option.isCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-lg ring-1 ring-emerald-400'
                      : isSelected
                      ? 'bg-rose-950/80 border-rose-500 text-rose-100 ring-1 ring-rose-400'
                      : 'bg-stone-850 border-stone-800 text-stone-500 opacity-50'
                    : 'bg-stone-800/90 border-stone-700 text-stone-200 hover:border-amber-400 hover:bg-stone-750 cursor-pointer shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center font-mono text-xs font-bold text-amber-400 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Explanation Box */}
      {isAnswered && selectedOptionIndex !== null && (
        <div
          className={`p-4 rounded-xl border mb-6 text-xs md:text-sm ${
            battle.options[selectedOptionIndex].isCorrect
              ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
              : 'bg-rose-950/60 border-rose-600 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1.5">
            {battle.options[selectedOptionIndex].isCorrect ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className="text-sm">
              {battle.options[selectedOptionIndex].isCorrect
                ? 'SERANGAN TELAK! Argumen Sejarah Memenangkan Pertempuran'
                : 'UPS! Kabut Keraguan Mengaburkan Jawabanmu. Mari Pelajari Faktanya:'}
            </span>
          </div>
          <p className="leading-relaxed">
            {battle.options[selectedOptionIndex].explanation}
          </p>
          <div className="mt-2.5 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pilar Profil Pelajar Pancasila: {battle.pancasilaPillar}</span>
          </div>
        </div>
      )}

      {/* Next Step Button */}
      {isAnswered && (
        <div className="text-right">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg"
          >
            <span>
              {currentBattleIndex < battles.length - 1 ? 'Ronde Pertempuran Selanjutnya' : 'Kemenangan Telak! Tuntaskan Misi'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
