// Supabase의 todos 테이블 한 줄과 같은 모양
export type Todo = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  due_date: string | null; // 'YYYY-MM-DD'
  due_time: string | null; // 'HH:MM:SS'
  done: boolean;
  created_at: string;
};


// 수정 입력칸에서 다루는 값 (비어 있는 날짜·시간은 '')
export type TodoFormValues = {
  title: string;
  content: string;
  due_date: string; // 'YYYY-MM-DD' 또는 ''
  due_time: string; // 'HH:MM' 또는 ''
};

// 수정할 때 DB로 보내는 값 (비어 있는 날짜·시간은 null)
export type TodoUpdate = Pick<
  Todo,
  'title' | 'content' | 'due_date' | 'due_time'
>;


// 목록을 어떻게 볼지 정하는 값들 (서버에 저장하지 않음)
export type TodoFilter = 'all' | 'active' | 'done';
export type TodoSort = 'created' | 'date';

export type TodoView = {
  search: string;
  filter: TodoFilter;
  sort: TodoSort;
};