import type { DefaultTheme, Theme } from 'vitepress';

export interface SidebarAutoMulti {
  [path: string]: 'auto'
}

declare interface ThemeConfig extends Omit<DefaultTheme.Config, 'sidebar'> {
  /**
   * The sidebar items.
   */
  sidebar?: DefaultTheme.Sidebar | SidebarAutoMulti
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

export { MildTheme as default, ThemeConfig };
