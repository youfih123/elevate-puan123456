const toOptions = (pairs) => pairs.map(([value, label]) => ({ value, label }));

export const assessmentUi = {
  infoTitle: "Kenapa kami tanya ini?",
  autosave: "Jawabanmu tersimpan otomatis",
  selectPlaceholder: "Pilih salah satu",
  multiHint: "Boleh pilih lebih dari satu",
  back: "Kembali",
  saveExit: "Simpan & keluar",
};

export const storyBox = {
  title: "Ruang curhat",
  badge: "Boleh dilewati",
  description:
    "Ini bukan formulir. Ceritain aja dengan kata-katamu sendiri: apa yang sebenarnya lagi kamu rasain soal bisnismu sekarang?",
  placeholder:
    "Contoh: Aku udah capek posting tiap hari, banyak yang lihat tapi pesanan nggak naik-naik, dan aku bingung harus mulai dari mana...",
  voiceTitle: "Lebih enak ngomong?",
  voiceHint: "Tekan tombol, lalu ceritakan langsung",
};

export const assessmentSteps = [
  {
    key: "profil",
    label: "Profil usaha",
    title: "Profil usaha",
    subtitle: "Langkah 1 dari 4. Sekitar 1 menit. Semua pertanyaan wajib dijawab.",
    why: "Jenis usaha dan lama berjalan menentukan saran yang cocok. Usaha yang baru mulai perlu menguji ide dulu, usaha yang sudah lama perlu cara untuk berkembang.",
    next: "Lanjut ke Pelanggan",
    questions: [
      {
        id: "business_category",
        label: "Jenis usaha kamu kategori apa?",
        type: "select",
        options: toOptions([
          ["kuliner", "Kuliner & Makanan"],
          ["fashion", "Fashion & Aksesoris"],
          ["kerajinan", "Kerajinan & Craft"],
          ["jasa", "Jasa"],
          ["kecantikan", "Kecantikan & Personal Care"],
        ]),
      },
      {
        id: "business_age",
        label: "Usaha ini udah jalan berapa lama?",
        type: "select",
        options: toOptions([
          ["lt_6m", "Baru mulai (kurang dari 6 bulan)"],
          ["6_12m", "6–12 bulan"],
          ["1_3y", "1–3 tahun"],
          ["3_5y", "3–5 tahun"],
          ["gt_5y", "Lebih dari 5 tahun"],
        ]),
      },
      {
        id: "purchase_methods",
        label: "Bagaimana biasanya pelanggan membeli dari kamu?",
        type: "chips",
        options: toOptions([
          ["pre_order", "Pre-order"],
          ["ready_stock", "Ready stock"],
          ["custom_order", "Pesanan custom"],
          ["subscription_repeat", "Langganan / repeat order"],
          ["reseller", "Reseller"],
          ["direct_offline", "Penjualan langsung / offline"],
        ]),
      },
    ],
  },
  {
    key: "pelanggan",
    label: "Pelanggan",
    title: "Pelanggan",
    subtitle: "Langkah 2 dari 4. Sekitar 2 menit. Semua pertanyaan wajib dijawab.",
    why: "Cara pelanggan menemukan dan membeli dari kamu menunjukkan di mana peluang terbesar usahamu.",
    next: "Lanjut ke Operasional",
    questions: [
      {
        id: "main_customers",
        label: "Siapa pelanggan utamamu saat ini?",
        type: "chips",
        options: toOptions([
          ["friends_family", "Teman & keluarga"],
          ["neighbors_local", "Tetangga / pelanggan lokal"],
          ["online_customers", "Pelanggan online"],
          ["subscribers", "Pelanggan langganan"],
          ["reseller", "Reseller"],
          ["business_org", "Bisnis / organisasi"],
        ]),
      },
      {
        id: "repeat_frequency",
        label: "Seberapa sering pelanggan membeli kembali?",
        type: "select",
        options: toOptions([
          ["almost_always", "Hampir selalu"],
          ["often", "Sering"],
          ["sometimes", "Kadang-kadang"],
          ["rarely", "Jarang"],
          ["no_data", "Belum punya cukup data"],
        ]),
      },
      {
        id: "viewer_behavior",
        label: "Saat ini, apa yang paling sering terjadi setelah seseorang melihat produkmu?",
        type: "select",
        options: toOptions([
          ["buy_directly", "Langsung membeli"],
          ["ask_then_some_buy", "Bertanya dulu lalu sebagian membeli"],
          ["many_ask_few_buy", "Banyak yang bertanya tapi sedikit yang membeli"],
          ["many_view_few_ask", "Banyak yang melihat tapi jarang bertanya"],
          ["unknown", "Tidak tahu"],
        ]),
      },
      {
        id: "sales_sources",
        label: "Dari mana sebagian besar penjualanmu datang?",
        type: "chips",
        exclusive: ["unknown"],
        options: toOptions([
          ["whatsapp", "WhatsApp"],
          ["instagram", "Instagram"],
          ["tiktok", "TikTok"],
          ["marketplace", "Marketplace"],
          ["offline_store", "Toko / offline"],
          ["referral", "Rekomendasi pelanggan"],
          ["reseller", "Reseller"],
          ["unknown", "Belum tahu"],
        ]),
      },
      {
        id: "sales_trend_3m",
        label: "Dalam 3 bulan terakhir, penjualanmu cenderung bagaimana?",
        type: "select",
        options: toOptions([
          ["increasing", "Meningkat"],
          ["stable", "Relatif stabil"],
          ["decreasing", "Menurun"],
          ["fluctuating", "Naik-turun / tidak menentu"],
          ["unknown", "Belum tahu"],
        ]),
      },
    ],
  },
  {
    key: "operasional",
    label: "Operasional",
    title: "Operasional",
    subtitle: "Langkah 3 dari 4. Sekitar 1 menit. Semua pertanyaan wajib dijawab.",
    why: "Kami ingin saran promosi yang masih bisa kamu jalankan, jadi kami perlu tahu seberapa kuat waktu dan tenagamu saat ini.",
    next: "Lanjut ke Tantangan",
    questions: [
      {
        id: "order_surge",
        label: "Kalau pesanan tiba-tiba meningkat, apa yang biasanya terjadi?",
        type: "select",
        options: toOptions([
          ["easy", "Masih bisa menangani dengan mudah"],
          ["fairly_safe", "Masih cukup aman"],
          ["starting_overwhelmed", "Mulai kewalahan"],
          ["often_overwhelmed", "Sering kewalahan"],
          ["never_surged", "Belum pernah mengalami lonjakan order"],
        ]),
      },
      {
        id: "operational_obstacles",
        label: "Apa yang paling sering menjadi kendala saat menjalankan pesanan?",
        type: "chips",
        exclusive: ["none"],
        options: toOptions([
          ["time", "Waktu"],
          ["labor", "Tenaga"],
          ["raw_materials", "Bahan baku"],
          ["stock", "Stok"],
          ["production", "Produksi"],
          ["shipping", "Pengiriman"],
          ["packaging", "Packaging"],
          ["customer_reply", "Membalas customer"],
          ["none", "Tidak ada kendala khusus"],
        ]),
      },
    ],
  },
  {
    key: "tantangan",
    label: "Tantangan",
    title: "Tantangan saat ini",
    subtitle: "Langkah 4 dari 4. Sekitar 2 menit. Ruang curhat di bagian bawah boleh dilewati.",
    why: "Tantangan terbesarmu jadi pusat dari saran yang kamu terima. Ceritamu sendiri melengkapi jawaban pilihan tadi, jadi sarannya terasa lebih pas.",
    next: "Lihat hasil diagnosis",
    hasStory: true,
    questions: [
      {
        id: "biggest_challenge",
        label: "Apa tantangan terbesar bisnismu saat ini?",
        type: "select",
        options: toOptions([
          ["hard_new_customers", "Sulit mendapatkan pelanggan baru"],
          ["view_not_buy", "Banyak yang melihat tapi sedikit yang membeli"],
          ["customers_not_return", "Pelanggan lama jarang kembali"],
          ["stagnant_sales", "Penjualan stagnan"],
          ["unsure_promo_strategy", "Bingung memilih strategi promosi"],
          ["inconsistent_promo", "Sulit menjaga konsistensi promosi"],
          ["operations_overwhelmed", "Operasional mulai kewalahan"],
          ["hard_finances", "Sulit mengatur keuangan"],
          ["unsure_next_step", "Sulit menentukan langkah berikutnya"],
        ]),
      },
      {
        id: "acquisition_activities",
        label: "Apa yang biasanya kamu lakukan untuk mendapatkan pelanggan?",
        type: "chips",
        exclusive: ["never_tried"],
        options: toOptions([
          ["post_product", "Posting produk"],
          ["whatsapp_story", "Story WhatsApp"],
          ["instagram_content", "Konten Instagram"],
          ["tiktok_content", "Konten TikTok"],
          ["promo_discount", "Promo / diskon"],
          ["paid_ads", "Paid ads"],
          ["referral", "Referral"],
          ["influencer", "KOL / influencer"],
          ["bazaar_event", "Bazaar / offline event"],
          ["change_packaging", "Mengubah packaging"],
          ["add_product", "Menambah produk"],
          ["never_tried", "Belum pernah mencoba strategi khusus"],
        ]),
      },
      {
        id: "main_goal",
        label: "Kalau bisa memperbaiki satu hal dalam bisnismu saat ini, apa yang paling ingin kamu ubah?",
        type: "select",
        options: toOptions([
          ["more_customers", "Mendapatkan lebih banyak pelanggan"],
          ["increase_sales", "Meningkatkan penjualan"],
          ["repeat_orders", "Membuat pelanggan lebih sering membeli kembali"],
          ["expand_market", "Memperluas pemasaran / menjangkau pasar baru"],
          ["brand_awareness", "Membuat bisnis lebih dikenal"],
          ["tidy_management", "Mengelola bisnis dengan lebih rapi"],
          ["save_time_energy", "Menghemat waktu dan tenaga"],
          ["increase_profit", "Meningkatkan keuntungan"],
          ["increase_capacity", "Menambah kapasitas produksi"],
          ["start_online", "Mulai berjualan secara online"],
        ]),
      },
    ],
  },
];

export const voiceText = {
  listeningTitle: "Sedang mendengarkan...",
  listeningHint: "Ceritakan saja, tekan tombol lagi untuk berhenti",
  unsupported:
    "Browser ini belum mendukung input suara. Coba Chrome atau Edge, atau ketik saja.",
  errors: {
    "not-allowed":
      "Izin mikrofon ditolak. Aktifkan izin mikrofon di pengaturan browser, lalu coba lagi.",
    "service-not-allowed":
      "Izin mikrofon ditolak. Aktifkan izin mikrofon di pengaturan browser, lalu coba lagi.",
    "no-speech":
      "Suaramu belum terdengar. Coba lagi dan bicara lebih dekat ke mikrofon.",
    "audio-capture": "Mikrofon tidak ditemukan. Periksa mikrofon di perangkatmu.",
    network: "Input suara butuh koneksi internet. Coba lagi setelah terhubung.",
    default: "Input suara terhenti. Coba lagi atau ketik saja.",
  },
};