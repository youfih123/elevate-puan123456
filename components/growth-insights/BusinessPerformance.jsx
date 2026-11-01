






"use client";


import { useState } from "react";
import { TrendingUp, CalendarDays, Wallet, Award } from "lucide-react";



// DATA DEMO — KAK DINDA (SKINCARE)
// Seluruh angka merupakan simulasi untuk kebutuhan demo.
// Nantinya bersumber dari Daily Check-in dan Experiment records.

// Revenue bisnis per bulan.
// Menggunakan total omzet bisnis, bukan hanya omzet eksperimen.
const monthlyRevenue = [
  { label: "Aug", revenue: 11400000 },
  { label: "Sep", revenue: 12600000 },
  { label: "Oct", revenue: 12000000 },
];

// Revenue yang tercatat selama masing-masing eksperimen.
// Data ini merupakan bagian dari omzet bisnis, bukan tambahan omzet bulanan.
const experimentRevenue = [
  { label: "Paket Bundling", revenue: 1450000 },
  { label: "Konten Edukasi", revenue: 850000 },
  { label: "Template Balasan", revenue: 1200000 },
  { label: "Paid Ads + Diskon", revenue: 1100000 },
];

// Evaluasi hasil eksperimen berdasarkan Final Review.
const experimentPerformance = [
  {
    name: "Paket Bundling Skincare",
    revenue: 1450000,
    status: "Positive",
  },
  {
    name: "Konten Edukasi Instagram",
    revenue: 850000,
    status: "Learning",
  },
  {
    name: "Template Balasan Customer",
    revenue: 1200000,
    status: "Positive",
  },
  {
    name: "Paid Ads dengan Diskon",
    revenue: 1100000,
    status: "Negative",
  },
];

// Format angka menjadi Rupiah.
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);


export default function BusinessPerformance() {
  const [activeView, setActiveView] = useState("monthly");


  const chartData =
    activeView === "monthly" ? monthlyRevenue : experimentRevenue;


  const maxRevenue = Math.max(...chartData.map((item) => item.revenue));


  return (
    <section className="space-y-6">


      {/* Revenue Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


        <MetricCard
          title="Total Recorded Revenue"
          value={formatRupiah(12000000)}
          description="Total omzet bisnis pada Oktober"
          icon={Wallet}
          iconStyle="bg-lav-pale text-brand"
        />

        <MetricCard
          title="Average Daily Revenue"
          value={formatRupiah(400000)}
          description="Rata-rata omzet per hari selama 30 hari"
          icon={TrendingUp}
          iconStyle="bg-mint-soft text-emerald-600"
        />

        <MetricCard
          title="Highest Revenue Day"
          value={formatRupiah(850000)}
          description="Omzet tertinggi dalam satu hari"
          icon={Award}
          iconStyle="bg-sun-soft text-honey-ink"
        />

      </div>


      {/* Revenue Trend */}
      <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm md:p-6">


        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="type-h2 text-ink-title">
              Revenue Trend
            </h3>
            <p className="type-caption mt-1 text-ink-muted">
              Pantau perkembangan omzet dari catatan bisnismu.
            </p>
          </div>


          {/* User can switch between monthly and experiment views */}
          <div className="flex rounded-xl bg-lav-pale p-1">
            <button
              onClick={() => setActiveView("monthly")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeView === "monthly"
                  ? "bg-white text-brand shadow-sm"
                  : "text-ink-muted"
              }`}
            >
              Monthly
            </button>


            <button
              onClick={() => setActiveView("experiment")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeView === "experiment"
                  ? "bg-white text-brand shadow-sm"
                  : "text-ink-muted"
              }`}
            >
              Per Experiment
            </button>
          </div>
        </div>


        {/* Simple bar chart without an additional chart library */}
        <div className="mt-8 flex h-64 items-end gap-3 overflow-x-auto border-b border-row-line pb-2">
          {chartData.map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 flex-1 flex-col items-center justify-end gap-3"
            >
              <span className="type-micro whitespace-nowrap text-ink-muted">
                {(item.revenue / 1000000).toFixed(1)} jt
              </span>


              <div className="flex h-44 w-full items-end justify-center">
                <div
                  className={`w-full max-w-14 rounded-t-lg transition-all ${
                    activeView === "monthly"
                      ? "bg-bar-indigo"
                      : "bg-bar-pink"
                  }`}
                  style={{
                    height: `${(item.revenue / maxRevenue) * 100}%`,
                    minHeight: "8px",
                  }}
                />
              </div>


              <span className="type-micro whitespace-nowrap text-ink-muted">
                {item.label}
              </span>
            </div>
          ))}
        </div>


        <p className="type-caption mt-4 text-ink-muted">
          {activeView === "monthly"
            ? "Total omzet berdasarkan bulan pencatatan."
            : "Total omzet yang tercatat selama masing-masing eksperimen."}
        </p>
      </div>


      {/* Experiment Performance */}
      <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5">
          <h3 className="type-h2 text-ink-title">
            Experiment Performance
          </h3>
          <p className="type-caption mt-1 text-ink-muted">
            Perbandingan omzet yang tercatat selama eksperimen berjalan.
          </p>
        </div>


        <div className="space-y-4">
          {experimentPerformance.map((experiment) => (
            <div
              key={experiment.name}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-row-line pb-4 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="type-body font-semibold text-ink">
                  {experiment.name}
                </p>
                <StatusBadge status={experiment.status} />
              </div>


              <p className="type-body font-semibold text-ink-title">
                {formatRupiah(experiment.revenue)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// Reusable metric card
function MetricCard({ title, value, description, icon: Icon, iconStyle }) {
  return (
    <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyle}`}>
        <Icon size={20} />
      </div>


      <p className="type-caption mt-4 text-ink-muted">{title}</p>
      <p className="mt-1 text-xl font-bold text-ink-title">{value}</p>
      <p className="type-micro mt-1 text-ink-muted">{description}</p>
    </div>
  );
}


// Reusable experiment status badge
function StatusBadge({ status }) {
  const styles = {
    Positive: "bg-mint-soft text-emerald-700",
    Neutral: "bg-sun-soft text-honey-ink",
    Learning: "bg-lav-pale text-brand",
  };


  return (
    <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}




