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
  const dir = Object.keys(_sidebar as DefaultTheme.SidebarMulti)
    .sort((a, b) => {
      return b.split('/').length - a.split('/').length;
    })
    .find(dir => {
      return path.startsWith(ensureStartingSlash(dir));
    });

  let sidebar = dir ? _sidebar![dir] : [];
  if (sidebar === 'auto') {
    sidebar = handleDirSidebar(data, dir || '');
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

export function handleDirSidebar(articleData: ArticlesData[], prefix: string): SidebarItem[] {
  let sidebar: (SidebarItem & { order: number })[] = [];
  const unstructured: ArticlesData[] = [];
  const structured: ArticlesData[] = [];

  articleData.forEach(item => {
    if (item.path.startsWith(prefix)) {
      if (item.path.replace(prefix, '').split('/').length === 1) {
        unstructured.push(item);
      }
      else {
        structured.push(item);
      }
    }
  });

  unstructured.forEach(item => {
    let { sidebar: sidebarFrontmatter } = item;
    if (sidebarFrontmatter !== false) {
      if (sidebarFrontmatter === true) {
        sidebarFrontmatter = {};
      }
      sidebar.push(
        {
          text: sidebarFrontmatter?.text || item.title,
          link: item.path,
          order: sidebarFrontmatter?.order || 0,
        }
      );
    }
  });

  const child = new Map<string, number>();
  structured.forEach(item => {
    const { sidebar: sidebarFrontmatter } = item;
    if (sidebarFrontmatter !== false) {
      const dir = item.path.replace(prefix, '').split('/').shift();
      if (dir && !child.has(dir)) {
        const parts = item.path.replace(prefix, '').split('/');
        const childPrefix = `${prefix}${parts.shift()}/`;

        let parentInfo = structured.find(item => item.path === childPrefix)?.sidebar;
        if (typeof parentInfo === 'boolean') {
          parentInfo = {};
        }
        if (!parentInfo?.hide) {
          sidebar.unshift({
            ...parentInfo,
            order: parentInfo?.order || 0,
            text: parentInfo?.title || capitalizeFirstLetter(dir),
            items: handleDirSidebar(structured, childPrefix)
          });
        }
        child.set(dir, 1);
      }
    }
  });

  sidebar = sidebar.sort((a, b) => {
    const aEndsWithHtml = a?.link?.endsWith('.html');
    const bEndsWithHtml = b?.link?.endsWith('.html');

    // 1. 先判断是否以 '.html' 结尾，将不以 '.html' 结尾的置顶
    if (aEndsWithHtml && !bEndsWithHtml) {
      return 1;
    }
    else if (!aEndsWithHtml && bEndsWithHtml) {
      return -1;
    }

    if (a.order !== b.order) {
      return b.order - a.order;
    }
    else {
      const aName = a.text || '';
      const bName = b.text || '';
      return aName.localeCompare(bName);
    }
  });
  return sidebar;
}

