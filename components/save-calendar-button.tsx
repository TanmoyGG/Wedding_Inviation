"use client";

import { useCallback } from "react";
import { CalendarPlus } from "lucide-react";
import type { WeddingEvent } from "@/lib/events";
import { createIcsContent } from "@/lib/calendar";

type SaveCalendarButtonProps = {
  events: WeddingEvent[];
  label?: string;
  fileName?: string;
};

export function SaveCalendarButton({
  events,
  label = "Save to Calendar",
  fileName,
}: SaveCalendarButtonProps) {
  const onClick = useCallback(() => {
    const ics = createIcsContent(events);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const baseName = fileName ?? (events.length > 1 ? "wedding-reception-platform-3" : `${events[0].key}-platform-3`);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }, [events, fileName]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-wedding-journey-maroon px-4 py-2 text-sm font-semibold text-white transition hover:bg-wedding-journey-maroon/90"
    >
      <CalendarPlus className="h-4 w-4" />
      {label}
    </button>
  );
}
