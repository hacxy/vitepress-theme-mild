import type { Page } from 'playwright-chromium';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var page: Page;

  // eslint-disable-next-line vars-on-top, no-var
  var goto: (path: string) => Promise<void>;
}
