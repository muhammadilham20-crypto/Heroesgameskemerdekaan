import React, { useState } from 'react';
import { Character, HeroId } from './types/game';
import { HEROES } from './data/heroes';
import { CHAPTERS_DATA, ChapterData } from './data/chapters';
import { Header } from './components/Header';
import { HeroSelection } from './components/HeroSelection';
import { ChapterMap } from './components/ChapterMap';
import { ChapterStage } from './components/ChapterStage';
import { NationalJournal } from './components/NationalJournal';
import { CertificateModal } from './components/CertificateModal';
import { sound } from './utils/audio';
import { Sparkles, Download, BookOpen, ShieldAlert } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<'selection' | 'map' | 'chapter'>('selection');
  const [selectedHero, setSelectedHero] = useState<Character | null>(null);
  const [studentName, setStudentName] = useState<string>('Pelajar Pancasila Muda');

  const [currentChapterId, setCurrentChapterId] = useState<number>(1);
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([1]);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [chapterAccuracies, setChapterAccuracies] = useState<Record<number, number>>({});

  const [unityMeter, setUnityMeter] = useState<number>(100);
  const [totalXp, setTotalXp] = useState<number>(0);
  const [traitUsesRemaining, setTraitUsesRemaining] = useState<number>(1);

  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Character selection callback
  const handleSelectHero = (hero: Character, name: string) => {
    setSelectedHero(hero);
    setStudentName(name);
    setScreen('map');
    setTraitUsesRemaining(1);
    sound.playSuccess();
  };

  // Select chapter from map
  const handleSelectChapter = (chapterId: number) => {
    setCurrentChapterId(chapterId);
    setScreen('chapter');
    setTraitUsesRemaining(1); // reset trait for each chapter
    sound.playClick();
  };

  // Unity Meter update with bounds
  const handleUpdateUnity = (delta: number) => {
    setUnityMeter((prev) => {
      const updated = Math.min(100, Math.max(0, prev + delta));
      return updated;
    });
  };

  // Trait activation handler
  const handleUseTrait = () => {
    if (traitUsesRemaining <= 0 || !selectedHero) return;
    setTraitUsesRemaining((prev) => prev - 1);

    if (selectedHero.id === 'soekarno') {
      handleUpdateUnity(20);
    } else if (selectedHero.id === 'fatmawati') {
      setUnityMeter(100);
    } else if (selectedHero.id === 'yamin' || selectedHero.id === 'sukarni') {
      setTotalXp((prev) => prev + 40);
    }
  };

  // Complete a chapter
  const handleFinishChapter = (chapterId: number, xpEarned: number, accuracy: number) => {
    setTotalXp((prev) => prev + xpEarned);

    setChapterAccuracies((prev) => ({
      ...prev,
      [chapterId]: accuracy
    }));

    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters((prev) => [...prev, chapterId]);
    }

    // Unlock next chapter if exists
    if (chapterId < 5 && !unlockedChapters.includes(chapterId + 1)) {
      setUnlockedChapters((prev) => [...prev, chapterId + 1]);
    }

    // If finished Chapter 5, show certificate!
    if (chapterId === 5) {
      setIsCertificateOpen(true);
    }

    setScreen('map');
  };

  const handleRestart = () => {
    setSelectedHero(null);
    setScreen('selection');
    setUnlockedChapters([1]);
    setCompletedChapters([]);
    setChapterAccuracies({});
    setTotalXp(0);
    setUnityMeter(100);
    setIsCertificateOpen(false);
  };

  const currentChapterData = CHAPTERS_DATA.find((c) => c.id === currentChapterId) || CHAPTERS_DATA[0];

  const overallAccuracy =
    Object.values(chapterAccuracies).length > 0
      ? Math.round(
          Object.values(chapterAccuracies).reduce((a, b) => a + b, 0) /
            Object.values(chapterAccuracies).length
        )
      : 100;

  // Single-file offline HTML export generator
  const handleExportSingleFile = () => {
    sound.playClick();
    const standaloneHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Heroes of Pancasila: The Quest for Freedom</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Cinzel:wght@700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-display { font-family: 'Cinzel', serif; }
  </style>
</head>
<body class="bg-stone-900 text-stone-100 min-h-screen">
  <div class="max-w-4xl mx-auto p-6 text-center">
    <div class="p-8 bg-stone-800 rounded-3xl border border-amber-500/60 shadow-2xl my-10">
      <h1 class="font-display text-3xl md:text-5xl font-bold text-amber-300 mb-2">HEROES OF PANCASILA</h1>
      <p class="text-stone-300 text-sm md:text-base mb-6">Petualangan Merumuskan Dasar Negara & Mengantar Indonesia Merdeka · Kelas 7 SMP</p>
      <div class="bg-stone-900 p-6 rounded-2xl border border-stone-700 text-left space-y-4 text-xs md:text-sm">
        <h3 class="font-bold text-amber-400 uppercase tracking-wider">Modul Kurikulum Merdeka Pendidikan Pancasila:</h3>
        <p>1. Babak 1: BPUPKI & Perumusan Dasar Negara (Yamin, Soepomo, Soekarno)</p>
        <p>2. Babak 2: Panitia Sembilan & Piagam Jakarta (Gentlemen's Agreement)</p>
        <p>3. Babak 3: Vacuum of Power & Diplomasi Rengasdengklok</p>
        <p>4. Babak 4: Ruang Rahasia Rumah Maeda & Rekonstruksi Naskah Proklamasi</p>
        <p>5. Babak 5: Detik-Detik Proklamasi & Sidang PPKI 18 Agustus 1945</p>
      </div>
      <div class="mt-8 text-xs text-stone-400">
        Dikembangkan secara interaktif untuk pembelajaran berbasis game di laboratorium komputer sekolah dan gawai pintar siswa.
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Heroes-of-Pancasila-Kelas7.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* Top Bar Navigation */}
      <Header
        hero={selectedHero}
        unityMeter={unityMeter}
        totalXp={totalXp}
        currentScreen={screen}
        onNavigate={(target) => {
          if (target === 'map') setScreen('map');
        }}
        isMuted={isMuted}
        onToggleSound={() => {
          const next = !isMuted;
          setIsMuted(next);
          sound.isMuted = next;
        }}
        onOpenJournal={() => setIsJournalOpen(true)}
        onActivateTrait={handleUseTrait}
        traitAvailable={traitUsesRemaining > 0 && screen === 'chapter'}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {screen === 'selection' && (
          <HeroSelection onSelectHero={handleSelectHero} />
        )}

        {screen === 'map' && selectedHero && (
          <ChapterMap
            chapters={CHAPTERS_DATA}
            unlockedChapters={unlockedChapters}
            completedChapters={completedChapters}
            currentChapter={currentChapterId}
            hero={selectedHero}
            studentName={studentName}
            totalXp={totalXp}
            onSelectChapter={handleSelectChapter}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {screen === 'chapter' && selectedHero && (
          <ChapterStage
            chapter={currentChapterData}
            hero={selectedHero}
            unityMeter={unityMeter}
            traitUsesRemaining={traitUsesRemaining}
            onUseTrait={handleUseTrait}
            onUpdateUnity={handleUpdateUnity}
            onFinishChapter={handleFinishChapter}
            onOpenJournal={() => setIsJournalOpen(true)}
          />
        )}
      </main>

      {/* Footer Info Bar */}
      <footer className="border-t border-stone-800/80 bg-stone-900/60 py-4 px-4 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-stone-200">
              Heroes of Pancasila
            </span>
            <span>·</span>
            <span>Pendidikan Pancasila Kelas 7 SMP</span>
            <span>·</span>
            <span>Kurikulum Merdeka</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleExportSingleFile}
              className="flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-colors cursor-pointer"
              title="Unduh file HTML tunggal untuk disimpan di flashdisk atau dibagikan ke siswa"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Berkas HTML Mandiri</span>
            </button>
          </div>
        </div>
      </footer>

      {/* National Journal Modal */}
      {isJournalOpen && (
        <NationalJournal
          unlockedChapters={unlockedChapters}
          onClose={() => setIsJournalOpen(false)}
        />
      )}

      {/* Student Certificate Modal */}
      {isCertificateOpen && selectedHero && (
        <CertificateModal
          studentName={studentName}
          hero={selectedHero}
          totalXp={totalXp}
          accuracy={overallAccuracy}
          completedCount={completedChapters.length}
          totalChapters={CHAPTERS_DATA.length}
          onClose={() => setIsCertificateOpen(false)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
