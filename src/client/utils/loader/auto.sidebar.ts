import type { ContentData, SiteConfig } from 'vitepress';
import path from 'node:path';
import { isObject } from '@vueuse/core';
import directoryTree from 'directory-tree';
import matter from 'gray-matter';
import { capitalizeFirstFormat } from '../../../shared/utils';
import { ensureIndexMd, normalizePath } from '../node/path';

// sidebar排序, 越小越靠前
function sortSidebar(sidebar: any[]) {
  sidebar.forEach(item => {
    if (item.items) {
      item.items = sortSidebar(item.items);
    }
  });

  // 排序函数
  return sidebar.sort((a, b) => {
    // 判断 path 是否以 index.md 结尾
    const aIsIndex = a.path.endsWith('index.md');
    const bIsIndex = b.path.endsWith('index.md');

    if (aIsIndex && !bIsIndex) {
      return -1;
    }
    if (!aIsIndex && bIsIndex) {
      return 1;
    }

    if (a.sort === undefined && b.sort !== undefined) {
      return 1;
    }
    else if (a.sort !== undefined && b.sort === undefined) {
      return -1;
    }

    // 根据 sort 排序
    if (a.sort !== b.sort) {
      return a.sort - b.sort;
    }

    // 根据 text 的首个字符排序
    return a.text.localeCompare(b.text);
  });
}

function filterHiddenItems(items: any[]): any[] {
  return items
    .filter(item => {
      return !item.hide;
    }) // 过滤掉 hide 为 true 的对象
    .map((item: any) => {
      if (item.items) {
        // 如果有子项，递归过滤子项
        return {
          ...item,
          items: filterHiddenItems(item.items),
        };
      }
      return item;
    });
}

export function handleAutoSidebar(config: SiteConfig, data: Map<string, ContentData>) {
  const sidebar: any = (global as any).VITEPRESS_CONFIG.userConfig.themeConfig?.sidebar;
  const autoPaths: string[] = [];
  const autoSidebar: Record<string, any> = {};
  if (isObject(sidebar)) {
    Object.keys(sidebar).forEach(key => {
      if (((sidebar as any)[key] as string) === 'auto') {
        autoPaths.push(key);
      }
    });
    autoPaths.forEach(item => {
      const dirPath = path.join(config.srcDir, item);
      const filteredTree: any = directoryTree(dirPath, {
        exclude: /(node_modules|\.vitepress)$/,
        extensions: /\.md/,
        normalizePath: true
      }, (item, PATH) => formatSidebarItems(item, PATH, config, data), (item, PATH) => formatSidebarItems(item, PATH, config, data));

      if (!data.get(ensureIndexMd(filteredTree.path))) {
        autoSidebar[item] = sortSidebar(filterHiddenItems(filteredTree.items));
      }
      else {
        autoSidebar[item] = sortSidebar(filterHiddenItems([filteredTree]));
      }
    });
  }
  return autoSidebar;
}

export function formatSidebarItems(item: any, PATH: string, config: SiteConfig, data: Map<string, ContentData>) {
  const link = `/${
    normalizePath(path.relative(config.srcDir, PATH))
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, config.cleanUrls ? '' : '.html')}`;
  const originFilename = link.split('/')[link.split('/').length - 1].split('.')[0];
  const filename = capitalizeFirstFormat(originFilename);
  const article = data.get(ensureIndexMd(PATH));
  const content = matter(article?.src || '').content;
  const match = content.match(/^(#+)\s+(.+)/m);
  const title = match?.[2] || filename;
  const { sidebar = {}, publish, group = {} } = article?.frontmatter || {};
  if (item.children) {
    // parent
    item.sort = group?.sort;
    item.hide = group === false;
    item.items = item.children;
    item.text = group?.text || filename;
    item.icon = group.icon;
    item.collapsed = group?.collapsed;
    delete item.children;
  }
  else {
    // child
    item.sort = sidebar?.sort;
    item.hide = sidebar === false || publish === false;
    item.icon = sidebar.icon;
    item.link = link;
    item.text = sidebar?.text || title;
  }
}
