
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";

const STORAGE_KEY = "elevate_realistic_condition";

const questions = [
  {
    key: "availableTime",
    label: "Berapa banyak waktu yang bisa kamu luangkan tiap minggu?",
    icon: "◷",
    options: [
      "<1 Jam/minggu",
      "1–3 Jam/minggu",
      "3–5 Jam/minggu",
      ">5 Jam/minggu"
    ],
  },
  {
    key: "teamSupport",
    label: "Tim / Pendukung",
    icon: "♧",
    options: [
      "Saya Sendiri (Solo)",
      "Dibantu Keluarga",
      "Tim Kecil",
      "Tim Lengkap",
    ],
  },
  {
    key: "digitalSkill",
    label: "Bagaimana kemampuan pemasaran digitalmu saat ini?",
    icon: "▣",
    options: [
      "Pemula",
      "Cukup Memahami",
      "Mahir",
    ],
  },
];

const initialAnswers = {
  availableTime: "",
  teamSupport: "",
  digitalSkill: "",
};

export default function RealisticConditionPage() {
  const router = useRouter();

  const [answers, setAnswers] = useState(initialAnswers);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        setAnswers({
          ...initialAnswers,
          ...parsed,
        });
      }
    } catch (err) {
      console.error("Gagal membaca data constraints:", err);
    }

    setReady(true);
  }, []);

  const answeredCount = questions.filter(
    (question) => Boolean(answers[question.key])
  ).length;

  const isComplete = answeredCount === questions.length;

  function selectAnswer(key, value) {
    const updated = {
      ...answers,
      [key]: value,
    };

    setAnswers(updated);
    setError("");

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
    } catch (err) {
      console.error("Gagal menyimpan jawaban:", err);
    }
  }

  function handleContinue() {
    if (!isComplete) {
      setError(
        "Lengkapi ketiga pertanyaan terlebih dahulu."
      );
      return;
    }

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(answers)
      );

      router.push("/opportunity-library");
    } catch (err) {
      setError(
        "Jawaban belum berhasil disimpan. Silakan coba lagi."
      );
    }
  }

  if (!ready) {
    return (
      <PageShell>
        <div className="mx-auto max-w-5xl p-8 text-center text-slate-500">
          Memuat kondisi usahamu...
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="relative mx-auto max-w-5xl px-3 py-10 sm:px-6">
        {/* Dekorasi latar belakang */}
        <div className="pointer-events-none absolute -left-16 top-36 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-8 h-64 w-64 rounded-full bg-pink-100/50 blur-3xl" />

        <main className="relative rounded-[30px] border border-purple-100 bg-white p-6 shadow-[0_16px_55px_rgba(68,36,112,0.07)] sm:p-9">
          {/* HEADER */}
          <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-bold text-pink-700">
            KONDISI REALISTIS &amp; KENDALA USAHA
          </span>

          <h1 className="mt-7 max-w-3xl font-serif text-3xl font-bold leading-tight text-[#252044] sm:text-5xl">
            Mari sesuaikan dengan realitas bisnismu.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            Strategi bisnis harus mengikuti ritme hidupmu —
            bukan sebaliknya.
          </p>

          {/* PERTANYAAN */}
          <div className="mt-9 space-y-8">
            {questions.map((question) => (
              <section key={question.key}>
                <h2 className="mb-4 flex items-center gap-3 text-sm font-bold text-[#252044] sm:text-base">
                  <span className="text-xl text-pink-500">
                    {question.icon}
                  </span>
                  {question.label}
                </h2>

                <div
                  className={`grid gap-3 ${
                    question.options.length === 4
                      ? "sm:grid-cols-4"
                      : "sm:grid-cols-3"
                  }`}
                >
                  {question.options.map((option) => {
                    const selected =
                      answers[question.key] === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          selectAnswer(
                            question.key,
                            option
                          )
                        }
                        className={`min-h-12 rounded-2xl border px-3 py-3 text-center text-sm font-medium transition-all ${
                          selected
                            ? "border-purple-400 bg-purple-50 text-purple-800 shadow-[0_0_0_1px_rgba(168,85,247,0.2)]"
                            : "border-slate-100 bg-slate-50 text-slate-600 hover:border-purple-200 hover:bg-purple-50/50"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* PEMBATAS */}
          <div className="my-9 flex items-center gap-4">
            <div className="h-px flex-1 bg-purple-100" />
            <span className="text-lg text-purple-300">
              ✧
            </span>
            <div className="h-px flex-1 bg-purple-100" />
          </div>

          {/* CONSTRAINT SNAPSHOT */}
          <section className="rounded-[25px] bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 p-5 sm:p-7">
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-2xl text-pink-600">
                ✧
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#252044]">
                  Constraint Snapshot
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Ringkasan kondisi dan keterbatasan
                  utama bisnismu saat ini.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-purple-200 bg-white/80 p-5">
              {!isComplete ? (
                <div className="py-4 text-center">
                  <p className="text-sm text-slate-500">
                    Jawab seluruh pertanyaan untuk
                    menampilkan Constraint Snapshot.
                  </p>

                  <p className="mt-2 text-sm font-bold text-purple-700">
                    {answeredCount} dari 3 pertanyaan terisi
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <SnapshotItem
                      icon="◷"
                      label="Waktu Tersedia"
                      value={answers.availableTime}
                    />

                    <SnapshotItem
                      icon="♧"
                      label="Dukungan Tim"
                      value={answers.teamSupport}
                    />

                    <SnapshotItem
                      icon="▣"
                      label="Kemampuan Digital"
                      value={answers.digitalSkill}
                    />
                  </div>

                  <div className="mt-6 flex justify-center">
                    <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                      ✓ 3 dari 3 pertanyaan terisi
                    </span>
                  </div>
                </>
              )}
            </div>
          </section>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-red-50 p-3 text-center text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* TOMBOL LANJUT */}
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!isComplete}
              className="w-full max-w-2xl rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-purple-100 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
              Simpan dan Lanjut ke Rekomendasi Strategi AI →
            </button>
          </div>
        </main>

        <p className="mt-16 text-center font-serif text-base italic text-purple-700">
          Better Decisions, Bigger Dreams ✦
        </p>
      </div>
    </PageShell>
  );
}

function SnapshotItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-xl text-pink-500">
        {icon}
      </span>

      <div>
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold text-purple-800">
          {value}
        </p>
      </div>
    </div>
  );
}
