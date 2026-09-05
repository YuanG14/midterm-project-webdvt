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

export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] ?? null;
}
