'use client';

import { useState } from 'react';
import type { Todo, TodoFormValues, TodoView } from '@/types/todo';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import TodoToolbar from '@/components/TodoToolbar';
import {
  DEFAULT_VIEW,
  countDone,
  getVisibleTodos,
  toUpdatePayload,
} from '@/lib/todos';
import {
  deleteTodo,
  insertTodo,
  updateTodo,
  updateTodoDone,
} from '@/lib/todo-client';


type TodoAppProps = {
  initialTodos: Todo[];
};


export default function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [view, setView] = useState<TodoView>(DEFAULT_VIEW);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // 상태가 아니라 계산으로 얻는 값 (todos, view가 바뀌면 다시 계산된다)
  const visibleTodos = getVisibleTodos(todos, view);
  const doneCount = countDone(todos);
  const emptyMessage =
    todos.length === 0
      ? '할 일이 없습니다. 할 일을 추가해 보세요.'
      : '조건에 맞는 할 일이 없습니다.';

  // 요청 중인 항목 표시 켜기/끄기
  // [고차 함수 사용: filter] (상태를 바꾸므로 순수 함수는 아님)
  function setPending(id: string, pending: boolean) {
    setPendingIds((prev) =>
      pending ? [...prev, id] : prev.filter((pendingId) => pendingId !== id),
    );
  }

  // 새 할 일 저장 (성공하면 true, 실패하면 false)
  async function handleAdd(title: string): Promise<boolean> {
    setError('');
    try {
      const saved = await insertTodo(title);
      setTodos((prev) => [saved, ...prev]);
      // 새 항목이 지금의 검색·필터에 가려지면 보기 설정을 처음으로 되돌린다
      if (getVisibleTodos([saved], view).length === 0) {
        setView(DEFAULT_VIEW);
      }
      return true;
    } catch (e) {
      console.error(e);
      setError('할 일을 추가하지 못했습니다. 다시 시도하세요.');
      return false;
    }
  }

  // 체크 상태 뒤집기 (저장에 성공하면 화면에 반영)
  // [고차 함수 사용: find, map] (상태를 바꾸므로 순수 함수는 아님)
  async function handleToggle(id: string) {
    const target = todos.find((todo) => todo.id === id);
    if (!target) {
      return;
    }
    const nextDone = !target.done;

    setError('');
    setPending(id, true);
    try {
      await updateTodoDone(id, nextDone);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, done: nextDone } : todo,
        ),
      );
    } catch (e) {
      console.error(e);
      setError('상태를 바꾸지 못했습니다. 다시 시도하세요.');
    } finally {
      setPending(id, false);
    }
  }

  // 항목 지우기 (저장에 성공하면 화면에서 제거)
  // [고차 함수 사용: filter] (상태를 바꾸므로 순수 함수는 아님)
  async function handleDelete(id: string) {
    setError('');
    setPending(id, true);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
      setError('삭제하지 못했습니다. 다시 시도하세요.');
    } finally {
      setPending(id, false);
    }
  }

  // 수정 모드 켜기 (한 번에 한 줄만)
  function handleEdit(id: string) {
    setError('');
    setEditingId(id);
  }

  // 수정 모드 끄기 (저장하지 않음)
  function handleCancelEdit() {
    setEditingId(null);
  }

  // 수정 저장 (성공하면 true, 실패하면 false → 실패하면 폼이 그대로 남는다)
  // [고차 함수 사용: map] (상태를 바꾸므로 순수 함수는 아님)
  async function handleSave(
    id: string,
    values: TodoFormValues,
  ): Promise<boolean> {
    setError('');
    try {
      const saved = await updateTodo(id, toUpdatePayload(values));
      setTodos((prev) => prev.map((todo) => (todo.id === id ? saved : todo)));
      setEditingId(null);
      return true;
    } catch (e) {
      console.error(e);
      setError('수정하지 못했습니다. 다시 시도하세요.');
      return false;
    }
  }

  return (
    <div className="space-y-4">
      <TodoForm onAdd={handleAdd} />
      <TodoToolbar
        view={view}
        totalCount={todos.length}
        doneCount={doneCount}
        visibleCount={visibleTodos.length}
        onChange={setView}
      />
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      <TodoList
        todos={visibleTodos}
        emptyMessage={emptyMessage}
        pendingIds={pendingIds}
        editingId={editingId}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}