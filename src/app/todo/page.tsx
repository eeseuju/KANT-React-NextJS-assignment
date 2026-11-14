import { Suspense } from 'react';
import SignoutButton from '@/components/SignoutButton';
import TodoContent from '@/components/TodoContent';
import TodoListSkeleton from '@/components/TodoListSkeleton';


// 렌더링 방식: 제목·로그아웃 버튼은 정적 껍데기로 바로 보이고,
// 로그인 쿠키를 읽어 조회하는 목록(TodoContent)만 요청 시점에 스트리밍된다.
export default function TodoPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 할 일</h1>
        <SignoutButton />
      </header>
      <Suspense fallback={<TodoListSkeleton />}>
        <TodoContent />
      </Suspense>
    </main>
  );
}