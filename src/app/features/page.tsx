const featurePoints = [
  {
    title: "Own your social platform",
    body: "{podcast, videos, gallery, blog} all publishing from one control panel.",
  },
  {
    title: "Web app disguised as a website",
    body: "Be 3+ years ahead of the curve with a web app that looks like a website.",
  },
  {
    title: "Customer nurturing system",
    body: "Nurture your customers successfully with modern strategy instead of more money out of pocket.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-[#353e43] text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-20 pb-44 text-left sm:px-10 sm:pb-48">
        <section className="space-y-8 rounded-[32px] border border-[#f6f2ec]/40 bg-[#2a3237] p-8 shadow-[0_15px_60px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.45em] text-white/70">
            Features
          </p>
          <h1 className="text-5xl font-black uppercase tracking-[0.08em] text-white sm:text-[3.5rem]">
            Own Everything You Publish
          </h1>
          <div className="space-y-6">
            {featurePoints.map((point) => (
              <div
                key={point.title}
                className="rounded-3xl border border-[#f6f2ec]/30 bg-[#353e43] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              >
                <p className="text-base font-semibold uppercase tracking-[0.25em] text-white/70">
                  {point.title}
                </p>
                <p className="mt-2 text-lg leading-relaxed text-slate-200">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
          <ul className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            <li>Podcast</li>
            <li>Video</li>
            <li>Gallery</li>
            <li>Blog</li>
          </ul>
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">
            You publish. The Genius Engine syndicates.
          </p>
        </section>
      </main>
    </div>
  );
}
