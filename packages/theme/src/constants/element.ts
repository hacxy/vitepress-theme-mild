import { CALENDAR, CLOCK, WORDS } from './svg';

export function generateDocsHeaderInfoEl(date: string, words: number, min: number) {
  return `
<div class="VMDocHeadInfo">
  <div class="info">${CALENDAR}<div>${date}</div></div>
  <div class="info">${WORDS}<div>${words} words</div></div>
  <div class="info">${CLOCK}<div>${min} min</div></div>
</div>`;
}
