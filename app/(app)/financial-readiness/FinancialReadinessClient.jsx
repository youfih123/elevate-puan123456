
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageShell from "../../../components/PageShell";

import FinanceIcon from "../../../components/financial-readiness/FinanceIcon";
import FinancialForm from "../../../components/financial-readiness/FinancialForm";

import {
    FinancialSummary,
    FinancialAnalysis,
    FinancialInsights,
} from "../../../components/financial-readiness/FinancialResults";

import DailyRevenueChart from "../../../components/financial-readiness/DailyRevenueChart";

import {
    initialFinancialData,
    calculateFinancial,
} from "../../../lib/financial-readiness";

const STORAGE_KEY = "elevate_financial_readiness";
const ANALYSIS_KEY = "elevate_financial_analysis";

export default function FinancialReadinessClient() {
    const [data, setData] = useState(initialFinancialData);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(
                sessionStorage.getItem(STORAGE_KEY) || "null"
            );

            if (saved && typeof saved === "object") {
                setData({
                    ...initialFinancialData,
                    ...saved,
                });
            }
        } catch {
            // Penyimpanan tidak valid tidak mengganggu halaman.
        }
    }, []);


   
function updateField(key, value) {
  setData((previous) => {
    let updated;

    if (key === "period" && value !== previous.period) {
      updated = {
        ...previous,
        period: value,
        revenue: "",
        expenses: "",
        householdNeed: "",
      };
    } else {
      updated = {
        ...previous,
        [key]: value,
      };
    }

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
      sessionStorage.removeItem(ANALYSIS_KEY);
    } catch {
      // Form tetap berfungsi tanpa storage.
    }

    return updated;
  });

  setResult(null);
  setError("");
}

  

function resetForm() {
    setData(initialFinancialData);
    setResult(null);
    setError("");

    try {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(ANALYSIS_KEY);
    } catch {
        // Abaikan jika storage tidak tersedia.
    }
}

async function calculate() {
    const required = [
        "revenue",
        "expenses",
        "householdNeed",
        "productMargin",
        "willingnessToLose",
    ];

    if (
        required.some(
            (key) =>
                data[key] === "" ||
                data[key] === null ||
                data[key] === undefined
        )
    ) {
        setError(
            "Lengkapi omzet, biaya operasional, kebutuhan rumah tangga, margin produk, dan batas kerugian yang bersedia ditanggung."
        );
        return;
    }

    setLoading(true);
    setError("");

    try {
        const analysis = calculateFinancial(data);

        setResult(analysis);

        try {
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(data)
            );

            sessionStorage.setItem(
                ANALYSIS_KEY,
                JSON.stringify(analysis)
            );
        } catch {
            // Hasil tetap ditampilkan meski storage gagal.
        }
    } catch (err) {
        setError(
            err.message || "Perhitungan keuangan gagal."
        );
    } finally {
        setLoading(false);
    }
}

return (
    <PageShell>
        <div className="space-y-6 text-[#242044]">
            {/* HEADER */}
            <section className="relative overflow-hidden rounded-[28px] border border-purple-100 bg-white/90 p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-70 blur-3xl" />

                <div className="relative">
                    <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-xs font-bold text-pink-700">
                        <FinanceIcon name="wallet" size={17} />
                        Financial Readiness
                    </span>

                    <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-[#242044] sm:text-4xl lg:text-[42px]">
                        Financial Readiness
                    </h1>

                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                        Kenali kondisi keuangan usahamu, hitung batas aman
                        untuk mencoba strategi baru, dan pantau
                        perkembangan pemasukan harian.
                    </p>
                </div>
            </section>

            {/* FORM INPUT DAN ANALISIS */}
            <div className="grid items-start gap-5 lg:grid-cols-2">
                <FinancialForm
                    data={data}
                    onChange={updateField}
                    onReset={resetForm}
                    onCalculate={calculate}
                    loading={loading}
                />

                <FinancialAnalysis result={result} />
            </div>

            {error && (
                <p
                    role="alert"
                    className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700"
                >
                    {error}
                </p>
            )}

            {/* RINGKASAN DAN INSIGHT */}
            <div className="grid items-start gap-5 lg:grid-cols-2">
                <FinancialSummary data={data} />
                <FinancialInsights result={result} />
            </div>

            {/* GRAFIK PEMASUKAN HARIAN */}
            <DailyRevenueChart />

            {/* NAVIGASI */}
            <nav
                aria-label="Navigasi Financial Readiness"
                className="flex flex-col gap-4 border-t border-purple-100 pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
                <Link
                    href="/business-overview"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 transition hover:text-purple-900"
                >
                    <span aria-hidden="true">←</span>
                    Kembali ke Business Overview
                </Link>

                <Link
                    href="/realistic-condition"
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
                >
                    Lanjut ke Kondisi &amp; Kendala Usaha
                    <FinanceIcon name="arrow" size={20} />
                </Link>
            </nav>
        </div>
    </PageShell>
  );
}
