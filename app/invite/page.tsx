import Link from "next/link";

const options = [
  {
    href: "/invite/wedding",
    title: "Wedding",
    description: "May 3, 2026 - Roushan's Party Center, Feni",
  },
  {
    href: "/invite/reception",
    title: "Reception",
    description: "May 8, 2026 - Grand Prince Convention Hall, Mirpur 12, Dhaka",
  },
  {
    href: "/invite/both",
    title: "Wedding + Reception",
    description: "View full journey timeline with both events",
  },
];

export default function InviteIndexPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f9efdf_0%,#f2dcc4_100%)] px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-5xl text-wedding-journey-maroon">Choose Your Invite View</h1>
        <p className="mt-3 text-wedding-journey-charcoal/80">
          Open a dedicated invitation link depending on the event details you need.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {options.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="rounded-2xl border border-wedding-journey-brass/45 bg-white/80 p-5 shadow-ticket transition hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-wedding-journey-maroon">{option.title}</h2>
              <p className="mt-2 text-sm text-wedding-journey-charcoal/80">{option.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
