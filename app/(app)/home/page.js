import ActionCard from "@/components/home/ActionCard";
import ExperimentProgressCard from "@/components/home/ExperimentProgressCard";
import LastResultCard from "@/components/home/LastResultCard";
import { dummyActiveExperiment, dummyUser } from "@/lib/dummy-data";

export const metadata = { title: "Beranda | Elevate Puan" };

export default function HomePage() {
  const firstName = dummyUser.fullName.split(" ")[0];

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-14 lg:py-11">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink-title sm:text-4xl lg:text-[38px]">
        Halo, {firstName}!
      </h1>
      <p className="mt-2.5 text-lg font-medium text-ink-muted sm:text-xl">
        Siap melakukan eksperimen hari ini?
      </p>

      <div className="mt-8 flex max-w-5xl flex-col gap-5">
        <ActionCard experiment={dummyActiveExperiment} />
        <div className="grid gap-5 md:grid-cols-2">
          <ExperimentProgressCard experiment={dummyActiveExperiment} />
          <LastResultCard />
        </div>
      </div>
    </div>
  );
}