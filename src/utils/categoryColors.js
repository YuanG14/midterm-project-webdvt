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

export function getCategoryColor(category) {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];

  let hash = 0;
  for (let i = 0; i < category.length; i += 1) {
    hash = (hash * 31 + category.charCodeAt(i)) % FALLBACK_PALETTE.length;
  }
  return FALLBACK_PALETTE[hash];
}
