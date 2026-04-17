export type InviteType = "wedding" | "reception" | "both";

export type WeddingEvent = {
  key: "wedding" | "reception";
  title: string;
  subtitle: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  startsAtIso: string;
  endsAtIso: string;
  mapUrl: string;
  mapEmbedUrl: string;
};

export const couple = {
  groom: "Parth Saha",
  bride: "Trisa Das",
};

export const events: Record<"wedding" | "reception", WeddingEvent> = {
  wedding: {
    key: "wedding",
    title: "Wedding Ceremony",
    subtitle: "Platform 3 - The Journey Begins",
    dateLabel: "May 3, 2026",
    timeLabel: "8:00 PM",
    venue: "Roushan's Party Center, Feni",
    address: "23, Sadar Hospital Road, Feni",
    startsAtIso: "2026-05-03T20:00:00+06:00",
    endsAtIso: "2026-05-03T23:00:00+06:00",
    mapUrl: "https://maps.app.goo.gl/bR3sWXQsRL7mwT8n8",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=23%2C%20Sadar%20Hospital%20Road%2C%20Feni&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  reception: {
    key: "reception",
    title: "Reception",
    subtitle: "Platform 3 - A New Destination",
    dateLabel: "May 8, 2026",
    timeLabel: "2:00 PM",
    venue: "Grand Prince Convention Hall, Mirpur 12, Dhaka",
    address: "Mirpur 12, Dhaka",
    startsAtIso: "2026-05-08T14:00:00+06:00",
    endsAtIso: "2026-05-08T17:00:00+06:00",
    mapUrl: "https://maps.app.goo.gl/fmanQmkBDPVZtbb47",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Mirpur%2012%2C%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
};

export function isInviteType(value: string): value is InviteType {
  return value === "wedding" || value === "reception" || value === "both";
}

export function getEventsForType(type: InviteType): WeddingEvent[] {
  if (type === "wedding") return [events.wedding];
  if (type === "reception") return [events.reception];
  return [events.wedding, events.reception];
}

export function getInviteImageForType(type: InviteType): string {
  if (type === "wedding") return "/assets/images/invite-wedding-page4.jpg";
  if (type === "reception") return "/assets/images/invite-reception-page4.jpg";
  return "/assets/images/invite-wedding-reception-page4.jpg";
}
