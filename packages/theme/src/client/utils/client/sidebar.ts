import type { DefaultTheme } from 'vitepress/theme';
import { data } from '../../datas/articles.data';
import { ensureStartingSlash, isActive } from '../common';

// export interface SidebarLink {
//   text: string
//   link: string
//   docFooterText?: string
// }
export interface SidebarAutoMulti {
  [path: string]: 'auto'
}

type SidebarItem = DefaultTheme.SidebarItem;

/**
 * Get the `Sidebar` from sidebar option. This method will ensure to get correct
 * sidebar config from `MultiSideBarConfig` with various path combinations such
 * as matching `guide/` and `/guide/`. If no matching config was found, it will
 * return empty array.
 */
export function getSidebar(
  _sidebar: DefaultTheme.Sidebar | SidebarAutoMulti | undefined,
  path: string,
): DefaultTheme.SidebarItem[] {
  if (Array.isArray(_sidebar)) {
    return addBase(_sidebar);
  }

  if (!_sidebar) {
    return [];
  }

  path = ensureStartingSlash(path);
  const dir = Object.keys(_sidebar as DefaultTheme.SidebarMulti)
    .sort((a, b) => {
      return b.split('/').length - a.split('/').length;
    })
    .find(dir => {
      return path.startsWith(ensureStartingSlash(dir));
    });

  let sidebar: any = dir ? _sidebar![dir] : [];
  if (sidebar === 'auto' && dir) {
    sidebar = data.autoSidebar[dir];
  }

  return Array.isArray(sidebar)
    ? addBase(sidebar)
    : addBase(sidebar.items, sidebar.base);
}

/**
 * Get or generate sidebar group from the given sidebar items.
 */
export function getSidebarGroups(sidebar: SidebarItem[]): SidebarItem[] {
  const groups: SidebarItem[] = [];

  let lastGroupIndex: number = 0;

  for (const index in sidebar) {
    const item = sidebar[index];

    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }

    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }

    groups[lastGroupIndex]!.items!.push(item);
  }

  return groups;
}

/**
 * Check if the given sidebar item contains any active link.
 */
export function hasActiveLink(
  path: string,
  items: SidebarItem | SidebarItem[]
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

function addBase(items: SidebarItem[], _base?: string): SidebarItem[] {
  if (Array.isArray(items)) {
    return [...items].map(_item => {
      const item = { ..._item };
      const base = item.base || _base;
      if (base && item.link)
        item.link = base + item.link;
      if (item.items)
        item.items = addBase(item.items, base);
      return item;
    });
  }
  else {
    return [];
  }
}

