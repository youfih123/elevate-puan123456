
import {
  Sparkles,
  ShieldCheck,
  BookOpen,
  Lightbulb,
  TrendingUp,
} from "lucide-react";


import ExperimentAnalysis from "./ExperimentAnalysis";
import RecommendationCard from "./RecommendationCard";





 // DATA DEMO — KAK DINDA (SKINCARE)
 // Seluruh data tambahan merupakan simulasi untuk kebutuhan demo.
 // Nanti akan diganti dengan data dari backend dan AI.

const businessAnalysis = {
  headline:
    "Bisnis mulai menemukan pendekatan penjualan yang lebih efektif, tetapi konversi pelanggan masih perlu diperkuat.",

  description:
    "Dari empat eksperimen yang telah diselesaikan, paket bundling dan penggunaan template balasan customer menunjukkan hasil positif. Sementara itu, konten edukasi Instagram menghasilkan interaksi tetapi belum memberikan dampak penjualan yang kuat, dan paid ads dengan diskon belum memenuhi ekspektasi. Bisnis memiliki basis pelanggan yang cukup potensial dengan frekuensi pembelian ulang yang tinggi. Namun, banyak calon pelanggan masih berhenti pada tahap bertanya dan belum melanjutkan pembelian. Fokus berikutnya adalah memperbaiki tindak lanjut pelanggan, membantu mereka memahami kebutuhan produknya, dan mendorong pembelian ulang.",

  highlights: [
    "Paket bundling menghasilkan revenue tercatat tertinggi sebesar Rp1.450.000.",
    "Template balasan customer menunjukkan hasil positif dengan revenue tercatat Rp1.200.000.",
    "Banyak calon pelanggan bertanya tetapi belum melanjutkan pembelian.",
    "Pencatatan Daily Check-in mencapai 73% selama periode simulasi.",
  ],
};


const diagnosis = {
  worked: [
    {
      title: "Paket bundling skincare",
      description:
        "Eksperimen menunjukkan hasil positif. Penawaran beberapa produk dalam satu paket memberikan nilai pembelian yang lebih jelas bagi pelanggan.",
      change: "Rp1.450.000 revenue tercatat",
    },
    {
      title: "Template balasan customer",
      description:
        "Penggunaan template komunikasi yang lebih terstruktur membantu proses menjawab pertanyaan pelanggan dan menunjukkan hasil positif dalam evaluasi eksperimen.",
      change: "Rp1.200.000 revenue tercatat",
    },
  ],

  didNotWork: [
    {
      title: "Paid ads dengan promo diskon",
      description:
        "Eksperimen belum memenuhi ekspektasi. Revenue tetap tercatat, tetapi hasil evaluasi menunjukkan bahwa pendekatan promosi ini belum memberikan hasil sesuai tujuan eksperimen.",
      change: "Rp1.100.000 revenue tercatat",
    },
    {
      title: "Konten edukasi Instagram",
      description:
        "Konten memperoleh interaksi, tetapi dampaknya terhadap pembelian masih terbatas. Eksperimen dikategorikan sebagai Learning, sehingga pendekatan ini masih dapat dikembangkan.",
      change: "Rp850.000 revenue tercatat",
    },
  ],

  possibleCauses: [
    {
      title: "Calon pelanggan belum mendapatkan tindak lanjut yang cukup",
      description:
        "Sebagian pelanggan mungkin sudah menunjukkan ketertarikan, tetapi belum mendapatkan follow-up yang membantu mereka menyelesaikan keraguan sebelum membeli.",
    },
    {
      title: "Informasi produk belum sepenuhnya menjawab kebutuhan pelanggan",
      description:
        "Pelanggan skincare memiliki kebutuhan dan permasalahan kulit yang berbeda. Informasi produk yang terlalu umum mungkin belum cukup membantu mereka menentukan pilihan.",
    },
    {
      title: "Promosi belum tentu sesuai dengan alasan pelanggan membeli",
      description:
        "Diskon dapat menarik perhatian, tetapi belum tentu menjawab kebutuhan, kekhawatiran, atau pertimbangan pelanggan sebelum melakukan transaksi.",
    },
  ],
};


const learnings = [
  {
    title: "Proses follow-up merupakan peluang untuk meningkatkan konversi",
    description:
      "Banyak calon pelanggan sudah menunjukkan ketertarikan dengan bertanya. Tindak lanjut yang tepat dapat membantu mereka memahami produk dan mengambil keputusan pembelian.",
  },
  {
    title: "Pelanggan membutuhkan informasi yang sesuai dengan kondisi kulitnya",
    description:
      "Dalam bisnis skincare, informasi mengenai manfaat, cara penggunaan, dan kecocokan produk dapat membantu pelanggan merasa lebih yakin sebelum membeli.",
  },
  {
    title: "Pelanggan lama memiliki potensi untuk meningkatkan penjualan",
    description:
      "Frekuensi pembelian ulang yang dilaporkan tinggi menunjukkan bahwa pelanggan yang sudah pernah membeli merupakan kelompok yang penting untuk dipertahankan.",
  },
  {
    title: "Keberhasilan promosi tidak hanya diukur dari ketertarikan",
    description:
      "Interaksi dan pertanyaan pelanggan perlu dievaluasi bersama hasil transaksi untuk mengetahui apakah aktivitas pemasaran benar-benar membantu penjualan.",
  },
];


const recommendations = [
  {
    number: "01",
    strategy: "Perbaiki",
    title: "Buat Sistem Follow-up Calon Pelanggan",
    reason:
      "Banyak calon pelanggan bertanya tetapi belum melakukan pembelian. Sistem follow-up sederhana dapat membantu tim menindaklanjuti pelanggan yang masih mempertimbangkan produk tanpa harus menghubungi mereka secara acak.",

    hypothesis:
      "Jika calon pelanggan yang belum membeli mendapatkan tindak lanjut yang relevan dalam 24 jam setelah bertanya, maka lebih banyak calon pelanggan berpotensi melanjutkan transaksi.",

    businessAspects: [
      "Penjualan",
      "Pelanggan",
      "Customer Service",
    ],
  },

  {
    number: "02",
    strategy: "Coba",
    title: "Sediakan Konsultasi Rekomendasi Produk Skincare",
    reason:
      "Pelanggan memiliki kebutuhan kulit yang berbeda. Memberikan panduan pemilihan produk berdasarkan kebutuhan mereka dapat membantu mengurangi keraguan sebelum membeli.",

    hypothesis:
      "Jika pelanggan mendapatkan rekomendasi produk berdasarkan kebutuhan dan permasalahan kulitnya, maka mereka akan lebih mudah memahami manfaat produk dan menentukan pilihan pembelian.",

    businessAspects: [
      "Produk",
      "Pelanggan",
      "Penjualan",
    ],
  },

  {
    number: "03",
    strategy: "Lanjutkan",
    title: "Buat Pengingat Pembelian Ulang untuk Pelanggan Lama",
    reason:
      "Pelanggan Kak Dinda dilaporkan cukup sering melakukan pembelian ulang. Pengingat pembelian yang disesuaikan dengan perkiraan masa penggunaan produk dapat membantu menjaga hubungan dengan pelanggan lama.",

    hypothesis:
      "Jika pelanggan lama mendapatkan pengingat pembelian ulang pada waktu yang relevan, maka peluang terjadinya transaksi berulang dapat meningkat.",

    businessAspects: [
      "Retensi Pelanggan",
      "Penjualan",
      "Customer Relationship",
    ],
  },
];


export default function AILearningInsights() {
  return (
    <section className="space-y-6">


      {/* 1. Overall Business Analysis */}
      <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-lav-pale p-3">
            <Sparkles size={22} className="text-brand" />
          </div>


          <div>
            <p className="type-micro uppercase tracking-wider text-brand">
              AI Business Analysis
            </p>
            <h3 className="type-h2 text-ink-title">
              {businessAnalysis.headline}
            </h3>
          </div>
        </div>


        <p className="type-body mt-5 text-ink-muted">
          {businessAnalysis.description}
        </p>


        <div className="mt-5 rounded-xl bg-lav-pale/60 p-4">
          <p className="type-body font-semibold text-ink-title">
            Hal yang perlu diperhatikan
          </p>


          <ul className="mt-3 space-y-3">
            {businessAnalysis.highlights.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-1 text-brand">•</span>
                <span className="type-body text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* 2. Performance Diagnosis */}
      <div className="space-y-4">
        <div>
          <h3 className="type-h2 text-ink-title">
            Performance Diagnosis
          </h3>
          <p className="type-caption mt-1 text-ink-muted">
            Memahami apa yang berhasil, apa yang perlu diperbaiki,
            dan kemungkinan penyebabnya.
          </p>
        </div>


        <ExperimentAnalysis
          worked={diagnosis.worked}
          didNotWork={diagnosis.didNotWork}
          possibleCauses={diagnosis.possibleCauses}
        />
      </div>


      {/* 3. Evidence and Confidence */}
      <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-mint-soft p-3">
            <ShieldCheck size={22} className="text-emerald-700" />
          </div>


          <div>
            <h3 className="type-h2 text-ink-title">
              Evidence & Confidence
            </h3>
            <p className="type-caption text-ink-muted">
              Seberapa lengkap bukti yang mendukung analisis ini?
            </p>
          </div>
        </div>


        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-lav-pale/60 p-4">
            <p className="type-caption text-ink-muted">
              Evidence Available
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-title">
              8 Experiments
            </p>
            <p className="type-caption mt-1 text-ink-muted">
              Contoh data eksperimen yang telah dievaluasi.
            </p>
          </div>


          <div className="rounded-xl bg-sun-soft p-4">
            <p className="type-caption text-ink-muted">
              Evidence Confidence
            </p>
            <p className="mt-1 text-2xl font-bold text-honey-ink">
              Moderate
            </p>
            <p className="type-caption mt-1 text-ink-muted">
              Bukti tersedia, tetapi pencatatan belum lengkap.
            </p>
          </div>
        </div>


        <p className="type-caption mt-4 text-ink-muted">
          Analisis ini merupakan interpretasi dari data yang tersedia,
          bukan jaminan hasil bisnis di masa depan.
        </p>
      </div>


      {/* 4. Key Business Learnings */}
      <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-sun-soft p-3">
            <BookOpen size={22} className="text-honey-ink" />
          </div>


          <div>
            <h3 className="type-h2 text-ink-title">
              Key Business Learnings
            </h3>
            <p className="type-caption text-ink-muted">
              Pelajaran penting yang bisa kamu ambil dari perjalanan eksperimen.
            </p>
          </div>
        </div>


        <div className="mt-5 space-y-4">
          {learnings.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lav-pale text-sm font-semibold text-brand">
                {index + 1}
              </div>


              <div>
                <p className="type-body font-semibold text-ink-title">
                  {item.title}
                </p>
                <p className="type-body mt-1 text-ink-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* 5. Recommended Next Steps */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-pale p-3">
            <Lightbulb size={22} className="text-pink-ink" />
          </div>


          <div>
            <h3 className="type-h2 text-ink-title">
              Recommended Next Steps
            </h3>
            <p className="type-caption text-ink-muted">
              Rekomendasi strategi berdasarkan hasil dan pembelajaran eksperimen.
            </p>
          </div>
        </div>


        <div className="space-y-4">
          {recommendations.map((item) => (
            <RecommendationCard key={item.number} {...item} />
          ))}
        </div>
      </div>


      {/* Demo disclaimer */}
      <div className="flex gap-3 rounded-xl border border-lav-line bg-lav-pale/40 p-4">
        <TrendingUp size={19} className="mt-0.5 shrink-0 text-brand" />
        <p className="type-caption text-ink-muted">
          Insight dan rekomendasi ini masih menggunakan data simulasi
          untuk kebutuhan demo. Hasil analisis sesungguhnya akan
          menyesuaikan data bisnis dan eksperimen pengguna.
        </p>
      </div>


    </section>
  );
}




