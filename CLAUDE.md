# MUTAV Invest — Agent Context

## Project

MUTAV — onchain rental guarantee infrastructure.

This is the **investor portal** of MUTAV — a public dApp where investors view fund data, deposit USDC, request redemptions, and claim. All signing happens client-side via the user's Stellar wallet.

Scope of this repo:
- Next.js App Router frontend
- Stellar SDK + wallet kit integration (read on-chain state, submit user-signed txs)
- Investor-facing views: NAV / AUM / yield history / balance / pending redemption
- KYC / onboarding (if/when required)

## Three-repo split

- `mutav-finance/mutav-stellar`: Stellar contracts + TS SDK + operator daemons. The audited surface.
- `mutav-finance/mutav-app`: real-estate platform (Auth0 + Convex) for agencies.
- **`mutav-finance/mutav-invest`** (this repo): investor portal — public dApp.

**Boundary rule**: this repo holds NO operator or admin keys. All signing is client-side via the user's wallet.

This repo consumes the `@mutav-finance/mutav-stellar` SDK. Architecture docs and contract reference live in `mutav-stellar/docs/architecture/`.

## Shared docs

Strategy, whitepaper, and brand assets live in `mutav-finance/mutav`. Clone for context:

```bash
git clone https://github.com/mutav-finance/mutav.git ../mutav
```

For per-protocol reference (contract surface, NAV math, events), see the sibling: `git clone https://github.com/mutav-finance/mutav-stellar.git ../mutav-stellar`.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Bun** for package mgmt and scripts
- **Stellar SDK** (`@stellar/stellar-sdk`) for chain reads
- **Wallet kit** (TBD: Freighter / Albedo / stellar-wallets-kit) for client-side signing
- Branch workflow: feature branches → squash merge PRs to main
- Hosting: Vercel (anticipated)

## Code standards

- `bun run typecheck` and `bun run lint` before pushing
- Conventional Commits for messages
- Match surrounding code style; no formatter pinned yet (will adopt Biome or Prettier in a follow-up)

## Relevant skills (for agents)

For Next.js / Vercel / shadcn / wallet-connect work, prefer:
- `vercel:nextjs` — App Router patterns
- `vercel:shadcn` — design-system + components
- `vercel:react-best-practices` — TSX quality checklist
- `vercel:performance-optimizer` — Core Web Vitals
- `vercel:env-vars` — env management
- `vercel:auth` — auth provider integration
- `vercel:deployment-expert` — Vercel CI/CD
- `frontend-design:frontend-design` — distinctive non-generic UI
- `vercel:ai-sdk` — when AI features land

For contract-side questions (NAV math, function semantics), read from the sibling `mutav-stellar` repo rather than re-implementing.
