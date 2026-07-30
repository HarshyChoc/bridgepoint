# BridgePoint Justice

The coordination layer for New Jersey's housing and human services — one secure system linking
individuals, nonprofits, landlords, healthcare providers, and government agencies.

This repository contains a **fully interactive demonstration build**: a complete marketing site plus
all five role-based portals, running entirely in the browser on illustrative data. It is built for
pilot briefings and investor conversations, where the platform has to be walked through rather than
described.

> **No real client data is present.** Every person, organization, address, and phone number in this
> repository is fictional.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open `http://localhost:5173`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Type-check and produce a production bundle in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the unit suite (Vitest) |
| `npm run lint` | Lint with oxlint |

---

## What to show, and in what order

The demo is designed to be walked in this sequence. It takes about eight minutes.

**1. The site — `/`**
The problem, the year-in-one-record narrative, and the five vantage points.

**2. Conversational intake — `/start`**
Five questions in plain language. The assistant acknowledges each answer, then generates a real
action plan from the resource database for whichever county is chosen. Choosing Hudson instead of
Essex produces a genuinely different plan.

**3. The individual portal — `/app`**
The generated plan with verified resources attached to each step. Complete a sub-step here — it
matters in step 4. Also: the resource directory with county and category filters, saved resources,
appointments, documents, secure messaging, and the floating BridgePoint Helper.

**4. The advocate portal — `/advocate`**
Open Marcus Reyes's case file. His progress bar reflects the step just completed in the client
portal — the same record, two vantage points, no duplicate entry. Then: AI case summary and next
best action, referral pipeline, document review, partner directory, and caseload analytics.

**5. The landlord portal — `/landlord`**
Accept a referral, watch the incentive payment move, see inspections and outstanding compliance
documents in one thread.

**6. Tenant success — `/tenant`** and **the government dashboard — `/admin`**
Retention through the 365-day review, then the statewide view: placements, retention, service gaps,
grant compliance, and HMIS export.

Sign in at `/signin` — no password, pick a role. The reset control in the portal header restores the
demo to its starting state at any time.

---

## What is real, and what is simulated

Being precise about this matters more in a pilot conversation than overstating it.

**Real in this build**

- The county recommendation engine ranks and filters an actual structured resource database
- Plan generation is derived from the intake answers, not pre-written per persona
- State is shared across portals — a client action changes what the advocate sees
- All state is immutable and persisted to `localStorage`, so a demo survives a page refresh
- Filtering, search, sorting, forms, and validation all behave as they would in production

**Simulated**

- The assistant is scripted keyword routing, not a model call. It answers from a fixed set and says
  so when it does not know, which is deliberately how the production assistant is specified to
  behave — grounded in the verified database rather than generating freely.
- No backend, no database, no authentication. Sign-in picks a persona.
- Resource records are illustrative. The real database is maintained on a rolling 90-day
  verification cycle.

---

## Architecture

```
src/
  data/          Domain records — resources, clients, casework, landlord, analytics, scripts
  state/         Immutable store: types, reducer, seed data, React context
  lib/           Pure logic — recommendation engine, formatters, storage wrapper
  components/
    ui/          Primitives: Button, Card, Badge, Field, Modal, Toast, Charts, DataTable
    marketing/   Site chrome and section layouts
    portal/      Shared portal shell and page header
    resources/   Resource card and row
  features/
    intake/      Conversational intake and plan generation
    assistant/   The BridgePoint Helper
  pages/         Marketing pages, sign-in, 404
  portals/       individual · advocate · landlord · tenant · government
```

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Lucide icons. No UI framework
and no chart library — the charts are laid out with CSS so the bundle stays small and the visual
language stays consistent.

**State.** A single `useReducer` store in `src/state/`. Every reducer branch returns a new object;
nothing is mutated in place. That is what allows the individual portal and the advocate case file to
read the same record without either surprising the other.

**Design.** Institutional dark, serif display type, brass accent. Tokens live in `src/index.css`
under `@theme` — colours, type scale, and surface levels are defined once and referenced everywhere.

---

## Tests

```bash
npm test
```

Covers the logic where a defect would be invisible in a demo but wrong in production: the
recommendation engine and its coverage claims, the plan builder, the store reducer's immutability
and idempotency, date handling across timezones, and assistant routing including the
does-not-know path.

UI components are verified by walking the demo rather than by snapshot tests — appropriate for a
prototype at this stage, and the first thing to change when this becomes a production build.

---

## What comes next

The roadmap the platform is built toward, in order:

1. Authentication and role-based access control
2. Persistent database and a real API
3. Referral status tracking against live partner systems
4. Document upload with a review and audit workflow
5. Replacing the scripted assistant with a scoped, retrieval-grounded model
6. Consent, privacy, and audit-log controls
7. HMIS and NJ Department of Community Affairs integration

---

A project of Kadima AI LLC, developed through Engage NJ and the Kesselman Fellowship for the
Advancement of Democracy.
