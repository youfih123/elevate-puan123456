"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"
import BlobBackground from "@/components/layout/BlobBackground";
import {
  Sparkles,
  Camera,
  Pencil,
  Store,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  ChevronRight,
  X,
  ShieldCheck,
  LockKeyhole,
  LogOut,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Wallet,
  Clock,
} from "lucide-react";

export default function ProfilePage() {
  // Data sementara untuk membangun UI.
  // Nantinya data ini akan diambil dari Supabase.
const [profile, setProfile] = useState({
  name: "Kak Dinda (Skincare)",
  username: "kak_dinda",
  role: "Pemilik UMKM",
  email: "dinda@example.com",
  phone: "085832864934",
  businessName: "Bisnis Skincare Kak Dinda",
  category: "Kecantikan & Personal Care",
  location: "Jakarta",
  yearStarted: "1-3 tahun",
  description:
    "Bisnis skincare yang berfokus pada treatment jerawat.",
  mainProduct: "Produk skincare",
});

const MOCK_PROFILE_DATA = {
  name: "Kak Dinda (Skincare)",
  assessment: {
    business_category: "Kecantikan & Personal Care",
    business_age: "1-3 tahun",
    location: "Jakarta",
    purchase_methods: ["Ready stock"],
    main_customers: ["Pelanggan online"],
    repeat_frequency: "Sering",
    viewer_behavior: "Banyak yang bertanya tapi sedikit yang membeli",
    sales_sources: ["Instagram", "TikTok", "Marketplace"],
    sales_trends_3m: "Naik-turun",
    order_surge: "Masih bisa menangani dengan mudah",
    operational_obstacles: ["Membalas customer"],
    biggest_challenge: "Penjualan stagnan",
    acquisition_activities: [
      "Konten Instagram",
      "Paid ads",
      "Promo / diskon",
    ],
    story_text:
      "Dinda Glow adalah brand skincare lokal yang membuat perawatan wajah jadi sederhana, aman, dan terjangkau. Kami menyediakan produk dasar seperti pembersih, serum, dan pelembap untuk membantu pelanggan merawat kulit setiap hari.",
    main_goal: "Meningkatkan penjualan",
  },
  constraints: {
    hours_per_week: "5+ jam/minggu",
    digital_skill: "sedang",
    team_size: "2-5 orang",
  },
  finance_input: {
    monthly_revenue: 12000000,
    monthly_operating_cost: 9000000,
    household_need: 1500000,
    product_margin_pct: 40,
    willingness_to_lose: 300000,
  },
  history: [
    { net_profit: 384000 },
    { net_profit: 288000 },
  ],
};


  // --- Koneksi ke database ---
  const [loading, setLoading] = useState(true); // true selama data masaih diambil
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [businessId, setBusinessId] = useState(null); // id baris bisnis, dipakai saat menyimpan nanti
  
  // Menyimpan data Financial Readiness dari Supabase.
  const [financialReadiness, setFinancialReadiness] = useState(null);

  // Mengontrol modal untuk melihat detail keuangan.
  const [isFinancialViewOpen, setIsFinancialViewOpen] = useState(false);

  // Menyimpan data Business Constraints dari Supabase.
  const [businessConstraints, setBusinessConstraints] = useState(null);

  // Mengatur apakah modal Business Constraints sedang terbuka.
  const [isConstraintsViewOpen, setIsConstraintsViewOpen] = useState(false);

  // Mengontrol modal Edit Business Constraints.
  const [isConstraintsEditOpen, setIsConstraintsEditOpen] = useState(false);

  // Menampung perubahan data sebelum disimpan.
  const [draftConstraints, setDraftConstraints] = useState({
    hours_per_week: "",
    digital_skill: "",
    team_size: "",
  });

  // Menandai proses penyimpanan.
  const [isSavingConstraints, setIsSavingConstraints] = useState(false);

  // Menampung pesan error saat penyimpanan gagal.
  const [constraintsError, setConstraintsError] = useState("");

  //useEffect buat ga pake supabase tapi pake mockup sementara
  


useEffect(() => {
  const mock = MOCK_PROFILE_DATA;

  setIsLoggedIn(true);
  setBusinessId("mock-business-001");

  setProfile((prev) => ({
    ...prev,
    name: mock.name,
    username: "kak_dinda",
    role: "Pemilik UMKM",
    email: "dinda@example.com",
    businessName: "Bisnis Skincare Kak Dinda",
    category: mock.assessment.business_category,
    location: "Jakarta",
    yearStarted: mock.assessment.business_age,
    description: mock.assessment.story_text,
    mainProduct: "Produk skincare",
  }));

  setFinancialReadiness({
    ...mock.finance_input,
  });

  setBusinessConstraints({
    ...mock.constraints,
  });

  setDraftConstraints({
    ...mock.constraints,
  });

  setLoading(false);
}, []); //Ini akhir mock up sementara itu dari useeffect

  /*// useEffect dengan [] di akhir = dijalankan SATU KALI saat halaman pertama dibuka.
  useEffect(() => {
    async function loadProfile() {
      // 1) Siapa yang sedang login?
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false); // belum login
        return;
      }
      setIsLoggedIn(true);

      // 2) Data akun dari tabel 'profiles'
      const { data: p, error: pErr } = await supabase
        .from("profiles")
        .select("full_name, business_name, email, phone")
        .eq("id", user.id)
        .single();

      // 3) Data bisnis dari tabel 'businesses'. limit(1) karena satu user bisa punya >1 baris.
      const { data: b, error: bErr } = await supabase
        .from("businesses")
        .select("id, name, category, business_age, business_type, city")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle(); // boleh kosong kalau user belum mengisi data bisnis

      // 4) Ambil Financial Readiness berdasarkan business_id.
      let financialData = null;

      if (b?.id) {
      const { data: f, error: fErr } = await supabase
        .from("financial_readiness")
        .select("*")
        .eq("business_id", b.id)
        .order("created_at", { ascending: false });

      if (fErr) {
        console.error("financial_readiness error:", fErr.message);
      }

      financialData = f?.[0] ?? null; // hasil berupa array karena data kan financial readiness diambil berkali kali
    }


      // Simpan data ke state React. 
      setFinancialReadiness(financialData);
      console.log("Financial Readiness:", financialData);
      //  ini akhir yang FINANCIAL READINESS


      // Ambil data dari SUPABASE khusus Business Constraints berdasarkan business_id. 
      let constraintsData = null;

      if (b?.id) {
            const { data: c, error: cErr } = await supabase
                .from("constraints")
                .select("*")
                .eq("business_id", b.id)
                .maybeSingle();

            if (cErr) {
                console.error("Business Constraints error:", cErr.message);
            }

            constraintsData = c;
        }

        setBusinessConstraints(constraintsData);
        console.log("Business Constraints:", constraintsData);
        // ini akhir yang BUSINESS CONSTRAIN

      if (pErr) console.error("profiles error:", pErr.message, pErr.code);
      if (bErr) console.error("businesses error:", bErr.message, bErr.code);

      setBusinessId(b?.id ?? null);

      // 5) Terjemahkan nama kolom database -> nama field yang dipakai UI.
      setProfile((prev) => ({
        ...prev,
        name: p?.full_name ?? "",
        email: p?.email ?? user.email ?? "",
        phone: p?.phone ?? "",
        businessName: b?.name ?? p?.business_name ?? "",
        category: b?.category ?? "",
        location: b?.city ?? "",
        yearStarted: b?.business_age ?? "",
        mainProduct: b?.business_type ?? "",
        description: "", // belum ada kolomnya di database
      }));
      setLoading(false);
    }

    loadProfile();
  }, []);
  // Akhir kode koneksi to supabase*/

  // Mengontrol apakah modal sedang terbuka.
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Menampung perubahan sementara sebelum pengguna menekan Save.
  const [draftProfile, setDraftProfile] = useState(profile);

  // Membuka modal dan mengisi form dengan data profil saat ini.
  const handleOpenEdit = () => {
    setDraftProfile({ ...profile });
    setIsEditOpen(true);
  };

  /*// Menyimpan perubahan profil ke database.
  // "async" karena menunggu jawaban Supabase; 
  const handleSaveProfile = async (event) => {
    event.preventDefault();*/
// handle save profile sementra mock
    const handleSaveProfile = (event) => {
  event.preventDefault();

  setProfile((prev) => ({
    ...prev,
    name: draftProfile.name.trim(),
    phone: draftProfile.phone.trim(),
  }));

  setIsEditOpen(false);
};


    /*// Siapa yang login? id-nya dipakai untuk menentukan baris mana yang diubah.
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const phone = draftProfile.phone?.trim();

    const { error } = await supabase //"await" = tunggu sampai selesai.
      .from("profiles")
      .update({
        full_name: draftProfile.name.trim(),
        // Kolom phone itu unik, jadi nomor kosong harus disimpan sebagai null, bukan "".
        phone: phone ? phone : null,
      })
      .eq("id", user.id) // hanya ubah baris milik user ini
      .select()          // minta baris hasil update supaya bisa dicek berhasil atau tidak
      .single();
    
    if (error) {
      // 23505 = melanggar kolom unik (nomor telepon sudah dipakai akun lain)
      alert(
        error.code === "23505"
          ? "Nomor telepon sudah dipakai akun lain."
          : "Gagal menyimpan. Coba lagi."
      );
      console.error(error.message, error.code);
      return;
    }

    // Perbarui tampilan setelah database berhasil menyimpan data.
    setProfile((prev) => ({
        ...prev,
        name: draftProfile.name.trim(),
        phone: phone || "",
    }));

    // Tutup modal setelah penyimpanan berhasil.
    setIsEditOpen(false);
    };*/

  // Membuka modal dengan deskripsi bisnis saat ini.
  const handleOpenBusinessEdit = () => {
    setDraftDescription(profile.description);
    setIsBusinessEditOpen(true);
    };

  // Menyimpan deskripsi bisnis yang sudah diperbarui.
  const handleSaveBusinessDescription = (event) => {
    event.preventDefault();

    setProfile((prev) => ({
        ...prev,
        description: draftDescription,
    }));

    setIsBusinessEditOpen(false);
    };

  // Membuka modal dan mengambil data bisnis saat ini.
  const handleOpenBusinessInfo = () => {
    setDraftBusinessInfo({
        businessName: profile.businessName,
        category: profile.category,
        location: profile.location,
        yearStarted: profile.yearStarted,
        mainProduct: profile.mainProduct,
  });

    setIsBusinessInfoOpen(true);
  };

  // Mengubah input informasi bisnis.
  const handleBusinessInfoChange = (event) => {
    const { name, value } = event.target;

    setDraftBusinessInfo((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  /*// Menyimpan perubahan informasi bisnis. ke tabel 'businesses'
  const handleSaveBusinessInfo = async (event) => {
    event.preventDefault();*/

    //handle save bisnis info sementara mock
    const handleSaveBusinessInfo = (event) => {
        event.preventDefault();

        setProfile((prev) => ({
            ...prev,
            ...draftBusinessInfo,
        }));

        setIsBusinessInfoOpen(false);
    };


    /*const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Kiri = nama kolom database, kanan = nilai dari form.
    const values = {
      name: draftBusinessInfo.businessName.trim(),
      category: draftBusinessInfo.category,
      city: draftBusinessInfo.location.trim(),
      business_age: String(draftBusinessInfo.yearStarted).trim(),
      business_type: draftBusinessInfo.mainProduct.trim(),
    };

    let result;
    if (businessId) {
      // Sudah punya baris bisnis -> ubah baris itu.
      result = await supabase
        .from("businesses").update(values).eq("id", businessId).select().single();
    } else {
      // Belum punya -> buat baris baru untuk user ini.
      result = await supabase
        .from("businesses").insert({ ...values, user_id: user.id }).select().single();
    }

    if (result.error) {
      alert("Gagal menyimpan. Coba lagi.");
      console.error(result.error.message, result.error.code);
      return;
    }

    setBusinessId(result.data.id); // simpan id kalau barusan dibuat
    setProfile((prev) => ({
        ...prev,
        ...draftBusinessInfo,
  }));

    setIsBusinessInfoOpen(false);
};*/

  // Mengubah nilai input sesuai field yang sedang diedit.
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDraftProfile((prev) => ({
      ...prev, // Supaya ketika informasi bisnis diperbarui, data profil lainnya seperti nama, email, dan nomor telepon tidak ikut terhapus atau tertimpa.
      [name]:  name === "username" ? value.toLowerCase() : value,
    }));
  };

  // Mengontrol modal edit deskripsi bisnis.
  const [isBusinessEditOpen, setIsBusinessEditOpen] = useState(false);

  // Menyimpan deskripsi sementara sebelum disimpan.
  const [draftDescription, setDraftDescription] = useState("");

  // Mengontrol modal edit informasi bisnis.
  const [isBusinessInfoOpen, setIsBusinessInfoOpen] = useState(false);

  // Menampung perubahan informasi bisnis sebelum disimpan.
  const [draftBusinessInfo, setDraftBusinessInfo] = useState({
    businessName: profile.businessName,
    category: profile.category,
    location: profile.location,
    yearStarted: profile.yearStarted,
    mainProduct: profile.mainProduct,
  });
  // Mengatur buka/tutup modal Change Password
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  //Menyimpan input password sementara
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Mengatur apakah password ditampilkan/ disemmbunyikan
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  //function yg mengatur peruban input password
  const handlePasswordChange = (event) => {
    const {name, value} = event.target;

    setPasswordData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };
  // function menangani form password
  const handleSavePassword = (event) => {
    event.preventDefault();

    if(passwordData.newPassword.length < 8) {
        alert("Password baru minimal 8 karakter.");
        return;
    }

    if(passwordData.newPassword !== passwordData.confirmPassword) {
        alert("Konfirmasi password tidak sesuai.");
        return;
    }
    // Belum mengubah password sungguhan.
    // Perlu dihubungkan ke Supabase Auth terlebih dahulu.
    alert("UI berhasil diuji. Fitur perubahan password akan diaktifkan setelah integrasi autentikasi.");

    setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    setIsPasswordModalOpen(false);
  };

  //MENYIMPAN PREFERENSI PENDAMPINGAN AI (JIKA TIDAK SESUAI BISA HIDE MENJAI COMMENT FULL HIGHLIGT DISINI)
  const[preferences, setPreferences] = useState({
    guidanceStyle: "step-by-step",
    experimentApproach: "small-gradual",
  });

  //Mengatur modal Business Preferences
  const[isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  //Menyimpan perubahan sementara sebelum di hapus
  const [draftPreferences, setDraftPreferences] = useState({
    guidanceStyle: "step-by-step",
    experimentApproach: "small-gradual",
  });

// Function Membuka modal dan mengambil preferensi saat ini
const handleOpenPreferences = () => {
    setDraftPreferences({ ...preferences });
    setIsPreferencesOpen(true);
};

// Function Mengatur perubahan pilihan preferensi
const handlePreferencesChange = (event) => {
    const { name, value } = event.target;

    setDraftPreferences((prev) => ({
        ...prev,
        [name]: value,
    }));
};

// Menyimpan preferensi pengguna
const handleSavePreferences = (event) => {
    event.preventDefault();

    setPreferences({ ...draftPreferences });
    setIsPreferencesOpen(false);
};
// KALO GA KEPAKE COMMENT SAMPE SINI

// Menyimpan perubahan Business Constraints ke Supabase.
const handleSaveConstraints = async () => {
    setIsSavingConstraints(true);
    setConstraintsError("");

    // Pastikan bisnis memiliki ID.
    if (!businessId) {
        setConstraintsError("Data bisnis tidak ditemukan.");
        setIsSavingConstraints(false);
        return;
    }

    // Pastikan input wajib sudah diisi.
    if (
        draftConstraints.hours_per_week === "" ||
        draftConstraints.digital_skill === "" ||
        draftConstraints.team_size === ""
    ) {
        setConstraintsError("Semua informasi wajib diisi.");
        setIsSavingConstraints(false);
        return;
    }

    // Siapkan data untuk dikirim ke Supabase.
    const constraintsPayload = {
        business_id: businessId,
        hours_per_week: Number(draftConstraints.hours_per_week),
        digital_skill: draftConstraints.digital_skill,
        team_size: Number(draftConstraints.team_size),
    };

    // Update record lama atau insert record baru.
    const query = businessConstraints?.id
        ? supabase
              .from("constraints")
              .update(constraintsPayload)
              .eq("id", businessConstraints.id)
        : supabase
              .from("constraints")
              .insert(constraintsPayload);

    const { data, error } = await query
        .select()
        .single();

    if (error) {
        console.error("Save Constraints error:", error.message);
        setConstraintsError("Gagal menyimpan data. Silakan coba lagi.");
        setIsSavingConstraints(false);
        return;
    }

    // Perbarui data di halaman tanpa perlu reload.
    setBusinessConstraints(data);
    setIsConstraintsEditOpen(false);
    setIsSavingConstraints(false);
}; //AKHIR SIMPAN PERUBAHAN CONSTRAINT TO SUPABASE

// Mengubah angka menjadi format mata uang Rupiah.
const formatRupiah = (value) => {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
};



  // Tahan tampilan sampai data siap, supaya tidak berkedip dari data contoh.
  // ketika login loadig dulu prepare buat langsung masuk ke profile page
  // hook (useState, useEffect) tidak boleh dilewati oleh return lebih awal
  if (loading) {
    return (
        <p className="text-sm text-ink-muted">Memuat profil...</p>
    );
  }

  // Belum login: arahkan ke halaman login.
  if (!isLoggedIn) {
    return (
        <p className="text-sm text-ink-muted">
          Kamu belum login.{" "}
          <Link href="/login" className="font-semibold text-brand underline">
            Masuk di sini
          </Link>
        </p>
    );
  }

  return (
    <>
     <BlobBackground/>
      <div className="mx-auto max-w-6xl space-y-8">

        {/* HEADER PROFILE */}
        <section>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brand shadow-sm">
            <Sparkles className="h-4 w-4 text-pink-ink" />
            My Account
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-brand">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Kelola informasi pribadi dan profil bisnis kamu untuk
            membantu Elevate Puan memberikan pendampingan yang lebih relevan.
          </p>
        </section>

        {/* PROFILE IDENTITY CARD */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">

          {/* Dekorasi gradasi di background kartu */}
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-brand-soft opacity-70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-blush-soft opacity-60 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* Avatar pengguna */}
            <div className="relative mx-auto sm:mx-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-brand-soft text-3xl font-bold text-brand shadow-md">
                {profile.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
              </div>

              {/* Tombol ganti foto */}
              <button
                type="button"
                aria-label="Ganti foto profil"
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-cta-to text-white shadow-md transition hover:scale-105"
              >
                <Camera size={16} />
              </button>
            </div>

            {/* Informasi singkat pengguna */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="text-2xl font-bold text-brand">
                  {profile.name}
                </h2>

                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
                  Business Owner
                </span>
              </div>

              <p className="mt-1 text-sm text-ink-muted">{profile.email}</p>

              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-ink-muted sm:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <Store size={14} className="text-pink-ink" />
                  {profile.businessName}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-pink-ink" />
                  {profile.location}
                </span>
              </div>
            </div>

            {/* Tombol edit profil */}
            <button
              type="button"
              onClick={handleOpenEdit}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-lav-pale"
            >
              <Pencil size={15} />
              Edit Profile
            </button>

          </div>
        </section>

        {/* BUSINESS SUMMARY */}
        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h2 className="text-xl font-bold text-brand">
                    Business Overview
                </h2>

                <p className="mt-1 text-sm text-ink-muted">
                Informasi singkat mengenai bisnis yang sedang kamu kembangkan.
                </p>
            </div>

            <button
                type="button"
                onClick={handleOpenBusinessInfo}
                className="inline-flex items-center gap-2 rounded-xl border border-brand bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-lav-pale"
            >
                <Pencil size={15} />
                Edit Information
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Business Category */}
            <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <BriefcaseBusiness size={19} />
              </div>

              <p className="text-xs font-medium text-ink-muted">
                Business Category
              </p>

              <p className="mt-2 font-semibold text-brand">
                {profile.category}
              </p>
            </article>

            {/* Business Started */}
            <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff5c7] text-amber-700">
                <CalendarDays size={19} />
              </div>

              <p className="text-xs font-medium text-ink-muted">
                Business Age
              </p>

              <p className="mt-2 font-semibold text-brand">
                {profile.yearStarted}
              </p>
            </article>

            {/* Main Product */}
            <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blush-soft text-pink-ink">
                <Store size={19} />
              </div>

              <p className="text-xs font-medium text-ink-muted">
                Business Type
              </p>

              <p className="mt-2 font-semibold text-brand">
                {profile.mainProduct}
              </p>
            </article>

            {/* Business Location */}
            <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5ff] text-sky-700">
                    <MapPin size={19} />
                </div>

                <p className="text-xs font-medium text-ink-muted">
                    Business Location
                </p>

                <p className="mt-2 font-semibold text-brand">
                    {profile.location || "-"}
                </p>
            </article>

          </div>
        </section>

        {/* BUSINESS DESCRIPTION */}
        <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-bold text-brand">
              About My Business
            </h2>

            <button
              type="button"
              onClick={handleOpenBusinessEdit}
              className="text-sm font-semibold text-brand hover:text-pink-ink"
            >
              Edit <ChevronRight className="inline h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-sm leading-7 text-ink-muted">
            {profile.description}
          </p>
        </section>

        {/* BUSINESS CONDITIONS */}
        <section>
        {/* Section heading */}
        <div className="mb-6">
            <h2 className="text-xl font-bold text-brand">
                Business Conditions
            </h2>

            <p className="mt-1 text-sm text-ink-muted">
                Kenali kondisi keuangan dan keterbatasan bisnismu
                sebelum menentukan strategi pertumbuhan.
            </p>
        </div>

        {/* Condition cards */}
        <div className="grid gap-4 lg:grid-cols-2">

            {/* Financial Readiness Card */}
            <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Wallet size={20} />
                </div>

                <h3 className="font-bold text-brand">
                    Financial Readiness
                </h3>

                <p className="mt-2 text-sm leading-6 text-ink-muted">
                    Informasi mengenai kondisi keuangan dan kemampuan
                    bisnismu dalam mengalokasikan anggaran eksperimen.
                </p>

            <div className="mt-5 flex justify-end">
                <button
                    type="button"
                    onClick={() => setIsFinancialViewOpen(true)}
                    className="text-sm font-semibold text-brand transition hover:text-pink-ink"
                >
                    View Details
                    <ChevronRight className="ml-1 inline h-4 w-4" />
                </button>
            </div>
            </article>

            {/* Business Constraints Card */}
            <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blush-soft text-pink-ink">
                    <Clock size={20} />
                </div>

                <h3 className="font-bold text-brand">
                    Business Constraints
                </h3>

                <p className="mt-2 text-sm leading-6 text-ink-muted">
                    Informasi mengenai keterbatasan waktu, kemampuan
                    digital, dan kapasitas tim dalam menjalankan eksperimen.
                </p>

                <div className="mt-5 flex justify-end">
                    <button
                    type="button"
                    onClick={() => setIsConstraintsViewOpen(true)}
                    className="text-sm font-semibold text-brand transition hover:text-pink-ink"
                    >
                    View Details
                    <ChevronRight className="ml-1 inline h-4 w-4" />
                    </button>
                </div>
            </article>

        </div>
        </section>

        {/* MODAL EDIT PROFILE */}
        {isEditOpen && (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setIsEditOpen(false)}
        >
            {/* Kontainer modal */}
            <div
            className="w-full max-w-lg rounded-3xl border border-border bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
            >
            {/* Header modal */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                <h2 className="text-xl font-bold text-brand">
                    Edit Profile
                </h2>

                <p className="mt-1 text-sm text-ink-muted">
                    Perbarui informasi pribadi kamu.
                </p>
                </div>

                <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                aria-label="Tutup modal"
                className="rounded-full p-2 text-ink-muted transition hover:bg-lav-pale hover:text-brand"
                >
                <X size={20} />
                </button>
            </div>

            {/* Form edit profil */}
            <form onSubmit={handleSaveProfile} className="space-y-5">

                {/* Nama lengkap */}
                <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-brand"
                >
                    Full Name
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={draftProfile.name}
                    onChange={handleInputChange}
                    required
                    minLength={3}
                    maxLength={100}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
                </div>

                {/* Email */}
                <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-brand"
                >
                    Email Address
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={draftProfile.email}
                    readOnly
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
                </div>

                {/* Nomor telepon */}
                <div>
                <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-brand"
                >
                    Phone Number
                </label>

                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={draftProfile.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
                </div>

                {/* Tombol aksi */}
                <div className="flex justify-end gap-3 border-t border-border pt-5">
                <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                    Save Changes
                </button>
                </div>

            </form>
            </div>
        </div>
        )}
        
    {/* HIDE INI KALO GA KEPAKE */}
        {/* BUSINESS PREFERENCES 
        <div className="mt-6 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">*/}

            {/* Header 
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-pale text-pink-ink">
                    <SlidersHorizontal size={22} />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-brand">
                        Business Preferences
                    </h2>
                    <p className="text-sm text-ink-muted">
                        Personalize your AI guidance experience.
                    </p>
                </div>
            </div>

            <div className="space-y-5"> */}

                {/* Guidance Style Preview 
                <div>
                    <p className="text-sm font-semibold text-gray-800">
                        Preferred Guidance Style
                    </p>

                    <p className="mt-1 text-sm text-ink-muted">
                        {preferences.guidanceStyle === "step-by-step"
                            ? "Step-by-step guidance"
                            : preferences.guidanceStyle === "practical-examples"
                            ? "Practical examples"
                            : "Simple checklist"}
                    </p>
                </div>

                <div className="border-t border-border" />*/}

                {/* Experiment Approach Preview 
                <div>
                    <p className="text-sm font-semibold text-gray-800">
                        Preferred Experiment Approach
                    </p>

                    <p className="mt-1 text-sm text-ink-muted">
                        {preferences.experimentApproach === "small-gradual"
                            ? "Small & gradual"
                            : preferences.experimentApproach === "short-term"
                            ? "Short-term results"
                            : "Flexible approach"}
                    </p>
                </div>*/}

                {/* Edit Button 
                <div className="flex justify-end border-t border-border pt-5">
                    <button
                        type="button"
                        onClick={handleOpenPreferences}
                        className="rounded-xl border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-lav-pale"
                    >
                        Edit Preferences
                    </button>
                </div>
            </div>
        </div>*/}
        {/* HIDE SAMPE SINI KALO GA KEPAKE */}

        {/* ACCOUNT & SECURITY */}
        <div className="mt-6 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">

            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0efff] text-brand">
                    <ShieldCheck size={22} />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-brand">
                        Account & Security
                    </h2>
                    <p className="text-sm text-ink-muted">
                        Manage your account and security settings.
                    </p>
                </div>
            </div>

            <div className="space-y-5">

                {/* Account Email */}
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            Account Email
                        </p>
                        <p className="mt-1 text-sm text-ink-muted">
                            {profile.email}
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        Active
                    </span>
                </div>

                <div className="border-t border-border" />

                {/* Password */}
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            Password
                        </p>
                        <p className="mt-1 text-sm text-ink-muted">
                            Update your account password.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="flex items-center gap-2 self-start rounded-xl border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-lav-pale"
                    >
                        <LockKeyhole size={16} />
                        Change Password
                    </button>
                </div>

                <div className="border-t border-border" />

                {/* Sign Out */}
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            Sign Out
                        </p>
                        <p className="mt-1 text-sm text-ink-muted">
                            Sign out from your current account.
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled
                        title="Sign out will be enabled after authentication integration."
                        className="flex cursor-not-allowed items-center gap-2 self-start rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-400 opacity-70"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>

            </div>
        </div>

        {/* MODAL EDIT ABOUT MY BUSINESS */}
        {isBusinessEditOpen && (
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                onClick={() => setIsBusinessEditOpen(false)}
            >
                <div
                className="w-full max-w-lg rounded-3xl border border-border bg-white p-6 shadow-2xl sm:p-8"
                onClick={(event) => event.stopPropagation()}
                >
                {/* Header modal */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                    <h2 className="text-xl font-bold text-brand">
                        Edit About My Business
                    </h2>

                    <p className="mt-1 text-sm text-ink-muted">
                        Ceritakan bisnis yang sedang kamu kembangkan.
                    </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsBusinessEditOpen(false)}
                        aria-label="Tutup modal"
                        className="rounded-full p-2 text-ink-muted transition hover:bg-lav-pale hover:text-brand"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form deskripsi bisnis */}
                <form
                    onSubmit={handleSaveBusinessDescription}
                    className="space-y-5"
                >
                    <div>
                        <label
                            htmlFor="businessDescription"
                            className="mb-2 block text-sm font-semibold text-brand"
                        >
                            Business Description
                        </label>

                        <textarea
                            id="businessDescription"
                            value={draftDescription}
                            onChange={(event) =>
                            setDraftDescription(event.target.value)
                            }
                            rows={5}
                            maxLength={500}
                            required
                            placeholder="Ceritakan tentang bisnis kamu..."
                            className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />

                        <p className="mt-2 text-right text-xs text-ink-muted">
                            {draftDescription.length}/500 karakter
                        </p>
                    </div>

                    {/* Tombol aksi */}
                    <div className="flex justify-end gap-3 border-t border-border pt-5">
                        <button
                            type="button"
                            onClick={() => setIsBusinessEditOpen(false)}
                            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
                </div>
            </div>
            )}

            {/* MODAL EDIT BUSINESS INFORMATION */}
            {isBusinessInfoOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                    onClick={() => setIsBusinessInfoOpen(false)}
                >
                    <div
                        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-white p-6 shadow-2xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                    {/* Header modal */}
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-brand">
                                Edit Business Information
                            </h2>

                            <p className="mt-1 text-sm text-ink-muted">
                                Perbarui informasi dasar bisnis kamu.
                            </p>
                        </div>

                    <button
                        type="button"
                        onClick={() => setIsBusinessInfoOpen(false)}
                        aria-label="Tutup modal"
                        className="rounded-full p-2 text-ink-muted transition hover:bg-lav-pale hover:text-brand"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSaveBusinessInfo} className="space-y-5">

                    {/* Nama bisnis */}
                    <div>
                        <label
                            htmlFor="businessName"
                            className="mb-2 block text-sm font-semibold text-brand"
                        >
                            Business Name
                        </label>

                        <input
                            id="businessName"
                            name="businessName"
                            type="text"
                            value={draftBusinessInfo.businessName}
                            onChange={handleBusinessInfoChange}
                            required
                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                    </div>

                    {/* Kategori bisnis */}
                    <div>
                        <label
                            htmlFor="category"
                            className="mb-2 block text-sm font-semibold text-brand"
                        >
                            Business Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={draftBusinessInfo.category}
                            onChange={handleBusinessInfoChange}
                            required
                            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                        >
                            <option value="Fashion & Apparel">Fashion & Apparel</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                            <option value="Crafts & Handmade">Crafts & Handmade</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Services">Services</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Lokasi bisnis */}
                    <div>
                        <label
                            htmlFor="location"
                            className="mb-2 block text-sm font-semibold text-brand"
                        >
                            City
                        </label>

                        <input
                            id="location"
                            name="location"
                            type="text"
                            value={draftBusinessInfo.location}
                            onChange={handleBusinessInfoChange}
                            required
                            placeholder="Contoh: Bandung"
                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                    </div>

                    {/* Tahun berdiri */}
                    <div>
                        <label
                            htmlFor="yearStarted"
                            className="mb-2 block text-sm font-semibold text-brand"
                        >
                            Business Age
                        </label>

                        <input
                            id="yearStarted"
                            name="yearStarted"
                            type="text"
                            value={draftBusinessInfo.yearStarted}
                            onChange={handleBusinessInfoChange}
                            required
                            placeholder="1-3 tahun"
                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                    </div>

                    {/* Produk utama */}
                    <div>
                        <label
                            htmlFor="mainProduct"
                            className="mb-2 block text-sm font-semibold text-brand"
                        >
                            Business Type
                        </label>

                        <input
                            id="mainProduct"
                            name="mainProduct"
                            type="text"
                            value={draftBusinessInfo.mainProduct}
                            onChange={handleBusinessInfoChange}
                            required
                            placeholder="Contoh: Produk"
                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                    </div>

                    {/* Tombol aksi */}
                    <div className="flex justify-end gap-3 border-t border-border pt-5">
                        <button
                            type="button"
                            onClick={() => setIsBusinessInfoOpen(false)}
                            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
                </div>
            </div>
            )}
            {/* MODAL CHANGE PASSWORD */}
            {isPasswordModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                    onClick={() => setIsPasswordModalOpen(false)}
                >
                    <div
                        className="w-full max-w-lg rounded-3xl border border-border bg-white p-6 shadow-2xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >

                        {/* Header */}
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-brand">
                                    Change Password
                                </h2>
                                <p className="mt-1 text-sm text-ink-muted">
                                    Create a new password for your account.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsPasswordModalOpen(false)}
                                className="rounded-full p-2 text-ink-muted transition hover:bg-lav-pale"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSavePassword} className="space-y-5">

                            {/* Current Password */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand">
                                    Current Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPasswords.current ? "text" : "password"}
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        placeholder="Enter current password"
                                        className="w-full rounded-xl border border-border px-4 py-3 pr-12 text-sm outline-none focus:border-brand"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords((prev) => ({
                                            ...prev,
                                            current: !prev.current,
                                        }))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
                                        aria-label="Toggle current password visibility"
                                    >
                                        {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand">
                                    New Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPasswords.new ? "text" : "password"}
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength={8}
                                        placeholder="Enter new password"
                                        className="w-full rounded-xl border border-border px-4 py-3 pr-12 text-sm outline-none focus:border-brand"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords((prev) => ({
                                            ...prev,
                                            new: !prev.new,
                                        }))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
                                        aria-label="Toggle new password visibility"
                                    >
                                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                <p className="mt-1 text-xs text-ink-muted">
                                    Minimum 8 characters.
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand">
                                    Confirm New Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPasswords.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        placeholder="Confirm new password"
                                        className="w-full rounded-xl border border-border px-4 py-3 pr-12 text-sm outline-none focus:border-brand"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords((prev) => ({
                                            ...prev,
                                            confirm: !prev.confirm,
                                        }))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 border-t border-border pt-5">
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordModalOpen(false)}
                                    className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-ink-muted hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                                >
                                    Save Changes
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
            
            {/* HIDE INI KALO GA KEPAKE */}
            {/* MODAL BUSINESS PREFERENCES */}
            {isPreferencesOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                    onClick={() => setIsPreferencesOpen(false)}
                >
                    <div
                        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-brand">
                                    Edit Business Preferences
                                </h2>
                                <p className="mt-1 text-sm text-ink-muted">
                                    Customize how you receive AI guidance.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsPreferencesOpen(false)}
                                aria-label="Close modal"
                                className="rounded-full p-2 text-ink-muted hover:bg-lav-pale"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSavePreferences} className="space-y-5">

                            {/* Guidance Style */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand">
                                    Preferred Guidance Style
                                </label>

                                <select
                                    name="guidanceStyle"
                                    value={draftPreferences.guidanceStyle}
                                    onChange={handlePreferencesChange}
                                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                                >
                                    <option value="step-by-step">
                                        Step-by-step guidance
                                    </option>
                                    <option value="practical-examples">
                                        Practical examples
                                    </option>
                                    <option value="simple-checklist">
                                        Simple checklist
                                    </option>
                                </select>
                            </div>

                            {/* Experiment Approach */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand">
                                    Preferred Experiment Approach
                                </label>

                                <select
                                    name="experimentApproach"
                                    value={draftPreferences.experimentApproach}
                                    onChange={handlePreferencesChange}
                                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                                >
                                    <option value="small-gradual">
                                        Small & gradual
                                    </option>
                                    <option value="short-term">
                                        Short-term results
                                    </option>
                                    <option value="flexible">
                                        Flexible approach
                                    </option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 border-t border-border pt-5">
                                <button
                                    type="button"
                                    onClick={() => setIsPreferencesOpen(false)}
                                    className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-ink-muted hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                                >
                                    Save Preferences
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
            {/* HIDE SAMPE SINI KALO GA KEPAKE */}

            {/* Modal View Financial Readiness */}
            {isFinancialViewOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setIsFinancialViewOpen(false)}
                >
                    <div
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-brand">
                                    Financial Readiness
                                </h2>
                                <p className="mt-1 text-sm text-ink-muted">
                                    Ringkasan kondisi keuangan bisnismu.
                                </p>

                                {financialReadiness?.created_at && (
                                    <p className="mt-2 text-xs text-ink-muted">
                                        Terakhir diperbarui:{" "}
                                        {new Date(financialReadiness.created_at).toLocaleDateString(
                                            "id-ID",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsFinancialViewOpen(false)}
                                className="rounded-lg p-2 text-ink-muted transition hover:bg-gray-100"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        {financialReadiness ? (
                            <div className="space-y-4">
                                <div className="rounded-xl bg-[#f7f6ff] p-4">
                                    <p className="text-sm text-ink-muted">
                                        Monthly Revenue
                                    </p>
                                    <p className="mt-1 font-semibold text-brand">
                                        {formatRupiah(financialReadiness.monthly_revenue)}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#f7f6ff] p-4">
                                    <p className="text-sm text-ink-muted">
                                        Monthly Operating Cost
                                    </p>
                                    <p className="mt-1 font-semibold text-brand">
                                        {formatRupiah(financialReadiness.monthly_operating_co)}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#f7f6ff] p-4">
                                    <p className="text-sm text-ink-muted">
                                        Household Need
                                    </p>
                                    <p className="mt-1 font-semibold text-brand">
                                        {formatRupiah(financialReadiness.household_need)}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#f7f6ff] p-4">
                                    <p className="text-sm text-ink-muted">
                                        Product Margin
                                    </p>
                                    <p className="mt-1 font-semibold text-brand">
                                        {financialReadiness.product_margin_pct ?? "-"}%
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-border p-6 text-center">
                                <Wallet
                                    size={32}
                                    className="mx-auto mb-3 text-brand"
                                />
                                <p className="font-semibold text-brand">
                                    Financial Readiness belum tersedia
                                </p>
                                <p className="mt-2 text-sm leading-6 text-ink-muted">
                                    Data kondisi keuangan bisnismu akan muncul di sini
                                    setelah kamu menyelesaikan dan menyimpan Financial
                                    Readiness.
                                </p>
                            </div>
                        )}


                        {/* Modal Footer */}
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsFinancialViewOpen(false)}
                                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* AKHIR MODAL VIEW FINANCE READINESS */}

            {/* MODAL VIEW BUSINESS CONSTRAINTS */}
            {isConstraintsViewOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setIsConstraintsViewOpen(false)}
                >
                    <div
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-brand">
                                    Business Constraints
                                </h2>
                                <p className="mt-1 text-sm text-ink-muted">
                                    Ringkasan keterbatasan operasional bisnismu.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsConstraintsViewOpen(false)}
                                className="rounded-lg p-2 text-ink-muted transition hover:bg-gray-100"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        {businessConstraints ? (
                            <div className="space-y-4">
                                <div className="rounded-xl bg-[#fff5f8] p-4">
                                    <p className="text-sm text-ink-muted">
                                        Available Time per Week
                                    </p>
                                    <p className="mt-1 font-semibold text-brand">
                                        {businessConstraints.hours_per_week ?? "-"} jam
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#fff5f8] p-4">
                                    <p className="text-sm text-ink-muted">
                                        Digital Skill
                                    </p>
                                    <p className="mt-1 font-semibold text-brand">
                                        {businessConstraints.digital_skill || "-"}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#fff5f8] p-4">
                                    <p className="text-sm text-ink-muted">
                                        Team Size
                                    </p>
                                    <p className="mt-1 font-semibold text-brand">
                                        {businessConstraints.team_size ?? "-"} orang
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-border p-6 text-center">
                                <Clock
                                    size={32}
                                    className="mx-auto mb-3 text-pink-ink"
                                />
                                <p className="font-semibold text-brand">
                                    Business Constraints belum tersedia
                                </p>
                                <p className="mt-2 text-sm leading-6 text-ink-muted">
                                    Data keterbatasan bisnismu akan muncul di sini
                                    setelah kamu menyelesaikan dan menyimpan Business
                                    Constraints.
                                </p>
                            </div>
                        )}

                        {/* Modal Footer */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setDraftConstraints({
                                        hours_per_week: businessConstraints?.hours_per_week ?? "",
                                        digital_skill: businessConstraints?.digital_skill ?? "",
                                        team_size: businessConstraints?.team_size ?? "",
                                    });

                                    setConstraintsError("");
                                    setIsConstraintsViewOpen(false);
                                    setIsConstraintsEditOpen(true);
                                }}
                                className="rounded-xl border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-[#fff5f8]"
                            >
                                Edit Details
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsConstraintsViewOpen(false)}
                                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* AKHIR MODAL VIEW BUSINESS CONSTRAINTS */}

            {/* Modal EDIT Business Constraints */}
            {isConstraintsEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

                        {/* Modal Header */}
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-brand">
                                Edit Business Constraints
                            </h2>
                            <p className="mt-1 text-sm text-ink-muted">
                                Sesuaikan informasi dengan kondisi bisnismu saat ini.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-5">

                            {/* Available Time */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand">
                                    Available Time per Week
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={draftConstraints.hours_per_week}
                                    onChange={(e) =>
                                        setDraftConstraints({
                                            ...draftConstraints,
                                            hours_per_week: e.target.value,
                                        })
                                    }
                                    placeholder="Contoh: 20"
                                    className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
                                />

                                <p className="mt-1 text-xs text-ink-muted">
                                    Berapa jam per minggu yang bisa dialokasikan untuk bisnis?
                                </p>
                            </div>

                            {/* Digital Skill */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand">
                                    Digital Skill
                                </label>

                                <select
                                    value={draftConstraints.digital_skill}
                                    onChange={(e) =>
                                        setDraftConstraints({
                                            ...draftConstraints,
                                            digital_skill: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                                >
                                    <option value="">Pilih kemampuan digital</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Team Size */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand">
                                    Team Size
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    value={draftConstraints.team_size}
                                    onChange={(e) =>
                                        setDraftConstraints({
                                            ...draftConstraints,
                                            team_size: e.target.value,
                                        })
                                    }
                                    placeholder="Contoh: 3"
                                    className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
                                />

                                <p className="mt-1 text-xs text-ink-muted">
                                    Jumlah orang yang terlibat dalam menjalankan bisnis.
                                </p>
                            </div>
                        </div>

                        {/* Error Message */}
                        {constraintsError && (
                            <p className="mt-4 text-sm text-red-500">
                                {constraintsError}
                            </p>
                        )}

                        {/* Modal Footer */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsConstraintsEditOpen(false)}
                                disabled={isSavingConstraints}
                                className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-ink-muted"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSaveConstraints}
                                disabled={isSavingConstraints}
                                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                            >
                                {isSavingConstraints ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* AKHIR Modal EDIT Business Constraints */}

      </div>
    </>
  );
}
