'use client';

// [클라이언트 컴포넌트] 목록·검색·수정 상태와 저장 요청을 맡는 핵심이다. 서버가 준 초기 데이터(initialTodos)에서 시작한다.
import { useCallback, useMemo, useState } from 'react';
import type { Todo, TodoFormValues, TodoView } from '@/types/todo';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import TodoToolbar from '@/components/TodoToolbar';
import { useToday } from '@/hooks/useToday';
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
  const today = useToday();

  // 상태가 아니라 계산으로 얻는 값: todos, view가 바뀔 때만 다시 계산한다. (useMemo)
  const visibleTodos = useMemo(() => getVisibleTodos(todos, view), [todos, view]);
  const doneCount = useMemo(() => countDone(todos), [todos]);
  const emptyMessage =
    todos.length === 0
      ? '할 일이 없습니다. 할 일을 추가해 보세요.'
      : '조건에 맞는 할 일이 없습니다.';

  // 아래 함수들은 useCallback으로 감싸서 매번 새로 만들지 않는다.
  // 그래야 memo로 감싼 TodoItem이 "받는 값이 그대로"라고 알아보고 다시 그리지 않는다.
  // (함수 안에서 최신 상태가 필요하면 값을 직접 쓰지 않고 setXxx((prev) => ...)를 씀)

  // 요청 중인 항목 표시 켜기/끄기
  // [고차 함수 사용: filter] (상태를 바꾸므로 순수 함수는 아님)
  const setPending = useCallback((id: string, pending: boolean) => {
    setPendingIds((prev) =>
      pending ? [...prev, id] : prev.filter((pendingId) => pendingId !== id),
    );
  }, []);

  // 새 할 일 저장 (성공하면 true, 실패하면 false)
  const handleAdd = useCallback(async (title: string): Promise<boolean> => {
    setError('');
    try {
      const saved = await insertTodo(title);
      setTodos((prev) => [saved, ...prev]);
      // 새 항목이 지금의 검색·필터에 가려지면 보기 설정을 처음으로 되돌린다.
      setView((prev) =>
        getVisibleTodos([saved], prev).length === 0 ? DEFAULT_VIEW : prev,
      );
      return true;
    } catch (e) {
      console.error(e);
      setError('할 일을 추가하지 못했습니다. 다시 시도하세요.');
      return false;
    }
  }, []);

  // 체크 상태 뒤집기 (저장에 성공하면 화면에 반영)
  // 어느 항목인지는 id가 아니라 항목 자체(todo)를 받아서, 목록(todos) 상태를 읽지 않는다.
  // [고차 함수 사용: map] (상태를 바꾸므로 순수 함수는 아님)
  const handleToggle = useCallback(
    async (todo: Todo) => {
      const nextDone = !todo.done;

      setError('');
      setPending(todo.id, true);
      try {
        await updateTodoDone(todo.id, nextDone);
        setTodos((prev) =>
          prev.map((item) =>
            item.id === todo.id ? { ...item, done: nextDone } : item,
          ),
        );
      } catch (e) {
        console.error(e);
        setError('상태를 바꾸지 못했습니다. 다시 시도하세요.');
      } finally {
        setPending(todo.id, false);
      }
    },
    [setPending],
  );

  // 항목 지우기 (저장에 성공하면 화면에서 제거)
  // [고차 함수 사용: filter] (상태를 바꾸므로 순수 함수는 아님)
  const handleDelete = useCallback(
    async (id: string) => {
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
    },
    [setPending],
  );

  // 수정 모드 켜기 (한 번에 한 줄만)
  const handleEdit = useCallback((id: string) => {
    setError('');
    setEditingId(id);
  }, []);

  // 수정 모드 끄기 (저장하지 않음)
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  // 수정 저장 (성공하면 true, 실패하면 false → 실패하면 폼이 그대로 남음)
  // [고차 함수 사용: map] (상태를 바꾸므로 순수 함수는 아님)
  const handleSave = useCallback(
    async (id: string, values: TodoFormValues): Promise<boolean> => {
      setError('');
      try {
        const saved = await updateTodo(id, toUpdatePayload(values));
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? saved : todo)),
        );
        setEditingId(null);
        return true;
      } catch (e) {
        console.error(e);
        setError('수정하지 못했습니다. 다시 시도하세요.');
        return false;
      }
    },
    [],
  );

  return (
    <div className="flex flex-1 flex-col">
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
          className="border-b border-red-100 bg-red-50 px-7 py-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}
      <TodoList
        todos={visibleTodos}
        today={today}
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
