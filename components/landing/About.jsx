import { Card, CardContent } from "@/components/ui/card";
import { about } from "@/lib/landing-content";

export default function About() {
  return (
    <section
      id="tentang"
      className="mx-auto grid max-w-307 items-start gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:py-28"
    >
      <h2 className="text-[32px] font-extrabold leading-[1.15] tracking-tight text-ink-title sm:text-4xl lg:text-[40px]">
        {about.title}
      </h2>

      <Card className="gap-0 rounded-3xl border-0 bg-white py-0 shadow-[0_24px_60px_-16px_rgba(54,17,171,0.18)] ring-1 ring-black/5">
        <CardContent className="space-y-5 p-6 sm:p-8 lg:p-10">
          {about.paragraphs.map((text) => (
            <p
              key={text}
              className="text-[17px] leading-[1.75] text-ink-muted lg:text-[18px]"
            >
              {text}
            </p>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}