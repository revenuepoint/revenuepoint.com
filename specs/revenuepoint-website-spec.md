# RevenuePoint Website Redesign — Full Spec v2

---

## Overview

Complete redesign of revenuepoint.com. The new site unifies three service lines under one cohesive brand and positions RevenuePoint as a full-service technology and intelligence partner for mid-market businesses:

1. **Salesforce Managed Services & Consulting** — existing core business
2. **SAP Managed Services** — existing core business
3. **Foundry** — new managed data orchestration and AI platform

Static site — no CMS, no database. All lead capture uses Salesforce Web-to-Lead. No Formspree or third-party form services.

---

## Technology Stack

**Framework:** Next.js with static export (`output: 'export'` in `next.config.js`)
**Styling:** Tailwind CSS
**Hosting:** Vercel — zero-config Next.js, automatic HTTPS, CDN, custom domain
**Forms:** Salesforce Web-to-Lead (see Forms section below)
**Analytics:** Google Analytics 4 or Plausible — script tag in `_document.tsx`

---

## Brand & Design System

### Color Palette

RevenuePoint's wordmark is `#8B0A39` — a deep crimson/burgundy. The palette builds around this as the primary brand color with navy as the structural dark and clean whites and grays for content surfaces. The result is authoritative and premium — distinctly different from the Salesforce-blue world most CRM consultancies default to.

| Token | Hex | Usage |
|---|---|---|
| `crimson` | `#8B0A39` | Primary brand — logo, primary CTAs, key accents, active nav, eyebrows |
| `crimsonDark` | `#6B0829` | Hover/pressed state on crimson elements |
| `crimsonLight` | `#F9EEF2` | Tinted background for callouts, subtle card accents |
| `navy` | `#0F2B4D` | Structural dark — hero backgrounds, footer, dark CTA sections |
| `navyMid` | `#1A3F6F` | Secondary dark — card backgrounds on dark sections, table rows |
| `white` | `#FFFFFF` | Primary page background |
| `offWhite` | `#F7F9FC` | Alternating section background |
| `lightGray` | `#EEF2F7` | Card backgrounds, placeholder fills, table stripes |
| `border` | `#D4DDE8` | Card borders, dividers, input outlines |
| `bodyText` | `#2C3E50` | All body copy |
| `mutedText` | `#6B8299` | Labels, captions, secondary text, placeholders |
| `green` | `#1A7A4A` | Checkmarks, success states |
| `amber` | `#B45309` | Warning states |
| `red` | `#C0392B` | Error states, form validation, negative comparison cells |

### Palette Application Rules

- **Crimson** is the only action color. All primary CTA buttons, the wordmark, section eyebrows, and decorative bars use it exclusively.
- **Navy** is the structural dark. Hero sections, the footer, and CTA banners use navy backgrounds. Crimson accents on navy are the strongest brand moment.
- **White and off-white** alternate for content sections. No other background colors.
- **Crimson is never used as a large background behind body text** — only for buttons, thin bars (4–6px), and small accents.
- The palette has no blue. This is intentional — it separates RevenuePoint from Salesforce visual identity and from most BI/analytics competitors.

### Typography

All type uses the system font stack via Tailwind defaults (San Francisco on Mac, Segoe UI on Windows, sans-serif fallbacks).

| Element | Tailwind classes |
|---|---|
| H1 | `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight` |
| H2 | `text-3xl font-bold tracking-tight text-navy` |
| H3 | `text-xl font-semibold text-navy` |
| Eyebrow | `text-xs font-bold uppercase tracking-widest text-crimson` |
| Body | `text-base text-bodyText leading-relaxed` |
| Muted | `text-sm text-mutedText` |
| CTA Primary | `bg-crimson text-white font-semibold px-6 py-3 hover:bg-crimsonDark transition-colors` |
| CTA Secondary | `border-2 border-crimson text-crimson font-semibold px-6 py-3 hover:bg-crimsonLight transition-colors` |
| CTA Ghost (on navy) | `border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white hover:text-navy transition-colors` |

### Visual Motifs (carry across all pages)

- **4px crimson left bar** on feature/service cards on light backgrounds — `w-1 bg-crimson`
- **6px crimson top bar** on card headers on dark (navy) backgrounds
- **Thin crimson rule** (40px wide, 3px tall) between eyebrow and headline in hero sections
- **Navy backgrounds** for hero, footer, CTA banners — never mid-page content sections
- **Card treatment:** white fill, `border border-[#D4DDE8]`, `shadow-sm`, `rounded-sm` (minimal radius — clean, not bubbly)
- No gradients. No decorative illustrations. Product screenshots and simple geometric shapes only.

---

## Salesforce Web-to-Lead — Form Integration Spec

All lead capture forms on the site submit to Salesforce via Web-to-Lead. This is the existing mechanism on the current site and must be preserved exactly. No third-party form services.

### How Web-to-Lead Works

Web-to-Lead is a native Salesforce feature that generates an HTML `<form>` which POSTs directly to:
```
https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8
```

Salesforce receives the POST and creates a new Lead record in your CRM. It then optionally sends an auto-response email to the prospect and a notification email to the assigned owner.

### Generating the Form Code

In Salesforce Setup: search "Web-to-Lead" → Web-to-Lead Settings → Create Web-to-Lead Form. Select fields, set Return URL to `https://revenuepoint.com/thank-you/`, enable reCAPTCHA, click Generate. Copy the resulting HTML — the `oid` value in the hidden field is your org ID.

**The existing site already has a working Web-to-Lead form.** The developer should extract the `oid` value from the existing form's hidden field rather than regenerating. The `retURL` should be updated to the new thank-you page.

### Required Hidden Fields

Every form on the site must include these hidden fields:

```html
<input type="hidden" name="oid" value="[SALESFORCE_ORG_ID]">
<input type="hidden" name="retURL" value="https://revenuepoint.com/thank-you/">
<input type="hidden" name="lead_source" value="Web">
```

### Page-Source Tracking Field

Add a custom Salesforce Lead field (e.g. "Interested In" — text or picklist) and get its field ID from Setup → Object Manager → Lead → Fields. Use this to track which service line each lead is interested in:

```html
<!-- On /salesforce/ and its sub-pages -->
<input type="hidden" name="00N[field_id]" value="Salesforce">

<!-- On /sap/ pages -->
<input type="hidden" name="00N[field_id]" value="SAP">

<!-- On /foundry/ pages -->
<input type="hidden" name="00N[field_id]" value="Foundry">

<!-- On /contact/ — JavaScript sets this from the ?interest= URL param -->
<input type="hidden" name="00N[field_id]" id="interest_hidden" value="General">
<script>
  const params = new URLSearchParams(window.location.search);
  const interest = params.get('interest');
  if (interest) document.getElementById('interest_hidden').value = interest;
</script>
```

### reCAPTCHA

Enable reCAPTCHA v2 in Salesforce Web-to-Lead settings (Setup → Web-to-Lead → check "Require reCAPTCHA Verification" → enter Google reCAPTCHA Site Key and Secret Key). Salesforce generates the reCAPTCHA script tag and hidden fields — paste the generated block into every form. This prevents spam without any additional service or subscription.

### Standard Form Fields

| Display label | Salesforce field name | Input type | Required |
|---|---|---|---|
| First Name | `first_name` | text | yes |
| Last Name | `last_name` | text | yes |
| Work Email | `email` | email | yes |
| Phone | `phone` | tel | no |
| Company Name | `company` | text | yes |
| Company Website | `URL` | url | no |
| Annual Revenue | `revenue` | select | no |
| How did you hear about us | `00N[field_id]` (custom) | text | no |
| Interested In | `00N[field_id]` (custom) | hidden | yes |

### Revenue Dropdown Options

The existing site uses "Less than $1M / $1M–$5M / $5M+". Expand to give better lead qualification signal:

```html
<select name="revenue">
  <option value="">Annual Revenue (optional)</option>
  <option value="Under $1M">Under $1M</option>
  <option value="$1M–$5M">$1M–$5M</option>
  <option value="$5M–$20M">$5M–$20M</option>
  <option value="$20M+">$20M+</option>
</select>
```

### React Component Pattern

```tsx
// components/LeadForm.tsx
// Wraps Salesforce Web-to-Lead HTML in Tailwind-styled markup

const inputClass = "w-full border border-[#D4DDE8] px-4 py-3 text-sm text-bodyText placeholder:text-mutedText focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson";

export function LeadForm({ interest }: { interest: string }) {
  return (
    <form
      action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
      method="POST"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Required Salesforce hidden fields */}
      <input type="hidden" name="oid" value={process.env.NEXT_PUBLIC_SF_OID} />
      <input type="hidden" name="retURL" value="https://revenuepoint.com/thank-you/" />
      <input type="hidden" name="lead_source" value="Web" />
      <input type="hidden" name="00N[field_id]" value={interest} />

      <input name="first_name" placeholder="First Name *" required className={inputClass} />
      <input name="last_name" placeholder="Last Name *" required className={inputClass} />
      <input name="email" type="email" placeholder="Work Email *" required className={inputClass} />
      <input name="phone" type="tel" placeholder="Phone" className={inputClass} />
      <input name="company" placeholder="Company Name *" required className={inputClass} />
      <input name="URL" type="url" placeholder="Company Website" className={inputClass} />

      <select name="revenue" className={`${inputClass} col-span-full`}>
        <option value="">Annual Revenue (optional)</option>
        <option>Under $1M</option>
        <option>$1M–$5M</option>
        <option>$5M–$20M</option>
        <option>$20M+</option>
      </select>

      <input
        name="00N[source_field_id]"
        placeholder="How did you hear about us?"
        className={`${inputClass} col-span-full`}
      />

      {/* Paste Salesforce-generated reCAPTCHA block here */}

      <button
        type="submit"
        className="col-span-full bg-crimson text-white font-semibold py-3 px-8 hover:bg-crimsonDark transition-colors"
      >
        Get in Touch →
      </button>
    </form>
  );
}
```

### Environment Variable

Set in Vercel dashboard → Project Settings → Environment Variables:
- `NEXT_PUBLIC_SF_OID` = your Salesforce Org ID (get from existing form HTML)

### Testing

During development, add `<input type="hidden" name="debug" value="1">` to the form. Salesforce will display a debug page instead of redirecting, showing exactly what fields were received. Remove before going live.

### Limits

Salesforce Web-to-Lead is capped at 500 submissions per 24-hour period. This is more than sufficient for a marketing site at this traffic level. If this limit is ever reached, Salesforce queues submissions — no data is lost.

---

## Site Structure & Navigation

### URL Structure

```
/                           Home
/salesforce/                Salesforce Services
/salesforce/pricing/        Salesforce Pricing
/salesforce/consulting/     Salesforce Consulting
/salesforce/health-check/   Salesforce Health Check
/salesforce/training/       Salesforce Training
/sap/                       SAP Services
/sap/pricing/               SAP Pricing (link to existing content)
/foundry/                   Foundry Platform — NEW
/foundry/pricing/           Foundry Pricing — NEW
/contact/                   Contact
/thank-you/                 Post-form redirect — NEW
/legal/privacy/             Privacy Policy (existing content, no changes)
/legal/terms/               Terms of Use (existing content, no changes)
```

`trailingSlash: true` in `next.config.js` preserves the existing URL pattern.

### Navigation

**Desktop — sticky, white background, `shadow-sm` appears on scroll:**

```
[RevenuePoint wordmark in crimson]    Salesforce ▾    SAP ▾    Foundry ▾    Contact    [Schedule a Call]
```

- "Foundry" nav item carries a small crimson `NEW` badge
- "Schedule a Call" is a filled crimson button
- Active page: nav item text turns crimson

**Dropdowns:**

Salesforce: Overview · Consulting · Health Check · Training · Pricing
SAP: Overview · Pricing
Foundry: Platform Overview · Pricing · Request a Demo

**Mobile (below `lg`):** Hamburger → full-screen navy overlay, same hierarchy, crimson active states

---

## Page Specs

---

## Page 1: Home (`/`)

### Hero

**Background:** Navy.

**Eyebrow:** `Salesforce · SAP · Foundry`

**H1:**
> The technology partner
> mid-market businesses trust.

**Body:**
> We implement, manage, and optimize Salesforce and SAP for growing companies — and put your data to work with Foundry, our managed AI and intelligence platform. One partner for your entire technology stack.

**CTAs:** "Schedule a Call →" (crimson) · "Explore Foundry →" (ghost on navy)

**Right:** 800×500 screenshot placeholder.

---

### Trust Bar

White background. Centered.

> Trusted by growing businesses across North America

Logos: Kinetik Technologies · Luster · Omya Inc. · Melio Payments + 2 placeholder slots.

---

### Three Service Pillars

Off-white. 3-column card grid.

**H2:** `Three ways we help your business grow`

**Salesforce:**
> We implement and manage Sales Cloud, Service Cloud, CPQ, Marketing Cloud, Pardot, and Communities. From initial configuration to ongoing administration, your Salesforce instance runs the way your business needs it to.

**SAP:**
> SAP Business One for growing companies and SAP S/4HANA for enterprise — implemented to your processes and managed by a dedicated team. No shared queues, no offshore handoffs.

**Foundry** (crimson accent, slight visual elevation):
> Connect every system into a unified data warehouse. Get live dashboards, AI-generated analysis, automated agents, and Otto — your AI agent — fully managed by RevenuePoint. `NEW`

---

### What Makes RevenuePoint Different

White. 2-column — left body text, right 2×2 grid.

**H2:** `White-glove service. Real accountability.`

**Body:**
> Most consulting firms implement software and disappear. We vet every client before signing them on — not to be exclusive, but because we only take engagements where we're confident we can deliver measurable ROI. Every client gets a named administrator and project manager. You call them directly.

**Right grid:**
- **Named Administrator** — One dedicated admin for your instance. You know who to call.
- **No Long-Term Contracts** — Monthly and quarterly plans. We keep clients by delivering results, not lock-ins.
- **Vetted Engagements** — We decline clients where we don't see a clear path to ROI. This keeps quality high for everyone.
- **Full Stack Coverage** — Salesforce, SAP, and Foundry — one partner who understands how it all fits together.

---

### Foundry Feature Callout

**Background:** Navy full-width.

**Eyebrow:** `NEW FROM REVENUEPOINT`

**H2:** `Meet Foundry — your managed data and AI platform`

**Body:**
> Your business runs on Salesforce, SAP, QuickBooks, and a dozen spreadsheets. None of them talk to each other. Foundry connects all of it into a single clean data warehouse, then delivers dashboards, AI analysis, automated agents, and real-time alerts — managed entirely by RevenuePoint. No data engineers. No six-figure BI contracts.

**Three feature blocks:**
- **Unified Warehouse** — Every source system synced, cleaned, and ready. Salesforce, SAP, QuickBooks, Shopify, and more.
- **Dashboards & Intelligence** — Live dashboards, metric trees, AI-generated analysis, and event-driven alerts built from your data.
- **Otto, Your AI Agent** — Ask questions, surface anomalies, and execute actions across your connected systems from a single chat interface.

**CTA:** "Explore Foundry →" white button.

---

### How We Work

Off-white. Numbered steps.

**H2:** `From signed contract to live platform in weeks`

1. **Discovery** — We learn your business, systems, and goals before quoting. No surprise scope changes.
2. **Implementation** — Certified admins configure and deploy to industry best practices, built around your actual processes.
3. **Handover & Training** — We train your team on the configured system. You get documentation, not just credentials.
4. **Ongoing Management** — A named admin and PM manage your platform month-to-month. Regular audits, proactive recommendations, direct access.

---

### Lead Capture Form

White. Centered.

**H2:** `Ready to find out if we're a good fit?`

**Body:**
> We review every submission personally and respond within one business day. Tell us about your business and what you're trying to solve.

`<LeadForm interest="General" />`

---

### Footer

Navy. 4-column.

Col 1: Logo + tagline + address + phone + email
Col 2: Salesforce links
Col 3: SAP links
Col 4: Foundry links

Bottom bar: © [year] RevenuePoint Inc. · Privacy Policy · Terms of Use

---

## Page 2: Salesforce (`/salesforce/`)

### Hero

**Eyebrow:** `SALESFORCE MANAGED SERVICES & CONSULTING`

**H1:** `The world's #1 CRM, implemented and managed the right way.`

**Body:**
> RevenuePoint holds over 60 Salesforce certifications across the full product suite. We've implemented Salesforce for teams of 10 and global rollouts of hundreds of users — and we manage them ongoing so your team can focus on the business, not the platform.

---

### Products (alternating 2-column rows)

**Sales Cloud — Pipeline, Forecasting & Revenue Operations**
> Most Sales Cloud implementations are configured for Salesforce's demo, not your actual sales process. We map your pipeline stages, custom fields, and opportunity flows to the way your team sells — then maintain it as your business evolves. Includes lead and opportunity management, forecast reporting, Einstein activity capture, and third-party integrations.

**Service Cloud — Case Management & Customer Support**
> We implement Service Cloud around your actual support workflows — email, phone, chat, and social — with SLAs, escalation rules, and reporting configured to your team's structure. Your agents work the queue; we keep the platform running.

**Marketing Cloud & Pardot — Demand Generation & Nurture**
> Pardot for companies that need aligned marketing and sales pipelines — lead scoring, nurture sequences, Salesforce CRM sync, and campaign attribution reporting. We implement and manage it so your marketers can market.

**CPQ & Billing — Quote Automation & Revenue Operations**
> Manual quoting is a revenue leak. CPQ replaces the spreadsheet and the approval bottleneck with a configured quoting engine that enforces pricing rules and generates contracts. We implement and maintain it.

**Experience Cloud — Partner & Customer Portals**
> Branded portals for partners and customers to submit cases, log deals, and access resources — without internal Salesforce licenses. We build and manage Experience Cloud communities around your use case.

**Nonprofit Success Pack — CRM for Nonprofits**
> NPSP turns Salesforce into the world's leading nonprofit CRM. We implement it for fundraising teams and program managers — configured to your campaigns, donor segments, and reporting requirements.

**Salesforce Administration — Ongoing Managed Services**
> Most organizations implement Salesforce correctly and then let it drift. A dedicated RevenuePoint administrator prevents that. We audit, optimize, and evolve your instance month-to-month.

---

### Consulting Credentials

**H2:** `60+ certifications across the full Salesforce suite`

> Our consultants are certified across Sales Cloud, Service Cloud, Marketing Cloud, CPQ, Experience Cloud, and NPSP. We've implemented Salesforce for startups and global enterprises — and we bring those lessons to every engagement.

Certification badge strip (placeholder).

---

### Pricing Preview + Lead Form

`<LeadForm interest="Salesforce" />`

---

## Page 3: Salesforce Pricing (`/salesforce/pricing/`)

### Header

**H1:** `Flexible pricing for teams of any size`

**Body:**
> White-glove Salesforce administration from dedicated administrators and project managers — your single point of contact for everything Salesforce. No shared queues, no offshore routing.

---

### Administration Plans

**Sales Cloud Administration — $2,400/month (quarterly) · $2,880/month (monthly)**
25 hours per month. Covers Salesforce Sales Cloud, single instance.

Full feature list:
- 1 dedicated Salesforce administrator + 1 dedicated project manager
- Quarterly Salesforce audit
- Access to training and workshops
- Custom objects, business process automation, and workflow configuration
- Advanced features: Einstein, Lightning Voice, Bots
- Bulk data import and export
- Third-party integration support
- Custom Apex triggers and code
- Regular data hygiene assessments
- End-user training and support
- Business KPI analysis and review

**Full Stack Administration — $4,000/month (quarterly) · $4,800/month (monthly)**
25 hours per month. Everything in Sales Cloud Administration, plus:
- Covers Salesforce Service Cloud
- Covers CPQ + Billing
- Covers Marketing Cloud + Pardot
- Covers Community + Partner Clouds (Experience Cloud)
- Salesforce Communities management

**Custom Plan:** For organizations with unique needs. Get in touch and we'll scope a plan specific to your instance.

**Note:** No long-term contract or commitment. Cancel anytime.

---

### Additional Services

| Service | Starting price |
|---|---|
| Hosted Integrations | $99/month |
| Advanced Development (Apex, LWC, Heroku, API) | $250/hour |
| Supplemental Services (consulting, training, vendor comms) | $125/hour |

---

### Lead Form

`<LeadForm interest="Salesforce" />`

---

## Page 4: Salesforce Consulting (`/salesforce/consulting/`)

### Hero

**H1:** `Certified Salesforce consulting across the full product suite`

**Body:**
> Our consultants hold over 60 Salesforce certifications and have implemented Salesforce for teams of 10 to global rollouts of hundreds of users. We specialize in implementations that stick — configured to your process, trained to your team, supported beyond go-live.

---

### Services Grid (2×4 card grid)

Sales Cloud · Service Cloud · Experience Cloud (Communities) · Marketing Cloud · Pardot · CPQ & Billing · Nonprofit Success Pack (NPSP) · Third-Party AppExchange Integrations

Each card: service name, 2–3 sentence description, "Get Started →" → `#lead-form`

---

### Lead Form

`<LeadForm interest="Salesforce Consulting" />`

---

## Page 5: Salesforce Health Check (`/salesforce/health-check/`)

### Hero

**H1:** `Is your Salesforce instance working for your business — or against it?`

**Body:**
> A misconfigured Salesforce instance doesn't just slow your team down — it creates bad data, broken automations, and reports you can't trust. Our Health Check delivers a structured audit and prioritized action plan in two weeks.

---

### What's Included

**Salesforce Health Check — $1,500**

- Full audit of current configuration, data model, and active automations
- Data quality assessment — duplicates, missing fields, import hygiene
- Third-party app and AppExchange integration review
- Security and permissions model review
- Prioritized action plan with specific recommended fixes in order of business impact
- 60-minute debrief call to walk through findings

*Because all businesses differ in complexity, the Health Check may not be appropriate for all organizations. We'll confirm fit before accepting payment.*

---

### Lead Form

`<LeadForm interest="Salesforce Health Check" />`

---

## Page 6: Salesforce Training (`/salesforce/training/`)

### Hero

**H1:** `Salesforce training built for your configuration, not a generic demo org`

**Body:**
> Generic Salesforce training teaches people the platform. Our training teaches your team the platform as you've configured it — your fields, your processes, your reports. The result is actual adoption.

---

### Training Options (4 cards)

**End-User Training** — Role-specific sessions for sales reps, service agents, and other end users. Focused on daily workflows in your actual org.

**Administrator Training** — For internal admins managing and evolving the instance. Covers configuration, automation, reporting, and data management.

**New Hire Onboarding** — Structured Salesforce onboarding for new team members. Delivered live or recorded for async use.

**Custom Workshops** — Topic-specific sessions on any Salesforce feature or process — reporting, CPQ, automation, integrations, or anything else your team needs.

---

### Lead Form

`<LeadForm interest="Salesforce Training" />`

---

## Page 7: SAP (`/sap/`)

### Hero

**Eyebrow:** `SAP MANAGED SERVICES`

**H1:** `ERP that runs your business — not the other way around.`

**Body:**
> SAP Business One for growing companies and SAP S/4HANA for enterprise — implemented to your actual processes and managed by a dedicated team. We've seen what bad ERP implementations look like. We build ours to last.

---

### Products

**SAP Business One — SMB ERP**
> Built for companies between $5M and $100M in revenue that have outgrown QuickBooks. We implement Business One around your actual operations — finance, inventory, purchasing, sales, and manufacturing — and manage it ongoing so your team never has to figure it out alone.
>
> Includes: Financial management · Inventory and warehouse · Purchasing and procurement · Sales and CRM · MRP and light manufacturing · Reporting and analytics · Ongoing administration

**SAP S/4HANA — Enterprise ERP**
> S/4HANA is SAP's flagship enterprise platform — built on the HANA in-memory database with embedded analytics, AI-driven automation, and a modern Fiori interface. We implement and manage S/4HANA for organizations that require enterprise-scale ERP with the operational rigor to match.
>
> Includes: Full financial suite · Supply chain and procurement · Manufacturing and MRP · Sales and distribution · HR and payroll integration · SAP Fiori UX · Ongoing managed services

**SAP Administration Services**
> A SAP instance that isn't actively managed drifts. Customizations break on updates. Reports become stale. Integrations fail silently. Our SAP administration services keep your instance current, clean, and aligned with your business as it evolves.

---

### Lead Form

`<LeadForm interest="SAP" />`

---

## Page 8: Foundry (`/foundry/`) — NEW

### Hero

**Background:** Navy.

**Eyebrow:** `REVENUEPOINT FOUNDRY`

**H1:**
> Managed data orchestration
> and AI for mid-market business.

**Body:**
> Your business runs on Salesforce, SAP, QuickBooks, and a dozen other systems. None of them talk to each other. Foundry connects every system into a unified data warehouse, then delivers dashboards, AI analysis, automated agents, and Otto — your AI agent — managed entirely by RevenuePoint. You use it. We run it.

**CTAs:** "Request a Demo →" (crimson) · "View Pricing →" (ghost)

**Right:** 800×500 screenshot placeholder.

---

### The Problem

Off-white. 4-column card grid.

**H2:** `Your data is everywhere. Your team has no time to fix it.`

**Data Lives Everywhere**
> Salesforce, SAP, QuickBooks, spreadsheets — each tells a different story. Your team spends two days a week reconciling numbers that still don't agree. There's no single source of truth.

**No Real-Time Visibility**
> The monthly report lands in your inbox two weeks into the next month. By the time data arrives, the moment to act has passed. You're managing by looking in the rearview mirror.

**AI is Out of Reach**
> ThoughtSpot averages $140,000 a year. Domo is similar. These tools exist — they're just built for companies with ten times your headcount and a data engineering team to operate them.

**Tools Require Operators**
> Power BI, Domo, and ThoughtSpot are self-serve platforms. Someone on your team has to build the dashboards and fix them when they break. That person doesn't exist — or already has a day job.

---

### How Foundry Works

White. 3-column pillar layout.

**H2:** `Connect. Illuminate. Act.`

**Connect**
> We sync every source system — Salesforce, SAP, QuickBooks, Shopify, Stripe, and more — via Airbyte. Syncs run on a schedule managed by Airflow. Data lands in a clean, unified Postgres warehouse. We build and maintain the pipelines.

**Illuminate**
> Dashboards, scorecards, metric trees, AI-generated reports, and real-time alerts — built from your warehouse data and delivered through the Foundry Portal. Updated on your schedule, available on demand.

**Act**
> Otto answers data questions in plain English, surfaces anomalies before you notice them, and executes structured actions in your connected systems. Automated agents run 24/7 — processing data, watching for conditions, responding to events.

---

### Product Suite

Off-white. 2×3 card grid with 4px crimson left bars.

**Lens — Dashboards & Analytics**
> Curated operational dashboards, interactive metric trees showing causal relationships between KPIs, scorecards for specific locations or roles, and geographic maps. Your operational view of the business — always current, always in context.

**Courier — Reports & Alerts**
> Scheduled reports delivered to your inbox and event-driven alerts that fire when something matters. Daily production summaries, weekly AR aging, instant anomaly alerts. Courier delivers it on your schedule.

**Prism — AI Analysis Reports**
> On-demand AI-generated analysis — sales performance, donor retention, inventory health, cash flow. Otto builds a narrative from your warehouse data with specific numbers, trends, and recommended actions. You read it and decide.

**Otto — Your AI Agent**
> Ask Otto anything about your business data — in plain English, from the portal. Otto queries your warehouse, explains what it finds, flags what looks wrong, and executes actions in your connected systems. The analyst who's always available.

**Agents — Automated Workflows**
> Always-on automation: Watchers that fire when inventory drops below threshold, Processors that convert inbound POs to SAP sales orders, Responders that triage cases and notify reps, Schedulers that deliver your morning briefing. They run while you sleep.

**Actions — System Execution**
> Structured, audited operations executed in Salesforce, SAP, QuickBooks, and other connected systems — by Otto or by your team from the portal. Every action logged. Every change traceable.

---

### Blueprint

Navy. 2-column — left text, right screenshot placeholder.

**H2:** `Foundry knows your business.`

**Body:**
> Blueprint is a living map of your business objects — Customers, Orders, Invoices, Production Orders, Prescriptions, Donors — and how they connect across all your systems. It's the layer that makes Otto smart. Instead of querying raw database tables, Otto reasons over named objects that mean something in your business. Every dashboard, report, and action draws from the same source of truth.

Bullet points:
- Single source of truth across Salesforce, SAP, QuickBooks, and more
- Otto reasons over Customers and Orders — not raw table joins
- Every metric and report draws from the same business definitions
- Visual object graph shows exactly how Foundry understands your data

**Right:** Screenshot placeholder — Blueprint GoJS object graph.

---

### Industries

Off-white. 2×2 card grid with navy header strip.

**H2:** `Built for your industry`

**Manufacturing**
> Production OEE dashboards by line and shift · Inventory shortage watchers and procurement alerts · Inbound PO processing — PDF to SAP sales order automatically · Scrap rate anomaly detection with shift correlation · On-time delivery and supplier performance analysis

**Compounding Pharmacy**
> Script volume by location and compound type · QC batch failure alerts and compliance reporting · Prescription intake queue and refill reminder agents · Payer mix and reimbursement trend analysis · Prescriber relationship tracking and outreach tools

**Sales Organizations**
> Pipeline health, deal velocity, and quota attainment dashboards · Deal stall agents that notify reps at day 14 automatically · Win/loss AI analysis and revenue forecast reports · Territory performance maps · Account intelligence briefings before every call

**Nonprofit Fundraising**
> Donor retention, LTV, and lapsed donor analysis · Campaign pace-to-goal tracking with hourly updates during giving events · Grant deadline watchers with 60/30/7-day alert sequences · Major gifts pipeline · Board-ready annual reports generated by Otto

---

### Home Feed Preview

White. 2-column — left text, right screenshot placeholder.

**H2:** `Your morning briefing. Automatically.`

**Body:**
> The Foundry Home Feed is a live, scrollable intelligence stream. Every morning it shows what Otto noticed overnight — metric movements, anomaly alerts, agent activity, delivered reports, and AI-generated summaries — personalized to your role. The daily briefing you've always wanted, assembled automatically from your data.

Key features:
- Anomaly cards surface unexpected changes before your team notices
- Narrative cards explain what happened and why, in plain English
- Agent activity shows what ran while you weren't watching
- Milestone cards surface positive records — not just problems

**Right:** Screenshot placeholder — Home Feed card stream.

---

### Competitive Comparison

Off-white.

**H2:** `The only fully managed platform for mid-market`

**Subhead:** ThoughtSpot averages $140,000/year and requires a data engineering team. Foundry Intelligence starts at $60,000/year, fully managed by RevenuePoint.

| Capability | Foundry | Domo | ThoughtSpot | DataSelf | BI Consultant |
|---|---|---|---|---|---|
| Data warehouse & pipeline | ✓ | ✓ | ✗ | ✓ | Varies |
| Dashboards & analytics | ✓ | ✓ | ✓ | ✓ | Varies |
| AI chat & natural language | ✓ | ✓ | ✓ | ✗ | ✗ |
| AI-generated analysis reports | ✓ | ✗ | ✗ | ✗ | ✗ |
| Automated agents | ✓ | Limited | ✗ | ✗ | ✗ |
| Action execution in systems | ✓ | ✗ | ✗ | ✗ | ✗ |
| Anomaly detection | ✓ | Limited | ✓ | ✗ | ✗ |
| Fully managed service | ✓ | ✗ | ✗ | ✗ | Partial |
| Mid-market pricing | ✓ | ✗ | ✗ | ✓ | ✓ |

Foundry column: crimson header, green ✓, red ✗.

---

### How It Works

White. Numbered step cards (horizontal, full-width).

**H2:** `From contract to live in weeks — no IT team required.`

1. **Connect** — We connect your source systems via Airbyte. No IT involvement from your team. We handle credentials, sync schedules, and pipeline monitoring.
2. **Model** — We build your dbt data models and Blueprint business object map. We define what a Customer, Order, and Invoice means in your specific environment.
3. **Configure** — We build dashboards, scorecards, Courier subscriptions, Otto's runbook, and your initial agent library. Everything tailored to your business.
4. **Launch** — Your team gets Foundry Portal access. We run a live walkthrough. RevenuePoint manages everything from that point forward.
5. **Evolve** — Monthly review calls, ongoing improvements, new dashboards and agents. Foundry grows as your business grows.

---

### Demo CTA Banner

Navy.

**H2:** `Ready to see Foundry in action?`

**Body:** Schedule a personalized demo. We'll show you what Foundry looks like connected to systems just like yours.

**CTA:** "Schedule a Demo →" → `/contact/?interest=foundry`

---

## Page 9: Foundry Pricing (`/foundry/pricing/`) — NEW

### Header

**H1:** `Simple, predictable pricing. No surprises.`

**Body:** Flat monthly managed service pricing. No usage fees, no per-seat charges, no consumption bills. You always know what Foundry costs.

---

### Pricing Tiers (3 cards, Intelligence highlighted)

**Core — $2,500–$3,500/month**
*For companies starting their data journey*
- Unified data warehouse (up to 3 source systems)
- Foundry Portal — unlimited users
- Lens: Dashboards (up to 5) + Scorecards (up to 5)
- Courier: Scheduled reports (up to 10 subscriptions)
- Blueprint: Business object map (up to 8 objects)
- Monthly data health review call + email support

**Intelligence — $5,000–$7,500/month** ← MOST POPULAR
*For operations-driven businesses that need real intelligence*
- Everything in Core
- Lens: Metric Tree + Geographic Maps + unlimited scorecards
- Courier: Event-driven alerts (unlimited)
- Prism: AI analysis reports (up to 10/month)
- Otto: AI chat interface
- Up to 5 source systems · Bi-weekly review call · Priority support

**Enterprise — $10,000–$15,000/month**
*For complex operations with full automation*
- Everything in Intelligence
- Agents: Up to 10 active automated agents
- Actions: Structured action catalog (20 actions)
- Otto in full agent and automation mode
- Up to 8 source systems
- Dedicated Slack + weekly strategy calls + 4-hour SLA

**Below tiers:**
> One-time implementation fee of **$8,000–$60,000** depending on source system count and data complexity. Scoped during a paid discovery engagement before you commit to a monthly plan.

---

### Add-Ons

| Add-On | Price |
|---|---|
| Additional source system connection | +$300–$500/month |
| Additional Prism report runs (per 10) | +$200/month |
| Additional active agents (per 5) | +$500/month |
| Otto in Salesforce (LWC + Apex integration) | +$500/month |
| Custom dbt model or dashboard development | $150/hour |

---

### FAQ (accordion)

**What does "fully managed" actually mean?**
RevenuePoint handles the entire data stack — Airbyte sync configuration, Airflow orchestration, dbt model development and maintenance, Postgres database administration, dashboard building, agent configuration, Otto's runbook, and portal support. Your team uses the Foundry Portal. We run everything that powers it.

**How long does implementation take?**
Typical implementation is 4–8 weeks depending on the number of source systems and the complexity of your data model. We scope this precisely during discovery before you commit to a monthly plan.

**What systems can Foundry connect to?**
Any system with a REST API, webhook, or database connection. Pre-built connectors for Salesforce, SAP Business One, SAP S/4HANA, QuickBooks, Shopify, Stripe, Mailchimp, and Eventbrite. If you use it, we can likely connect it.

**Can I upgrade plans?**
Yes. Month-to-month, no long-term commitment. Same policy as our Salesforce and SAP managed services.

**Does Foundry replace our existing BI tool?**
For most mid-market clients, yes. Foundry replaces the need for Power BI, Tableau, or Domo — plus eliminates the internal engineering those tools require. If you have existing dashboards you want to preserve, we discuss that during discovery.

**Is our data secure?**
Your data lives in a dedicated Postgres instance provisioned exclusively for your organization. We do not commingle client data. Access is controlled by role-based permissions within the Foundry Portal.

---

### Demo CTA

Same as Foundry page.

---

## Page 10: Contact (`/contact/`)

### Header

**H1:** `Let's find out if we're a good fit.`

**Body:**
> We respond to every submission within one business day. We're selective about the engagements we take on — not to be difficult, but because we only work with clients where we're confident we can deliver results. Tell us about your business.

**Left column — contact details:**
- Thomas Jones, Managing Director
- hello@revenuepoint.com
- +1 (332) 900-1150
- Three World Financial Center, 200 Vesey Street, 24th Floor, New York, NY 10281
- "Prefer to schedule directly?" → Calendly link

**Right column — form:**

```tsx
// Reads ?interest= URL param and pre-sets the hidden Salesforce field
<LeadForm interest={urlParam('interest') || 'General'} />
```

---

## Page 11: Thank You (`/thank-you/`)

**H1:** `Thanks — we'll be in touch within one business day.`

**Body:**
> We review every submission personally. If your engagement looks like a good fit, we'll reach out to schedule an intro call.

**CTA:** "Schedule a 30-Minute Intro →" → Calendly

No form on this page. No nav distractions — simple, focused confirmation.

---

## Component Library

| Component | Props | Notes |
|---|---|---|
| `<Navbar />` | — | Sticky, shadow on scroll, hamburger below `lg` |
| `<Footer />` | — | Navy, 4-column |
| `<HeroSection />` | `eyebrow, h1, body, ctas[], rightSlot` | Navy background only |
| `<SectionHeader />` | `eyebrow?, h2, body?` | Reusable section opener |
| `<ServiceCard />` | `title, body, cta` | White card, 4px crimson left bar |
| `<ProductCard />` | `name, desc` | Foundry product suite cards |
| `<IndustryCard />` | `name, items[]` | Navy header strip + bullet list |
| `<PricingCard />` | `name, price, period, items[], highlight?` | 3-tier layout |
| `<ComparisonTable />` | `headers[], rows[]` | Color-coded, horizontal scroll on mobile |
| `<StepList />` | `steps[]` | Numbered horizontal cards |
| `<LeadForm />` | `interest: string` | Web-to-Lead wrapper |
| `<CTABanner />` | `h2, body, cta` | Navy full-width section |
| `<LogoStrip />` | `logos[]` | Trust bar |
| `<FAQAccordion />` | `items[]` | Foundry pricing page |
| `<ScreenshotPlaceholder />` | `label, w?, h?` | Dashed crimson border, grey label text |

---

## SEO & Meta Tags

| Page | `<title>` | Meta description |
|---|---|---|
| `/` | RevenuePoint — Salesforce, SAP & Foundry for Mid-Market Business | Salesforce, SAP, and Foundry data platform — implemented and managed for mid-market businesses. White-glove service. No long-term contracts. |
| `/salesforce/` | Salesforce Managed Services & Consulting \| RevenuePoint | 60+ certified Salesforce consultants. Sales Cloud, Service Cloud, CPQ, Pardot, and NPSP — implemented and managed for growing businesses. |
| `/sap/` | SAP Business One & S/4HANA Managed Services \| RevenuePoint | SAP Business One for SMBs and S/4HANA for enterprise — implemented to your processes, managed by a dedicated team. |
| `/foundry/` | Foundry — Managed Data & AI Platform \| RevenuePoint | The only fully managed data and AI platform for mid-market. Dashboards, AI agents, automated workflows — starting at $2,500/month. |
| `/foundry/pricing/` | Foundry Pricing — Flat Monthly Plans \| RevenuePoint | Foundry managed data platform pricing from $2,500/month. No usage fees, no per-seat charges. Core, Intelligence, and Enterprise plans. |
| `/contact/` | Contact RevenuePoint \| Salesforce, SAP & Foundry Partner | Get in touch. We respond within one business day and only take engagements where we can deliver measurable ROI. |

All pages: `og:title`, `og:description`, `og:image`, `<link rel="canonical">`.

---

## Responsive Breakpoints

- Mobile first — single column on mobile across all layouts
- `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536
- Nav hamburger below `lg`
- Card grids: 1col → 2col at `md` → 3/4col at `lg`
- Comparison table: horizontal scroll on mobile, sticky first column

---

## Deployment

```js
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
}
```

**Vercel environment variables:**
- `NEXT_PUBLIC_SF_OID` — Salesforce Org ID (from existing form hidden `oid` field)
- `NEXT_PUBLIC_CALENDLY_URL` — `https://cal.mixmax.com/jonesth/intro`

**DNS:** Point `revenuepoint.com` CNAME to `cname.vercel-dns.com`. Vercel provisions SSL automatically.

---

## Screenshot Placeholder Locations

| Page + Section | What to drop in when ready |
|---|---|
| `/` — Hero right | Home Feed or Lens dashboard screenshot |
| `/foundry/` — Hero right | Foundry Portal overview |
| `/foundry/` — Blueprint section right | Blueprint GoJS object graph |
| `/foundry/` — Home Feed section right | Home Feed card stream |

---

## Existing Site Cleanup — Issues to Fix

These bugs and stale content exist in the current site and must be corrected in the rebuild:

1. **"Upmarket" brand references** — The contact page intro reads "Are you ready to make most out of your Salesforce® instance with Upmarket?" This is a prior brand name. Remove entirely and rewrite.

2. **2019 event listings on contact page** — The contact page lists Salesforce World Tour and Dreamforce events from July–December 2019. Remove this entire section.

3. **Stale email `team@upmarketcrm.com`** — The Health Check page source contains `team@upmarketcrm.com` in a `mailto:` link. Replace with `hello@revenuepoint.com`.

4. **Copyright year** — Footer reads "© 2020 RevenuePoint Inc." Update footer component to use `new Date().getFullYear()`.

5. **"Get back to doing what you do best"** — Appears verbatim as the only form headline on every page of the current site. This spec introduces page-specific headlines while preserving the underlying message.

6. **Grammar errors in existing copy** — "We're glad your here" (contact page). Fix to "you're". Audit all pages for similar issues.

7. **Pricing page navigation** — The current nav does not include SAP pricing in the main nav. Add `/sap/pricing/` to the SAP dropdown.
