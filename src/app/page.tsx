import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#353e43] text-white">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-20 pb-44 text-left text-[18px] leading-relaxed sm:px-8 lg:flex-row lg:items-center lg:pb-48">
        <div className="flex-1 space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">
            Your behind the scenes tech guy.
          </p>
          <p className="text-4xl font-black leading-tight text-white sm:text-5xl">
            CONTROL ALL OF YOUR ASSETTS.
          </p>
          <p className="text-base text-white/80">
            Quietly powering founders who want ownership without the noise.
          </p>
        </div>
        <div className="flex-1">
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            <Image
              src="/robin.png"
              alt="Hooded technologist working on a laptop"
              fill
              className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
              sizes="(max-width: 768px) 80vw, 420px"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
