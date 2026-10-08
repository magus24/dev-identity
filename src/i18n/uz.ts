import type { Messages } from './types'

const uz: Messages = {
  meta: {
    title: 'David — Portfolio — Dasturiy ta’minot, AI va kiberxavfsizlik',
    description:
      'David — AI va kiberxavfsizlikka ixtisoslashgan dasturiy ta’minot muhandisi. G‘oyalar quradigan tizim: loyihalar, tajribalar, texnologiyalar va ular ortidagi hikoya.',
    ogTitle: 'David — Portfolio — Dasturiy ta’minot, AI va kiberxavfsizlik',
    ogDescription:
      'G‘oyalar quradigan tizim: loyihalar, tajribalar, texnologiyalar va ular ortidagi hikoya.',
  },
  app: {
    skip: 'Loyihalarga o‘tish',
    keysMenu: 'menyu',
    keysGuide: 'yordam',
    keysTop: 'yuqori',
    headerCenter: 'Portfolio · G‘oyalarni quradigan tizim',
    close: 'Yopish',
    index: 'Indeks',
    menuAria: 'Sayt navigatsiyasi',
    sectionsAria: 'Bo‘limlar',
    backToTop: 'Boshiga qaytish',
    location: 'O‘zbekiston',
    statusOpen: 'Loyihalar',
  },
  nav: {
    work: 'ISHLAR',
    experiments: 'TAJRIBALAR',
    about: 'MEN HAQIMDA',
    stack: 'TEXNOLOGIYALAR',
    journey: 'YO‘L',
    contact: 'ALOQA',
  },
  hero: {
    aria: 'Kirish',
    kickerPrefix: 'Portfolio — ',
    headline: ['MEN BO‘LISHI KERAK BO‘LGAN', 'NARSALARNI YARATAMAN.'],
    dragHint: 'yadroni aylantiring',
    explore: 'Ishlarni ko‘rish',
    statProjects: 'LOYIHALAR',
    statExperiments: 'TAJRIBALAR',
    statTechnologies: 'TEXNOLOGIYALAR',
  },
  ideas: {
    aria: 'Manifest',
    statement: [
      'Portfolio — bu',
      'asarlar ro‘yxati emas —',
      'bu tizim:',
      'g‘oya kiritasiz, mahsulot chiqadi.',
    ],
    steps: [
      { name: 'G‘oya', note: "ta'qib qilishga arzigulik signal" },
      { name: 'Tizim', note: "arxitekturaga aylanadi" },
      { name: 'Mahsulot', note: "ishga tushirildi, o'lchanadi, yashaydi" },
    ],
    footer: 'Bu sahifadagi hamma narsa — ma’lumotlar, geometriya va niyat funksiyasi.',
  },
  about: {
    aria: 'Men haqimda',
    factName: 'Ism',
    factRole: 'Rol',
    factFocus: 'Asosiy yo‘nalish',
    factLocation: 'Hudud',
    factTimezone: 'Vaqt mintaqasi',
    factStatus: 'Holat',
    manifestoPre: 'Men ',
    manifestoEm1: "dasturiy ta'minot, sun'iy intellekt va xavfsizlik",
    manifestoMid:
      " kesishmasida ishlayman — interfeyslar, modellar va himoya qatlamlarini quraman. Ularni bog‘lovchi narsa bitta: murakkab muammoni olib, uni ",
    manifestoEm2: 'tizimga',
    manifestoPost: ' aylantirish va foydali bo‘lguncha yetkazish.',
    disciplines: ["Dasturiy injiniring", "Sun'iy intellekt", 'Kiberxavfsizlik'],
    identityAria: 'Identifikatsiya kartasi',
    identitySystem: 'Tizim',
    identitySystemValue: 'D/P — bir marta qur, doim ishlat',
    identityState: 'Holat',
    identityStateValue: 'Loyihalar uchun ochiq',
  },
  projects: {
    aria: 'Loyihalar',
    sectionTitle: 'Ishlar — Tizimlar',
    tagsAria: 'Teglar',
    openCase: 'Case ochish',
    openCaseAria: '{title} case ni ochish',
    next: 'Keyingi: Tajribalar',
    caseLabel: 'Case',
    sourceCode: 'Manba kodi',
    liveDemo: 'Jonli demo',
    caseAria: 'case',
    fieldOverview: 'Ko‘rinish',
    fieldChallenge: 'Muammo',
    fieldSolution: 'Yechim',
    fieldResult: 'Natija',
    technologyAria: 'Texnologiyalar',
    content: {
      yotoqhonam: {
        subtitle: 'Yotoqxona boshqaruv platformasi',
        tags: ['HISOB', 'AVTOMATLASHTIRISH', 'AI'],
        description:
          "Yotoqxona — yagona operatsion tizim sifatida: talabalar, xonalar, o'rinlar, qavatlar, qabul, ko'chirish, navbatchilik va hisobot.",
        role: 'Full-stack / Mahsulot',
        type: 'Platforma',
        case: {
          overview:
            "Talabalar yotoqxonasi uchun yagona operatsion tizim — har bir karavot, qavat, navbatchilik va to'lov bir joyda.",
          challenge:
            "Jadvallar va qog'oz jurnallar: o'rinlar qo'lda sanaladi, ko'chirishda chalkashlik, hisobotlar ko'z bilan.",
          solution:
            "«Qavat → xona → o'rin» modeli, bo'sh o'rinlarni avtomatik hisoblash, qabul/ko'chirish/chiqish oqimlari va yakuniy hisobot.",
          result:
            "Administrator yotoqxona bandligini jonli ko'radi; har qanday operatsiya soatlar emas, daqiqalar oladi.",
          technology: ['TypeScript', 'React', 'PostgreSQL', 'REST', "Rollar va audit"],
          stats: [
            { value: '428', label: "Nazoratdagi talabalar" },
            { value: '96', label: "Modellashtirilgan xonalar" },
            { value: '6', label: "Asosiy modullar" },
          ],
        },
      },
      antifake: {
        subtitle: "Rasmlarni AI'dan himoya",
        tags: ['ADVERSARIAL ML', "KOMPYUTER KO'RISH", 'MUSTAHKAMLIK'],
        description:
          "Rasmlar uchun himoya qatlami: ko'zga ko'rinmas buzilish klassifikatorlarni buzsada, rasm inson uchun o'zgarishsiz qoladi.",
        role: 'Tadqiqot / ML',
        type: 'Tadqiqot',
        case: {
          overview:
            "Fotosuratlarni AI modellari uchun o'qib bo'lmaydigan, odamlar uchun esa ko'rinmas qiladigan adversarial himoya mashinasi.",
          challenge:
            "Modellar inson ko'rmagan narsalarni tanib oladi — deepfake va skreyping muallif roziligisiz ishlaydi.",
          solution:
            "Belgilar makonida kichik buzilishlar oqimini yaratish: rasm o'z ko'rinishini saqlaydi, model gradienti esa yo'qoladi.",
          result:
            "Ko'zga ko'rinmas buzilish ostida nishon modellarning klassifikatsiyasi tasodifiy darajaga tushadi.",
          technology: ['PyTorch', 'FGSM / PGD', 'TorchVision', 'NumPy'],
          stats: [
            { value: '0.03', label: 'L∞ buzilish' },
            { value: '94%', label: "Aldash muvaffaqiyati" },
            { value: '3', label: 'Sinalgan modellar' },
          ],
        },
      },
      shieldx: {
        subtitle: "Aqlli veb xavfsizligi va tahdid monitoringi",
        tags: ['WAF', 'SIEM', "TAHDID ANIQLASH"],
        description:
          "Veb himoya platformasi: trafikni tekshirish, anomaliyani aniqlash, hujumni to'xtatish va real vaqtda ogohlantirish.",
        role: "Xavfsizlik injiniringi",
        type: 'Platforma',
        case: {
          overview:
            "Veb xavfsizlik qatlami: trafikni kuzatadi, oddiy holatni o'rganadi va g'ayrioddiy narsani bloklaydi.",
          challenge:
            "Hujumlar qulay paytda kelmaydi: loglarni qo'lda tekshirish kechikadi, oddiy WAF qoidalari chetlab o'tishni o'tkazib yuboradi.",
          solution:
            "Qoidalar, xatti-harakat metrikalari va anomaliya balli bitta konveyerda: qabul → aniqlash → blok → ogohlantirish.",
          result:
            "Beshta log ko'rinishi o'rniga bitta ekran: jonli tahdid oqimi, avtomatik bloklash va tezkor ogohlantirishlar.",
          technology: ['Python', 'FastAPI', "Qoidalar dvigateli", "Anomaliya balli", 'WebSockets'],
          stats: [
            { value: '1.2K', label: 'Bloklangan tahdidlar' },
            { value: '<40ms', label: "Tekshirish kechikishi" },
            { value: '24/7', label: 'Monitoring' },
          ],
        },
      },
    },
  },
  experiments: {
    aria: 'Tajribalar',
    sectionTitle: 'Tajribalar — Maydon',
    lede: "Men tadqiq qiladigan olti yo'nalish — birini tanlang.",
    fieldPreview: 'Maydon ko‘rinishi',
    content: {
      vision: {
        title: "Kompyuter ko'rish",
        description: "Piksellarni real vaqtda aniqlash, kuzatish va tushunish.",
      },
      security: {
        title: 'Kiberxavfsizlik',
        description: "Tizimlar qanday buzilishini tushunish uchun ularni buzish va mustahkamlash.",
      },
      agents: {
        title: 'AI agentlar',
        description: "Reja tuzadigan, vositalar ishlatadigan va ishni oxiriga yetkazadigan avtonom tsikllar.",
      },
      interfaces: {
        title: '3D interfeyslar',
        description: "WebGL va shaderlar asosidagi fazoviy, interaktiv yuzalar.",
      },
      reverse: {
        title: 'Teskari muhandislik',
        description: "Disassembly, protokollar va qora qutilarni tushunish.",
      },
      hardware: {
        title: 'Uskuna',
        description: "Sensorlar, mikrokontrollerlar va fizik qatlam.",
      },
    },
  },
  stack: {
    aria: 'Texnologiyalar to‘plami',
    sectionTitle: 'Texnologiyalar — Orbita',
    lede: 'Hammasi yadro atrofida aylanadi. Tugun ustiga keltirib qo‘ying.',
    coreLabel: 'Yadro',
    coreSub: "g'oyalar → tizimlar",
    legendRing1: '1-halqa — asosiy injiniring',
    legendRing2: '2-halqa — tizimlar va infratuzilma',
  },
  stackDesc: {
    Python: { description: "ML tadqiqot, vositalar, backendlar" },
    TypeScript: { description: "Tipik mahsulot injiniringi" },
    React: { description: "Animatsiya va holat bilan interfeyslar" },
    JavaScript: { description: "Veb — boshidan oxirigacha" },
    PyTorch: { description: "Modellar, o'qitish, tajribalar" },
    'Three.js': { description: "Vebda real vaqtli 3D" },
    Linux: { description: "Kundalik muhit va serverlar" },
    Docker: { description: "Qayta takrorlanadigan deploy" },
    Git: { description: "Tarix, review, yetkazish" },
    Cybersecurity: { description: "Tahdidlar, himoya, tahlil" },
    AI: { description: "Agentlar, ko'rish, mustahkamlik" },
  },
  journey: {
    aria: "Yo'l",
    sectionTitle: "Yo'l — Qurilish tarixi",
    lede: "Qisqasi: har yili bir qatlam qo'shildi — avval sahifalar, keyin tizimlar.",
    entries: [
      {
        year: '2024',
        title: "Dastlabki loyihalar",
        description:
          "Veb asoslari, avtomatlashtirish skriptlari va real foydalanuvchilarga yetkazilgan ilk narsalar.",
      },
      {
        year: '2025',
        title: 'AI / Kiberxavfsizlik',
        description:
          "Sahifalar qurishdan tizimlar qurishga o'tdim — modellar, agentlar, tahdid tahlili.",
      },
      {
        year: '2026',
        title: 'AntiFake · Yotoqhonam · SHIELDX',
        description:
          "Uch jiddiy qurilish: adversarial tadqiqot, yotoqxona platformasi, xavfsizlik mahsuloti.",
      },
      {
        year: 'HOZIR',
        title: 'Hamkorlikka ochiq',
        description:
          "Qiyin masalalar, shijoatli jamoalar va munosib bajariladigan tadqiqot qidiryapman.",
      },
    ],
  },
  contact: {
    aria: 'Aloqa',
    sectionTitle: 'Aloqa — ochiq kanal',
    titleAria: 'G‘oya bormi?',
    lines: ['G‘oya bormi?', 'Birgalikda', 'yodda qoladigan', 'narsa quraylik.'],
    lead: "Tizim, mahsulot, tajriba — agar u mavjud bo'lishi kerak bo'lsa, uni quraman. Qaysi kanalni istasang, o'shasini tanla.",
    channels: 'Kanallar',
  },
  finale: {
    aria: 'Yakuniy bayonot',
    title: ['Hammasi bitta', "g'oyadan boshlanadi."],
    sub: "Tizim yadrosi qayta yig'ildi — D/P · Portfolio",
  },
  footer: {
    note: "g'oyalar quradigan tizim",
    top: '↑ Yuqoriga',
  },
  command: {
    aria: "Buyruqlar menyusi",
    inputLabel: 'Buyruq kiriting',
    placeholder: "navigatsiya, aloqa yoki o'tish…",
    commandsAria: "Buyruqlar",
    groupNav: 'Navigatsiya',
    groupSections: "Bo'limlar",
    groupContact: 'Aloqa',
    backToTop: "Boshiga qaytish",
    empty: "«{query}» bo'yicha hech narsa topilmadi",
  },
  guide: {
    aria: 'Klaviatura yorliqlari',
    titlePre: 'Yorliqlar — ',
    titleEm: "bu dvigatelni qanday boshqarish",
    rows: [
      { keys: ['/'], value: "Buyruqlar menyusini ochish" },
      { keys: ['?'], value: "Bu yordamni ko'rsatish" },
      { keys: ['ESC'], value: "Qatlamlarni yopish" },
      { keys: ['D'], value: "Boshiga qaytish" },
      { keys: ['YADRO drag'], value: "Ob'yektni aylantirish" },
      { keys: ['Sahifa'], value: "YADROni boblar bo'yicha o'zgartirish" },
    ],
  },
  status: {
    coreOnline: "YADRO: ONLAYN",
    nodes: "TARMOQ TUGUNLARI",
    signalActive: "SIGNAL FAOL",
    systemReady: "TIZIM TAYYOR",
  },
  cursor: {
    view: "KO'RISH",
    open: 'OCHISH',
    go: 'DAVOM',
    drag: 'SURISH',
    rotate: 'AYLANTIRISH',
    node: "TUGUN FAOL",
    language: 'TIL',
  },
  language: {
    aria: 'Til',
    uz: 'UZ',
    ru: 'RU',
    en: 'EN',
    uzFull: "O'zbekcha",
    ruFull: 'Русский',
    enFull: 'English',
  },
  socials: {
    email: 'Elektron pochta',
  },
}

export default uz