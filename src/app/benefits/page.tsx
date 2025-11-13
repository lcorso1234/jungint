const callouts = [
  "Meet international design standards",
  "Be 3 years ahead of competition",
  "Save thousands right off the back",
  "Make money",
  "Control your assets",
  "Save time",
  "Be heard",
  "You own it",
  "Simply gets the job done",
];

const checklist = [
  "instantly reduce marketing hours",
  "track improved ROI",
  "AND most importantly, give you time back throughout the work week to do the things you love to do (FREEDOM)!",
  "No more staring at the computer screen copying and pasting to every platform. One click and we have you covered.",
  `"Blah blah blah", yep. Done.`,
  "It's that easy.",
  "Give us a call or schedule time with us today. Before last-minute shopping for gifts! (Busted! 😁)",
];

export default function BenefitsPage() {
  return (
    <div className="bg-[#353e43] text-white">
      <main className="mx-auto grid min-h-screen max-w-6xl gap-10 px-6 py-24 pb-44 sm:px-10 sm:pb-48 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.9fr)] lg:items-start">
        <section className="space-y-8 rounded-[32px] border border-[#f6f2ec]/30 bg-[#2a3237] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.4)]">
          <div className="space-y-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            <p>Benefits</p>
            <p className="text-white/40">Jung International</p>
          </div>
          <p className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Save thousands right off the back and stay heard.
          </p>
          <p className="text-lg text-white/80">
            Give us a call or simply connect with us when you&apos;re ready to get started. We can’t wait to help you take your business to the next level.
          </p>
          <div className="grid gap-4 text-sm font-semibold uppercase tracking-[0.35em] text-white/70 sm:grid-cols-2">
            {callouts.map((text) => (
              <div
                key={text}
                className="rounded-[12px] border border-[#f6f2ec]/20 bg-[#353e43] px-4 py-3 text-white"
              >
                {text}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-[32px] border border-[#f6f2ec]/30 bg-[#2a3237] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.4)]">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
            The Playbook
          </p>
          <div className="space-y-4 text-base text-white/85 sm:text-lg">
            {checklist.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[12px] border border-[#f6f2ec]/20 bg-[#353e43] px-4 py-3"
              >
                <span className="mt-1 text-base text-[#ffc371]">▹</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/60 sm:grid-cols-3">
            <div className="rounded-[12px] border border-[#f6f2ec]/20 bg-[#353e43] px-4 py-3 text-center">
              Standards
            </div>
            <div className="rounded-[12px] border border-[#f6f2ec]/20 bg-[#353e43] px-4 py-3 text-center">
              Reach
            </div>
            <div className="rounded-[12px] border border-[#f6f2ec]/20 bg-[#353e43] px-4 py-3 text-center">
              Ownership
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
