# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Performance Optimization

### Problem Identified

Two sources of unnecessary re-renders were found:

1. **Theme context re-creation.** `ThemeProvider` built a brand-new `{ theme, toggleTheme }` object (and a brand-new `toggleTheme` function) on every render. Any component consuming `useTheme()` — including the `Summary` page and the navbar's theme toggle — re-rendered whenever the provider re-rendered, even when `theme` itself hadn't changed.
2. **List and card re-renders.** `TransactionCard` (rendered in a list on the Dashboard), `SummaryCard`, `InsightCard`, `CategoryBreakdown`, and `SpendingChart` (a recharts `PieChart`) all re-rendered whenever their parent page re-rendered, regardless of whether the props passed to them had actually changed. On the Dashboard this happened on every filter change; on the Summary page it happened on every theme toggle.

### Solution Applied

- Wrapped the `ThemeProvider`'s `toggleTheme` in `useCallback` and the context value in `useMemo`, so the object identity only changes when `theme` itself changes.
- Wrapped `TransactionCard`, `SummaryCard`, `InsightCard`, `CategoryBreakdown`, and `SpendingChart` in `React.memo`, so they skip re-rendering when their props are unchanged.

`useTransactions` and the Dashboard/Summary calculations were reviewed and already used `useMemo`/`useCallback` correctly for derived values (`incomeTotal`, `expenseTotal`, `balance`, `filteredTransactions`, `categoryBreakdown`, `insights`, etc.), so no changes were needed there.

### Techniques Used

- `React.memo` — `TransactionCard`, `SummaryCard`, `InsightCard`, `CategoryBreakdown`, `SpendingChart`
- `useMemo` — memoized theme context value
- `useCallback` — memoized `toggleTheme`

## UI Enhancement Phase 1 — Design System & Global Polish

Global visual polish pass across the whole app. No routing, business logic, ThemeContext logic, useTransactions logic, or page structure was touched.

### Color System

- Added a `--color-warning` (amber) semantic token, in both light and dark themes, rounding out the existing income (green)/expense (red-rose)/accent (indigo) semantic palette for future use.
- All existing colors (canvas, surface, border, ink, primary, accent, danger) were left as-is — they already implement the emerald/indigo finance palette with light/dark variants.

### Elevation / Shadows

- Replaced ~11 repeated hardcoded `shadow-[...]` rgba strings across components with five shared elevation tokens: `--shadow-xs`, `--shadow-card`, `--shadow-card-hover`, `--shadow-raised`, `--shadow-float`.
- Gave dark mode its own shadow values (deeper, more diffuse black-based shadows) instead of reusing the light-mode rgba values, since a light-derived shadow barely reads against a dark canvas — cards now have real, visible depth in both themes.

### Global Interaction Polish

- Added a consistent, accessible `:focus-visible` ring (via `box-shadow`) to every link, button, and form control app-wide, applied once globally instead of per-component.
- Added a themed text-selection color and a slim, theme-aware scrollbar (Webkit + Firefox) so the polish holds up outside of cards.
- Introduced a shared `--ease-premium` cubic-bezier easing curve and applied it to the existing global color/border/shadow transitions for a snappier, more intentional feel.

### Typography / Layout / Cards / Buttons / Inputs

- Reviewed against the brief: type hierarchy (Manrope display font for headings, Inter for body, IBM Plex Mono for figures), card styling (rounded-2xl, soft elevation, hover lift), button styling (pill-shaped, hover translate, disabled states), and input styling (rounded, focus rings, placeholder color) were already in place from earlier phases and consistent across light/dark — no changes were needed there beyond the shared shadow tokens and global focus states above.

### Files Modified

- `src/index.css` — color/shadow/easing tokens, global focus/selection/scrollbar styles
- `src/components/SummaryCard.jsx`, `TransactionCard.jsx`, `TransactionDetailCard.jsx`, `EmptyState.jsx`, `PlaceholderPanel.jsx`, `ConfirmationModal.jsx`, `SpendingChart.jsx`, `TransactionForm.jsx`, `EditTransactionForm.jsx` — swapped hardcoded shadow strings for the new elevation tokens
- `src/pages/Summary.jsx` — same shadow-token swap on its two inline panel wrappers

No changes to `App.jsx`, `ThemeContext.jsx`, `useTransactions.js`, transaction schema, localStorage logic, CRUD functions, validation, or filtering logic.

## UI Enhancement Phase 2 — Dashboard Redesign

Visual redesign of the Dashboard page only. Dashboard calculations, filter logic, `useTransactions`, routing, and Theme Context are unchanged.

### New Components

Since `PageHeader`, `SummaryCard`, and `EmptyState` are shared with other pages (Add Transaction, Transaction Detail, Summary), new Dashboard-only components were created instead of editing those shared files, so this redesign can't change any other page's look:

- **`DashboardHeader`** — replaces `PageHeader` on this page: a welcoming "Welcome back" title, a short financial-overview description, the current day/date, and the existing "Add Transaction" button (still links to `/add`).
- **`FinancialCard`** — replaces `SummaryCard` on this page for the three stat cards: adds a top gradient accent bar, a larger glow blob, a bigger icon container with a hover scale effect, and a bigger figure.
- **`DashboardEmptyState`** — replaces `EmptyState` on this page: a gradient icon tile instead of a flat circle, same "No transactions yet" copy and Add Transaction CTA.

### Edited In Place (Dashboard-only components — safe to redesign directly)

- **`TransactionCard`** — now shows a category-specific icon (Food, Transportation, Shopping, Bills, Entertainment, Education, Healthcare, Salary, Freelance, Business, Investments, Gift — via a new `utils/categoryIcons.js` map, falling back to the original income/expense arrow for "Other"/unrecognized categories), an explicit "Income"/"Expense" badge alongside the category pill, relative dates ("Today"/"Yesterday" instead of an absolute date for recent entries), and a subtle icon hover-scale + chevron slide.
- **`FilterBar`** — redesigned as a bordered control panel with per-field icons, and a "Clear" affordance that appears once a filter is active (built from the same `onCategoryChange`/`onTypeChange` callbacks Dashboard already passes in — no new filtering logic).
- **`Dashboard.jsx`** — wired in the three components above, gave the "no matching filters" state an icon, and added a subtle staggered fade-in for the transaction list.

### Responsiveness & Motion

- Stat cards: 1 column on mobile, 2 on tablet, 3 on desktop (unchanged grid, richer cards).
- Filter panel stacks vertically on mobile, inline on larger screens.
- All new hover/entrance animations are short (150–300ms) and reuse the existing `fadeIn` keyframe and shadow/easing tokens from UI Phase 1.

### Confirmation

No changes to `useTransactions.js`, transaction data structure, localStorage logic, Dashboard's balance/income/expense calculations, filter logic, React Router, Theme Context, or CRUD functions. Balance, income, and expense figures, filtering behavior, and transaction navigation all work exactly as before.

## Phase 9 — Final Polish, Consistency & Production QA

Audit-first final pass. No redesign, no new pages/features, no changes to routing, Context API, `useTransactions`, calculations, or transaction schema.

### Audit findings

- `npm run build` and `oxlint` were both already clean (one pre-existing, harmless fast-refresh lint note in `ThemeContext.jsx`, left as-is since it flags a standard React pattern, not a bug).
- The design-system primitives added in earlier phases (`.card`, `.btn`, `.field-input`, `.badge`, `.data-row`, `.accent-rule`, etc. in `index.css`) were only adopted by a handful of components. Several superseded components from earlier phases — including `GradientMesh`/`PageHeader` (the gradient-blob header treatment the design direction explicitly moved away from) — were still present in `src/` but no longer imported anywhere.
- `EditTransactionForm` (Transaction Detail's edit form) still used its own hand-rolled Tailwind for inputs/textarea/container instead of the shared `.field-input`/`.field-textarea`/`.card` classes that `TransactionForm` (Add Transaction) already uses, so the two forms didn't quite read as the same product.

### Changes made

- **Removed 17 unused files** with zero remaining imports anywhere in the app: `AnalyticsSection`, `ChartCard`, `FinancialCard`, `FormActions`, `FormField`, `GradientMesh`, `InsightCard`, `InsightDetailRow`, `InsightStatGroup`, `InsightTransactionRow`, `PageHeader`, `PlaceholderPanel`, `Sidebar`, `SummaryCard`, `SummaryStatCard`, `TransactionDetailCard`, `TypeToggle`, and `utils/insightFormatting.js`. These were earlier-phase components/utilities superseded by their current replacements (e.g. `DashboardHeader`/`SummaryHeader`/etc. replaced `PageHeader`, `BalanceOverview` replaced `FinancialCard`, `InsightRow` replaced the `Insight*` set, `Navbar` replaced `Sidebar`). Confirmed unused via static import search before deleting, then verified with a clean production build. Net effect: no visual or behavioral change, smaller bundle (CSS 54.17 kB → 41.90 kB gzipped-relevant output shrank correspondingly), no more dead gradient/blur header code sitting unused in the tree.
- **`EditTransactionForm.jsx`** — swapped its ad-hoc `rounded-xl border ... focus:ring-2` input/textarea classes and ad-hoc card container for the shared `.field-input` / `.field-textarea` / `.card card-padded` classes already used by `TransactionForm`, `FilterBar`, and `ConfirmationModal`, and added the same `field-error-state` class binding `TransactionForm` uses so an invalid field's border goes red instead of only showing the error text below it. Visual result and all validation/save/cancel/delete behavior are unchanged — this only makes the Edit form's markup consistent with the Add form's, so the two feel like the same designed product rather than two different implementations of the same fields.

### Verified

- Production build (`npm run build`) succeeds with no errors.
- `oxlint` reports the same single pre-existing warning as before (no new issues).
- Dashboard, Add Transaction, Transaction Detail, and Summary all still render, filter, add, edit, delete, and theme-toggle exactly as before — no page, route, or calculation was touched.
