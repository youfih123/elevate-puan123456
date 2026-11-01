




import { ArrowRight, Lightbulb, Tags } from "lucide-react";


export default function RecommendationCard({
  number,
  strategy,
  title,
  hypothesis,
  reason,
  businessAspects = [],
}) {
  const strategyStyles = {
    Lanjutkan: "bg-lav-pale text-brand",
    Perbaiki: "bg-pink-pale text-pink-ink",
    Coba: "bg-sun-soft text-honey-ink",
  };


  return (
    <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-bold text-brand">
          Recommendation {number}
        </span>


        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            strategyStyles[strategy] || "bg-lav-pale text-brand"
          }`}
        >
          {strategy}
        </span>
      </div>


      <h4 className="mt-4 text-lg font-semibold text-ink-title">
        {title}
      </h4>


      <p className="type-body mt-2 text-ink-muted">
        {reason}
      </p>


      <div className="mt-4 rounded-xl bg-lav-pale/60 p-4">
        <div className="flex items-center gap-2">
          <Lightbulb size={17} className="text-brand" />
          <p className="type-body font-semibold text-ink-title">
            Expected Hypothesis
          </p>
        </div>


        <p className="type-body mt-2 text-ink-muted">
          {hypothesis}
        </p>
      </div>


      {businessAspects.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Tags size={16} className="text-ink-muted" />


          {businessAspects.map((aspect) => (
            <span
              key={aspect}
              className="rounded-full border border-lav-line px-3 py-1 text-xs text-ink-muted"
            >
              {aspect}
            </span>
          ))}
        </div>
      )}


      <a
        href="/experiments"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        Explore this strategy
        <ArrowRight size={16} />
      </a>
    </div>
  );
}




