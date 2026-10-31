import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/landing-content";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-soft/50 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-307 items-center justify-between gap-6 px-6 py-3">
        <Link href="/" aria-label="Elevate Puan, kembali ke beranda">
          <Image
            src="/logo-penuh.png"
            alt="Elevate Puan"
            width={560}
            height={684}
            priority
            className="h-18 w-auto md:h-23.5"
          />
        </Link>

        <nav className="hidden lg:block" aria-label="Menu utama">
          <ul className="flex items-center gap-10">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[15px] font-medium text-ink-muted transition-colors hover:text-ink-title"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-11 rounded-full px-4 text-[15px] font-bold text-brand-deep hover:bg-brand-soft/60"
            )}
          >
            Masuk
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12.25 rounded-full bg-linear-to-r from-cta-from to-cta-to px-7 text-[15px] font-bold shadow-lg shadow-cta-to/30 hover:opacity-90"
            )}
          >
            Daftar gratis
          </Link>
        </div>
      </div>
    </header>
  );
}