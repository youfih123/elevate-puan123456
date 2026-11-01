
"use client";

import { useState } from "react";
import Link from "next/link";
import OverviewIcon from "./OverviewIcon";
import CorrectionModal from "./CorrectionModal";
import DiagnosisModal from "./DiagnosisModal";

export default function OverviewActions() {
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [diagnosisOpen, setDiagnosisOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function regenerate() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "business-overview" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memproses permintaan.");
      }

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-purple-100 pt-6">
        <button
          type="button"
          onClick={() => setCorrectionOpen(true)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 underline decoration-pink-300 underline-offset-4 hover:text-pink-600"
        >
          <OverviewIcon name="edit" size={17} />
          Bukan ini maksud saya
        </button>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={regenerate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-800 hover:bg-purple-50 disabled:opacity-50"
          >
            <OverviewIcon name="refresh" size={17} />
            {loading ? "Memproses..." : "Generate Ulang"}
          </button>

          <button
            type="button"
            onClick={() => setDiagnosisOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            Lihat Diagnosis Lengkap
            <OverviewIcon name="arrow" size={17} />
          </button>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className="mt-5 rounded-xl bg-purple-50 p-3 text-sm text-purple-800"
        >
          {message}
        </p>
      )}

      <div className="mt-7 text-right">
        <Link
          href="/realistic-condition"
          className="text-sm font-semibold text-purple-700 hover:text-pink-600"
        >
          Lanjut ke Kondisi &amp; Kendala Usaha →
        </Link>
      </div>

      <CorrectionModal
        open={correctionOpen}
        onClose={() => setCorrectionOpen(false)}
        onSaved={setMessage}
      />

      <DiagnosisModal
        open={diagnosisOpen}
        onClose={() => setDiagnosisOpen(false)}
      />
    </>
  );
}
