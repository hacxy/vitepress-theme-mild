import { useStore } from '@nanostores/vue';
import { atom } from 'nanostores';

const $visible = atom(false);
const $currentIndex = atom(0);
const $images = atom<string[]>([]);

export function useImagePreview() {
  const visible = useStore($visible);
  const currentIndex = useStore($currentIndex);
  const images = useStore($images as any);

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
    images,
    $images
  };
}
