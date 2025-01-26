import type { PluginSimple } from 'markdown-it';

export const imgToImage: PluginSimple = md => {
  const defaultRender = md.renderer.render;
  md.renderer.rules.image = (tokens, idx, _opt, env) => {
    const token = tokens[idx];
    const src = token.attrGet('src');
    const alt = token.attrGet('alt');
    if (!env.imgs) {
      env.imgs = [];
    }
    env.imgs.push({ src, index: env.imgs.length });
    return `<Image src="${src}" alt="${alt}" index="${env.imgs.length - 1}"/>`;
  };
  md.renderer.render = (...args) => {
    const content = defaultRender.apply(md.renderer, args);
    return `<ContentWrapper>${content}</ContentWrapper>`;
  };
};
