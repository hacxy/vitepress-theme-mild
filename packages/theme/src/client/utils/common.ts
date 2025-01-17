const HASH_RE = /#.*$/;
const HASH_OR_QUERY_RE = /[?#].*$/;
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/;

export function getTextDescription(text: string, count = 100) {
  if (!text)
    return;
  const finalText = text
    // 首个标题
    ?.replace(/^(#+)(.*)/m, '')
    // 除去标题
    ?.replace(/#/g, '')
    // 除去图片
    ?.replace(/!\[.*?\]\(.*?\)/g, '')
    // 除去链接
    ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
    // 除去加粗
    ?.replace(/\*\*(.*?)\*\*/g, '$1')
    ?.split('\n')
    ?.filter(v => !!v)
    ?.join('\n')
    ?.replace(/>(.*)/, '')
    ?.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    ?.trim()
    ?.slice(0, count);

  return text.length > 100 ? `${finalText}...` : finalText;
}

export const inBrowser = typeof document !== 'undefined';

export function isActive(
  currentPath: string,
  matchPath?: string,
  asRegex: boolean = false
): boolean {
  if (matchPath === undefined) {
    return false;
  }

  currentPath = normalize(`/${currentPath}`);

  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }

  if (normalize(matchPath) !== currentPath) {
    return false;
  }

  const hashMatch = matchPath.match(HASH_RE);

  if (hashMatch) {
    return (inBrowser ? location.hash : '') === hashMatch[0];
  }

  return true;
}

function normalize(path: string): string {
  return decodeURI(path)
    .replace(HASH_OR_QUERY_RE, '')
    .replace(INDEX_OR_EXT_RE, '$1');
}

export function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`;
}

export function isPlainObject(obj: any) {
  // 首先排除 null 和非对象类型
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  // 检查对象的构造函数是否是 Object
  if (obj.constructor !== Object) {
    return false;
  }

  // 检查对象的原型是否是 Object.prototype
  if (Object.getPrototypeOf(obj) !== Object.prototype) {
    return false;
  }

  return true;
}

export function capitalizeFirstLetter(string: string) {
  if (!string)
    return ''; // 如果字符串为空，返回空字符串
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: NodeJS.Timeout;
  let called = false;

  return () => {
    if (timeoutId)
      clearTimeout(timeoutId);

    if (!called) {
      fn()
      ;(called = true) && setTimeout(() => (called = false), delay);
    }
    else {
      timeoutId = setTimeout(fn, delay);
    }
  };
}
