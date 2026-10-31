import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { steps } from "@/lib/landing-content";

const cardTones = [
  "bg-linear-to-br from-sky-soft to-white",
  "bg-linear-to-br from-brand-light/50 to-white",
  "bg-linear-to-br from-blush/50 to-white",
  "bg-linear-to-br from-note to-white",
];

export default function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      className="bg-linear-to-b from-brand-soft/30 to-blush-soft/50"
    >
      <div className="mx-auto max-w-307 px-6 py-20 lg:py-24">
        <h2 className="max-w-150 text-[32px] font-extrabold leading-[1.15] tracking-tight text-ink-title sm:text-4xl lg:text-[42px]">
          {steps.title}
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.items.map((step, i) => (
            <li key={step.title} className="flex">
              <Card
                className={cn(
                  "w-full gap-0 rounded-3xl border-0 py-0 shadow-[0_16px_40px_-20px_rgba(54,17,171,0.25)] ring-1 ring-white/70",
                  cardTones[i]
                )}
              >
                <CardContent className="p-6 lg:p-7">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-white/70 text-2xl font-extrabold text-ink-title shadow-sm">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold leading-snug text-ink-title">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-normal text-ink-muted">
                    {step.text}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}