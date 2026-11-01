import ExperimentOverview from "@/components/growth-insights/ExperimentOverview";
import BusinessPerformance from "@/components/growth-insights/BusinessPerformance";
import BusinessConsistency from "@/components/growth-insights/BusinessConsistency";
import AILearningInsights from "@/components/growth-insights/AILearningInsights";
import RecommendationCard from "@/components/growth-insights/RecommendationCard";
import BlobBackground from "@/components/layout/BlobBackground";


export default function InsightsPage() {
  return (
    <>
     <BlobBackground />

    <main className="relative isolate min-h-screen bg-page px-5 py-8 md:px-8 lg:px-10">

      <BlobBackground />
      {/* Main container: menjaga konten tetap rapi dan tidak terlalu melebar */}
      <div className="mx-auto w-full max-w-7xl space-y-8">

        {/* Page Header */}
        <section className="space-y-2">
          <p className="type-micro uppercase tracking-wider text-brand">
            Business Growth
          </p>

          <h1 className="type-display text-ink-title">
            Growth Insights
          </h1>

          <p className="type-body max-w-2xl text-ink-muted">
            Pahami perkembangan bisnismu, pelajari hasil eksperimen,
            dan temukan langkah berikutnya untuk mengembangkan usahamu.
          </p>
        </section>

        {/* Section 01: Experiment Overview */}
        <section id="experiment-overview" className="space-y-4">
          <div className="space-y-1">
            <h2 className="type-h1 text-ink-title">
              Experiment Overview
            </h2>
          </div>

          {/* Komponen overview akan kita buat pada langkah berikutnya */}
          <div className="rounded-xl border border-lav-line bg-lav-pale/40 p-6">
            <p className="type-body text-ink-muted">
              Lihat ringkasan seluruh eksperimen yang telah dan sedang kamu jalankan.
            </p>
          </div>
          <ExperimentOverview/>
        </section>

        {/* Section 02: Business Performance Summary */}
        <section id="business-performance" className="space-y-4">
          <div className="space-y-1">
            <h2 className="type-h1 text-ink-title">
              Business Performance Summary
            </h2>
            <p className="type-body text-ink-muted">
              Pahami perkembangan omzet dan kontribusi setiap eksperimen terhadap bisnismu.
            </p>
          </div>


          <BusinessPerformance />
        </section>

        {/* Section 03: Business Consistency */}
        <section id="business-consistency" className="space-y-4">
          <div className="space-y-1">
            <h2 className="type-h1 text-ink-title">
              Business Consistency
            </h2>


            <p className="type-body text-ink-muted">
              Pantau konsistensi pencatatan dan aktivitas check-in bisnismu.
            </p>
          </div>


          <BusinessConsistency />
        </section>

        {/* Section 04: AI Learning Insights */}
        <section id="ai-learning-insights" className="space-y-4">
          <div className="space-y-1">
            <h2 className="type-h1 text-ink-title">
              AI Learning Insights
            </h2>


            <p className="type-body text-ink-muted">
              Temukan pembelajaran dari eksperimen dan pahami langkah
              berikutnya untuk mengembangkan bisnismu.
            </p>
          </div>


          <AILearningInsights />
        </section>




      </div>
    </main>
  </>
  );
}
