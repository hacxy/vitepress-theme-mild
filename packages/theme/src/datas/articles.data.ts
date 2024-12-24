import matter from 'gray-matter';
import { readingTime } from 'reading-time-estimator';
import { NOT_ARTICLE_LAYOUTS } from '../constants';
import { createArticlesListLoader } from '../utils/node/articles';
import { formatDate } from '../utils/node/date';

function getTextDescription(text: string, count = 100) {
  const finalText = text
    // 首个标题
    ?.replace(/^(#+)(.*)/m, '')
    // 除去标题
    ?.replace(/#/g, '')
    // 除去图片
    ?.replace(/!\[.*?\]\(.*?\)/g, '')
    // 除去链接
    ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
    // 除去加粗
    ?.replace(/\*\*(.*?)\*\*/g, '$1')
    ?.split('\n')
    ?.filter(v => !!v)
    ?.join('\n')
    ?.replace(/>(.*)/, '')
    ?.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    ?.trim()
    ?.slice(0, count);

  return `${finalText}...`;
}

export default createArticlesListLoader({
  includeSrc: true,
  render: true,
  excerpt: true,
  transform(rawData) {
    const data = rawData.filter(item => !NOT_ARTICLE_LAYOUTS.includes(item.frontmatter.layout)).map(item => {
      const content = matter(item.src || '').content;
      const { words, minutes } = readingTime(content, 200);
      const match = content.match(/^(#+)\s+(.+)/m);
      const title = match?.[2] || '';
      const description = getTextDescription(content);
      let { date, ...frontmatter } = item.frontmatter;
      if (date) {
        date = formatDate(item.frontmatter.date);
      }
      else {
        date = item.fileModifiedTime; // 文件最后修改时间(兜底)
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

export interface ArticlesData {
  title: string
  path: string
  description: string
  date: string
  tags: string[]
  words: number
  minutes: number
  category: string
}
declare const data: ArticlesData[];
export { data };
