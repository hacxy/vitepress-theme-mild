import type { PluginSimple } from 'markdown-it';

export const insertDocsHeaderInfo: PluginSimple = md => {
  md.core.ruler.push('insert_docs_header_info', state => {
    let inserted = false;
    state.tokens.forEach((token, index) => {
      if (!inserted && token.type === 'heading_close' && token.tag === 'h1' && index <= 2) {
        const newToken = new state.Token('html_block', '', 0);
        newToken.content = '<DocsHeaderInfo/>';
        state.tokens.splice(index + 1, 0, newToken);
        inserted = true;
      }
    });
  });
};
