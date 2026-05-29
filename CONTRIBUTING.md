# Contributing to mutav-invest

Thanks for your interest in contributing.

## Canonical workflow

The protocol-wide branch workflow, commit-message conventions, and PR review process live in the canonical docs repo:

- **General CONTRIBUTING:** https://github.com/mutav-finance/mutav/blob/main/CONTRIBUTING.md

This file documents only `mutav-invest`-specific notes. If anything below conflicts with the canonical doc, prefer the canonical doc and open an issue here.

## Setup

```bash
git clone https://github.com/mutav-finance/mutav-invest.git
cd mutav-invest
bun install
bun run dev
```

## Stack

- **Next.js 16** (App Router) + **TypeScript** — frontend
- **Bun** — package manager + script runner
- **Stellar SDK** + wallet kit — chain interaction

## Repo conventions

- **No barrel files.** Don't create `index.ts` files that only re-export from sibling modules.
- **Branch naming:** the canonical prefixes (`feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/`).
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
- **PRs:** squash-merge to `main`. The squash commit message follows Conventional Commits.
- **Code style:** run `bun run typecheck` before pushing. Formatter choice deferred until needed; match surrounding code.

## Boundary rule

This repo is the public investor surface — it holds **no operator or admin keys**. All transaction signing happens client-side via the user's Stellar wallet. If you find yourself needing to store a server-side key, the work belongs on `mutav-stellar` instead.

## Reporting issues

- **Bugs / features:** open a GitHub issue.
- **Security vulnerabilities:** **do not** open a public issue. See [`SECURITY.md`](./SECURITY.md).
