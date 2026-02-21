export default function ValuesPage() {
  return (
    <div className="relative overflow-hidden bg-[#353e43] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-[0.35]"
        style={{ backgroundImage: "url('/ru.svg')", backgroundSize: "cover" }}
      />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-24 pb-44 text-[18px] leading-relaxed sm:px-8 sm:pb-48 lg:px-12">
        <section className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">
            Values
          </p>
        </section>

        <section className="space-y-2">
          <p className="text-2xl font-semibold text-white">
            the Future, Now.
          </p>
          <p className="text-base text-white/80">
            We are instilling a culture of innocence and play in everything we
            do, with a little bit of grit to protect that innocence.
          </p>
          <p className="text-base font-semibold text-white">
            Motivated by love alone.
          </p>
        </section>
      </main>
    </div>
  );
}
