import { type Browser, chromium } from 'playwright-chromium';

let browser: Browser;

beforeAll(async () => {
  browser = await chromium.connect(process.env.WS_ENDPOINT!);
  globalThis.page = await browser.newPage();
  globalThis.goto = async (path: string) => {
    await page.goto(`http://localhost:${process.env.PORT}${path}`);
    await page.waitForSelector('#app .Layout');
  };
});

afterAll(async () => {
  await page.close();
  await browser.close();
  delete (globalThis as any).page;
  delete (globalThis as any).goto;
});
