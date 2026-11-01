
export default function Popup({
  icon = "✅",
  title,
  text,
  children,
  onClose,
}) {
  const success = icon === "✅" || icon === "☑️";

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#7770a5]/25 p-4 backdrop-blur-[3px]">

      <div className="relative w-full max-w-[510px] min-h-[380px] overflow-hidden rounded-[25px] border border-violet-100 bg-white px-6 py-7 text-center shadow-[0_15px_50px_rgba(75,55,150,0.20)] sm:px-8">

        {/* Dekorasi sudut atas */}
        <div className="pointer-events-none absolute -left-8 -top-9 h-32 w-32 rounded-full bg-[#f5eaff]" />
        <div className="pointer-events-none absolute -right-8 top-8 h-20 w-20 rounded-full bg-[#fff0f6]" />

        {/* Tombol tutup */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup popup"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[22px] font-semibold text-[#8883a8] shadow-sm transition hover:bg-[#f5efff] hover:text-[#6338d5]"
          >
            ×
          </button>
        )}

        {/* Ikon utama */}
        <div className="relative z-10 mx-auto mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#d9f4e9]">
          {success ? (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
              <path
                d="M16 33L27 44L49 20"
                stroke="#218F70"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span className="text-4xl">{icon}</span>
          )}
        </div>

        {/* Judul */}
        <h2 className="relative z-10 mx-auto max-w-[430px] text-[25px] font-bold leading-[1.2] text-[#333579] sm:text-[28px]">
          {title}
        </h2>

        {/* Deskripsi */}
        <p className="relative z-10 mx-auto mt-3 max-w-[410px] text-[14px] leading-[1.55] text-[#77769c]">
          {text}
        </p>

        {/* Label assessment */}
        {success && (
          <div className="relative z-10 mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-[#f1eaff] px-5 py-2 text-[13px] font-bold text-[#6545cf]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M12 2.5L14.9 8.3L21.3 9.2L16.6 13.8L17.7 20.3L12 17.2L6.3 20.3L7.4 13.8L2.7 9.2L9.1 8.3L12 2.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Assessment selesai
          </div>
        )}

        {/* Tombol bawah */}
        {children && (
          <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            {children}
          </div>
        )}

        {/* Dekorasi daun kiri bawah */}
        <svg
          viewBox="0 0 70 100"
          className="pointer-events-none absolute -bottom-1 left-0 w-[65px]"
          fill="none"
        >
          <path d="M5 95Q25 55 40 20" stroke="#e7a8d4" strokeWidth="2" />
          <ellipse cx="20" cy="64" rx="9" ry="23" transform="rotate(35 20 64)" fill="#f6c5e4" />
          <ellipse cx="39" cy="42" rx="8" ry="20" transform="rotate(35 39 42)" fill="#efb4dd" />
          <ellipse cx="10" cy="83" rx="7" ry="17" transform="rotate(-35 10 83)" fill="#d9c5fa" />
        </svg>

        {/* Dekorasi daun kanan bawah */}
        <svg
          viewBox="0 0 70 100"
          className="pointer-events-none absolute -bottom-1 right-0 w-[65px]"
          fill="none"
        >
          <path d="M60 95Q40 55 30 20" stroke="#8ccfc7" strokeWidth="2" />
          <ellipse cx="48" cy="64" rx="9" ry="22" transform="rotate(-35 48 64)" fill="#b5e8df" />
          <ellipse cx="29" cy="42" rx="8" ry="19" transform="rotate(-35 29 42)" fill="#a2ded5" />
        </svg>

      </div>
    </div>
  );
}
