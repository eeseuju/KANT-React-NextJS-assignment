import type { Todo } from '@/types/todo';

// 상수
export const TITLE_MAX_LENGTH = 50;

// 화면에 보여 줄 기한 문구
// [순수 함수]
export function formatDue(todo: Todo): string {
  if (!todo.due_date) {
    return '날짜 없음';
  }
  const time = todo.due_time ? ` ${todo.due_time.slice(0, 5)}` : '';
  return `${todo.due_date}${time}`;
}