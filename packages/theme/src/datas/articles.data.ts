import matter from 'gray-matter';
import { readingTime } from 'reading-time-estimator';
import { NOT_ARTICLE_LAYOUTS } from '../constants';
import { getTextDescription } from '../utils/common';
import { createArticlesListLoader } from '../utils/node/articles';

export interface ArticlesData {
  title: string
  path: string
  description: string
  date: number
  tags: string[]
  words: number
  minutes: number
  category: string
}

export default createArticlesListLoader({
  includeSrc: true,
  render: true,
  excerpt: true,
  transform(rawData) {
    const data = rawData.filter(item => !NOT_ARTICLE_LAYOUTS.includes(item.frontmatter.layout)).sort((a, b) => b.frontmatter.date - a.frontmatter.date).map(item => {
      const content = matter(item.src || '').content;
      const { words, minutes } = readingTime(content, 200);
      const match = content.match(/^(#+)\s+(.+)/m);
      const title = match?.[2] || '';
      let { date, description = content, ...frontmatter } = item.frontmatter;

      if (description?.length > 100) {
        description = getTextDescription(description);
      }
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

declare const data: ArticlesData[];
export { data };
