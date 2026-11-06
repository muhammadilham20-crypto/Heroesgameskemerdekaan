import React from 'react';
import { Character } from '../types/game';
import { Volume2, VolumeX, BookOpen, Shield, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  hero: Character | null;
  unityMeter: number;
  totalXp: number;
  currentScreen: 'selection' | 'map' | 'chapter' | 'journal' | 'summary';
  onNavigate: (screen: 'map' | 'journal') => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenJournal: () => void;
  onActivateTrait?: () => void;
  traitAvailable?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  hero,
  unityMeter,
  totalXp,
  onNavigate,
  isMuted,
  onToggleSound,
  onOpenJournal,
  onActivateTrait,
  traitAvailable = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/40 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-md border border-amber-400/40">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base md:text-lg font-bold tracking-wide text-amber-100 whitespace-nowrap">
              HEROES OF PANCASILA
            </span>
            <span className="text-[10px] md:text-xs text-amber-400/80 font-medium tracking-tight whitespace-nowrap hidden sm:inline">
              Pendidikan Pancasila Kelas 7 SMP
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-2 md:gap-6 text-xs md:text-sm font-medium">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('map');
            }}
            className="px-2.5 py-1 text-stone-300 hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer rounded"
          >
            Peta Misi
          </button>

          <button
            onClick={() => {
              sound.playBookOpen();
              onOpenJournal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-amber-200/90 hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer rounded"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Jurnal Kebangsaan</span>
          </button>
        </nav>

        {/* Zone 3: HUD Status & Action */}
        <div className="flex items-center gap-3 shrink-0">
          {hero && (
            <div className="hidden sm:flex items-center gap-4 text-xs">
              {/* Unity Meter */}
              <div className="flex items-center gap-2 bg-stone-800/80 border border-stone-700/60 px-3 py-1.5 rounded-lg">
                <span className="text-stone-400">Persatuan:</span>
                <div className="w-20 bg-stone-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      unityMeter > 60 ? 'bg-emerald-500' : unityMeter > 30 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.max(0, Math.min(100, unityMeter))}%` }}
                  />
                </div>
                <span className="font-mono font-bold text-stone-200 tabular-nums">{unityMeter}%</span>
              </div>

              {/* Total XP */}
              <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-800/50 px-3 py-1.5 rounded-lg text-amber-300 font-mono font-semibold tabular-nums">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{totalXp} XP</span>
              </div>

              {/* Trait Action Button if active in chapter */}
              {onActivateTrait && (
                <button
                  onClick={() => {
                    if (traitAvailable) {
                      sound.playTraitActive();
                      onActivateTrait();
                    }
                  }}
                  disabled={!traitAvailable}
                  title={traitAvailable ? `Gunakan Keistimewaan Tokoh: ${hero.traitName}` : 'Keistimewaan telah digunakan di babak ini'}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    traitAvailable
                      ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-sm cursor-pointer'
                      : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{hero.traitName}</span>
                  <span className="md:hidden">Trait</span>
                </button>
              )}
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            title={isMuted ? 'Nyalakan Audio' : 'Bisukan Audio'}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 transition-colors cursor-pointer border border-stone-700/60"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
