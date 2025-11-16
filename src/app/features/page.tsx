export default function FeaturesPage() {
  return (
    <div className="bg-[#353e43] text-white">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-24 pb-44 text-[18px] leading-relaxed sm:px-8 sm:pb-48">
        <section className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">
            Features
          </p>
          <p className="text-4xl font-semibold text-white">
            Own everything you publish.
          </p>
          <p className="text-base text-white/80">
            One control panel handles podcasts, videos, galleries, and blogs.
            One login manages memberships, gated content, and automations so the
            experience behaves like a web app.
          </p>
        </section>

        <section className="space-y-2">
          <p className="text-base text-white/80">
            We operate around the world getting you what you need when you need
            it.
          </p>
        </section>
      </main>
    </div>
  );
}
