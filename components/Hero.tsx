"use client";

import { businessInfo } from "@/lib/business-info";
import { useBooking } from "@/components/BookingProvider";

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-linear-to-b from-cream-deep to-cream px-5 py-20 text-center sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-gold-dark uppercase">
          Edmonds, Washington
        </p>
        <h1 className="font-display text-4xl leading-tight text-espresso sm:text-6xl">
          {businessInfo.name}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-espresso-light">
          {businessInfo.tagline}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openBooking()}
            className="rounded-full bg-gold px-8 py-3 font-semibold text-espresso shadow-lg transition hover:bg-gold-dark"
          >
            Book Now
          </button>
          <a
            href="#services"
            className="rounded-full border border-espresso/20 px-8 py-3 font-semibold text-espresso transition hover:border-espresso"
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  );
}
