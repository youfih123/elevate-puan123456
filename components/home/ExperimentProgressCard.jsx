import Link from "next/link";
import { FlaskConical, PencilLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CardHeading from "@/components/home/CardHeading";
import { cn } from "@/lib/utils";

export default function ExperimentProgressCard({ experiment }) {
  const { id, title, day, totalDays } = experiment;

  return (
    <Card className="min-h-57.5 gap-0 rounded-3xl border border-row-line bg-white py-0 shadow-[0_20px_50px_-30px_rgba(54,17,171,0.25)] ring-0">
      <CardContent className="flex flex-1 flex-col p-5 sm:px-6 sm:py-5.5">
        <CardHeading icon={FlaskConical} title="Eksperimen berjalan" />

        <div className="mt-4">
          <Badge className="h-6.5 rounded-full border border-pink-line bg-blush-soft px-3 text-xs font-extrabold text-pink-ink hover:bg-blush-soft">
            Sedang berjalan
          </Badge>
          <p className="mt-2.5 text-lg font-extrabold leading-snug text-ink-title">
            {title}
          </p>
          <div
            role="img"
            aria-label={`Hari ke-${day} dari ${totalDays}`}
            className="mt-3.5 flex gap-1.5"
          >
            {Array.from({ length: totalDays }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-2 flex-1 rounded-full",
                  i < day ? "bg-linear-to-r from-brand to-blush" : "bg-lav-line"
                )}
              />
            ))}
          </div>
          <p className="mt-2.5 text-[13px] font-bold text-ink-muted">
            Hari ke-{day} dari {totalDays}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <Link
            href={`/experiments/${id}#check-in`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10.5 gap-2 rounded-full border-pink-line bg-blush-soft px-4.5 text-sm font-extrabold text-pink-ink hover:bg-blush-soft/70"
            )}
          >
            <PencilLine className="size-4" />
            Catat hasil hari ini
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}