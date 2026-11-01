"use client";


import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  House,
  Wallet,
  FlaskConical,
  History,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";


const menuItems = [
  { label: "Home", href: "/dashboard", icon: House },
  {
    label: "Financial Readiness",
    href: "/financial-readiness",
    icon: Wallet,
  },
  {
    label: "My Experiment",
    href: "/experiment",
    icon: FlaskConical,
  },
  {
    label: "Experiment History",
    href: "/history",
    icon: History,
  },
  {
    label: "Growth Insights",
    href: "/insights",
    icon: Sparkles,
  },
];


export default function Sidebar({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();


  return (
    <aside
      className={`flex h-full min-h-screen shrink-0 flex-col
        overflow-hidden border-r border-border
        bg-white/90 backdrop-blur-md
        transition-[width] duration-300
        md:min-h-0 md:h-screen md:bg-white/70
        ${isOpen ? "w-64" : "w-[4.5rem]"}`}
    >
      {/* Logo dan kontrol sidebar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-3">
        {isOpen && (
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className="min-w-0"
          >
            <img
              src="/logo-teks.png"
              alt="Elevate Puan"
              className="h-9 w-auto max-w-40 object-contain"
            />
          </Link>
        )}


        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={isOpen ? "Perkecil sidebar" : "Perbesar sidebar"}
          aria-expanded={isOpen}
          title={isOpen ? "Perkecil sidebar" : "Perbesar sidebar"}
          className={`flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl text-brand transition hover:bg-brand-soft
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            ${isOpen ? "" : "mx-auto"}`}
        >
          {isOpen ? (
            <PanelLeftClose size={19} strokeWidth={1.8} />
          ) : (
            <PanelLeftOpen size={19} strokeWidth={1.8} />
          )}
        </button>
      </div>


      {/* Navigasi */}
      <nav aria-label="Navigasi utama" className="flex flex-col gap-1 px-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;


          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={!isOpen ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex min-h-12 items-center rounded-xl
                transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                ${isOpen ? "gap-3 px-3" : "justify-center px-0"}
                ${
                  isActive
                    ? "bg-brand-soft font-semibold text-brand before:absolute before:bottom-2 before:left-0 before:top-2 before:w-1 before:rounded-r-full before:bg-brand"
                    : "text-ink-muted hover:bg-lav-pale hover:text-brand"
                }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Icon size={19} strokeWidth={1.8} />
              </span>


              {isOpen && (
                <span className="truncate text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>


      {/* Tagline */}
      <div className="mt-auto flex min-h-40 w-full items-center justify-center px-3 py-6">
        {isOpen && (
          <p className="text-center text-sm italic leading-6 text-brand">
            Bigger Dreams
            <br />
            Better Business
            <br />
            Together.
            <span className="block text-pink-ink">♥</span>
          </p>
        )}
      </div>
    </aside>
  );
}
