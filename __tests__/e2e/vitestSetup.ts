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
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  delete globalThis.page;
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  delete globalThis.goto;
});
