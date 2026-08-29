# [OPEN THE LIVE SITE](https://ibhanbandy.github.io/cambiran-pickleball-store/)

**Public website:** https://ibhanbandy.github.io/cambiran-pickleball-store/

---

# Cambiran Pickleball Store

Official Medusa DTC starter, with the default storefront design and sample apparel catalog unchanged.

## Run locally

This machine is configured with Node 22.16.0, pnpm 10.11.1, and a separate `cambiran_medusa` database on PostgreSQL port 5433.

```sh
nvm use
npx --yes pnpm@10.11.1 dev
```

The development launcher waits for Medusa to become healthy before starting the
storefront. Stop it with `Ctrl+C` before launching another instance; running
multiple copies on ports 8000 and 9000 will cause address conflicts.

- Storefront: http://localhost:8000 (redirects to the starter's Denmark region)
- Admin: http://localhost:9000/app
- Admin login: `.local/admin-credentials.txt` (local only, excluded from Git)

The default region uses EUR and the default manual payment provider. No real payments, emails, shipping services, or public deployment have been configured. The starter uses in-memory infrastructure for development; configure production services before launch.

## Configuration

Local configuration is in `apps/backend/.env` and `apps/storefront/.env.local`. These files contain credentials and are excluded from Git. Never commit them.

For a new machine:

1. Install Node 22 LTS, pnpm 10.11.1, and PostgreSQL 15 or newer.
2. Run `npx --yes pnpm@10.11.1 install --frozen-lockfile`.
3. Create a dedicated PostgreSQL database.
4. Copy `apps/backend/.env.template` to `apps/backend/.env`; set `DATABASE_URL`, unique random `JWT_SECRET` and `COOKIE_SECRET`, and localhost CORS origins including port 8000 in `AUTH_CORS`. Redis is optional for local development.
5. Copy `apps/storefront/.env.template` to `apps/storefront/.env.local`; set `NEXT_PUBLIC_BASE_URL=http://localhost:8000`.
6. Run `npx --yes pnpm@10.11.1 db:migrate`. This also runs Medusa's tracked initial seed once; do not execute the seed file directly against an existing store.
7. Run `npx --yes pnpm@10.11.1 storefront:configure` to write the seeded publishable key to the storefront configuration without printing it.
8. Create an admin using Medusa's `user` command from `apps/backend`, then start the apps.

## Verification commands

```sh
npx --yes pnpm@10.11.1 build
npx --yes pnpm@10.11.1 --filter @dtc/backend lint
npx --yes pnpm@10.11.1 --filter @dtc/storefront exec tsc --noEmit --incremental false
```

Stop the development servers before building because Next.js uses the same `.next` directory. The backend needs to be running during the storefront build so static product routes can be generated.

## Verified in this workspace

- Medusa backend and admin production build passed, including backend lint.
- Next.js production build passed (61 generated static pages).
- Separate storefront TypeScript check passed; the upstream Next.js build skips type and lint checks.
- Browser checks passed for the homepage, category listing, product variant selection, add-to-cart, cart totals, and admin login screen.
- Checkout completion and live payments have not been tested. The browser preview contains one sample T-shirt added during verification.
- Local configuration and admin credentials are excluded from Git.

## Upstream

Source: https://github.com/medusajs/dtc-starter

Imported commit: `9b93e6869607b9ff4b379d67ccd5af7c5095f331` (Medusa 2.19.0, Next.js 15.5.21).

The original upstream documentation follows.

---

<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa DTC Starter
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/develop/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://circleci.com/gh/medusajs/medusa">
    <img src="https://circleci.com/gh/medusajs/medusa.svg?style=shield" alt="Current CircleCI build status." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/develop/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

# Medusa DTC Starter

A production-ready monorepo starter for direct-to-consumer ecommerce stores powered by Medusa and Next.js. Includes a fully featured storefront with product browsing, cart, checkout, customer accounts, and order management.

## Features

- All of [Medusa's commerce features](https://docs.medusajs.com/resources/commerce-modules)
- Multi-region support with automatic country detection
- Product catalog with variant selection
- Cart with promotion codes
- Multi-step checkout with shipping and payment
- Customer accounts with order history and address management
- Order transfer between accounts

## Getting Started

### Deploy with Medusa Cloud

The fastest way to get started is deploying with [Medusa Cloud](https://cloud.medusajs.com):

1. [Create a Medusa Cloud account](https://cloud.medusajs.com)
2. Deploy this starter directly from your dashboard

### Local Installation

> **Prerequisites:
>
> - [Node.js](https://nodejs.org/) v20+
> - [PostgreSQL](https://www.postgresql.org/) v15+
> - [pnpm](https://pnpm.io/) v10+

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/medusajs/dtc-starter.git
cd dtc-starter
pnpm install
```

2. Set up environment variables for the backend:

```bash
cp apps/backend/.env.template apps/backend/.env
```

3. Set the database URL in `apps/backend.env`:

```bash
# Replace with actual database URL, make sure the database exists.
DATABASE_URL=postgres://postgres:@localhost:5432/medusa-dtc-starter
```

4. Run migrations:

```bash
cd apps/backend
pnpm medusa db:migrate
```

5. Add admin user:

```bash
cd apps/backend
pnpm medusa user -e admin@test.com -p supersecret
```

6. Start Medusa backend:

```bash
cd apps/backend
pnpm dev
```

7. Open the admin dashboard at `localhost:9000/app` and log in. Retrieve your publishable API key at Settings > Publishable API key.

8. Set up environment variables for the storefront:

```bash
cp apps/storefront/.env.template apps/storefront/.env.local
```

9. Update `apps/storefront/.env.local` with your Medusa publishable API key:

```bash
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_6c3...
```

10.  Start storefront:

```bash
cd apps/storefront
pnpm dev
```

The storefront runs on `http://localhost:8000`.

You can slo run the following command from the root to start both backend and storefront:

```bash
pnpm dev
```

## Configuration

The storefront is configured via environment variables in `apps/storefront/.env.local`:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Publishable API key from your Medusa backend | — |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | URL of your Medusa backend | `http://localhost:9000` |
| `NEXT_PUBLIC_DEFAULT_REGION` | Default region country code | `dk` |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the storefront | `https://localhost:8000` |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key (optional) | — |

## Resources

- [Medusa Documentation](https://docs.medusajs.com)
- [Medusa Cloud](https://cloud.medusajs.com)
