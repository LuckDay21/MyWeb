import { test, expect } from "@playwright/test";

test.describe("Portfolio Smoke & Visual Checks", () => {
  test("loads homepage without console errors", async ({ page }) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");

    // Verify title
    await expect(page).toHaveTitle(/Quraish/);

    // Verify Hero headline
    const headline = page.locator("h1");
    await expect(headline).toBeVisible();
    await expect(headline).toContainText("Crafting interfaces");

    // Verify CTA button
    const cta = page.getByRole("link", { name: /Get in touch/i }).first();
    await expect(cta).toBeVisible();

    // Verify 3D canvas is present
    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible();

    // Verify all major sections exist
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#experience")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // Filter out unavoidable browser extension / CSP warnings if any
    const realErrors = errors.filter(
      (err) => !err.includes("favicon") && !err.includes("chrome-extension")
    );
    expect(realErrors).toEqual([]);
  });

  test("navigation anchors work correctly", async ({ page }) => {
    await page.goto("/");
    const aboutLink = page.getByRole("link", { name: "About" }).first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page.locator("#about")).toBeInViewport();
    }
  });

  test("captures visual snapshot", async ({ page }, testInfo) => {
    await page.goto("/");
    // Wait for animations and fonts to settle
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `test-results/screenshot-${testInfo.project.name}.png`,
      fullPage: false,
    });
  });
});
