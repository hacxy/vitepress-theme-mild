import type { ArticlesData } from '../../datas/articles.data';

export function handleTagsData(data: ArticlesData[]) {
  const tagsMap = new Map<string, {
    count: number
    articles: {
      path: string
      title: string
      description: string
      date: string
    }[]
  }>();
  data.forEach(item => {
    item?.tags?.forEach(tag => {
      if (!tagsMap.has(tag)) {
        tagsMap.set(tag,
          {
            count: 1,
            articles: [{
              title: item.title,
              path: item.path,
              description: item.description,
              date: item.date
            }]
          }
        );
      }
      else {
        tagsMap.set(tag, { count: tagsMap.get(tag)!.count + 1, articles: [...tagsMap.get(tag)!.articles, { title: item.title, path: item.path, description: item.description,
          date: item.date
        }] });
      }
    });
  });

  const tagsData = Array.from(tagsMap, ([key, value]) => {
    return {
      name: key,
      count: value.count,
      articles: value.articles
    };
  });
  return tagsData;
}
