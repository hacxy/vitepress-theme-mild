import type { GiscusProps, Theme as GiscusTheme } from '@giscus/vue';
import type { NProgressOptions } from 'nprogress';
import type { DefaultTheme, Theme } from 'vitepress';
import type { RSSOptions } from 'vitepress-plugin-rss';

export interface SidebarAutoMulti {
  [path: string]: 'auto'
}

export interface Comment extends Omit<GiscusProps, 'theme'> {
  lightTheme: GiscusTheme
  darkTheme: GiscusTheme
}

declare interface ThemeConfig extends Omit<DefaultTheme.Config, 'sidebar'> {
  /**
   * The sidebar items.
   */
  sidebar?: DefaultTheme.Sidebar | SidebarAutoMulti

  /**
   * Giscus Comment
   */
  comment?: Comment

  rss?: RSSOptions
  /**
   * Is the progress bar config
   */
  progressBar?: Partial<NProgressOptions> | false

  scrollRestoration?: boolean
  // /**
  //  * Typescript Twoslash
  //  * @default true
  //  */
  // twoslash?: false | VitePressPluginTwoslashOptions
}

declare const MildTheme: Theme;

export { MildTheme as default, ThemeConfig };
