
import FinanceIcon from "./FinanceIcon";
import {
  formatRupiah,
  parseMoney,
} from "../../lib/financial-readiness";

function SummaryItem({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-purple-600">
        <FinanceIcon name={icon} size={22} />
      </div>

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-lg font-bold text-purple-900">
        {value}
      </p>
    </div>
  );
}

function displayMoney(value) {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return "Belum diisi";
  }

  return formatRupiah(parseMoney(value));
}

export function FinancialSummary({ data }) {
  const periodLabel =
    data.period === "Mingguan" ? "Minggu" : "Bulan";

  return (
    <section className="rounded-[26px] border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-2 text-xl font-bold text-purple-900">
        Ringkasan Kesiapan Keuangan
      </h2>

      <p className="mb-5 text-sm leading-6 text-slate-500">
        Gambaran data keuangan yang sudah kamu masukkan.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <SummaryItem
          label={`Pendapatan Usaha per ${periodLabel}`}
          value={displayMoney(data.revenue)}
          icon="wallet"
        />

        <SummaryItem
          label={`Biaya Operasional per ${periodLabel}`}
          value={displayMoney(data.expenses)}
          icon="document"
        />

        <SummaryItem
          label={`Kebutuhan Rumah Tangga per ${periodLabel}`}
          value={displayMoney(data.householdNeed)}
          icon="shield"
        />

        <SummaryItem
          label="Batas Kerugian Pilihanmu"
          value={displayMoney(data.willingnessToLose)}
          icon="chart"
        />

        <SummaryItem
          label="Kas Tersedia"
          value={displayMoney(data.cash)}
          icon="wallet"
        />

        <SummaryItem
          label="Rencana Anggaran Eksperimen"
          value={displayMoney(data.budget)}
          icon="document"
        />
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Ringkasan diperbarui otomatis saat kamu
        mengubah data.
      </p>
    </section>
  );
}

export function FinancialAnalysis({ result }) {
  if (!result) {
    return (
      <section className="rounded-[26px] border border-dashed border-purple-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
            <FinanceIcon name="chart" size={26} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-purple-900">
              Hasil Analisis Keuangan
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Hasil akan muncul setelah kamu
              menekan Hitung Kesiapan.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const periodLabel =
    result.period === "Mingguan"
      ? "Minggu"
      : "Bulan";

  const statusStyle = {
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };

  const rows = [
    {
      label: `Laba Usaha per ${periodLabel}`,
      value: formatRupiah(result.netProfit),
    },
    {
      label: `Kebutuhan Rumah Tangga per ${periodLabel}`,
      value: formatRupiah(result.householdNeed),
    },
    {
      label: `Sisa Dana Bebas per ${periodLabel}`,
      value: formatRupiah(result.disposableIncome),
    },
    {
      label: `Batas Aman (${Math.round(
        result.riskAllowancePct * 100
      )}%)`,
      value: formatRupiah(result.safeLimit),
    },
    {
      label: "Batas Kerugian Pilihanmu",
      value: formatRupiah(result.willingnessToLose),
    },
    {
      label: "Anggaran Eksperimen Direkomendasikan",
      value: formatRupiah(result.recommendedBudget),
      highlight: true,
    },
  ];

  const statusExplanation = {
    within_range:
      "Kondisi keuangan berada dalam batas aman berdasarkan simulasi Affordable Loss dan rencana anggaran yang dimasukkan.",
    above_recommended:
      "Batas kerugian atau rencana anggaran eksperimen perlu ditinjau kembali agar sesuai dengan kemampuan keuanganmu.",
    not_recommended:
      "Belum tersedia sisa dana bebas yang memadai untuk eksperimen berbayar. Pertimbangkan strategi tanpa biaya terlebih dahulu.",
  };

  return (
    <section className="rounded-[26px] border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
          <FinanceIcon name="chart" size={26} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-purple-900">
            Hasil Analisis Keuangan
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Analisis berdasarkan data{" "}
            {result.period?.toLowerCase() || "bulanan"}.
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex flex-wrap items-center justify-between gap-3 py-3 text-sm ${
              row.highlight
                ? "rounded-xl bg-purple-50 px-3"
                : ""
            }`}
          >
            <span
              className={
                row.highlight
                  ? "font-semibold text-purple-900"
                  : "text-slate-700"
              }
            >
              {row.label}
            </span>

            <strong className="text-[#242044]">
              {row.value}
            </strong>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
          <span className="font-semibold text-slate-800">
            Status Kesiapan
          </span>

          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 font-bold ${
              statusStyle[result.statusTone] ||
              statusStyle.yellow
            }`}
          >
            <FinanceIcon
              name={
                result.statusTone === "green"
                  ? "check"
                  : "info"
              }
              size={18}
            />
            {result.status}
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-purple-50 p-5">
        <div className="flex items-start gap-3">
          <span className="shrink-0 text-pink-500">
            <FinanceIcon name="info" size={22} />
          </span>

          <div>
            <p className="text-sm font-bold text-purple-900">
              Apa artinya untuk usahamu?
            </p>

            <p className="mt-2 text-sm leading-7 text-slate-700">
              {statusExplanation[result.statusCode] ||
                "Periksa hasil perhitungan untuk menentukan anggaran yang sesuai."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-100 p-4">
        <div>
          <p className="text-xs text-slate-500">
            Growth Ladder
          </p>

          <p className="mt-1 text-lg font-bold text-purple-900">
            Level {result.growthLevel}
          </p>
        </div>

        <span className="rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
          {result.growthLevel === 1
            ? "Mulai dari eksperimen gratis"
            : result.growthLevel === 2
              ? "Eksperimen bertahap"
              : "Eksperimen lebih besar"}
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Hasil ini merupakan simulasi prototipe
        berdasarkan data yang dimasukkan pengguna,
        bukan jaminan keamanan finansial.
      </p>
    </section>
  );
}

export function FinancialInsights({ result }) {
  return (
    <section className="rounded-[26px] border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <FinanceIcon name="bulb" size={26} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-purple-900">
            Insight Finansial
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Penjelasan sederhana untuk memahami
            kondisi keuangan usahamu.
          </p>
        </div>
      </div>

      {!result ? (
        <p className="rounded-2xl bg-pink-50/50 p-4 text-sm leading-6 text-slate-500">
          Isi data keuangan dan tekan Hitung Kesiapan
          untuk melihat insight finansial.
        </p>
      ) : (
        <div className="space-y-3">
          {result.insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border-b border-purple-50 pb-3 last:border-0"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                <FinanceIcon name="check" size={17} />
              </span>

              <p className="text-sm leading-7 text-slate-700">
                {insight}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
