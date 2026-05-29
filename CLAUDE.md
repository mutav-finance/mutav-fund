@AGENTS.md

# MUTAV Fund — Agent Context

## Project

MUTAV — onchain rental guarantee infrastructure.

This is the **web3 portal** for the MUTAV fund. It serves two audiences who both interact via wallet-signed transactions:

1. **Investors** — public deposit / redeem / NAV view / portfolio / transparency flows
2. **Protocol team (admin)** — fund management: AUM dashboard, partner whitelist, parameter changes, `cover_default`, paused state, admin handover

All signing happens client-side via the user's Stellar wallet. **No operator or admin keys live server-side in this repo.**

Scope:
- Next.js App Router frontend
- Stellar SDK + wallet kit (read chain state, construct transactions for wallet signing)
- Investor views (deposit / redeem / NAV / portfolio / KYC if required)
- Fund-management views (admin dashboard, partner mgmt, parameter changes, `cover_default`, pause toggle, admin handover)

## Three-repo split

- `mutav-finance/mutav-stellar`: Stellar contracts + TS SDK + operator daemons. The audited surface; operator-key custody.
- `mutav-finance/mutav-app`: agency platform (Auth0 + Convex) — agency dashboards, rental contracts, payment collection, SEP-24 anchor integration (Etherfuse).
- **`mutav-finance/mutav-fund`** (this repo): web3 portal — investor flows + fund management. Wallet-signed throughout.

**Boundary rule**: this repo holds NO operator or admin keys. All transaction signing is client-side via the user's wallet. If you find yourself needing to store a server-side key, the work belongs on `mutav-stellar`.

This repo consumes the `@mutav-finance/mutav-stellar` SDK. Contract reference + architecture docs live in `mutav-stellar/docs/architecture/`.

## Audience-gated UI

The same dapp serves both audiences; admin features should be gated by wallet-address check against the contract's `admin()` view. Don't trust client-side state for the gating; always re-check via the contract.

## Shared docs

Strategy, whitepaper, and brand assets live in `mutav-finance/mutav`:

```bash
git clone https://github.com/mutav-finance/mutav.git ../mutav
```

For contract surface + NAV math + events:

```bash
git clone https://github.com/mutav-finance/mutav-stellar.git ../mutav-stellar
```

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Bun** for package mgmt and scripts
- **Stellar SDK** (`@stellar/stellar-sdk`) for chain reads
- **Wallet kit** (TBD: Freighter / Albedo / stellar-wallets-kit) for client-side signing
- Branch workflow: feature branches → squash merge PRs to main
- Hosting: Vercel

## Code standards

- `bun run typecheck` and `bun run lint` before pushing
- Conventional Commits for messages
- Match surrounding code style; formatter choice deferred (Biome or Prettier follow-up)

## Relevant skills (for agents)

For Next.js / Vercel / shadcn / wallet-connect work:
- `vercel:nextjs` — App Router patterns
- `vercel:shadcn` — design-system + components
- `vercel:react-best-practices` — TSX quality checklist
- `vercel:performance-optimizer` — Core Web Vitals
- `vercel:env-vars` — env management
- `vercel:auth` — auth provider integration (for KYC if needed)
- `vercel:deployment-expert` — Vercel CI/CD
- `frontend-design:frontend-design` — distinctive non-generic UI
- `vercel:ai-sdk` — when AI features land

For contract-side questions (NAV math, function semantics, event topics), read from the sibling `mutav-stellar` repo rather than re-implementing.
