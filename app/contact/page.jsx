import Link from "next/link";
import Header from "../components/Header";

export default function ContactPage() {
  return (
    <div className="min-h-[80vh] bg-[#0a0a0a] text-neutral-200">
      <Header />
      <section className="mx-auto max-w-3xl px-6 pt-16 sm:pt-24 pb-16">
        <h1 className="font-serif text-3xl sm:text-4xl text-white">İletişim</h1>
        <p className="mt-3 text-neutral-400 max-w-prose">
          Bizimle hızlıca iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-neutral-400">Instagram</p>
            <Link
              href="https://instagram.com/servet.akademisi/"
              target="_blank"
              className="mt-1 inline-flex items-center gap-2 text-base font-medium text-black rounded-md px-3 py-2"
              style={{ backgroundImage: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)" }}
            >
              @servet.akademisi/
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-neutral-400">E-posta</p>
            <a
              href="mailto:info@servetakademisi.com"
              className="mt-1 inline-flex items-center gap-2 text-base font-medium text-black rounded-md px-3 py-2"
              style={{ backgroundImage: "linear-gradient(90deg,#C8A951,#FFD700,#B8860B)" }}
            >
              info@servetakademisi.com
            </a>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-sm text-neutral-300 hover:text-white">
            ← Ana sayfaya dön
          </Link>
        </div>
      </section>
    </div>
  );
}


