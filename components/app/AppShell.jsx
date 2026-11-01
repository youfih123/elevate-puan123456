"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  FlaskConical,
  History as HistoryIcon,
  House,
  Lightbulb,
  LogOut,
  PanelLeft,
  PanelLeftClose,
  User,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { dummyUser } from "@/lib/dummy-data";

const appMenu = [
  { href: "/home", label: "Beranda", icon: House },
  { href: "/financial-readiness", label: "Kesiapan Finansial", icon: Wallet },
  { href: "/experiments", label: "Eksperimen Saya", icon: FlaskConical },
  { href: "/history", label: "Riwayat Eksperimen", icon: HistoryIcon },
  { href: "/business-overview", label: "Wawasan Pertumbuhan", icon: Lightbulb },
];

function SidebarContent({ expanded, onToggle, onNavigate }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-18 shrink-0 items-center gap-2.5 border-b border-row-line px-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={expanded ? "Tutup sidebar" : "Buka sidebar"}
          aria-expanded={expanded}
          className={cn(
            "size-11 rounded-2xl text-ink-muted hover:bg-brand-soft/60",
            expanded && "bg-lav-pale"
          )}
        >
          {expanded ? (
            <PanelLeftClose className="size-5.5" />
          ) : (
            <PanelLeft className="size-5.5" />
          )}
        </Button>
        {expanded && (
          <Image
            src="/logo-teks.png"
            alt="Elevate Puan"
            width={534}
            height={192}
            className="h-9 w-auto"
          />
        )}
      </div>

      <nav aria-label="Menu utama" className="flex flex-col gap-1.5 p-3">
        {appMenu.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "relative flex h-11.5 items-center gap-3.5 rounded-2xl text-sm font-semibold text-ink-muted transition-colors hover:bg-brand-soft/50",
                expanded ? "px-3.5" : "mx-auto w-13 justify-center",
                active &&
                  "bg-brand-soft font-bold text-brand-deep before:absolute before:-left-3 before:top-2.5 before:bottom-2.5 before:w-1 before:rounded-r-full before:bg-brand-deep"
              )}
            >
              <Icon className="size-5.5 shrink-0" />
              {expanded && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default function AppShell({ children }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const firstName = dummyUser.fullName.split(" ")[0];
  const initials = dummyUser.fullName.slice(0, 2).toUpperCase();

  return (
    <div className="flex min-h-svh">
      <aside
        className={cn(
          "sticky top-0 hidden h-svh shrink-0 self-start flex-col border-r border-row-line bg-white/95 transition-[width] duration-200 lg:flex",
          expanded ? "w-64" : "w-19"
        )}
      >
        <SidebarContent
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
        />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-ink-title/30"
          />
          <aside className="relative flex h-full w-64 flex-col bg-white shadow-xl">
            <SidebarContent
              expanded
              onToggle={() => setMobileOpen(false)}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-18 items-center gap-3 border-b border-row-line bg-white/85 px-4 backdrop-blur sm:px-7">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
            className="size-10 rounded-2xl text-ink-muted hover:bg-brand-soft/60 lg:hidden"
          >
            <PanelLeft className="size-5.5" />
          </Button>

          <div className="ml-auto flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Notifikasi"
              className="relative size-10.5 rounded-2xl border-row-line bg-white text-ink-muted hover:bg-lav-pale"
            >
              <Bell className="size-5" />
              <span className="absolute right-2.5 top-2 size-2.5 rounded-full border-2 border-white bg-cta-to" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full border border-row-line bg-white py-1.5 pl-1.5 pr-3 outline-none transition-colors hover:bg-lav-pale focus-visible:ring-4 focus-visible:ring-brand-light/30">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-lav-pale text-[13px] font-extrabold text-brand-deep">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-extrabold leading-tight text-ink-title">
                    {firstName}
                  </span>
                  <span className="block text-[11px] text-ink-muted">
                    {dummyUser.role}
                  </span>
                </span>
                <ChevronDown className="size-4 text-ink-muted" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-2xl p-1.5">
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="h-11 gap-3 rounded-xl px-3 text-sm font-bold text-ink-title"
                >
                  <User className="size-4.5" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/login")}
                  className="h-11 gap-3 rounded-xl px-3 text-sm font-bold text-destructive"
                >
                  <LogOut className="size-4.5" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}