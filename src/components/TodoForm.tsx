'use client';

// [클라이언트 컴포넌트] 입력칸 상태(useState)가 필요하다.
import { useState } from 'react';
import type { SubmitEvent } from 'react';
import Icon from '@/components/Icon';
import TodoAddModal from '@/components/TodoAddModal';
import type { TodoFormValues } from '@/types/todo';
import { TITLE_MAX_LENGTH, validateTodoForm } from '@/lib/todos';


const EMPTY_VALUES: TodoFormValues = {
  title: '',
  content: '',
  due_date: '',
  due_time: '',
};


type TodoFormProps = {
  onAdd: (values: TodoFormValues) => Promise<boolean>;
};


export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = { ...EMPTY_VALUES, title };
    const message = validateTodoForm(values);
    if (message) {
      setError(message);
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const saved = await onAdd(values);
      if (saved) {
        setTitle('');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
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
            type="button"
            onClick={() => setModalOpen(true)}
            disabled={submitting}
            aria-label="상세 설정"
            title="상세 설정"
            className="shrink-0 rounded-full p-1 text-gray-500 hover:bg-green-50 hover:text-brand disabled:opacity-50"
          >
            <Icon name="edit_note" />
          </button>
        </div>
        {error && <p className="pb-2 pl-9 text-sm text-red-500">{error}</p>}
      </form>
      {modalOpen && (
        <TodoAddModal
          initialValues={{ ...EMPTY_VALUES, title }}
          onSave={async (values) => {
            const saved = await onAdd(values);
            if (saved) {
              setTitle('');
            }
            return saved;
          }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
