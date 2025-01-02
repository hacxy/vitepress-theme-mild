import type { DefaultTheme } from 'vitepress/theme';
import type { ArticlesData } from '../../datas/articles.data';
import { data } from '../../datas/articles.data';
import { capitalizeFirstLetter, ensureStartingSlash, isActive } from '../common';

export interface SidebarLink {
  text: string
  link: string
  docFooterText?: string
}
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
  path: string
): DefaultTheme.SidebarItem[] {
  if (Array.isArray(_sidebar)) {
    return addBase(_sidebar);
  }

  if (_sidebar === null) {
    return [];
  }

  path = ensureStartingSlash(path);
  // console.log(path);
  const dir = Object.keys(_sidebar as DefaultTheme.SidebarMulti)
    .sort((a, b) => {
      return b.split('/').length - a.split('/').length;
    })
    .find(dir => {
      // console.log(ensureStartingSlash(dir));
      // make sure the multi sidebar key starts with slash too
      return path.startsWith(ensureStartingSlash(dir));
    });

  let sidebar = dir ? _sidebar![dir] : [];
  if (sidebar === 'auto') {
    sidebar = handleDirSidebar(dir || '');
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

export function getFlatSideBarLinks(sidebar: SidebarItem[]): SidebarLink[] {
  const links: SidebarLink[] = [];

  function recursivelyExtractLinks(items: SidebarItem[]) {
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

export function handleDirSidebar(prefix: string): SidebarItem[] {
  let sidebar: SidebarItem[] = [];
  const unstructured: ArticlesData[] = [];
  const structured: ArticlesData[] = [];

  data.forEach(item => {
    if (item.sidebar !== false && item.path.startsWith(prefix)) {
      if (item.path.replace(prefix, '').split('/').length === 1) {
        unstructured.push(item);
      }
      else {
        structured.push(item);
      }
    }
  });

  const finalUnstructured = unstructured.sort((a, b) => {
    const aName = a.path.split('/').pop() || '';
    const bName = b.path.split('/').pop() || '';
    return aName.localeCompare(bName);
  });

  sidebar = finalUnstructured.map(item => {
    let { sidebar: sidebarFrontmatter } = item;
    if (typeof sidebarFrontmatter === 'boolean') {
      sidebarFrontmatter = {};
    }
    return {
      link: item.path,
      text: sidebarFrontmatter?.text || item.title
    };
  });

  const child = new Map<string, number>();
  structured.forEach(item => {
    const dir = item.path.replace(prefix, '').split('/').shift();
    if (dir && !child.has(dir)) {
      const parts = item.path.replace(prefix, '').split('/');
      const childPrefix = `${prefix}${parts.shift()}/`;
      let parentInfo = structured.find(item => item.path === childPrefix)?.sidebar;
      if (typeof parentInfo === 'boolean') {
        parentInfo = {};
      }
      sidebar.push({
        ...parentInfo,
        text: parentInfo?.title || capitalizeFirstLetter(dir),
        items: handleDirSidebar(childPrefix)
      });
      child.set(dir, 1);
    }
  });

  return sidebar;
}

