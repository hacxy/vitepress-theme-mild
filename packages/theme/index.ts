import type { Theme } from 'vitepress';
import type { ThemeConfig } from './types';
import { setup } from '@css-render/vue3-ssr';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import { MotionPlugin } from '@vueuse/motion';
import { NImage, NImageGroup } from 'naive-ui';
import VPTheme from 'vitepress/theme';
import Bili from './src/client/components/Bili.vue';
import BlogPage from './src/client/components/BlogPage.vue';
import ContentWrapper from './src/client/components/ContentWrapper.vue';
import DocsHeaderInfo from './src/client/components/DocsHeaderInfo.vue';
import Layout from './src/client/components/Layout.vue';
import Tags from './src/client/components/Tags.vue';
import { useProgress } from './src/client/hooks/useProgress';
import '@shikijs/vitepress-twoslash/style.css';
import './src/client/styles/index.scss';

const MildTheme: Theme = {
  extends: VPTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    const themeConfig: ThemeConfig = siteData.value.themeConfig;
    const originalConsoleError = console.error;

    // 重写 console.error 方法
    console.error = function (message, ...optionalParams) {
      // 检查错误消息是否包含特定的关键字
      if (typeof message === 'string' && message.includes('Hydration completed but contains mismatches')) {
        // 忽略特定的 hydration 错误
        return;
      }
      // 调用原始的 console.error 方法，处理其他错误
      originalConsoleError(message, ...optionalParams);
    };

    if ((import.meta as any).env.SSR) {
      const { collect } = setup(app);
      app.provide('css-render-collect', collect);
    }

    if (!(import.meta as any).env.SSR) {
      if (!themeConfig.scrollRestoration) {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
      }

      else {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'auto';
        }
      }

      if ((import.meta as any).hot) {
        let scrollPosition = 0;
        // 监听热模块替换之前的事件
        (import.meta as any).hot.on('vite:beforeUpdate', () => {
        // 保存当前的滚动位置
          scrollPosition = window.scrollY || document.documentElement.scrollTop;
        });

        // 监听热模块替换之后的事件
        (import.meta as any).hot.on('vite:afterUpdate', () => {
          // 恢复保存的滚动位置
          window.scrollTo(0, scrollPosition);
        });
      }

      if (themeConfig.progressBar !== false) {
        const { np } = useProgress(themeConfig.progressBar);
        app.provide('progress', np.value);

        router.onBeforePageLoad = () => {
          np.value.start();
          return true;
        };

        router.onAfterPageLoad = () => {
          np.value.done();
        };
      }
    }
    app.use(MotionPlugin);
    app.use(TwoslashFloatingVue);
    app.component('blog', BlogPage);
    app.component('tags', Tags);
    app.component('DocsHeaderInfo', DocsHeaderInfo);
    app.component('Image', NImage);
    app.component('ImageGroup', NImageGroup);
    app.component('ContentWrapper', ContentWrapper);
    app.component('Bili', Bili);
  }
};
export { Layout };
export default MildTheme;
