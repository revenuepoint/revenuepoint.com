'use client';

import { useState } from 'react';

type Block = 'domain' | 'connection' | 'auth' | 'views' | 'theme';

const BLOCKS: { id: Block; label: string; eyebrow: string }[] = [
  { id: 'domain', label: 'Domain', eyebrow: 'TENANT URL' },
  { id: 'connection', label: 'Connection', eyebrow: 'DATA SOURCE' },
  { id: 'auth', label: 'Auth & access', eyebrow: 'WHO GETS IN' },
  { id: 'views', label: 'Views', eyebrow: 'WHAT THEY SEE' },
  { id: 'theme', label: 'Theme', eyebrow: 'BRAND' },
];

const NARRATIVES: Record<Block, string> = {
  domain:
    'The hostname Gateway listens for. Middleware reads the request hostname, finds the matching tenant config, and routes the request through that tenant\'s connection and views — all before any handler runs.',
  connection:
    'Pluggable adapter for the source system. Each connection handles auth (OAuth, service user, mTLS), per-object permissions, and the data ops the tenant\'s views are allowed to call. New systems plug in by implementing the connector interface.',
  auth:
    'Two pieces. The provider defines how users authenticate — magic link via SendGrid, password-less, single-use tokens. The access function decides who is allowed in. Code-defined, server-evaluated, never client-trusted.',
  views:
    'The tenant\'s portal pages. Each view is a typed component — a table, a form, a detail layout, a dashboard — wired to the connection. Add a view, the tenant gets a new page; remove it, it\'s gone. Versioned in Git.',
  theme:
    'Per-tenant branding — logo, primary color, favicon. Drives the portal header, the email template, the loading state. No CSS hacks, no shared variables — each tenant\'s theme is a typed object.',
};

const HIGHLIGHT_BG = 'bg-crimson/15';
const HIGHLIGHT_BORDER = 'border-l-2 border-crimson pl-2';

function CodeBlock({ active }: { active: Block }) {
  // We render the entire defineTenant config; each block is wrapped in a span we can style
  // depending on the active selection.
  const cls = (b: Block) =>
    active === b ? `${HIGHLIGHT_BG} ${HIGHLIGHT_BORDER} -ml-2` : '';
  return (
    <pre className="text-[12.5px] font-mono leading-relaxed text-white overflow-x-auto whitespace-pre">
{'export default '}
<span className="text-crimson">defineTenant</span>
{'({\n'}
<span className={`block transition-colors duration-200 rounded-sm ${cls('domain')}`}>
{'  domain: '}<span className="text-emerald-300">{`'acme.portal.revenuepoint.com'`}</span>{',\n'}
</span>
<span className={`block transition-colors duration-200 rounded-sm ${cls('connection')}`}>
{'  connection: '}<span className="text-amber-300">salesforce</span>{'({\n'}
{'    instanceUrl: process.env.ACME_SF_URL,\n'}
{'    auth: { type: '}<span className="text-emerald-300">{`'service-user'`}</span>{', secretRef: '}<span className="text-emerald-300">{`'acme/sf-svc'`}</span>{' },\n'}
{'  }),\n'}
</span>
<span className={`block transition-colors duration-200 rounded-sm ${cls('auth')}`}>
{'  auth: {\n'}
{'    provider: '}<span className="text-amber-300">magicLink</span>{'({ sendgridKey: process.env.SENDGRID_KEY }),\n'}
{'    access: (email) => '}<span className="text-amber-300">isActiveContact</span>{'(email, '}<span className="text-emerald-300">{`'Acme Corp'`}</span>{'),\n'}
{'  },\n'}
</span>
<span className={`block transition-colors duration-200 rounded-sm ${cls('views')}`}>
{'  views: [\n'}
{'    '}<span className="text-amber-300">casesTable</span>{'({ label: '}<span className="text-emerald-300">{`'Open Cases'`}</span>{', filter: { Status__c: '}<span className="text-emerald-300">{`'Open'`}</span>{' } }),\n'}
{'    '}<span className="text-amber-300">recordDetail</span>{'({ sobject: '}<span className="text-emerald-300">{`'Case'`}</span>{', layout: '}<span className="text-emerald-300">{`'portal-default'`}</span>{' }),\n'}
{'    '}<span className="text-amber-300">recordForm</span>{'({ label: '}<span className="text-emerald-300">{`'New Case'`}</span>{', sobject: '}<span className="text-emerald-300">{`'Case'`}</span>{' }),\n'}
{'  ],\n'}
</span>
<span className={`block transition-colors duration-200 rounded-sm ${cls('theme')}`}>
{'  theme: {\n'}
{'    logo: '}<span className="text-emerald-300">{`'/tenants/acme/logo.svg'`}</span>{',\n'}
{'    primaryColor: '}<span className="text-emerald-300">{`'#1A56DB'`}</span>{',\n'}
{'  },\n'}
</span>
{'})'}
    </pre>
  );
}

export function ConfigViewer() {
  const [selected, setSelected] = useState<Block>('domain');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6 lg:gap-8 items-start">
      {/* Narrative + block picker */}
      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-crimson">
          tenants/acme.ts
        </p>
        <p className="text-sm text-bodyText leading-relaxed mb-2">
          One file per tenant. Domain, connection, auth, views, theme — all here, all typed,
          all in Git. Click a block to see what it does.
        </p>
        <div className="flex flex-col gap-2">
          {BLOCKS.map((b) => {
            const active = b.id === selected;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelected(b.id)}
                className={`text-left rounded-md px-4 py-3 border transition-colors ${
                  active
                    ? 'border-crimson bg-crimsonLight'
                    : 'border-border bg-white hover:border-crimson/40'
                }`}
                aria-pressed={active}
              >
                <p className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-crimson' : 'text-mutedText'}`}>
                  {b.eyebrow}
                </p>
                <p className="text-sm font-semibold text-navy mt-0.5">{b.label}</p>
                {active && (
                  <p className="text-xs text-bodyText mt-2 leading-relaxed">{NARRATIVES[b.id]}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Annotated code */}
      <div className="rounded-lg bg-navy text-white p-5 lg:p-6 border border-border shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-white/10">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[11px] font-mono text-gray-400">tenants/acme.ts</span>
        </div>
        <CodeBlock active={selected} />
      </div>
    </div>
  );
}
