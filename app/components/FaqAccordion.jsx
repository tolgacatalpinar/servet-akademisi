"use client";

import { useState } from "react";

export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {faqs.map((f, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={f.q}
            className={[
              "rounded-2xl border border-white/10 p-4",
              isOpen ? "bg-white/[0.06]" : "bg-white/[0.04]",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between gap-3 text-left"
            >
              <span className="text-base sm:text-lg text-white">{f.q}</span>
              <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 text-neutral-300">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <div className="mt-3 text-sm sm:text-base text-neutral-300">{f.a}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}


