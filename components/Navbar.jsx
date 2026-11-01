
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="relative z-40 border-b border-purple-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo ElevatePuan */}
        <Link href="/business-overview" aria-label="Beranda ElevatePuan">
          <Image
            src="/logo-penuh.jpeg"
            alt="ElevatePuan"
            width={160}
            height={160}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Hanya menu Home */}
        <nav aria-label="Navigasi utama">
          <Link
            href="/home"
            className="rounded-full bg-pink-50 px-5 py-2 text-sm font-semibold text-purple-800 transition hover:bg-pink-100"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
