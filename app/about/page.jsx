import Link from "next/link";
import Header from "../components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-[80vh] bg-[#0a0a0a] text-neutral-200">
      <Header />
      <section className="mx-auto max-w-4xl px-6 pt-16 sm:pt-24 pb-16">
        <h1 className="font-serif text-3xl sm:text-4xl text-white">Hakkımızda</h1>
        <p className="mt-4 text-neutral-300 leading-relaxed">
          Servet Akademisi, hisse ve kripto piyasalarında veri odaklı, şeffaf ve sürdürülebilir
          sinyal çözümleri sunar. Lüks deneyim ve yüksek standartları benimseyen yaklaşımımızla,
          uzun vadeli başarıya odaklanıyoruz.
        </p>
        <p className="mt-4 text-neutral-400">
          Disiplinli stratejiler, titiz risk yönetimi ve düzenli performans raporları ile yatırım
          kararlarınızı güçlendiriyoruz.
        </p>

        <div className="mt-10">
          <Link href="/" className="text-sm text-neutral-300 hover:text-white">← Ana sayfa</Link>
        </div>
      </section>
    </div>
  );
}


