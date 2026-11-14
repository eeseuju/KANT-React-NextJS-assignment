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