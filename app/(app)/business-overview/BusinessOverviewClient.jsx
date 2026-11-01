
"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import OverviewHero from "@/components/business-overview/OverviewHero";
import OverviewMetrics from "@/components/business-overview/OverviewMetrics";
import OverviewInsight from "@/components/business-overview/OverviewInsight";

export default function BusinessOverviewClient() {
  return (
    <PageShell>
      <div className="relative overflow-hidden rounded-[30px] border border-purple-100 bg-white/95 p-5 shadow-[0_12px_45px_rgba(89,62,120,0.07)] sm:p-9">
        <OverviewHero />

        {/* Narasi diagnosis menjadi fokus utama */}
        <section className="mt-10">
          <OverviewInsight />
        </section>

        {/* Empat kartu ringkasan kondisi bisnis */}
        <section className="mt-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#242044] sm:text-3xl">
            Ringkasan Kondisi Bisnismu
          </h2>

          <OverviewMetrics />
        </section>

        {/* Navigasi */}
        <nav
          aria-label="Navigasi Business Overview"
          className="mt-16 flex flex-col gap-5 border-t border-purple-100 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 transition hover:text-purple-900"
          >
            <span aria-hidden="true" className="text-xl">
              ←
            </span>
            Kembali ke Halaman Diagnosis
          </Link>

          <Link
            href="/financial-readiness"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_5px_15px_rgba(190,100,210,0.18)] transition hover:from-pink-500 hover:to-purple-600"
          >
            Lanjut Ke Financial Readiness 
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </Link>
        </nav>
      </div>
    </PageShell>
  );
}
