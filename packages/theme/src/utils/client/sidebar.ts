import type { ArticlesData } from 'src/datas/articles.data';

export function handleSidebarData(data: ArticlesData[], category: string) {
  const sidebarMap = new Map<string, { link: string, text: string }[]>();
  data.filter(i => i.category).forEach(({ category, path, title }) => {
    if (!sidebarMap.has(category)) {
      sidebarMap.set(category, [{ text: title, link: path }]);
    }
    else {
      sidebarMap.get(category)?.push({ text: title, link: path });
    }
  });
  if (category) {
    return [
      {
        text: category,
        items: sidebarMap.get(category)
      }
    ];
  }
  const resultArray = Array.from(sidebarMap, ([key, values]) => ({
    text: key,
    items: values,
  }));

  return resultArray;
}
