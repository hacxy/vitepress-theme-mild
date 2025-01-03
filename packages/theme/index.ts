import type { Theme } from 'vitepress';
import { setup } from '@css-render/vue3-ssr';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import { MotionPlugin } from '@vueuse/motion';
import { NImage, NImageGroup } from 'naive-ui';
import VPTheme from 'vitepress/theme';
import BlogPage from './src/components/BlogPage.vue';
import DocsHeaderInfo from './src/components/DocsHeaderInfo.vue';
import Tags from './src/components/Tags.vue';
import Layout from './src/Layout.vue';
import NProgress from './src/utils/client/nprogress';
import '@shikijs/vitepress-twoslash/style.css';
import './src/styles/index.scss';
import 'virtual:group-icons.css';

const MildTheme: Theme = {
  extends: VPTheme,
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
    app.component('DocsHeaderInfo', DocsHeaderInfo);
    app.component('Image', NImage);
    app.component('ImageGroup', NImageGroup);
  }
};

export default MildTheme;
