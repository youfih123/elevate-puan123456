
"use client";

import { useState } from "react";
import FinanceIcon from "./FinanceIcon";
import {
  formatRupiah,
  parseMoney,
} from "../../lib/financial-readiness";

const SMALL_AMOUNT_LIMIT = 10000;

export default function FinancialForm({
  data,
  onChange,
  onReset,
  onCalculate,
  loading,
}) {
  const [confirmedAmounts, setConfirmedAmounts] =
    useState({});

  const isWeekly = data.period === "Mingguan";
  const periodUnit = isWeekly ? "minggu" : "bulan";
  const periodLabel = isWeekly ? "Minggu" : "Bulan";

  const moneyFields = [
    {
      key: "revenue",
      label: "Total Pendapatan Usaha",
      description: `Total omzet usaha dalam 1 ${periodUnit}.`,
      example: isWeekly
        ? "Contoh: 1.250.000"
        : "Contoh: 5.000.000",
    },
    {
      key: "expenses",
      label: "Total Biaya Operasional",
      description: `Biaya menjalankan usaha dalam 1 ${periodUnit}.`,
      example: isWeekly
        ? "Contoh: 750.000"
        : "Contoh: 3.000.000",
    },
    {
      key: "householdNeed",
      label: `Kebutuhan Rumah Tangga per ${periodLabel}`,
      description: `Dana kebutuhan rumah tangga selama 1 ${periodUnit}.`,
      example: isWeekly
        ? "Contoh: 250.000"
        : "Contoh: 1.000.000",
    },
    {
      key: "willingnessToLose",
      label: "Batas Kerugian yang Bersedia Ditanggung",
      description:
        "Jumlah maksimal kerugian yang bersedia kamu tanggung untuk satu eksperimen.",
      example: "Contoh: 100.000",
    },
    {
      key: "cash",
      label: "Kas Tersedia (Saldo)",
      description:
        "Jumlah saldo usaha yang tersedia saat ini.",
      example: "Contoh: 1.200.000",
    },
    {
      key: "budget",
      label: "Rencana Anggaran Eksperimen",
      description:
        "Total biaya yang direncanakan untuk satu eksperimen.",
      example: "Contoh: 100.000",
    },
  ];

  function isSmallAmount(value) {
    return (
      value !== "" &&
      value !== null &&
      value !== undefined &&
      parseMoney(value) < SMALL_AMOUNT_LIMIT
    );
  }

  function isConfirmed(key) {
    return (
      confirmedAmounts[key] !== undefined &&
      confirmedAmounts[key] === String(data[key])
    );
  }

  function needsConfirmation(key) {
    return (
      isSmallAmount(data[key]) &&
      !isConfirmed(key)
    );
  }

  const pendingConfirmations = moneyFields.filter(
    (field) => needsConfirmation(field.key)
  );

  function handleMoneyChange(key, rawValue) {
    const digits = rawValue.replace(/\D/g, "");

    setConfirmedAmounts((previous) => ({
      ...previous,
      [key]: undefined,
    }));

    onChange(key, digits);
  }

  function handlePeriodChange(value) {
    setConfirmedAmounts({});
    onChange("period", value);
  }

  function handleReset() {
    setConfirmedAmounts({});
    onReset();
  }

  function confirmAmount(key) {
    setConfirmedAmounts((previous) => ({
      ...previous,
      [key]: String(data[key]),
    }));
  }

  function displayMoney(value) {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return parseMoney(value).toLocaleString("id-ID");
  }

  return (
    <section className="rounded-[26px] border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
          <FinanceIcon name="document" size={26} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-purple-900">
            Data Keuangan Bisnismu Saat Ini
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Lengkapi data keuangan untuk menghitung
            kesiapan finansial usahamu.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid items-center gap-2 sm:grid-cols-[1fr_1.2fr]">
          <label
            htmlFor="finance-period"
            className="text-sm font-medium text-slate-800"
          >
            Periode Analisis
          </label>

          <select
            id="finance-period"
            value={data.period || "Bulanan"}
            onChange={(e) =>
              handlePeriodChange(e.target.value)
            }
            className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-purple-400"
          >
            <option value="Bulanan">Bulanan</option>
            <option value="Mingguan">Mingguan</option>
          </select>
        </div>

        <p className="rounded-xl bg-purple-50/60 px-4 py-3 text-xs leading-5 text-purple-800">
          Masukkan pendapatan, biaya operasional, dan
          kebutuhan rumah tangga untuk periode{" "}
          <strong>{data.period || "Bulanan"}</strong>.
        </p>

        {moneyFields.map((field) => (
          <div
            key={field.key}
            className="grid items-start gap-2 sm:grid-cols-[1fr_1.2fr]"
          >
            <div>
              <label
                htmlFor={`finance-${field.key}`}
                className="text-sm font-medium text-slate-800"
              >
                {field.label}
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {field.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex overflow-hidden rounded-xl border border-purple-200 bg-white focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100">
                <span className="flex items-center border-r border-purple-100 bg-purple-50/50 px-3 text-sm font-semibold text-purple-800">
                  Rp
                </span>

                <input
                  id={`finance-${field.key}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={displayMoney(data[field.key])}
                  onChange={(e) =>
                    handleMoneyChange(
                      field.key,
                      e.target.value
                    )
                  }
                  placeholder={field.example}
                  aria-describedby={
                    needsConfirmation(field.key)
                      ? `warning-${field.key}`
                      : undefined
                  }
                  className="min-w-0 w-full bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </div>

              {needsConfirmation(field.key) && (
                <div
                  id={`warning-${field.key}`}
                  role="alert"
                  className="rounded-xl border border-amber-200 bg-amber-50/80 p-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-amber-700">
                      <FinanceIcon name="info" size={18} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-amber-900">
                        Yakin nominalnya sudah benar?
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-800">
                        Kamu memasukkan{" "}
                        {formatRupiah(
                          parseMoney(data[field.key])
                        )}
                        . Pastikan tidak ada angka yang
                        tersalah input.
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            document
                              .getElementById(
                                `finance-${field.key}`
                              )
                              ?.focus();
                          }}
                          className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100"
                        >
                          Periksa Lagi
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            confirmAmount(field.key)
                          }
                          className="rounded-lg bg-amber-700 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-800"
                        >
                          Ya, Sudah Benar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isSmallAmount(data[field.key]) &&
                isConfirmed(field.key) && (
                  <p className="text-xs font-medium text-emerald-700">
                    ✓ Nominal sudah dikonfirmasi.
                  </p>
                )}
            </div>
          </div>
        ))}

        <div className="grid items-start gap-2 sm:grid-cols-[1fr_1.2fr]">
          <div>
            <label
              htmlFor="finance-productMargin"
              className="text-sm font-medium text-slate-800"
            >
              Margin Keuntungan Produk
            </label>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Persentase keuntungan dari harga jual
              setelah dikurangi biaya pokok produk.
            </p>
          </div>

          <div className="flex overflow-hidden rounded-xl border border-purple-200 bg-white focus-within:border-purple-400">
            <input
              id="finance-productMargin"
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="0.1"
              value={data.productMargin ?? ""}
              onChange={(e) =>
                onChange(
                  "productMargin",
                  e.target.value
                )
              }
              placeholder="Contoh: 40"
              className="min-w-0 w-full bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />

            <span className="flex items-center border-l border-purple-100 bg-purple-50/50 px-4 font-semibold text-purple-800">
              %
            </span>
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Semua nominal menggunakan Rupiah.
        Contoh: {formatRupiah(3500000)}.
      </p>

      {pendingConfirmations.length > 0 && (
        <p className="mt-3 text-xs leading-5 text-amber-700">
          Konfirmasi nominal yang ditandai terlebih
          dahulu sebelum menghitung kesiapan.
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center gap-2 rounded-xl border border-pink-300 bg-white px-4 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
        >
          <FinanceIcon name="refresh" size={19} />
          Reset
        </button>

        <button
          type="button"
          onClick={onCalculate}
          disabled={
            loading || pendingConfirmations.length > 0
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FinanceIcon name="calculator" size={19} />
          {loading
            ? "Menghitung..."
            : "Hitung Kesiapan"}
        </button>
      </div>
    </section>
  );
}
