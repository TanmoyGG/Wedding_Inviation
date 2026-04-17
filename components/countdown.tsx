"use client";

import { useEffect, useMemo, useState } from "react";

type CountdownProps = {
  label: string;
  targetIso: string;
};

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(targetIso: string): Remaining {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const delta = Math.max(target - now, 0);

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((delta / (1000 * 60)) % 60);
  const seconds = Math.floor((delta / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function Countdown({ label, targetIso }: CountdownProps) {
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining(targetIso));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining(getRemaining(targetIso));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetIso]);

  const blocks = useMemo(
    () => [
      { key: "days", value: remaining.days },
      { key: "hours", value: remaining.hours },
      { key: "minutes", value: remaining.minutes },
      { key: "seconds", value: remaining.seconds },
    ],
    [remaining]
  );

  return (
    <article className="rounded-2xl border border-wedding-journey-brass/50 bg-white/90 p-5">
      <h3 className="mb-3 text-lg font-semibold text-wedding-journey-charcoal">{label}</h3>
      <div className="grid grid-cols-4 gap-2">
        {blocks.map((block) => (
          <div key={block.key} className="rounded-xl bg-wedding-journey-platform-100 p-3 text-center">
            <p className="text-2xl font-bold text-wedding-journey-maroon">{String(block.value).padStart(2, "0")}</p>
            <p className="text-xs uppercase tracking-[0.12em] text-wedding-journey-charcoal/70">{block.key}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
