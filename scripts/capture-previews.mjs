import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../public/assets/projects");
const GH_API = "https://api.github.com/users/LuckDay21/repos?sort=updated&per_page=100";

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  console.log("Fetching repositories from GitHub...");
  const res = await fetch(GH_API);
  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub repos: ${res.status}`);
  }
  const repos = await res.json();

  const validRepos = repos.filter(
    (repo) =>
      !repo.fork &&
      repo.name !== "MyWeb" &&
      repo.name !== "LuckDay21" &&
      Boolean(repo.homepage)
  );

  console.log(`Found ${validRepos.length} repositories with live homepages.`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 1.5,
  });

  for (const repo of validRepos) {
    const filename = `${repo.name.toLowerCase()}.png`;
    const destPath = path.join(OUTPUT_DIR, filename);

    console.log(`Capturing ${repo.name} (${repo.homepage}) -> ${filename}...`);

    try {
      const page = await context.newPage();
      await page.goto(repo.homepage, {
        waitUntil: "domcontentloaded",
        timeout: 25000,
      });

      // Wait 1.5s for fonts, animations, and textures to settle
      await page.waitForTimeout(1500);

      await page.screenshot({
        path: destPath,
        type: "png",
      });

      await page.close();
      console.log(`  ✓ Saved: ${destPath}`);
    } catch (err) {
      console.warn(`  ✗ Failed to capture ${repo.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log("\nDone capturing project previews!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
