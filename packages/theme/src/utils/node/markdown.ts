import type { PluginSimple } from 'markdown-it';
import fs from 'fs-extra';

export const insertDocsHeaderInfo: PluginSimple = md => {
  md.core.ruler.push('insert_docs_header_info', state => {
    const filePath = state.env.path;
    // let words = 0;
    // let min = 0;
    // let finalDate = '';
    if (filePath && fs.existsSync(filePath)) {
      // const stats = fs.statSync(filePath);
      // const lastModifiedTime = stats.mtime.toISOString();
      // const { date = lastModifiedTime } = state.env.frontmatter;
      // finalDate = formatDate(new Date(date), 'YYYY-MM-DD');
      // const { content } = matter(state.env.content);
      // const contentInfo = readingTime(content, 200);
      // words = contentInfo.words;
      // min = contentInfo.minutes;
    }
    let inserted = false;
    state.tokens.forEach((token, index) => {
      if (!inserted && token.type === 'heading_close' && token.tag === 'h1' && index <= 2) {
        const newToken = new state.Token('html_block', '', 0);
        // newToken.content = generateDocsHeaderInfoEl(finalDate, words, min);
        newToken.content = '<DocsHeaderInfo/>';
        state.tokens.splice(index + 1, 0, newToken);
        inserted = true;
      }
    });
  });
};

