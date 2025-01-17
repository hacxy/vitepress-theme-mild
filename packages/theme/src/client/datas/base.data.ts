import matter from 'gray-matter';
import { readingTime } from 'reading-time-estimator';
import { NOT_ARTICLE_LAYOUTS } from '../../shared/constants';
import { getTextDescription } from '../utils/common';
import { createBaseDataLoader } from './base';

export interface SidebarFrontmatter {
  text?: string
  collapsed?: boolean
  order?: number
  title?: string
  hide?: boolean
}

export interface ArticlesData {
  title: string
  path: string
  description: string
  date: number
  tags: string[]
  words: number
  minutes: number
  category: string
  order: number
  sidebar: boolean | SidebarFrontmatter
}

export default createBaseDataLoader({
  includeSrc: true,
  render: true,
  excerpt: true,
  transform(rawData) {
    const data = rawData.filter(item => !NOT_ARTICLE_LAYOUTS.includes(item.frontmatter.layout)).sort((a, b) => {
      if (a.frontmatter.sticky !== b.frontmatter.sticky) {
        return b.frontmatter.sticky - a.frontmatter.sticky;
      }
      return b.frontmatter.date - a.frontmatter.date;
    }).map(item => {
      const filename = item.url.split('/')[item.url.split('/').length - 1].split('.')[0] || 'index';
      const content = matter(item.src || '').content;
      const { words, minutes } = readingTime(content, 200);
      const match = content.match(/^(#+)\s+(.+)/m);
      const title = match?.[2] || filename;
      let { date, description = content, ...frontmatter } = item.frontmatter;

      description = getTextDescription(description);
      return {
        path: item.url,
        description,
        title,
        words,
        minutes,
        date,
        ...frontmatter,
      };
    });
    return data;
  }
});

declare const data: {
  list: ArticlesData[]
  autoSidebar: Record<string, any>
};
export { data };
