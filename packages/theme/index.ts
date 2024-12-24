import type { Theme } from 'vitepress';
import ArcoVue from '@arco-design/web-vue';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import { MotionPlugin } from '@vueuse/motion';
import DefaultTheme from 'vitepress/theme';
import BlogPage from './src/components/BlogPage.vue';
import Layout from './src/components/Layout.vue';
import NProgress from './src/utils/client/nprogress';
import '@shikijs/vitepress-twoslash/style.css';
import './style.scss';

const MildTheme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
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
    app.use(ArcoVue);
    app.use(TwoslashFloatingVue);
    app.component('blog', BlogPage);
  }
};

export default MildTheme;
