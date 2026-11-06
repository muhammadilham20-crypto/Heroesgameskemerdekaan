import React, { useState } from 'react';
import { DecisionNode, Character } from '../types/game';
import { sound } from '../utils/audio';
import { Users, ShieldCheck, ArrowRight, MessageSquareQuote } from 'lucide-react';

interface MusyawarahGameProps {
  dialogueNodes: DecisionNode[];
  hero: Character;
  onUpdateUnity: (delta: number) => void;
  onComplete: (score: number, accuracy: number) => void;
}

export const MusyawarahGame: React.FC<MusyawarahGameProps> = ({
  dialogueNodes,
  hero,
  onUpdateUnity,
  onComplete
}) => {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [optimalCount, setOptimalCount] = useState(0);

  const currentNode = dialogueNodes[currentNodeIndex];
  const selectedChoice = currentNode.choices.find((c) => c.id === selectedChoiceId);

  const handleSelectChoice = (choiceId: string) => {
    if (selectedChoiceId) return; // already locked

    setSelectedChoiceId(choiceId);
    const choice = currentNode.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    if (choice.isOptimal) {
      sound.playSuccess();
      setOptimalCount((prev) => prev + 1);
    } else {
      sound.playError();
    }

    onUpdateUnity(choice.unityImpact);
    setTotalXpEarned((prev) => prev + choice.xpReward);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentNodeIndex < dialogueNodes.length - 1) {
      setCurrentNodeIndex((prev) => prev + 1);
      setSelectedChoiceId(null);
    } else {
      const accuracy = Math.round((optimalCount / dialogueNodes.length) * 100);
      const heroBonus = hero.id === 'soekarno' ? 30 : 0;
      onComplete(totalXpEarned + heroBonus, accuracy);
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-stone-800 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-amber-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>SIMULATOR MUSYAWARAH: PANITIA SEMBILAN</span>
          </h3>
          <p className="text-xs md:text-sm text-stone-300 mt-1">
            Gunakan komunikasi santun, sikap saling menghargai, dan utamakan persatuan nasional.
          </p>
        </div>
        <span className="text-xs font-mono text-stone-400">
          Kasus {currentNodeIndex + 1} dari {dialogueNodes.length}
        </span>
      </div>

      {/* Speaker Dialogue Card */}
      <div className="bg-stone-800/90 border border-amber-900/40 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquareQuote className="w-4 h-4 text-amber-400" />
          <span className="font-display text-sm font-bold text-amber-300">
            {currentNode.speaker}
          </span>
          <span className="text-xs text-stone-400">({currentNode.speakerRole})</span>
        </div>
        <p className="text-sm md:text-base text-stone-100 font-medium italic leading-relaxed pl-2 border-l-2 border-amber-500/60 my-3">
          {currentNode.dialogue}
        </p>
        <div className="text-[11px] text-stone-400 bg-stone-900/60 p-2 rounded">
          <span className="text-amber-400 font-semibold">Konteks Sejarah: </span>
          {currentNode.contextNote}
        </div>
      </div>

      {/* Response Choices */}
      <div className="space-y-3 mb-6">
        <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          Pilih Respons Dialog Ksatria Persatuan:
        </h4>
        {currentNode.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => handleSelectChoice(choice.id)}
              disabled={!!selectedChoiceId}
              className={`w-full text-left p-4 rounded-xl border transition-all text-xs md:text-sm leading-relaxed ${
                isSelected
                  ? choice.isOptimal
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-400 shadow-md'
                    : 'bg-rose-950/70 border-rose-500 text-rose-100 ring-1 ring-rose-400 shadow-md'
                  : selectedChoiceId
                  ? 'bg-stone-850 border-stone-800 text-stone-500 opacity-60'
                  : 'bg-stone-800/80 border-stone-700 text-stone-200 hover:border-amber-400 hover:bg-stone-750 cursor-pointer'
              }`}
            >
              {choice.text}
            </button>
          );
        })}
      </div>

      {/* Reflection and Context when Answered */}
      {selectedChoice && (
        <div
          className={`p-4 rounded-xl border mb-6 text-xs md:text-sm ${
            selectedChoice.isOptimal
              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
              : 'bg-amber-950/40 border-amber-700/60 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Pilar Pancasila: {selectedChoice.pancasilaPillar}</span>
          </div>
          <p className="leading-relaxed">{selectedChoice.reflection}</p>
          <div className="mt-2 text-xs font-mono font-semibold">
            Dampak Persatuan: {selectedChoice.unityImpact > 0 ? `+${selectedChoice.unityImpact}` : selectedChoice.unityImpact}% | +{selectedChoice.xpReward} XP
          </div>
        </div>
      )}

      {/* Next Step Button */}
      {selectedChoiceId && (
        <div className="text-right">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold rounded-xl text-xs cursor-pointer shadow-md"
          >
            <span>
              {currentNodeIndex < dialogueNodes.length - 1 ? 'Lanjut Kasus Berikutnya' : 'Selesaikan Musyawarah'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
