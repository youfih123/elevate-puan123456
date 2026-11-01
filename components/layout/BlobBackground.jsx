"use client";

export default function BlobBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Soft pink - upper right */}
      <div className="absolute -top-24 right-10 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

      {/* Soft blue - middle left */}
      <div className="absolute top-[35%] -left-24 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />

      {/* Soft yellow - lower right */}
      <div className="absolute top-[55%] -right-24 h-80 w-80 rounded-full bg-yellow-200/25 blur-3xl" />
    </div>
  );
}



