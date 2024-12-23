import type { Theme } from 'vitepress';
import ArcoVue from '@arco-design/web-vue';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import { MotionPlugin } from '@vueuse/motion';
import DefaultTheme from 'vitepress/theme';
import BlogPage from './src/components/BlogPage.vue';
import NProgress from './src/utils/client/nprogress';
// import 'vuetify/styles';
import '@shikijs/vitepress-twoslash/style.css';
import './style.scss';
// const { VMenu, VTooltip, ...cpns } = components;

// const vuetify = createVuetify({
//   // components: cpns,
//   directives,
//   icons: {
//     defaultSet: 'mdi',
//     aliases,
//     sets: {
//       mdi,
//     },
//   },
// });

const MildTheme: Theme = {
  extends: DefaultTheme,
  Layout: DefaultTheme.Layout,
  enhanceApp({ app, router }) {
    // const config: SiteConfig = (global as any).VITEPRESS_CONFIG;
    // console.log(config);
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
    // app.use(vuetify);
    app.use(TwoslashFloatingVue);
    app.component('blog', BlogPage);
  }
};

export default MildTheme;
