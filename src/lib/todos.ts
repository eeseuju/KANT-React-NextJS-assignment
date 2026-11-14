import type { Todo, TodoFormValues, TodoUpdate, TodoView } from '@/types/todo';


// 상수
export const TITLE_MAX_LENGTH = 50;
export const CONTENT_MAX_LENGTH = 500;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;


// 화면에 보여 줄 기한 문구
// [순수 함수]
export function formatDue(todo: Todo): string {
  if (!todo.due_date) {
    return '날짜 없음';
  }
  const time = todo.due_time ? ` ${todo.due_time.slice(0, 5)}` : '';
  return `${todo.due_date}${time}`;
}


// DB의 할 일 한 줄 → 수정 입력칸에 채울 값
// [순수 함수]
export function toFormValues(todo: Todo): TodoFormValues {
  return {
    title: todo.title,
    content: todo.content,
    due_date: todo.due_date ?? '',
    due_time: todo.due_time ? todo.due_time.slice(0, 5) : '',
  };
}


// 입력칸 값 검사 (문제가 없으면 빈 문자열, 있으면 안내 문구)
// [순수 함수]
export function validateTodoForm(values: TodoFormValues): string {
  const title = values.title.trim();
  if (title === '') {
    return '제목을 입력하세요.';
  }
  if (title.length > TITLE_MAX_LENGTH) {
    return `제목은 ${TITLE_MAX_LENGTH}자 이하로 입력하세요.`;
  }
  if (values.content.length > CONTENT_MAX_LENGTH) {
    return `내용은 ${CONTENT_MAX_LENGTH}자 이하로 입력하세요.`;
  }
  if (values.due_date !== '' && !DATE_PATTERN.test(values.due_date)) {
    return '날짜 형식이 올바르지 않습니다.';
  }
  if (values.due_time !== '' && !TIME_PATTERN.test(values.due_time)) {
    return '시간 형식이 올바르지 않습니다.';
  }
  if (values.due_time !== '' && values.due_date === '') {
    return '시간을 정하려면 날짜도 입력하세요.';
  }
  return '';
}


// 입력칸 값 → DB로 보낼 값 (앞뒤 공백 제거, 비어 있는 날짜·시간은 null)
// [순수 함수]
export function toUpdatePayload(values: TodoFormValues): TodoUpdate {
  return {
    title: values.title.trim(),
    content: values.content.trim(),
    due_date: values.due_date === '' ? null : values.due_date,
    due_time: values.due_time === '' ? null : values.due_time,
  };
}


// 주소의 id가 uuid 모양인지 검사 (아니면 DB에 묻지 않고 바로 404 처리)
// [순수 함수]
export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  );
}


// 만든 시각을 한국 시간으로 보여 줄 문구 (예: 2026. 11. 15. 오후 3:20)
// [순수 함수]
export function formatCreatedAt(iso: string): string {
  return new Date(iso).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}


// 처음 상태의 보기 설정
export const DEFAULT_VIEW: TodoView = {
  search: '',
  filter: 'all',
  sort: 'created',
};


// 기한이 빠른 순서로 비교 (날짜가 없는 것은 맨 뒤로)
// [순수 함수]
function compareByDue(a: Todo, b: Todo): number {
  if (!a.due_date && !b.due_date) {
    return 0;
  }
  if (!a.due_date) {
    return 1;
  }
  if (!b.due_date) {
    return -1;
  }
  const aKey = `${a.due_date} ${a.due_time ?? '00:00:00'}`;
  const bKey = `${b.due_date} ${b.due_time ?? '00:00:00'}`;
  if (aKey < bKey) {
    return -1;
  }
  return aKey > bKey ? 1 : 0;
}


// 검색·필터·정렬을 적용해서 보여 줄 목록 만들기 (원래 배열은 바꾸지 않음)
// [순수 함수] [고차 함수 사용: filter, sort]
export function getVisibleTodos(todos: Todo[], view: TodoView): Todo[] {
  const keyword = view.search.trim().toLowerCase();

  const filtered = todos.filter((todo) => {
    const matchesFilter =
      view.filter === 'all' ||
      (view.filter === 'done' ? todo.done : !todo.done);
    const matchesSearch =
      keyword === '' ||
      todo.title.toLowerCase().includes(keyword) ||
      todo.content.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch;
  });

  // 'created'는 목록이 이미 최신 등록순이라 그대로 둔다.
  // sort는 배열 자체를 바꾸므로 복사한 뒤 정렬한다.
  return view.sort === 'date' ? [...filtered].sort(compareByDue) : filtered;
}


// 완료된 할 일 개수 세기
// [순수 함수] [고차 함수 사용: reduce]
export function countDone(todos: Todo[]): number {
  return todos.reduce((sum, todo) => (todo.done ? sum + 1 : sum), 0);
}