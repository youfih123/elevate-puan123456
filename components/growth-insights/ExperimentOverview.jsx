
import {
  FlaskConical,
  CheckCircle2,
  PlayCircle,
  FileEdit,
  Trophy,
} from "lucide-react";

// Data sementara untuk demo.
// Nanti angka ini akan diganti dengan data dari database.
// DATA DEMO — KAK DINDA (SKINCARE)
// Seluruh angka merupakan simulasi untuk kebutuhan demo.

const experimentStats = [
  {
    label: "Total Experiments",
    value: 4,
    icon: FlaskConical,
    color: "text-brand",
    background: "bg-lav-pale",
  },
  {
    label: "Completed",
    value: 4,
    icon: CheckCircle2,
    color: "text-emerald-600",
    background: "bg-mint-soft",
  },
  {
    label: "Running",
    value: 0,
    icon: PlayCircle,
    color: "text-pink-ink",
    background: "bg-pink-pale",
  },
  {
    label: "Draft",
    value: 0,
    icon: FileEdit,
    color: "text-honey-ink",
    background: "bg-sun-soft",
  },
  {
    label: "Successful",
    value: 2,
    icon: Trophy,
    color: "text-brand-deep",
    background: "bg-brand-soft",
  },
];


export default function ExperimentOverview() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
      {experimentStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.background}`}
              >
                <Icon size={20} className={stat.color} />
              </div>
            </div>

            <p className="mt-5 text-2xl font-bold text-ink-title">
              {stat.value}
            </p>

            <p className="mt-1 text-sm text-ink-muted">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
