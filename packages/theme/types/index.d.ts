import type { GiscusProps, Theme as GiscusTheme } from '@giscus/vue';
import type { DefaultTheme, Theme } from 'vitepress';
import Layout from '../src/Layout.vue';

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
  // /**
  //  * Is the progress bar enabled
  //  * @default true
  //  */
  // progressBar?: boolean

  // /**
  //  * Typescript Twoslash
  //  * @default true
  //  */
  // twoslash?: false | VitePressPluginTwoslashOptions
}

declare const MildTheme: Theme;

export { MildTheme as default, Layout, ThemeConfig };
