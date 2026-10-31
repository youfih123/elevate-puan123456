"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssessmentHeader from "@/components/assessment/AssessmentHeader";
import InfoCard from "@/components/assessment/InfoCard";
import QuestionField from "@/components/assessment/QuestionField";
import Stepper from "@/components/assessment/Stepper";
import StoryBox from "@/components/assessment/StoryBox";
import { assessmentSteps, assessmentUi } from "@/lib/constants/assessment-questions";

const initialAnswers = Object.fromEntries(
  assessmentSteps
    .flatMap((s) => s.questions)
    .map((q) => [q.id, q.type === "chips" ? [] : null])
);

function toggleChip(question, current, val) {
  const exclusive = question.exclusive ?? [];
  if (current.includes(val)) return current.filter((v) => v !== val);
  if (exclusive.includes(val)) return [val];
  return [...current.filter((v) => !exclusive.includes(v)), val];
}

export default function AssessmentForm() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [story, setStory] = useState("");
  const [errors, setErrors] = useState({});

  const step = assessmentSteps[stepIndex];

  function handleChange(question, val) {
    const next =
      question.type === "chips"
        ? toggleChip(question, answers[question.id], val)
        : val;
    setAnswers((prev) => ({ ...prev, [question.id]: next }));
    setErrors((prev) => {
      if (!prev[question.id]) return prev;
      const rest = { ...prev };
      delete rest[question.id];
      return rest;
    });
  }

  function validateStep() {
    const found = {};
    for (const q of step.questions) {
      const v = answers[q.id];
      if (q.type === "select" && !v) found[q.id] = "Pilih salah satu jawaban.";
      if (q.type === "chips" && v.length === 0)
        found[q.id] = "Pilih minimal satu jawaban.";
    }
    return found;
  }

  function goToStep(i) {
    setStepIndex(i);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNext() {
    const found = validateStep();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const firstId = step.questions.find((q) => found[q.id]).id;
      document
        .getElementById(`q-${firstId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (stepIndex === assessmentSteps.length - 1) {
      // Sementara belum ada backend. Nanti jawaban dikirim ke Supabase dulu.
      router.push("/diagnosis");
      return;
    }
    goToStep(stepIndex + 1);
  }

  function handleSaveExit() {
    // Sementara belum ada backend. Nanti jawaban disimpan dulu sebelum keluar.
    router.push("/home");
  }

  return (
    <>
      <AssessmentHeader onSaveExit={handleSaveExit} />

      <div className="mx-auto max-w-307 px-4 pb-10 sm:px-6">
        <div className="py-5">
          <Stepper steps={assessmentSteps} current={stepIndex} />
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start lg:gap-x-14">
          <div className="lg:col-start-1 lg:row-start-1 lg:max-w-2xl">
            <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-ink-title sm:text-[32px]">
              {step.title}
            </h1>
            <p className="mt-1.5 text-sm text-ink-muted">{step.subtitle}</p>
          </div>

          <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <InfoCard text={step.why} />
          </aside>

          <div className="lg:col-start-1 lg:row-start-2 lg:max-w-2xl">
            <div className="space-y-5">
              {step.questions.map((q) => (
                <QuestionField
                  key={q.id}
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => handleChange(q, val)}
                  error={errors[q.id]}
                />
              ))}
            </div>

            {step.hasStory && (
              <div className="mt-6">
                <StoryBox value={story} onChange={setStory} />
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-brand-soft pt-5">
              {stepIndex > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => goToStep(stepIndex - 1)}
                  className="h-11 rounded-full border-lav-line bg-white px-6 text-[15px] font-bold text-brand-deep hover:bg-lav-pale"
                >
                  {assessmentUi.back}
                </Button>
              ) : (
                <span />
              )}
              <Button
                type="button"
                onClick={handleNext}
                className="h-11 gap-2 rounded-full bg-linear-to-r from-cta-from to-cta-to px-6 text-[15px] font-bold shadow-lg shadow-cta-to/30 hover:opacity-90"
              >
                {step.next}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}