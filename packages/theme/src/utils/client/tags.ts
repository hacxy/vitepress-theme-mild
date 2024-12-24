import type { ArticlesData } from '../../datas/articles.data';

export function handleTagsData(data: ArticlesData[]) {
  const tagsMap = new Map<string, number>();
  data.forEach(item => {
    item?.tags?.forEach(tag => {
      if (!tagsMap.has(tag)) {
        tagsMap.set(tag, 1);
      }
      else {
        tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
      }
    });
  });

  const tagsData = Array.from(tagsMap, ([key, value]) => {
    return {
      name: key,
      count: value
    };
  });
  return tagsData;
}
