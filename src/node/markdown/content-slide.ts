import type { PluginSimple } from 'markdown-it';

export const contentSlide: PluginSimple = md => {
  const defaultRender = md.renderer.render;
  md.renderer.render = (...args) => {
    const content = defaultRender.apply(md.renderer, args);
    return `<ContentWrapper>${content}</ContentWrapper>`;
  };
};
