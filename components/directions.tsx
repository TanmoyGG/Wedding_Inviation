import type { WeddingEvent } from "@/lib/events";

type DirectionsProps = {
  events: WeddingEvent[];
};

export function Directions({ events }: DirectionsProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-3xl text-wedding-journey-maroon">Directions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <article
            key={`${event.key}-map`}
            className="overflow-hidden rounded-2xl border border-wedding-journey-rail-steel/40 bg-white"
          >
            <div className="border-b border-wedding-journey-rail-steel/30 p-4">
              <h3 className="text-lg font-semibold text-wedding-journey-charcoal">{event.title}</h3>
              <p className="text-sm text-wedding-journey-charcoal/70">{event.address}</p>
            </div>
            <div className="aspect-[4/3] w-full">
              <iframe
                title={`${event.title} map`}
                src={event.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
