import { businessInfo } from "@/lib/business-info";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-auto bg-espresso px-5 py-12 text-cream">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <h2 className="font-display text-2xl">{businessInfo.name}</h2>

        <div className="flex flex-col gap-1 text-cream/80 sm:flex-row sm:gap-6">
          <a href={`tel:${businessInfo.phone}`} className="hover:text-gold">
            {businessInfo.phone}
          </a>
          <a href={`mailto:${businessInfo.email}`} className="hover:text-gold">
            {businessInfo.email}
          </a>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={businessInfo.facebookUrl}
            aria-label="Facebook"
            className="text-cream/80 transition hover:text-gold"
          >
            <FacebookIcon />
          </a>
          <a
            href={businessInfo.instagramUrl}
            aria-label="Instagram"
            className="text-cream/80 transition hover:text-gold"
          >
            <InstagramIcon />
          </a>
        </div>

        <p className="text-xs text-cream/50">
          © {year} {businessInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.42.46.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.24.64.41 1.36.46 2.42.05 1.06.06 1.4.06 4.14 0 2.72-.01 3.06-.06 4.12-.05 1.06-.22 1.79-.46 2.42a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.63.24-1.36.41-2.42.46-1.06.05-1.4.06-4.12.06-2.72 0-3.06-.01-4.14-.06-1.06-.05-1.78-.22-2.42-.46a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.24-.63-.41-1.36-.46-2.42C2.01 15.06 2 14.72 2 12c0-2.72.01-3.06.06-4.14.05-1.06.22-1.78.46-2.42.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.44 2.52c.64-.24 1.36-.41 2.42-.46C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5ZM17.25 6.5a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0Z" />
    </svg>
  );
}
