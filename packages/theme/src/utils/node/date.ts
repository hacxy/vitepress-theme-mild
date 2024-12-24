import dayjs from 'dayjs/esm';

export function formatDate(date: string | Date | number) {
  return dayjs(date).format('YYYY-MM-DD');
}
