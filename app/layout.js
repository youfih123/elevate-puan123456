import "./globals.css";
import localFont from "next/font/local";
import { Sparkles } from "lucide-react";

const jakarta = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans-Variable.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Italic-Variable.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Elevate Puan",
  description: "AI growth companion untuk perempuan pemilik UMKM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="flex min-h-screen flex-col bg-page font-sans text-ink antialiased">
        {/* Lapisan dekoratif tetap: tidak ikut bergulir, ada di semua halaman */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="animate-blob absolute -bottom-16 -left-20 size-80 rounded-full bg-note opacity-70 blur-3xl" />
          <div className="animate-blob absolute -bottom-24 left-56 size-72 rounded-full bg-blush/40 blur-3xl [animation-delay:4s]" />
          <div className="animate-blob absolute bottom-32 left-28 size-56 rounded-full bg-brand-light/30 blur-3xl [animation-delay:8s]" />

          <Sparkles className="absolute right-16 top-40 size-6 animate-pulse text-sun motion-reduce:animate-none" />
          <Sparkles className="absolute bottom-20 left-12 size-5 animate-pulse text-blush [animation-delay:1s] motion-reduce:animate-none" />
          <Sparkles className="absolute left-8 top-1/3 size-4 animate-pulse text-brand-light [animation-delay:2s] motion-reduce:animate-none" />
        </div>

        <div className="flex-1">{children}</div>

    
      </body>
    </html>
  );
}