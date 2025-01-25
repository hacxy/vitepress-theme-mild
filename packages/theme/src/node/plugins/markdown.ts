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

// Markdown-it plugin to render GitHub-style task lists; see
//
// https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments
// https://github.com/blog/1825-task-lists-in-all-markdown-documents

export const taskCheckbox: PluginSimple = (md: any, options: any = {}) => {
  let defaults: any = {};
  defaults = {
    disabled: true,
    divWrap: false,
    divClass: 'mild-checkbox',
    idPrefix: 'mild_cbx_',
    ulClass: 'mild-task-list',
    liClass: 'mild-task-list-item'
  };
  options = Object.assign({}, defaults, options);
  md.core.ruler.after('inline', 'github-task-lists', (state: any) => {
    const tokens = state.tokens;
    let lastId = 0;
    for (let i = 2; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i], lastId, options, state.Token);
        lastId += 1;
        attrSet(tokens[i - 2], 'class', options.liClass);
        attrSet(tokens[parentToken(tokens, i - 2)], 'class', options.ulClass);
      }
    }
  });
};

function attrSet(token: any, name: any, value: any) {
  const index = token.attrIndex(name);
  const attr = [name, value];

  if (index < 0) {
    token.attrPush(attr);
  }
  else {
    token.attrs[index] = attr;
  }
}

function parentToken(tokens: any, index: any) {
  const targetLevel = tokens[index].level - 1;
  for (let i = index - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i;
    }
  }
  return -1;
}

function isTodoItem(tokens: any, index: any) {
  return isInline(tokens[index])
    && isParagraph(tokens[index - 1])
    && isListItem(tokens[index - 2])
    && startsWithTodoMarkdown(tokens[index]);
}

function todoify(token: any, lastId: any, options: any, TokenConstructor: any) {
  let id: string = '';
  id = options.idPrefix + lastId;
  token.children[0].content = token.children[0].content.slice(3);
  // label
  token.children.unshift(beginLabel(id, TokenConstructor));
  token.children.push(endLabel(TokenConstructor));
  // checkbox
  token.children.unshift(makeCheckbox(token, id, options, TokenConstructor));
  if (options.divWrap) {
    token.children.unshift(beginWrap(options, TokenConstructor));
    token.children.push(endWrap(TokenConstructor));
  }
}

function makeCheckbox(token: any, id: any, options: any, TokenConstructor: any) {
  const checkbox = new TokenConstructor('checkbox_input', 'input', 0);
  checkbox.attrs = [['type', 'checkbox'], ['id', id]];
  const checked = /^\[x\][ \u00A0]/i.test(token.content); // if token.content starts with '[x] ' or '[X] '
  if (checked === true) {
    checkbox.attrs.push(['checked', 'true']);
  }
  if (options.disabled === true) {
    checkbox.attrs.push(['disabled', 'true']);
  }

  return checkbox;
}

function beginLabel(id: any, TokenConstructor: any) {
  const label = new TokenConstructor('label_open', 'label', 1);
  label.attrs = [['for', id]];
  return label;
}

function endLabel(TokenConstructor: any) {
  return new TokenConstructor('label_close', 'label', -1);
}

// these next two functions are kind of hacky; probably should really be a
// true block-level token with .tag=='label'
function beginWrap(options: any, TokenConstructor: any) {
  const token = new TokenConstructor('checkbox_open', 'div', 0);
  token.attrs = [['class', options.divClass]];
  return token;
}

function endWrap(TokenConstructor: any) {
  const token = new TokenConstructor('checkbox_close', 'div', -1);
  // token.content = '</label>';
  return token;
}

function isInline(token: any) {
  return token.type === 'inline';
}
function isParagraph(token: any) {
  return token.type === 'paragraph_open';
}
function isListItem(token: any) {
  return token.type === 'list_item_open';
}

function startsWithTodoMarkdown(token: any) {
  // The leading whitespace in a list item (token.content) is already trimmed off by markdown-it.
  // The regex below checks for '[ ] ' or '[x] ' or '[X] ' at the start of the string token.content,
  // where the space is either a normal space or a non-breaking space (character 160 = \u00A0).
  return /^\[[x \u00A0]\][ \u00A0]/i.test(token.content);
}
