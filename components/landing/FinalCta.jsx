import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { finalCta } from "@/lib/landing-content";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-307 px-6 py-16 lg:py-20">
      <Card className="relative gap-0 overflow-hidden rounded-[48px] border border-pink-line bg-linear-to-r from-blush-soft via-lav-pale to-note/45 py-0 shadow-[0_30px_60px_-30px_rgba(54,17,171,0.2)] ring-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full bg-blush/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-note blur-3xl"
        />

        <CardContent className="relative px-6 py-16 text-center lg:py-20">
          <h2 className="mx-auto max-w-150 text-[32px] font-extrabold leading-[1.15] tracking-tight text-ink-title sm:text-4xl lg:text-[42px]">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-muted">
            {finalCta.text}
          </p>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-9 h-14.75 gap-3 rounded-full bg-linear-to-r from-cta-from to-cta-to px-8 text-[17px] font-bold shadow-xl shadow-cta-to/30 hover:opacity-90"
            )}
          >
            {finalCta.button}
            <ArrowRight className="size-5" />
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}