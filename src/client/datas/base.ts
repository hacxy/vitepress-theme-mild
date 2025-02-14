import path from 'node:path';
import fs from 'fs-extra';
import matter from 'gray-matter';
import { glob, type GlobOptions } from 'tinyglobby';
import { createMarkdownRenderer, type SiteConfig } from 'vitepress';
import { handleAutoSidebar } from '../utils/loader/auto.sidebar';
import { dateToUnixTimestamp } from '../utils/node/date';
import { getLastCommitInfo } from '../utils/node/git';
import { getPattern, normalizePath } from '../utils/node/path';

export interface ContentData {
  url: string
  path: string
  src: string | undefined
  html: string | undefined
  frontmatter: Record<string, any>
  excerpt: string | undefined
  imgs: string[]
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
      'content loader invoked without an active vitepress process, ' + 'or before vitepress config is resolved.'
    );
  }
  const pattern = getPattern(config.srcDir);
  const cache = new Map<string, { data: any, timestamp: number }>();
  return {
    watch: pattern,
    async load(files?: string[]) {
      const sidebarMapData = new Map<string, ContentData>();
      files = await glob(pattern, { ignore: ['**/node_modules/**', '**/dist/**', '**/README.md'], expandDirectories: false, absolute: true });
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
          if (cached.data.frontmatter.publish !== false) {
            raw.push(cached.data);
          }
          sidebarMapData.set(file, cached.data);
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
          const url = `/${normalizePath(path.relative(config.srcDir, file))
            .replace(/(^|\/)index\.md$/, '$1')
            .replace(/\.md$/, config.cleanUrls ? '' : '.html')}`;

          const html = render ? md.render(src, { realPath: file }) : undefined;
          const tokens = md.parse(src, { realPath: file });
          const imgs: string[] = [];
          tokens.forEach(token => {
            if (token.type === 'inline' && token.children) {
              token.children.forEach(child => {
                if (child.type === 'image') {
                  const src = child.attrGet('src');
                  if (src) {
                    imgs.push(src);
                  }
                }
              });
            }
          });
          const renderedExcerpt = renderExcerpt ? excerpt && md.render(excerpt) : undefined;
          const data: ContentData = {
            path: file,
            src: includeSrc ? src : undefined,
            html,
            imgs,
            frontmatter,
            excerpt: renderedExcerpt,
            url
          };
          cache.set(file, { data, timestamp });
          if (frontmatter.publish !== false) {
            raw.push(data);
          }
          sidebarMapData.set(file, data);
        }
      }

      const autoSidebar = handleAutoSidebar(config, sidebarMapData);
      return {
        list: (transform ? transform(raw) : raw),
        autoSidebar
      } as any;
    }
  };
}
