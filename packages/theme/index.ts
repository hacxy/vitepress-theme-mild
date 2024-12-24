import type { Theme } from 'vitepress';
import { setup } from '@css-render/vue3-ssr';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import { MotionPlugin } from '@vueuse/motion';
import DefaultTheme from 'vitepress/theme';
import BlogPage from './src/components/BlogPage.vue';
import Layout from './src/components/Layout.vue';
import Tags from './src/components/Tags.vue';
import NProgress from './src/utils/client/nprogress';
import '@shikijs/vitepress-twoslash/style.css';
import './src/styles/index.scss';

const MildTheme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    if ((import.meta as any).env.SSR) {
      const { collect } = setup(app);
      app.provide('css-render-collect', collect);
    }

    if (!(import.meta as any).env.SSR) {
      router.onBeforePageLoad = () => {
        NProgress.start();
        return true;
      };

      router.onAfterPageLoad = () => {
        NProgress.done();
      };
    }
    app.use(MotionPlugin);
    app.use(TwoslashFloatingVue);
    app.component('blog', BlogPage);
    app.component('tags', Tags);
  }
};

export default MildTheme;
