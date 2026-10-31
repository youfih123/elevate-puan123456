import Image from "next/image";
import { footer } from "@/lib/landing-content";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-brand-soft">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[2fr_1fr_1.5fr]">
        <div>
          <Image
            src="/logo-teks.png"
            alt="Elevate Puan"
            width={534}
            height={192}
            className="h-10 w-auto"
          />
          <p className="type-caption mt-3 max-w-xs text-ink-muted">
            {footer.tagline}
          </p>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title}>
            <p className="type-h3 text-ink-title">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="type-caption text-ink-muted hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <ul className="space-y-1">
          {footer.credit.map((line) => (
            <li key={line} className="type-caption text-ink-muted">
              {line}
            </li>
          ))}
        </ul>
      </div>

      <p className="type-caption border-t border-brand-soft py-4 text-center text-ink-muted">
        {footer.copyright}
      </p>
    </footer>
  );
}