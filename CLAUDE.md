@AGENTS.md

# MUTAV Fund — Agent Context

> **⚠️ Soft-deprecated (2026-05-30).** This repo folds into [`mutav-finance/mutav-app`](https://github.com/mutav-finance/mutav-app) `apps/fund/` as part of the Turborepo monorepo migration ([planning ask](https://github.com/mutav-finance/mutav-app/issues/139), [protocol decision](https://github.com/mutav-finance/mutav-stellar/issues/57), [policy](https://github.com/mutav-finance/mutav-fund/issues/11)). Until the migration lands, the repo stays functional — but **no new features here**: open them against `mutav-app` instead. Only critical fixes (security, broken build, dependency vulns) land in this repo. Archive happens after `apps/fund/` reaches feature parity, not before.

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

## Repo position (historical — see soft-deprecation note above)

- `mutav-finance/mutav-stellar`: Stellar contracts + TS SDK. The audited surface. (Operator-daemon code has been removed from scope per [#57](https://github.com/mutav-finance/mutav-stellar/issues/57); operator key moves to a KMS-backed Convex Action on `mutav-app`.)
- `mutav-finance/mutav-app`: agency platform today; **the future home of this repo's content** as `apps/fund/` under a Turborepo monorepo.
- **`mutav-finance/mutav-fund`** (this repo): web3 portal — investor flows + fund management. Wallet-signed throughout. **Soft-deprecated** pending the fold-in.

**Boundary rule** (still applies while this repo is alive): this repo holds NO operator or admin keys. All transaction signing is client-side via the user's wallet.

This repo consumes the `@mutav-finance/mutav-stellar` SDK. Contract reference + architecture docs live in `mutav-stellar/docs/architecture/`.

## Terminology (overloaded across repos)

When you write or read code in this repo, the smart-contract / on-chain sense always applies:

- **contract** = the Soroban `Fund` smart contract on `mutav-stellar` (consumed via the SDK). On `mutav-app` the word means a **rental contract** — the lease agreement between an agency and a tenant. The two are unrelated.
- **admin** = the Stellar admin keypair on the contract (a connected wallet whose pubkey matches the contract's `admin()` view). On `mutav-app` "admin" means an Auth0 staff role with no chain authority.
- **operator**, **treasury**, **fund** are single-sense. Full table in `mutav-stellar/docs/architecture/01-protocol-overview.md#terminology`.

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
