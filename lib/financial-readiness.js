
export const initialFinancialData = {
  period: "Bulanan",
  revenue: "",
  expenses: "",
  householdNeed: "",
  willingnessToLose: "",
  productMargin: "",
  cash: "",
  budget: "",
};

export function formatRupiah(value) {
  const number = Number(value) || 0;
  const sign = number < 0 ? "-" : "";

  return (
    sign +
    "Rp" +
    Math.round(Math.abs(number)).toLocaleString("id-ID")
  );
}

export function parseMoney(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

export function getRiskAllowancePct(history = []) {
  const completed = Array.isArray(history) ? history : [];

  if (
    completed.length >= 2 &&
    completed
      .slice(-2)
      .every((item) => Number(item.net_profit) > 0)
  ) {
    return 0.25;
  }

  if (completed.length >= 2) {
    return 0.2;
  }

  return 0.15;
}

export function calculateGrowthLevel(
  financeInput,
  financeResult,
  history = []
) {
  const completed = Array.isArray(history) ? history : [];

  const marginFilled =
    financeInput.productMargin !== "" &&
    financeInput.productMargin !== null &&
    financeInput.productMargin !== undefined;

  if (!marginFilled || completed.length < 1) {
    return 1;
  }

  const lastTwo = completed.slice(-2);

  if (
    financeResult.safeLimit >= 100000 &&
    lastTwo.length === 2 &&
    lastTwo.every(
      (item) => Number(item.net_profit ?? 0) >= 0
    )
  ) {
    return 3;
  }

  return 2;
}

export function calculateFinancial(data, history = []) {
  const period =
    data.period === "Mingguan" ? "Mingguan" : "Bulanan";

  const periodUnit =
    period === "Mingguan" ? "minggu" : "bulan";

  const required = [
    "revenue",
    "expenses",
    "householdNeed",
    "willingnessToLose",
    "productMargin",
  ];

  for (const key of required) {
    if (
      data[key] === "" ||
      data[key] === null ||
      data[key] === undefined
    ) {
      throw new Error(
        "Lengkapi seluruh data utama keuangan terlebih dahulu."
      );
    }
  }

  const revenue = parseMoney(data.revenue);
  const expenses = parseMoney(data.expenses);
  const householdNeed = parseMoney(data.householdNeed);
  const willingnessToLose = parseMoney(
    data.willingnessToLose
  );
  const productMargin = Number(data.productMargin);
  const cash = parseMoney(data.cash);
  const budget = parseMoney(data.budget);

  if (
    !Number.isFinite(productMargin) ||
    productMargin < 0 ||
    productMargin > 100
  ) {
    throw new Error(
      "Margin keuntungan produk harus antara 0% dan 100%."
    );
  }

  const netProfit = revenue - expenses;
  const disposableIncome = netProfit - householdNeed;

  const riskAllowancePct = getRiskAllowancePct(history);

  const safeLimit =
    Math.max(0, disposableIncome) * riskAllowancePct;

  const recommendedBudget = Math.min(
    safeLimit,
    willingnessToLose
  );

  const hasCash =
    data.cash !== "" &&
    data.cash !== null &&
    data.cash !== undefined;

  const hasBudget =
    data.budget !== "" &&
    data.budget !== null &&
    data.budget !== undefined;

  let statusCode = "within_range";
  let status = "Within Range";
  let statusTone = "green";

  if (disposableIncome <= 0) {
    statusCode = "not_recommended";
    status = "Belum Disarankan";
    statusTone = "red";
  } else if (
    willingnessToLose > safeLimit ||
    (hasBudget && budget > recommendedBudget) ||
    (hasBudget && hasCash && budget > cash)
  ) {
    statusCode = "above_recommended";
    status = "Perlu Kehati-hatian";
    statusTone = "yellow";
  }

  const growthLevel = calculateGrowthLevel(
    data,
    { safeLimit },
    history
  );

  const insights = [];

  if (disposableIncome <= 0) {
    insights.push(
      `Setelah biaya operasional dan kebutuhan rumah tangga selama 1 ${periodUnit} diperhitungkan, belum tersedia dana bebas yang disarankan untuk eksperimen berbayar.`
    );
  } else {
    insights.push(
      `Laba usaha per ${periodUnit} adalah ${formatRupiah(netProfit)}, dengan sisa dana bebas ${formatRupiah(disposableIncome)} setelah kebutuhan rumah tangga.`
    );
  }

  insights.push(
    `Batas aman eksperimen berdasarkan toleransi risiko ${Math.round(riskAllowancePct * 100)}% dari sisa dana bebas per ${periodUnit} adalah ${formatRupiah(safeLimit)}.`
  );

  insights.push(
    `Anggaran eksperimen yang direkomendasikan adalah ${formatRupiah(recommendedBudget)}.`
  );

  if (willingnessToLose > safeLimit) {
    insights.push(
      "Batas kerugian yang kamu pilih lebih tinggi daripada batas aman hasil perhitungan."
    );
  }

  if (hasBudget && budget > recommendedBudget) {
    insights.push(
      "Rencana anggaran eksperimen melebihi anggaran yang direkomendasikan."
    );
  }

  if (hasBudget && hasCash && budget > cash) {
    insights.push(
      "Rencana anggaran eksperimen melebihi kas tersedia."
    );
  }

  if (disposableIncome <= 0) {
    insights.push(
      "Pertimbangkan eksperimen tanpa biaya terlebih dahulu."
    );
  }

  return {
    period,
    periodUnit,
    revenue,
    expenses,
    householdNeed,
    willingnessToLose,
    productMargin,
    cash,
    budget,
    netProfit,
    disposableIncome,
    riskAllowancePct,
    safeLimit,
    recommendedBudget,
    riskAllowance: safeLimit,
    upperLimit: safeLimit,
    affordable: hasBudget
      ? budget <= recommendedBudget &&
        (!hasCash || budget <= cash)
      : null,
    status,
    statusTone,
    statusCode,
    growthLevel,
    insights,

    // Alias untuk integrasi data pipeline.
    laba_usaha: netProfit,
    sisa_bebas: disposableIncome,
    risk_allowance_pct: riskAllowancePct,
    batas_aman: safeLimit,
    recommended_budget: recommendedBudget,
  };
}
