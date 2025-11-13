export default function ValuesPage() {
  return (
    <div className="bg-[#353e43] text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-24 pb-44 sm:px-8 sm:pb-48 lg:px-12">
        <section className="space-y-4 rounded-[32px] border border-[#f6f2ec]/40 bg-[#2a3237] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.35)]">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Control all of your assets.
          </h1>
          <p className="text-lg text-slate-200 sm:text-xl">
            Architecture guided by American product sensibilities, designed in
            Ukraine, and implemented with a relentless attention to polish.
          </p>
        </section>

        <div className="space-y-6">
          {[
            {
              label: "Values",
              title: "American Style",
              body: "Independent and focused on giving total independence and freedom to our customers.",
            },
            {
              label: "Craft",
              title: "Ukraine Designed",
              body: "Relentless iteration to keep the experience durable and attention to detail to allow your business to meet international design standards.",
            },
            {
              label: "Product",
              title: "The Genius Engine",
              body:
                "Our proprietary automation stack that powers launches, audits, and ongoing support for small businesses.",
            },
          ].map((item) => (
            <section
              key={item.title}
              className="rounded-[28px] border border-[#f6f2ec]/30 bg-[#2f383c] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
                {item.label}
              </p>
              <h2 className="text-3xl font-semibold leading-snug text-white">
                {item.title}
              </h2>
              <p className="text-base text-slate-200 sm:text-lg">{item.body}</p>
            </section>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#f6f2ec]/20 px-6 py-4 text-xs uppercase tracking-[0.4em] text-white/60">
          <span>Built to last.</span>
          <span>Logic by iTech</span>
        </div>
      </main>
    </div>
  );
}
