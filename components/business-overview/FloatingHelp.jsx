
"use client";

import { useState } from "react";
import { overviewHelp } from "../../lib/business-overview";
import OverviewIcon from "./OverviewIcon";

export default function FloatingHelp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="overview-help-glow flex items-center gap-2 rounded-full border border-pink-300 bg-gradient-to-r from-pink-100 to-fuchsia-100 px-4 py-2.5 text-sm font-bold text-pink-700 transition hover:scale-105"
      >
        <span className="text-amber-500">
          <OverviewIcon name="bulb" size={21} />
        </span>
        Pahami Hasil Ini
        <span>✦</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Panduan memahami hasil"
          className="absolute right-0 top-14 z-30 w-[min(350px,85vw)] rounded-3xl border border-pink-200 bg-white p-5 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold text-purple-900">
              ✦ Panduan Singkat
            </h3>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup bantuan"
              className="text-slate-500"
            >
              <OverviewIcon name="close" size={18} />
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Penjelasan istilah dengan bahasa yang mudah dipahami.
          </p>

          <div className="mt-5 space-y-4">
            {overviewHelp.map((item) => (
              <div key={item.title}>
                <h4 className="text-sm font-bold text-purple-800">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
