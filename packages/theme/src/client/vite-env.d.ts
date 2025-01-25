/// <reference types="vite/client" />
declare module '*.vue' {
  import type { ComponentOptions } from 'vue';

  const comp: ComponentOptions;
  export default comp;
}

declare module '*.svg';
declare module 'virtual:group-icons.css'
declare module 'virtual:uno.css'
declare module 'markdown-it-task-checkbox'
