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
