"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 grid grid-cols-[auto_1fr_auto] items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#4b3f1e] via-[#FFD700] to-[#6d4e16] ring-1 ring-white/10" />
            <span className="text-lg sm:text-xl font-semibold tracking-wide" style={{ color: "#FFD700" }}>
              Servet Akademisi
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm justify-self-center transform -translate-x-4 md:-translate-x-6">
            <a href="/#faq" className="transition-colors text-[#FFD700] hover:text-[#FFE680]">Sıkça Sorulan Sorular</a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowAbout(true);
              }}
              className="transition-colors text-[#FFD700] hover:text-[#FFE680]"
            >
              Hakkımızda
            </a>
          </nav>
          <a
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black shadow-sm border border-white/10"
            style={{ backgroundImage: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)", boxShadow: "0 6px 18px rgba(255,215,0,0.18)" }}
          >
            İletişime Geç
          </a>
        </div>
      </header>

      {/* Slide-over About Panel */}
      <div
        className={[
          "fixed inset-0 z-50",
          showAbout ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!showAbout}
      >
        {/* Backdrop */}
        <div
          className={[
            "absolute inset-0 bg-black/50 transition-opacity",
            showAbout ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setShowAbout(false)}
        />
        {/* Panel */}
        <aside
          className={[
            "absolute right-0 top-0 h-full w-full sm:w-[560px] max-w-full",
            "bg-[#0f0f0f] border-l border-white/10 shadow-2xl",
            "transition-transform duration-300 ease-out",
            showAbout ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h2 className="font-serif text-xl text-white">Hakkımızda</h2>
            <button
              onClick={() => setShowAbout(false)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-neutral-200"
              aria-label="Kapat"
            >
              ✕
            </button>
          </div>
          <div className="px-6 py-6 overflow-y-auto h-[calc(100%-56px)]">
            <p className="text-neutral-300 leading-relaxed">
              Servet Akademisi, hisse ve kripto piyasalarında veri odaklı, şeffaf ve sürdürülebilir
              sinyal çözümleri sunar. Lüks deneyim ve yüksek standartları benimseyen yaklaşımımızla,
              uzun vadeli başarıya odaklanıyoruz.
            </p>
            <p className="mt-4 text-neutral-400">
              Disiplinli stratejiler, titiz risk yönetimi ve düzenli performans raporları ile yatırım
              kararlarınızı güçlendiriyoruz. Premium deneyim için modern arayüz, gerçek zamanlı bildirimler
              ve şeffaf metrikler sunuyoruz.
            </p>
            <div className="mt-6">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-black border border-white/10"
                style={{ backgroundImage: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)", boxShadow: "0 6px 18px rgba(255,215,0,0.18)" }}
              >
                İletişime Geç
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}


