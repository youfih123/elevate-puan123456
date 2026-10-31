"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { assessmentUi } from "@/lib/constants/assessment-questions";

const labelClass = "text-[15px] font-bold leading-snug text-ink-title";

function Asterisk() {
  return <span className="ml-1 text-cta-from">*</span>;
}

export default function QuestionField({ question, value, onChange, error }) {
  const { id, label, type, options } = question;

  return (
    <div id={`q-${id}`}>
      {type === "select" ? (
        <>
          <Label htmlFor={id} className={cn("mb-1.5 block", labelClass)}>
            {label}
            <Asterisk />
          </Label>
          <Select items={options} value={value} onValueChange={onChange}>
            <SelectTrigger
              id={id}
              aria-invalid={Boolean(error)}
              className="h-11 w-full justify-between rounded-xl border-brand-light bg-lav-pale/50 px-4 text-[15px] font-medium text-ink-title data-[size=default]:h-11 data-placeholder:text-brand-light focus-visible:border-brand-deep focus-visible:ring-4 focus-visible:ring-brand-light/30"
            >
              <SelectValue placeholder={assessmentUi.selectPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : (
        <div role="group" aria-labelledby={`${id}-label`}>
          <p id={`${id}-label`} className={labelClass}>
            {label}
            <Asterisk />
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">{assessmentUi.multiHint}</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {options.map((o) => {
              const checked = value.includes(o.value);
              const chipId = `${id}-${o.value}`;
              return (
                <Label
                  key={o.value}
                  htmlFor={chipId}
                  className={cn(
                    "flex h-10 cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 text-sm font-medium text-ink-title transition-colors",
                    checked
                      ? "border-blush bg-blush-soft"
                      : "border-lav-line bg-white hover:border-brand-light"
                  )}
                >
                  <Checkbox
                    id={chipId}
                    checked={checked}
                    onCheckedChange={() => onChange(o.value)}
                    className="size-5 rounded-md border-lav-line data-checked:border-cta-to data-checked:bg-cta-to data-[state=checked]:border-cta-to data-[state=checked]:bg-cta-to"
                  />
                  {o.label}
                </Label>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}