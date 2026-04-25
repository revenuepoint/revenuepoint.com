'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const STEPS = [
  {
    eyebrow: 'STEP 1',
    title: 'User enters their email',
    body: 'No password to set, no password to reset. Just the email address you already use to do business.',
  },
  {
    eyebrow: 'STEP 2',
    title: 'Gateway evaluates the access rule',
    body: 'A code-defined rule per tenant — e.g., "is this an active Contact on Account X?". If the rule fails, no link is sent. The check is server-side, no UI surface to abuse.',
  },
  {
    eyebrow: 'STEP 3',
    title: 'Magic link sent via SendGrid',
    body: 'Single-use, short-TTL token (15 minutes by default). Logged in the audit trail with the access rule that approved it. No PII in the URL beyond the token.',
  },
  {
    eyebrow: 'STEP 4',
    title: 'Click → tenant resolved → portal loaded',
    body: 'Middleware reads the hostname, resolves the tenant, exchanges the token for a server-side session cookie, and renders the tenant\'s configured views.',
  },
];

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function MailI({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function ShieldI({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M12 2l9 4v6c0 5-4 9-9 11-5-2-9-6-9-11V6l9-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function LinkI({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </svg>
  );
}
function PortalI({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 14h4" />
    </svg>
  );
}
const STEP_ICONS = [MailI, ShieldI, LinkI, PortalI];

function StepEmail() {
  return (
    <div className="border border-border rounded-md bg-white p-5">
      <p className="text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-3">Sign in to acme.portal.revenuepoint.com</p>
      <label className="text-[11px] uppercase tracking-widest text-mutedText font-semibold">Work email</label>
      <div className="mt-1 flex items-center gap-2">
        <div className="flex-1 border border-crimson rounded-sm px-3 py-2 text-sm text-navy bg-white font-mono">
          maria.chen@acme.com<span className="animate-pulse">|</span>
        </div>
      </div>
      <button className="mt-4 px-4 py-2 rounded-sm bg-crimson text-white text-sm font-semibold w-full">
        Send me a magic link →
      </button>
      <p className="mt-3 text-[11px] text-mutedText leading-relaxed">
        We&apos;ll email you a one-time link. No password required.
      </p>
    </div>
  );
}

function StepRule() {
  return (
    <div className="border border-border rounded-md bg-navy text-white p-5 font-mono text-[12px] leading-relaxed">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-sans">Access rule check</p>
      <pre className="whitespace-pre overflow-x-auto">
{`access: (email) => isActiveContact(
  email,
  'Acme Corp',
)`}
      </pre>
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px] font-sans">
        <div>
          <p className="text-gray-400">Email</p>
          <p className="text-white font-mono">maria.chen@acme.com</p>
        </div>
        <div>
          <p className="text-gray-400">Result</p>
          <p className="text-emerald-400 font-semibold">PASS · Active Contact found</p>
        </div>
      </div>
    </div>
  );
}

function StepInbox() {
  return (
    <div className="border border-border rounded-md bg-white p-5">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <MailI className="h-4 w-4 text-mutedText" />
        <span className="text-[11px] uppercase tracking-widest text-mutedText font-semibold">Inbox</span>
      </div>
      <div className="pt-3 flex flex-col gap-2">
        <div className="border border-crimson/40 rounded-sm bg-crimsonLight/40 p-3">
          <p className="text-[10px] uppercase tracking-widest text-crimson font-semibold">From: Acme Portal &lt;portal@acme.com&gt;</p>
          <p className="text-sm text-navy font-semibold mt-0.5">Sign in to your Acme Portal</p>
          <p className="text-xs text-bodyText mt-1.5">
            Click the link below to sign in. This link expires in 15 minutes.
          </p>
          <span className="inline-block mt-2 text-[11px] font-mono text-crimson underline">
            acme.portal.revenuepoint.com/auth/cb?t=oo5_…ab9
          </span>
        </div>
      </div>
    </div>
  );
}

function StepPortal() {
  return (
    <div className="border border-border rounded-md bg-white p-5">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <span className="inline-flex items-center justify-center h-5 w-5 rounded text-white text-[9px] font-black bg-[#1A56DB]">
          AC
        </span>
        <span className="text-[11px] font-semibold text-navy">Acme Corp portal</span>
        <span className="ml-auto text-[10px] text-emerald-600 font-semibold">● Authenticated</span>
      </div>
      <div className="pt-3 grid grid-cols-2 gap-2">
        <div className="border border-border rounded-sm p-2">
          <p className="text-[9px] uppercase tracking-widest text-mutedText">Open Cases</p>
          <p className="text-base font-bold text-navy">14</p>
        </div>
        <div className="border border-border rounded-sm p-2">
          <p className="text-[9px] uppercase tracking-widest text-mutedText">Avg. Resolve</p>
          <p className="text-base font-bold text-navy">2.4d</p>
        </div>
        <div className="col-span-2 border border-border rounded-sm p-2">
          <p className="text-[9px] uppercase tracking-widest text-mutedText">Latest</p>
          <p className="text-xs text-navy mt-0.5">CS-10481 — Pallet shipment damaged on arrival</p>
        </div>
      </div>
    </div>
  );
}

const STEP_RIGHTS = [<StepEmail key="1" />, <StepRule key="2" />, <StepInbox key="3" />, <StepPortal key="4" />];

export function MagicLinkFlow() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused) return;
    tickRef.current = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, 3000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [paused]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left: step rail */}
      <div className="flex flex-col gap-3">
        {STEPS.map((s, i) => {
          const Icon = STEP_ICONS[i];
          const active = i === step;
          const past = i < step;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setStep(i)}
              className={`text-left flex items-start gap-3 rounded-md p-4 transition-colors border ${
                active
                  ? 'border-crimson bg-crimson/15 text-white'
                  : past
                  ? 'border-white/10 bg-white/[0.04] text-white/80'
                  : 'border-white/5 bg-transparent text-white/55 hover:border-white/20'
              }`}
            >
              <span
                className={`inline-flex items-center justify-center h-9 w-9 rounded-md shrink-0 ${
                  active ? 'bg-crimson text-white' : 'bg-white/10 text-white/80'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-gray-400'}`}>
                  {s.eyebrow}
                </p>
                <p className={`text-sm font-semibold ${active ? 'text-white' : 'text-white/85'}`}>
                  {s.title}
                </p>
                {active && (
                  <p className="mt-1.5 text-xs text-gray-300 leading-relaxed">{s.body}</p>
                )}
              </div>
            </button>
          );
        })}
        <p className="text-[11px] text-gray-500 mt-1">
          Hover to pause · click any step to jump.
        </p>
      </div>

      {/* Right: visual */}
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 lg:p-6 min-h-[360px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {STEP_RIGHTS[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
