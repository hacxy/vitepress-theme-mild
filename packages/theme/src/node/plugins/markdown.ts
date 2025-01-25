import type { PluginSimple } from 'markdown-it';
import { NOT_ARTICLE_LAYOUTS } from '../../shared/constants';

export const insertDocsHeaderInfo: PluginSimple = md => {
  md.core.ruler.push('insert_docs_header_info', state => {
    if (!NOT_ARTICLE_LAYOUTS.includes(state.env?.frontmatter?.layout)) {
      let inserted = false;
      state.tokens.forEach((token, index) => {
        if (!inserted && token.type === 'heading_close' && token.tag === 'h1' && index <= 2) {
          const newToken = new state.Token('html_block', '', 0);
          newToken.content = '<DocsHeaderInfo/>';
          state.tokens.splice(index + 1, 0, newToken);
          inserted = true;
        }
      });
    }
  });
};

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

