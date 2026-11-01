import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CardHeading from "@/components/home/CardHeading";

export default function LastResultCard() {
  return (
    <Card className="min-h-57.5 gap-0 rounded-3xl border border-row-line bg-white py-0 shadow-[0_20px_50px_-30px_rgba(54,17,171,0.25)] ring-0">
      <CardContent className="flex flex-1 flex-col p-5 sm:px-6 sm:py-5.5">
        <CardHeading icon={Trophy} title="Hasil terakhir" />

        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 py-2 text-center">
          <span className="mb-1 flex size-13 items-center justify-center rounded-full bg-lav-pale text-brand-deep">
            <Trophy className="size-6" />
          </span>
          <p className="text-[15px] font-extrabold text-ink-title">Belum ada data</p>
          <p className="max-w-68 text-[13px] leading-relaxed text-ink-muted">
            Hasil eksperimen terakhir akan muncul di sini setelah ada
            eksperimen yang selesai.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}