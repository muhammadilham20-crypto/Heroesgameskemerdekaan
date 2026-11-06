import React from 'react';
import { Character } from '../types/game';
import { HeroAvatar } from './HeroAvatar';
import { sound } from '../utils/audio';
import { Award, Printer, RotateCcw, X, CheckCircle, Shield, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  studentName: string;
  hero: Character;
  totalXp: number;
  accuracy: number;
  completedCount: number;
  totalChapters: number;
  onClose: () => void;
  onRestart: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  studentName,
  hero,
  totalXp,
  accuracy,
  completedCount,
  totalChapters,
  onClose,
  onRestart
}) => {
  const getRank = () => {
    if (accuracy >= 85) return 'Ksatria Kebangsaan Utama – Sangat Mahir';
    if (accuracy >= 70) return 'Pejuang Nilai Merdeka – Mahir';
    return 'Kadet Pelajar Pancasila – Cakap';
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/70 rounded-3xl w-full max-w-3xl my-8 shadow-2xl overflow-hidden relative print:border-none print:shadow-none print:w-full print:max-w-none print:m-0 print:bg-white print:text-black">
        {/* Top Gold Ornament Bar */}
        <div className="h-3 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

        {/* Modal Controls */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 print:hidden">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Laporan Evaluasi Pembelajaran Guru & Siswa
            </span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded-lg text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Inner Card (Printable) */}
          <div className="mt-4 p-6 md:p-8 rounded-2xl bg-gradient-to-b from-stone-850 to-stone-900 border border-amber-900/60 text-center relative print:border print:border-black print:bg-white print:text-black">
            {/* National Crest Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-lg mb-4 border-2 border-amber-200">
              <Award className="w-9 h-9" />
            </div>

            <span className="text-xs md:text-sm font-semibold text-amber-400 uppercase tracking-widest block mb-1">
              KARTU NILAI PELAJAR PANCASILA
            </span>
            <h1 className="font-display text-2xl md:text-4xl font-black text-stone-100 print:text-black tracking-tight">
              HEROES OF PANCASILA
            </h1>
            <p className="text-xs text-stone-400 print:text-stone-700 mt-1 max-w-md mx-auto">
              Diberikan kepada siswa berprestasi dalam menyelesaikan seluruh babak perumusan dasar negara & proklamasi kemerdekaan.
            </p>

            {/* Recipient Box */}
            <div className="my-6 py-4 px-6 bg-stone-800/80 print:bg-stone-100 rounded-xl border border-stone-700/80 inline-block min-w-[280px]">
              <span className="text-[11px] text-stone-400 print:text-stone-600 uppercase tracking-wider block">
                Nama Pelajar Pancasila:
              </span>
              <span className="font-display text-xl md:text-2xl font-bold text-amber-300 print:text-black">
                {studentName || 'Pelajar Pancasila Muda'}
              </span>
              <span className="text-xs text-stone-400 print:text-stone-600 block mt-0.5">
                Mata Pelajaran: Pendidikan Pancasila · Kelas 7 SMP
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6 text-left">
              <div className="bg-stone-900/80 print:bg-stone-50 border border-stone-800 p-3 rounded-xl">
                <span className="text-[10px] text-stone-400 print:text-stone-600 uppercase tracking-wider block">Total Skor</span>
                <span className="font-mono text-base md:text-lg font-bold text-amber-400 print:text-black tabular-nums">{totalXp} XP</span>
              </div>

              <div className="bg-stone-900/80 print:bg-stone-50 border border-stone-800 p-3 rounded-xl">
                <span className="text-[10px] text-stone-400 print:text-stone-600 uppercase tracking-wider block">Akurasi Analisis</span>
                <span className="font-mono text-base md:text-lg font-bold text-emerald-400 print:text-black tabular-nums">{accuracy}%</span>
              </div>

              <div className="bg-stone-900/80 print:bg-stone-50 border border-stone-800 p-3 rounded-xl">
                <span className="text-[10px] text-stone-400 print:text-stone-600 uppercase tracking-wider block">Misi Tuntas</span>
                <span className="font-mono text-base md:text-lg font-bold text-sky-400 print:text-black tabular-nums">
                  {completedCount}/{totalChapters}
                </span>
              </div>

              <div className="bg-stone-900/80 print:bg-stone-50 border border-stone-800 p-3 rounded-xl">
                <span className="text-[10px] text-stone-400 print:text-stone-600 uppercase tracking-wider block">Tokoh Panduan</span>
                <span className="font-sans text-xs font-bold text-stone-200 print:text-black truncate block mt-1">
                  {hero.name}
                </span>
              </div>
            </div>

            {/* Predikat Capaian */}
            <div className="p-3 bg-amber-950/40 print:bg-amber-50 border border-amber-600/40 rounded-xl max-w-xl mx-auto mb-6">
              <span className="text-[11px] text-amber-400 print:text-amber-800 font-semibold uppercase tracking-wider block">
                Predikat Capaian Kurikulum Merdeka:
              </span>
              <span className="font-display text-sm md:text-base font-bold text-amber-200 print:text-amber-900">
                {getRank()}
              </span>
            </div>

            {/* Rekap 4 Dimensi Profil Pelajar Pancasila */}
            <div className="text-left max-w-2xl mx-auto mb-6 bg-stone-900/90 print:bg-stone-50 border border-stone-800 p-4 rounded-xl">
              <h4 className="text-xs font-bold text-stone-300 print:text-black uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Rekap Praktik Karakter Kebajikan yang Ditunjukkan:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-200 print:text-black block">1. Bernalar Kritis</span>
                    <span className="text-stone-400 print:text-stone-600 text-[11px]">Menganalisis dokumen sejarah & membedakan fakta vs hoaks.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-200 print:text-black block">2. Gotong Royong</span>
                    <span className="text-stone-400 print:text-stone-600 text-[11px]">Memahami sinergi dwitunggal & peran pemuda-tua.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-200 print:text-black block">3. Musyawarah Mufakat</span>
                    <span className="text-stone-400 print:text-stone-600 text-[11px]">Mengedepankan dialog santun & konsensus kebangsaan.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-200 print:text-black block">4. Berkebinekaan Global</span>
                    <span className="text-stone-400 print:text-stone-600 text-[11px]">Menghargai keberagaman suku dan agama demi persatuan NKRI.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Signature Box */}
            <div className="pt-4 border-t border-stone-800 print:border-stone-400 flex items-center justify-between text-xs text-stone-400 print:text-black max-w-xl mx-auto">
              <div className="text-left">
                <span>Tanggal Penyelesaian:</span>
                <span className="font-mono block font-semibold text-stone-200 print:text-black">
                  {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="text-right">
                <span>Tanda Tangan Guru Pembimbing:</span>
                <span className="block mt-6 border-b border-stone-500 w-32" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan Kartu Nilai (PDF)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onRestart();
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Main Ulang Petualangan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
