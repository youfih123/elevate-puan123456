// Data contoh, bentuknya mengikuti tabel experiments/experiment_checkins. Nanti diganti data dari API.
export const business = { owner: "Dewi", name: "Dewi's Sweet Kitchen" };
export const experiment = {
  title: "Sapa Kembali 10 Pelanggan Lama", category: "Retensi pelanggan",
  hypothesis: "Jika pelanggan lama menerima pesan personal yang relevan, maka sebagian dari mereka akan membeli lagi.",
  target: 100000, budgetLimit: 50000, baseline: 350000,
  risk: "Risiko: pelanggan tidak membalas atau pesan terasa seperti spam. Dasar metode: playbook pb-003, diperiksa anggota tim sebelum dipakai.",
  template: "Halo Kak [Nama]! Aku Dewi dari Dewi's Sweet Kitchen. Minggu ini kami baru panggang varian rasa terbaru. Khusus pelanggan setia, ada tester gratis kalau Kakak pesan minggu ini. Kabari aku ya kalau tertarik.",
  success: [["Berhasil", "tambahan omzet Rp100.000 atau lebih.", "bg-emerald-50 text-emerald-700"],
    ["Ada sinyal", "tambahan omzet di bawah Rp100.000", "bg-amber-50 text-amber-700"],
    ["Perlu dipikir ulang", "belum ada tambahan omzet", "bg-pink-50 text-pink-600"]],
  learnWorked: ["Pesan yang menyebut nama dan kue favorit lebih cepat dibalas.", "Sebagian pelanggan lama membeli lagi dengan biaya kecil."],
  learnNot: ["Tidak semua pelanggan merespons."],
};
export const days = [
  { title: "Pilih pelanggan", focus: "H1: pilih 10 pelanggan lama yang pernah beli nastar atau hampers",
    tasks: ["Pilih 10 pelanggan lama yang pernah beli nastar atau hampers", "Siapkan daftar nomor WhatsApp mereka", "Baca dan sesuaikan template pesan dari AI"],
    hint: ["10 pelanggan sudah kupilih dari buku pesanan.", "beberapa nomor pelanggan tidak tersimpan di HP."] },
  { title: "Kirim ke 5 pelanggan pertama", focus: "H2: kirim WhatsApp ke 5 pelanggan pertama",
    tasks: ["Pilih 5 pelanggan pertama dari daftar", "Kirim WhatsApp ke 5 pelanggan pertama", "Catat siapa yang sudah membaca atau membalas"],
    hint: ["5 pesan terkirim, 3 sudah dibaca, 1 membalas.", "satu pelanggan sulit dihubungi."] },
  { title: "Kirim ke 5 pelanggan berikutnya", focus: "H3: kirim WhatsApp ke 5 pelanggan berikutnya, catat respons",
    tasks: ["Pilih 5 pelanggan berikutnya dari daftar", "Kirim WhatsApp ke 5 pelanggan berikutnya", "Catat pelanggan yang membalas"],
    hint: ["5 pesan terkirim, 3 sudah dibaca, 1 membalas.", "satu pelanggan sulit dihubungi."] },
  { title: "Follow-up yang sudah membalas", focus: "H4: follow-up pelanggan yang sudah membalas, catat order",
    tasks: ["Balas pelanggan yang sudah merespons", "Tawarkan tester atau varian rasa terbaru", "Catat order yang masuk"],
    hint: ["dua pelanggan sudah kubalas satu per satu.", "satu pelanggan belum menjawab."] },
  { title: "Follow-up yang belum membalas", focus: "H5: follow-up pelanggan yang belum membalas, catat order",
    tasks: ["Pilih pelanggan yang belum membalas", "Kirim pesan singkat yang santai", "Catat respons dan order yang masuk"],
    hint: ["3 pelanggan kuingatkan lagi.", "pelanggan belum membuka pesan."] },
  { title: "Tindak lanjut yang tertarik", focus: "H6: tindak lanjuti pelanggan yang tertarik tapi belum memesan, catat order",
    tasks: ["Hubungi pelanggan yang tertarik tapi belum memesan", "Siapkan pesanan yang sudah pasti", "Catat order yang masuk"],
    hint: ["dua pelanggan kuhubungi lagi.", "stok kemasan hampir habis."] },
  { title: "Rekap dan refleksi", focus: "H7: rekap order dan omzet, tulis refleksi, lalu selesaikan eksperimen",
    tasks: ["Hitung total order dan omzet selama 7 hari", "Cek kembali catatan hari 1 sampai 6", "Tulis catatan terakhirmu"],
    hint: ["total ada 3 order dari 10 pelanggan.", "ada hari yang lupa dicatat."] },
];
export const rp = (n) => "Rp" + Number(n || 0).toLocaleString("id-ID");
