import Image from "next/image";

const storyCopy = [
  "When life gave you a basket, you turned that basket into a fruit business. You don’t settle for what others think of you because you know you’ve got “something.”",
  "Your idea keeps you up at night, and if you don’t get the right support it may not come to fruition. Your ulterior motives are to help the ones you love. The problem is you can’t find someone who will go the whole way with you.",
  "The piece of the puzzle you’re missing is the behind the scenes “tech guy.” The guy who knows all the latest technology and provides guidance that can’t be found in any book.",
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#353e43] text-slate-100">
      <main className="relative mx-auto grid min-h-screen max-w-6xl gap-12 px-6 py-20 pb-44 text-left text-base text-slate-200 sm:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,1fr)] lg:gap-16 lg:pb-48">
        <section className="space-y-8 rounded-[32px] border border-[#f6f2ec]/50 bg-[#2a3237] p-8 shadow-[0_20px_80px_rgba(5,10,30,0.45)]">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
            For the Few of the Many,{" "}
            <span className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] bg-clip-text text-transparent">
              Control your Assets.
            </span>
          </h1>

          <div className="space-y-5 text-lg text-slate-200">
            {storyCopy.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

        </section>

        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[360px] rounded-[32px] border border-[#f6f2ec]/50 bg-[#2a3237] p-8">
            <Image
              src="/robin.png"
              alt="Hooded technologist working on a laptop"
              fill
              sizes="(max-width: 768px) 70vw, 360px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
