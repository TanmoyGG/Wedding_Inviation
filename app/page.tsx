import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_20%_20%,#fdf7ee_0%,#f4dfc5_45%,#eacaa5_100%)] p-6">
      <section className="w-full max-w-3xl rounded-3xl border border-wedding-journey-brass/45 bg-white/85 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-wedding-journey-maroon">
          Platform 3 Invitation
        </p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-wedding-journey-maroon">
          Parth Saha and Trisha Das
        </h1>
        <p className="mt-4 text-wedding-journey-charcoal/85">
          Step aboard and choose your invitation view.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/invite/wedding"
            className="rounded-full bg-wedding-journey-maroon px-5 py-2.5 text-sm font-semibold text-white"
          >
            Wedding
          </Link>
          <Link
            href="/invite/reception"
            className="rounded-full bg-wedding-journey-charcoal px-5 py-2.5 text-sm font-semibold text-white"
          >
            Reception
          </Link>
          <Link
            href="/invite/both"
            className="rounded-full bg-wedding-journey-brass px-5 py-2.5 text-sm font-semibold text-wedding-journey-charcoal"
          >
            Both Events
          </Link>
        </div>
      </section>
    </main>
  );
}
