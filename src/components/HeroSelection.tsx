import React, { useState } from 'react';
import { Character } from '../types/game';
import { HEROES } from '../data/heroes';
import { HeroAvatar } from './HeroAvatar';
import { sound } from '../utils/audio';
import { Sparkles, Quote, ShieldCheck, ArrowRight, User } from 'lucide-react';

interface HeroSelectionProps {
  onSelectHero: (hero: Character, studentName: string) => void;
}

export const HeroSelection: React.FC<HeroSelectionProps> = ({ onSelectHero }) => {
  const [selectedHero, setSelectedHero] = useState<Character>(HEROES[0]);
  const [studentName, setStudentName] = useState<string>('');

  const handleConfirm = () => {
    sound.playSuccess();
    const finalName = studentName.trim() || 'Pelajar Pancasila Muda';
    onSelectHero(selectedHero, finalName);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/60 border border-amber-700/50 rounded-full text-amber-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Petualangan Sejarah Kurikulum Merdeka</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-stone-100 mb-3 text-balance">
          PILIH TOKOH KETELADANANMU
        </h1>
        <p className="text-stone-300 text-sm md:text-base leading-relaxed">
          Setiap pendiri bangsa memiliki karakter moral dan keistimewaan perjuangan yang membimbingmu merumuskan dasar negara dan mengantar Indonesia merdeka.
        </p>

        {/* Student Name Input */}
        <div className="mt-6 max-w-md mx-auto bg-stone-800/90 border border-stone-700 p-3.5 rounded-xl flex items-center gap-3 shadow-inner">
          <User className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            placeholder="Ketik Nama Lengkap Siswa / Kelas (cth: Arya - 7A)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full bg-transparent border-none text-stone-100 placeholder-stone-500 text-sm focus:outline-none"
            maxLength={35}
          />
        </div>
      </div>

      {/* Grid of 6 Heroes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {HEROES.map((hero) => {
          const isSelected = selectedHero.id === hero.id;
          return (
            <div
              key={hero.id}
              onClick={() => {
                sound.playClick();
                setSelectedHero(hero);
              }}
              className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-200 text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-stone-800 to-stone-850 border-amber-400 shadow-xl shadow-amber-950/30 ring-1 ring-amber-400'
                  : 'bg-stone-800/60 border-stone-700/70 hover:border-stone-600 hover:bg-stone-800/80'
              }`}
            >
              <div>
                {/* Hero Header Card */}
                <div className="flex items-start gap-4 mb-4">
                  <HeroAvatar heroId={hero.id} size="md" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                      {hero.epithet}
                    </span>
                    <h3 className="font-display text-lg font-bold text-stone-100 truncate">
                      {hero.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">
                      {hero.role}
                    </p>
                  </div>
                </div>

                {/* Special Trait Box */}
                <div className="bg-stone-900/80 border border-stone-700/60 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Keistimewaan Karakter: {hero.traitName}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-snug">
                    {hero.traitDescription}
                  </p>
                </div>

                {/* Nilai Keteladanan */}
                <div className="flex items-start gap-2 text-xs text-stone-300 mb-3 bg-stone-900/40 p-2.5 rounded-lg border border-stone-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-emerald-400 font-semibold block text-[11px]">Nilai Keteladanan:</span>
                    <span>{hero.exemplarValue}</span>
                  </div>
                </div>

                {/* Authentic Quote */}
                <div className="flex items-start gap-2 text-stone-400 text-xs italic bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/70">
                  <Quote className="w-3.5 h-3.5 text-amber-500/70 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{hero.quote}</span>
                </div>
              </div>

              {/* Selection Indicator */}
              <div className="mt-4 pt-3 border-t border-stone-700/50 flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  {isSelected ? '✓ Terpilih' : 'Klik untuk memilih'}
                </span>
                <span className={`w-3 h-3 rounded-full border ${isSelected ? 'bg-amber-400 border-amber-300' : 'border-stone-600'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <button
          onClick={handleConfirm}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-red-950/40 cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <span>Mulai Petualangan dengan {selectedHero.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
