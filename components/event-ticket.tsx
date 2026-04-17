import { Calendar, Clock, MapPin } from "lucide-react";
import type { WeddingEvent } from "@/lib/events";

type EventTicketProps = {
  event: WeddingEvent;
};

export function EventTicket({ event }: EventTicketProps) {
  return (
    <article className="ticket-cutout relative overflow-hidden rounded-2xl border border-dashed border-wedding-journey-rail-steel/50 bg-wedding-journey-ticket-paper/95 p-6 text-wedding-journey-charcoal shadow-lg">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-wedding-journey-maroon">
            Platform 3 Boarding Pass
          </p>
          <h3 className="mt-1 text-xl font-semibold">{event.title}</h3>
        </div>
        <span className="rounded-full bg-wedding-journey-maroon px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
          {event.key}
        </span>
      </div>

      <div className="space-y-3 text-sm sm:text-base">
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-wedding-journey-maroon" />
          <span>{event.dateLabel}</span>
        </p>
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-wedding-journey-maroon" />
          <span>{event.timeLabel}</span>
        </p>
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 text-wedding-journey-maroon" />
          <span>{event.venue}</span>
        </p>
      </div>
    </article>
  );
}
