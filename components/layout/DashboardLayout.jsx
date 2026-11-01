
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Sidebar from "./Sidebar";
import {
  Menu,
  ChevronDown,
  ChevronUp,
  Bell,
  UserRound,
  LogOut,
} from "lucide-react";

const pageTitles = {
  "/dashboard": "Home",
  "/financial-readiness": "Financial Readiness",
  "/experiment": "My Experiment",
  "/experiment-history": "Experiment History",
  "/growth-insights": "Growth Insights",
  "/profile": "Profile",
};

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const pathname = usePathname();

  const pageTitle = pageTitles[pathname] || "My Workspace";

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-page text-ink md:flex">
      {/* Overlay mobile */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-ink/30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          mobileMenuOpen
            ? "fixed inset-y-0 left-0 z-50 block"
            : "hidden"
        } md:sticky md:top-0 md:block md:h-screen md:shrink-0`}
      >
        <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
      </div>

      {/* Konten utama */}
      <div className="min-w-0 flex-1">
        {/* Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-white/85 px-4 backdrop-blur-md sm:px-6 md:justify-end md:px-8">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-brand transition hover:bg-brand-soft md:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifikasi: tampilan saja untuk saat ini */}
            <button
              type="button"
              aria-label="Notifikasi"
              className="relative rounded-full p-2 text-brand transition hover:bg-brand-soft"
            >
              <Bell size={20} strokeWidth={1.8} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blush" />
            </button>

            {/* Dropdown profil */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setProfileMenuOpen((previous) => !previous)
                }
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                aria-label="Menu profil pengguna"
                className="flex items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-lav-pale"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">
                  D
                </span>

                <span className="hidden sm:block">
                  <span className="block text-sm font-semibold text-ink">
                    Dinda
                  </span>
                  <span className="block text-xs text-ink-muted">
                    Pemilik UMKM
                  </span>
                </span>

                <span className="hidden text-ink-muted sm:block">
                  {profileMenuOpen ? (
                    <ChevronUp size={16} strokeWidth={1.8} />
                  ) : (
                    <ChevronDown size={16} strokeWidth={1.8} />
                  )}
                </span>
              </button>

              {profileMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-white shadow-lg"
                >
                  <div className="flex items-center gap-3 border-b border-border p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft font-bold text-brand">
                      D
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Dinda
                      </p>
                      <p className="text-xs text-ink-muted">
                        Pemilik UMKM
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-ink transition hover:bg-lav-pale hover:text-brand"
                  >
                    <UserRound size={16} strokeWidth={1.8} />
                    Profile
                  </Link>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex w-full items-center gap-3 border-t border-border px-4 py-3 text-left text-sm text-pink-ink transition hover:bg-pink-pale"
                  >
                    <LogOut size={16} strokeWidth={1.8} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Area halaman */}
        <main className="relative min-h-[calc(100vh-4rem)] p-4 sm:p-6 md:p-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-xs font-medium text-ink-muted"
          >
            <Link
              href="/dashboard"
              className="transition hover:text-brand"
            >
              Home
            </Link>

            <span className="mx-2" aria-hidden="true">
              /
            </span>

            <span aria-current="page" className="text-ink">
              {pageTitle}
            </span>
          </nav>

          {children}
        </main>
      </div>
    </div>
  );
}
