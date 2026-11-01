"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useExperiment } from "@/lib/experiment-youfih/store";

/* =========================================
   ISI EKSPERIMEN (Grebek Flash Sale 3 Jam)
========================================= */

const ex = {
  title: "Grebek Flash Sale 3 Jam",
  category: "Flash Sale",
};

const activities = [
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

const rp = (value) => {
  const n = Math.round(Number(value) || 0);
  return `${n < 0 ? "-" : ""}Rp${Math.abs(n).toLocaleString("id-ID")}`;
};

function parseDate(value) {
  if (!value) return new Date();

  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? new Date()
    : date;
}

/* =========================================
   ORNAMEN BUNGA SISI KANAN
========================================= */
function RightFlowers() {
  return (
    <svg
      viewBox="0 0 260 260"
      className="pointer-events-none absolute bottom-0 right-0 z-0 w-[170px] scale-x-[-1] opacity-75 sm:w-[210px] md:w-[270px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 170 C45 130 80 170 100 210 C125 240 170 240 210 260 H0Z"
        fill="#FBE1F5"
        opacity=".8"
      />

      {/* Daun hijau */}
      <path d="M0 240 Q15 135 50 125 Q58 195 0 240Z" fill="#65BFA7" />
      <path d="M5 250 Q35 160 75 155 Q60 220 5 250Z" fill="#80CDB5" />
      <path d="M0 260 Q25 200 95 195 Q65 250 0 260Z" fill="#A0DCC9" />

      <path d="M15 245 Q35 175 50 125" stroke="#398F79" strokeWidth="2" />
      <path d="M15 245 Q45 195 75 155" stroke="#398F79" strokeWidth="2" />

      {/* Daun lavender */}
      <path d="M65 260 Q95 170 135 170 Q120 235 65 260Z" fill="#BCA7F1" />
      <path d="M80 260 Q125 190 170 205 Q140 255 80 260Z" fill="#D1BDF9" />
      <path d="M90 260 Q130 220 185 235 Q145 265 90 260Z" fill="#A98DE8" />

      {/* Bunga pink */}
      <g transform="translate(185 230) scale(.85)">
        <ellipse cy="-19" rx="12" ry="21" fill="#F4A6D7" />
        <ellipse cy="-19" rx="12" ry="21" fill="#F8C0E5" transform="rotate(72)" />
        <ellipse cy="-19" rx="12" ry="21" fill="#E99AD0" transform="rotate(144)" />
        <ellipse cy="-19" rx="12" ry="21" fill="#F8C0E5" transform="rotate(216)" />
        <ellipse cy="-19" rx="12" ry="21" fill="#F4A6D7" transform="rotate(288)" />
        <circle r="10" fill="#F8D16D" />
        <circle r="4" fill="#E7A83D" />
      </g>

      {/* Bunga lavender */}
      <g transform="translate(110 225) scale(.55)">
        <ellipse cy="-18" rx="11" ry="20" fill="#B9A0EF" />
        <ellipse cy="-18" rx="11" ry="20" fill="#D2C0FA" transform="rotate(72)" />
        <ellipse cy="-18" rx="11" ry="20" fill="#A98DE8" transform="rotate(144)" />
        <ellipse cy="-18" rx="11" ry="20" fill="#D2C0FA" transform="rotate(216)" />
        <ellipse cy="-18" rx="11" ry="20" fill="#B9A0EF" transform="rotate(288)" />
        <circle r="8" fill="#F9D36B" />
      </g>
    </svg>
  );
}

/* =========================================
   KARTU STATISTIK
========================================= */
function MetricCard({ title, value, sub, green = false, warn = false }) {
  return (
    <div
      className={`min-w-0 rounded-xl border p-3 md:p-4 ${
        green
          ? "border-emerald-200 bg-emerald-50"
          : warn
            ? "border-rose-200 bg-rose-50"
            : "border-violet-100 bg-white"
      }`}
    >
      <p className="text-[11px] text-slate-500 md:text-xs">
        {title}
      </p>

      <p
        className={`mt-1 break-words text-xl font-extrabold md:text-2xl ${
          green
            ? "text-emerald-700"
            : warn
              ? "text-rose-600"
              : "text-violet-950"
        }`}
      >
        {value}
      </p>

      {sub && (
        <p className="mt-1 text-[10px] font-semibold text-slate-500 md:text-xs">
          {sub}
        </p>
      )}
    </div>
  );
}

/* =========================================
   JUDUL SECTION
========================================= */
function SectionTitle({ number, title, description }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
        {number}
      </span>

      <div className="min-w-0">
        <h2 className="text-base font-extrabold text-violet-950 md:text-lg">
          {title}
        </h2>

        <p className="text-[11px] text-slate-500 md:text-xs">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================
   HALAMAN HASIL EKSPERIMEN
========================================= */
export default function Hasil() {
  const router = useRouter();
  const { s, ready, update } = useExperiment();

  // Sembunyikan footer hanya pada halaman Hasil Eksperimen
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

  const [saveMessage, setSaveMessage] = useState("");

  if (!ready || !s) return null;

  /* =====================================
     STATUS EKSPERIMEN
  ===================================== */

  const stopped = s.status === "stopped";
  const running = s.status === "active";
  const completed = s.status === "completed";
  const idle = s.status === "idle";

  /* =====================================
     DATA KEUANGAN
  ===================================== */

  const finance = s.finance || {};

  const completedDays = Array.from(
    { length: 7 },
    (_, index) => index + 1
  ).filter((day) => {
    const item = finance[day] ?? finance[String(day)];

    return item !== undefined && item !== null;
  });

  const filled = completedDays.length;

  const actual = completedDays.reduce((total, day) => {
    const item = finance[day] ?? finance[String(day)];

    return total + (Number(item?.revenue) || 0);
  }, 0);

  const cost = completedDays.reduce((total, day) => {
    const item = finance[day] ?? finance[String(day)];

    return total + (Number(item?.cost) || 0);
  }, 0);

  /* =====================================
     TARGET, ANGGARAN, DAN PERSENTASE
  ===================================== */

  const target = Number(s.target ?? finance.targetOmzet) || 0;
  const budget =
    Number(s.budgetLimit ?? finance.experimentBudget) || 0;
  const margin = Number(finance.margin) || 0;

  const hit = target > 0 && actual >= target;

  const percentage =
    target > 0 ? Math.round((actual / target) * 100) : 0;

  const label = hit
    ? "Target tercapai"
    : actual > 0
      ? "Ada sinyal positif"
      : "Perlu dievaluasi";

  const budgetUsed =
    budget > 0 ? Math.round((cost / budget) * 100) : 0;

  const implementationRate = Math.round((filled / 7) * 100);

  // Estimasi keuntungan dan sisa biaya
  const profit = actual * margin - cost;
  const remainingBudget = budget - cost;
  const averageRevenue = filled > 0 ? actual / filled : 0;

  /* =====================================
     TANGGAL EKSPERIMEN
  ===================================== */

  const startDate = parseDate(s.startDate);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const periodLabel = `${startDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  })} - ${endDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  /* =====================================
     HARI EKSPERIMEN
  ===================================== */

  const currentDay = Math.max(
    1,
    Math.min(Number(s.day) || 1, 7)
  );

  const lastElapsedDay = idle
    ? 0
    : stopped || completed
      ? currentDay
      : currentDay - 1;

  const missed = Array.from(
    { length: lastElapsedDay },
    (_, index) => index + 1
  ).filter((day) => !completedDays.includes(day)).length;

  /* =====================================
     PEMBELAJARAN DARI CATATAN HARIAN
  ===================================== */

  const noteList = Array.from({ length: 7 }, (_, i) => i + 1).flatMap(
    (day) =>
      [0, 1, 2]
        .map((t) => ({ day, note: s.notes?.[`${day}-${t}`] }))
        .filter((x) => x.note)
  );

  const learnWorked = noteList
    .filter((x) => String(x.note.progress || "").trim() !== "")
    .map((x) => `Hari ${x.day}: ${x.note.progress}`)
    .slice(0, 6);

  const learnNot = noteList
    .filter((x) => String(x.note.obstacle || "").trim() !== "")
    .map((x) => `Hari ${x.day}: ${x.note.obstacle}`)
    .slice(0, 6);

  /* =====================================
     STATUS TEKS
  ===================================== */

  const statusText = stopped
    ? "Dihentikan"
    : running
      ? "Sedang Berjalan"
      : completed
        ? "Selesai"
        : "Belum Dimulai";

  /* =====================================
     KESIMPULAN OTOMATIS SISTEM
  ===================================== */

  const systemAnalysis = idle
    ? {
        title: "Eksperimen belum dimulai",
        description:
          "ElevatePuan belum memiliki data pelaksanaan untuk dianalisis. Oleh karena itu, sistem belum dapat menilai efektivitas strategi maupun perkembangan omzet usaha.",
        conclusion:
          "Saat ini belum terdapat aktivitas dan hasil yang dapat dievaluasi. Kesimpulan mengenai keberhasilan eksperimen baru dapat diberikan setelah pengguna menjalankan aktivitas dan mencatat hasilnya.",
        status: "Menunggu data",
      }
    : stopped
      ? {
          title: "Eksperimen dihentikan sebelum selesai",
          description: `Eksperimen dihentikan pada hari ke-${currentDay}. Sistem menemukan ${filled} dari 7 check-in telah tercatat dengan hasil omzet sebesar ${rp(actual)}.`,
          conclusion: `Berdasarkan data yang tersedia, pelaksanaan eksperimen belum mencapai periode yang direncanakan. Data yang terkumpul masih terbatas sehingga belum cukup untuk menilai efektivitas strategi secara menyeluruh. ${
            filled > 0
              ? "Namun, catatan yang telah dimasukkan tetap dapat menjadi bahan pembelajaran bagi pengguna."
              : "Selain itu, belum terdapat cukup catatan aktivitas untuk mengidentifikasi perkembangan eksperimen."
          }`,
          status: "Evaluasi terbatas",
        }
      : running
        ? {
            title: "Eksperimen masih dalam proses",
            description: `Sampai saat ini terdapat ${filled} dari 7 check-in yang tercatat. Hasil omzet sementara sebesar ${rp(actual)} atau ${percentage}% dari target.`,
            conclusion:
              filled === 0
                ? "Sistem belum menerima catatan pelaksanaan harian. Dengan demikian, perkembangan strategi, respons pelanggan, dan pencapaian omzet belum dapat dinilai secara menyeluruh."
                : actual > 0
                  ? `Eksperimen sudah memiliki ${filled} catatan check-in dan menghasilkan omzet tambahan sebesar ${rp(actual)}. Terdapat perkembangan awal, tetapi hasil tersebut masih perlu diamati hingga periode eksperimen selesai.`
                  : `Sebanyak ${filled} check-in telah tercatat, tetapi belum terdapat omzet tambahan yang dilaporkan. Artinya, aktivitas sudah mulai dilaksanakan, namun keberhasilan strategi belum dapat dibuktikan melalui hasil penjualan. Eksperimen masih memerlukan pengamatan lebih lanjut.`,
            status: "Analisis sementara",
          }
        : {
            title: hit
              ? "Eksperimen berhasil mencapai target"
              : actual > 0
                ? "Eksperimen menunjukkan hasil positif"
                : "Target eksperimen belum tercapai",

            description: hit
              ? `Omzet tambahan mencapai ${rp(actual)}, melampaui target yang ditetapkan sebesar ${rp(target)}.`
              : actual > 0
                ? `Eksperimen menghasilkan omzet tambahan sebesar ${rp(actual)} dari target ${rp(target)}.`
                : `Belum terdapat omzet tambahan yang tercatat dari eksperimen ini. Target yang ditetapkan sebesar ${rp(target)}.`,

            conclusion: hit
              ? `Berdasarkan hasil pencatatan, eksperimen berhasil mencapai target omzet yang ditetapkan. Hal ini menunjukkan bahwa strategi yang dijalankan memberikan hasil sesuai sasaran eksperimen. Hasil ini dapat menjadi bahan pertimbangan pengguna dalam mengembangkan strategi usahanya.`
              : actual > 0
                ? `Eksperimen menghasilkan tambahan omzet, tetapi pencapaiannya masih di bawah target. Artinya, strategi telah menunjukkan hasil awal, namun belum sepenuhnya memenuhi tujuan eksperimen.`
                : `Berdasarkan data yang tercatat, eksperimen belum menghasilkan tambahan omzet. Dengan demikian, strategi yang diuji belum menunjukkan keberhasilan berdasarkan indikator penjualan yang ditetapkan.`,

            status: "Evaluasi akhir",
          };

  /* =====================================
     TEMUAN DATA SISTEM
     (tidak ditampilkan di halaman, tetap
     disimpan bersama evaluasi akhir)
  ===================================== */

  const systemFindings = [
    {
      title: "Pelaksanaan aktivitas",
      value: `${implementationRate}%`,
      description: `${filled} dari 7 check-in telah tercatat.`,
      icon: "✓",
      color: "violet",
    },
    {
      title: "Pencapaian target",
      value: `${percentage}%`,
      description: `${rp(actual)} dari target ${rp(target)}.`,
      icon: "↗",
      color: hit ? "emerald" : "pink",
    },
    {
      title: "Penggunaan anggaran",
      value: `${budgetUsed}%`,
      description: `${rp(cost)} dari batas ${rp(budget)}.`,
      icon: "Rp",
      color: cost > budget ? "pink" : "emerald",
    },
  ];

  /* =====================================
     NAVIGASI
  ===================================== */

  const goHistory = () => {
    router.push("/experiments/history");
  };

  const goInsight = () => {
    router.push("/growth-insight");
  };

  /* =========================================
     SIMPAN EVALUASI AKHIR
  ========================================= */

  const saveEvaluation = () => {
    update((previous) => ({
      ...previous,
      final: {
        ...(previous.final || {}),
        systemTitle: systemAnalysis.title,
        systemDescription: systemAnalysis.description,
        systemConclusion: systemAnalysis.conclusion,
        systemStatus: systemAnalysis.status,
        systemFindings,
        savedAt: new Date().toISOString(),
      },
    }));

    setSaveMessage("Evaluasi akhir berhasil disimpan!");
  };

  return (
    <>
      <main className="relative isolate min-h-screen w-full min-w-0 overflow-x-clip bg-gradient-to-b from-[#f8f1fc] via-[#faf5fc] to-[#fff5f1] px-3 pb-10 pt-4 md:px-6 lg:px-8">
        {/* DEKORASI LATAR */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60">
          <div className="absolute -left-8 top-36 h-40 w-40 rounded-full bg-pink-100/50 blur-3xl" />
          <div className="absolute -right-8 top-72 h-52 w-52 rounded-full bg-violet-200/50 blur-3xl" />
          <div className="absolute bottom-40 left-10 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl" />
          <div className="absolute -right-20 top-[480px] h-72 w-72 rounded-full bg-pink-200/20 blur-3xl" />
        </div>

        <RightFlowers />

        {/* KONTEN UTAMA - MENGIKUTI LEBAR SIDEBAR */}
        <div className="relative z-10 mx-0 w-full max-w-none space-y-4">
          {/* =================================
              HEADER
          ================================= */}

          <header className="relative isolate min-h-[185px] overflow-hidden rounded-[24px] border border-violet-100/70 bg-gradient-to-r from-[#f3edff] via-[#f8f1fc] to-[#fff2f5] px-5 py-5 shadow-sm sm:px-7 sm:py-6 md:min-h-[210px] md:px-8">

            {/* GAMBAR HERO */}
            <img
              src="/images/Hasil-eksperimen.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-auto max-w-[70%] object-contain object-right opacity-50 sm:opacity-100"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,.35) 15%, rgba(0,0,0,.8) 35%, black 60%, black 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,.35) 15%, rgba(0,0,0,.8) 35%, black 60%, black 100%)",
              }}
            />

            {/* GRADASI PENYATU */}
            <div className="pointer-events-none absolute inset-y-0 right-[32%] z-[3] w-[20%] bg-gradient-to-r from-[#f8f1fc]/35 via-[#f8f1fc]/15 to-transparent sm:right-[34%] sm:w-[20%] md:right-[35%] md:w-[18%]" />

            {/* TEKS HEADER */}
            <div className="relative z-10 max-w-[65%] sm:max-w-[62%] md:max-w-[60%]">

              <div className="mb-3 text-[10px] text-slate-500 sm:text-[11px]">
                Home / Eksperimen / Hasil & Pembelajaran
              </div>

              <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-[9px] font-bold text-pink-600 sm:text-[10px]">
                {stopped
                  ? "EKSPERIMEN DIHENTIKAN"
                  : running
                    ? "EKSPERIMEN SEDANG BERJALAN"
                    : completed
                      ? "HASIL EKSPERIMEN"
                      : "RINGKASAN EKSPERIMEN"}
              </span>

              <h1 className="mt-3 text-xl font-extrabold leading-tight text-violet-950 sm:text-2xl md:text-3xl">
                {ex.title}
              </h1>

              <p className="mt-2 max-w-xl text-[10px] leading-relaxed text-slate-500 sm:text-xs">
                {stopped
                  ? "Data eksperimen yang sudah terkumpul akan dianalisis untuk menemukan pembelajaran dan peluang perbaikan."
                  : running
                    ? "Pantau hasil sementara eksperimenmu dan temukan evaluasi dari sistem berdasarkan data yang tercatat."
                    : idle
                      ? "Lihat ringkasan eksperimen dan persiapkan langkah awal untuk memulai perjalanan usahamu."
                      : "Lihat hasil eksperimen, temukan pembelajaran, dan dapatkan rekomendasi untuk mengembangkan usahamu."}
              </p>

            </div>
          </header>

          {/* =================================
              INFORMASI EKSPERIMEN
          ================================= */}

          <section className="rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-sm md:p-5">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-extrabold text-emerald-700">
                  ⚡
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-extrabold text-violet-950 md:text-base">
                    {ex.title}
                  </h2>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                      {ex.category}
                    </span>

                    <span className="text-[10px] text-slate-500">
                      {periodLabel}
                    </span>
                  </div>
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-3">

                <div>
                  <p className="text-[10px] text-slate-500">
                    Status Eksperimen
                  </p>

                  <span
                    className={`text-xs font-bold ${
                      stopped
                        ? "text-rose-600"
                        : running
                          ? "text-amber-600"
                          : completed
                            ? "text-emerald-700"
                            : "text-slate-500"
                    }`}
                  >
                    {stopped ? "■" : "✓"} {statusText}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={goHistory}
                  className="text-xs font-bold text-violet-700 hover:underline"
                >
                  Lihat di Experiment History →
                </button>

              </div>

              <div className="rounded-xl border border-violet-100 bg-violet-50/40 px-4 py-2">
                <p className="text-[10px] text-slate-500">
                  Ringkasan Periode
                </p>

                <p className="text-sm font-extrabold text-violet-950">
                  {stopped ? `${currentDay} hari` : "7 hari"}
                </p>

                <p className="text-[10px] text-slate-500">
                  Check-in terisi {filled} dari 7 hari
                </p>
              </div>

            </div>
          </section>

          {/* =================================
              1. HASIL AKTUAL
          ================================= */}

          <section className="rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-sm md:p-5">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">

              <SectionTitle
                number="1"
                title="Hasil Aktual vs Target"
                description="Perbandingan target yang kamu tetapkan dengan hasil aktual."
              />

              <span className="mb-4 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
                {label}
              </span>

            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

              <MetricCard
                title="Target eksperimen"
                value={rp(target)}
                sub="Tambahan omzet"
              />

              <MetricCard
                title={running || stopped ? "Hasil sementara" : "Hasil aktual"}
                value={rp(actual)}
                sub={`${percentage}% dari target`}
                green={hit}
              />

              <MetricCard
                title="Biaya eksperimen"
                value={rp(cost)}
                sub={`Batas anggaran ${rp(budget)}`}
              />

              {!stopped && (
                <>
                  <MetricCard
                    title="Estimasi keuntungan"
                    value={rp(profit)}
                    sub={
                      margin > 0
                        ? `Revenue × margin ${(margin * 100).toFixed(0)}% − biaya`
                        : "Margin produk belum tersedia"
                    }
                    green={profit >= 0}
                    warn={profit < 0}
                  />

                  <MetricCard
                    title="Sisa biaya eksperimen"
                    value={rp(remainingBudget)}
                    sub={`Terpakai ${budgetUsed}% dari batas anggaran`}
                    green={remainingBudget >= 0}
                    warn={remainingBudget < 0}
                  />

                  <MetricCard
                    title="Rata-rata omzet per hari"
                    value={rp(averageRevenue)}
                    sub={`Dari ${filled} hari yang tercatat`}
                  />
                </>
              )}

            </div>

            <div className="mt-3 rounded-xl bg-violet-50 px-3 py-2 text-[10px] leading-relaxed text-slate-500 md:text-xs">
              <b className="text-violet-950">Catatan:</b>{" "}

              {stopped
                ? "Estimasi keuntungan tidak ditampilkan karena eksperimen dihentikan sebelum periode selesai."
                : running
                  ? `Ini merupakan hasil sementara. Eksperimen masih berjalan dan check-in terisi ${filled} dari 7 hari.`
                  : idle
                    ? "Belum ada hasil aktual karena eksperimen belum dimulai."
                    : `Kenaikan belum tentu sepenuhnya disebabkan oleh eksperimen. Jika memungkinkan, pisahkan penjualan yang benar-benar berasal dari flash sale. Check-in terisi ${filled} dari 7 hari.`}
            </div>

          </section>

          {/* =================================
              2. PELAKSANAAN STRATEGI
          ================================= */}

          <section className="rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-sm md:p-5">

            <SectionTitle
              number="2"
              title="Pelaksanaan Strategi"
              description="Cek kembali apakah rencana utama berhasil dilakukan, dan apa yang terjadi selama pelaksanaan."
            />

            <div className="grid gap-3 md:grid-cols-2">

              <div className="rounded-xl bg-pink-50 p-4">

                <h3 className="mb-3 text-xs font-extrabold text-violet-950">
                  Ringkasan Pelaksanaan
                </h3>

                <div className="border-b border-pink-200 pb-2">
                  <p className="text-[10px] text-slate-500">
                    Check-in tercatat
                  </p>

                  <p className="text-sm font-extrabold text-violet-950">
                    {filled} dari 7
                  </p>
                </div>

                <div className="border-b border-pink-200 py-2">
                  <p className="text-[10px] text-slate-500">
                    Hari tidak dicatat
                  </p>

                  <p className="text-sm font-extrabold text-violet-950">
                    {missed} hari
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] text-slate-500">
                    Persentase check-in
                  </p>

                  <p className="text-sm font-extrabold text-violet-950">
                    {implementationRate}%
                  </p>
                </div>

              </div>

              <div className="rounded-xl bg-violet-100/80 p-4">

                <h3 className="mb-3 text-xs font-extrabold text-violet-950">
                  Catatan Pelaksanaan
                </h3>

                <p className="text-xs leading-relaxed text-slate-600">
                  {stopped
                    ? `Eksperimen dihentikan pada hari ke-${currentDay}. Data yang sudah dicatat tetap tersimpan dan dapat digunakan sebagai bahan evaluasi.`
                    : running
                      ? `Eksperimen masih berjalan pada hari ke-${currentDay}. Kamu dapat melanjutkan aktivitas dan memperbarui catatan harian.`
                      : idle
                        ? "Eksperimen belum dimulai. Belum ada aktivitas yang dapat dievaluasi."
                        : "Eksperimen telah selesai. Gunakan data dan catatan yang terkumpul untuk menentukan strategi berikutnya."}
                </p>

              </div>

            </div>
          </section>

          {/* =================================
              3. TIMELINE AKTIVITAS
          ================================= */}

          <section className="rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-sm md:p-5">

            <div className="flex flex-wrap items-start justify-between gap-2">

              <SectionTitle
                number="3"
                title="Timeline Aktivitas Harian"
                description="Perjalanan eksperimen dari hari pertama hingga hari terakhir."
              />

              <button
                type="button"
                onClick={goHistory}
                className="shrink-0 text-[10px] font-bold text-violet-700 hover:underline md:text-xs"
              >
                Lihat semua catatan →
              </button>

            </div>

            <div className="relative mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">

              <div className="absolute left-[7%] right-[7%] top-[-8px] hidden border-t border-dashed border-violet-300 md:block" />

              {activities.map((activity, index) => {
                const day = index + 1;

                const completedDay = completedDays.includes(day);

                const isMissed =
                  !completedDay && day <= lastElapsedDay;

                const date = new Date(startDate);
                date.setDate(startDate.getDate() + index);

                const dateLabel = date.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={day}
                    className="relative min-w-0 rounded-xl border border-violet-100 bg-[#fcfaff] p-2 md:pt-3"
                  >

                    <div
                      className={`absolute -top-[13px] left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white md:block ${
                        completedDay
                          ? "bg-violet-600"
                          : isMissed
                            ? "bg-amber-400"
                            : "bg-slate-300"
                      }`}
                    />

                    <p className="text-[11px] font-extrabold text-violet-950">
                      Hari {day}
                    </p>

                    <p className="mt-1 text-[9px] text-slate-500">
                      {dateLabel}
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        completedDay
                          ? "bg-emerald-100 text-emerald-700"
                          : isMissed
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {completedDay
                        ? "Selesai"
                        : isMissed
                          ? "Tidak dicatat"
                          : "Belum"}
                    </span>

                    <p className="mt-2 text-[10px] leading-relaxed text-slate-600">
                      {activity}
                    </p>

                  </div>
                );
              })}

            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-slate-500">

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-600" />
                Selesai
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                Tidak dicatat
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                Belum
              </span>

            </div>
          </section>

          {/* =================================
              4. RINGKASAN PEMBELAJARAN
          ================================= */}

          <section className="rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-sm md:p-5">

            <SectionTitle
              number="4"
              title="Ringkasan Pembelajaran"
              description="Dirangkum dari catatan harian yang kamu isi selama eksperimen."
            />

            <div className="grid gap-3 md:grid-cols-2">

              <div className="rounded-xl bg-emerald-50 p-4">

                <h3 className="mb-2 text-xs font-extrabold text-violet-950">
                  Apa yang berhasil?
                </h3>

                {learnWorked.length > 0 ? (
                  learnWorked.map((item, index) => (
                    <p
                      key={index}
                      className="mb-2 text-xs leading-relaxed text-slate-600"
                    >
                      <span className="mr-2 font-bold text-emerald-600">
                        ✓
                      </span>
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">
                    Belum ada pembelajaran yang dicatat.
                  </p>
                )}

              </div>

              <div className="rounded-xl bg-pink-50 p-4">

                <h3 className="mb-2 text-xs font-extrabold text-violet-950">
                  Apa yang kurang berhasil?
                </h3>

                {learnNot.length > 0 ? (
                  learnNot.map((item, index) => (
                    <p
                      key={index}
                      className="mb-2 text-xs leading-relaxed text-slate-600"
                    >
                      <span className="mr-2 font-bold text-rose-500">
                        ✕
                      </span>
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">
                    Belum ada catatan kendala.
                  </p>
                )}

              </div>

            </div>

            <p className="mt-3 text-[10px] text-slate-400">
              Catatan lengkap tiap hari ada di Experiment History.
            </p>
          </section>

          {/* =========================================
              5. KESIMPULAN SISTEM UNTUK PENGGUNA
          ========================================= */}

          <section className="relative overflow-hidden rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-sm md:p-6">

            {/* ORNAMEN */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-100/60 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-pink-100/50 blur-3xl" />

            <div className="relative z-10">

              {/* JUDUL */}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                <SectionTitle
                  number="5"
                  title="Kesimpulan Sistem untuk Pengguna"
                  description="Penilaian ElevatePuan berdasarkan data dan perjalanan eksperimen yang telah dilakukan."
                />

                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-[10px] font-bold text-violet-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  Analisis Sistem
                </span>

              </div>

              {/* HASIL ANALISIS UTAMA */}
              <div className="relative mb-5 overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-[#f4efff] via-[#faf5ff] to-[#fff1f7] p-4 sm:p-5">

                <div className="relative z-10 flex items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    ✨
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="mb-2 flex flex-wrap items-center gap-2">

                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                        Hasil Analisis
                      </span>

                      <span className="rounded-full bg-white/80 px-2 py-1 text-[9px] font-bold text-violet-700">
                        {systemAnalysis.status}
                      </span>

                    </div>

                    <h3 className="text-base font-extrabold leading-snug text-violet-950 sm:text-lg">
                      {systemAnalysis.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {systemAnalysis.description}
                    </p>

                  </div>

                </div>

                <div className="pointer-events-none absolute -bottom-10 -right-5 text-7xl text-white/70">
                  ✦
                </div>

              </div>

              {/* KESIMPULAN SISTEM */}
              <div className="rounded-xl border border-emerald-100 bg-gradient-to-r from-[#effbf5] to-[#f5fbf7] p-4 sm:p-5">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                    <span>📋</span>
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Kesimpulan Akhir
                    </p>

                    <h3 className="mt-2 text-sm font-extrabold text-violet-950">
                      Penilaian ElevatePuan
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-700">
                      {systemAnalysis.conclusion}
                    </p>

                  </div>

                </div>

              </div>

              {/* CATATAN SISTEM */}
              <p className="mt-4 text-[10px] leading-relaxed text-slate-400">
                *Kesimpulan dihasilkan secara otomatis berdasarkan data omzet, penggunaan anggaran, dan catatan check-in yang dimasukkan pengguna. Ketepatan analisis bergantung pada kelengkapan dan kebenaran data yang tercatat.
              </p>

              {/* TOMBOL SIMPAN EVALUASI AKHIR */}
              <div className="mt-5 border-t border-pink-100 pt-5">

                {saveMessage && (
                  <p className="mb-3 text-center text-xs font-semibold text-emerald-600">
                    {saveMessage}
                  </p>
                )}

                <button
                  type="button"
                  onClick={saveEvaluation}
                  className="w-full rounded-xl bg-[#7900c9] px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-[#6500aa] active:scale-[0.99]"
                >
                  <span className="mr-2">✓</span>
                  Simpan Evaluasi Akhir
                </button>

                <p className="mt-2 text-center text-[10px] text-slate-400">
                  Simpan hasil analisis dan kesimpulan eksperimenmu.
                </p>

              </div>

            </div>
          </section>

          {/* =================================
              NAVIGASI DETAIL
          ================================= */}

          <section className="rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-sm md:p-5">

            <h2 className="text-sm font-extrabold text-violet-950">
              Lihat detail lainnya
            </h2>

            <p className="mb-3 text-[11px] text-slate-500">
              Catatan harian lengkap ada di Experiment History.
              Rekomendasi langkah berikutnya ada di Growth Insight.
            </p>

            <div className="grid gap-3 md:grid-cols-2">

              <button
                type="button"
                onClick={goHistory}
                className="flex items-center justify-between rounded-xl border border-violet-100 p-4 text-left transition hover:border-violet-300 hover:bg-violet-50"
              >

                <div>
                  <p className="text-xs font-extrabold text-violet-950">
                    Lihat Experiment History
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Akses catatan harian lengkap dan detail aktivitas.
                  </p>
                </div>

                <span className="font-bold text-violet-600">
                  →
                </span>

              </button>

              <button
                type="button"
                onClick={goInsight}
                className="flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50 p-4 text-left transition hover:bg-violet-100"
              >

                <div>
                  <p className="text-xs font-extrabold text-violet-950">
                    Lihat di Growth Insight
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Dapatkan analisis, pola yang terlihat, dan rekomendasi langkah berikutnya.
                  </p>
                </div>

                <span className="font-bold text-violet-600">
                  →
                </span>

              </button>

            </div>
          </section>

          {/* FOOTER KONTEN */}
          <p className="pb-4 pt-2 text-center text-[10px] text-slate-400">
            ElevatePuan · Setiap langkah kecil membawa usahamu berkembang.
          </p>

        </div>
      </main>

    
    </>
  );
}