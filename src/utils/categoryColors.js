// Restrained, on-brand palette for the category donut/breakdown — a ramp of
// icy-blue tones (deep -> pastel) rather than arbitrary rainbow colors, plus
// one neutral for "Other" so the catch-all bucket doesn't read as its own
// distinct hue. Fixed per known category so the same category always
// renders the same color across the chart and the breakdown list.
const CATEGORY_COLORS = {
  Food: "#1E4A5C",
  Transportation: "#2E6B82",
  Shopping: "#397C96",
  Bills: "#5A9AB1",
  Entertainment: "#7DB6C9",
  Education: "#9DD3E8",
  Healthcare: "#C7E7F5",
  Other: "#8A9AA3",
};

const FALLBACK_PALETTE = [
  "#1E4A5C",
  "#2E6B82",
  "#397C96",
  "#5A9AB1",
  "#7DB6C9",
  "#9DD3E8",
  "#C7E7F5",
  "#8A9AA3",
];

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
