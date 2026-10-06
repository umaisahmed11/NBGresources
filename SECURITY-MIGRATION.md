# Dependency security migration

## Scope

Replaced ESLint, eslint-config-next, and @eslint/eslintrc with oxlint 1.87.0 to remove the braces denial-of-service dependency chain described in Vulnerability Solutions.md. Application behavior and styling are unchanged. Existing lockfile security updates were retained; the lockfile was not discarded. Next.js remains on the existing 15.5.25 release.

Node 22.23.3 was downloaded from nodejs.org and verified against its published SHA-256 checksum for local validation. `.nvmrc`, package engines, and CI document this runtime. No system-wide Node installation was modified. Deployment administrators must select this runtime and `npm run build` in their hosting settings.

## Baseline

Before migration, npm audit reported five high-severity findings in eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces. Existing lint and production build passed. The previous lockfile was backed up before installing dependencies.

## Lint coverage

The official @oxlint/migrate tool converted the existing next/core-web-vitals and next/typescript flat configuration with --js-plugins=false. No external ESLint JavaScript plugins are loaded. The configuration explicitly enables native Next.js, React (including React Hooks), TypeScript, import, and JSX accessibility rules, retaining the migrated severities and supported options.

- The converter produced 67 root rules. `react/require-render-return` was restored explicitly at error severity, bringing the root count to 68. This native rule was skipped because the converter considers it experimental.
- The converter emitted a null file matcher for the TypeScript override inherited from the ESLint preset. It was replaced with explicit ts, tsx, mts, and cts globs. The override retains its migrated rules, including no-var and prefer-const. TypeScript handles the syntax/type checks disabled by that override.
- `react/jsx-uses-react` and `react/jsx-uses-vars` are ESLint bookkeeping rules. Oxlint understands JSX references natively; React's automatic JSX runtime does not require an otherwise unused React import.
- `react/no-deprecated` has no native one-for-one replacement. This repository uses function components/hooks, with no legacy class lifecycle implementations or deprecated ReactDOM rendering APIs found during migration review. Native no-find-dom-node, no-is-mounted, no-string-refs, no-direct-mutation-state, and no-render-return-value rules remain enabled. This is not exact future deprecation-rule parity: adding legacy React APIs requires review.
- The ESLint-specific parser and import resolver settings were not carried across. Oxlint parses TypeScript/JSX natively; `npm run typecheck` checks module resolution using the existing tsconfig and aliases.
- React version is explicitly configured as 19.1.0. The migration-generated global declarations are retained to preserve the original environment definitions.
- The generated correctness category is off because the migration enumerates the existing rules explicitly instead of introducing Oxlint defaults. No individual checks were disabled to make this code pass.
- Build output, dependencies, coverage, and Next-generated declaration files are ignored. Next's old ESLint integration is disabled only because `npm run build` executes Oxlint and TypeScript first.

## Verification commands

```sh
npm ci
npm run build
npm audit
npm audit --omit=dev
npm ls braces micromatch fast-glob
```

An empty result (and nonzero status) from the final command is expected when those packages are absent. Audit results describe advisory data at verification time, not a permanent security guarantee.

## Verified results on 7 October 2026

- Clean `npm ci` completed on Node 22.23.3 / npm 10.9.9 without unsupported-engine warnings.
- `npm run build` passed Oxlint, TypeScript, and the Next.js production build; all 24 static-page generation steps completed.
- `npm audit` and `npm audit --omit=dev` both reported zero vulnerabilities.
- `npm ls braces micromatch fast-glob` returned an empty tree.
- A temporary regression fixture was rejected for conditional Hooks, missing JSX keys, missing image alt text, Next.js image usage, and unused variables; the fixture was removed afterward.
- Shared retained lockfile package versions did not change during the migration. The earlier sharp 0.35.5 and source-map-js 1.2.2 fixes remain; brace-expansion is no longer needed.
- Browser smoke checks passed for the home page, Company and Capabilities menus, adaptive RFQ fields, and contact page rendering. No forms were submitted.
