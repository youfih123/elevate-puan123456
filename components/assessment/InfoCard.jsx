import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { assessmentUi } from "@/lib/constants/assessment-questions";

export default function InfoCard({ text }) {
  return (
    <Card className="gap-0 rounded-3xl border border-pink-line bg-linear-to-br from-pink-pale to-white py-0 shadow-[0_20px_50px_-24px_rgba(216,31,138,0.25)] ring-0">
      <CardContent className="p-5">
        <h2 className="text-base font-extrabold text-ink-title">
          {assessmentUi.infoTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
        <div className="mt-4 flex items-center gap-2 border-t border-pink-line pt-3 text-xs text-ink-muted">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-deep text-white">
            <Check className="size-3" strokeWidth={3} />
          </span>
          {assessmentUi.autosave}
        </div>
      </CardContent>
    </Card>
  );
}