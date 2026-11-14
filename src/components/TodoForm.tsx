'use client';

import { useState } from 'react';
import type { SubmitEvent } from 'react';
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
    <form onSubmit={handleSubmit} className="space-y-1">
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={TITLE_MAX_LENGTH}
          placeholder="할 일을 입력하세요"
          className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2"
        />
        <button
          type="submit"
          disabled={submitting}
          className="shrink-0 rounded-lg bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800 disabled:opacity-50"
        >
          {submitting ? '추가 중...' : '추가'}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}