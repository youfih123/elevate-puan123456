"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function FormField({
  id,
  label,
  icon: Icon,
  type = "text",
  prefix,
  hint,
  error,
  ...props
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <Label htmlFor={id} className="mb-1 text-[13px] font-bold text-brand-deep">
        {label}
      </Label>

      <div className="flex gap-2">
        {prefix && (
          <div className="flex h-9 w-16 shrink-0 items-center justify-center rounded-xl border border-brand-soft bg-white text-[13px] font-bold text-brand-deep">
            {prefix}
          </div>
        )}

        <div className="relative flex-1">
          <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-light" />
          <Input
            id={id}
            type={isPassword && show ? "text" : type}
            aria-invalid={Boolean(error)}
            className={cn(
              "h-9 rounded-xl border-brand-soft bg-white pl-9 text-sm text-ink-muted placeholder:text-brand-light focus-visible:border-brand-light focus-visible:ring-4 focus-visible:ring-brand-light/30",
              isPassword && "pr-10"
            )}
            {...props}
          />
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShow(!show)}
              aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute right-1 top-1/2 size-7 -translate-y-1/2 rounded-full text-brand-light hover:bg-brand-soft/60"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          )}
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-0.5 text-[11px] font-medium leading-4 text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-0.5 text-[11px] leading-4 text-brand">{hint}</p>
      ) : null}
    </div>
  );
}