import React from 'react';
import { HeroId } from '../types/game';

interface HeroAvatarProps {
  heroId: HeroId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const HeroAvatar: React.FC<HeroAvatarProps> = ({ heroId, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36'
  }[size];

  const renderVisual = () => {
    switch (heroId) {
      case 'soekarno':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="bg-soekarno" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="24" fill="url(#bg-soekarno)" />
            {/* Aura Gold Ring */}
            <circle cx="60" cy="60" r="54" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />
            {/* Peci Hitam Khas Bung Karno */}
            <path d="M38 42 C38 28, 82 28, 82 42 L84 48 C84 50, 36 50, 36 48 Z" fill="#18181b" />
            <polygon points="40,32 44,27 76,27 80,32" fill="#27272a" opacity="0.8" />
            {/* Face */}
            <ellipse cx="60" cy="56" rx="20" ry="22" fill="#fcd34d" />
            {/* Hair under peci */}
            <path d="M40 48 Q60 52 80 48 Q82 54 80 56 Q60 54 40 56 Z" fill="#18181b" />
            {/* Eyebrows & Eyes */}
            <path d="M46 51 Q51 49 55 52" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M65 52 Q69 49 74 51" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="51" cy="55" r="2.5" fill="#18181b" />
            <circle cx="69" cy="55" r="2.5" fill="#18181b" />
            {/* Nose & Firm Mouth */}
            <path d="M60 55 L58 63 L63 63" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M52 68 Q60 71 68 68" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            {/* Collar & Jas Pejuang Putih */}
            <path d="M32 94 C34 78, 48 76, 60 76 C72 76, 86 78, 88 94 L88 120 L32 120 Z" fill="#f8fafc" />
            <path d="M52 76 L60 90 L68 76" fill="#cbd5e1" />
            <polygon points="60,76 56,86 64,86" fill="#b91c1c" />
            {/* Lencana Merah Putih */}
            <circle cx="44" cy="92" r="5" fill="#dc2626" />
            <path d="M40 92 A4 4 0 0 0 48 92 Z" fill="#f8fafc" />
          </svg>
        );

      case 'hatta':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="bg-hatta" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="24" fill="url(#bg-hatta)" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            {/* Hair Sleek Parting */}
            <path d="M38 46 C38 30, 82 30, 82 46 C76 38, 44 38, 38 46 Z" fill="#1e293b" />
            {/* Face */}
            <ellipse cx="60" cy="56" rx="19" ry="22" fill="#fed7aa" />
            {/* Eyeglasses Bung Hatta (Kacamata Bulat Khas) */}
            <circle cx="51" cy="54" r="7.5" fill="none" stroke="#d97706" strokeWidth="2.2" />
            <circle cx="69" cy="54" r="7.5" fill="none" stroke="#d97706" strokeWidth="2.2" />
            <line x1="58.5" y1="54" x2="61.5" y2="54" stroke="#d97706" strokeWidth="2" />
            <circle cx="51" cy="54" r="2" fill="#0f172a" />
            <circle cx="69" cy="54" r="2" fill="#0f172a" />
            {/* Calm Expression */}
            <path d="M59 55 L58 64 L62 64" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M53 70 Q60 72 67 70" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Formal Diplomat Suit */}
            <path d="M30 96 C34 78, 50 78, 60 78 C70 78, 86 78, 90 96 L90 120 L30 120 Z" fill="#1e293b" />
            {/* White Shirt & Tie */}
            <polygon points="52,78 60,94 68,78" fill="#f8fafc" />
            <polygon points="57,84 63,84 61,104 59,104" fill="#0284c7" />
          </svg>
        );

      case 'yamin':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="bg-yamin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="24" fill="url(#bg-yamin)" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />
            {/* Hair / Penampilan Klasik */}
            <path d="M40 44 C40 30, 80 30, 80 44 C74 36, 46 36, 40 44 Z" fill="#1c1917" />
            {/* Face */}
            <ellipse cx="60" cy="56" rx="19" ry="22" fill="#fed7aa" />
            {/* Expressive literary eyes */}
            <path d="M46 50 Q52 48 56 51" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M64 51 Q68 48 74 50" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="51" cy="54" r="2.5" fill="#18181b" />
            <circle cx="69" cy="54" r="2.5" fill="#18181b" />
            {/* Smile / Orator Poet */}
            <path d="M59 55 L58 63 L63 63" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <path d="M52 69 Q60 73 68 69" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Jas Sastrawan Tradisional */}
            <path d="M30 96 C34 78, 48 78, 60 78 C72 78, 86 78, 90 96 L90 120 L30 120 Z" fill="#3f3f46" />
            <polygon points="54,78 60,92 66,78" fill="#f4f4f5" />
            {/* Quill / Pena Emas Badge */}
            <path d="M80 72 L86 64 C88 66, 88 68, 86 70 Z" fill="#f59e0b" />
          </svg>
        );

      case 'soepomo':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="bg-soepomo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="24" fill="url(#bg-soepomo)" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" />
            {/* Hair neat */}
            <path d="M38 42 C42 28, 78 28, 82 42 C74 34, 46 34, 38 42 Z" fill="#27272a" />
            {/* Face */}
            <ellipse cx="60" cy="56" rx="20" ry="22" fill="#fcd34d" />
            {/* Sleek Glasses */}
            <rect x="44" y="49" width="13" height="9" rx="3" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <rect x="63" y="49" width="13" height="9" rx="3" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <line x1="57" y1="53" x2="63" y2="53" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="50" cy="53.5" r="2" fill="#18181b" />
            <circle cx="70" cy="53.5" r="2" fill="#18181b" />
            {/* Thoughtful expression */}
            <path d="M59 55 L58 63 L62 63" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <path d="M53 69 Q60 71 67 69" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Jas Magister Hukum */}
            <path d="M30 96 C34 78, 48 78, 60 78 C72 78, 86 78, 90 96 L90 120 L30 120 Z" fill="#312e81" />
            <polygon points="52,78 60,94 68,78" fill="#e0e7ff" />
            {/* Timbangan Keadilan mini badge */}
            <circle cx="44" cy="92" r="5" fill="#a855f7" />
          </svg>
        );

      case 'fatmawati':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="bg-fatmawati" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#4c0519" />
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="24" fill="url(#bg-fatmawati)" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            {/* Kerudung Selendang Anggun Merah Marun */}
            <path d="M34 38 C34 22, 86 22, 86 38 C90 56, 88 84, 82 96 C74 100, 46 100, 38 96 C32 84, 30 56, 34 38 Z" fill="#e11d48" />
            {/* Face oval inside veil */}
            <ellipse cx="60" cy="56" rx="17" ry="20" fill="#fde68a" />
            {/* Eyes gentle and brave */}
            <path d="M47 50 Q52 48 55 51" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M65 51 Q68 48 73 50" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="51" cy="54" r="2.2" fill="#1c1917" />
            <circle cx="69" cy="54" r="2.2" fill="#1c1917" />
            {/* Smile */}
            <path d="M59 56 L58 63 L62 63" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M54 69 Q60 72 66 69" stroke="#9f1239" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            {/* Kebaya Tradisional & Selendang */}
            <path d="M32 98 C36 84, 48 84, 60 84 C72 84, 84 84, 88 98 L88 120 L32 120 Z" fill="#fff1f2" />
            <polygon points="56,84 60,94 64,84" fill="#fb7185" />
            {/* Bendera Merah Putih emblem */}
            <rect x="76" y="78" width="12" height="4" fill="#e11d48" rx="1" />
            <rect x="76" y="82" width="12" height="4" fill="#ffffff" rx="1" />
          </svg>
        );

      case 'sukarni':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="bg-sukarni" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="24" fill="url(#bg-sukarni)" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />
            {/* Rambut Pemuda Bergelombang */}
            <path d="M38 42 C38 26, 82 26, 82 42 C76 34, 44 34, 38 42 Z" fill="#18181b" />
            {/* Pita Merah Putih di Dahi Pemuda */}
            <rect x="36" y="40" width="48" height="3" fill="#dc2626" />
            <rect x="36" y="43" width="48" height="3" fill="#ffffff" />
            {/* Face */}
            <ellipse cx="60" cy="58" rx="19" ry="21" fill="#fed7aa" />
            {/* Fierce Determined Eyes */}
            <path d="M46 52 L54 55" stroke="#451a03" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M74 52 L66 55" stroke="#451a03" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="51" cy="57" r="2.5" fill="#18181b" />
            <circle cx="69" cy="57" r="2.5" fill="#18181b" />
            {/* Bold energetic expression */}
            <path d="M59 58 L57 65 L63 65" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M52 71 Q60 74 68 71" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Pakaian Pejuang Kemeja Khaki Lapangan */}
            <path d="M30 96 C34 80, 48 80, 60 80 C72 80, 86 80, 90 96 L90 120 L30 120 Z" fill="#78350f" />
            <polygon points="54,80 60,94 66,80" fill="#fde68a" />
            {/* Api Semangat Pemuda */}
            <path d="M82 72 Q86 64 84 60 Q88 64 88 68 Q90 62 92 66 Q90 74 82 72 Z" fill="#f97316" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
      {renderVisual()}
    </div>
  );
};
