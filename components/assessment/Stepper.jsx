import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Stepper({ steps, current }) {
  return (
    <ol
      aria-label="Langkah assessment"
      className="flex items-center justify-center gap-2 sm:gap-3"
    >
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;

        return (
          <li
            key={step.key}
            aria-current={active ? "step" : undefined}
            className="flex items-center gap-2 sm:gap-3"
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:size-9",
                done && "bg-brand-deep text-white",
                active && "bg-cta-to text-white ring-4 ring-blush-soft",
                !done && !active && "border border-lav-line bg-white text-ink-muted"
              )}
            >
              {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
            </span>
            <span
              className={cn(
                "text-sm font-bold",
                done || active ? "text-ink-title" : "text-ink-muted",
                !active && "hidden sm:inline"
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-0.5 w-5 rounded-full sm:w-10 lg:w-16",
                  done ? "bg-brand-deep" : "bg-track"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}