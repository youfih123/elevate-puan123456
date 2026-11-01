

"use client";

import {
  CalendarCheck,
  ClipboardCheck,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

// DATA DEMO — KAK DINDA (SKINCARE)
const consistencyData = {
  totalDays: 30,
  recordedDays: 22,
  completedCheckIns: 22,
  missedDays: 8,
  currentStreak: 4,
  previousStreak: 7,
};

// Komponen utama
export default function BusinessConsistency() {
  const {
    totalDays,
    recordedDays,
    completedCheckIns,
    missedDays,
    currentStreak,
    previousStreak,
  } = consistencyData;

  // Persentase hari yang memiliki catatan omzet.
  const recordingRate = Math.round(
    (recordedDays / totalDays) * 100
  );

  // Persentase check-in yang berhasil diselesaikan.
  const checkInRate = Math.round(
    (completedCheckIns / totalDays) * 100
  );

  return (
    <section className="space-y-5">
      {/* Main consistency card */}
      <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="type-h2 text-ink-title">
              Business Recording Consistency
            </h3>

            <p className="type-caption mt-1 text-ink-muted">
              Ringkasan kebiasaan pencatatan bisnis selama 30 hari terakhir.
            </p>
          </div>

          <div className="rounded-xl bg-lav-pale p-3">
            <CalendarCheck size={22} className="text-brand" />
          </div>
        </div>

        {/* Recording rate */}
        <div className="mt-7">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="type-caption text-ink-muted">
                Recording Consistency
              </p>

              <p className="mt-1 text-3xl font-bold text-ink-title">
                {recordingRate}%
              </p>
            </div>

            <p className="type-caption text-ink-muted">
              {recordedDays} of {totalDays} days recorded
            </p>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-track">
            <div
              className="h-full rounded-full bg-bar-indigo transition-all"
              style={{ width: `${recordingRate}%` }}
            />
          </div>
        </div>

        {/* Recording details */}
        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <DetailCard
            label="Recorded Days"
            value={`${recordedDays} days`}
            icon={ClipboardCheck}
            color="text-emerald-600"
            background="bg-mint-soft"
          />

          <DetailCard
            label="Missed Days"
            value={`${missedDays} days`}
            icon={AlertCircle}
            color="text-pink-ink"
            background="bg-pink-pale"
          />

          <DetailCard
            label="Current Streak"
            value={`${currentStreak} days`}
            icon={TrendingUp}
            color="text-brand"
            background="bg-lav-pale"
          />
        </div>
      </div>

      {/* Check-in activity */}
      <div className="rounded-2xl border border-lav-line bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-sun-soft p-3">
            <CalendarCheck size={20} className="text-honey-ink" />
          </div>

          <div>
            <h3 className="type-h2 text-ink-title">
              Daily Check-in Activity
            </h3>

            <p className="type-caption text-ink-muted">
              Aktivitas pengisian check-in selama periode pemantauan.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-b border-row-line pb-4">
          <p className="type-body text-ink-muted">
            Completed check-ins
          </p>

          <p className="type-body font-semibold text-ink-title">
            {completedCheckIns} entries
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="type-body text-ink-muted">
            Previous best streak
          </p>

          <p className="type-body font-semibold text-ink-title">
            {previousStreak} days
          </p>
        </div>

        <p className="type-caption mt-5 rounded-xl bg-lav-pale p-4 text-ink-muted">
          Konsistensi pencatatan membantu AI memahami perkembangan bisnis
          berdasarkan data yang lebih lengkap. Hari tanpa catatan tidak
          selalu berarti bisnis tidak menghasilkan omzet.
        </p>
      </div>
    </section>
  );
}

// Reusable small metric card
function DetailCard({ label, value, icon: Icon, color, background }) {
  return (
    <div className="rounded-xl border border-row-line p-4">
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${background}`}
      >
        <Icon size={18} className={color} />
      </div>

      <p className="type-caption text-ink-muted">{label}</p>
      <p className="mt-1 text-lg font-bold text-ink-title">{value}</p>
    </div>
  );
}



