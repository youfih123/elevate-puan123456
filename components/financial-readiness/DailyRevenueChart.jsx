
"use client";

import { useEffect, useState } from "react";

const REVENUE_KEY = "elevate_daily_revenue";

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DailyRevenueChart() {
  const [dailyRevenue, setDailyRevenue] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem(REVENUE_KEY) || "[]"
      );

      if (Array.isArray(saved)) {
        setDailyRevenue(saved);
      }
    } catch {
      setDailyRevenue([]);
    }
  }, []);

  const values = Array.from({ length: 7 }, (_, index) => {
    const item = dailyRevenue.find(
      (entry) => Number(entry.day) === index + 1
    );

    if (
      !item ||
      item.revenue === "" ||
      item.revenue === null ||
      item.revenue === undefined
    ) {
      return null;
    }

    const revenue = Number(item.revenue);

    return Number.isFinite(revenue) && revenue >= 0
      ? revenue
      : null;
  });

  const recorded = values.filter((value) => value !== null);
  const total = recorded.reduce((sum, value) => sum + value, 0);
  const average = recorded.length
    ? total / recorded.length
    : 0;

  const maxValue = Math.max(...recorded, 1);

  return (
    <section className="rounded-[28px] border border-purple-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-purple-500">
          Pemantauan Eksperimen
        </span>

        <h2 className="mt-2 font-serif text-2xl font-bold text-[#242044]">
          Grafik Pemasukan Harian
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Pantau perkembangan pemasukan selama tujuh hari
          eksperimen usahamu.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-pink-50 p-4">
          <p className="text-sm text-slate-500">
            Total Pemasukan
          </p>
          <p className="mt-2 text-xl font-bold text-[#302651]">
            {recorded.length
              ? formatRupiah(total)
              : "Belum ada data"}
          </p>
        </div>

        <div className="rounded-2xl bg-purple-50 p-4">
          <p className="text-sm text-slate-500">
            Rata-rata Harian
          </p>
          <p className="mt-2 text-xl font-bold text-[#302651]">
            {recorded.length
              ? formatRupiah(average)
              : "Belum ada data"}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm text-slate-500">
            Hari Tercatat
          </p>
          <p className="mt-2 text-xl font-bold text-[#302651]">
            {recorded.length} / 7
          </p>
        </div>
      </div>

      {recorded.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-purple-200 bg-purple-50/30 p-6 text-center">
          <p className="font-semibold text-[#302651]">
            Belum ada pemasukan harian tercatat
          </p>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Grafik akan muncul setelah kamu mulai mencatat
            pemasukan melalui check-in eksperimen.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex h-64 items-end gap-3 border-b border-purple-100 pb-2 sm:gap-5">
            {values.map((value, index) => {
              const height =
                value === null
                  ? 0
                  : (value / maxValue) * 100;

              return (
                <div
                  key={index}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <div className="flex h-full w-full items-end justify-center">
                    {value !== null && (
                      <div
                        title={`Hari ${index + 1}: ${formatRupiah(value)}`}
                        className="w-full max-w-16 rounded-t-xl bg-gradient-to-t from-purple-400 to-pink-300"
                        style={{
                          height: `${Math.max(height, 2)}%`,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex gap-3 sm:gap-5">
            {values.map((_, index) => (
              <span
                key={index}
                className="min-w-0 flex-1 text-center text-xs font-medium text-slate-500"
              >
                H{index + 1}
              </span>
            ))}
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            H1–H7 menunjukkan hari eksperimen.
            Hari tanpa catatan tidak dianggap memiliki
            pemasukan Rp0.
          </p>
        </div>
      )}
    </section>
  );
}
