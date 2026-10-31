import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { hero } from "@/lib/landing-content";

const notePositions = [
  "left-0 top-[5%] -rotate-3",
  "left-0 top-[32%] rotate-2",
  "left-0 top-[60%] -rotate-3",
];

const noteBase =
  "rounded-2xl bg-note px-4 py-3 text-[15px] font-bold leading-snug text-ink-title shadow-md shadow-amber-200/60";

function ExperimentCard() {
  const { card } = hero;

  return (
    <Card className="gap-0 rounded-3xl border-0 bg-white py-0 shadow-[0_24px_60px_-16px_rgba(54,17,171,0.28)] ring-1 ring-black/5">
      <CardContent className="p-6">
        <Badge className="h-7 rounded-full bg-note-soft px-3 text-[13px] font-bold text-ink-title hover:bg-note-soft">
          {card.badge}
        </Badge>

        <p className="mt-4 text-[18px] font-extrabold leading-6 text-ink-title">
          {card.title}
        </p>

        <div
          className="mt-4 flex gap-1.5"
          role="img"
          aria-label={`${card.progress.done} dari ${card.progress.total} hari`}
        >
          {Array.from({ length: card.progress.total }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 flex-1 rounded-full",
                i < card.progress.done
                  ? "bg-linear-to-r from-brand to-blush"
                  : "bg-brand-soft/70"
              )}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {card.stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-brand-soft/50 py-3 text-center">
              <p className="text-[20px] font-extrabold leading-none text-brand-deep">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex h-12 items-center justify-center rounded-full bg-brand text-sm font-bold text-white shadow-md shadow-brand/30">
          {card.button}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="relative mx-auto grid max-w-307 items-center gap-12 px-6 pb-24 pt-14 lg:grid-cols-[1.08fr_1fr] lg:gap-6 lg:pt-20">
        <div>
          <h1 className="text-[40px] font-extrabold leading-[1.1] tracking-tight text-ink-title sm:text-5xl lg:text-[60px]">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-130 text-[18px] leading-[1.65] text-ink-muted">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-14.75 gap-3 rounded-full bg-linear-to-r from-cta-from to-cta-to px-8 text-[17px] font-bold shadow-xl shadow-cta-to/30 hover:opacity-90"
              )}
            >
              {hero.primaryCta}
              <ArrowRight className="size-5" />
            </Link>
            <a
              href="#cara-kerja"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-12 rounded-full px-4 text-[17px] font-bold text-brand-deep hover:bg-brand-soft/60"
              )}
            >
              {hero.secondaryCta}
            </a>
          </div>

          <p className="mt-8 text-[15px] text-ink-muted">{hero.note}</p>
        </div>

        <div className="hidden md:block">
          <div className="relative mx-auto aspect-484/405 w-full max-w-145.5">
            <div className="absolute left-[16%] top-0 aspect-square w-[84%] rounded-full bg-linear-to-b from-[#EFE6FB] via-[#F6DDF0] to-[#FACFE5]" />

            <svg
              viewBox="0 0 484 405"
              fill="none"
              aria-hidden="true"
              className="absolute inset-0 size-full"
            >
              <g
                stroke="#F25CA8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0.1 8"
              >
                <path d="M201 60 C 232 62, 226 130, 240 186" />
                <path d="M201 166 C 222 164, 228 180, 240 188" />
                <path d="M199 276 C 232 270, 226 230, 240 192" />
              </g>
              <path
                d="M231 180 L241 189 L230 197"
                stroke="#F25CA8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {hero.notes.map((text, i) => (
              <div
                key={text}
                className={cn("absolute w-[41%]", noteBase, notePositions[i])}
              >
                {text}
              </div>
            ))}

            <div className="absolute right-0 top-[18%] w-[49.6%] min-w-60">
              <ExperimentCard />
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-col gap-3 md:hidden">
          {hero.notes.map((text, i) => (
            <div key={text} className={cn(noteBase, i % 2 === 0 ? "-rotate-2" : "rotate-2")}>
              {text}
            </div>
          ))}
          <ExperimentCard />
        </div>
      </div>
    </section>
  );
}