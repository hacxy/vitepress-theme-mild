export function paginate(data: any, pageSize: number, currentPage: number) {
  // 参数校验，如果数据不是数组或者没有数据，直接返回空数组
  if (!Array.isArray(data) || data?.length === 0) {
    return [];
  }
  // 如果每页显示数量小于等于0，默认设置为1
  if (pageSize <= 0) {
    pageSize = 1;
  }
  // 如果当前页小于1，默认设置为1
  if (currentPage < 1) {
    currentPage = 1;
  }
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
}
