'use client';

import { useEffect } from 'react';


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
    <div
      role="alert"
      className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-6 text-center"
    >
      <p className="text-red-700">할 일을 불러오지 못했습니다.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-lg border border-red-300 px-4 py-1 text-sm text-red-700 hover:bg-red-100"
      >
        다시 시도
      </button>
    </div>
  );
}