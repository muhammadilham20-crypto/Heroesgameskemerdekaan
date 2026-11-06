import { MatchPair, DecisionNode, TextChangeItem, JournalEntry, QuestionBattle } from '../types/game';

export interface ChapterData {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  location: string;
  iconName: string;
  overview: string;
  narrativeIntro: string[];
  goals: string[];
  pancasilaPillars: string[];
  matchPairs?: MatchPair[];
  dialogueNodes?: DecisionNode[];
  proclamationSnippets?: { id: number; text: string; correctOrder: number }[];
  textChanges?: TextChangeItem[];
  battles: QuestionBattle[];
  journal: JournalEntry;
}

export const CHAPTERS_DATA: ChapterData[] = [
  // ==========================================
  // CHAPTER 1
  // ==========================================
  {
    id: 1,
    title: 'THE PROMISE & THE DAWN',
    subtitle: 'Latar Belakang BPUPKI & Perumusan Dasar Negara',
    period: '29 April – 1 Juni 1945',
    location: 'Gedung Chuo Sangi In (Gedung Pancasila, Pejambon 6 Jakarta)',
    iconName: 'Building',
    overview: 'Memasuki masa akhir pendudukan Jepang, kekalahan mereka di Perang Asia Timur Raya melahirkan janji kemerdekaan. Bangsa Indonesia tidak berdiam diri, melainkan bergerak cepat merumuskan fondasi filosofis kemerdekaan melalui sidang BPUPKI.',
    narrativeIntro: [
      'Tahun 1944–1945: Posisi militer Jepang semakin terdesak oleh pasukan Sekutu di Pasifik. Untuk menarik simpati rakyat Indonesia, Perdana Menteri Kuniaki Koiso pada 7 September 1944 menjanjikan kemerdekaan bagi Hindia Timur di kelak kemudian hari.',
      'Pada 29 April 1945 (bertepatan dengan hari ulang tahun Kaisar Hirohito), Letnan Jenderal Kumakichi Harada mengumumkan pembentukan BPUPKI (Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia / Dokuritsu Junbi Cosakai) yang diketuai dr. K.R.T. Radjiman Wedyodiningrat.',
      'Dalam Sidang Pertama BPUPKI (29 Mei – 1 Juni 1945), dr. Radjiman melontarkan pertanyaan agung: "Indonesia merdeka yang akan kita bangun, apakah dasar negaranya?" Tiga tokoh agung bangsa tampil menjawab panggilan sejarah!'
    ],
    goals: [
      'Menjelaskan latar belakang pembentukan dan tujuan BPUPKI.',
      'Mengenal 3 tokoh utama pengusul gagasan dasar negara (Moh. Yamin, Soepomo, Soekarno).',
      'Mengelompokkan rumusan gagasan dasar negara tanpa tertukar.',
      'Meneladani nilai gotong royong dan berpikir kritis para pendiri bangsa.'
    ],
    pancasilaPillars: ['Bernalar Kritis', 'Semangat Kebangsaan'],
    matchPairs: [
      {
        id: 'y1',
        concept: 'Peri Kebangsaan',
        tokoh: 'yamin',
        tokohName: 'Mr. Mohammad Yamin',
        date: '29 Mei 1945',
        explanation: 'Yamin menegaskan perlunya ikatan kebangsaan yang bersumber pada peradaban dan sejarah Nusantara.'
      },
      {
        id: 'y2',
        concept: 'Peri Kemanusiaan',
        tokoh: 'yamin',
        tokohName: 'Mr. Mohammad Yamin',
        date: '29 Mei 1945',
        explanation: 'Menjunjung harkat kemanusiaan universal tanpa penindasan antarbangsa.'
      },
      {
        id: 'y3',
        concept: 'Peri Ketuhanan',
        tokoh: 'yamin',
        tokohName: 'Mr. Mohammad Yamin',
        date: '29 Mei 1945',
        explanation: 'Keyakinan bahwa bangsa Indonesia adalah bangsa yang religius dan bertakwa sejak ribuan tahun silam.'
      },
      {
        id: 'y4',
        concept: 'Peri Kerakyatan',
        tokoh: 'yamin',
        tokohName: 'Mr. Mohammad Yamin',
        date: '29 Mei 1945',
        explanation: 'Kedaulatan berada di tangan rakyat melalui jalan permusyawaratan.'
      },
      {
        id: 'y5',
        concept: 'Kesejahteraan Rakyat',
        tokoh: 'yamin',
        tokohName: 'Mr. Mohammad Yamin',
        date: '29 Mei 1945',
        explanation: 'Kemerdekaan sejati adalah ketika seluruh rakyat terbebas dari kemelaratan.'
      },
      {
        id: 's1',
        concept: 'Persatuan (Integrasi Bangsa)',
        tokoh: 'soepomo',
        tokohName: 'Prof. Dr. Mr. Soepomo',
        date: '31 Mei 1945',
        explanation: 'Negara mengatasi segala golongan, tidak memihak satu kelompok atau ras mana pun.'
      },
      {
        id: 's2',
        concept: 'Kekeluargaan',
        tokoh: 'soepomo',
        tokohName: 'Prof. Dr. Mr. Soepomo',
        date: '31 Mei 1945',
        explanation: 'Asas gotong royong adat Nusantara, di mana rakyat dan pemimpin saling memelihara.'
      },
      {
        id: 's3',
        concept: 'Keseimbangan Lahir dan Batin',
        tokoh: 'soepomo',
        tokohName: 'Prof. Dr. Mr. Soepomo',
        date: '31 Mei 1945',
        explanation: 'Pembangunan material harus beriringan dengan spiritual dan ketenangan rohani batiniah.'
      },
      {
        id: 's4',
        concept: 'Musyawarah',
        tokoh: 'soepomo',
        tokohName: 'Prof. Dr. Mr. Soepomo',
        date: '31 Mei 1945',
        explanation: 'Pemimpin negara senantiasa bermusyawarah dengan wakil-wakil rakyat secara tulus.'
      },
      {
        id: 's5',
        concept: 'Keadilan Rakyat',
        tokoh: 'soepomo',
        tokohName: 'Prof. Dr. Mr. Soepomo',
        date: '31 Mei 1945',
        explanation: 'Menjamin keadilan distributif bagi setiap warga negara tanpa diskriminasi feodal.'
      },
      {
        id: 'k1',
        concept: 'Kebangsaan Indonesia (Nasionalisme)',
        tokoh: 'soekarno',
        tokohName: 'Ir. Soekarno',
        date: '1 Juni 1945',
        explanation: 'Satu Nationale Staat dari Sabang sampai Merauke, melampaui batas suku dan kedaerahan.'
      },
      {
        id: 'k2',
        concept: 'Internasionalisme (Peri Kemanusiaan)',
        tokoh: 'soekarno',
        tokohName: 'Ir. Soekarno',
        date: '1 Juni 1945',
        explanation: 'Bung Karno menegaskan: "Nasionalisme kita bukanlah chauvinisme; nasionalisme kita mekar dalam taman sari internasionalisme".'
      },
      {
        id: 'k3',
        concept: 'Mufakat atau Demokrasi',
        tokoh: 'soekarno',
        tokohName: 'Ir. Soekarno',
        date: '1 Juni 1945',
        explanation: 'Badan permusyawaratan perwakilan di mana segala gagasan diuji dan diputuskan bersama secara mufakat.'
      },
      {
        id: 'k4',
        concept: 'Kesejahteraan Sosial',
        tokoh: 'soekarno',
        tokohName: 'Ir. Soekarno',
        date: '1 Juni 1945',
        explanation: 'Keadilan sosial agar tidak ada kapitalisme yang menindas kaum marhaen/buruh dan tani.'
      },
      {
        id: 'k5',
        concept: 'Ketuhanan yang Berkebudayaan',
        tokoh: 'soekarno',
        tokohName: 'Ir. Soekarno',
        date: '1 Juni 1945',
        explanation: 'Tiap-tiap orang Indonesia hendaknya bertuhan dengan saling menghormati dan toleransi tanpa egoisme religi.'
      }
    ],
    battles: [
      {
        id: 'b1-1',
        threatName: 'Kabut Keraguan',
        threatDescription: 'Bisikan pesimistis: "Kemerdekaan ini hanyalah hadiah politik dari Jepang."',
        scenario: 'Sebagian kalangan di Chuo Sangi In merasa skeptis dengan janji kemerdekaan Jepang.',
        question: 'Bagaimana sikap para pendiri bangsa dalam merespons janji pembentukan BPUPKI oleh Jepang?',
        options: [
          {
            text: 'Menolak mentah-mentah dan tidak mau menghadiri sidang apa pun.',
            isCorrect: false,
            explanation: 'Sikap reaktif tanpa strategi akan menyia-nyiakan momentum emas perjuangan.'
          },
          {
            text: 'Memanfaatkan badan tersebut secara cerdas untuk menyusun pondasi kemerdekaan atas prakarsa bangsa sendiri.',
            isCorrect: true,
            explanation: 'Tepat! Para tokoh bangsa cerdik memanfaatkan fasilitas BPUPKI sebagai wadah legal mengkonsolidasikan kemerdekaan sejati, bukan kemerdekaan boneka.'
          },
          {
            text: 'Menunggu instruksi resmi sepenuhnya dari Panglima Militer Jepang di Tokyo.',
            isCorrect: false,
            explanation: 'Para pendiri bangsa bukan sekadar boneka pasif, melainkan pejuang otonom berjiwa merdeka.'
          }
        ],
        pancasilaPillar: 'Bernalar Kritis & Siasat Diplomasi'
      },
      {
        id: 'b1-2',
        threatName: 'Distorsi Sejarah',
        threatDescription: 'Kerancuan mengenai siapa tokoh yang pertama kali mencetuskan istilah "Pancasila" pada 1 Juni 1945.',
        scenario: 'Seorang peserta sidang menanyakan asal-usul istilah lima prinsip dasar negara yang diusulkan Bung Karno.',
        question: 'Dari mana Bung Karno memperoleh masukan nama "Pancasila" untuk kelima asas yang disampaikannya pada 1 Juni 1945?',
        options: [
          {
            text: 'Dikarang sendiri secara spontan tanpa berkonsultasi dengan siapa pun.',
            isCorrect: false,
            explanation: 'Bung Karno secara jujur menyatakan bahwa nama tersebut merupakan usulan seorang kawan ahli bahasa.'
          },
          {
            text: 'Atas petunjuk seorang ahli bahasa (linguist) yang juga sahabat beliau.',
            isCorrect: true,
            explanation: 'Benar sekali! Bung Karno berujar: "Sila artinya asas atau dasar, dan di atas kelima dasar itulah kita mendirikan negara Indonesia, kekal dan abadi". Nama Pancasila diberikan atas nasihat kawan ahli bahasa.'
          },
          {
            text: 'Diterjemahkan langsung dari instruksi dokumen hukum militer Jepang.',
            isCorrect: false,
            explanation: 'Pancasila lahir murni dari akar budaya, falsafah, dan bahasa luhur Nusantara (Sansekerta/Kawi).'
          }
        ],
        pancasilaPillar: 'Integritas & Kejujuran Intelektual'
      }
    ],
    journal: {
      chapterId: 1,
      title: 'Kelahiran Nama Pancasila di Chuo Sangi In',
      date: '1 Juni 1945',
      location: 'Gedung Pancasila, Jl. Pejambon No. 6, Jakarta Pusat',
      historicalSummary: 'BPUPKI dibentuk 29 April 1945 beranggotakan 67 orang (60 tokoh Indonesia dan 7 orang perwakilan Jepang). Sidang Pertama berlangsung 29 Mei - 1 Juni 1945 untuk merumuskan dasar negara. Tiga pemikir besar—Yamin, Soepomo, dan Soekarno—menyampaikan pidato bersejarah yang mengkristalkan kepribadian bangsa.',
      keyPoints: [
        'dr. K.R.T. Radjiman Wedyodiningrat membuka sidang dengan pertanyaan esensial: "Apa dasar negara kita?".',
        '29 Mei 1945: Moh. Yamin mengusulkan 5 asas secara lisan dan tulisan.',
        '31 Mei 1945: Prof. Soepomo memaparkan Teori Negara Integralistik berasas kekeluargaan.',
        '1 Juni 1945: Ir. Soekarno memperkenalkan nama "Pancasila" sebagai Philosophische Grondslag, diperingati sebagai Hari Lahir Pancasila.'
      ],
      inspirationalQuote: '"Pancasila adalah meja statis tempat kita berpijak, dan leitstar dinamis yang memandu arah masa depan bangsa."',
      pancasilaReflection: 'Karakter utama pendiri bangsa adalah keterbukaan mendengarkan, saling menghormati pendapat, dan menempatkan persatuan di atas kepentingan pribadi.'
    }
  },

  // ==========================================
  // CHAPTER 2
  // ==========================================
  {
    id: 2,
    title: 'THE PANITIA SEMBILAN & THE GENTLEMEN’S AGREEMENT',
    subtitle: 'Kompromi Luhur dan Lahirnya Piagam Jakarta',
    period: '22 Juni 1945',
    location: 'Kediaman Bung Karno, Jl. Pegangsaan Timur 56, Jakarta',
    iconName: 'Users',
    overview: 'Sidang Pertama BPUPKI berakhir tanpa kesepakatan final naskah hukum dasar. Maka pada masa reses dibentuk Panitia Sembilan yang mewakili Golongan Kebangsaan dan Golongan Islam. Terjadilah musyawarah paling bersejarah demi persatuan.',
    narrativeIntro: [
      'Setelah masa sidang pertama BPUPKI selesai pada 1 Juni 1945, dibentuk Panitia Kecil (Panitia Delapan) dan disempurnakan menjadi Panitia Sembilan untuk menampung dan menyelaraskan usul dasar negara.',
      'Sembilan tokoh tersebut mewakili dua kutub aspirasi utama: Golongan Kebangsaan (Soekarno, Moh. Hatta, A.A. Maramis, Achmad Soebardjo, Moh. Yamin) dan Golongan Islam (K.H. Wachid Hasjim, Kahar Muzakir, H. Agus Salim, Abikoesno Tjokrosoejoso).',
      'Terjadi perdebatan mendalam mengenai corak dasar negara: apakah negara berbasis syariat agama atau negara nasional netral agama. Jalan buntu mengancam perpecahan bangsa sebelum merdeka!'
    ],
    goals: [
      'Menyebutkan anggota Panitia Sembilan dan latar belakang representasinya.',
      'Memahami proses musyawarah mufakat yang melahirkan Piagam Jakarta (Jakarta Charter).',
      'Mengidentifikasi semangat toleransi dan kerelaan berkorban para tokoh bangsa.',
      'Menerapkan prinsip komunikasi santun saat menghadapi perbedaan pendapat di kelas.'
    ],
    pancasilaPillars: ['Musyawarah Mufakat', 'Gotong Royong'],
    dialogueNodes: [
      {
        id: 'node-2-1',
        speaker: 'K.H. A. Wachid Hasjim',
        speakerRole: 'Wakil Golongan Islam',
        dialogue: '"Mengingat mayoritas rakyat Indonesia beragama Islam yang gigih melawan penjajah, hukum syariat patut menjadi napas utama negara baru ini."',
        contextNote: 'Aspirasi kelompok Islam ingin kepastian peran moral agama dalam penyelenggaraan negara.',
        choices: [
          {
            id: 'c1',
            text: '"Usul tersebut tidak relevan! Indonesia harus sepenuhnya sekuler tanpa menyinggung nilai ketuhanan sama sekali."',
            isOptimal: false,
            unityImpact: -15,
            xpReward: 10,
            reflection: 'Sikap menyerang dan menafikan keyakinan kelompok lain justru memicu konfrontasi dan menutup pintu musyawarah.',
            pancasilaPillar: 'Hindari Polarisasi Ekstrem'
          },
          {
            id: 'c2',
            text: '"Kami sangat menghormati semangat religius saudaraku. Mari kita cari formula luhur di mana nilai Ketuhanan menjadi payung etika bangsa yang merangkul semua pemeluk agama secara adil."',
            isOptimal: true,
            unityImpact: 20,
            xpReward: 50,
            reflection: 'Inilah contoh musyawarah sejati: menghargai niat baik lawan bicara lalu mencari titik temu (kalimatun sawa) yang merekatkan.',
            pancasilaPillar: 'Musyawarah Mufakat'
          },
          {
            id: 'c3',
            text: '"Biarkan saja sidang ini bubar, kita putuskan nanti lewat voting adu jumlah siapa yang paling banyak."',
            isOptimal: false,
            unityImpact: -25,
            xpReward: 5,
            reflection: 'Voting mayoritas-minoritas tanpa dialog mendalam berisiko mencederai persaudaraan kebangsaan yang sedang dirajut.',
            pancasilaPillar: 'Kekeluargaan di atas Dominasi'
          }
        ]
      },
      {
        id: 'node-2-2',
        speaker: 'Mr. A.A. Maramis',
        speakerRole: 'Wakil Tokoh Indonesia Timur (Non-Muslim)',
        dialogue: '"Kami dari wilayah Indonesia Timur dan non-Muslim siap berjuang bersama, asalkan dasar negara menjamin hak dan kesetaraan seluruh anak bangsa tanpa kasta kewarganegaraan."',
        contextNote: 'Kekhawatiran akan diskriminasi hukum bagi warga non-Muslim di wilayah kepulauan Nusantara.',
        choices: [
          {
            id: 'c4',
            text: '"Yang minoritas harus tunduk pada apa pun keputusan kelompok terbanyak."',
            isOptimal: false,
            unityImpact: -20,
            xpReward: 10,
            reflection: 'Paham tirani mayoritas bertentangan dengan asas gotong royong dan keadilan sosial Pancasila.',
            pancasilaPillar: 'Keadilan Bagi Seluruh Rakyat'
          },
          {
            id: 'c5',
            text: '"Pernyataan Saudara Maramis sangat bijak. Kebinekaan kita adalah modal kekuatan, bukan kelemahan. Kita sepakati Piagam yang menjamin persaudaraan sebangsa se-tanah air!"',
            isOptimal: true,
            unityImpact: 25,
            xpReward: 50,
            reflection: 'Bung Karno dan tokoh Islam menyambut hangat kompromi ini hingga lahirlah konsensus "Gentlemen\'s Agreement".',
            pancasilaPillar: 'Kebinekaan Tunggal Ika'
          }
        ]
      }
    ],
    battles: [
      {
        id: 'b2-1',
        threatName: 'Egoisme Golongan',
        threatDescription: 'Sikap mementingkan kelompok sendiri tanpa memedulikan nasib persatuan seluruh bangsa.',
        scenario: 'Perdebatan rancangan naskah pada 22 Juni 1945 di Pegangsaan Timur 56 Jakarta.',
        question: 'Mengapa rumusan dasar negara dalam Piagam Jakarta (22 Juni 1945) disebut oleh Mr. Moh. Yamin sebagai "Gentlemen’s Agreement"?',
        options: [
          {
            text: 'Karena naskah tersebut ditulis dalam bahasa Belanda oleh para diplomat ningrat.',
            isCorrect: false,
            explanation: 'Naskah Piagam Jakarta disusun dalam Bahasa Indonesia ragam hukum yang bernas.'
          },
          {
            text: 'Karena merupakan wujud kesepakatan luhur antartokoh berjiwa ksatria yang saling mengalah demi persatuan Indonesia.',
            isCorrect: true,
            explanation: 'Luar biasa! Disebut Gentlemen’s Agreement karena baik tokoh kebangsaan maupun tokoh Islam rela menekan ego masing-masing demi melahirkan konsensus bersama.'
          },
          {
            text: 'Karena hanya ditandatangani oleh sembilan orang perwira militer bersenjata.',
            isCorrect: false,
            explanation: 'Panitia Sembilan adalah tokoh sipil pergerakan politik dan keagamaan, bukan militer bersenjata.'
          }
        ],
        pancasilaPillar: 'Toleransi & Kompromi Luhur'
      }
    ],
    journal: {
      chapterId: 2,
      title: 'Piagam Jakarta & Konsensus Panitia Sembilan',
      date: '22 Juni 1945',
      location: 'Kediaman Bung Karno, Jl. Pegangsaan Timur No. 56, Jakarta',
      historicalSummary: 'Panitia Sembilan berhasil merumuskan rancangan Pembukaan UUD yang di dalamnya termaktub 5 asas dasar negara. Rumusan ini dinamai "Jakarta Charter" (Piagam Jakarta) oleh Mr. Moh. Yamin, "Mukaddimah" oleh Sukiman Wirjosandjojo, dan "Gentlemen’s Agreement" karena melambangkan kearifan dialog tingkat tinggi para bapak bangsa.',
      keyPoints: [
        'Komposisi Panitia Sembilan seimbang antara Golongan Nasionalis Kebangsaan dan Golongan Nasionalis Islam.',
        'Sila pertama berbunyi: "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya".',
        'Piagam Jakarta menjadi cikal bakal alinea keempat Pembukaan UUD 1945 yang diresmikan pada 18 Agustus 1945.',
        'Jiwa toleransi dan dialog santun terbukti mampu memecahkan kebuntuan politik bangsa.'
      ],
      inspirationalQuote: '"Kita hendak mendirikan suatu negara \'semua buat semua\', bukan buat satu orang, bukan buat satu golongan!"',
      pancasilaReflection: 'Musyawarah mufakat bukan sekadar mencari pemenang, melainkan menemukan kebaikan bersama dengan lapang dada.'
    }
  },

  // ==========================================
  // CHAPTER 3
  // ==========================================
  {
    id: 3,
    title: 'VACUUM OF POWER & RENGASDENGKLOK DRAMA',
    subtitle: 'Keberanian Pemuda, Pertimbangan Kematangan, dan Jaminan Nyawa',
    period: '15 – 16 Agustus 1945',
    location: 'Menteng 31 & Asrama PETA Rengasdengklok, Karawang',
    iconName: 'Zap',
    overview: 'Setelah Sekutu menjatuhkan bom atom di Hiroshima dan Nagasaki, Jepang menyerah tanpa syarat pada 14/15 Agustus 1945. Terjadilah situasi kekosongan kekuasaan (Vacuum of Power). Pemuda bergerak cepat mendesak Bung Karno dan Bung Hatta segera memproklamasikan kemerdekaan.',
    narrativeIntro: [
      '6 & 9 Agustus 1945: Kota Hiroshima dan Nagasaki dihancurkan bom atom Sekutu. Kekuatan fasisme Dai Nippon runtuh.',
      '15 Agustus 1945: Kaisar Hirohito membacakan siaran radio (Gyokuon-hoso) menyatakan penyerahan tanpa syarat Jepang kepada Sekutu. Berita ini didengar sembunyi-sembunyi oleh para pemuda seperti Sutan Sjahrir lewat radio gelap.',
      'Kekosongan kekuasaan (Vacuum of Power) terjadi: Jepang sudah menyerah tetapi Sekutu belum tiba di Nusantara. Pemuda mendesak kemerdekaan dideklarasikan malam itu juga di luar campur tangan PPKI!',
      'Malam 15 Agustus di Pegangsaan Timur 56: Wikana dan pemuda mendesak keras. Bung Karno menjawab tegas: "Ini leher saya! Seretlah saya ke pojok sana dan sudahilah nyawa saya malam ini juga, tapi jangan paksa saya bertindak gegabah tanpa perhitungan matang!"',
      'Dini hari 16 Agustus 1945: Golongan muda mengamankan Soekarno dan Hatta ke Rengasdengklok, Karawang, agar terhindar dari pengaruh dan siasat Jepang.'
    ],
    goals: [
      'Menjelaskan pengertian dan situasi Vacuum of Power di Indonesia.',
      'Menganalisis perdebatan Golongan Muda vs Golongan Tua secara objektif.',
      'Meneladani sikap patriotisme pemuda yang diimbangi kalkulasi strategis golongan tua.',
      'Memahami peran diplomatis Mr. Ahmad Soebardjo yang menjaminkan nyawanya demi persatuan bangsa.'
    ],
    pancasilaPillars: ['Cinta Tanah Air', 'Gotong Royong Antargenerasi'],
    dialogueNodes: [
      {
        id: 'node-3-1',
        speaker: 'Wikana & Sukarni',
        speakerRole: 'Eksponen Golongan Muda (Menteng 31)',
        dialogue: '"Bung Karno! Rakyat dan pemuda sudah siap angkat senjata! Jika kemerdekaan tidak diumumkan malam ini juga, besok akan terjadi pertumpahan darah dahsyat!"',
        contextNote: 'Pemuda khawatir kemerdekaan dianggap sekadar hadiah pemberian Jepang jika menunggu sidang PPKI.',
        choices: [
          {
            id: 'd1',
            text: '"Kalian anak muda tidak tahu apa-apa! Menyingkirlah dan jangan ikut campur urusan politik orang tua!"',
            isOptimal: false,
            unityImpact: -20,
            xpReward: 5,
            reflection: 'Meremehkan suara generasi muda dapat memutuskan jembatan kepercayaan dan memicu bentrokan fisik sesama anak bangsa.',
            pancasilaPillar: 'Komunikasi Antargenerasi'
          },
          {
            id: 'd2',
            text: '"Kami sangat bangga atas darah mudamu yang menyala-nyala. Namun proklamasi bukan sekadar pekik kemarahan; kita butuh konsolidasi kekuatan militer dan diplomasi agar bayi kemerdekaan tidak segera dihancurkan tentara Jepang."',
            isOptimal: true,
            unityImpact: 25,
            xpReward: 50,
            reflection: 'Bung Hatta dan Bung Karno mengajarkan bahwa keberanian tanpa kalkulasi matang bisa berubah menjadi bunuh diri massal. Menyatukan api pemuda dengan strategi dingin adalah kunci kemenangan.',
            pancasilaPillar: 'Bernalar Kritis & Sinergi Kebangsaan'
          }
        ]
      },
      {
        id: 'node-3-2',
        speaker: 'Mr. Achmad Soebardjo',
        speakerRole: 'Tokoh Diplomat Penghubung',
        dialogue: '"Wahai saudara-saudaraku pemuda di Rengasdengklok. Bawalah Bung Karno dan Bung Hatta kembali ke Jakarta. Saya menjaminkan nyawa saya: besok paling lambat pukul 12.00 siang proklamasi akan dilaksanakan!"',
        contextNote: 'Ahmad Soebardjo tiba di Rengasdengklok menjemput dwitunggal untuk segera menyusun teks proklamasi di Jakarta.',
        choices: [
          {
            id: 'd3',
            text: '"Kami tidak percaya siapapun! Bung Karno dan Bung Hatta tetap kami sandera di sini selamanya."',
            isOptimal: false,
            unityImpact: -25,
            xpReward: 5,
            reflection: 'Sikap keras kepala tanpa dasar rasional akan melumpuhkan kepemimpinan nasional pada saat kritis.',
            pancasilaPillar: 'Kepercayaan Antarpejuang'
          },
          {
            id: 'd4',
            text: '"Jaminan nyawa seorang tokoh berintegritas seperti Tuan Soebardjo adalah bukti ketulusan cinta tanah air. Mari kita bersatu kembali ke Jakarta untuk mempersiapkan proklamasi!"',
            isOptimal: true,
            unityImpact: 30,
            xpReward: 50,
            reflection: 'Komandan PETA Shodanco Singgih dan Sukarni menerima jaminan mulia tersebut. Rombongan kembali ke Jakarta pada malam 16 Agustus 1945.',
            pancasilaPillar: 'Gotong Royong & Pengorbanan Luhur'
          }
        ]
      }
    ],
    battles: [
      {
        id: 'b3-1',
        threatName: 'Provokasi Penjajah',
        threatDescription: 'Upaya memecah belah pergerakan kemerdekaan menjadi faksi radikal dan faksi kooperatif.',
        scenario: 'Penyelidikan latar belakang peristiwa Rengasdengklok 16 Agustus 1945.',
        question: 'Apakah tujuan utama Golongan Muda membawa Soekarno dan Hatta ke Rengasdengklok pada 16 Agustus 1945?',
        options: [
          {
            text: 'Untuk mencelakakan dan menggulingkan dwitunggal Soekarno-Hatta.',
            isCorrect: false,
            explanation: 'Sama sekali tidak! Pemuda sangat menghormati dwitunggal sebagai pemimpin sah rakyat Indonesia.'
          },
          {
            text: 'Menjauhkan dwitunggal dari pengaruh militer Jepang dan meyakinkan mereka bahwa rakyat siap memproklamasikan kemerdekaan.',
            isCorrect: true,
            explanation: 'Benar sekali! Rengasdengklok dipilih karena aman dari patroli Jepang dan dilindungi oleh prajurit PETA (Pembela Tanah Air) yang setia pada kemerdekaan.'
          },
          {
            text: 'Menyerahkan dwitunggal ke markas tentara Sekutu yang sudah mendarat di Karawang.',
            isCorrect: false,
            explanation: 'Pada 16 Agustus 1945, tentara Sekutu belum mendarat di Pulau Jawa.'
          }
        ],
        pancasilaPillar: 'Pemahaman Sejarah Objektif'
      }
    ],
    journal: {
      chapterId: 3,
      title: 'Drama Rengasdengklok & Sinergi Pemuda-Tua',
      date: '16 Agustus 1945',
      location: 'Asrama PETA Rengasdengklok & Rumah Djiaw Kie Siong, Karawang',
      historicalSummary: 'Peristiwa Rengasdengklok bukanlah peristiwa penculikan kriminal berdarah, melainkan ikhtiar patriotik pemuda (Sukarni, Wikana, Chaerul Saleh, Singgih, Jusuf Kunto) untuk melepaskan dwitunggal dari perangkap birokrasi Jepang. Diplomasi luhur Mr. Achmad Soebardjo mengakhiri ketegangan dengan jaminan integritas.',
      keyPoints: [
        'Kekalahan Jepang menciptakan Vacuum of Power yang menuntut keputusan cepat dan berani.',
        'Perbedaan Golongan Muda vs Golongan Tua berpangkal pada cara pandang: Golongan Muda menghendaki aksi revolusioner spontan, Golongan Tua menginginkan perhitungan yuridis dan diplomasi terencana.',
        'Sinergi antargenerasi: Keberanian pemuda memicu kecepatan aksi, sedangkan kematangan golongan tua menjamin legitimasi hukum dan kesiapan pertahanan.',
        'Mr. Ahmad Soebardjo bertaruh nyawa demi menjemput dwitunggal kembali ke Jakarta.'
      ],
      inspirationalQuote: '"Dua kekuatan yang saling berpadu: keberanian pemuda yang menembus malam, dan kearifan para tetua yang menatap terbitnya matahari merdeka."',
      pancasilaReflection: 'Perbedaan pandangan antargenerasi dapat menjadi kekuatan dahsyat manakala disatukan oleh tujuan mulia yang sama: kemerdekaan Indonesia.'
    }
  },

  // ==========================================
  // CHAPTER 4
  // ==========================================
  {
    id: 4,
    title: 'THE SECRET ROOM AT MIDNIGHT',
    subtitle: 'Perumusan Teks Proklamasi di Rumah Maeda',
    period: '17 Agustus 1945 (Dini Hari 02.00 – 04.30 WIB)',
    location: 'Kediaman Laksamana Muda Tadashi Maeda (Jl. Imam Bonjol No. 1, Jakarta Pusat)',
    iconName: 'FileText',
    overview: 'Malam 16 Agustus menjelang dini hari 17 Agustus 1945, ruang makan Laksamana Maeda menjadi saksi berkumpulnya para pendiri bangsa merumuskan naskah proklamasi. Kalimat demi kalimat ditimbang dengan cermat.',
    narrativeIntro: [
      'Kembali ke Jakarta tengah malam, Hotel Des Indes menolak menyewakan ruangan karena jam malam militer Jepang. Laksamana Muda Tadashi Maeda, perwira AL Jepang yang bersimpati pada perjuangan bangsa, mempersilakan rumah dinasnya digunakan demi keselamatan para tokoh.',
      'Di ruang makan lantai satu, tiga tokoh utama duduk mengitari meja bundar: Ir. Soekarno (menuliskan naskah), Drs. Mohammad Hatta (menyumbangkan ide kalimat kedua), dan Mr. Achmad Soebardjo (menyumbangkan ide kalimat pertama).',
      'Di ruang depan, puluhan tokoh pemuda dan anggota PPKI menunggu dengan berdebar.',
      'Setelah naskah selesai disusun, muncullah masalah krusial: "Siapa yang akan menandatangani naskah bersejarah ini?" Sukarni tampil memberikan jalan keluar revolusioner, lalu Sayuti Melik mengetik naskah dengan mesin tik sambil menyempurnakan beberapa ejaan!'
    ],
    goals: [
      'Menyebutkan para tokoh yang berkontribusi menyusun kalimat Proklamasi.',
      'Menyusun urutan draft teks Proklamasi secara kronologis.',
      'Menemukan 3 perubahan teks bersejarah yang diketik oleh Sayuti Melik.',
      'Memahami arti penandatanganan "Atas nama bangsa Indonesia".'
    ],
    pancasilaPillars: ['Bernalar Kritis', 'Keberanian & Gotong Royong'],
    proclamationSnippets: [
      {
        id: 1,
        text: 'PROKLAMASI',
        correctOrder: 1
      },
      {
        id: 2,
        text: 'Kami bangsa Indonesia dengan ini menjatakan kemerdekaan Indonesia.',
        correctOrder: 2
      },
      {
        id: 3,
        text: 'Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan dengan tjara seksama dan dalam tempo jang sesingkat-singkatnja.',
        correctOrder: 3
      },
      {
        id: 4,
        text: 'Djakarta, hari 17 boelan 8 tahoen 05\nAtas nama bangsa Indonesia\nSoekarno / Hatta.',
        correctOrder: 4
      }
    ],
    textChanges: [
      {
        id: 'tc1',
        originalText: 'tempoh',
        revisedText: 'tempo',
        actor: 'Sayuti Melik',
        historicalSignificance: 'Penyempurnaan kata dari bentuk lisan/dialek menjadi ejaan baku yang lebih lugas dan tegas.',
        identified: false
      },
      {
        id: 'tc2',
        originalText: 'wakil2 bangsa Indonesia',
        revisedText: 'Atas nama bangsa Indonesia',
        actor: 'Sayuti Melik (atas usul Sukarni)',
        historicalSignificance: 'Mengubah kesan representasi parsial menjadi kedaulatan mutlak seluruh rakyat dari Sabang sampai Merauke.',
        identified: false
      },
      {
        id: 'tc3',
        originalText: 'Djakarta, 17-08-\'05',
        revisedText: 'Djakarta, hari 17 boelan 8 tahoen 05',
        actor: 'Sayuti Melik',
        historicalSignificance: 'Penulisan formal tahun penanggalan resmi Jepang (皇紀 / Kōki 2605 = 1945 Masehi) demi kepastian hukum saat itu.',
        identified: false
      }
    ],
    battles: [
      {
        id: 'b4-1',
        threatName: 'Hoaks Sejarah',
        threatDescription: 'Klaim keliru yang menyebut teks proklamasi didikte oleh perwira Jepang.',
        scenario: 'Penyusunan naskah di ruang makan Maeda dini hari 17 Agustus 1945.',
        question: 'Siapakah dua tokoh yang menyumbangkan gagasan kalimat pertama dan kedua dalam naskah proklamasi yang ditulis tangan oleh Bung Karno?',
        options: [
          {
            text: 'Laksamana Maeda dan Jenderal Terauchi.',
            isCorrect: false,
            explanation: 'Maeda sama sekali tidak ikut campur dalam perumusan kalimat dan memilih tidur di lantai atas demi menjaga netralitas.'
          },
          {
            text: 'Mr. Achmad Soebardjo (kalimat pertama) dan Drs. Mohammad Hatta (kalimat kedua).',
            isCorrect: true,
            explanation: 'Tepat sekali! Soebardjo menyumbangkan kalimat pernyataan kemerdekaan dari Piagam Jakarta, sedangkan Bung Hatta menyumbang kalimat teknis pemindahan kekuasaan.'
          },
          {
            text: 'Sayuti Melik dan B.M. Diah.',
            isCorrect: false,
            explanation: 'Sayuti Melik bertugas mengetik naskah, sedangkan B.M. Diah menyelamatkan naskah tulisan tangan Bung Karno dari tempat sampah.'
          }
        ],
        pancasilaPillar: 'Kebenaran Fakta Sejarah'
      }
    ],
    journal: {
      chapterId: 4,
      title: 'Dini Hari Bersejarah di Rumah Maeda',
      date: '17 Agustus 1945 (Dini Hari)',
      location: 'Museum Perumusan Naskah Proklamasi, Jl. Imam Bonjol No. 1, Menteng, Jakarta',
      historicalSummary: 'Naskah Proklamasi terbagi menjadi dua versi: Naskah Klad (tulisan tangan Bung Karno) dan Naskah Otentik (hasil ketikan Sayuti Melik dengan mesin tik berhuruf kanji pinjaman dari perwira Jerman). Keputusan menandatangani "Atas nama bangsa Indonesia" oleh Soekarno-Hatta atas usulan Sukarni mengukuhkan dwitunggal sebagai representasi sah seluruh rakyat.',
      keyPoints: [
        'Tiga perumus utama di meja bundar: Soekarno (penulis), Soebardjo (kalimat kemerdekaan), Hatta (kalimat pemindahan kekuasaan).',
        'Sukarni mengusulkan dwitunggal menandatangani teks, mencontoh penandatanganan Deklarasi Kemerdekaan Amerika Serikat.',
        'Sayuti Melik mengubah ejaan "tempoh" menjadi "tempo", "wakil-wakil bangsa Indonesia" menjadi "Atas nama bangsa Indonesia", dan menyelaraskan penanggalan.',
        'Wartawan B.M. Diah mengamankan draft tulisan tangan Bung Karno yang sempat dibuang, sehingga naskah klad tersebut dapat kita saksikan hingga hari ini.'
      ],
      inspirationalQuote: '"Dua alinea singkat, namun sanggup meruntuhkan rantai belenggu penjajahan tiga setengah abad."',
      pancasilaReflection: 'Ketelitian dalam menyusun dokumen kebangsaan menunjukkan tanggung jawab luhur terhadap masa depan seluruh rakyat.'
    }
  },

  // ==========================================
  // CHAPTER 5
  // ==========================================
  {
    id: 5,
    title: 'PROCLAMATION & THE FIRST STEP OF THE NATION',
    subtitle: 'Pekik Kemerdekaan & Sidang PPKI 18 Agustus 1945',
    period: '17 – 18 Agustus 1945',
    location: 'Pegangsaan Timur 56 & Gedung Kesenian Jakarta (Gedung Pancasila/Kemlu)',
    iconName: 'Award',
    overview: 'Pukul 10.00 WIB di Pegangsaan Timur 56, Proklamasi Kemerdekaan dibacakan dengan khidmat di hadapan ratusan rakyat. Keesokan harinya, 18 Agustus 1945, PPKI bersidang mengesahkan UUD 1945, memilih Presiden-Wapres, dan mengabadikan Pancasila sebagai Dasar Negara dengan jiwa toleransi tertinggi.',
    narrativeIntro: [
      'Jumat Legi, 17 Agustus 1945, bulan Ramadhan 1364 H. Di halaman kediaman Bung Karno, Jl. Pegangsaan Timur 56, berkumpul ratusan rakyat, pejuang, dan pemuda bersenjata bambu runcing.',
      'Pukul 10.00 WIB, dengan suara bergetar penuh wibawa, Ir. Soekarno didampingi Drs. Mohammad Hatta membacakan naskah Proklamasi Kemerdekaan Republik Indonesia.',
      'Sang Saka Merah Putih yang dijahit tangan oleh Ibu Fatmawati dikibarkan oleh Latief Hendraningrat dan S. Suhud, diiringi lagu kebangsaan Indonesia Raya yang dinyanyikan spontan tanpa iringan musik oleh seluruh hadirin!',
      'Namun tugas belum usai! Tanggal 18 Agustus 1945 pagi, PPKI menghadapi ujian persatuan terbesar: keberatan warga Indonesia Timur terhadap 7 kata sila pertama Piagam Jakarta. Bung Hatta mengumpulkan para tokoh Islam demi menyelamatkan keutuhan NKRI!'
    ],
    goals: [
      'Menceritakan detik-detik pembacaan Proklamasi dan pengibaran Sang Saka Merah Putih.',
      'Menghayati jiwa besar tokoh-tokoh Islam (Ki Bagus Hadikusumo, Wahid Hasjim, Kasman Singodimedjo) dalam mengubah sila pertama demi keutuhan NKRI.',
      'Menyebutkan 3 keputusan vital Sidang Pertama PPKI 18 Agustus 1945.',
      'Menunjukkan komitmen mengamalkan nilai-nilai Pancasila dalam kehidupan sehari-hari siswa SMP.'
    ],
    pancasilaPillars: ['Kebinekaan Global', 'Persatuan Indonesia', 'Keadilan Sosial'],
    battles: [
      {
        id: 'b5-1',
        threatName: 'Ujian Keutuhan Bangsa',
        threatDescription: 'Kabar dari seorang perwira Angkatan Laut Jepang (Kaigun) bahwa rakyat Indonesia Timur keberatan dengan 7 kata sila pertama jika Indonesia ingin bersatu.',
        scenario: 'Pagi hari 18 Agustus 1945 sebelum sidang pleno PPKI dimulai di Pejambon.',
        question: 'Bagaimana Bung Hatta dan para pendiri bangsa menyelesaikan keberatan atas rumusan sila pertama Piagam Jakarta pada 18 Agustus 1945?',
        options: [
          {
            text: 'Memaksakan sila pertama tetap dipertahankan dan membiarkan wilayah timur memisahkan diri.',
            isCorrect: false,
            explanation: 'Sikap tersebut akan merobek persatuan Indonesia sejak hari pertama kelahirannya.'
          },
          {
            text: 'Mengadakan musyawarah kilat dengan para tokoh Islam (Ki Bagus Hadikusumo, Kasman Singodimedjo, Teuku Hasan) dan dengan lapang dada mengubahnya menjadi "Ketuhanan Yang Maha Esa".',
            isCorrect: true,
            explanation: 'Benar sekali! Inilah monumen toleransi dan kebesaran jiwa para tokoh Islam pendiri bangsa demi merangkul seluruh suku dan agama dalam rumah bersama NKRI.'
          },
          {
            text: 'Membatalkan proklamasi kemerdekaan dan menyerahkan kekuasaan kembali kepada Sekutu.',
            isCorrect: false,
            explanation: 'Kemerdekaan adalah harga mati yang tidak mungkin dibatalkan.'
          }
        ],
        pancasilaPillar: 'Persatuan & Kelapangan Jiwa Kebangsaan'
      },
      {
        id: 'b5-2',
        threatName: 'Ujian Legalitas Negara',
        threatDescription: 'Negara yang baru merdeka membutuhkan struktur pemerintahan yang sah dan konstitusi tertulis.',
        scenario: 'Sidang Pertama PPKI dipimpin oleh Ir. Soekarno pada 18 Agustus 1945.',
        question: 'Manakah di bawah ini yang merupakan 3 KEPUTUSAN UTAMA Sidang PPKI pada 18 Agustus 1945?',
        options: [
          {
            text: '1) Menetapkan mata uang rupiah, 2) Mengumumkan perang terhadap Sekutu, 3) Membuka kedutaan besar di Belanda.',
            isCorrect: false,
            explanation: 'Bukan itu keputusan sidang pertama PPKI pada 18 Agustus 1945.'
          },
          {
            text: '1) Mengesahkan UUD 1945, 2) Memilih Ir. Soekarno sebagai Presiden & Drs. Moh. Hatta sebagai Wakil Presiden, 3) Membentuk Komite Nasional Indonesia Pusat (KNIP).',
            isCorrect: true,
            explanation: 'Sempurna! Tiga pilar konstitusional ini resmi melahirkan Republik Indonesia yang berdaulat secara hukum dan tata negara.'
          },
          {
            text: '1) Membentuk TNI Angkatan Udara, 2) Mengadakan pemilu umum legislatif langsung, 3) Menandatangani perjanjian Renville.',
            isCorrect: false,
            explanation: 'TNI belum terbentuk (baru BKR dibentuk 22 Agustus) dan pemilu baru terlaksana tahun 1955.'
          }
        ],
        pancasilaPillar: 'Kedaulatan Hukum & Konstitusi'
      },
      {
        id: 'b5-3',
        threatName: 'Tantangan Penerus Masa Depan',
        threatDescription: 'Bagaimana generasi muda Pelajar Pancasila meneruskan api perjuangan kemerdekaan hari ini.',
        scenario: 'Refleksi penutup perjalanan petualangan Heroes of Pancasila.',
        question: 'Sebagai pelajar SMP kelas 7 di era digital, wujud nyata pengamalan sila ketiga "Persatuan Indonesia" di lingkungan sekolah adalah...',
        options: [
          {
            text: 'Membuat geng eksklusif berdasarkan asal suku atau kemampuan ekonomi keluarga.',
            isCorrect: false,
            explanation: 'Sikap eksklusif merusak kerukunan dan memicu perundungan (bullying).'
          },
          {
            text: 'Berteman akrab dengan siapa saja tanpa membedakan suku, agama, dan ras, serta aktif gotong royong menjaga persahabatan.',
            isCorrect: true,
            explanation: 'Luar biasa! Pelajar Pancasila sejati menjunjung tinggi persaudaraan dan kebinekaan dalam tindakan nyata setiap hari.'
          },
          {
            text: 'Menyebarkan kabar provokatif di media sosial demi mencari popularitas semata.',
            isCorrect: false,
            explanation: 'Menyebar hoaks bertentangan dengan pilar bernalar kritis dan akhlak mulia.'
          }
        ],
        pancasilaPillar: 'Profil Pelajar Pancasila Sejati'
      }
    ],
    journal: {
      chapterId: 5,
      title: 'Fajar Kemerdekaan & Konsensus 18 Agustus 1945',
      date: '17 – 18 Agustus 1945',
      location: 'Jl. Pegangsaan Timur 56 & Gedung Pancasila, Jakarta',
      historicalSummary: 'Indonesia resmi berdiri tegak sebagai bangsa merdeka pada 17 Agustus 1945. Pada 18 Agustus 1945, UUD 1945 disahkan dan di dalam Pembukaannya tercantum rumusan Pancasila yang sah dan mengikat hingga hari ini: 1. Ketuhanan Yang Maha Esa, 2. Kemanusiaan yang adil dan beradab, 3. Persatuan Indonesia, 4. Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan, 5. Keadilan sosial bagi seluruh rakyat Indonesia.',
      keyPoints: [
        'Upacara Proklamasi berlangsung sederhana namun khidmat di Pegangsaan Timur 56 tanpa pengeras suara canggih.',
        'Ibu Fatmawati menjahit Sang Saka Merah Putih dengan ketulusan hati.',
        'Jiwa kenegarawanan para tokoh Islam mengubah 7 kata sila pertama demi keutuhan NKRI adalah teladan toleransi tertinggi dalam sejarah dunia.',
        'Tiga keputusan PPKI 18 Agustus: Mengesahkan UUD 1945, memilih Presiden dan Wakil Presiden, serta membentuk KNIP.'
      ],
      inspirationalQuote: '"Indonesia bukan milik suatu golongan, bukan milik suatu agama, bukan milik suatu suku, tetapi milik kita semua dari Sabang sampai Merauke!"',
      pancasilaReflection: 'Tugas kita hari ini bukan lagi memanggul senjata, melainkan mengisi kemerdekaan dengan prestasi, bernalar kritis, dan gotong royong memajukan bangsa.'
    }
  }
];
