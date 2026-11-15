'use client';

// [클라이언트 컴포넌트] 입력칸 상태(useState)가 필요하다.
import { useState } from 'react';
import type { SubmitEvent } from 'react';
import Icon from '@/components/Icon';
import { TITLE_MAX_LENGTH } from '@/lib/todos';


type TodoFormProps = {
  onAdd: (title: string) => Promise<boolean>;
};


export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed === '') {
      setError('제목을 입력하세요.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const saved = await onAdd(trimmed);
      if (saved) {
        setTitle('');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b border-gray-200 px-7 py-2"
    >
      <div className="flex items-center gap-3">
        <Icon name="add_task" className="text-brand" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={TITLE_MAX_LENGTH}
          placeholder="할 일 추가 (Enter로 바로 등록)"
          aria-label="할 일 제목"
          className="min-w-0 flex-1 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary btn-sm shrink-0"
        >
          {submitting ? '추가 중...' : '추가'}
        </button>
      </div>
      {error && <p className="pb-2 pl-9 text-sm text-red-500">{error}</p>}
    </form>
  );
}
