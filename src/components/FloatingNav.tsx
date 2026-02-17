"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Values", href: "/values" },
  { label: "Features", href: "/features" },
  { label: "Benefits", href: "/benefits" },
];

const saveContactLink = {
  label: "Save Contact",
  href: "/contact.vcf",
  download: "jung-tech-contact.vcf",
};
const JUNG_SMS_NUMBER = "17089326851";

const callHref = "tel:+17089326851";
const emailHref =
  "mailto:lawrence@rumidesign.tech?subject=Let's%20Build%20My%20Platform&body=Hi%20Lawrence%2C%0A%0AI'm%20interested%20in%20building%20my%20own%20platform.%20Can%20we%20discuss%20how%20to%20get%20started%3F%0A%0AThanks!";

const quickActions = [
  {
    label: "Call",
    href: callHref,
    emoji: "📱",
  },
  {
    label: "Email",
    href: emailHref,
    emoji: "✉️",
  },
];

type MobileAction = {
  label: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  download?: string;
  animate?: boolean;
  onClick?: () => void;
};

const mobileSaveAction: MobileAction = {
  ...saveContactLink,
  icon: ContactCardIcon,
  animate: true,
};

function sanitizePhoneForVCard(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function escapeVCardValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export default function FloatingNav() {
  const pathname = usePathname();
  const [hasSavedContact, setHasSavedContact] = useState(false);
  const [isSmsPromptOpen, setIsSmsPromptOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [formError, setFormError] = useState("");

  const handleSaveContact = useCallback(() => {
    const link = document.createElement("a");
    link.href = saveContactLink.href;
    link.download = saveContactLink.download;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setHasSavedContact(true);
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
    <>
      <nav className="fixed bottom-4 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4">
      <div className="hidden items-center justify-between gap-4 rounded-[8px] border border-white/10 bg-[#353e43]/95 px-4 py-3 text-sm text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur lg:flex">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleSaveContact}
            aria-label={saveContactLink.label}
            className="grid h-12 w-12 place-items-center rounded-[8px] bg-gradient-to-br from-pink-500 to-amber-400 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_35px_rgba(231,72,128,0.45)] transition hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          >
            <BookmarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        <ul className="flex flex-1 items-center justify-center gap-3 text-white/80">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-w-[100px] items-center justify-center rounded-[8px] border px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                    active
                      ? "border-transparent bg-[#f5ff4e] text-[#111]"
                      : "border-white/20 text-white/70 hover:border-white hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              aria-label={action.label}
              className="grid h-12 w-12 place-items-center rounded-[8px] border border-white/10 bg-gradient-to-br from-pink-500 to-amber-400 text-lg text-white shadow-inner shadow-white/20 transition hover:translate-y-[-1px]"
            >
              {action.emoji}
            </a>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-sm rounded-[8px] border border-white/10 bg-[#353e43] p-3 text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-3">
            <MobileActionButton
              {...mobileSaveAction}
              animate={!hasSavedContact}
              onClick={handleSaveContact}
            />
            <MobileNextButton currentPath={pathname} />
          </div>
        </div>
      </div>

      </nav>

      {isSmsPromptOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Send text message with your details"
          onClick={() => {
            setFormError("");
            setIsSmsPromptOpen(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/20 bg-[#2d3439] p-5 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xl font-bold text-white">Send a text now?</p>
            <p className="mt-2 text-sm text-white/75">
              Your contact is downloading. Add your details to prefill a text
              and include a shareable contact card.
            </p>

            <label className="mt-4 block text-sm text-white/85" htmlFor="nav-lead-name">
              Name
            </label>
            <input
              id="nav-lead-name"
              type="text"
              value={leadName}
              onChange={(event) => setLeadName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/45 focus:border-white/60"
              placeholder="Your full name"
              autoComplete="name"
            />

            <label className="mt-3 block text-sm text-white/85" htmlFor="nav-lead-phone">
              Phone number
            </label>
            <input
              id="nav-lead-phone"
              type="tel"
              value={leadPhone}
              onChange={(event) => setLeadPhone(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/45 focus:border-white/60"
              placeholder="(555) 123-4567"
              autoComplete="tel"
            />

            <label className="mt-3 block text-sm text-white/85" htmlFor="nav-lead-email">
              Email
            </label>
            <input
              id="nav-lead-email"
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
    </>
  );
}

function MobileActionButton({
  label,
  href,
  icon: Icon,
  download,
  animate,
  onClick,
}: MobileAction) {
  const onActionClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!onClick) return;
    event.preventDefault();
    onClick();
  };

  return (
    <a
      href={href}
      download={download}
      aria-label={label}
      onClick={onActionClick}
      className={`grid h-14 w-14 flex-shrink-0 place-items-center rounded-[8px] bg-gradient-to-br from-pink-500 to-amber-400 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_35px_rgba(231,72,128,0.45)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
        animate ? "motion-safe:animate-bounce" : "hover:-translate-y-[2px]"
      }`}
    >
      <Icon className="h-6 w-6 text-white" />
    </a>
  );
}

function BookmarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M6.5 4h11a1.5 1.5 0 0 1 1.5 1.5V21l-7-4-7 4V5.5A1.5 1.5 0 0 1 6.5 4z"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactCardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect
        x={4.5}
        y={5}
        width={15}
        height={14}
        rx={2.2}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5a2.2 2.2 0 1 1 4.4 0A2.2 2.2 0 0 1 9 9.5"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path
        d="M7.8 15.5c.4-1.5 1.9-2.6 3.5-2.6h1.4c1.6 0 3.1 1.1 3.5 2.6"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 9.2h1.2M17.2 12h1.2"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({
  reverse,
  ...props
}: SVGProps<SVGSVGElement> & { reverse?: boolean }) {
  const transform = reverse ? "scale(-1,1)" : undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      style={{ transform }}
      {...props}
    >
      <path
        d="M5 12h14"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m13 6 6 6-6 6"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNextButton({ currentPath }: { currentPath: string }) {
  const homeIndex = navLinks.findIndex((link) => link.href === "/");
  const currentIndex = navLinks.findIndex((link) => link.href === currentPath);
  const baseIndex = currentIndex === -1 ? homeIndex : currentIndex;
  const nextLink = navLinks[(baseIndex + 1) % navLinks.length];
  const prevLink = navLinks[(baseIndex - 1 + navLinks.length) % navLinks.length];

  // Use router for programmatic navigation so we can decide next/prev at click time
  const { push } = useRouter();

  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    // Decide direction by where the user taps: left half = Previous, right half = Next
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const goPrev = clickX < rect.width / 2;
    e.preventDefault();
    push(goPrev ? prevLink.href : nextLink.href);
  };

  return (
    <a
      href={nextLink.href}
      onClick={onClick}
      className="flex flex-1 items-center justify-between rounded-[8px] border border-white/25 bg-[#2a3237] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/60"
      aria-label={`Tap right for ${nextLink.label}, left for ${prevLink.label}`}
    >
      <span className="flex items-center gap-2 text-white/70">
        <ArrowIcon className="h-4 w-4 text-white/70" reverse />
        Prev
      </span>
      <span className="flex items-center gap-2 text-sm">
        {nextLink.label}
        <ArrowIcon className="h-4 w-4 text-white" />
      </span>
    </a>
  );
}
