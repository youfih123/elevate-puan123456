"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


import Popup from "@/components/experiment-youfih/Popup";

import { useExperiment } from "@/lib/experiment-youfih/store";

import personas from "@/lib/experiment-youfih/personas_data.json";

/* =========================================
   DATA PERSONA (untuk perhitungan finansial)
========================================= */

const persona = personas.kak_dinda;

const financeInput = persona.finance_input;

/* =========================================
   ISI EKSPERIMEN
========================================= */

const ex = {
  title: 'Grebek Flash Sale 3 Jam',

  businessSummary:
    "Bisnis skincare yang sudah rutin posting, membuat konten, bahkan mencoba iklan, tetapi penjualannya terasa segitu-segitu saja.",

  whyThis:
    "Banyak calon pembeli yang tertarik, tetapi hanya bertanya harga lewat DM lalu menghilang. Biasanya karena mereka belum merasa butuh sekarang juga. Flash sale dengan batas waktu dan stok terbatas dirancang untuk mendorong mereka segera checkout, tanpa biaya iklan.",

  hypothesis:
    "Jika calon pembeli yang sering bertanya harga ditawari flash sale 3 jam dengan stok terbatas, maka mereka akan lebih cepat memutuskan membeli sehingga omzet dalam 3 jam itu lebih tinggi dari hari biasa.",

  success: [
    [
      "Berhasil",
      "Omzet flash sale mencapai atau melebihi target omzet.",
      "bg-[#e9f8f0]",
    ],
    [
      "Ada sinyal",
      "Ada pembeli dari calon pelanggan yang sebelumnya hanya bertanya, tetapi omzet belum mencapai target.",
      "bg-[#fff6e5]",
    ],
    [
      "Belum berhasil",
      "Tidak ada pembelian selama flash sale berlangsung.",
      "bg-[#fff0f5]",
    ],
  ],

  risk:
    "Biaya Rp0 karena hanya memakai stok, WhatsApp, dan Instagram yang sudah ada. Risiko utamanya flash sale sepi atau harga promo terlalu tipis. Pilih produk dengan stok cukup dan pastikan harga promo tetap di atas modal.",

  template:
    'Halo Kak! Besok jam 16.00–19.00 ada "Grebek Flash Sale 3 Jam" untuk [nama produk]. Harga spesial dan stok terbatas, siapa cepat dia dapat. Mau aku ingatkan jam 15.00? 😊',
};

/* Judul langkah 7 hari (rincian ada di Daily Check-in) */

const steps = [
  'Pilih produk "jagoan"',
  "Siapkan amunisi visual",
  'Mulai beri "bocoran" (H-1)',
  "Pengingat terakhir",
  "Waktunya beraksi!",
  "Konsistensi adalah kunci",
  "Rayakan hasilnya",
];

/* =========================================
   HELPER
========================================= */

const formatRupiah = (value) =>
  "Rp" + Math.round(Number(value) || 0).toLocaleString("id-ID");

const toNumber = (value) => {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    return Number(value.replace(/[^\d-]/g, "")) || 0;
  }

  return 0;
};

// Format angka jadi pakai titik ribuan, contoh: 750000 -> "750.000"
const formatThousands = (value) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("id-ID");
};

/* =========================================
   PERHITUNGAN FINANCIAL
========================================= */

const calculateFinance = (data) => {
  const omzet = toNumber(data.monthly_revenue);

  const operational = toNumber(data.monthly_operating_cost);

  const household = toNumber(data.household_need);

  const margin = toNumber(data.product_margin_pct) / 100;

  const willingness = toNumber(data.willingness_to_lose);

  // Laba usaha setelah biaya operasional
  const operatingProfit = omzet - operational;

  // Dana tersisa setelah kebutuhan rumah tangga
  const remainingFunds = operatingProfit - household;

  // Budget dibatasi oleh kesediaan menanggung risiko
  // dan dana yang benar-benar tersedia
  const budget = Math.max(
    0,
    Math.min(willingness, remainingFunds)
  );

  // Estimasi omzet tambahan untuk menutup biaya eksperimen
  const estimatedTarget =
    margin > 0 && budget > 0
      ? Math.ceil(budget / margin)
      : 0;

  return {
    omzet,
    operational,
    household,
    margin,
    willingness,
    operatingProfit,
    remainingFunds,
    budget,
    estimatedTarget,
  };
};

const finance = calculateFinance(financeInput);

/* =========================================
   KONFIGURASI TAMPILAN
========================================= */

const colorMap = {
  violet: "bg-[#f3efff] border-[#e8e0fa] text-[#5032ae]",
  pink: "bg-[#fff0f5] border-[#f9dfe9] text-[#d83b80]",
  blue: "bg-[#edf4ff] border-[#dce8fa] text-[#2855a0]",
  green: "bg-[#e9f8f0] border-[#d8eee2] text-[#16866a]",
  yellow: "bg-[#fff6e5] border-[#f3e5c5] text-[#b17a19]",
};

/* =========================================
   ORNAMEN ATAS
========================================= */

function TopFlowers() {
  return (
    <svg
      viewBox="0 0 240 260"
      className="pointer-events-none absolute left-0 top-0 w-[190px] md:w-[260px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 35 C70 20 90 90 145 115 C190 140 210 180 240 205 L240 0 L0 0Z"
        fill="#F9D9F1"
        opacity=".55"
      />

      <path
        d="M0 90 C65 100 65 160 130 180 C160 190 190 225 220 260"
        stroke="#F3C6E9"
        strokeWidth="22"
        opacity=".3"
      />

      <g transform="translate(45 95)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-19"
            rx="9"
            ry="19"
            fill="#F5A9D8"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="8" fill="#F7C95E" />
      </g>

      <g transform="translate(120 45) scale(.65)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cy="-18"
            rx="10"
            ry="19"
            fill="#C8B1F4"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="8" fill="#F8D46C" />
      </g>

      <path
        d="M15 185 Q55 145 80 190 Q48 205 15 185Z"
        fill="#B7E8D7"
      />
    </svg>
  );
}

/* =========================================
   ORNAMEN BAWAH
========================================= */

function BottomFlowers() {
  return (
    <svg
      viewBox="0 0 260 260"
      className="pointer-events-none absolute bottom-0 left-0 w-[210px] md:w-[270px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 170 C45 130 80 170 100 210 C125 240 170 240 210 260 H0Z"
        fill="#FBE1F5"
        opacity=".8"
      />

      <path d="M0 240 Q15 135 50 125 Q58 195 0 240Z" fill="#65BFA7" />
      <path d="M5 250 Q35 160 75 155 Q60 220 5 250Z" fill="#80CDB5" />
      <path d="M0 260 Q25 200 95 195 Q65 250 0 260Z" fill="#A0DCC9" />

      <path d="M15 245 Q35 175 50 125" stroke="#398F79" strokeWidth="2" />

      <path d="M65 260 Q95 170 135 170 Q120 235 65 260Z" fill="#BCA7F1" />
      <path d="M80 260 Q125 190 170 205 Q140 255 80 260Z" fill="#D1BDF9" />

      <g transform="translate(185 230) scale(.85)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cy="-19"
            rx="12"
            ry="21"
            fill="#F4A6D7"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="10" fill="#F8D16D" />
      </g>
    </svg>
  );
}

/* =========================================
   HALAMAN RANCANGAN EKSPERIMEN
========================================= */

export default function Rancangan() {
  const router = useRouter();
  const { update } = useExperiment();

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (footer) {
      footer.style.display = "none";
    }

    return () => {
      if (footer) {
        footer.style.display = "";
      }
    };
  }, []);

  const [popup, setPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const [targetInput, setTargetInput] = useState("");
  const [targetEdited, setTargetEdited] = useState(false);

  /* =====================================
     TARGET OMZET
  ===================================== */

  const target = targetEdited
    ? Math.max(0, toNumber(targetInput))
    : finance.estimatedTarget;
    

  const canRun =
    finance.margin > 0 &&
    finance.remainingFunds > 0 &&
    finance.budget > 0 &&
    target > 0;

  const targetStatus = (() => {
    if (finance.omzet <= 0) {
      return "Data omzet belum tersedia.";
    }

    if (finance.operatingProfit <= 0) {
      return "Laba usaha belum mencukupi untuk menjalankan eksperimen.";
    }

    if (finance.remainingFunds <= 0) {
      return "Sisa dana setelah kebutuhan rumah tangga belum mencukupi.";
    }

    if (finance.margin <= 0) {
      return "Margin produk belum tersedia sehingga target belum dapat dihitung.";
    }

    if (finance.budget <= 0) {
      return "Budget eksperimen belum tersedia.";
    }

    return "Target berhasil dihitung berdasarkan kondisi keuangan bisnismu.";
  })();

  /* =====================================
     JALANKAN EKSPERIMEN
  ===================================== */

  function jalankan() {
    if (!canRun) return;

    const confirmedTarget = target;

    update((previous) => ({
      ...previous,

      status: "active",
      startDate: new Date().toISOString(),
      day: 1,

      target: confirmedTarget,
      estimatedTarget: finance.estimatedTarget,
      targetEdited,

      budgetLimit: finance.budget,

      persona: {
        id: "kak_dinda",
        name: persona.name,
        businessCategory: persona.assessment.business_category,
      },

      finance: {
        omzet: finance.omzet,
        operational: finance.operational,
        household: finance.household,
        operatingProfit: finance.operatingProfit,
        margin: finance.margin,
        remainingFunds: finance.remainingFunds,
        experimentBudget: finance.budget,
        targetOmzet: confirmedTarget,
      },

      notes: {},
      final: null,
    }));

    setPopup(true);
  }

  /* =====================================
     SALIN TEMPLATE PESAN
  ===================================== */

  async function salinPesan() {
    try {
      await navigator.clipboard.writeText(ex.template);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Gagal menyalin pesan:", error);
      setCopied(false);
    }
  }

  /* =====================================
     INFORMASI EKSPERIMEN
  ===================================== */

  const info = [
    {
      icon: "◎",
      label: "Target omzet",
      value: target > 0 ? formatRupiah(target) : "Belum tersedia",
      color: "violet",
    },
    {
      icon: "♧",
      label: "Batas biaya",
      value: formatRupiah(finance.budget),
      color: "pink",
    },
    {
      icon: "◷",
      label: "Batas waktu",
      value: "30 mnt/hari",
      color: "blue",
    },
    {
      icon: "▦",
      label: "Durasi",
      value: "7 hari",
      color: "green",
    },
    {
      icon: "◉",
      label: "Channel",
      value: "WhatsApp & Instagram",
      color: "green",
    },
    {
      icon: "▥",
      label: "Metrik sukses",
      value: "Tambahan omzet",
      color: "yellow",
    },
    {
      icon: "▣",
      label: "Level",
      value: "Level 1 (gratis)",
      color: "violet",
    },
    {
      icon: "⬡",
      label: "Validasi sistem",
      value: "Lolos",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf9ff] font-sans text-[#18347e]">

     

      <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(135deg,#fffaff_0%,#f8f7ff_45%,#f5f9ff_100%)]">

        <TopFlowers />

        <div className="pointer-events-none absolute -left-32 top-28 h-80 w-80 rounded-full bg-[#f9c9ed]/35 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-[500px] h-96 w-96 rounded-full bg-[#dcd2ff]/35 blur-3xl" />

        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#d6f4e8]/35 blur-3xl" />

        <div className="relative z-10 mx-0 w-full max-w-none space-y-3 px-4 pb-16 pt-4 md:px-5 md:pt-5">

          {/* HERO */}

          <section className="relative min-h-[185px] overflow-hidden rounded-[26px] bg-gradient-to-r from-[#f9efff] via-[#f7f5ff] to-[#fff0f7] px-5 py-5 md:px-7 md:py-5">

            <div className="relative z-10 max-w-[62%]">

              <button
                onClick={() => router.back()}
                className="mb-3 rounded-full border border-[#eee5fa] bg-white/85 px-4 py-1.5 text-[11px] font-bold text-[#6445c5] shadow-sm"
              >
                ‹ Kembali ke peluang
              </button>

              <div>
                <span className="rounded-full bg-[#ffe5f0] px-3 py-1 text-[10px] font-extrabold tracking-wide text-[#d83b80]">
                  RANCANGAN EKSPERIMEN
                </span>
              </div>

              <h1 className="mt-3 text-[24px] font-extrabold leading-tight tracking-tight text-[#18347e] md:text-[29px]">
                {ex.title}
              </h1>

              <p className="mt-1 max-w-[620px] text-[12px] leading-[1.65] text-[#687393] md:text-[13px]">
                Rancangan eksperimen kecil yang aman untuk waktu dan uangmu.
                Semua batas sudah ditetapkan sebelum mulai.
              </p>
            </div>

          <div className="absolute inset-y-0 right-0 z-0 w-[48%] overflow-hidden">
  {/* FOTO HERO */}
  <img
    src="/images/ilustrasi-umkm.png"
    alt="Ilustrasi pemilik UMKM"
    aria-hidden="true"
    className="pointer-events-none absolute bottom-0 right-[-10px] h-[135%] w-auto max-w-none object-contain object-bottom"
    style={{
      WebkitMaskImage:
        "linear-gradient(to right, transparent 0%, rgba(0,0,0,.45) 10%, black 32%, black 100%)",
      maskImage:
        "linear-gradient(to right, transparent 0%, rgba(0,0,0,.45) 10%, black 32%, black 100%)",
    }}
  />

  {/* GRADASI SISI KIRI */}
  <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[20%] bg-gradient-to-r from-[#f7f5ff] to-transparent" />
</div></section>

          {/* RINGKASAN BISNIS + KENAPA EKSPERIMEN INI */}

          <section className="grid gap-3 md:grid-cols-2">

            <div className="rounded-[19px] border border-[#e9e2f8] bg-white/90 p-4 shadow-sm md:p-5">
              <p className="text-[10px] font-extrabold tracking-wide text-[#947bc9]">
                RINGKASAN BISNIS
              </p>

              <p className="mt-2 text-[12px] leading-relaxed text-[#58627f]">
                {ex.businessSummary}
              </p>
            </div>

            <div className="rounded-[19px] border border-[#e9e2f8] bg-white/90 p-4 shadow-sm md:p-5">
              <p className="text-[10px] font-extrabold tracking-wide text-[#947bc9]">
                KENAPA EKSPERIMEN INI?
              </p>

              <p className="mt-2 text-[12px] leading-relaxed text-[#58627f]">
                {ex.whyThis}
              </p>
            </div>

          </section>

          {/* HIPOTESIS */}

          <section className="flex items-center gap-4 rounded-[20px] border border-[#e9dffb] bg-[#f2ecff]/90 p-4 shadow-sm md:gap-5 md:p-5">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[30px] shadow-sm">
              💡
            </div>

            <div className="min-w-0">
              <p className="mb-1 text-[11px] font-extrabold tracking-wide text-[#6635c5]">
                HIPOTESIS
              </p>

              <p className="text-[13px] font-extrabold leading-relaxed text-[#192e72] md:text-[15px]">
                {ex.hypothesis}
              </p>
            </div>
          </section>

          {/* KARTU INFORMASI */}

          <section className="grid grid-cols-2 gap-3 md:grid-cols-4">

            {info.map((item) => (
              <div
                key={item.label}
                className={`flex min-h-[67px] items-center gap-3 rounded-[17px] border px-3 py-3 shadow-sm md:px-4 ${colorMap[item.color]}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-white/90 text-[20px] font-bold">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] leading-tight text-[#79819b] md:text-[11px]">
                    {item.label}
                  </p>

                  <p className="mt-0.5 break-words text-[12px] font-extrabold leading-snug md:text-[13px]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

          </section>

          {/* PERHITUNGAN TARGET OMZET */}

          <section className="rounded-[21px] border border-[#ded8f5] bg-white/95 p-4 shadow-[0_3px_12px_rgba(63,63,120,0.06)] md:p-5">

            <div className="flex items-center gap-3">

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0eaff] text-[22px]">
                🧮
              </span>

              <div>
                <h2 className="text-[14px] font-extrabold text-[#19347c] md:text-[16px]">
                  Rekomendasi target omzet
                </h2>

                <p className="text-[11px] text-[#858da8]">
                  Dihitung berdasarkan kondisi finansial bisnis.
                </p>
              </div>

            </div>

            {/* STATUS */}

            <div
              className={`mt-4 rounded-[13px] p-3 text-[11px] leading-relaxed ${
                canRun
                  ? "border border-[#d5eee2] bg-[#effaf4] text-[#16866a]"
                  : "border border-[#f5dfca] bg-[#fff6ed] text-[#a36b31]"
              }`}
            >
              {targetStatus}
            </div>

            {/* ESTIMASI */}

            <div className="mt-4 rounded-[17px] bg-gradient-to-r from-[#f5f0ff] to-[#fff1f7] p-4">

              <p className="text-[11px] font-bold text-[#75659e]">
                ESTIMASI TARGET OTOMATIS
              </p>

              <p className="mt-1 text-[27px] font-extrabold text-[#5332bb] md:text-[32px]">
                {formatRupiah(finance.estimatedTarget)}
              </p>

              <p className="mt-1 text-[10px] leading-relaxed text-[#85829c]">
                Estimasi dihitung dengan membagi budget eksperimen
                dengan margin produk. Nilai ini menggambarkan perkiraan
                omzet tambahan yang diperlukan agar margin kontribusinya
                setara dengan biaya eksperimen. Bukan jaminan penjualan.
              </p>

            </div>

            {/* RINCIAN FINANSIAL */}

            <div className="mt-4">

              <h3 className="mb-3 text-[12px] font-extrabold text-[#19347c]">
                Rincian perhitungan
              </h3>

              <div className="space-y-2 text-[11px]">

                {[
                  ["Omzet bulanan", finance.omzet],
                  ["Biaya operasional bulanan", finance.operational],
                  ["Laba usaha", finance.operatingProfit],
                  ["Kebutuhan rumah tangga", finance.household],
                  ["Sisa dana setelah kebutuhan rumah tangga", finance.remainingFunds],
                  ["Kesediaan menanggung risiko", finance.willingness],
                  ["Budget eksperimen", finance.budget],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 border-b border-[#f0edf7] py-2"
                  >
                    <span className="text-[#7c849d]">
                      {label}
                    </span>

                    <span className="text-right font-bold text-[#394775]">
                      {formatRupiah(value)}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between py-2">
                  <span className="text-[#7c849d]">
                    Margin produk
                  </span>

                  <span className="font-extrabold text-[#6844c9]">
                    {(finance.margin * 100).toFixed(2)}%
                  </span>
                </div>

              </div>
            </div>

            {/* EDIT TARGET */}

            <div className="mt-4 rounded-[16px] border border-[#e9e2f8] bg-[#fcfaff] p-4">

              <label className="text-[12px] font-extrabold text-[#293c72]">
                Sesuaikan target omzet sendiri
              </label>

              <p className="mt-1 text-[10px] leading-relaxed text-[#858da8]">
  Kamu boleh menggunakan rekomendasi otomatis atau
  menentukan target sesuai tujuan bisnismu.
</p>

<div className="mt-3 flex flex-col gap-2 sm:flex-row">

  <div className="relative min-w-0 flex-1">
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[#4932a0]">
      Rp
    </span>

    <input
      type="text"
      inputMode="numeric"
      value={
        targetEdited
          ? formatThousands(targetInput)
          : formatThousands(finance.estimatedTarget)
      }
      disabled={!canRun && !targetEdited}
      onChange={(e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "");
        setTargetInput(digitsOnly);
        setTargetEdited(true);
      }}
      placeholder="Masukkan target omzet"
      className="w-full rounded-[12px] border border-[#ded7f0] bg-white py-3 pl-11 pr-4 text-[13px] font-bold text-[#4932a0] outline-none focus:border-[#8967e8] disabled:bg-gray-100"
    />
  </div>

  <button
    type="button"
    onClick={() => {
      setTargetEdited(false);
      setTargetInput("");
    }}
    className="rounded-[12px] border border-[#ddd2f7] bg-white px-4 py-3 text-[11px] font-bold text-[#684bd0]"
  >
    Gunakan rekomendasi
  </button>

</div>

              {targetEdited && target > 0 && (
                <div
                  className={`mt-3 rounded-[11px] p-3 text-[11px] ${
                    target >= finance.estimatedTarget
                      ? "bg-[#fff5e8] text-[#a36b31]"
                      : "bg-[#effaf4] text-[#16866a]"
                  }`}
                >
                  {target >= finance.estimatedTarget
                    ? "Target pilihanmu lebih tinggi atau sama dengan estimasi. Pastikan target ini realistis."
                    : "Target pilihanmu lebih rendah dari estimasi. Margin kontribusi tambahan mungkin belum cukup menutup biaya eksperimen."}
                </div>
              )}

            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-[#9295a9]">
              Catatan: Margin produk digunakan sebagai perkiraan
              kontribusi omzet. Data realisasi omzet tetap dicatat
              berdasarkan penjualan sebenarnya selama eksperimen.
            </p>

          </section>

          {/* KRITERIA KEBERHASILAN */}

          <section className="rounded-[21px] border border-[#e7e7f1] bg-white/90 p-4 shadow-sm md:p-5">

            <div className="mb-3 flex items-center gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0eaff] text-[21px]">
                🎯
              </span>

              <h2 className="text-[13px] font-extrabold text-[#19347c] md:text-[15px]">
                Kapan eksperimen dianggap berhasil?
              </h2>

            </div>

            <div className="space-y-2">

              {ex.success.map(([title, description, color]) => (
                <div
                  key={title}
                  className={`flex items-center gap-3 rounded-[12px] px-3 py-2 text-[11px] md:px-4 md:text-[12px] ${color}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/80 font-extrabold">
                    {title === "Berhasil"
                      ? "✓"
                      : title === "Ada sinyal"
                        ? "◉"
                        : "×"}
                  </span>

                  <p className="leading-relaxed text-[#495477]">
                    <b className="text-[#293c72]">
                      {title}:
                    </b>{" "}
                    {description}
                  </p>

                </div>
              ))}

            </div>
          </section>

          {/* LANGKAH 7 HARI (JUDUL SAJA) */}

          <section className="rounded-[21px] border border-[#e7e7f1] bg-white/90 p-4 shadow-sm md:p-5">

            <div className="mb-3 flex items-center gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0eaff] text-[21px]">
                📅
              </span>

              <div>
                <h2 className="text-[13px] font-extrabold text-[#19347c] md:text-[15px]">
                  Langkah 7 hari
                </h2>

                <p className="mt-0.5 text-[10px] text-[#8990a9] md:text-[11px]">
                  Rincian tugas tiap hari ada di Daily Check-in.
                </p>
              </div>

            </div>

            <div className="space-y-1.5">

              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5"
                >

                  <span className="flex min-h-[32px] w-[76px] shrink-0 items-center justify-center rounded-full bg-[#f1edff] text-[11px] font-extrabold text-[#6042c8]">
                    Hari {index + 1}
                  </span>

                  <div className="flex min-h-[32px] min-w-0 flex-1 items-center rounded-full border border-[#e8e9f2] bg-white px-3 py-1.5">

                    <span className="text-[11px] text-[#39476e] md:text-[12px]">
                      {step}
                    </span>

                  </div>

                </div>
              ))}

            </div>
          </section>

          {/* RISIKO */}

          <section className="flex items-center gap-4 rounded-[20px] border border-[#e7e7f1] bg-white/90 p-4 shadow-sm md:p-5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0eaff] text-[21px]">
              🛡️
            </div>

            <div className="min-w-0">

              <h2 className="text-[13px] font-extrabold text-[#19347c]">
                Risiko dan dasar
              </h2>

              <p className="mt-1 text-[11px] leading-relaxed text-[#858da8]">
                {ex.risk}
              </p>

            </div>
          </section>

          {/* TEMPLATE PESAN */}

          <section className="rounded-[20px] border border-[#f3e6c9] bg-[#fff6e5] p-4 shadow-sm md:p-5">

            <div className="mb-3 flex items-center justify-between gap-2">

              <div className="flex items-center gap-3">

                <span className="text-[21px]">
                  📋
                </span>

                <h2 className="text-[13px] font-extrabold text-[#19347c] md:text-[14px]">
                  Template pesan dari AI
                </h2>

              </div>

              <button
                onClick={salinPesan}
                className="shrink-0 rounded-full border border-[#eee1c9] bg-white px-4 py-1.5 text-[11px] font-bold text-[#7559c7]"
              >
                {copied ? "Tersalin ✓" : "Salin pesan ▢"}
              </button>

            </div>

            <div className="rounded-[13px] border border-[#eee8dc] bg-white p-3 text-[11px] leading-relaxed text-[#58627f] md:text-[12px]">
              {ex.template}
            </div>

            <p className="mt-2 text-[10px] text-[#9295a9] md:text-[11px]">
              Bisa diedit langsung sesuai gayamu.
            </p>

          </section>

          {/* JALANKAN EKSPERIMEN */}

          <button
            onClick={jalankan}
            disabled={!canRun}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#6338d5] via-[#5934d0] to-[#4930bd] py-3.5 text-[13px] font-extrabold text-white shadow-[0_5px_16px_rgba(91,55,200,0.23)] transition hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 md:py-4 md:text-[14px]"
          >
            <span className="text-lg">➤</span>

            Jalankan eksperimen

            <span className="text-xl">›</span>
          </button>

          <p className="text-center text-[10px] text-[#9295a9]">
            Pastikan target dan batas biaya sudah sesuai sebelum memulai.
          </p>

        </div>

        <BottomFlowers />

      </main>

      {/* POPUP */}

      {popup && (
  <Popup
    title="Selamat menjalankan eksperimen"
    text={`Eksperimen ${ex.title} dimulai hari ini. Jangan lupa isi daily check-in setiap hari.`}
    onClose={() => setPopup(false)}
  >

          <button
            onClick={() => {
              setPopup(false);
              router.back();
            }}
            className="flex min-h-[58px] flex-1 items-center justify-center rounded-full border border-[#d8cdf5] bg-white px-4 py-3 text-[13px] font-bold text-[#684bd0]"
          >
            Kembali ke Home
          </button>

          <button
            onClick={() => router.push("/experiments/daily")}
            className="flex min-h-[58px] flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#6336db] to-[#4930ca] px-4 py-3 text-[13px] font-bold text-white shadow-md"
          >
            ➤ Langsung ke Daily Check-in
          </button>

        </Popup>
      )}

    </div>
  );
}