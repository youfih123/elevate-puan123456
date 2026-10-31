import { testimonials } from "@/lib/landing-content";

function Person({ name, business }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <span className="type-cta flex h-9 w-9 items-center justify-center rounded-full bg-blush text-ink-title">
        {name.charAt(0)}
      </span>
      <div>
        <p className="type-h3 text-ink-title">{name}</p>
        <p className="type-caption text-ink-muted">{business}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { main, others } = testimonials;

  return (
    <section id="cerita" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <h2 className="type-h1 text-ink-title">{testimonials.title}</h2>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <figure className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <blockquote className="type-h2 text-ink-title">{main.quote}</blockquote>
          <Person name={main.name} business={main.business} />
        </figure>

        <div className="space-y-6">
          {others.map((item) => (
            <figure
              key={item.name}
              className="rounded-2xl border-l-4 border-sun bg-white p-5 shadow-sm"
            >
              <blockquote className="type-body text-ink">{item.quote}</blockquote>
              <Person name={item.name} business={item.business} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}