"use client";

import { useMemo, useState } from "react";
import { CalendarPlus } from "lucide-react";
import type { WeddingEvent } from "@/lib/events";
import { createGoogleCalendarLink } from "@/lib/calendar";

type SaveCalendarButtonProps = {
  events: WeddingEvent[];
  label?: string;
};

export function SaveCalendarButton({ events, label = "Add to Google Calendar" }: SaveCalendarButtonProps) {
  const [open, setOpen] = useState(false);
  const links = useMemo(
    () => events.map((event) => ({ event, href: createGoogleCalendarLink(event) })),
    [events]
  );

  if (links.length === 1) {
    return (
      <a
        href={links[0].href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-wedding-journey-maroon px-4 py-2 text-sm font-semibold text-white transition hover:bg-wedding-journey-maroon/90"
      >
        <CalendarPlus className="h-4 w-4" />
        {label}
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-full bg-wedding-journey-maroon px-4 py-2 text-sm font-semibold text-white transition hover:bg-wedding-journey-maroon/90"
      >
        <CalendarPlus className="h-4 w-4" />
        {label}
      </button>

      {open ? (
        <div className="absolute left-0 z-20 mt-2 min-w-64 space-y-2 rounded-xl border border-wedding-journey-brass/50 bg-white p-3 shadow-xl">
          {links.map(({ event, href }) => (
            <a
              key={event.key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-wedding-journey-platform-50 px-3 py-2 text-sm font-semibold text-wedding-journey-charcoal hover:bg-wedding-journey-platform-100"
            >
              Add {event.title}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
