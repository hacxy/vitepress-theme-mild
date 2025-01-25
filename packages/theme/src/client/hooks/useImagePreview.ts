import { useStore } from '@nanostores/vue';
import { atom } from 'nanostores';
import { computed } from 'vue';
import { useArticleListStore } from '../store/article';

const $visible = atom(false);
const $currentIndex = atom(0);

export function useImagePreview() {
  const visible = useStore($visible);
  const currentIndex = useStore($currentIndex);
  const { currentArticle } = useArticleListStore();
  // const images = useStore($images as any);
  const imgs = computed(() => currentArticle.value?.imgs as string[] || []);
  function show(index: number) {
    $visible.set(true);
    $currentIndex.set(index);
  }

  function hide() {
    $visible.set(false);
  }

  return {
    visible,
    currentIndex,
    show,
    hide,
    imgs
  };
}
