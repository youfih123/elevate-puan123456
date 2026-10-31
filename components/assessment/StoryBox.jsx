"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useSpeechToText from "@/components/assessment/useSpeechToText";
import { cn } from "@/lib/utils";
import { storyBox, voiceText } from "@/lib/constants/assessment-questions";

const bars = [6, 10, 16, 8, 18, 12, 22, 14, 9, 17, 11, 20, 8, 13, 19, 10, 15, 7];

export default function StoryBox({ value, onChange }) {
  const [voiceError, setVoiceError] = useState("");
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  function appendText(text) {
    const base = valueRef.current;
    const separator = base && !/\s$/.test(base) ? " " : "";
    const next = base + separator + text;
    valueRef.current = next;
    onChange(next);
  }

  function handleError(code) {
    setVoiceError(voiceText.errors[code] ?? voiceText.errors.default);
  }

  const { supported, listening, interim, start, stop } = useSpeechToText({
    onFinalText: appendText,
    onError: handleError,
  });

  function handleMic() {
    if (listening) {
      stop();
      return;
    }
    setVoiceError("");
    start();
  }

  return (
    <Card className="gap-0 rounded-3xl border border-honey bg-linear-to-br from-sun-soft to-pink-pale py-0 shadow-[0_20px_50px_-28px_rgba(216,31,138,0.2)] ring-0">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-lg font-extrabold text-ink-title">{storyBox.title}</h2>
          <Badge className="h-6 rounded-full border border-honey bg-white px-3 text-xs font-bold text-brand-deep hover:bg-white">
            {storyBox.badge}
          </Badge>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {storyBox.description}
        </p>

        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={storyBox.placeholder}
          aria-label={storyBox.title}
          className="mt-3 min-h-28 rounded-2xl border-lav-line bg-white text-sm text-ink-title placeholder:text-brand-light focus-visible:border-brand-deep focus-visible:ring-4 focus-visible:ring-brand-light/30"
        />

        {listening && interim && (
          <p aria-live="polite" className="mt-1.5 text-xs italic text-ink-muted">
            {interim}
          </p>
        )}

        <div className="mt-3 flex items-center gap-3">
          <Button
            type="button"
            size="icon"
            onClick={handleMic}
            disabled={!supported}
            aria-label={listening ? "Berhenti merekam" : "Mulai bicara"}
            title={listening ? "Berhenti merekam" : "Mulai bicara"}
            className={cn(
              "size-11 shrink-0 rounded-full bg-linear-to-br from-cta-from to-cta-to text-white shadow-lg shadow-cta-to/30 hover:opacity-90 disabled:opacity-50",
              listening && "animate-pulse ring-4 ring-blush-soft motion-reduce:animate-none"
            )}
          >
            {listening ? <Square className="size-4 fill-current" /> : <Mic className="size-5" />}
          </Button>
          <div>
            <p className="text-sm font-bold text-ink-title">
              {listening ? voiceText.listeningTitle : storyBox.voiceTitle}
            </p>
            <p className="text-xs text-ink-muted">
              {supported
                ? listening
                  ? voiceText.listeningHint
                  : storyBox.voiceHint
                : voiceText.unsupported}
            </p>
          </div>
          <div aria-hidden="true" className="ml-auto hidden items-center gap-1 sm:flex">
            {bars.map((h, i) => (
              <span
                key={i}
                style={{ height: h, animationDelay: `${i * 80}ms` }}
                className={cn(
                  "w-1 rounded-full",
                  i % 3 === 0 ? "bg-brand-light" : "bg-blush",
                  listening && "animate-pulse motion-reduce:animate-none"
                )}
              />
            ))}
          </div>
        </div>

        {voiceError && (
          <p role="alert" className="mt-2 text-xs font-medium text-destructive">
            {voiceError}
          </p>
        )}
      </CardContent>
    </Card>
  );
}