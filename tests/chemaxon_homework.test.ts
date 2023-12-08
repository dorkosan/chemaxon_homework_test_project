import { test, expect } from '@playwright/test';

test.beforeEach('Open idokep and close the banner', async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  await page.goto('https://www.idokep.hu/');
  // Check if GDPR banner is present which has a unique class
  const gdprBanner = await page.waitForSelector('.css-1wjnr64');
  expect(gdprBanner).toBeTruthy();
  await page.click('.qc-cmp2-footer button[mode="primary"]');
});

test.afterEach('Closing page', async ({ page }, testInfo) => {
  await page.close();
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test('Validate accept Idokep GDPR Banner ', async ({ page }) => {
  // Wait for the banner to be removed from the DOM
  await page.waitForSelector('.qc-cmp2-ui', { state: 'hidden' });
  const gdprBannerAfterAccept = await page.$('.qc-cmp2-ui');
  expect(gdprBannerAfterAccept).toBeNull();
});

test('Validate "Riasztas" Menu on Idokep', async ({ page }) => {
  await page.waitForSelector('.qc-cmp2-ui', { state: 'hidden' });
  const gdprBannerAfterAccept = await page.$('.qc-cmp2-ui');
  // Find and assert the presence of the "Riasztás" menu item 
  const radarMenu = await page.waitForSelector(
    '#menubarDesktop > div > div > nav > ul > li:nth-child(6) > a');
  radarMenu.click();
  await page.getByRole('link', { name: 'Riasztás' }).click();
  await page.getByRole('img', { name: '-3 órás riasztás' }).click();
});

test('Validate temperature is between -50 +50 celsius range  ', async ({ page }) => {
  await page.click('#eloreoldal');
  await page.waitForSelector('div.ik.tempValue');
  const temperatureElements = await page.$$('div.ik.tempValue');
  expect(temperatureElements.length).toEqual(36);
  for (const temperatureElement of temperatureElements) {  
    const temperature = parseInt(await temperatureElement.innerText());
    expect(temperature).toBeGreaterThanOrEqual(-50);
    expect(temperature).toBeLessThanOrEqual(50);
  }
});
