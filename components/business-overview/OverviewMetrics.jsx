
import { overviewMetrics } from "../../lib/business-overview";
import OverviewIcon from "./OverviewIcon";

const tones = {
  pink: "bg-pink-100 text-pink-600",
  green: "bg-emerald-100 text-emerald-600",
  purple: "bg-violet-100 text-violet-600",
  yellow: "bg-amber-100 text-amber-600",
};

export default function OverviewMetrics() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {overviewMetrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${tones[metric.tone]}`}
          >
            <OverviewIcon name={metric.icon} size={25} />
          </div>

          <p className="text-sm font-medium text-slate-500">
            {metric.label}
          </p>

          <h3 className="mt-2 text-xl font-bold leading-snug text-[#302651]">
            {metric.value}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            {metric.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
