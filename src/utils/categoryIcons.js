import {
  Briefcase,
  Building2,
  Car,
  Clapperboard,
  Gift,
  GraduationCap,
  HeartPulse,
  Laptop,
  LineChart,
  Receipt,
  ShoppingBag,
  Utensils,
} from "lucide-react";

// Maps known expense/income categories (see CATEGORIES_BY_TYPE in
// transactionFormShared.js) to a representative icon for the Dashboard
// transaction list. "Other" and any unrecognized category intentionally
// have no entry here — callers fall back to a plain income/expense
// direction icon in that case.
const CATEGORY_ICONS = {
  Food: Utensils,
  Transportation: Car,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Entertainment: Clapperboard,
  Education: GraduationCap,
  Healthcare: HeartPulse,
  Salary: Briefcase,
  Freelance: Laptop,
  Business: Building2,
  Investments: LineChart,
  Gift: Gift,
};

/**
 * Returns an icon component for a transaction category, or null if the
 * category isn't recognized (caller should fall back to a direction icon).
 */
export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] ?? null;
}
