import type { GiscusProps, Theme as GiscusTheme } from '@giscus/vue';
import type { NProgressOptions } from 'nprogress';
import type { DefaultTheme, Theme } from 'vitepress';
import type { RSSOptions } from 'vitepress-plugin-rss';

export interface SidebarItem extends DefaultTheme.SidebarItem {
  icon?: string
}

export interface SidebarMulti {
  [path: string]: SidebarItem[] | { items: SidebarItem[], base: string } | 'auto'
}

export type Sidebar = SidebarItem[] | SidebarMulti;

export interface Comment extends Omit<GiscusProps, 'theme'> {
  lightTheme: GiscusTheme
  darkTheme: GiscusTheme
}

declare interface DefaultThemeConfig extends Omit<DefaultTheme.Config, 'sidebar'> {}

declare interface ThemeConfig extends DefaultThemeConfig {
  /**
   * The sidebar items.
   */
  sidebar?: Sidebar

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
