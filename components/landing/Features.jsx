import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { features } from "@/lib/landing-content";

const badgeTones = {
  running: "border border-pink-line bg-pink-pale text-pink-ink",
  done: "border border-transparent bg-pill-lav text-bar-indigo",
  todo: "border border-transparent bg-honey text-honey-ink",
};

const barTones = ["bg-bar-indigo", "bg-bar-pink", "bg-honey"];

export default function Features() {
  const { promo, finance } = features;

  return (
    <section id="fitur" className="mx-auto max-w-307 px-6 py-20 lg:py-24">
      <h2 className="max-w-150 text-[32px] font-extrabold leading-[1.15] tracking-tight text-ink-title sm:text-4xl lg:text-[42px]">
        {features.title}
      </h2>

      <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2">
        <Card className="gap-0 rounded-4xl border border-pink-line bg-linear-to-b from-pink-pale to-white py-0 shadow-[0_24px_60px_-24px_rgba(216,31,138,0.25)] ring-0">
          <CardContent className="p-7 lg:p-11">
            <h3 className="text-2xl font-extrabold leading-tight text-ink-title lg:text-[28px]">
              {promo.title}
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-desc">
              {promo.description}
            </p>

            <ul className="mt-9 space-y-3">
              {promo.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-row-line bg-white px-5 py-4.5"
                >
                  <span className="text-base font-bold text-ink-title">
                    {item.label}
                  </span>
                  <Badge
                    className={cn(
                      "h-7 rounded-full px-3.5 text-xs font-bold",
                      badgeTones[item.tone]
                    )}
                  >
                    {item.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="gap-0 rounded-4xl border border-lav-line bg-linear-to-br from-lav-pale to-white py-0 shadow-[0_24px_60px_-24px_rgba(58,21,172,0.25)] ring-0">
          <CardContent className="p-7 lg:p-11">
            <h3 className="text-2xl font-extrabold leading-tight text-ink-title lg:text-[28px]">
              {finance.title}
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-desc">
              {finance.description}
            </p>

            <div className="mt-9 rounded-3xl border border-row-line bg-white p-6">
              <ul className="space-y-5">
                {finance.bars.map((bar, i) => (
                  <li key={bar.label}>
                    <div className="flex justify-between text-[15px] font-bold text-ink-title">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-track">
                      <div
                        className={cn("h-3 rounded-full", barTones[i])}
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-lav-pale px-4 py-3.5 text-[15px] font-bold text-ink-title">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-bar-indigo text-white">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                {finance.result}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}