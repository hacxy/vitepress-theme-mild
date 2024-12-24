import type { Theme } from 'vitepress';
import Aura from '@primevue/themes/aura';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import { MotionPlugin } from '@vueuse/motion';
import PrimeVue from 'primevue/config';
import DefaultTheme from 'vitepress/theme';
import BlogPage from './src/components/BlogPage.vue';
import Layout from './src/components/Layout.vue';
import NProgress from './src/utils/client/nprogress';
import '@shikijs/vitepress-twoslash/style.css';
import './src/styles/index.scss';

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
    app.use(TwoslashFloatingVue);
    app.use(PrimeVue, {
      theme: {
        preset: Aura
      }
    });
    // app.component(Paginator);
    app.component('blog', BlogPage);
  }
};

export default MildTheme;
