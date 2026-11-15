import { Suspense } from 'react';
import AppCard from '@/components/AppCard';
import AppHeader from '@/components/AppHeader';
import SignoutButton from '@/components/SignoutButton';
import TodoContent from '@/components/TodoContent';
import TodoListSkeleton from '@/components/TodoListSkeleton';


// 렌더링 방식: 제목·로그아웃 버튼은 정적 껍데기로 바로 보이고,
// 로그인 쿠키를 읽어 조회하는 목록(TodoContent)만 요청 시점에 스트리밍된다.
export default function TodoPage() {
  return (
    <AppCard>
      <AppHeader title="내 할 일" action={<SignoutButton />} />
      <Suspense fallback={<TodoListSkeleton />}>
        <TodoContent />
      </Suspense>
    </AppCard>
  );
}
