
import Image from "next/image";

export default function OverviewHero() {
  return (
    <section className="relative grid items-center gap-6 md:grid-cols-[1fr_280px]">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-xs font-semibold text-purple-700">
          ✧ Business Overview & Insights
        </span>

        <h1 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-tight text-[#242044] sm:text-5xl">
          Gambaran Bisnismu
          <span className="block">&amp; Insight Pertumbuhan</span>
        </h1>

        <p className="mt-5 max-w-2xl leading-7 text-slate-600">
          Ringkasan kondisi bisnis, tantangan utama, dan rekomendasi
          langkah selanjutnya untuk membantu usahamu bertumbuh.
        </p>

        <p className="mt-4 text-xs font-medium text-purple-500">
          ✦ Contoh profil bisnis Dewi · Data demo
        </p>
      </div>

      <div className="flex justify-center">
        <Image
          src="/logo-penuh.jpeg"
          alt="Ilustrasi ElevatePuan"
          width={280}
          height={300}
          className="max-h-64 w-auto max-w-full object-contain"
          priority
        />
      </div>
    </section>
  );
}
