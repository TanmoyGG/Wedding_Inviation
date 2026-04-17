"use client";

import { useCallback } from "react";
import { CalendarPlus } from "lucide-react";
import type { WeddingEvent } from "@/lib/events";
import { createIcsContent } from "@/lib/calendar";

type SaveCalendarButtonProps = {
  event: WeddingEvent;
};

export function SaveCalendarButton({ event }: SaveCalendarButtonProps) {
  const onClick = useCallback(() => {
    const ics = createIcsContent(event);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.key}-platform-3.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }, [event]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-wedding-journey-maroon px-4 py-2 text-sm font-semibold text-white transition hover:bg-wedding-journey-maroon/90"
    >
      <CalendarPlus className="h-4 w-4" />
      Save to Calendar
    </button>
  );
}
