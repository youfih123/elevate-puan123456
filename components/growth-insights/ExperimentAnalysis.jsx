
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";

// Satu kolom diagnosis yang bisa digunakan ulang
function AnalysisColumn({ title, description, items, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-row-line bg-white p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
          <Icon size={20} />
        </div>

        <div>
          <h3 className="type-h3 text-ink-title">{title}</h3>
          <p className="type-caption text-ink-muted">{description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="rounded-xl bg-page p-3">
              <p className="type-body font-medium text-ink">
                {typeof item === "string" ? item : item.title}
              </p>

              {typeof item === "object" && item.description && (
                <p className="type-caption text-ink-muted mt-1">
                  {item.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="type-caption text-ink-muted">
            Belum ada data yang cukup untuk ditampilkan.
          </p>
        )}
      </div>
    </div>
  );
}

// Komponen utama
export default function ExperimentAnalysis({
  worked = [],
  didNotWork = [],
  possibleCauses = [],
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <AnalysisColumn
        title="What Worked"
        description="Hal yang menunjukkan hasil positif"
        items={worked}
        icon={CheckCircle2}
        color="bg-mint-soft text-ink"
      />

      <AnalysisColumn
        title="What Didn't Work"
        description="Hal yang belum memberikan hasil sesuai harapan"
        items={didNotWork}
        icon={XCircle}
        color="bg-pink-pale text-pink-ink"
      />

      <AnalysisColumn
        title="Why It Might Have Happened"
        description="Kemungkinan penyebab berdasarkan bukti"
        items={possibleCauses}
        icon={Lightbulb}
        color="bg-sun-soft text-honey-ink"
      />
    </div>
  );
}
