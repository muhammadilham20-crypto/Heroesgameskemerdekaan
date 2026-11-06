import React, { useState } from 'react';
import { MatchPair, Character } from '../types/game';
import { HeroAvatar } from './HeroAvatar';
import { sound } from '../utils/audio';
import { CheckCircle, AlertCircle, Info, ArrowRight } from 'lucide-react';

interface MatchUpGameProps {
  pairs: MatchPair[];
  hero: Character;
  onComplete: (score: number, accuracy: number) => void;
}

export const MatchUpGame: React.FC<MatchUpGameProps> = ({ pairs, hero, onComplete }) => {
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, 'yamin' | 'soepomo' | 'soekarno'>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const founders = [
    {
      id: 'yamin' as const,
      name: 'Mr. Mohammad Yamin',
      date: '29 Mei 1945',
      badge: '5 Asas Lisan & Tulisan',
      heroId: 'yamin' as const,
      color: 'border-emerald-600 bg-emerald-950/30'
    },
    {
      id: 'soepomo' as const,
      name: 'Prof. Dr. Mr. Soepomo',
      date: '31 Mei 1945',
      badge: 'Teori Negara Integralistik',
      heroId: 'soepomo' as const,
      color: 'border-purple-600 bg-purple-950/30'
    },
    {
      id: 'soekarno' as const,
      name: 'Ir. Soekarno',
      date: '1 Juni 1945',
      badge: 'Pidato Kelahiran Pancasila',
      heroId: 'soekarno' as const,
      color: 'border-red-600 bg-red-950/30'
    }
  ];

  const handleSelectFounder = (founderId: 'yamin' | 'soepomo' | 'soekarno') => {
    if (!selectedConceptId) return;

    const currentPair = pairs.find((p) => p.id === selectedConceptId);
    if (!currentPair) return;

    setAttempts((prev) => prev + 1);

    if (currentPair.tokoh === founderId) {
      sound.playSuccess();
      setCorrectCount((prev) => prev + 1);
      setMatchedPairs((prev) => ({ ...prev, [selectedConceptId]: founderId }));
      setFeedback({
        isCorrect: true,
        text: `Tepat! "${currentPair.concept}" dirumuskan oleh ${currentPair.tokohName} (${currentPair.date}). ${currentPair.explanation}`
      });
      setSelectedConceptId(null);
    } else {
      sound.playError();
      const actualTokoh = founders.find((f) => f.id === currentPair.tokoh);
      setFeedback({
        isCorrect: false,
        text: `Kurang tepat. "${currentPair.concept}" bukan dicetuskan oleh tokoh tersebut, melainkan oleh ${actualTokoh?.name} (${actualTokoh?.date}). Silakan telaah kembali catatannya.`
      });
    }
  };

  const isAllMatched = Object.keys(matchedPairs).length === pairs.length;

  const handleFinish = () => {
    sound.playSuccess();
    const accuracy = attempts > 0 ? Math.round((correctCount / attempts) * 100) : 100;
    const baseScore = correctCount * 15;
    const traitBonus = hero.id === 'yamin' ? 30 : 0;
    onComplete(baseScore + traitBonus, accuracy);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
      {/* Game Instruction Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-amber-200">
              MINI-GAME: GAGASAN MATCH-UP DASAR NEGARA
            </h3>
            <p className="text-xs md:text-sm text-stone-300 mt-1">
              Jodohkan gagasan dasar negara berikut dengan tokoh perumusnya yang tepat tanpa tertukar.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-400 block">Progres Terjodohkan</span>
            <span className="font-mono font-bold text-base text-emerald-400 tabular-nums">
              {Object.keys(matchedPairs).length} / {pairs.length}
            </span>
          </div>
        </div>

        {hero.id === 'yamin' && (
          <div className="mt-3 p-2.5 bg-emerald-950/40 border border-emerald-700/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Bonus Tokoh Mohammad Yamin Aktif: Telusuri kata kunci "Peri" untuk mempermudah identifikasi rumusan 29 Mei 1945! (+30 XP)</span>
          </div>
        )}
      </div>

      {/* Target Founders (Drop / Click Zones) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {founders.map((founder) => (
          <button
            key={founder.id}
            onClick={() => handleSelectFounder(founder.id)}
            disabled={!selectedConceptId}
            className={`p-4 rounded-xl border text-left transition-all ${founder.color} ${
              selectedConceptId
                ? 'cursor-pointer hover:border-amber-400 hover:scale-[1.02] shadow-md ring-1 ring-amber-500/20'
                : 'opacity-80 cursor-default'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <HeroAvatar heroId={founder.heroId} size="sm" />
              <div>
                <h4 className="font-display text-sm font-bold text-stone-100">{founder.name}</h4>
                <span className="text-[11px] text-amber-300 font-mono">{founder.date}</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 bg-stone-900/60 px-2 py-1 rounded border border-stone-800">
              {founder.badge}
            </div>

            {/* List of matched items inside this founder */}
            <div className="mt-3 space-y-1">
              {pairs
                .filter((p) => matchedPairs[p.id] === founder.id)
                .map((matched) => (
                  <div
                    key={matched.id}
                    className="text-xs text-emerald-200 bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded flex items-center justify-between"
                  >
                    <span>✓ {matched.concept}</span>
                  </div>
                ))}
            </div>
          </button>
        ))}
      </div>

      {/* Concept Cards Pool */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
          Pilih Kartu Gagasan Di Bawah Ini:
        </h4>
        <div className="flex flex-wrap gap-2">
          {pairs.map((pair) => {
            const isMatched = !!matchedPairs[pair.id];
            const isSelected = selectedConceptId === pair.id;

            if (isMatched) return null; // already slotted

            return (
              <button
                key={pair.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedConceptId(pair.id);
                  setFeedback(null);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-300 font-bold shadow-md scale-105'
                    : 'bg-stone-800 text-stone-200 border-stone-700 hover:border-amber-400 hover:bg-stone-750'
                }`}
              >
                {pair.concept}
              </button>
            );
          })}
        </div>
      </div>

      {/* Immediate Educational Feedback Message */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl border mb-6 text-xs flex items-start gap-2.5 ${
            feedback.isCorrect
              ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
              : 'bg-rose-950/60 border-rose-600 text-rose-200'
          }`}
        >
          {feedback.isCorrect ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{feedback.text}</span>
        </div>
      )}

      {/* Completion Button */}
      {isAllMatched && (
        <div className="text-center pt-2">
          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg cursor-pointer text-sm"
          >
            <span>Semua Gagasan Terkumpul! Lanjut ke Pertempuran Ilmu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
