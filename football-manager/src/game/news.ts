import type { NewsItem, World } from './types';

export function addNews(w: World, item: Omit<NewsItem, 'id' | 'date' | 'read'> & { date?: string; read?: boolean }): NewsItem {
  const n: NewsItem = { id: w.nextId.news++, ...item, date: item.date ?? w.date, read: item.read ?? false };
  w.news.unshift(n);
  if (w.news.length > 250) w.news.length = 250;
  return n;
}
