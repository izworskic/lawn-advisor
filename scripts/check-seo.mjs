import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const homepage = readFileSync("pages/index.js", "utf8");
const layout = readFileSync("components/Layout.js", "utf8");

assert.ok(
  homepage.includes('title="Personalized Lawn Care Plan by Address"'),
  "homepage needs an evergreen, query-focused title",
);
assert.ok(
  !homepage.includes("CURRENT_MONTH_NAME") && !homepage.includes("CURRENT_YEAR"),
  "homepage metadata and visible labels must not freeze a build-time month or year",
);
assert.ok(
  layout.includes('`${title} | Perfect Lawn Advisor`'),
  "layout must append the concise site name to page titles",
);

console.log("SEO checks passed.");
