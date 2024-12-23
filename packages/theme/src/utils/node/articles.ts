import path from 'node:path';
import dayjs from 'dayjs';
import fs from 'fs-extra';
import matter from 'gray-matter';
import { glob, type GlobOptions } from 'tinyglobby';
import { createMarkdownRenderer, type SiteConfig } from 'vitepress';
import { normalizePath } from './path';

export interface ContentData {
  url: string
  src: string | undefined
  html: string | undefined
  frontmatter: Record<string, any>
  excerpt: string | undefined
  fileModifiedTime: string
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

export function createArticlesListLoader<T = ContentData[]>(
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
  let pattern = ['./**/*.md'];

  const config: SiteConfig = (global as any).VITEPRESS_CONFIG;

  if (!config) {
    throw new Error(
      'content loader invoked without an active vitepress process, '
      + 'or before vitepress config is resolved.'
    );
  }

  pattern = pattern.map(p => normalizePath(path.join(config.srcDir, p)));
  const cache = new Map<string, { data: any, timestamp: number }>();

  return {
    watch: pattern,
    async load(files?: string[]) {
      files = (
        await glob(pattern, {
          ignore: ['**/node_modules/**', '**/dist/**', '**/README.md'],
          expandDirectories: false,
          absolute: true
        })
      ).sort();
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
          // const lastEditTime = await getLastCommitDate(file);
          const url
            = `/${
              normalizePath(path.relative(config.srcDir, file))
                .replace(/(^|\/)index\.md$/, '$1')
                .replace(/\.md$/, config.cleanUrls ? '' : '.html')}`;
          // eslint-disable-next-line no-undefined
          const html = render ? md.render(src) : undefined;
          const fileModifiedTime = dayjs(timestamp).format('YYYY-MM-DD');
          const renderedExcerpt = renderExcerpt
            ? excerpt && md.render(excerpt)
            // eslint-disable-next-line no-undefined
            : undefined;
          const data: ContentData = {
            fileModifiedTime,
            // eslint-disable-next-line no-undefined
            src: includeSrc ? src : undefined,
            html,
            frontmatter,
            excerpt: renderedExcerpt,
            url
          };
          cache.set(file, { data, timestamp });
          raw.push(data);
        }
      }
      return (transform ? transform(raw) : raw) as any;
    }
  };
}
