import { notFound } from "next/navigation";
import { Countdown } from "@/components/countdown";
import { Directions } from "@/components/directions";
import { EventTicket } from "@/components/event-ticket";
import { Hero } from "@/components/hero";
import { SaveCalendarButton } from "@/components/save-calendar-button";
import { Timeline } from "@/components/timeline";
import { couple, getEventsForType, isInviteType } from "@/lib/events";

type InvitePageProps = {
  params: Promise<{ type: string }>;
};

export function generateStaticParams() {
  return [{ type: "wedding" }, { type: "reception" }, { type: "both" }];
}

export default async function InviteTypePage({ params }: InvitePageProps) {
  const { type } = await params;

  if (!isInviteType(type)) {
    notFound();
  }

  const selectedEvents = getEventsForType(type);

  return (
    <main className="bg-[radial-gradient(circle_at_top,#fdf7f0_0%,#f5e7d6_35%,#efd8bf_100%)] px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Hero
          title={`${couple.groom} and ${couple.bride}`}
          subtitle="From one platform to forever, we invite you to join our wedding journey."
        />

        {type === "both" ? <Timeline events={selectedEvents} /> : null}

        <section className="grid gap-4 md:grid-cols-2">
          {selectedEvents.map((event) => (
            <EventTicket key={event.key} event={event} />
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {selectedEvents.map((event) => (
            <Countdown key={`${event.key}-countdown`} label={`${event.title} Countdown`} targetIso={event.startsAtIso} />
          ))}
        </section>

        <section className="flex flex-wrap gap-3">
          {selectedEvents.map((event) => (
            <SaveCalendarButton key={`${event.key}-calendar`} event={event} />
          ))}
        </section>

        <Directions events={selectedEvents} />
      </div>
    </main>
  );
}
