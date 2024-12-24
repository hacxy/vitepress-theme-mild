import dayjs from 'dayjs';

export function formatDate(date: string | Date) {
  return dayjs(date).format('YYYY-MM-DD');
}
