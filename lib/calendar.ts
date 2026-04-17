import type { WeddingEvent } from "@/lib/events";

function toGoogleUtc(dateIso: string): string {
  const date = new Date(dateIso);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mi = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
}

export function createGoogleCalendarLink(event: WeddingEvent): string {
  const base = "https://calendar.google.com/calendar/render";
  const title =
    event.key === "wedding"
      ? "Wedding Ceremony of Partha and Trisa - Roushan's Party Center, Feni"
      : "Reception of Partha and Trisa - Grand Prince Convention Hall, Mirpur 12, Dhaka";

  const motivationalLine =
    event.key === "wedding"
      ? "Two souls, one ticket to forever."
      : "A beautiful journey continues with love, laughter, and blessings.";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toGoogleUtc(event.startsAtIso)}/${toGoogleUtc(event.endsAtIso)}`,
    details: `Groom: Partha Saha\nBride: Trisa Das\nEvent: ${event.title}\nAddress: ${event.address}\n${motivationalLine}`,
    location: event.venue,
  });

  return `${base}?${params.toString()}`;
}

function toIcsUtc(dateIso: string): string {
  const date = new Date(dateIso);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mi = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function createVEvent(event: WeddingEvent): string[] {
  const uid = `${event.key}-${event.startsAtIso}@platform3.invite`;
  const dtStamp = toIcsUtc(new Date().toISOString());
  const dtStart = toIcsUtc(event.startsAtIso);
  const dtEnd = toIcsUtc(event.endsAtIso);
  const summary = escapeIcs(`${event.title} - ${event.venue}`);
  const location = escapeIcs(event.venue);
  const description = escapeIcs(
    `${event.subtitle}\nAddress: ${event.address}\nTheme: Platform 3 Wedding Journey`
  );

  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
  ];
}

export function createIcsContent(events: WeddingEvent | WeddingEvent[]): string {
  const normalized = Array.isArray(events) ? events : [events];

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Platform3Invite//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...normalized.flatMap((event) => createVEvent(event)),
    "END:VCALENDAR",
  ].join("\r\n");
}
