import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { authPanel } from "@/lib/auth-content";

const tabBase =
  "flex h-9 flex-1 items-center justify-center rounded-full text-[13px] font-bold transition-colors";
const tabOn =
  "bg-linear-to-r from-cta-from to-cta-to text-white shadow-lg shadow-cta-to/30";
const tabOff = "text-brand hover:text-brand-deep";

function Rays({ className }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={cn("absolute size-6", className)}
    >
      <path d="M4 12 L9 14" />
      <path d="M8 5 L11 9" />
      <path d="M16 2 L16 7" />
    </svg>
  );
}

export default function AuthShell({ active, title, subtitle, children }) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-72 left-[18%] size-140 rounded-full border-70 border-pink-pale"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-sun-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/4 size-96 rounded-full bg-brand-soft/70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-307 items-start gap-8 px-6 py-3 lg:min-h-svh lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-12">
        <div>
          <h1 className="max-w-sm text-[30px] font-extrabold leading-[1.1] tracking-tight text-ink-title lg:text-[38px]">
            {authPanel.title}
          </h1>

          <ul className="mt-5 max-w-md space-y-3">
            {authPanel.points.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blush-soft">
                  <Check className="size-3.5 text-pink-ink" strokeWidth={3} />
                </span>
                <span className="pt-0.5 text-[15px] leading-snug text-brand-deep">
                  {text}
                </span>
              </li>
            ))}
          </ul>

          <div className="relative mt-8 hidden h-28 max-w-sm md:block">
            <div className="absolute left-1 top-1 w-52 -rotate-6 rounded-2xl border border-pink-line bg-pink-line/70 px-4 py-2.5 text-xs font-bold text-brand-deep shadow-md">
              {authPanel.notes[0]}
              <Rays className="-left-6 -top-4 text-cta-from" />
            </div>
            <div className="absolute left-28 top-14 w-40 rotate-6 rounded-2xl border border-lav-line bg-lav-line/80 px-4 py-2.5 text-xs font-bold text-brand-deep shadow-md">
              {authPanel.notes[1]}
              <Rays className="-right-6 top-1/2 rotate-90 text-brand-light" />
            </div>
            <Sparkles className="absolute bottom-1 left-[18rem] size-5 text-cta-from" />
            <Sparkles className="absolute bottom-6 left-[19.5rem] size-3.5 text-cta-from" />
          </div>
        </div>

        <Card className="gap-0 rounded-4xl border-0 bg-white py-0 shadow-[0_30px_80px_-30px_rgba(54,17,171,0.25)] ring-1 ring-black/5">
          <CardContent className="p-5">
            <div className="relative flex h-9 items-center justify-center">
              <Link
                href="/"
                aria-label="Kembali ke beranda"
                title="Kembali ke beranda"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "absolute left-0 size-9 rounded-full text-brand-deep hover:bg-brand-soft/60"
                )}
              >
                <ArrowLeft className="size-5" />
              </Link>
              <Link href="/" aria-label="Elevate Puan, ke beranda">
                <Image
                  src="/logo-teks.png"
                  alt="Elevate Puan"
                  width={534}
                  height={192}
                  priority
                  className="h-9 w-auto"
                />
              </Link>
            </div>

            <nav
              aria-label="Pilih Daftar atau Masuk"
              className="mt-3 flex rounded-full bg-lav-pale p-1"
            >
              <Link
                href="/signup"
                aria-current={active === "signup" ? "page" : undefined}
                className={cn(tabBase, active === "signup" ? tabOn : tabOff)}
              >
                Daftar
              </Link>
              <Link
                href="/login"
                aria-current={active === "login" ? "page" : undefined}
                className={cn(tabBase, active === "login" ? tabOn : tabOff)}
              >
                Masuk
              </Link>
            </nav>

            <h2 className="mt-3 text-xl font-extrabold leading-tight text-ink-title">
              {title}
            </h2>
            <p className="mt-1 text-[13px] text-brand">{subtitle}</p>

            <div className="mt-3">{children}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}