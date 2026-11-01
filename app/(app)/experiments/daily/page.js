"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useExperiment } from "@/lib/experiment-youfih/store";

const moods = ["Lancar", "Lumayan", "Agak sulit"];

const EMPTY_OBJECT = Object.freeze({});

/* =========================================
   ISI EKSPERIMEN (Grebek Flash Sale 3 Jam)
========================================= */

const ex = {
  title: "Grebek Flash Sale 3 Jam",
  category: "Flash Sale",
};

const days = [
  {
    focus: 'Pilih satu produk "jagoan" supaya pesan flash sale kuat dan tidak membingungkan.',
    tasks: [
      "Cek stok skincare yang kamu punya sekarang",
      "Pilih 1 produk dengan stok terbanyak atau yang paling disukai pembeli",
      "Tentukan harga normal dan harga promo (pastikan masih di atas modal)",
    ],
    hint: [
      "Produk serum, stok 40 botol, paling sering ditanyakan di DM.",
      "Bingung memilih antara dua produk yang sama-sama laku.",
    ],
  },
  {
    focus: "Siapkan amunisi visual untuk flash sale.",
    tasks: [
      "Buat flyer sederhana dengan aplikasi desain gratis di HP",
      'Tulis judul yang kuat, misalnya "Grebek Flash Sale 3 Jam Saja (16.00–19.00)"',
      "Pastikan harga coret terlihat jelas di flyer",
    ],
    hint: [
      "Flyer sudah jadi, harga coret dan harga promo sudah terlihat jelas.",
      "Aplikasi desain agak lambat dan susah mengatur tulisan.",
    ],
  },
  {
    focus: 'Mulai beri "bocoran" supaya calon pembeli penasaran.',
    tasks: [
      "Posting teaser di Story WhatsApp",
      "Posting teaser di Story Instagram dengan foto produk",
      'Tulis teks yang bikin penasaran, misalnya "Besok ada kejutan, siap-siap jam 4 sore ya!"',
    ],
    hint: [
      "Teaser sudah tayang di WA dan IG, beberapa orang menanyakan kejutannya.",
      "Bingung menulis teks teaser yang menarik.",
    ],
  },
  {
    focus: "Kirim pengingat terakhir dan bangun rasa urgensi.",
    tasks: [
      "Kirim reminder satu jam sebelum mulai (sekitar jam 15.00)",
      'Posting story pengingat, misalnya "Satu jam lagi Flash Sale dimulai! Stok terbatas"',
      "Pastikan stok produk siap dan kamu bisa fokus membalas pesan jam 16.00–19.00",
    ],
    hint: [
      "Reminder terkirim ke calon pembeli yang pernah tanya harga.",
      "Takut stok kurang kalau peminatnya banyak.",
    ],
  },
  {
    focus: "Hari flash sale: buka promo tepat waktu dan jaga rasa urgensi.",
    tasks: [
      "Buka promo tepat jam 16.00",
      'Update story setiap ada pembelian, misalnya "Tinggal 5 paket lagi!"',
      "Balas semua DM dan catat setiap pembelian selama 3 jam",
    ],
    hint: [
      "Ada beberapa pembeli yang tadinya cuma tanya harga lalu langsung transfer.",
      "Pesan masuk terlalu banyak sehingga pencatatan agak tertinggal.",
    ],
  },
  {
    focus: "Tutup promo tepat waktu supaya pembeli percaya batas waktunya serius.",
    tasks: [
      "Tutup promo tepat jam 19.00",
      'Umumkan dengan ramah: "Mohon maaf, Flash Sale sudah berakhir. Harga kembali normal."',
      "Tindak lanjuti pembeli yang sudah checkout (konfirmasi dan pengiriman)",
    ],
    hint: [
      "Promo ditutup tepat waktu dan pengumuman sudah diposting.",
      "Ada yang minta harga promo setelah promo berakhir.",
    ],
  },
  {
    focus: "Rayakan hasilnya dan catat pelajaran dari eksperimen.",
    tasks: [
      "Rekap semua penjualan dari flash sale",
      "Bandingkan omzet 3 jam flash sale dengan hari-hari biasa",
      "Tulis apa yang berhasil dan apa yang perlu diperbaiki",
    ],
    hint: [
      "Omzet 3 jam flash sale lebih tinggi dari rata-rata hari biasa.",
      "Sulit memisahkan penjualan flash sale dari penjualan biasa.",
    ],
  },
];

const card =
  "rounded-[20px] border border-[#e9e7f3]/90 bg-white/80 shadow-[0_4px_15px_rgba(67,51,130,0.055)] backdrop-blur-[2px]";

const fmt = (date, options) =>
  date.toLocaleDateString("id-ID", options);

// FORMAT ANGKA RUPIAH
const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
};

// FORMAT RUPIAH DENGAN TANDA (untuk nilai yang bisa negatif)
const formatRupiahSigned = (value) => {
  const n = Math.round(Number(value) || 0);
  return `${n < 0 ? "-" : ""}Rp ${formatRupiah(Math.abs(n))}`;
};

// FORMAT INPUT RUPIAH
const formatInputRupiah = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const angka = String(value).replace(/\D/g, "");

  if (!angka) return "";

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Number(angka));
};

// MENGAMBIL ANGKA ASLI TANPA TITIK
const parseRupiah = (value) => {
  return String(value).replace(/\D/g, "");
};

const jam = () =>
  new Date()
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(":", ".");

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
   ORNAMEN BUNGA DAN DAUN
========================================= */

function TopFlowers() {
  return (
    <svg
      viewBox="0 0 300 230"
      className="pointer-events-none absolute -right-5 top-0 z-[25] w-[100px] opacity-40 sm:w-[155px] md:w-[205px] lg:w-[270px]"
      fill="none"
      aria-hidden="true"
    >
      {/* BUNGA KECIL UNGU */}
      <g transform="translate(105 65) scale(.72)">
        <ellipse cy="-19" rx="12" ry="22" fill="#C5B3F1" />
        <ellipse
          cy="-19"
          rx="12"
          ry="22"
          fill="#E0D5FA"
          transform="rotate(72)"
        />
        <ellipse
          cy="-19"
          rx="12"
          ry="22"
          fill="#B7A0EB"
          transform="rotate(144)"
        />
        <ellipse
          cy="-19"
          rx="12"
          ry="22"
          fill="#E0D5FA"
          transform="rotate(216)"
        />
        <ellipse
          cy="-19"
          rx="12"
          ry="22"
          fill="#C5B3F1"
          transform="rotate(288)"
        />
        <circle r="9" fill="#F8D16D" />
      </g>

      {/* BUNGA KECIL PINK */}
      <g transform="translate(58 115) scale(.48)">
        <ellipse cy="-18" rx="11" ry="20" fill="#F3A8D5" />
        <ellipse
          cy="-18"
          rx="11"
          ry="20"
          fill="#F9C7E7"
          transform="rotate(72)"
        />
        <ellipse
          cy="-18"
          rx="11"
          ry="20"
          fill="#E994C9"
          transform="rotate(144)"
        />
        <ellipse
          cy="-18"
          rx="11"
          ry="20"
          fill="#F9C7E7"
          transform="rotate(216)"
        />
        <ellipse
          cy="-18"
          rx="11"
          ry="20"
          fill="#F3A8D5"
          transform="rotate(288)"
        />
        <circle r="8" fill="#F8D16D" />
      </g>
    </svg>
  );
}

function BottomFlowers() {
  return (
    <svg
      viewBox="0 0 260 260"
      className="pointer-events-none absolute bottom-0 right-0 z-0 w-[105px] opacity-100 sm:w-[150px] md:w-[205px] lg:w-[270px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 170C45 130 80 170 100 210C125 240 170 240 210 260H0Z"
        fill="#FBE1F5"
        opacity=".8"
      />

      <path d="M0 240Q15 135 50 125Q58 195 0 240Z" fill="#65BFA7" />
      <path d="M5 250Q35 160 75 155Q60 220 5 250Z" fill="#80CDB5" />
      <path d="M0 260Q25 200 95 195Q65 250 0 260Z" fill="#A0DCC9" />

      <path
        d="M15 245Q35 175 50 125"
        stroke="#398F79"
        strokeWidth="2"
      />

      <path
        d="M15 245Q45 195 75 155"
        stroke="#398F79"
        strokeWidth="2"
      />

      <path d="M65 260Q95 170 135 170Q120 235 65 260Z" fill="#BCA7F1" />
      <path d="M80 260Q125 190 170 205Q140 255 80 260Z" fill="#D1BDF9" />
      <path d="M90 260Q130 220 185 235Q145 265 90 260Z" fill="#A98DE8" />

      <g transform="translate(185 230) scale(.85)">
        <ellipse cy="-19" rx="12" ry="21" fill="#F4A6D7" />
        <ellipse
          cy="-19"
          rx="12"
          ry="21"
          fill="#F8C0E5"
          transform="rotate(72)"
        />
        <ellipse
          cy="-19"
          rx="12"
          ry="21"
          fill="#E99AD0"
          transform="rotate(144)"
        />
        <ellipse
          cy="-19"
          rx="12"
          ry="21"
          fill="#F8C0E5"
          transform="rotate(216)"
        />
        <ellipse
          cy="-19"
          rx="12"
          ry="21"
          fill="#F4A6D7"
          transform="rotate(288)"
        />
        <circle r="10" fill="#F8D16D" />
        <circle r="4" fill="#E7A83D" />
      </g>

      <g transform="translate(110 225) scale(.55)">
        <ellipse cy="-18" rx="11" ry="20" fill="#B9A0EF" />
        <ellipse
          cy="-18"
          rx="11"
          ry="20"
          fill="#D2C0FA"
          transform="rotate(72)"
        />
        <ellipse
          cy="-18"
          rx="11"
          ry="20"
          fill="#A98DE8"
          transform="rotate(144)"
        />
        <ellipse
          cy="-18"
          rx="11"
          ry="20"
          fill="#D2C0FA"
          transform="rotate(216)"
        />
        <ellipse
          cy="-18"
          rx="11"
          ry="20"
          fill="#B9A0EF"
          transform="rotate(288)"
        />
        <circle r="8" fill="#F9D36B" />
      </g>
    </svg>
  );
}


/* =========================================
   KOMPONEN POP-UP TANPA SCROLLBAR
========================================= */

function Modal({ icon, title, text, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#22204f]/35 px-3 py-3 backdrop-blur-[3px] sm:px-4 sm:py-4">

      <div className="relative w-full max-w-[510px] overflow-hidden rounded-[20px] border border-[#eee8fb] bg-white px-4 py-5 text-center shadow-[0_20px_70px_rgba(45,35,100,0.22)] sm:rounded-[25px] sm:px-10 sm:py-7">

        {/* ORNAMEN */}
        <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[#f8dff2]/70 blur-xl" />

        <div className="pointer-events-none absolute -bottom-10 -right-7 h-32 w-32 rounded-full bg-[#dff8f5]/80 blur-xl" />

        {/* TOMBOL TUTUP */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela"
            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1eaff] text-[24px] font-medium leading-none text-[#7651d8] transition hover:bg-[#e5d9ff] sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:text-[28px]"
          >
            ×
          </button>
        )}

        {/* ICON */}
        <div className="relative z-10 mx-auto mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-[22px] bg-gradient-to-br from-[#f5edff] to-[#e9f9f5] sm:mb-5 sm:h-[100px] sm:w-[100px] sm:rounded-[30px]">

          <div className="flex h-[55px] w-[55px] items-center justify-center rounded-[18px] bg-white text-[30px] shadow-[0_5px_20px_rgba(100,75,180,0.12)] sm:h-[76px] sm:w-[76px] sm:rounded-[24px] sm:text-[43px]">
            {icon}
          </div>

          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-[#4fc49a] text-[16px] font-extrabold text-white sm:h-10 sm:w-10 sm:border-[4px] sm:text-[22px]">
            ✓
          </span>
        </div>

        {/* JUDUL */}
        <h2 className="relative z-10 text-[18px] font-extrabold leading-snug text-[#40318f] sm:text-[24px]">
          {title}
        </h2>

        {/* DESKRIPSI */}
        <p className="relative z-10 mx-auto mt-2 max-w-[390px] text-[11px] leading-5 text-[#77799c] sm:mt-3 sm:text-[13px] sm:leading-7">
          {text}
        </p>

        {/* TOMBOL */}
        {children && (
          <div className="relative z-10 mt-4 flex flex-col justify-center gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
            {children}
          </div>
        )}

        {/* ORNAMEN BAWAH */}
        <div className="pointer-events-none absolute -bottom-4 left-5 text-[28px] opacity-50">
          🌿
        </div>

        <div className="pointer-events-none absolute -bottom-4 right-5 text-[28px] opacity-50">
          🌸
        </div>

      </div>
    </div>
  );
}


/* =========================================
   KOMPONEN TASK / CHECKLIST
========================================= */

function Task({ k, label, hint = [], saved, onSave }) {
  const [open, setOpen] = useState(false);

  const [f, setF] = useState({
    progress: "",
    obstacle: "",
    mood: "",
  });

  const formComplete =
    f.progress.trim() !== "" &&
    f.obstacle.trim() !== "" &&
    f.mood !== "";

  function simpan() {
    if (!formComplete || saved) return;

    onSave(k, {
      ...f,
      time: jam(),
    });

    setOpen(false);
  }

  if (saved) {
    return (
      <div className="overflow-hidden rounded-[15px] border border-[#ece9f8] bg-white shadow-[0_2px_8px_rgba(67,51,130,0.035)]">
        <div className="flex flex-wrap items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4">
          <input
            type="checkbox"
            checked
            disabled
            aria-label="Tugas selesai"
            className="h-5 w-5 shrink-0 accent-violet-600"
          />

          <span className="min-w-0 flex-1 basis-[150px] text-[12px] text-[#77809c] sm:text-[13px]">
            {label}
          </span>

          <span className="rounded-full bg-[#e1f7ed] px-3 py-1 text-[10px] font-bold text-[#169574]">
            Selesai
          </span>

          <span className="text-[10px] text-[#9299ae] sm:text-[11px]">
            {saved.time || "-"}
          </span>
        </div>

        <div className="grid gap-3 border-l-[4px] border-[#7651db] bg-gradient-to-r from-[#f3efff] to-[#faf9ff] p-3 sm:gap-4 sm:p-4 md:grid-cols-[1.4fr_1fr_0.7fr]">
          <div className="min-w-0">
            <p className="mb-2 text-[12px] font-extrabold text-[#6544c8]">
              Catatan tersimpan
            </p>

            <p className="mb-1 text-[10px] text-[#8990aa]">
              Perkembangan
            </p>

            <p className="whitespace-pre-wrap break-words text-[12px] leading-relaxed text-[#414b70]">
              {saved.progress}
            </p>
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-[10px] text-[#8990aa]">
              Kendala
            </p>

            <p className="whitespace-pre-wrap break-words text-[12px] leading-relaxed text-[#414b70]">
              {saved.obstacle}
            </p>
          </div>

          <div>
            <p className="mb-2 text-[10px] text-[#8990aa]">
              Perasaan
            </p>

            <span className="inline-block rounded-full bg-[#e9e1ff] px-3 py-1 text-[11px] font-bold text-[#6749c9]">
              {saved.mood}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[15px] border border-[#ece9f8] bg-white">
      <div className="flex flex-wrap items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4">
        <input
          type="checkbox"
          checked={open}
          onChange={() => setOpen((old) => !old)}
          aria-label="Buka form catatan"
          className="h-5 w-5 shrink-0 cursor-pointer accent-violet-600"
        />

        <span className="min-w-0 flex-1 basis-[150px] text-[12px] text-[#39476e] sm:text-[13px]">
          {label}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold ${
            open
              ? "bg-[#fff4df] text-[#b17a19]"
              : "bg-[#fff0f5] text-[#dc4383]"
          }`}
        >
          {open ? "Isi catatan" : "Belum selesai"}
        </span>

        <span className="text-[10px] text-[#a1a6b9] sm:text-[11px]">
          -
        </span>
      </div>

      {open && (
        <div className="space-y-4 border-t border-[#efecf8] bg-[#faf9ff] p-3 sm:space-y-5 sm:p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="min-w-0">
              <label className="text-[12px] font-bold text-[#263b7c]">
                Bagaimana perkembangannya?{" "}
                <span className="text-[#dc4383]">*</span>
              </label>

              <textarea
                required
                className="inp mt-2 w-full min-w-0 rounded-xl border border-[#e6e1f5] bg-white p-3 text-sm outline-none focus:border-[#8b6ce0]"
                rows={3}
                placeholder={
                  "Contoh: " +
                  (hint[0] || "Ceritakan perkembangan hari ini")
                }
                value={f.progress}
                onChange={(e) =>
                  setF((old) => ({
                    ...old,
                    progress: e.target.value,
                  }))
                }
              />
            </div>

            <div className="min-w-0">
              <label className="text-[12px] font-bold text-[#263b7c]">
                Apa kendalanya?{" "}
                <span className="text-[#dc4383]">*</span>
              </label>

              <textarea
                required
                className="inp mt-2 w-full min-w-0 rounded-xl border border-[#e6e1f5] bg-white p-3 text-sm outline-none focus:border-[#8b6ce0]"
                rows={3}
                placeholder={
                  "Contoh: " +
                  (hint[1] || "Ceritakan kendala hari ini")
                }
                value={f.obstacle}
                onChange={(e) =>
                  setF((old) => ({
                    ...old,
                    obstacle: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-[12px] font-bold text-[#263b7c]">
              Perasaanmu hari ini{" "}
              <span className="text-[#dc4383]">*</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() =>
                    setF((old) => ({
                      ...old,
                      mood: m,
                    }))
                  }
                  className={`rounded-full border px-3 py-2 text-[10px] font-semibold transition sm:px-4 sm:text-[11px] ${
                    f.mood === m
                      ? "border-[#704bd5] bg-[#704bd5] text-white"
                      : "border-[#e2dcf5] bg-white text-[#6855a6] hover:bg-[#f2eeff]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {!f.mood && (
              <p className="mt-2 text-[10px] text-[#dc4383]">
                Pilih salah satu perasaan sebelum menyimpan.
              </p>
            )}
          </div>

          <div>
            <button
              type="button"
              disabled={!formComplete}
              onClick={simpan}
              className="w-full rounded-full bg-gradient-to-r from-[#7045d5] to-[#5632c4] px-6 py-2.5 text-[12px] font-bold text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              Simpan catatan
            </button>
          </div>

          <p className="text-[10px] leading-relaxed text-[#9291a5]">
            * Semua kolom wajib diisi sebelum catatan dapat disimpan.
            Catatan yang sudah tersimpan tidak dapat diubah.
          </p>
        </div>
      )}
    </div>
  );
}

/* =========================================
   HALAMAN DAILY CHECK-IN
========================================= */

export default function Daily() {
  const router = useRouter();

  const { s, ready, update } = useExperiment();

  // Sembunyikan footer hanya pada halaman Daily Check-in
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

  const [fin, setFin] = useState({
    revenue: "",
    cost: "",
  });

  const [successPopup, setSuccessPopup] = useState(null);
  const [stop, setStop] = useState(false);
  const [finishPopup, setFinishPopup] = useState(false);
  const [skippedDay, setSkippedDay] = useState(null);

  const state = s || {};
  const notes = state.notes ?? EMPTY_OBJECT;
  const finance = state.finance ?? EMPTY_OBJECT;

  const day = Number(state.day) || 1;
  const d = days?.[day - 1];

  const keys = [0, 1, 2].map((t) => `${day}-${t}`);

  const allNotes = keys.every((k) => Boolean(notes[k]));
  const finSaved = finance[day];
  const ready2 = allNotes && Boolean(finSaved);

  const previousDay = day - 1;

  const previousKeys = [0, 1, 2].map(
    (t) => `${previousDay}-${t}`
  );

  const previousIncomplete =
    day > 1 &&
    (
      !previousKeys.every((k) => Boolean(notes[k])) ||
      !finance[previousDay]
    );

  /* PENGALIHAN HALAMAN */

  useEffect(() => {
    if (!ready) return;

    if (state.status === "idle") {
      router.replace("/");
      return;
    }

    if (
      state.status !== "active" &&
      state.status !== "idle"
    ) {
      router.replace("/experiments/hasil");
    }
  }, [ready, state.status, router]);

  /* SINKRONISASI CATATAN KEUANGAN */

  useEffect(() => {
    const saved = finance[day];

    setFin({
      revenue: saved ? String(saved.revenue ?? "") : "",
      cost: saved ? String(saved.cost ?? "") : "",
    });
  }, [day, finance]);

  /* PINDAH HARI OTOMATIS */

  useEffect(() => {
    if (
      !ready ||
      state.status !== "active" ||
      !ready2 ||
      day >= 7 ||
      successPopup
    ) {
      return;
    }

    const timer = setTimeout(() => {
      update((p) => {
        if (
          p.status !== "active" ||
          p.day !== day ||
          p.day >= 7
        ) {
          return p;
        }

        return {
          ...p,
          day: p.day + 1,
        };
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [
    ready,
    state.status,
    ready2,
    day,
    update,
    successPopup,
  ]);

  /* OTOMATIS MENUJU HASIL SETELAH POP-UP SELESAI */

  useEffect(() => {
    if (!finishPopup) return;

    const timer = setTimeout(() => {
      update((p) => ({
        ...p,
        status: "completed",
      }));

      router.replace("/experiments/hasil");
    }, 2000);

    return () => clearTimeout(timer);
  }, [finishPopup, update, router]);

  if (!ready || state.status !== "active") {
    return null;
  }

  if (!d) return null;

  /* TANGGAL EKSPERIMEN */

  const start = parseDate(state.startDate);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const cur = new Date(start);
  cur.setDate(start.getDate() + day - 1);

  /* DATA KEUANGAN PER HARI (hanya hari 1-7) */

  const dayRecords = [1, 2, 3, 4, 5, 6, 7]
    .map((n) => ({ n, item: finance[n] }))
    .filter((x) => x.item);

  const margin = Number(finance.margin) || 0;

  const budgetLimit =
    Number(state.budgetLimit ?? finance.experimentBudget) || 0;

  /* TOTAL REVENUE */

  const total = dayRecords.reduce(
    (sum, x) => sum + (Number(x.item.revenue) || 0),
    0
  );

  /* TOTAL ESTIMASI KEUNTUNGAN */

  const totalProfit = dayRecords.reduce(
    (sum, x) =>
      sum +
      (Number(x.item.revenue) || 0) * margin -
      (Number(x.item.cost) || 0),
    0
  );

  /* BIAYA YANG SUDAH TERPAKAI DI HARI LAIN */

  const spentOtherDays = dayRecords
    .filter((x) => x.n !== day)
    .reduce((sum, x) => sum + (Number(x.item.cost) || 0), 0);

  // Batas maksimal biaya yang boleh diisi hari ini
  const remainingBeforeToday = Math.max(
    0,
    budgetLimit - spentOtherDays
  );

  const costNow = finSaved
    ? Number(finSaved.cost) || 0
    : Number(fin.cost) || 0;

  const revenueNow = finSaved
    ? Number(finSaved.revenue) || 0
    : Number(fin.revenue) || 0;

  // Sisa biaya eksperimen setelah biaya hari ini
  const remainingAfterToday = remainingBeforeToday - costNow;

  const costExceeds = !finSaved && costNow > remainingBeforeToday;

  // Estimasi keuntungan hari ini
  const profitToday = revenueNow * margin - costNow;

  /* SIMPAN CATATAN CHECKLIST */

  const saveNote = (k, value) => {
    update((p) => {
      if (p.notes?.[k]) {
        return p;
      }

      return {
        ...p,
        notes: {
          ...(p.notes || {}),
          [k]: value,
        },
      };
    });

    setSuccessPopup({
      title: "Catatan berhasil disimpan!",
      text: "Catatan perkembangan, kendala, dan perasaan hari ini sudah tersimpan dan tidak dapat diubah lagi.",
      icon: "📋",
    });
  };

  /* VALIDASI KEUANGAN */

  const financeComplete =
    fin.revenue.trim() !== "" &&
    fin.cost.trim() !== "" &&
    Number.isFinite(Number(fin.revenue)) &&
    Number.isFinite(Number(fin.cost)) &&
    Number(fin.revenue) >= 0 &&
    Number(fin.cost) >= 0 &&
    !costExceeds;

  /* SIMPAN CATATAN KEUANGAN */

  const saveFin = () => {
    if (!financeComplete || finSaved) return;

    update((p) => {
      if (p.finance?.[day]) {
        return p;
      }

      return {
        ...p,
        finance: {
          ...(p.finance || {}),
          [day]: {
            revenue: Number(fin.revenue),
            cost: Number(fin.cost),
          },
        },
      };
    });

    setSuccessPopup({
      title: "Catatan keuangan tersimpan!",
      text: "Data pemasukan dan biaya hari ini sudah tersimpan dan tidak dapat diubah lagi.",
      icon: "💰",
    });
  };

  const done = keys.filter((k) => Boolean(notes[k])).length;

  const progress = Math.round((day / 7) * 100);

  function isiHariSebelumnya() {
    if (previousDay < 1) return;

    setSkippedDay(null);

    update((p) => ({
      ...p,
      day: previousDay,
    }));
  }

  function lewatiHariSebelumnya() {
    setSkippedDay(day);
  }

  /* SELESAIKAN EKSPERIMEN */

  function selesai() {
    if (!ready2 || day !== 7) return;

    setFinishPopup(true);
  }

  /* HENTIKAN EKSPERIMEN */

  function hentikan() {
    update((p) => ({
      ...p,
      status: "stopped",
    }));

    router.replace("/experiments/hasil");
  }

  return (
    <>
      <main className="relative isolate min-h-screen w-full overflow-hidden rounded-[18px] bg-transparent pb-8 sm:rounded-[24px] sm:pb-10">

        <BottomFlowers />

        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#f8faff]/55 via-[#f7f7ff]/35 to-[#fff5fb]/45" />

        <div className="pointer-events-none absolute -left-28 top-[380px] z-0 h-72 w-72 rounded-full bg-[#e7d8ff]/35 blur-3xl" />

        <div className="pointer-events-none absolute -right-28 top-[650px] z-0 h-80 w-80 rounded-full bg-[#f9d5eb]/30 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] space-y-3 px-2 pt-2 sm:space-y-4 sm:px-3 sm:pt-3 md:px-5 md:pt-4">

          {/* HERO BANNER */}

          <section className="relative min-h-[270px] overflow-hidden rounded-[18px] border border-[#eee7f8]/80 bg-gradient-to-r from-[#f4efff]/90 via-[#f8f6ff]/85 to-[#fff0f6]/90 px-4 py-4 sm:min-h-[200px] sm:rounded-[22px] sm:px-5 sm:py-5 md:min-h-[185px] md:px-7">

            <div className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-[#f4c8ed]/30 blur-2xl" />

            {/* FOTO HERO */}
            <img
              src="/images/daily-checkin-banner.png"
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

            <div className="pointer-events-none absolute inset-y-0 right-[32%] z-[3] w-[20%] bg-gradient-to-r from-[#f6f2ff]/35 via-[#f6f2ff]/15 to-transparent sm:right-[34%] sm:w-[20%] md:right-[35%] md:w-[18%]" />

            {/* BUNGA KECIL DI DEPAN DAUN */}
            <TopFlowers />

            {/* ORNAMEN BOTANI */}

            <svg
              viewBox="0 0 250 190"
              className="pointer-events-none absolute bottom-0 right-[15%] z-20 h-[110px] w-[145px] opacity-70 sm:right-[25%] sm:h-[145px] sm:w-[190px] sm:opacity-90 md:right-[29%] md:h-[180px] md:w-[235px]"
              fill="none"
              aria-hidden="true"
            >

              <g transform="translate(42 79) scale(.30)">
                <ellipse cy="-18" rx="10" ry="18" fill="#EFA7D2" />
                <ellipse
                  cy="-18"
                  rx="10"
                  ry="18"
                  fill="#F7C8E4"
                  transform="rotate(72)"
                />
                <ellipse
                  cy="-18"
                  rx="10"
                  ry="18"
                  fill="#E99ACB"
                  transform="rotate(144)"
                />
                <ellipse
                  cy="-18"
                  rx="10"
                  ry="18"
                  fill="#F7C8E4"
                  transform="rotate(216)"
                />
                <ellipse
                  cy="-18"
                  rx="10"
                  ry="18"
                  fill="#EFA7D2"
                  transform="rotate(288)"
                />
                <circle r="7" fill="#F5D16E" />
              </g>

              <g transform="translate(196 26) scale(.24)">
                <ellipse cy="-18" rx="10" ry="18" fill="#C6B5EE" />
                <ellipse
                  cy="-18"
                  rx="10"
                  ry="18"
                  fill="#E0D6F7"
                  transform="rotate(72)"
                />
                <ellipse
                  cy="-18"
                  rx="10"
                  ry="18"
                  fill="#B5A1E6"
                  transform="rotate(144)"
                />
                <ellipse
                  cy="-18"
                  rx="10"
                  ry="18"
                  fill="#E0D6F7"
                  transform="rotate(216)"
                />
                <ellipse
                  cy="-18"
                  rx="10"
                  ry="18"
                  fill="#C6B5EE"
                  transform="rotate(288)"
                />
                <circle r="7" fill="#F5D16E" />
              </g>
            </svg>

            {/* TEKS HERO */}

            <div className="relative z-30 w-full max-w-[270px] sm:max-w-[75%] md:max-w-[70%]">
              <div className="mb-2 text-[9px] text-[#8990ad] sm:text-[10px]">
                Home / My Experiment / Daily Check-in
              </div>

              <span className="inline-block rounded-full bg-[#ffe5f0] px-3 py-1 text-[9px] font-extrabold text-[#d83b80] sm:text-[10px]">
                EKSPERIMEN AKTIF
              </span>

              <h1 className="mt-3 text-[23px] font-extrabold leading-tight text-[#19347e] sm:text-[27px] md:text-[30px]">
                Daily Check-in
              </h1>

              <p className="mt-1 max-w-[590px] text-[10px] leading-relaxed text-[#75809f] sm:text-[11px] md:text-[12px]">
                Centang tugas yang sudah kamu kerjakan, lalu catat
                perkembangannya. Catatan kecil setiap hari membantu
                kamu melihat apa yang berhasil.
              </p>
            </div>

            {/* TANGGAL */}

            <div className="relative z-30 mt-4 inline-flex max-w-full items-center rounded-full border border-[#eee8f8] bg-white/95 px-3 py-2 text-[9px] font-bold text-[#243c83] shadow-sm sm:absolute sm:right-3 sm:top-3 sm:mt-0 sm:text-[10px] md:right-5 md:top-5 md:text-[11px]">
              📅{" "}
              {fmt(cur, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </section>

          {/* RINGKASAN EKSPERIMEN */}

          <section
            className={`${card} flex flex-col items-stretch gap-3 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:p-4 md:gap-4 md:px-5`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f7ef] text-[20px] font-extrabold text-[#16876b] sm:h-12 sm:w-12">
                ⚡
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="break-words text-[13px] font-extrabold text-[#19347e] sm:text-[14px] md:text-[16px]">
                  {ex.title}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-[9px] text-[#8990a8] sm:text-[10px] md:text-[11px]">
                  <span className="rounded-full bg-[#f0eaff] px-3 py-1 font-bold text-[#704bd0]">
                    {ex.category}
                  </span>

                  <span>
                    {fmt(start, {
                      day: "numeric",
                      month: "short",
                    })}
                    {" - "}
                    {fmt(end, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span className="hidden sm:inline">|</span>

                  <span className="font-semibold text-[#263b7c]">
                    Total tambahan omzet Rp {formatRupiah(total)}
                  </span>

                  <span className="hidden sm:inline">|</span>

                  <span className="font-semibold text-[#263b7c]">
                    Estimasi keuntungan {formatRupiahSigned(totalProfit)}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full sm:ml-auto sm:w-[220px] md:w-[280px]">
              <div className="mb-2 flex justify-between text-[10px] font-extrabold text-[#19347e] sm:text-[11px]">
                <span>Hari ke-{day} dari 7 hari</span>
                <span>{progress}%</span>
              </div>

              <div className="h-[8px] overflow-hidden rounded-full bg-[#ece8fa]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8653e8] to-[#5832c9] transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* FOKUS HARI INI */}

          <section className="flex items-start gap-3 rounded-[16px] border border-[#ece5fa] bg-[#f0eaff] px-3 py-3 sm:items-center sm:px-4">
            <span className="shrink-0 text-[21px] text-[#6848cf]">
              ◎
            </span>

            <p className="min-w-0 text-[10px] leading-relaxed text-[#6655a7] sm:text-[11px] md:text-[12px]">
              <b className="mr-2 text-[#6040c4]">
                Fokus hari ini
              </b>
              H{day}: {d.focus}
            </p>
          </section>

          {/* PERINGATAN HARI SEBELUMNYA */}

          {previousIncomplete && skippedDay !== day && (
            <section className="flex flex-col gap-3 rounded-[16px] border border-[#f4e3bb] bg-[#fff5df] px-3 py-3 sm:px-4 sm:py-3 md:flex-row md:items-center md:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <span className="shrink-0 text-xl">⚠️</span>

                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold text-[#956b19]">
                    Hari ke-{previousDay} belum dicatat.
                  </p>

                  <p className="text-[10px] leading-relaxed text-[#9a8251] sm:text-[11px]">
                    Kamu masih bisa mengisinya sekarang, atau lewati
                    dan lanjut ke hari ini.
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                <button
                  type="button"
                  onClick={isiHariSebelumnya}
                  className="w-full rounded-full bg-gradient-to-r from-[#7045d5] to-[#5632c4] px-4 py-2.5 text-[10px] font-bold text-white shadow-md transition hover:brightness-110 sm:w-auto sm:px-5 sm:text-[11px]"
                >
                  Isi catatan hari ke-{previousDay}
                </button>

                <button
                  type="button"
                  onClick={lewatiHariSebelumnya}
                  className="w-full rounded-full border border-[#eee4ce] bg-white px-4 py-2.5 text-[10px] font-bold text-[#9b7a37] shadow-sm transition hover:bg-[#fffaf0] sm:w-auto sm:px-5 sm:text-[11px]"
                >
                  Lewati
                </button>
              </div>
            </section>
          )}

          {/* PERINGATAN HARI TERAKHIR */}

          {day === 7 && (
            <section className="flex items-start gap-3 rounded-[16px] border border-[#f4e3bb] bg-[#fff5df] p-3 sm:items-center sm:p-4">
              <span className="shrink-0 text-xl">⚠️</span>

              <div>
                <p className="text-[12px] font-extrabold text-[#956b19]">
                  Hari terakhir.
                </p>

                <p className="text-[10px] leading-relaxed text-[#9a8251] sm:text-[11px]">
                  Isi catatan hari ini, lalu selesaikan eksperimen
                  untuk melihat hasilnya.
                </p>
              </div>
            </section>
          )}

          {/* CHECKLIST HARI INI */}

          <section className={`${card} space-y-3 p-3 sm:p-4 md:p-5`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <div className="min-w-0">
                <h2 className="text-[15px] font-extrabold text-[#19347e] sm:text-[16px]">
                  Checklist hari ini
                </h2>

                <p className="mt-1 text-[10px] leading-relaxed text-[#8991aa] sm:text-[11px]">
                  Isi seluruh catatan untuk menyelesaikan setiap tugas.
                  Semua kolom wajib dilengkapi.
                </p>
              </div>

              <span className="w-fit shrink-0 rounded-full bg-[#e2f7ef] px-3 py-1 text-[10px] font-extrabold text-[#16876b]">
                {done} dari 3 selesai
              </span>
            </div>

            <div className="space-y-3">
              {(d.tasks || []).map((task, index) => (
                <Task
                  key={keys[index]}
                  k={keys[index]}
                  label={task}
                  hint={d.hint || []}
                  saved={notes[keys[index]]}
                  onSave={saveNote}
                />
              ))}
            </div>
          </section>

          {/* CATATAN KEUANGAN */}

          <section className={`${card} p-3 sm:p-4 md:p-5`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <div className="min-w-0">
                <h2 className="text-[15px] font-extrabold text-[#19347e] sm:text-[16px]">
                  Catatan keuangan hari ini
                </h2>

                <p className="mt-1 text-[10px] leading-relaxed text-[#8991aa] sm:text-[11px]">
                  Isi revenue untuk melihat estimasi keuntungan, dan
                  isi biaya untuk memantau sisa biaya eksperimen.
                </p>
              </div>

              {finSaved && (
                <span className="w-fit shrink-0 rounded-full bg-[#e2f7ef] px-3 py-1 text-[10px] font-bold text-[#16876b]">
                  Tersimpan
                </span>
              )}
            </div>

            {/* PANEL BATAS BIAYA EKSPERIMEN */}

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="rounded-[14px] border border-[#e9e2f8] bg-[#faf8ff] p-3">
                <p className="text-[10px] text-[#8990aa]">
                  Batas biaya eksperimen
                </p>

                <p className="mt-1 text-[13px] font-extrabold text-[#4932a0]">
                  Rp {formatRupiah(budgetLimit)}
                </p>
              </div>

              <div className="rounded-[14px] border border-[#e9e2f8] bg-[#faf8ff] p-3">
                <p className="text-[10px] text-[#8990aa]">
                  Terpakai
                  {finSaved || costNow > 0 ? " (termasuk hari ini)" : ""}
                </p>

                <p className="mt-1 text-[13px] font-extrabold text-[#4932a0]">
                  Rp {formatRupiah(spentOtherDays + costNow)}
                </p>
              </div>

              <div
                className={`rounded-[14px] border p-3 ${
                  remainingAfterToday < 0
                    ? "border-[#f5d2dc] bg-[#fff0f5]"
                    : "border-[#d5eee2] bg-[#effaf4]"
                }`}
              >
                <p className="text-[10px] text-[#8990aa]">
                  Sisa biaya eksperimen
                </p>

                <p
                  className={`mt-1 text-[13px] font-extrabold ${
                    remainingAfterToday < 0
                      ? "text-[#d83b80]"
                      : "text-[#16866a]"
                  }`}
                >
                  {formatRupiahSigned(remainingAfterToday)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2">
              <div className="min-w-0">
                <label className="text-[11px] font-bold text-[#243b7d] sm:text-[12px]">
                  Revenue yang masuk hari ini{" "}
                  <span className="text-[#dc4383]">*</span>
                </label>

                <div className="mt-2 flex min-w-0 items-center rounded-xl border border-[#e9e4f7] bg-[#f5f3fc] px-3">
                  <span className="shrink-0 text-[12px] font-bold text-[#7250cc]">
                    Rp
                  </span>

                  <input
                    required
                    className="w-full min-w-0 border-0 bg-transparent px-2 py-3 text-[13px] font-semibold text-[#263b7c] outline-none placeholder:font-normal placeholder:text-[#9ba2bd] disabled:opacity-70"
                    type="text"
                    inputMode="numeric"
                    placeholder="Masukkan revenue"
                    disabled={Boolean(finSaved)}
                    value={formatInputRupiah(fin.revenue)}
                    onChange={(e) =>
                      setFin((old) => ({
                        ...old,
                        revenue: parseRupiah(e.target.value),
                      }))
                    }
                  />
                </div>

                <p className="mt-2 text-[10px] leading-relaxed text-[#8991aa]">
                  Estimasi keuntungan hari ini:{" "}
                  <b
                    className={
                      profitToday < 0
                        ? "text-[#d83b80]"
                        : "text-[#16866a]"
                    }
                  >
                    {formatRupiahSigned(profitToday)}
                  </b>
                  {margin > 0 && (
                    <span>
                      {" "}
                      (revenue × margin {(margin * 100).toFixed(0)}% − biaya)
                    </span>
                  )}
                </p>
              </div>

              <div className="min-w-0">
                <label className="text-[11px] font-bold text-[#243b7d] sm:text-[12px]">
                  Biaya hari ini{" "}
                  <span className="text-[#dc4383]">*</span>
                </label>

                <div
                  className={`mt-2 flex min-w-0 items-center rounded-xl border bg-[#f5f3fc] px-3 ${
                    costExceeds
                      ? "border-[#e98aa8]"
                      : "border-[#e9e4f7]"
                  }`}
                >
                  <span className="shrink-0 text-[12px] font-bold text-[#7250cc]">
                    Rp
                  </span>

                  <input
                    required
                    className="w-full min-w-0 border-0 bg-transparent px-2 py-3 text-[13px] font-semibold text-[#263b7c] outline-none placeholder:font-normal placeholder:text-[#9ba2bd] disabled:opacity-70"
                    type="text"
                    inputMode="numeric"
                    placeholder="Masukkan biaya"
                    disabled={Boolean(finSaved)}
                    value={formatInputRupiah(fin.cost)}
                    onChange={(e) =>
                      setFin((old) => ({
                        ...old,
                        cost: parseRupiah(e.target.value),
                      }))
                    }
                  />
                </div>

                {costExceeds ? (
                  <p className="mt-2 text-[10px] leading-relaxed text-[#d83b80]">
                    Biaya melebihi sisa biaya eksperimen. Maksimal hari
                    ini Rp {formatRupiah(remainingBeforeToday)}.
                  </p>
                ) : (
                  <p className="mt-2 text-[10px] leading-relaxed text-[#8991aa]">
                    Maksimal biaya hari ini Rp{" "}
                    {formatRupiah(remainingBeforeToday)}.
                  </p>
                )}
              </div>
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-[#9291a5]">
              * Revenue dan biaya wajib diisi. Jika tidak ada pemasukan
              atau biaya, masukkan angka 0.
            </p>

            <button
              type="button"
              className="mt-4 w-full rounded-full bg-gradient-to-r from-[#7045d5] to-[#5632c4] px-5 py-2.5 text-[11px] font-extrabold text-white shadow-[0_4px_12px_rgba(95,58,190,0.2)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-6"
              disabled={Boolean(finSaved) || !financeComplete}
              onClick={saveFin}
            >
              {finSaved
                ? "✓ Catatan keuangan tersimpan"
                : "▣ Simpan catatan keuangan"}
            </button>
          </section>

          {/* TOMBOL AKHIR */}

          {day === 7 ? (
            <div>
              <button
                type="button"
                className="w-full rounded-full bg-gradient-to-r from-[#7045d5] to-[#5632c4] px-4 py-3.5 text-[12px] font-extrabold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:py-4 sm:text-[14px]"
                disabled={!ready2}
                onClick={selesai}
              >
                Selesaikan eksperimen ›
              </button>

              <p className="mt-3 text-[10px] leading-relaxed text-[#9291a5] sm:text-[11px]">
                Pastikan seluruh catatan hari ketujuh sudah tersimpan
                sebelum melihat hasil eksperimen.
              </p>
            </div>
          ) : (
            <button
              type="button"
              className="text-[11px] font-extrabold text-[#d64b6d] transition hover:text-[#b82e55] sm:text-[12px]"
              onClick={() => setStop(true)}
            >
              Hentikan eksperimen
            </button>
          )}
        </div>
      </main>
      {/* POP-UP CATATAN BERHASIL */}

      {successPopup && (
        <Modal
          icon={successPopup.icon}
          title={successPopup.title}
          text={successPopup.text}
          onClose={() => setSuccessPopup(null)}
        />
      )}

      {/* POP-UP HENTIKAN EKSPERIMEN */}

      {stop && (
        <Modal
          icon="⚠️"
          title="Hentikan eksperimen?"
          text="Catatan yang sudah kamu isi tetap tersimpan. Hari yang belum dijalankan tidak akan terisi, dan eksperimen tidak bisa dilanjutkan lagi."
          onClose={() => setStop(false)}
        >
          <button
            type="button"
            onClick={() => setStop(false)}
            className="w-full rounded-full border border-violet-200 bg-white px-5 py-3 text-[12px] font-bold text-violet-700 sm:w-auto"
          >
            Lanjutkan eksperimen
          </button>

          <button
            type="button"
            onClick={hentikan}
            className="w-full rounded-full bg-gradient-to-r from-[#7045d5] to-[#5632c4] px-6 py-3 text-[12px] font-bold text-white shadow-md sm:w-auto"
          >
            Ya, hentikan
          </button>
        </Modal>
      )}

      {/* POP-UP SELESAI EKSPERIMEN */}

      {finishPopup && (
        <Modal
          icon="🎉"
          title="Selamat, eksperimen selesai!"
          text="Kamu sudah menyelesaikan seluruh catatan selama 7 hari. Kamu akan otomatis diarahkan ke halaman hasil eksperimen."
        />
      )}
    </>
  );
}