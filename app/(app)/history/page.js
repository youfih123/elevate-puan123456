
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  FlaskConical,
  CircleCheck,
  Clock3,
  PenLine,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ExperimentRow, {
  GRID_COLS,
} from "@/components/experiment-history/ExperimentRow";
import { mockExperiments } from "@/lib/mockExperiments";
import BlobBackground from "@/components/layout/BlobBackground";

export default function ExperimentHistoryPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");

  const experiments = mockExperiments;

  const counts = {
    all: experiments.length,
    completed: experiments.filter((e) => e.status === "completed").length,
    ongoing: experiments.filter((e) => e.status === "ongoing").length,
    draft: experiments.filter((e) => e.status === "draft").length,
  };

  const categories = [
    ...new Set(experiments.map((e) => e.category)),
  ];

  const filtered = useMemo(() => {
    return experiments.filter((e) => {
      const matchQuery = e.name
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchStatus =
        status === "all" || e.status === status;

      const matchCategory =
        category === "all" || e.category === category;

      return matchQuery && matchStatus && matchCategory;
    });
  }, [experiments, query, status, category]);

  const summary = [
    {
      key: "all",
      label: "Total Eksperimen",
      hint: "Semua yang pernah kamu buat",
      Icon: FlaskConical,
      tint: "bg-brand-soft text-brand",
    },
    {
      key: "completed",
      label: "Selesai",
      hint: "Sudah dievaluasi atau selesai",
      Icon: CircleCheck,
      tint: "bg-mint-soft text-emerald-700",
    },
    {
      key: "ongoing",
      label: "Sedang Berjalan",
      hint: "Masih berlangsung",
      Icon: Clock3,
      tint: "bg-sun-soft text-amber-700",
    },
    {
      key: "draft",
      label: "Draft",
      hint: "Belum dimulai",
      Icon: PenLine,
      tint: "bg-lav-pale text-ink-muted",
    },
  ];

  return (
    <>
    <BlobBackground />
      <div className="min-h-full space-y-6 text-ink">
        {/* Page heading */}
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-pink-ink">
              PERJALANAN BISNISMU
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-ink-title md:text-3xl">
              Experiment History
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
              Lihat eksperimen yang pernah kamu lakukan, pelajari hasilnya,
              dan temukan langkah berikutnya untuk mengembangkan bisnismu.
            </p>
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map(({ key, label, hint, Icon, tint }) => {
            const active = status === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setStatus(key)}
                aria-pressed={active}
                className={`rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  active
                    ? "border-brand bg-brand-soft/60 shadow-sm"
                    : "border-border bg-white/90 hover:border-brand-light"
                }`}
              >
                <span
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}
                >
                  <Icon size={20} />
                </span>

                <p className="text-sm font-medium text-ink-muted">
                  {label}
                </p>

                <p className="mt-1 text-3xl font-bold text-ink-title">
                  {counts[key]}
                </p>

                <p className="mt-2 hidden text-xs text-ink-muted md:block">
                  {hint}
                </p>
              </button>
            );
          })}
        </section>

        {/* Experiment list */}
        <section className="rounded-3xl border border-border bg-white/90 p-4 shadow-sm md:p-6">
          <div>
            <h2 className="text-lg font-bold text-ink-title">
              Daftar Eksperimen
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Cari eksperimen atau saring berdasarkan status dan kategori.
            </p>
          </div>

          {/* Search and filters */}
          <div className="mt-5 flex flex-col gap-3 lg:flex-row">
            <label className="flex min-h-11 flex-1 items-center gap-2 rounded-xl border border-border bg-white px-3 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10">
              <Search size={17} className="shrink-0 text-ink-muted" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari eksperimen..."
                aria-label="Cari eksperimen"
                className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted/70"
              />
            </label>

            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Filter status"
                className="h-11 w-full appearance-none rounded-xl border border-border bg-white pl-3 pr-10 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 lg:w-48"
              >
                <option value="all">Semua Status</option>
                <option value="completed">Selesai</option>
                <option value="ongoing">Berjalan</option>
                <option value="draft">Draft</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3.5 text-ink-muted"
              />
            </div>

            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Filter kategori"
                className="h-11 w-full appearance-none rounded-xl border border-border bg-white pl-3 pr-10 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 lg:w-52"
              >
                <option value="all">Semua Kategori</option>

                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3.5 text-ink-muted"
              />
            </div>
          </div>

          {/* Table heading */}
          <div className="mb-3 mt-6 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold text-ink-title">
              Riwayat Eksperimen
            </h3>

            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
              {filtered.length} dari {experiments.length} eksperimen
            </span>
          </div>

          <div
            className={`hidden rounded-xl border border-row-line bg-lav-pale/70 px-4 py-3 text-xs font-semibold text-ink-title md:grid md:gap-4 ${GRID_COLS}`}
          >
            <span>Nama Eksperimen</span>
            <span>Kategori</span>
            <span>Periode</span>
            <span>Status</span>
            <span>Evaluasi</span>
            <span>Aksi</span>
          </div>

          {/* Empty state or experiment rows */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-12 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <FlaskConical size={23} />
              </span>

              <p className="mt-4 font-semibold text-ink-title">
                {experiments.length === 0
                  ? "Belum ada eksperimen"
                  : "Tidak ada eksperimen yang cocok"}
              </p>

              <p className="mx-auto mt-1 max-w-sm px-4 text-sm text-ink-muted">
                {experiments.length === 0
                  ? "Mulai eksperimen pertamamu dari halaman Rekomendasi."
                  : "Coba kata kunci lain atau ubah filter yang kamu pilih."}
              </p>

              {(query || status !== "all" || category !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setStatus("all");
                    setCategory("all");
                  }}
                  className="mt-4 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Reset Filter
                </button>
              )}
            </div>
          ) : (
            <div className="mt-3 flex flex-col gap-3 md:mt-0 md:gap-0">
              {filtered.map((exp) => (
                <ExperimentRow key={exp.id} experiment={exp} />
              ))}
            </div>
          )}

          <p className="mt-4 text-xs text-ink-muted">
            Data ditampilkan berdasarkan eksperimen yang tersedia.
          </p>
        </section>

        {/* Motivational banner */}
        <section className="relative overflow-hidden rounded-3xl border border-pink-line p-6 md:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pink-pale via-white to-lav-pale"
          />

          <div className="relative">
            <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-pink-ink">
              Keep Growing
            </span>

            <p className="mt-3 text-lg font-bold text-ink-title md:text-xl">
              Setiap eksperimen adalah langkah kecil menuju bisnis yang lebih besar.
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
              Catat, pelajari, dan gunakan hasilnya untuk mencoba strategi
              berikutnya. Progres kecil tetap berarti.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}



