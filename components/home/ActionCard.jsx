import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const flowSteps = ["Assessment", "Diagnosis", "Finansial", "Rekomendasi", "Eksperimen"];
const currentStep = 4;

export default function ActionCard({ experiment }) {
  return (
    <Card className="gap-0 rounded-3xl border border-pink-line bg-linear-to-br from-pink-pale to-white py-0 shadow-[0_24px_60px_-28px_rgba(216,31,138,0.25)] ring-0">
      <CardContent className="p-5 sm:px-8 sm:py-6.5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-pink-ink">
              Langkah berikutnya
            </p>
            <h2 className="mt-1.5 text-xl font-extrabold leading-tight text-ink-title sm:text-[21px]">
              Lanjutkan eksperimenmu
            </h2>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-muted">
              Eksperimen sedang berjalan. Catat hasilnya setiap hari supaya
              perkembangannya terlihat.
            </p>
          </div>
          <Link
            href={`/experiments/${experiment.id}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 shrink-0 gap-2.5 rounded-full bg-linear-to-r from-cta-from to-cta-to px-6 text-[15px] font-bold shadow-lg shadow-cta-to/30 hover:opacity-90"
            )}
          >
            Lanjutkan Eksperimen
            <ArrowRight className="size-4.5" />
          </Link>
        </div>

        <ol
          aria-label="Alur Elevate Puan"
          className="mt-5 flex items-center border-t border-pink-line pt-5"
        >
          {flowSteps.map((label, i) => {
            const done = i < currentStep;
            const current = i === currentStep;
            const isLast = i === flowSteps.length - 1;
            return (
              <li
                key={label}
                aria-current={current ? "step" : undefined}
                className={cn("flex items-center", !isLast && "flex-1")}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold",
                    done && "border-brand-deep bg-brand-deep text-white",
                    current && "border-cta-to bg-cta-to text-white ring-4 ring-blush-soft",
                    !done && !current && "border-lav-line bg-white text-ink-muted"
                  )}
                >
                  {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={cn(
                    "ml-2 whitespace-nowrap text-[13px] font-bold",
                    done || current ? "text-ink-title" : "text-ink-muted",
                    !current && "hidden md:inline"
                  )}
                >
                  {label}
                </span>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mx-2.5 h-0.5 min-w-3 flex-1 rounded-full",
                      done ? "bg-brand-deep" : "bg-track"
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}