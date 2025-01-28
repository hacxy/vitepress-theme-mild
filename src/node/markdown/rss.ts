import type { Plugin, SiteConfig } from 'vitepress';
import { RssPlugin } from 'vitepress-plugin-rss';

export function rss(): Plugin {
  let resolveConfig: any;
  return {
    name: 'vitepress-plugin-rss',
    enforce: 'pre',
    configResolved(config: any) {
      if (resolveConfig) {
        return;
      }
      resolveConfig = config;
      // 拿到用户的主题配置, 手动调用hook
      const VPConfig: SiteConfig = config.vitepress;
      if (VPConfig.site?.themeConfig?.rss) {
        return RssPlugin(VPConfig.site.themeConfig.rss).configResolved(config);
      }
    }
  };
}
