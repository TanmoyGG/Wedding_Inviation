import { notFound } from "next/navigation";
import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { Directions } from "@/components/directions";
import { EventTicket } from "@/components/event-ticket";
import { SaveCalendarButton } from "@/components/save-calendar-button";
import { StoryGallery } from "@/components/story-gallery";
import { StoryLines } from "@/components/story-lines";
import { StationMarquee } from "@/components/station-marquee";
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

  const openingFrames = [
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
  ];

  const closingFrames = [
    {
      src: "/assets/images/platform-3.jpg",
      alt: "Platform 3 illustrated finale",
    },
  ];

  const storyLines = [
    "The Journey of a Lifetime Begins at Platform 3",
    "Two different tracks, one destination: Love.",
    "Life is a beautiful journey; we're just making our first stop as a married couple.",
    `Boarding the train to forever with ${couple.groom} and ${couple.bride}`,
    "Two souls, one ticket to paradise.",
    `Witness the union of ${couple.groom} and ${couple.bride} as they begin their new chapter together`,
    `Together with their families, Parth and Trisa invite you to share in their joy`,
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

        <StationMarquee text="Next Stop: Happily Ever After" />

        <StoryGallery frames={openingFrames} />

        <StoryLines lines={storyLines} />

        <section className="overflow-hidden rounded-3xl border border-wedding-journey-brass/35 bg-white/65 shadow-ticket">
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
            <Image
              src={dynamicInviteImage}
              alt={`${type} invitation artwork`}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wedding-journey-maroon/70 via-wedding-journey-maroon/25 to-transparent" />

            <div className="absolute inset-x-3 bottom-3 top-3 flex items-end sm:inset-x-5 sm:bottom-5">
              <div className="w-full space-y-4">
                <div className="max-w-2xl rounded-2xl border border-wedding-journey-brass/55 bg-white/88 p-4 backdrop-blur-sm sm:p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-wedding-journey-maroon">
                    Invitation Details
                  </p>
                  <h2 className="mt-2 font-display text-2xl leading-tight text-wedding-journey-maroon sm:text-3xl">
                    {type === "both" ? "Wedding and Reception" : selectedEvents[0].title}
                  </h2>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {selectedEvents.map((event) => (
                    <EventTicket key={event.key} event={event} />
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {selectedEvents.map((event) => (
                    <SaveCalendarButton key={`${event.key}-calendar`} event={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <StoryGallery frames={closingFrames} />

        {type === "both" ? <Timeline events={selectedEvents} /> : null}

        <section className="grid gap-4 md:grid-cols-2">
          {selectedEvents.map((event) => (
            <Countdown key={`${event.key}-countdown`} label={`${event.title} Countdown`} targetIso={event.startsAtIso} />
          ))}
        </section>

        <Directions events={selectedEvents} />
      </div>
    </main>
  );
}
