
"use client";

import { useEffect, useState, useCallback } from "react";

const KEY = "ep_experiment";

const empty = {
  status: "idle",
  startDate: null,
  day: 1,
  notes: {},
  finance: {},
  final: null,
};

export function useExperiment() {
  const [s, setS] = useState(empty);
  const [ready, setReady] = useState(false);

  // =====================================
  // MEMBACA DATA DARI LOCAL STORAGE
  // =====================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (
          parsed &&
          typeof parsed === "object" &&
          !Array.isArray(parsed)
        ) {
          setS({
            ...empty,
            ...parsed,

            day: Math.min(
              7,
              Math.max(1, Number(parsed.day) || 1)
            ),

            notes:
              parsed.notes &&
              typeof parsed.notes === "object" &&
              !Array.isArray(parsed.notes)
                ? parsed.notes
                : {},

            finance:
              parsed.finance &&
              typeof parsed.finance === "object" &&
              !Array.isArray(parsed.finance)
                ? parsed.finance
                : {},
          });
        }
      }
    } catch (error) {
      console.error(
        "Gagal membaca data eksperimen:",
        error
      );
    }

    setReady(true);
  }, []);

  // =====================================
  // MENYIMPAN DATA SETIAP ADA PERUBAHAN
  // =====================================

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(
        KEY,
        JSON.stringify(s)
      );
    } catch (error) {
      console.error(
        "Gagal menyimpan data eksperimen:",
        error
      );
    }
  }, [s, ready]);

  // =====================================
  // FUNGSI UPDATE DATA
  // =====================================

  const update = useCallback((fn) => {
    setS((previous) => {
      const next =
        typeof fn === "function"
          ? fn(previous)
          : {
              ...previous,
              ...fn,
            };

      if (!next || typeof next !== "object") {
        return previous;
      }

      return next;
    });
  }, []);

  return {
    s,
    ready,
    update,
  };
}
