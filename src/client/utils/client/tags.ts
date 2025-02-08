import type { DeepReadonly } from 'vue';
import type { ArticlesData } from '../../datas/base.data';

export function handleTagsData(data: DeepReadonly<ArticlesData[]>) {
  const tagsMap = new Map<string, ArticlesData[]>();
  data.forEach(item => {
    item?.tags?.forEach(tag => {
      if (!tagsMap.has(tag)) {
        tagsMap.set(tag, [item as ArticlesData]);
      }
      else {
        tagsMap.get(tag)?.push(item as ArticlesData);
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
