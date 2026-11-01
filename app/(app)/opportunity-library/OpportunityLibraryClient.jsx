
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import OpportunityIcon from "@/components/opportunity-library/OpportunityIcon";

// =====================================================
// DATA CONTOH HASIL PIPELINE GOOGLE COLAB
// Persona: Kak Dinda - Usaha Skincare
// =====================================================

const EXPERIMENT_ROUTE = "/experiments/rancangan_experimen";
const EXPERIMENT_STORAGE_KEY =
  "elevate_selected_experiment_strategy";

const mainStrategy = {
  id: "pb-027",
  rank: 1,
  title: "Flash Sale Terbatas Durasi 3 Jam di Media Sosial",
  description:
    "Mencoba promo terbatas selama tiga jam untuk mendorong calon pembeli mengambil keputusan pembelian.",
  icon: "instagram",
  reasons: [
    "Strategi ini ditujukan untuk mengatasi masalah penjualan yang stagnan.",
    "Estimasi biaya Rp0, masih sesuai dengan anggaran aman Kak Dinda sebesar Rp300.000.",
    "Strategi memanfaatkan media sosial dan produk yang sudah dimiliki.",
  ],
  duration: "3 hari",
  cost: "Rp0",
  target: "Rekap omzet selama 3 jam Flash Sale",
  final_score: 0.523,
 day_by_day_plan: [
  '\nPilih produk "jagoan"',
  '\nSiapkan amunisi visual',
  '\nMulai beri "bocoran" (H-1)',
],
};

const alternatives = [
  {
    id: "pb-010",
    rank: 2,
    title: "Eksperimen Headline Promosi Fokus Solusi",
    description:
      "Menguji pesan promosi yang menonjolkan solusi atas masalah pelanggan.",
    icon: "instagram",
    whyRanked:
      "Strategi ini menjadi alternatif #2 karena masih sejalan dengan tujuan utama, yaitu membantu calon pembeli lebih yakin untuk membeli. Bedanya, strategi ini menggunakan pesan promosi yang menjelaskan manfaat produk, bukan promo dengan batas waktu. Skornya 0.510, sedikit di bawah Flash Sale (0.523), sehingga Flash Sale tetap menjadi rekomendasi utama untuk mendorong keputusan pembelian lebih cepat.",
    reasons: [
      "Pendekatan promosi berfokus pada kebutuhan dan masalah pelanggan.",
      "Memungkinkan perbandingan respons terhadap gaya promosi yang berbeda.",
      "Dapat diuji menggunakan saluran pemasaran yang sudah tersedia.",
    ],
    duration: "7 hari",
    cost: "Rp0",
    target: "Perbandingan respons promosi",
    final_score: 0.510,
    day_by_day_plan: [
      "Identifikasi 1 masalah utama konsumen (Misal: 'Bingung cari hadiah ultah cepat').",
      "Buat konten dengan judul solusi (Misal: 'Solusi Kado Cantik Siap Kirim Hari Ini').",
      "Posting konten tersebut di semua saluran jualan.",
      "Siapkan template jawaban balasan yang senada dengan judul solusi.",
      "Coba judul solusi kedua untuk segmen berbeda.",
      "Bandingkan jumlah respons antara gaya jualan biasa vs gaya solusi.",
      "Tetapkan gaya penulisan terbaik untuk promosi rutin.",
    ],
  },
  {
    id: "pb-023",
    rank: 3,
    title: "Posting Rutin Konten Edukasi / Tips Bebas Jualan",
    description:
      "Membangun interaksi melalui konten edukasi yang bermanfaat bagi pelanggan.",
    icon: "instagram",
    whyRanked:
      "Strategi ini menjadi alternatif #3 karena berfokus membangun kepercayaan dan kedekatan dengan pelanggan dalam jangka lebih panjang. Strategi ini dapat mendukung Flash Sale dan promosi fokus solusi, tetapi tidak secara langsung mendorong pembelian secepat dua strategi sebelumnya. Dalam hasil pipeline Colab, skornya 0.463, di bawah strategi #1 (0.523) dan #2 (0.510).",
    reasons: [
      "Membantu audiens mengenal manfaat produk melalui konten edukasi.",
      "Konten sederhana dapat dibuat menggunakan Canva.",
      "Hasilnya dapat dipantau melalui interaksi dan statistik konten.",
    ],
    duration: "7 hari",
    cost: "Rp0",
    target: "Jumlah simpanan dan bagikan konten",
    final_score: 0.463,
    day_by_day_plan: [
      "Cari 3 topik tips terkait produk (Misal: 'Cara Menyimpan Kue Agar Tahan 1 Bulan').",
      "Buat desain tulisan gambar slide sederhana menggunakan Canva.",
      "Post Tips #1 dan ajak pengikut menyimpan postingan.",
      "Tanggapi setiap komentar atau pertanyaan pembaca.",
      "Post Tips #2 dengan gaya tanya jawab interaktif.",
      "Posting ulang konten tips tersebut ke WA Story.",
      "Rekap statistik jumlah simpanan (saves) dan bagikan (shares).",
    ],
  },
];

// =====================================================
// NARASI ASLI OUTPUT GEMINI DARI NOTEBOOK COLAB
// Tidak mengubah kata-kata narasi asli.
// =====================================================

const exampleNarrative = `Halo, Kak Dinda! Apa kabarnya bisnis skincare-nya hari ini? Semoga tetap semangat ya, Kak.

Aku paham banget rasanya kalau sudah rajin posting, bikin konten, bahkan sampai coba iklan, tapi penjualannya rasanya "segitu-segitu saja". Apalagi kalau ketemu calon pembeli yang cuma DM tanya harga lalu menghilang tanpa jejak—rasanya gemas sekaligus lelah ya, Kak? Tapi Kak Dinda jangan berkecil hati dulu, karena tantangan ini wajar banget dialami banyak pemilik usaha. Hal ini biasanya terjadi karena calon pembeli Kakak sebenarnya tertarik, tapi mereka belum merasa "butuh sekarang juga".

Nah, untuk mengatasi itu, aku sudah siapkan satu strategi khusus buat Kak Dinda yang disebut **"Grebek Flash Sale 3 Jam"**. Strategi ini aku pilihkan supaya orang-orang yang tadinya cuma hobi tanya-tanya, jadi merasa harus segera *checkout* karena takut kehabisan.

Kabar baiknya, strategi ini estimasi biayanya **Rp0 alias gratis!** Mengingat Kak Dinda punya batas anggaran aman Rp300.000, eksperimen ini sangat aman bagi keuangan Kakak. Kita tidak akan pakai uang itu dulu, kita manfaatkan aset yang Kakak punya sekarang.

Yuk, kita mulai dampingi bisnis Kak Dinda dengan rencana 7 hari ini:

*   **Hari 1: Pilih "Jagoan" Kakak**
    Coba cek stok skincare Kak Dinda. Pilih 1 produk yang stoknya paling banyak atau yang paling disukai pembeli. Kita akan fokus ke satu item ini saja supaya pesannya kuat dan nggak bikin orang bingung.
*   **Hari 2: Siapkan Amunisi Visual**
    Gunakan aplikasi desain gratisan di HP untuk buat flyer sederhana. Judulnya harus bombastis ya, Kak, misalnya: **"Grebek Flash Sale 3 Jam Saja (16.00–19.00)"**. Pastikan harga coretnya terlihat jelas supaya mereka tahu betapa ruginya kalau nggak beli saat itu.
*   **Hari 3: Mulai Beri "Bocoran" (H-1)**
    Jangan jualan dulu hari ini. Posting di Story WA dan Instagram foto produknya dengan tulisan: *"Besok ada kejutan besar buat yang sering tanya produk ini. Siap-siap jam 4 sore ya!"* Bikin mereka penasaran dulu, Kak.
*   **Hari 4: Pengingat Terakhir**
    Satu jam sebelum dimulai (jam 15.00), kirim reminder atau posting story lagi. *"Satu jam lagi Grebek Flash Sale dimulai! Stok terbatas, siapa cepat dia dapat."* Di sini kita mulai membangun rasa urgensi.
*   **Hari 5: Waktunya Beraksi!**
    Tepat jam 16.00, buka promonya. Nah, kuncinya di sini: setiap ada yang beli, Kakak update di Story: *"Tinggal 5 paket lagi!"* atau *"Sisa 2 botol terakhir!"*. Ini akan memancing mereka yang tadinya cuma mau tanya harga jadi langsung buru-buru transfer.
*   **Hari 6: Konsistensi adalah Kunci**
    Begitu jam 19.00, langsung tutup promonya. Katakan dengan ramah: *"Mohon maaf, Flash Sale sudah berakhir. Harga kembali normal."* Ini penting supaya pembeli Kakak tahu kalau Kak Dinda serius dengan batas waktunya.
*   **Hari 7: Rayakan Hasilnya!**
    Waktunya Kak Dinda rekap semua penjualannya. Coba bandingkan, berapa banyak omzet yang didapat dalam 3 jam itu dibanding hari-hari biasanya? Aku yakin Kakak bakal kaget melihat hasilnya.

Gimana, Kak Dinda? Terasa lebih ringan dan terarah, kan? Kakak nggak perlu pusing mikirin biaya iklan dulu, cukup fokus di langkah-langkah sederhana ini selama seminggu ke depan.

Aku yakin Kak Dinda pasti bisa. Kalau ada yang bikin bingung di tengah jalan, jangan sungkan buat cerita lagi ya. Semangat menjemput rezeki, Kak! 🚀✨`;

// =====================================================
// KOMPONEN TAMPILAN
// =====================================================

function IconTile({ name, tone = "pink", size = 28 }) {
  const tones = {
    pink: "bg-pink-100 text-pink-500",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${tones[tone] || tones.pink
        }`}
    >
      <OpportunityIcon name={name} size={size} />
    </div>
  );
}

function ReasonList({ reasons, muted = false }) {
  return (
    <div
      className={`rounded-2xl p-5 ${muted
          ? "bg-slate-50/80"
          : "bg-gradient-to-r from-pink-50 via-white to-purple-50"
        }`}
    >
      <h3 className="mb-3 text-lg font-bold text-purple-900">
        Kenapa strategi ini cocok untukmu?
      </h3>

      <ul className="space-y-3">
        {reasons.map((reason, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm leading-6 text-slate-700"
          >
            <span className="mt-0.5 shrink-0 text-pink-500">
              <OpportunityIcon name="check" size={22} />
            </span>
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StrategyMetrics({ strategy, muted = false }) {
  const metrics = [
    {
      label: "Durasi",
      value: strategy.duration,
      icon: "clock",
      tone: "pink",
    },
    {
      label: "Estimasi Biaya",
      value: strategy.cost,
      icon: "coins",
      tone: "purple",
    },
    {
      label: "Target Sederhana",
      value: strategy.target,
      icon: "chart",
      tone: "pink",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`flex items-center gap-3 rounded-2xl p-4 ${muted
              ? "border border-slate-100 bg-white"
              : "bg-gradient-to-br from-pink-50 to-purple-50/70"
            }`}
        >
          <div
            className={`shrink-0 ${metric.tone === "pink"
                ? "text-pink-500"
                : "text-purple-500"
              }`}
          >
            <OpportunityIcon name={metric.icon} size={32} />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-500">
              {metric.label}
            </p>
            <p className="mt-1 break-words text-sm font-bold text-[#211B40]">
              {metric.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}


function StrategyActions({ onExperiment, muted = false }) {
  return (
    <div className={`grid gap-3 ${muted ? "" : "sm:grid-cols-[1.7fr_1fr]"}`}>
      <button
        type="button"
        onClick={onExperiment}
        className={`flex min-h-14 items-center justify-center gap-3 rounded-2xl px-4 py-3 text-center font-semibold transition hover:shadow-md ${muted
            ? "border border-purple-200 bg-purple-50 text-purple-800 hover:bg-purple-100"
            : "bg-gradient-to-r from-pink-400 via-purple-400 to-violet-600 text-white"
          }`}
      >
        Lihat Detail &amp; Mulai Eksperimen
        <OpportunityIcon name="arrow" size={20} />
      </button>

      {!muted && (
        <Link
          href="/financial-readiness"
          className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-[#211B40] transition hover:bg-amber-100"
        >
          <span className="text-orange-500">
            <OpportunityIcon name="calculator" size={23} />
          </span>
          Cek Kesiapan Keuangan
        </Link>
      )}
    </div>
  );
}

// =====================================================
// FORMAT NARASI AI
// =====================================================

function FormattedText({ text }) {
  const lines = text.split("\n");

  function renderInline(value) {
    const parts = value.split(/(\*\*.*?\*\*|\*[^*]+\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={index}
            className="font-semibold text-purple-900"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }

      return <span key={index}>{part}</span>;
    });
  }

  return (
    <div className="space-y-3 text-sm leading-7 text-slate-700">
      {lines.map((line, index) => {
        const cleanLine = line.trim();

        if (!cleanLine) return null;

        const isBullet = cleanLine.startsWith("*   ");

        if (isBullet) {
          return (
            <div key={index} className="flex gap-3 pl-2">
              <span className="shrink-0 text-pink-500">
                ✦
              </span>
              <p>{renderInline(cleanLine.slice(4))}</p>
            </div>
          );
        }

        return (
          <p
            key={index}
            className="whitespace-pre-wrap"
          >
            {renderInline(cleanLine)}
          </p>
        );
      })}
    </div>
  );
}

// =====================================================
// PANEL NARASI AI
// =====================================================

function AiNarrativePanel({ narrative, isExample }) {
  // Hanya menampilkan narasi asli sebelum rencana harian.
  // Kata-kata narasi tidak diubah.
  const introOnly = narrative
    .split(/Yuk, kita mulai dampingi/i)[0]
    .trim();

  return (
    <section className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/80 p-5 sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
          <OpportunityIcon name="sparkle" size={24} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-purple-900">
            Yuk, Ketahui Dulu Kenapa Strategi Ini Cocok Untukmu!
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Pendampingan dan arahan strategi untuk membantu
            usahamu bertumbuh.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-purple-50 bg-white/90 p-4 sm:p-5">
        <FormattedText text={introOnly} />
      </div>

      {isExample && (
        <p className="mt-3 text-xs leading-5 text-purple-600">
          ✦ Narasi ini berasal dari contoh output Gemini
          pada pipeline Google Colab dengan persona Kak Dinda.
          Belum dihasilkan secara real-time oleh website.
        </p>
      )}
    </section>
  );
}

// =====================================================
// PRATINJAU RENCANA 7 HARI
// =====================================================

function SevenDayPlan({ steps, onViewDetail }) {
  const previewSteps = steps.slice(0, 3);

  return (
    <section className="rounded-[24px] bg-gradient-to-br from-purple-50 via-[#FCFAFF] to-pink-50 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-bold text-purple-900">
          Rencana Langkah 7 Hari
        </h2>

        <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-purple-700">
          Pratinjau 3 Hari
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Berikut tiga langkah awal dari rencana
        eksperimen yang direkomendasikan untuk usahamu.
      </p>

      <div className="mt-5 space-y-2">
        {previewSteps.map((activity, index) => (
          <div
            key={index}
            className="grid grid-cols-[72px_1fr] items-center gap-3 rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm sm:grid-cols-[90px_1fr]"
          >
            <span className="font-bold text-purple-700">
              Hari {index + 1}
            </span>

            <span className="text-slate-700">
              {activity}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onViewDetail}
          className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-5 py-3 text-sm font-bold text-purple-700 transition hover:bg-purple-50"
        >
          Lihat Lebih Detail
          <OpportunityIcon name="arrow" size={18} />
        </button>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        Pratinjau menampilkan tiga dari tujuh langkah
        hasil pipeline Colab. Detail eksperimen lengkap
        tersedia setelah melanjutkan ke halaman eksperimen.
      </p>
    </section>
  );
}

// =====================================================
// REKOMENDASI UTAMA
// =====================================================

function MainRecommendation({
  onExperiment,
  narrative,
  isExample,
}) {
  return (
    <section className="relative overflow-hidden rounded-[26px] border-2 border-purple-200 bg-white p-5 shadow-[0_12px_35px_rgba(140,95,180,0.06)] sm:p-7">
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-48 rounded-full bg-pink-100/40 blur-3xl" />

      <div className="relative mb-5 flex justify-end">
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-600 px-4 py-2 text-xs font-bold tracking-wide text-white shadow-sm">
          <OpportunityIcon name="sparkle" size={17} />
          REKOMENDASI PRIORITAS AI
        </span>
      </div>

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <IconTile
          name={mainStrategy.icon}
          tone="pink"
          size={42}
        />

        <div>
          <h2 className="font-serif text-2xl font-bold leading-tight text-[#1C173C] sm:text-3xl">
            {mainStrategy.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            {mainStrategy.description}
          </p>
        </div>
      </div>

      {/* NARASI AI */}
      <div className="relative mt-6">
        <AiNarrativePanel
          narrative={narrative}
          isExample={isExample}
        />
      </div>

      {/* RENCANA 7 HARI NAIK KE DALAM REKOMENDASI UTAMA */}
      <div className="relative mt-5">
        <SevenDayPlan
          steps={mainStrategy.day_by_day_plan}
          onViewDetail={onExperiment}
        />
      </div>

      {/* METRIK STRATEGI */}
      <div className="relative mt-5">
        <StrategyMetrics strategy={mainStrategy} />
      </div>

      {/* TOMBOL AKSI */}
      <div className="relative mt-5">
        <StrategyActions onExperiment={onExperiment} />
      </div>
    </section>
  );
}

// =====================================================
// ALTERNATIF STRATEGI
// =====================================================

function AlternativeStrategy({
  strategy,
  isOpen,
  onToggle,
  onExperiment,
}) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-purple-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`alternative-${strategy.id}`}
        className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-purple-50/30"
      >
        <IconTile
          name={strategy.icon}
          tone="pink"
          size={27}
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-[#211B40] sm:text-lg">
            {strategy.title}
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            {strategy.description}
          </p>

          <div className="mt-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
            <p className="text-xs font-bold text-purple-900">
              Kenapa ini menjadi strategi #{strategy.rank}?
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-700">
              {strategy.whyRanked}
            </p>
          </div>
        </div>

        <span
          className={`mt-3 shrink-0 text-purple-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        >
          <OpportunityIcon name="chevron" size={24} />
        </span>
      </button>

      {isOpen && (
        <div
          id={`alternative-${strategy.id}`}
          className="space-y-4 border-t border-purple-100 bg-[#FFFCFE] px-5 pb-5 pt-5"
        >
          <ReasonList reasons={strategy.reasons} muted />

          <StrategyMetrics strategy={strategy} muted />

          <StrategyActions
            onExperiment={() => onExperiment(strategy)}
            muted
          />
        </div>
      )}
    </article>
  );
}

// =====================================================
// HALAMAN UTAMA
// =====================================================

export default function OpportunityLibraryClient() {
  const router = useRouter();

  const [openedAlternatives, setOpenedAlternatives] =
    useState({});

  const [experimentNotice, setExperimentNotice] =
    useState("");

  const [aiNarrative, setAiNarrative] =
    useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(
        "elevate_opportunity_ai_narrative"
      );

      if (!raw) return;

      let parsed;

      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = raw;
      }

      const narrative =
        typeof parsed === "string"
          ? parsed
          : parsed?.narrative ??
          parsed?.ai_narrative ??
          parsed?.text ??
          "";

      if (typeof narrative === "string") {
        setAiNarrative(narrative.trim());
      }
    } catch {
      // Gunakan narasi contoh jika belum ada data.
    }
  }, []);

  function toggleAlternative(id) {
    setOpenedAlternatives((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  }

  function handleExperiment(strategy = mainStrategy) {
    const selectedStrategy = strategy || mainStrategy;

    const payload = {
      ...selectedStrategy,
      selected_at: new Date().toISOString(),
      source: "opportunity-library",
      is_demo: true,
    };

    try {
      sessionStorage.setItem(
        EXPERIMENT_STORAGE_KEY,
        JSON.stringify(payload)
      );

      router.push(EXPERIMENT_ROUTE);
    } catch {
      setExperimentNotice(
        "Data strategi belum berhasil disimpan. Silakan coba lagi."
      );
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl space-y-7 text-[#211B40]">

        {/* HEADER */}
        <header>
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-700">
            <OpportunityIcon name="sparkle" size={18} />
            Rekomendasi Strategi AI untuk Usahamu
          </span>

          <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-[#181532] sm:text-4xl lg:text-5xl">
            Strategi yang Paling Cocok untukmu
          </h1>

          <p className="mt-3 max-w-4xl text-base leading-7 text-slate-600">
            Berdasarkan kondisi usaha, tantangan,
            kesiapan finansial, dan kemampuanmu saat
            ini, kami memilih strategi yang paling
            realistis untuk kamu coba.
          </p>

          <p className="mt-2 text-xs text-purple-600">
            ✦ Demonstrasi hasil pipeline Google Colab
            menggunakan persona Kak Dinda.
          </p>
        </header>

        {/* REKOMENDASI UTAMA */}
        <MainRecommendation
          onExperiment={() => handleExperiment(mainStrategy)}
          narrative={aiNarrative || exampleNarrative}
          isExample={!aiNarrative}
        />

        {/* PESAN ERROR */}
        {experimentNotice && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-purple-200 bg-purple-50 p-5 text-sm leading-6 text-purple-900"
          >
            <OpportunityIcon name="info" size={22} />

            <div className="flex-1">
              {experimentNotice}
            </div>

            <button
              type="button"
              onClick={() => setExperimentNotice("")}
              className="font-bold text-purple-700 underline"
            >
              Tutup
            </button>
          </div>
        )}

        {/* ALTERNATIF STRATEGI PALING BAWAH */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-pink-600">
            Alternatif Strategi Lainnya (2)
          </h2>

          <div className="space-y-3">
            {alternatives.map((strategy) => (
              <AlternativeStrategy
                key={strategy.id}
                strategy={strategy}
                isOpen={Boolean(
                  openedAlternatives[strategy.id]
                )}
                onToggle={() =>
                  toggleAlternative(strategy.id)
                }
                onExperiment={handleExperiment}
              />
            ))}
          </div>
        </section>

      </div>
    </PageShell>
  );
}
