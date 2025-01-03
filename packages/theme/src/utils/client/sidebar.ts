import type { DefaultTheme } from 'vitepress/theme';
import type { ArticlesData, SidebarFrontmatter } from '../../datas/articles.data';
import { data } from '../../datas/articles.data';
import { ensureStartingSlash, isActive } from '../common';

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
  const sidebarArticleData = articleData.filter(item => item.sidebar !== false && item.path.startsWith(prefix));
  const fileTree = buildFileTree(sidebarArticleData, prefix);
  return Array.isArray(fileTree) ? fileTree : [fileTree];
}

interface FileNode {
  name: string
  path?: string
  fullPath: string
  items?: FileNode[]
  isRoot?: boolean
  link?: string
  text: string
  order: number
}

function handleSidebarFrontmatter(data?: SidebarFrontmatter | boolean): SidebarFrontmatter {
  if (!data)
    return {};
  if (typeof data === 'boolean') {
    return {};
  }
  else {
    return data;
  }
}
function appendIndexHtml(path: string): string {
  if (path.endsWith('/')) {
    return `${path}index.html`;
  }
  return path;
}

function restorePath(path: string): string {
  if (path.endsWith('index.html')) {
    return path.slice(0, -'index.html'.length);
  }
  return path;
}

function buildFileTree(articleData: ArticlesData[], rootPath: string = '/'): FileNode | FileNode[] {
  rootPath = `${rootPath.replace(/\/+$/, '')}/`;
  const data = articleData.map(item => ({ ...item, path: appendIndexHtml(item.path) }));
  const rootInfo = articleData.find(item => item.path === rootPath);
  let rootSidebarFrontmatter: SidebarFrontmatter = {};
  if (rootInfo) {
    rootSidebarFrontmatter = handleSidebarFrontmatter(rootInfo.sidebar);
  }
  const rootName = rootSidebarFrontmatter?.title || rootInfo?.title || '';
  const root: FileNode = {
    text: rootName,
    name: rootName,
    path: rootPath,
    fullPath: rootPath,
    items: [],
    isRoot: !!rootInfo,
    order: rootSidebarFrontmatter?.order || 0
  };
  data.forEach(({ path, sidebar, title }) => {
    if (!path.startsWith(rootPath)) {
      return;
    }
    const sidebarFrontmatter = handleSidebarFrontmatter(sidebar);
    const childText = sidebarFrontmatter?.text || title;
    const relativePath = path.slice(rootPath.length);
    const segments = relativePath.split('/').filter(Boolean);
    let current = root;

    segments.forEach((segment, index) => {
      if (!current.items) {
        current.items = [];
      }

      let node = current.items.find(item => item.name === segment);
      if (!node) {
        const isDirectory = path.endsWith('/') || index < segments.length - 1;
        const fullPath = `${rootPath}${segments.slice(0, index + 1).join('/')}${isDirectory ? '/' : ''}`;
        const rootInfo = articleData.find(item => item.path === fullPath);
        const rootSidebarFront = handleSidebarFrontmatter(rootInfo?.sidebar);
        const isRoot = isDirectory && !!(rootInfo);
        node = {
          text: isRoot ? (rootSidebarFront?.title || childText) : childText,
          name: segment,
          fullPath,
          isRoot,
          order: sidebarFrontmatter?.order || 0,
          link: path.endsWith(segment) ? restorePath(fullPath) : undefined,
          items: path.endsWith(segment) ? undefined : []
        };
        current.items.push(node);
        current.items.sort((a, b) => {
          const aIsDirectory = a.link?.endsWith('/');
          const bIsDirectory = b.link?.endsWith('/');
          if (bIsDirectory && !aIsDirectory) {
            return 1;
          }
          else if (aIsDirectory && !bIsDirectory) {
            return -1;
          }
          if (a.order !== b.order) {
            return b.order - a.order;
          }
          return a.name.localeCompare(b.name);
        });
      }

      current = node;
    });
  });
  return root.isRoot ? root : root.items || [];
}
