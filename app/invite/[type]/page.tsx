import { notFound } from "next/navigation";
import { Countdown } from "@/components/countdown";
import { Directions } from "@/components/directions";
import { EventTicket } from "@/components/event-ticket";
import { SaveCalendarButton } from "@/components/save-calendar-button";
import { StoryGallery } from "@/components/story-gallery";
import { Timeline } from "@/components/timeline";
import {
  couple,
  getEventsForType,
  getInviteImageForType,
  isInviteType,
} from "@/lib/events";

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
  const dynamicInviteImage = getInviteImageForType(type);

  const storyFrames = [
    {
      src: "/assets/images/Front page.jpg",
      alt: "Front page artwork",
    },
    {
      src: "/assets/images/page 2.jpg",
      alt: "Second page artwork",
    },
    {
      src: "/assets/images/Bride and groom introduction.jpg",
      alt: "Bride and groom introduction",
      caption: `${couple.groom} and ${couple.bride}`,
    },
    {
      src: dynamicInviteImage,
      alt: `${type} invitation artwork`,
    },
    {
      src: "/assets/images/platform-3.jpg",
      alt: "Platform 3 illustrated finale",
    },
  ];

  return (
    <main className="bg-[radial-gradient(circle_at_top,#fdf7f0_0%,#f5e7d6_35%,#efd8bf_100%)] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-wedding-journey-brass/35 bg-white/70 px-5 py-7 text-center shadow-ticket sm:px-10">
          <h1 className="font-display text-4xl leading-tight text-wedding-journey-maroon sm:text-6xl">
            {couple.groom} and {couple.bride}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-wedding-journey-charcoal/70 sm:text-base">
            {type === "both" ? "Wedding and Reception" : selectedEvents[0].title}
          </p>
        </section>

        <StoryGallery frames={storyFrames} />

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
