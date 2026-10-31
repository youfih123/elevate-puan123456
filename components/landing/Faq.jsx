import { faq } from "@/lib/landing-content";

export default function Faq() {
  return (
    <section
      id="faq"
      className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1fr_2fr] md:py-20"
    >
      <h2 className="type-h1 text-ink-title">{faq.title}</h2>

      <div className="divide-y divide-brand-soft rounded-2xl bg-white px-5 shadow-sm">
        {faq.items.map((item, i) => (
          <details key={item.q} open={i === 0} className="group py-4">
            <summary className="type-h3 flex cursor-pointer list-none items-center justify-between gap-4 text-ink-title [&::-webkit-details-marker]:hidden">
              {item.q}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-brand transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <p className="type-body mt-2 text-ink-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}