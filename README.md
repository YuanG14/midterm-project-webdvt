# Ledger — Personal Budget Tracker

Ledger is a completed responsive personal budget tracking web application built with React. It lets users record income and expenses, organize transactions by category, monitor their current balance, review individual entries, and understand spending patterns through a visual summary dashboard.

The application runs entirely in the browser and stores transaction data and theme preferences in `localStorage`, so no backend or database setup is required.

## Project Status

**Completed**

The core requirements and final UI/UX polish are implemented, including routing, transaction CRUD operations, filtering, financial summaries, data visualization, responsive layouts, accessibility improvements, and light/dark theme support.

## Features

- **Amount validation:** Transactions accept ₱0.01–₱999,999,999.99 with up to two decimal places and show inline validation errors.

### Dashboard

- Displays the current balance, total income, and total expenses.
- Lists recorded transactions from newest to oldest.
- Filters transactions by category and type (`Income` or `Expense`).
- Shows transaction categories, type indicators, dates, and formatted amounts.
- Links each transaction to its own detail page.
- Provides clear empty and no-results states.
- Shows success/error-style toast feedback after add, edit, and delete actions.

### Add Transaction

- Adds a new income or expense transaction.
- Includes fields for:
  - Title
  - Amount
  - Transaction type
  - Category
  - Date
  - Optional notes
- Uses different category options for income and expenses.
- Validates required fields and prevents invalid or non-positive amounts.
- Returns the user to the Dashboard after a successful submission.

### Transaction Detail

- Uses a dedicated route for every transaction: `/transaction/:id`.
- Displays the complete information for a selected transaction.
- Supports switching between read-only and edit modes.
- Allows users to update transaction details using the same validation rules as the Add Transaction form.
- Allows users to delete a transaction through a confirmation modal.
- Handles invalid or missing transaction IDs with a not-found state.

### Summary

- Displays a financial overview of balance, income, expenses, and total recorded activity.
- Breaks down expenses by category.
- Uses an interactive donut chart for spending visualization.
- Highlights useful financial insights such as:
  - Largest expense category
  - Highest individual expense
  - Largest income source
  - Average expense
  - Average income
- Handles accounts with no transactions or no recorded expenses gracefully.

### Theme Support

- Supports both light and dark themes.
- Uses React Context API for app-wide theme state.
- Saves the selected theme in `localStorage`.
- Falls back to the user's system color preference when no saved theme exists.
- Applies the selected theme across all routes.

### Local Data Persistence

- Transactions are saved in the browser using `localStorage`.
- Saved transactions remain available after refreshing or reopening the application in the same browser.
- Stored data is validated before being loaded to reduce issues caused by malformed entries.
- Transaction IDs are generated using `crypto.randomUUID()` when available, with a fallback ID generator.

### Responsive & Accessible UI

- Responsive layouts for mobile, tablet, and desktop screens.
- Mobile bottom navigation and desktop navigation bar.
- Large currency values are handled without overflowing narrow screens.
- Keyboard-visible focus states are provided for interactive controls.
- Includes a skip-to-content link.
- Theme control uses accessible switch semantics and labels.
- Forms provide clear validation messages and error states.
- Page transitions and interface feedback are kept lightweight and purposeful.

## Application Routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Dashboard | View balance, totals, filters, and all transactions |
| `/add` | Add Transaction | Create a new income or expense entry |
| `/transaction/:id` | Transaction Detail | View, edit, or delete a specific transaction |
| `/summary` | Summary | Review spending breakdowns, charts, and financial insights |

## Tech Stack

- **React 19** — component-based user interface
- **Vite 8** — development server and production build tooling
- **React Router DOM 7** — client-side routing
- **React Context API** — global theme management
- **Tailwind CSS 4** — responsive styling and design system utilities
- **Recharts** — spending visualization
- **Framer Motion** — page and interface transitions
- **Lucide React** — interface icons
- **localStorage** — browser-based transaction and theme persistence
- **Oxlint** — source-code linting

## Getting Started

### Prerequisites

Install a current Node.js LTS release and npm before running the project.

### Installation

1. Clone or download the project.
2. Open a terminal inside the project folder.
3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown by Vite in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates an optimized production build in the `dist` folder.

```bash
npm run preview
```

Serves the production build locally for previewing.

```bash
npm run lint
```

Runs Oxlint against the project source.

## Project Structure

```text
midterm-project-webdvt-main/
├── public/
├── src/
│   ├── components/      # Reusable UI and feature components
│   ├── context/         # Theme Context API provider and hook
│   ├── hooks/           # Transaction state, CRUD, totals, and persistence
│   ├── pages/           # Dashboard, Add, Detail, and Summary pages
│   ├── utils/           # Validation, formatting, categories, icons, and motion helpers
│   ├── App.jsx          # Application route definitions
│   ├── index.css        # Global styles and design tokens
│   └── main.jsx         # React application entry point
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Data Model

Each transaction contains the following fields:

```text
id
 title
 amount
 category
 type       -> income | expense
 date
 notes
```

Transaction data is managed through the custom `useTransactions` hook, which acts as the application's single source of truth for CRUD operations, totals, and browser persistence.

## Categories

**Expense:** Food, Transportation, Shopping, Bills, Entertainment, Education, Healthcare, Other

**Income:** Salary, Freelance, Business, Investments, Gift, Other

## Notes

- This project does not require a backend server or external database.
- Data is stored per browser/device through `localStorage`; clearing browser storage will remove saved transactions and theme preferences.
- The application uses Philippine peso (`₱`) formatting for financial values.

## License

This project was created for educational purposes.
