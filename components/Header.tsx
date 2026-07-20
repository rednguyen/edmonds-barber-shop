"use client";

import { businessInfo } from "@/lib/business-info";
import { useBooking } from "@/components/BookingProvider";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#hours", label: "Hours" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { openBooking } = useBooking();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={businessInfo.logoSrc}
            alt={`${businessInfo.name} logo`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-display text-lg text-espresso sm:text-xl">
            {businessInfo.name}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-espresso-light transition hover:text-gold-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => openBooking()}
          className="hidden rounded-full bg-espresso px-5 py-2 text-sm font-semibold text-cream transition hover:bg-espresso-light md:block"
        >
          Book Now
        </button>
      </div>
    </header>
  );
}
