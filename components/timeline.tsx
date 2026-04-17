import type { WeddingEvent } from "@/lib/events";

type TimelineProps = {
  events: WeddingEvent[];
};

export function Timeline({ events }: TimelineProps) {
  return (
    <section className="rounded-2xl border border-wedding-journey-brass/40 bg-white/70 p-6">
      <h2 className="font-display text-3xl text-wedding-journey-maroon">Journey Timeline</h2>
      <ol className="mt-6 space-y-6">
        {events.map((event, index) => (
          <li key={event.key} className="relative pl-10">
            <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-wedding-journey-maroon bg-wedding-journey-brass" />
            {index < events.length - 1 ? (
              <span className="absolute left-[7px] top-6 h-[calc(100%+12px)] w-[2px] bg-wedding-journey-maroon/35" />
            ) : null}
            <p className="text-sm uppercase tracking-[0.16em] text-wedding-journey-maroon">{event.dateLabel}</p>
            <h3 className="text-lg font-semibold text-wedding-journey-charcoal">{event.title}</h3>
            <p className="text-wedding-journey-charcoal/80">{event.venue}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
