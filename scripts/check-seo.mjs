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

assert.ok(layout.includes('rel="author" href="https://chrisizworski.com/chris-izworski/"'), "layout needs canonical author link");
assert.ok(layout.includes('"@id": "https://chrisizworski.com/#person"'), "layout needs canonical Person ID");
assert.ok(layout.includes('url: "https://chrisizworski.com/chris-izworski/"'), "layout Person URL needs canonical profile");

console.log("SEO checks passed.");
