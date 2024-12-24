export function formatDate(date: number | Date | string) {
  let d;

  // 处理不同类型的输入
  if (date instanceof Date) {
    d = date;
  }
  else if (typeof date === 'number' || !Number.isNaN(Date.parse(date))) {
    d = new Date(date);
  }
  else {
    throw new TypeError('Invalid date format');
  }

  // 获取年、月、日
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  const day = String(d.getDate()).padStart(2, '0');

  // 返回格式化后的日期字符串
  return `${year}-${month}-${day}`;
}
