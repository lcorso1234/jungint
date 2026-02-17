/**
 * Home hero image doubles as a quick "save contact" CTA.
 */
"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

const JUNG_SMS_NUMBER = "17089326851";

function sanitizePhoneForVCard(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function escapeVCardValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export default function HomePage() {
  const [isSmsPromptOpen, setIsSmsPromptOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [formError, setFormError] = useState("");

  const handleSaveContact = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/contact.vcf";
    link.download = "jung-tech-contact.vcf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Let the save contact action fire first, then ask about SMS follow-up.
    window.setTimeout(() => {
      setIsSmsPromptOpen(true);
    }, 350);
  }, []);

  const handleSendSms = useCallback(() => {
    const name = leadName.trim();
    const email = leadEmail.trim();
    const phone = leadPhone.trim();
    const normalizedPhone = sanitizePhoneForVCard(phone);

    if (!name || !email || !phone) {
      setFormError("Enter name, email, and phone.");
      return;
    }

    setFormError("");

    const shareableVCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCardValue(name)}`,
      `TEL;TYPE=CELL:${escapeVCardValue(normalizedPhone || phone)}`,
      `EMAIL:${escapeVCardValue(email)}`,
      "END:VCARD",
    ].join("\n");

    const smsBody = [
      "Hi Jung Tech, I just saved your contact.",
      "",
      "My details:",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      "",
      "Shareable contact:",
      shareableVCard,
    ].join("\n");

    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const separator = isiOS ? "&" : "?";
    const smsHref = `sms:${JUNG_SMS_NUMBER}${separator}body=${encodeURIComponent(smsBody)}`;

    window.location.href = smsHref;
  }, [leadEmail, leadName, leadPhone]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#353e43] text-white">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-20 pb-44 text-left text-[18px] leading-relaxed sm:px-8 lg:flex-row lg:items-center lg:pb-48">
        <div className="flex-1 space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">
            Your behind the scenes tech guy.
          </p>
          <p className="text-4xl font-black leading-tight text-white sm:text-5xl">
            CONTROL ALL OF YOUR ASSETS.
          </p>
          <p className="text-base text-white/80">
            Empowering the dreamers and the risk-takers around the world, built
            in America, the Land of the Free.
          </p>
        </div>
        <div className="flex-1">
          <button
            type="button"
            onClick={handleSaveContact}
            className="relative mx-auto block aspect-square w-full max-w-[420px] rounded-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
            aria-label="Tap the hero image to save Jung Tech contact info"
          >
            <Image
              src="/robin.png"
              alt="Hooded technologist working on a laptop"
              fill
              className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
              sizes="(max-width: 768px) 80vw, 420px"
              priority
            />
          </button>
        </div>
      </main>

      {isSmsPromptOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Send text message with your details"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#2d3439] p-5 shadow-2xl">
            <p className="text-xl font-bold text-white">Send a text now?</p>
            <p className="mt-2 text-sm text-white/75">
              Your contact is downloading. Add your details to prefill a text
              and include a shareable contact card.
            </p>

            <label className="mt-4 block text-sm text-white/85" htmlFor="lead-name">
              Name
            </label>
            <input
              id="lead-name"
              type="text"
              value={leadName}
              onChange={(event) => setLeadName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/45 focus:border-white/60"
              placeholder="Your full name"
              autoComplete="name"
            />

            <label className="mt-4 block text-sm text-white/85" htmlFor="lead-phone">
              Phone number
            </label>
            <input
              id="lead-phone"
              type="tel"
              value={leadPhone}
              onChange={(event) => setLeadPhone(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/45 focus:border-white/60"
              placeholder="(555) 123-4567"
              autoComplete="tel"
            />

            <label className="mt-3 block text-sm text-white/85" htmlFor="lead-email">
              Email
            </label>
            <input
              id="lead-email"
              type="email"
              value={leadEmail}
              onChange={(event) => setLeadEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/45 focus:border-white/60"
              placeholder="you@example.com"
              autoComplete="email"
            />

            {formError ? (
              <p className="mt-3 text-sm text-[#ffb4b4]">{formError}</p>
            ) : null}

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormError("");
                  setIsSmsPromptOpen(false);
                }}
                className="flex-1 rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                No thanks
              </button>
              <button
                type="button"
                onClick={handleSendSms}
                className="flex-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#2f383d] transition hover:bg-white/90"
              >
                Open SMS
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
