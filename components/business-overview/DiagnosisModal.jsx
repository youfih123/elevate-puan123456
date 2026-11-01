
"use client";

import Link from "next/link";
import OverviewIcon from "./OverviewIcon";

export default function DiagnosisModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#241C43]/45 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnosis-title"
        className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="diagnosis-title"
            className="font-serif text-2xl font-bold text-purple-900"
          >
            Diagnosis Bisnis
          </h2>

          <button type="button" onClick={onClose} aria-label="Tutup">
            <OverviewIcon name="close" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          Berdasarkan profil contoh, bisnis memiliki peluang untuk
          meningkatkan hubungan dengan pelanggan lama melalui
          komunikasi yang konsisten.
        </p>

        <div className="mt-5 space-y-3 rounded-2xl bg-purple-50 p-5 text-sm text-slate-700">
          <p>
            <strong>Kondisi:</strong> Status finansial masih
            menggunakan data contoh.
          </p>
          <p>
            <strong>Prioritas:</strong> Retensi pelanggan.
          </p>
          <p>
            <strong>Langkah selanjutnya:</strong> Lengkapi kondisi
            realistis dan kesiapan finansial.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/realistic-condition"
            className="rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 px-5 py-3 font-semibold text-white"
          >
            Lanjut ke Kondisi Nyata dan Kendala Usaha
          </Link>
        </div>
      </div>
    </div>
  );
}
