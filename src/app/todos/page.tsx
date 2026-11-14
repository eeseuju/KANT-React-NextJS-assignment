import TodoApp from '@/components/TodoApp';
import type { Todo } from '@/types/todo';

import SignoutButton from '@/components/SignoutButton';

// 임시 더미 데이터 (U06에서 Supabase 조회로 교체)
const dummyTodos: Todo[] = [
  {
    id: '1',
    user_id: 'local',
    title: 'React 공부하기',
    content: '',
    due_date: '2026-11-20',
    due_time: '10:30:00',
    done: false,
    created_at: '2026-11-15T00:00:00Z',
  },
  {
    id: '2',
    user_id: 'local',
    title: 'Supabase 테이블 만들기',
    content: '',
    due_date: null,
    due_time: null,
    done: true,
    created_at: '2026-11-15T00:00:00Z',
  },
  {
    id: '3',
    user_id: 'local',
    title: 'Next.js 라우팅 이해하기',
    content: '',
    due_date: '2026-11-25',
    due_time: null,
    done: false,
    created_at: '2026-11-15T00:00:00Z',
  },
];

export default function TodosPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 할 일</h1>
        <SignoutButton />
      </header>
      <TodoApp initialTodos={dummyTodos} />
    </main>
  );
}