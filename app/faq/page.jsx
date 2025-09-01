import Link from "next/link";

const faqs = [
  {
    q: "Sinyaller nasıl üretiliyor?",
    a: "Tarihsel veri, momentum ve risk yönetimi prensipleriyle oluşturulan kurallı stratejiler kullanıyoruz.",
  },
  {
    q: "Hangi piyasalara odaklanıyorsunuz?",
    a: "BIST ve büyük kripto paralar başta olmak üzere likiditesi yüksek varlıklara odaklanıyoruz.",
  },
  {
    q: "Performans raporlarını nasıl paylaşıyorsunuz?",
    a: "Haftalık ve aylık bazda, strateji ve Buy & Hold karşılaştırmalarıyla paylaşıyoruz.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-[80vh] bg-[#0a0a0a] text-neutral-200">
      <section className="mx-auto max-w-4xl px-6 pt-16 sm:pt-24 pb-16">
        <h1 className="font-serif text-3xl sm:text-4xl text-white">Sıkça Sorulan Sorular</h1>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-base sm:text-lg text-white">{f.q}</h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-300">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/" className="text-sm text-neutral-300 hover:text-white">← Ana sayfa</Link>
        </div>
      </section>
    </div>
  );
}


