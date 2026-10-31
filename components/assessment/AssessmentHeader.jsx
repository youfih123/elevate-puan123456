"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { assessmentUi } from "@/lib/constants/assessment-questions";

export default function AssessmentHeader({ onSaveExit }) {
  return (
    <header className="border-b border-brand-soft/50 bg-white/95">
      <div className="mx-auto flex max-w-307 items-center justify-between px-4 py-2 sm:px-6">
        <Image
          src="/logo-penuh.png"
          alt="Elevate Puan"
          width={560}
          height={684}
          priority
          className="h-14 w-auto"
        />
        <Button
          type="button"
          variant="ghost"
          onClick={onSaveExit}
          className="h-10 rounded-full px-4 text-sm font-bold text-brand-deep hover:bg-brand-soft/60"
        >
          {assessmentUi.saveExit}
        </Button>
      </div>
    </header>
  );
}