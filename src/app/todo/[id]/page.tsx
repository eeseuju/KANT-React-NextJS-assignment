import { Suspense } from 'react';
import Link from 'next/link';
import TodoDetail from '@/components/TodoDetail';
import TodoDetailSkeleton from '@/components/TodoDetailSkeleton';


type TodoDetailPageProps = {
  params: Promise<{ id: string }>;
};


// 렌더링 방식: 주소의 id(params)와 로그인 쿠키는 요청이 들어와야 아는 값이라,
// 이 페이지는 params를 기다리지 않고 자식(TodoDetail)에 넘겨 <Suspense> 안에서 읽는다.
// 그래서 "목록으로" 링크와 스켈레톤이 정적 껍데기로 바로 보인다.
export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <Link
        href="/todo"
        className="inline-block text-sm text-green-700 hover:underline"
      >
        ← 목록으로
      </Link>
      <Suspense fallback={<TodoDetailSkeleton />}>
        <TodoDetail params={params} />
      </Suspense>
    </main>
  );
}