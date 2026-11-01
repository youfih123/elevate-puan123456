


import Link from "next/link";
import { ArrowRight, CircleCheck, Clock3, PenLine } from "lucide-react";

// Urutan kolom: Nama | Kategori | Periode | Status | Evaluasi | Aksi
export const GRID_COLS =
  "md:grid-cols-[2.4fr_1.2fr_1.4fr_1fr_1.3fr_auto]";

const detailHref = (id) => `/experiment/${id}`;

const STATUS = {
  completed: {
    label: "Selesai",
    Icon: CircleCheck,
    cls: "bg-mint-soft text-emerald-700",
  },
  ongoing: {
    label: "Berjalan",
    Icon: Clock3,
    cls: "bg-lav-pale text-brand-deep",
  },
  draft: {
    label: "Draft",
    Icon: PenLine,
    cls: "bg-slate-100 text-slate-600",
  },
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const parse = (iso) => {
  const [y, m, d] = iso.split("-");
  return {
    d: Number(d),
    m: MONTHS[Number(m) - 1],
    y,
  };
};

function formatPeriod(start, end) {
  if (!start || !end) return "Belum dijadwalkan";

  const s = parse(start);
  const e = parse(end);

  return `${s.d} ${s.m} - ${e.d} ${e.m} ${e.y}`;
}

function EvaluationBadge({ experiment }) {
  const { status, evaluation_status, final_review_id } = experiment;

  if (status !== "completed") {
    return <span className="text-sm text-ink-muted">-</span>;
  }

  if (!final_review_id) {
    return (
      <span className="text-sm text-ink-muted">
        Belum direview
      </span>
    );
  }

  return evaluation_status === "successful" ? (
    <span className="w-fit rounded-lg bg-mint-soft px-2.5 py-1 text-xs font-medium text-emerald-700">
      Berhasil
    </span>
  ) : (
    <span className="w-fit rounded-lg bg-sun-soft px-2.5 py-1 text-xs font-medium text-amber-700">
      Belum sesuai target
    </span>
  );
}

export default function ExperimentRow({ experiment }) {
  const {
    id,
    name,
    category,
    objective,
    status,
    start_date,
    end_date,
    progress,
  } = experiment;

  const {
    label,
    Icon,
    cls,
  } = STATUS[status] ?? STATUS.draft;

  return (
    <div
      className={`grid gap-3 rounded-2xl border border-border bg-white/90 p-4 transition-colors hover:bg-lav-pale/40 md:items-center md:gap-4 md:rounded-none md:border-x-0 md:border-t-0 md:px-4 md:py-5 ${GRID_COLS}`}
    >
      {/* Nama eksperimen dan tujuan */}
      <div className="min-w-0">
        <p className="font-semibold text-ink-title">
          {name}
        </p>

        <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {objective}
        </p>

        {status === "ongoing" && (
          <div className="mt-2 h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-track">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{
                width: `${Math.min(100, Math.max(0, Number(progress) || 0))}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Kategori, periode, status, evaluasi */}
      <div className="flex flex-wrap items-center gap-2 md:contents">
        <span className="w-fit rounded-full bg-pink-pale px-2.5 py-1 text-xs font-medium text-pink-ink">
          {category}
        </span>

        <span className="text-sm text-ink-muted">
          {formatPeriod(start_date, end_date)}
        </span>

        <span
          className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}
        >
          <Icon size={13} />
          {label}
        </span>

        <EvaluationBadge experiment={experiment} />
      </div>

      {/* Aksi */}
      <Link
        href={detailHref(id)}
        className="inline-flex w-fit items-center gap-1 rounded-xl border border-brand/20 bg-white px-3 py-2 text-sm font-medium text-brand-deep transition hover:border-brand hover:bg-brand-soft"
      >
        Lihat Detail
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}



