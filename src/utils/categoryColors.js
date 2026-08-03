// Fixed, vivid colors per known category so the same category always renders
// the same color across the doughnut chart and the breakdown list, and reads
// clearly on both light and dark backgrounds.
const CATEGORY_COLORS = {
  Food: "#f59e0b",
  Transportation: "#3b82f6",
  Shopping: "#ec4899",
  Bills: "#8b5cf6",
  Entertainment: "#06b6d4",
  Education: "#10b981",
  Healthcare: "#ef4444",
  Other: "#64748b",
};

const FALLBACK_PALETTE = ["#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981", "#ef4444", "#64748b"];

/**
 * Returns a stable color for a category. Known categories get a fixed color;
 * anything unrecognized falls back to a deterministic pick from the palette
 * based on the category name, so it's still consistent across renders.
 */
export function getCategoryColor(category) {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];

  let hash = 0;
  for (let i = 0; i < category.length; i += 1) {
    hash = (hash * 31 + category.charCodeAt(i)) % FALLBACK_PALETTE.length;
  }
  return FALLBACK_PALETTE[hash];
}
