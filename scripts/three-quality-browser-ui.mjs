/** Support the established HUD menu as well as the earlier exposed controls. */
export async function openThreeControls(page, diagnostics = false) {
  const menu = page.locator('details.hud-menu');
  if (await menu.count() && await menu.getAttribute('open') === null) await menu.locator(':scope > summary').click();
  if (diagnostics) {
    const section = page.locator('.hud-menu-content > details').filter({ has: page.locator('#quality-options') });
    if (await section.count() && await section.getAttribute('open') === null) await section.locator(':scope > summary').click();
  }
}
export async function closeThreeControls(page) {
  const menu = page.locator('details.hud-menu');
  if (await menu.count() && await menu.getAttribute('open') !== null) await menu.locator(':scope > summary').click();
}
