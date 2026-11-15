'use client';

// [클라이언트 컴포넌트] 오류 화면(error boundary)은 클라이언트 컴포넌트여야 하고, "다시 시도" 클릭도 처리한다.
import { useEffect } from 'react';
import AppCard from '@/components/AppCard';
import AppHeader from '@/components/AppHeader';


type TodoErrorProps = {
  error: unknown;
  retry: () => void;
};


export default function TodoError({ error, retry }: TodoErrorProps) {
  useEffect(() => {
    // 원인을 개발자 도구 Console에 남긴다.
    console.error(error);
  }, [error]);

  return (
    <AppCard>
      <AppHeader title="내 할 일" />
      <div role="alert" className="space-y-3 px-7 py-16 text-center">
        <p className="text-sm text-gray-600">할 일을 불러오지 못했습니다.</p>
        <button
          type="button"
          onClick={() => retry()}
          className="btn btn-outline btn-sm"
        >
          다시 시도
        </button>
      </div>
    </AppCard>
  );
}
