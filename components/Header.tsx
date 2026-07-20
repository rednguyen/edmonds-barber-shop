import { businessInfo } from "@/lib/business-info";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#hours", label: "Hours" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-espresso/95 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-5 py-2">
        <div />

        <a href="#top" className="flex justify-center" aria-label={businessInfo.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={businessInfo.logoSrc}
            alt={`${businessInfo.name} logo`}
            className="h-24 w-auto sm:h-20"
          />
        </a>

        <nav className="hidden items-center justify-end gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream/80 transition hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
