import path from 'node:path';
import { isObject } from '@vueuse/core';
import directoryTree from 'directory-tree';
import fs from 'fs-extra';
import matter from 'gray-matter';
import { glob, type GlobOptions } from 'tinyglobby';
import { createMarkdownRenderer, type SiteConfig } from 'vitepress';
import { dateToUnixTimestamp } from '../utils/node/date';
import { getLastCommitInfo } from '../utils/node/git';
import { ensureIndexMd, getPattern, normalizePath } from '../utils/node/path';

export interface ContentData {
  url: string
  path: string
  src: string | undefined
  html: string | undefined
  frontmatter: Record<string, any>
  excerpt: string | undefined
  // fileModifiedTime: number
}
export interface ContentOptions<T = ContentData[]> {
  /**
   * Include src?
   * @default false
   */
  includeSrc?: boolean

  /**
   * Render src to HTML and include in data?
   * @default false
   */
  render?: boolean

  /**
   * If `boolean`, whether to parse and include excerpt? (rendered as HTML)
   *
   * If `function`, control how the excerpt is extracted from the content.
   *
   * If `string`, define a custom separator to be used for extracting the
   * excerpt. Default separator is `---` if `excerpt` is `true`.
   *
   * @see https://github.com/jonschlinkert/gray-matter#optionsexcerpt
   * @see https://github.com/jonschlinkert/gray-matter#optionsexcerpt_separator
   *
   * @default false
   */
  excerpt?:
    | boolean
    | ((
      file: {
        data: { [key: string]: any }
        content: string
        excerpt?: string
      },
      options?: any
    ) => void)
    | string

  /**
   * Transform the data. Note the data will be inlined as JSON in the client
   * bundle if imported from components or markdown files.
   */
  transform?: (data: ContentData[]) => T | Promise<T>

  /**
   * Options to pass to `tinyglobby`.
   * You'll need to manually specify `node_modules` and `dist` in
   * `globOptions.ignore` if you've overridden it.
   */
  globOptions?: GlobOptions
}

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
// Handle auto sidebar
function formatSidebarItems(item: any, PATH: string, config: SiteConfig, data: Map<string, ContentData>) {
  const link = `/${
    normalizePath(path.relative(config.srcDir, PATH))
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, config.cleanUrls ? '' : '.html')}`;
  const filename = link.split('/')[link.split('/').length - 1].split('.')[0] || 'index';
  const article = data.get(ensureIndexMd(PATH));
  const content = matter(article?.src || '').content;
  const match = content.match(/^(#+)\s+(.+)/m);
  const title = match?.[2] || filename;
  const { sidebar } = article?.frontmatter || {};
  item.frontmatter = sidebar || {};

  item.sort = sidebar?.sort;

  if (sidebar === false) {
    item.hide = true;
  }
  else {
    item.hide = false;
  }

  if (!item.children) {
    item.link = link;
    item.text = sidebar?.text || title;
  }
  else {
    item.items = item.children;
    item.text = sidebar?.title || title;
    item.collapsed = sidebar?.collapsed;
    delete item.children;
  }
}

function handleAutoSidebar(config: SiteConfig, data: Map<string, ContentData>) {
  const sidebar: any = config.userConfig.themeConfig?.sidebar;
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
        autoSidebar[item] = sortSidebar(filteredTree.items);
      }
      else {
        autoSidebar[item] = sortSidebar([filteredTree]);
      }
    });
  }

  return autoSidebar;
}

export function createBaseDataLoader<T = {
  list: ContentData[]
  autoSidebar: any
}>(
  {
    includeSrc,
    render,
    excerpt: renderExcerpt,
    transform,
  }: ContentOptions<T> = {}
): {
    watch: string | string[]
    load: () => Promise<T>
  } {
  const config: SiteConfig = (global as any).VITEPRESS_CONFIG;

  if (!config) {
    throw new Error(
      'content loader invoked without an active vitepress process, '
      + 'or before vitepress config is resolved.'
    );
  }
  const pattern = getPattern(config.srcDir);
  const cache = new Map<string, { data: any, timestamp: number }>();
  return {
    watch: pattern,
    async load(files?: string[]) {
      const mapData = new Map<string, ContentData>();
      files = await glob(pattern, {
        ignore: ['**/node_modules/**', '**/dist/**', '**/README.md'],
        expandDirectories: false,
        absolute: true
      });
      const md = await createMarkdownRenderer(
        config.srcDir,
        config.markdown,
        config.site.base,
        config.logger
      );
      const raw: ContentData[] = [];
      for (const file of files) {
        if (!file.endsWith('.md')) {
          continue;
        }
        const timestamp = fs.statSync(file).mtimeMs;
        const cached = cache.get(file);
        if (cached && timestamp === cached.timestamp) {
          raw.push(cached.data);
          mapData.set(file, cached.data);
        }
        else {
          const src = fs.readFileSync(file, 'utf-8');
          const { data: frontmatter, excerpt } = matter(
            src,
            typeof renderExcerpt === 'string'
              // eslint-disable-next-line camelcase
              ? { excerpt_separator: renderExcerpt as any }
              : { excerpt: renderExcerpt as any }
          );

          if (frontmatter.date) {
            frontmatter.date = dateToUnixTimestamp(frontmatter.date);
          }
          else {
            const lastCommitInfo = await getLastCommitInfo(path.relative(config.srcDir, file));
            const lastCommitDate = lastCommitInfo?.date ? dateToUnixTimestamp(new Date(lastCommitInfo.date)) : null;
            frontmatter.date = lastCommitDate || timestamp;
          }

          if (typeof frontmatter.sticky === 'boolean' || typeof frontmatter.sticky === 'number') {
            frontmatter.sticky = Number(frontmatter.sticky);
          }
          else {
            frontmatter.sticky = 0;
          }

          if (typeof frontmatter.order !== 'number') {
            frontmatter.order = 0;
          }
          const url
            = `/${
              normalizePath(path.relative(config.srcDir, file))
                .replace(/(^|\/)index\.md$/, '$1')
                .replace(/\.md$/, config.cleanUrls ? '' : '.html')}`;

          const html = render ? md.render(src) : undefined;
          // const fileModifiedTime = timestamp;
          const renderedExcerpt = renderExcerpt
            ? excerpt && md.render(excerpt)

            : undefined;
          const data: ContentData = {
            // fileModifiedTime,
            path: file,
            src: includeSrc ? src : undefined,
            html,
            frontmatter,
            excerpt: renderedExcerpt,
            url
          };
          cache.set(file, { data, timestamp });
          raw.push(data);
          mapData.set(file, data);
        }
      }

      const autoSidebar = handleAutoSidebar(config, mapData);
      return {
        list: (transform ? transform(raw) : raw),
        autoSidebar
      } as any;
    }
  };
}
