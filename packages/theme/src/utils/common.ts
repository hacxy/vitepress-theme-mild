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
