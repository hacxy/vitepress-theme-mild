import type { ArticlesData } from '../../datas/articles.data';

export function handleTagsData(data: ArticlesData[]) {
  const tagsMap = new Map<string, ArticlesData[]>();
  data.forEach(item => {
    item?.tags?.forEach(tag => {
      if (!tagsMap.has(tag)) {
        tagsMap.set(tag, [item]);
      }
      else {
        tagsMap.get(tag)?.push(item);
      }
    });
  });

  const tagsData = Array.from(tagsMap, ([key, value]) => {
    return {
      name: key,
      articles: value
    };
  });
  return tagsData;
}
