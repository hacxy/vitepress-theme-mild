import type { DefaultTheme } from 'vitepress';
import { isActive } from '../common';

export interface SidebarLink {
  text: string
  link: string
  docFooterText?: string
}
export function getFlatSideBarLinks(sidebar: DefaultTheme.SidebarItem[]): SidebarLink[] {
  const links: SidebarLink[] = [];

  function recursivelyExtractLinks(items: DefaultTheme.SidebarItem[]) {
    for (const item of items) {
      if (item.text && item.link) {
        links.push({
          text: item.text,
          link: item.link,
          docFooterText: item.docFooterText
        });
      }

      if (item.items) {
        recursivelyExtractLinks(item.items);
      }
    }
  }

  recursivelyExtractLinks(sidebar);

  return links;
}

/**
 * Check if the given sidebar item contains any active link.
 */
export function hasActiveLink(
  path: string,
  items: DefaultTheme.SidebarItem | DefaultTheme.SidebarItem[]
): boolean {
  if (Array.isArray(items)) {
    return items.some(item => hasActiveLink(path, item));
  }

  return isActive(path, items.link)
    ? true
    : items.items
      ? hasActiveLink(path, items.items)
      : false;
}
