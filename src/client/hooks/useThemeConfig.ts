import type { ThemeConfig } from 'types';
import { useData } from 'vitepress';

export function useThemeConfig() {
  const { theme } = useData<ThemeConfig>();
  return theme.value;
}
