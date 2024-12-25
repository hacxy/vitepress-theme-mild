import type { Header } from 'vitepress';
import type { DefaultTheme } from 'vitepress/theme';

const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/;

// cached list of anchor elements from resolveHeaders
const resolvedHeaders: { element: HTMLHeadElement, link: string }[] = [];

export type MenuItem = Omit<Header, 'slug' | 'children'> & {
  element: HTMLHeadElement
  children?: MenuItem[]
};

export function resolveTitle(theme: DefaultTheme.Config): string {
  return (
    (typeof theme.outline === 'object'
      && !Array.isArray(theme.outline)
      && theme.outline.label)
    || theme.outlineTitle
    || 'On this page'
  );
}

export function getHeaders(range: DefaultTheme.Config['outline']): MenuItem[] {
  const headers = [
    ...document.querySelectorAll('.VPDoc :where(h1,h2,h3,h4,h5,h6)')
  ]
    .filter(el => el.id && el.hasChildNodes())
    .map(el => {
      const level = Number(el.tagName[1]);
      return {
        element: el as HTMLHeadElement,
        title: serializeHeader(el),
        link: `#${el.id}`,
        level
      };
    });

  return resolveHeaders(headers, range);
}

function serializeHeader(h: Element): string {
  let ret = '';
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (ignoreRE.test((node as Element).className))
        continue;
      ret += node.textContent;
    }
    else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}

export function resolveHeaders(
  headers: MenuItem[],
  range?: DefaultTheme.Config['outline']
): MenuItem[] {
  if (range === false) {
    return [];
  }

  const levelsRange
    = (typeof range === 'object' && !Array.isArray(range)
      ? range.level
      : range) || 2;

  const [high, low]: [number, number]
    = typeof levelsRange === 'number'
      ? [levelsRange, levelsRange]
      : levelsRange === 'deep'
        ? [2, 6]
        : levelsRange;

  return buildTree(headers, high, low);
}

function buildTree(data: MenuItem[], min: number, max: number): MenuItem[] {
  resolvedHeaders.length = 0;

  const result: MenuItem[] = [];
  const stack: (MenuItem | { level: number, shouldIgnore: true })[] = [];

  data.forEach(item => {
    const node = { ...item, children: [] };
    let parent = stack[stack.length - 1];

    while (parent && parent.level >= node.level) {
      stack.pop();
      parent = stack[stack.length - 1];
    }

    if (
      node.element.classList.contains('ignore-header')
      || (parent && 'shouldIgnore' in parent)
    ) {
      stack.push({ level: node.level, shouldIgnore: true });
      return;
    }

    if (node.level > max || node.level < min)
      return;
    resolvedHeaders.push({ element: node.element, link: node.link });

    if (parent)
      parent.children!.push(node);
    else result.push(node);

    stack.push(node);
  });

  return result;
}
