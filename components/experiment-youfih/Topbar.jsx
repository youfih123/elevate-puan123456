
"use client";

import { useState } from "react";
import { business } from "@/lib/experiment-youfih/dummy-data";

export default function Topbar() {
  const [bad, setBad] = useState(false);
  const [badLogo, setBadLogo] = useState(false);

  return (
    <header className="relative z-30 w-full bg-[#fffdf8]">
      <style jsx>{`
        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-4px) rotate(-1.5deg);
          }
          50% {
            transform: translateY(-2px) rotate(0deg);
          }
          75% {
            transform: translateY(-4px) rotate(1.5deg);
          }
        }

        .logo-animation {
          animation: logoFloat 4s ease-in-out infinite;
          transform-origin: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-animation {
            animation: none;
          }
        }
      `}</style>

      <div className="relative flex min-h-[115px] w-full items-center justify-between px-6 md:px-10">

        {/* LOGO APLIKASI ELEVATEPUAN */}
        <div className="flex items-center gap-2">
          <div className="logo-animation flex h-[150px] w-[150px] shrink-0 items-center justify-center">
            {!badLogo ? (
              <img
                src="/images/logo-elevatepuan.png"
                alt="Logo ElevatePuan"
                className="h-full w-full object-contain"
                onError={() => setBadLogo(true)}
              />
            ) : (
              <span className="text-xl font-extrabold text-[#6338d5]">
                EP
              </span>
            )}
          </div>

          {/* TULISAN ELEVATEPUAN */}
          <div className="text-[36px] font-extrabold tracking-tight">
            <span className="text-[#18347e]">elevate</span>
            <span className="text-[#df4695]">puan</span>
          </div>
        </div>

        {/* NOTIFIKASI DAN PROFIL DEWI */}
        <div className="flex items-center gap-7">

          {/* NOTIFIKASI */}
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[21px] hover:bg-violet-50"
          >
            🔔
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full border border-white bg-[#ed4b9a]" />
          </button>

          {/* FOTO PROFIL / USAHA DEWI */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#eee5ff] bg-[#eee5ff] text-base font-bold text-[#5836bb]">
              {!bad ? (
                <img
                  src="/images/usaha.jpg"
                  alt="Foto usaha Dewi"
                  className="h-full w-full object-cover object-center"
                  onError={() => setBad(true)}
                />
              ) : (
                "D"
              )}
            </div>

            {/* NAMA PEMILIK */}
            <div className="leading-tight">
              <p className="text-[17px] font-bold text-[#18347e]">
                {business.owner}
              </p>

              <p className="mt-1 text-[13px] text-[#77718f]">
                Dewi's Sweet Kitchen
              </p>
            </div>

            <span className="ml-1 text-base text-[#77718f]">
              ⌄
            </span>
          </div>
        </div>

        {/* GARIS BAWAH */}
        <div className="absolute bottom-0 left-1/2 h-px w-[35%] -translate-x-1/2 bg-[#f0eafa]" />

      </div>
    </header>
  );
}
