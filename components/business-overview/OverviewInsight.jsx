
import OverviewIcon from "./OverviewIcon";

export default function OverviewInsight() {
  return (
    <section
      aria-labelledby="situasi-bisnis-title"
      className="relative overflow-hidden rounded-[28px] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-violet-50 px-6 py-8 sm:px-9 sm:py-10"
    >
      {/* Aksen pastel lembut */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-pink-100/40 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
        {/* Ikon insight */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-500 sm:h-20 sm:w-20">
          <OverviewIcon name="bulb" size={34} />
        </div>

        {/* Narasi utama */}
        <div className="min-w-0 flex-1">
          <h2
            id="situasi-bisnis-title"
            className="font-serif text-2xl font-bold leading-tight text-[#45216E] sm:text-3xl"
          >
            Situasi Bisnismu Saat ini
          </h2>

          <p className="mt-5 max-w-3xl text-lg font-medium leading-[1.9] tracking-[0.01em] text-[#29214F] sm:text-[22px] sm:leading-[1.85]">
            Bisnismu saat ini menghadapi 3 tantangan utama, yaitu
            konversi penjualan yang masih rendah, pelanggan yang
            belum rutin kembali, serta jangkauan pasar yang masih
            terbatas. Fokus perbaikan pada tiga area ini dapat
            membantu penjualan lebih optimal dan bisnis lebih stabil.
          </p>

          <p className="mt-5 text-xs text-slate-500">
            Analisis ini menggunakan contoh data bisnis untuk
            kebutuhan demo ElevatePuan.
          </p>
        </div>
      </div>
    </section>
  );
}
