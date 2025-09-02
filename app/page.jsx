/**
 * Premium single-page site for "Servet Akademisi"
 * Framework: Next.js 14 (App Router)
 * Styling: Tailwind CSS (dark theme with metallic accents)
 * Single-file deliverable with hardcoded mock data and inline SVG charts.
 */

"use client"; // This is a client component

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';

// Inline components to make the file self-contained
const Header = () => (
  <header className="py-6 px-6">
    <div className="mx-auto max-w-7xl flex items-center justify-between">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="text-xl font-bold text-neutral-500 w-10 h-10 rounded-full" >
          <img 
            src="/images/ServetAkademisiLogo.png" 
            alt="Güvenilirlik ve Şeffaflık" 
            className="w-full h-full rounded-full object-cover" 
          />
      </div>
      <div className="text-xl font-bold text-neutral-500" >
        <span className="text-white">Servet</span>
        <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #C8A951, #FFD700, #B8860B)" }}>
          Akademisi
        </span>
      </div>
      </div>
      <nav className="hidden sm:flex items-center gap-8 text-neutral-400 font-medium">
        <a href="#signals" className="hover:text-white transition-colors duration-200">Sinyaller</a>
        <a href="#pricing" className="hover:text-white transition-colors duration-200">Fiyatlandırma</a>
        <a href="#faq" className="hover:text-white transition-colors duration-200">S.S.S.</a>
      </nav>
      <a href="#pricing" className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-black" style={{ backgroundImage: "linear-gradient(90deg, #C8A951, #FFD700, #B8860B)", forced-color-adjust: none; }}>
        Hemen Başla
      </a>
    </div>
  </header>
);

const FaqAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-8 space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-xl border border-white/10 p-5 cursor-pointer transition-colors duration-200 hover:bg-white/[0.03]" onClick={() => toggleAnswer(index)}>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-white">{faq.q}</h3>
            <svg
              className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className={`mt-3 overflow-hidden transition-max-h duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
            <p className="text-neutral-400">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function HomePage() {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [canScrollLeft1, setCanScrollLeft1] = useState(false);
  const [canScrollRight1, setCanScrollRight1] = useState(true);
  const [canScrollLeft2, setCanScrollLeft2] = useState(false);
  const [canScrollRight2, setCanScrollRight2] = useState(true);

  const checkScroll = (ref, setLeft, setRight) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setLeft(scrollLeft > 0);
      setRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 350; // A good scroll distance
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      checkScroll(scrollRef1, setCanScrollLeft1, setCanScrollRight1);
      checkScroll(scrollRef2, setCanScrollLeft2, setCanScrollRight2);
    };

    const element1 = scrollRef1.current;
    const element2 = scrollRef2.current;

    if (element1) {
      element1.addEventListener('scroll', () => checkScroll(scrollRef1, setCanScrollLeft1, setCanScrollRight1));
    }
    if (element2) {
      element2.addEventListener('scroll', () => checkScroll(scrollRef2, setCanScrollLeft2, setCanScrollRight2));
    }
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      if (element1) {
        element1.removeEventListener('scroll', () => checkScroll(scrollRef1, setCanScrollLeft1, setCanScrollRight1));
      }
      if (element2) {
        element2.removeEventListener('scroll', () => checkScroll(scrollRef2, setCanScrollLeft2, setCanScrollRight2));
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ------------------------------
  // Mock data for signals and pricing
  // ------------------------------
  const signalItems = [
    {
      id: "btc",
      symbol: "Bitcoin",
      startDate: "02-10-2017",
      performance5Y: 9560,
      buyHoldPerformance: 2360, // Added buy & hold performance
      // Two series: strategy vs buy & hold, normalized values 0–100
      seriesSignal: [2, 1, 1, 0, 0, 4, 4, 5, 34, 34, 37, 31, 21, 26, 29, 68, 61, 86, 78, 100],
      seriesBuyHold: [2, 1, 0, 0, 0, 1, 1, 1, 11, 9, 8, 8, 2, 4, 5, 14, 13, 21, 21, 25],
      img: "/globe.svg",
    },
    {
      id: "eth",
      symbol: "ETH",
      startDate: "06-09-2017",
      performance5Y: 12970,
      buyHoldPerformance: 1329, // Added buy & hold performance
      seriesSignal: [0, 0, 1, 1, 1, 2, 2, 3, 7, 27, 37, 59, 46, 59, 36, 32, 36, 38, 35, 45, 56, 48, 41, 38, 40, 58, 100],
      seriesBuyHold: [0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 4, 9, 6, 3, 2, 2, 3, 4, 4, 5, 7, 7, 5, 5, 7, 5, 9],
      img: "/window.svg",
    },
    {
      id: "nvda",
      symbol: "NVDA",
      startDate: "10-02-2021",
      performance5Y: 1450,
      buyHoldPerformance: 1150, // Added buy & hold performance
      seriesSignal: [3, 7, 31, 87, 83, 100],
      seriesBuyHold: [0, 3, 9, 28, 30, 41],
      img: "/vercel.svg",
    },
    {
      id: "pltr",
      symbol: "PLTR",
      startDate: "24-03-2021",
      performance5Y: 1808,
      buyHoldPerformance: 569, // Added buy & hold performance
      seriesSignal: [0, 0, 100],
      seriesBuyHold: [0, 0, 31],
      img: "/vercel.svg",
    },
    {
      id: "sol",
      symbol: "Solana",
      startDate: "22-09-2020",
      performance5Y: 33200,
      buyHoldPerformance: 5360, // Added buy & hold performance
      seriesSignal: [0, 0, 1, 2, 9, 13, 13, 10, 15, 13, 11, 14, 13, 60, 84, 79, 65, 86, 89, 100],
      seriesBuyHold: [0, 0, 1, 3, 15, 13, 8, 8, 4, 3, 1, 1, 1, 8, 13, 12, 11, 19, 10, 16],
      img: "/vercel.svg",
    },
    {
      id: "tsla",
      symbol: "TSLA",
      startDate: "10-02-2021",
      performance5Y: 200,
      buyHoldPerformance: 18, // Added buy & hold performance
      seriesSignal: [4, 0, 15, 8, 5, 8, 2, 20, 50, 33, 28, 29, 43, 43, 83, 100, 82, 80],
      seriesBuyHold: [25, 14, 10, 43, 37, 10, 18, 1, 4, 21, 10, 4, 1, 13, 13, 48, 33, 30, 35],
      img: "/file.svg",
    },

  ];
  const shortTermSignalItems = [
    {
      id: "akbnk",
      symbol: "AKBNK",
      startDate: "06-09-2021",
      performance5Y: 2407,
      buyHoldPerformance: 1049, // Added buy & hold performance
      // Two series: strategy vs buy & hold, normalized values 0–100
      seriesSignal: [1, 2, 15, 21, 39, 64, 98, 96, 100],
      seriesBuyHold: [0, 1, 9, 8, 21, 41, 42, 35, 43],
      img: "/globe.svg",
    },
    {
      id: "oyakc",
      symbol: "OYAKC",
      startDate: "06-09-2021",
      performance5Y: 1900,
      buyHoldPerformance: 1337, // Added buy & hold performance
      seriesSignal: [1, 7, 12, 36, 56, 61, 82, 90, 100],
      seriesBuyHold: [0, 4, 10, 27, 38, 40, 66, 57, 70],
      img: "/window.svg",
    }
  ];

  const pricingTiers = [
    {
      id: "p2",
      name: "2 Sinyal Paketi",
      price: "$49/ay",
      features: [
        "2 premium sinyal kanalı",
        "Haftalık performans özeti",
        "Genel piyasa analizi kanalına üyelik",
      ],
      cta: "İletişime Geç",
      highlight: false,
    },
    {
      id: "p4",
      name: "4 Sinyal Paketi",
      price: "$89/ay",
      features: [
        "4 premium sinyal kanalı",
        "Haftalık performans özeti",
        "Genel piyasa analizi kanalına üyelik",
      ],
      cta: "İletişime Geç",
      highlight: true,
    },
    {
      id: "p8",
      name: "8 Sinyal Paketi",
      price: "$149/ay",
      features: [
        "8 premium sinyal kanalı",
        "Haftalık performans özeti",
        "Genel piyasa analizi kanalına üyelik",
      ],
      cta: "İletişime Geç",
      highlight: false,
    },
  ];

  // FAQ items used for the homepage accordion
  const faqs = [
    {
      q: "Sinyaller ne kadar sıklıkla üretiliyor?",
      a: "Uzun vadeli sinyaller ortalama ayda 1-2 kez, kısa vadeli sinyaller ise haftada 4-5 kez üretiliyor.",
    },
    {
      q: "Sinyaller hangi platformda paylaşılıyor?",
      a: "Sinyalleri Telegram üzerinden paylaşıyoruz.",
    },
    {
      q: "Sinyaller garanti kazanç sağlar mı?",
      a: "Hayır. Stratejilerimiz kazançlı olsa da, özellikle kısa zaman dilimlerinde, kazancı garanti edemez. Sinyallerin hiçbiri yatırım tavsiyesi değildir. Araştırıp güvendiğiniz hisseleri/coinleri alıp satarken piyasanın gidişatını görmek açısından sinyaller değerlendirilebilir.",
    },
    {
      q: "Sinyaller yatırım tavsiyesi midir?",
      a: "Hayır. Sinyallerin hiçbiri yatırım tavsiyesi değildir."
    },
  ];

  // ------------------------------
  // Helpers to render inline SVG charts
  // ------------------------------
  const buildPolyline = (values) => {
    const width = 240; // chart width
    const height = 96; // chart height
    const padding = 8;
    const stepX = (width - padding * 2) / (values.length - 1);
    const toY = (v) => height - padding - (v / 100) * (height - padding * 2);
    return values
      .map((v, i) => `${padding + i * stepX},${toY(v).toFixed(2)}`)
      .join(" ");
  };

  // Metallic gradient definition id used across the page
  const metallicGradientId = "goldGradient";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 antialiased selection:bg-[#FFD700]/20 selection:text-[#FFD700]">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Gradients and shared defs */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={metallicGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A951" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>
      </svg>

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_20%,transparent_70%)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1b1b1b] via-transparent to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
              Para kazanmak bir oyun; ve bu oyunun nasıl oynandığını  <span className="text-transparent bg-clip-text" style={{ backgroundImage: `url(#)`, color: "#FFD700" }}> iyi biliyoruz.</span>
            </h1>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#signals" className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 shadow-sm">
                Sinyalleri Keşfet
              </a>
              <a href="#pricing" className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-black" style={{ backgroundImage: `linear-gradient(90deg,#C8A951,#FFD700,#B8860B)`, boxShadow: "0 10px 30px rgba(255,215,0,0.15)", WebkitTapHighlightColor: "transparent" }}>
                Paketleri Gör
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: 3 Images and Text */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-12 md:gap-20">
          {/* First image and paragraph */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-56 h-auto p-2 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.03]">
              <Image src="/images/satranc.png" alt="Güvenilirlik ve Şeffaflık" width={216} height={132} className="w-full h-full rounded-lg object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="mt-4 md:mt-0 font-semibold text-lg sm:text-xl text-white">
                Kazanan Tarafta Ol!
              </h3>
              <p className="mt-2 text-neutral-400">
                Borsaya girenlerin %90 ı para kaybediyor. <span className="text-white font-bold">%10'un içinde olmanın vakti geldi.</span>
              </p>
            </div>
          </div>

          {/* Second image and paragraph */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-56 h-auto p-2 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.03]">
              <Image src="/images/ladder.png" alt="Güvenilirlik ve Şeffaflık" width={216} height={132} className="w-full h-full rounded-lg object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="mt-4 md:mt-0 font-semibold text-lg sm:text-xl text-white">
                Kendi Zamanının Sahibi Ol!
              </h3>
              <p className="mt-2 text-neutral-400">
                Değerli zamanını başkasının hayallerini inşa etmek için harcamak yerine, <span className="text-white font-bold">kendi geleceğinin mimarı ol!</span>
              </p>
            </div>
          </div>

          {/* Third image and paragraph */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-56 h-auto p-2 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.03]">
              <Image src="/images/money.png" alt="Güvenilirlik ve Şeffaflık" width={216} height={132} className="w-full h-full rounded-lg object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="mt-4 md:mt-0 font-semibold text-lg sm:text-xl text-white">
                Zor Geliyorsa Basitleştir!
              </h3>
              <p className="mt-2 text-neutral-400">
                Borsa çok mu karışık geliyor? Senin için her şeyi basitleştirdik. <span className="text-white font-bold">Uzun vadeli yatırımlarını profesyonel sinyallerle korumaya al.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Signal Performance Section - Long Term */}
      <section id="signals" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="flex items-end justify-center">
          <div className="text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-white">Uzun Vadeli Yatırım Sinyalleri</h2>
          </div>
        </div>
        
        {/* Horizontal scroll container for cards on small screens */}
        <div className="relative mt-8">
          <button
            onClick={() => handleScroll('left', scrollRef1)}
            disabled={!canScrollLeft1}
            className={`absolute z-10 left-0 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/5 backdrop-blur-md transition-opacity duration-300 ${!canScrollLeft1 ? 'opacity-30' : 'hover:bg-white/10 active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div ref={scrollRef1} className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-snap-x">
            {signalItems.map((item) => {
              const signalPoints = buildPolyline(item.seriesSignal);
              const holdPoints = buildPolyline(item.seriesBuyHold);
              const lastX = 240 - 8;
              const ySignal = 96 - 8 - (item.seriesSignal[item.seriesSignal.length - 1] / 100) * (96 - 8 * 2);
              const yHold = 96 - 8 - (item.seriesBuyHold[item.seriesBuyHold.length - 1] / 100) * (96 - 8 * 2);
              return (
                <article
                  key={item.id}
                  className="min-w-[300px] sm:min-w-[360px] md:min-w-[380px] bg-gradient-to-b from-white/5 to-white/[0.03] border border-white/10 rounded-2xl p-5 shadow-2xl"
                  style={{ filter: "url(#softShadow)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{item.symbol}</span>
                    <div className="text-right">
                      <p className="text-sm text-neutral-400">Sinyal Performansı</p>
                      <p className="text-xs text-neutral-500">{item.startDate} - 02-09-2025</p>
                    </div>
                  </div>

                  {/* Performance numbers - Now includes buy & hold */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <div className="text-3xl font-bold tracking-tight">
                      <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg,#C8A951,#FFD700,#B8860B)` }}>
                        +{item.performance5Y}%
                      </span>
                    </div>
                  </div>

                  {/* Inline SVG chart */}
                  <div className="mt-5">
                    <svg width="90%" height="120" viewBox="0 0 240 96" className="overflow-visible">
                      {/* Grid */}
                      <g>
                        <line x1="0" x2="240" y1="88" y2="88" stroke="#ffffff15" strokeWidth="1" />
                        <line x1="0" x2="240" y1="48" y2="48" stroke="#ffffff10" strokeWidth="1" />
                        <line x1="0" x2="240" y1="8" y2="8" stroke="#ffffff10" strokeWidth="1" />
                      </g>
                      {/* Series: Buy & Hold */}
                      <polyline points={holdPoints} fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                      {/* Series: Strategy (gold) */}
                      <polyline points={signalPoints} fill="none" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" />

                      {/* Performance percentage text */}
                      <text x={lastX + 4} y={ySignal + 3} fontSize="12" className="text-[10px] font-semibold" fill="url(#goldGradient)">
                        +{item.performance5Y}%
                      </text>
                      <text x={lastX + 4} y={yHold + 3} fontSize="12" className="text-[10px] font-semibold" fill="#94a3b8">
                        +{item.buyHoldPerformance}%
                      </text>
                    </svg>
                    <div className="mt-3 flex items-center justify-end gap-4 text-xs text-neutral-400">
                      <div className="flex items-center gap-1">
                        <span className="inline-block h-2 w-4 rounded-full" style={{ background: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)" }} />
                        <span>Stratejinin Kazancı</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-block h-2 w-4 rounded-full bg-slate-400" />
                        <span>Fiyat Değişimi</span>
                      </div>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div className="mt-6">
                    <a
                      href="#pricing"
                      className="inline-flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-sm font-medium text-white"
                    >
                      Pakete Göz At
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <button
            onClick={() => handleScroll('left', scrollRef1)}
            disabled={!canScrollLeft1}
            className={`absolute z-10 left-0 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/5 backdrop-blur-md transition-opacity duration-300 ${!canScrollLeft1 ? 'opacity-30' : 'hover:bg-white/10 active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => handleScroll('right', scrollRef1)}
            disabled={!canScrollRight1}
            className={`absolute z-10 right-0 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/5 backdrop-blur-md transition-opacity duration-300 ${!canScrollRight1 ? 'opacity-30' : 'hover:bg-white/10 active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Signal Performance Section - Short Term */}
      <section id="signals-short" className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
        <div className="flex items-end justify-center">
          <div className="text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-white">Kısa Vadeli Al-Sat Sinyalleri</h2>
          </div>
        </div>

        {/* Horizontal scroll container for cards on small screens */}
        <div className="relative mt-8">
          <button
            onClick={() => handleScroll('left', scrollRef2)}
            disabled={!canScrollLeft2}
            className={`absolute z-10 left-0 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/5 backdrop-blur-md transition-opacity duration-300 ${!canScrollLeft2 ? 'opacity-30' : 'hover:bg-white/10 active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div ref={scrollRef2} className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-snap-x">
            {shortTermSignalItems.map((item) => {
              const signalPoints = buildPolyline(item.seriesSignal);
              const holdPoints = buildPolyline(item.seriesBuyHold);
              const lastX = 240 - 8;
              const ySignal = 96 - 8 - (item.seriesSignal[item.seriesSignal.length - 1] / 100) * (96 - 8 * 2);
              const yHold = 96 - 8 - (item.seriesBuyHold[item.seriesBuyHold.length - 1] / 100) * (96 - 8 * 2);
              return (
                <article
                  key={`${item.id}-short`}
                  className="min-w-[300px] sm:min-w-[360px] md:min-w-[380px] bg-gradient-to-b from-white/5 to-white/[0.03] border border-white/10 rounded-2xl p-5 shadow-2xl"
                  style={{ filter: "url(#softShadow)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{item.symbol}</span>
                    <div className="text-right">
                      <p className="text-sm text-neutral-400">Sinyal Performansı</p>
                      <p className="text-xs text-neutral-500">{item.startDate} - 02-09-2025</p>
                    </div>
                  </div>

                  {/* Performance numbers - Now includes buy & hold */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <div className="text-3xl font-bold tracking-tight">
                      <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg,#C8A951,#FFD700,#B8860B)` }}>
                        %{item.performance5Y}
                      </span>
                    </div>
                  </div>

                  {/* Inline SVG chart */}
                  <div className="mt-5">
                    <svg width="90%" height="120" viewBox="0 0 240 96" className="overflow-visible">
                      {/* Grid */}
                      <g>
                        <line x1="0" x2="240" y1="88" y2="88" stroke="#ffffff15" strokeWidth="1" />
                        <line x1="0" x2="240" y1="48" y2="48" stroke="#ffffff10" strokeWidth="1" />
                        <line x1="0" x2="240" y1="8" y2="8" stroke="#ffffff10" strokeWidth="1" />
                      </g>
                      {/* Series: Buy & Hold */}
                      <polyline points={holdPoints} fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                      {/* Series: Strategy (gold) */}
                      <polyline points={signalPoints} fill="none" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" />

                      {/* Performance percentage text */}
                      <text x={lastX - 16} y={ySignal + 3} fontSize="12" className="text-[10px] font-semibold" fill="url(#goldGradient)">
                        +{item.performance5Y}%
                      </text>
                      <text x={lastX + 4} y={yHold + 3} fontSize="12" className="text-[10px] font-semibold" fill="#94a3b8">
                        +{item.buyHoldPerformance}%
                      </text>
                    </svg>
                    <div className="mt-3 flex items-center justify-end gap-4 text-xs text-neutral-400">
                      <div className="flex items-center gap-1">
                        <span className="inline-block h-2 w-4 rounded-full" style={{ background: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)" }} />
                        <span>Stratejinin Kazancı</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-block h-2 w-4 rounded-full bg-slate-400" />
                        <span>Fiyat Değişimi</span>
                      </div>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div className="mt-6">
                    <a
                      href="#pricing"
                      className="inline-flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-sm font-medium text-white"
                    >
                      Pakete Göz At
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <button
            onClick={() => handleScroll('right', scrollRef2)}
            disabled={!canScrollRight2}
            className={`absolute z-10 right-0 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/5 backdrop-blur-md transition-opacity duration-300 ${!canScrollRight2 ? 'opacity-30' : 'hover:bg-white/10 active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">Fiyatlandırma</h2>
          <p className="mt-3 text-neutral-400">İhtiyacınıza göre esnek paketler</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={[
                "rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-2xl flex flex-col",
                tier.highlight ? "ring-1 ring-offset-0 ring-[#FFD700]/40" : "",
              ].join(" ")}
              style={tier.highlight ? { boxShadow: "0 10px 40px rgba(255,215,0,0.12)" } : undefined}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                {tier.highlight ? (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full text-black" style={{ backgroundImage: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)" }}>
                    En Popüler
                  </span>
                ) : null}
              </div>
              <div className="mt-4 text-3xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)" }}>
                {tier.price}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)" }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="#contact"
                  className={[
                    "inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium",
                    tier.highlight ? "text-black" : "text-white border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]",
                  ].join(" ")}
                  style={tier.highlight ? { backgroundImage: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)" } : undefined}
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who Am I Section - New Section Added Here */}
      <section id="who-am-i" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">Ben Kimim?</h2>
          <div className="mt-8 mx-auto w-40 h-40 rounded-full overflow-hidden border-2 border-[#FFD700] p-1">
          <img 
            src="/images/havuz-foto.png" 
            alt="Güvenilirlik ve Şeffaflık" 
            className="w-full h-full rounded-full object-cover" 
          />
          </div>
          <div className="mt-8 text-neutral-400 text-lg">
            <p>
              Ben Tolga Çatalpınar. Derece yaparak girdiğim Bilkent Üniversitesi'nde bilgisayar mühendisliğini bitirdikten sonra 3 yıl boyunca çeşitli yazılımlar geliştirdim. 5 yıldır ise hisse ve kripto piyasalarında yatırım yapıyorum. 
              Borsanın kurallarını öğrenip kendi lehime nasıl kullanacağımı keşfettikten sonra bundan sizin de yararlanmanızı istedim. Profesyonel sinyallerle ve test edilmiş stratejilerle servetimi büyütüyorum. Servet Akademisi'ni kurma 
              amacım bu bilgi birikimini aktarmak ve insanların özgürce istedikleri hayatı yaşamasına yardımcı olmak. 
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">İletişim</h2>
          <p className="mt-3 text-neutral-400">
            Tüm sorularınız için bize Instagram üzerinden ulaşabilirsiniz.
          </p>
          <div className="mt-8">
            <a
              href="https://instagram.com/servet.akademisi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-black"
              style={{ backgroundImage: `linear-gradient(90deg,#C8A951,#FFD700,#B8860B)`, boxShadow: "0 10px 30px rgba(255,215,0,0.15)" }}
            >
              Instagram'dan Mesaj Gönder
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section at bottom of homepage */}
      <section id="faq" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-white text-center">Sıkça Sorulan Sorular</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
      {/* Our Team Section - New Section Added Here */}
      <section id="our-team" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="font-serif text-3xl sm:text-4xl text-white">Ekibimiz</h2>
    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-12">
      {/* Birinci Ekip Üyesi */}
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-[#FFD700] p-1">
          <img
            src="/images/tolga-vesikalik.jpeg"
            alt="Tolga Çatalpınar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <p className="mt-4 text-white font-semibold text-lg">Tolga Çatalpınar</p>
      </div>
      
      {/* İkinci Ekip Üyesi */}
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-[#FFD700] p-1">
          {/* İkinci resmin yolunu buraya ekleyin */}
          <img
            src="/images/taner-vesikalik.jpeg"
            alt="İkinci Ekip Üyesi Adı"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <p className="mt-4 text-white font-semibold text-lg">Henkjan Taner Langbroek</p>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} Servet Akademisi. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
