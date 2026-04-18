import { notFound } from "next/navigation";
import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { Directions } from "@/components/directions";
import { EventTicket } from "@/components/event-ticket";
import { SaveCalendarButton } from "@/components/save-calendar-button";
import { StoryGallery } from "@/components/story-gallery";
import { StationMarquee } from "@/components/station-marquee";
import { Timeline } from "@/components/timeline";
import {
  couple,
  getEventsForType,
  getInviteImageForType,
  isInviteType,
} from "@/lib/events";
import type { Metadata } from "next";

type InvitePageProps = {
  params: Promise<{ type: string }>;
};

export function generateStaticParams() {
  return [{ type: "wedding" }, { type: "reception" }, { type: "both" }];
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { type } = await params;

  if (!isInviteType(type)) {
    return {};
  }

  const titleMap = {
    wedding: "Partha & Trisa | Wedding Ceremony",
    reception: "Partha & Trisa | Reception",
    both: "Partha & Trisa | Wedding Ceremony and Reception",
  } as const;

  const descriptionMap = {
    wedding: "Wedding invitation for Partha Saha and Trisa Das.",
    reception: "Reception invitation for Partha Saha and Trisa Das.",
    both: "Wedding and reception invitation for Partha Saha and Trisa Das.",
  } as const;

  return {
    title: titleMap[type],
    description: descriptionMap[type],
    openGraph: {
      title: titleMap[type],
      description: descriptionMap[type],
      images: ["/assets/images/Front page.jpg"],
    },
    twitter: {
      title: titleMap[type],
      description: descriptionMap[type],
      images: ["/assets/images/Front page.jpg"],
    },
  };
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
    `Together with their families, ${couple.groom} and ${couple.bride} invite you to share in their joy`,
  ];

  return (
    <main className="invite-ambient bg-[radial-gradient(circle_at_top,#fdf7f0_0%,#f5e7d6_35%,#efd8bf_100%)] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-wedding-journey-brass/35 bg-white/70 px-5 py-7 text-center shadow-ticket sm:px-10">
          <h1 className="font-display text-4xl leading-tight text-wedding-journey-maroon sm:text-6xl">
            The Journey of Partha & Trisa
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-wedding-journey-charcoal/70 sm:text-base">
            {type === "both" ? "Wedding and Reception" : selectedEvents[0].title}
          </p>
        </section>

        <StationMarquee
          lines={[
            "Next Stop: Happily Ever After",
            ...storyLines,
          ]}
        />

        <StoryGallery frames={openingFrames} />

        <section className="grid gap-5 rounded-3xl border border-wedding-journey-brass/35 bg-white/70 p-4 shadow-ticket sm:p-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-wedding-journey-brass/35 bg-white">
            <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
              <Image
                src={dynamicInviteImage}
                alt={`${type} invitation artwork`}
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-wedding-journey-brass/55 bg-wedding-journey-ticket-paper/90 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-wedding-journey-maroon">
                Invitation Details
              </p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-wedding-journey-maroon sm:text-3xl">
                {type === "both" ? "Wedding and Reception" : selectedEvents[0].title}
              </h2>
              <p className="mt-2 text-sm text-wedding-journey-charcoal/75">
                A wedding journey from Platform 3 to a lifetime of togetherness.
              </p>
            </div>

            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <EventTicket key={event.key} event={event} />
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {type === "both" ? (
                <SaveCalendarButton
                  events={selectedEvents}
                  label="Add Both Events to Google Calendar"
                />
              ) : (
                selectedEvents.map((event) => (
                  <SaveCalendarButton key={`${event.key}-calendar`} events={[event]} label="Add to Google Calendar" />
                ))
              )}
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
