
"use client";

import { useState } from "react";
import OverviewIcon from "./OverviewIcon";

export default function CorrectionModal({
  open,
  onClose,
  onSaved,
}) {
  const [category, setCategory] = useState("rekomendasi");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, note }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim masukan.");
      }

      onSaved(data.message);
      setNote("");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#241C43]/45 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="correction-title"
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="correction-title"
              className="font-serif text-2xl font-bold text-purple-900"
            >
              Bantu Kami Memahami Bisnismu
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Beri tahu sistem bagian mana yang perlu diperbaiki.
            </p>
          </div>

          <button type="button" onClick={onClose} aria-label="Tutup">
            <OverviewIcon name="close" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="correction-category"
              className="text-sm font-semibold text-slate-800"
            >
              Bagian yang kurang sesuai
            </label>

            <select
              id="correction-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-xl border border-purple-200 bg-white p-3 text-slate-900"
            >
              <option value="finansial">Status finansial</option>
              <option value="confidence">Confidence level</option>
              <option value="rekomendasi">Rekomendasi strategi</option>
              <option value="lainnya">Bagian lainnya</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="correction-note"
              className="text-sm font-semibold text-slate-800"
            >
              Apa yang seharusnya ditampilkan?
            </label>

            <textarea
              id="correction-note"
              rows={4}
              required
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Contoh: usaha saya belum memiliki pelanggan tetap..."
              className="mt-2 w-full resize-y rounded-xl border border-purple-200 bg-white p-3 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-purple-200 px-5 py-3 text-purple-800"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim Koreksi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
