
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const PROBLEM_LABELS = {
  product_stagnation: {
    title: "Penjualan Usaha Belum Berkembang",
    description:
      "Penjualan masih terasa berjalan di tempat, meskipun kamu sudah mencoba melakukan promosi.",
    guidance:
      "Kita perlu memahami apa yang membuat calon pembeli belum mengambil keputusan, lalu memilih eksperimen yang sesuai dengan kondisi usahamu.",
  },
  low_conversion: {
    title: "Banyak yang Tertarik, Belum Banyak yang Membeli",
    description:
      "Calon pelanggan sudah menunjukkan ketertarikan, tetapi belum banyak yang melanjutkan pembelian.",
    guidance:
      "Kita bisa memeriksa cara menawarkan produk, menjawab pertanyaan, dan membantu pelanggan mengambil keputusan.",
  },
  low_awareness: {
    title: "Usahamu Perlu Lebih Dikenal",
    description:
      "Produk sudah ditampilkan, tetapi belum banyak orang yang menunjukkan ketertarikan.",
    guidance:
      "Kita bisa mengevaluasi cara memperkenalkan produk kepada calon pelanggan.",
  },
  weak_retention: {
    title: "Pelanggan Belum Rutin Kembali",
    description:
      "Pembelian berulang masih jarang terjadi.",
    guidance:
      "Kita bisa mencari cara menjaga hubungan dengan pelanggan yang pernah membeli.",
  },
  narrow_market: {
    title: "Jangkauan Pelanggan Masih Terbatas",
    description:
      "Usaha masih bergantung pada kelompok pelanggan atau saluran penjualan yang terbatas.",
    guidance:
      "Kita bisa mencari peluang menjangkau pelanggan lain secara bertahap.",
  },
  capacity_limit: {
    title: "Kapasitas Usaha Perlu Diperkuat",
    description:
      "Jumlah pekerjaan atau pesanan mulai melampaui kemampuan operasional.",
    guidance:
      "Sebelum menambah permintaan, kita perlu memastikan usaha mampu melayani pelanggan dengan baik.",
  },
  inconsistent_promo: {
    title: "Promosi Belum Konsisten",
    description:
      "Aktivitas promosi masih sulit dilakukan secara teratur.",
    guidance:
      "Kita bisa menyusun pola promosi sederhana yang realistis untuk dijalankan.",
  },
  weak_finance_habits: {
    title: "Pengelolaan Keuangan Perlu Diperkuat",
    description:
      "Pencatatan atau pengaturan uang usaha masih menjadi tantangan.",
    guidance:
      "Kita bisa mulai dengan memahami arus uang usaha sebelum mencoba strategi berbiaya.",
  },
  general_stagnant: {
    title: "Usaha Membutuhkan Evaluasi Lebih Lanjut",
    description:
      "Belum ada satu masalah spesifik yang cukup jelas dari jawaban assessment.",
    guidance:
      "Kita perlu melengkapi informasi usaha agar langkah selanjutnya lebih tepat.",
  },
};

const EXAMPLE_ASSESSMENT = {
  name: "Kak Dinda",
  business: "Skincare",
  story_text:
    "Saya sudah rajin posting dan pernah coba iklan, tapi penjualan segitu-segitu saja. Banyak yang DM tanya harga lalu hilang.",
  biggest_challenge: "Penjualan stagnan",
  viewer_behavior:
    "Banyak yang bertanya tapi sedikit yang membeli",
};

const EXAMPLE_DIAGNOSIS = ["product_stagnation"];

function readJson(key) {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function getProblems(value) {
  const raw = Array.isArray(value)
    ? value
    : value?.detected_problems ??
    value?.problem_types ??
    value?.problems ??
    value?.problem_type ??
    [];

  const items = Array.isArray(raw) ? raw : [raw];

  return items.filter(
    (item) => typeof item === "string" && item.trim()
  );
}

function DetailRow({ label, children }) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-sm leading-7 text-slate-700">
        {children || "Belum tersedia"}
      </p>
    </div>
  );
}

export default function DiagnosisPage() {
  const [data, setData] = useState({
    assessment: EXAMPLE_ASSESSMENT,
    problems: EXAMPLE_DIAGNOSIS,
    isDemo: true,
  });

  useEffect(() => {
    // Kontrak data sementara untuk integrasi backend.
    // Tidak menjalankan ulang algoritma diagnosis di frontend.
    const savedAssessment = readJson(
      "elevate_business_assessment"
    );

    const savedDiagnosis = readJson(
      "elevate_diagnosis_result"
    );

    const detected = getProblems(savedDiagnosis);

    if (savedAssessment || detected.length > 0) {
      setData({
        assessment: savedAssessment || {},
        problems: detected,
        isDemo: false,
      });
    }
  }, []);

  const { assessment, problems, isDemo } = data;

  const name = assessment.name || "Pemilik Usaha";
  const business =
    assessment.business ||
    assessment.business_type ||
    "Usahamu";

  const hasDiagnosis = problems.length > 0;

  return (
    <PageShell>
      <main className="mx-auto max-w-5xl space-y-7 pb-10 text-[#211B40]">
        {/* HEADER */}
        <header className="space-y-4">
          <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-semibold text-pink-700">
            Mengenali Kondisi Usahamu
          </span>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#211B40] sm:text-4xl">
            Mari Pahami Tantangan Usahamu
          </h1>

          <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Setiap usaha punya tantangannya sendiri.
            Dari jawaban yang sudah kamu bagikan,
            ElevatePuan membantu mengenali masalah
            yang perlu diperhatikan sebelum memilih
            langkah pengembangan usaha.
          </p>

          {isDemo && (
            <p className="text-xs text-purple-600">
              ✦ Contoh hasil diagnosis pipeline Colab
              menggunakan persona Kak Dinda.
            </p>
          )}
        </header>

        {/* SAPAAN */}
        <section className="rounded-[24px] border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-purple-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              🌷
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-purple-900">
                Hai, {name}!
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-700">
                Terima kasih sudah berbagi cerita
                tentang perjalanan usahamu.
                Yuk, kita lihat bersama tantangan
                apa yang teridentifikasi dan
                bagaimana memahaminya.
              </p>
            </div>
          </div>
        </section>

        {/* RINGKASAN ASSESSMENT */}
        <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-3">
            <h2 className="font-serif text-xl font-bold">
              Cerita Usahamu
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Ringkasan informasi yang digunakan
              sebagai dasar diagnosis.
            </p>
          </div>

          <DetailRow label="Jenis Usaha">
            {business}
          </DetailRow>

          <DetailRow label="Cerita dan Kondisi Usaha">
            {assessment.story_text}
          </DetailRow>

          <DetailRow label="Tantangan Terbesar">
            {assessment.biggest_challenge}
          </DetailRow>

          <DetailRow label="Perilaku Calon Pembeli">
            {assessment.viewer_behavior}
          </DetailRow>
        </section>

        {/* HASIL DIAGNOSIS */}
        <section className="rounded-[26px] border-2 border-purple-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-500">
                Hasil Diagnosis
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#211B40]">
                Tantangan yang Teridentifikasi
              </h2>
            </div>

            {hasDiagnosis && (
              <span className="rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
                {problems.length} masalah terdeteksi
              </span>
            )}
          </div>

          {hasDiagnosis ? (
            <div className="space-y-4">
              {problems.map((problem, index) => {
                const info = PROBLEM_LABELS[problem] || {
                  title: "Tantangan Usaha Terdeteksi",
                  description:
                    "Sistem menemukan kategori masalah yang perlu ditinjau.",
                  guidance:
                    "Lihat kembali data assessment untuk memahami hasilnya.",
                };

                return (
                  <article
                    key={`${problem}-${index}`}
                    className="rounded-2xl bg-gradient-to-br from-purple-50/80 via-white to-pink-50/70 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg text-purple-700 shadow-sm">
                        ✦
                      </span>

                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-purple-900">
                            {info.title}
                          </h3>

                          <p className="mt-1 text-sm leading-7 text-slate-700">
                            {info.description}
                          </p>
                        </div>

                        <div className="rounded-xl border border-purple-100 bg-white/90 p-4">
                          <p className="mb-1 text-xs font-bold text-purple-700">
                            Apa artinya untuk usahamu?
                          </p>

                          <p className="text-sm leading-7 text-slate-600">
                            {info.guidance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-amber-50 p-5">
              <h3 className="font-semibold text-amber-900">
                Hasil diagnosis belum tersedia
              </h3>
              <p className="mt-2 text-sm leading-6 text-amber-800">
                Lengkapi assessment dan jalankan
                proses diagnosis terlebih dahulu.
                Kami tidak akan menebak hasil
                diagnosis dari data yang belum lengkap.
              </p>
            </div>
          )}
        </section>

        {/* PENJELASAN METODE */}
        <section className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
          <h2 className="font-semibold text-[#211B40]">
            Bagaimana hasil ini diperoleh?
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Diagnosis mengikuti aturan dari pipeline
            ElevatePuan yang membaca jawaban assessment,
            seperti tantangan terbesar, perilaku pembeli,
            dan kondisi usaha. Hasilnya menjadi salah
            satu masukan untuk memilih strategi
            yang lebih sesuai.
          </p>
        </section>

        {/* NAVIGASI */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Link
            href="/assessment"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-purple-200 bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
          >
            ← Kembali ke Assessment
          </Link>


          <Link
            href="/business-overview"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-400 via-purple-400 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
          >
            Business Overview & Insights →
          </Link>

        </div>
      </main>
    </PageShell>
  );
}
