"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type SVGProps } from "react";

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

const callHref = "tel:+17089326851";
const emailHref =
  "mailto:contact@jungint.com?subject=Need%20tech%20support&body=Hi%20Jung%20Tech%20Team%2C%0A%0AI%20need%20help%20with...";

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
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  download?: string;
  animate?: boolean;
  onClick?: () => void;
};

const mobileSaveAction: MobileAction = {
  ...saveContactLink,
  icon: ContactCardIcon,
  animate: true,
};

export default function FloatingNav() {
  const pathname = usePathname();
  const [hasSavedContact, setHasSavedContact] = useState(false);

  const currentIndex = navLinks.findIndex((link) => link.href === pathname);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextNavLink = navLinks[(safeIndex + 1) % navLinks.length];
  const prevNavLink =
    navLinks[(safeIndex - 1 + navLinks.length) % navLinks.length];

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4">
      <div className="hidden items-center justify-between gap-4 rounded-[8px] border border-white/10 bg-[#353e43]/95 px-4 py-3 text-sm text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur lg:flex">
        <div className="flex items-center">
          <a
            href={saveContactLink.href}
            download={saveContactLink.download}
            aria-label={saveContactLink.label}
            className="grid h-12 w-12 place-items-center rounded-[8px] bg-gradient-to-br from-pink-500 to-amber-400 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_35px_rgba(231,72,128,0.45)] transition hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          >
            <BookmarkIcon className="h-6 w-6 text-white" />
          </a>
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
          <div className="flex items-center justify-between gap-2">
            <MobileActionButton
              {...mobileSaveAction}
              animate={!hasSavedContact}
              onClick={() => setHasSavedContact(true)}
            />
            <DirectionalNavButton label="Prev" target={prevNavLink} reverse />
            <DirectionalNavButton label="Next" target={nextNavLink} />
          </div>
        </div>
      </div>
    </nav>
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
  return (
    <a
      href={href}
      download={download}
      aria-label={label}
      onClick={onClick}
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

type DirectionalProps = {
  label: string;
  target: { label: string; href: string };
  onNavigate?: () => void;
  reverse?: boolean;
};

function DirectionalNavButton({
  label,
  target,
  onNavigate,
  reverse,
}: DirectionalProps) {
  return (
    <Link
      href={target.href}
      aria-label={`${label} page: ${target.label}`}
      onClick={() => onNavigate?.()}
      className="group flex min-w-[118px] flex-col items-center rounded-[8px] border border-white/25 bg-[#2a3237] px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/60"
    >
      <span className="text-[10px] tracking-[0.4em] text-white/70">
        {label}
      </span>
      <span className="flex items-center gap-2 text-sm capitalize">
        {reverse && (
          <ArrowIcon
            className="h-4 w-4 text-white transition group-hover:-translate-x-1 motion-safe:group-hover:animate-pulse"
            reverse
          />
        )}
        {target.label}
        {!reverse && (
          <ArrowIcon className="h-4 w-4 text-white transition group-hover:translate-x-1 motion-safe:group-hover:animate-pulse" />
        )}
      </span>
    </Link>
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
