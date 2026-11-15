// [TodoApp 안에서 쓰이는 컴포넌트] 훅 없이 이벤트 함수를 props로 받아, TodoApp과 같이 브라우저에서 동작한다.
import type { Todo, TodoFormValues } from '@/types/todo';
import { isOverdue } from '@/lib/todos';
import TodoItem from '@/components/TodoItem';


type TodoListProps = {
  todos: Todo[];
  today: string | null;
  emptyMessage: string;
  pendingIds: string[];
  editingId: string | null;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, values: TodoFormValues) => Promise<boolean>;
  onCancelEdit: () => void;
};


// 목록을 항목 컴포넌트들로 바꿔서 그리기 (비어 있으면 안내 문구)
// [고차 함수 사용: map, includes]
export default function TodoList({
  todos,
  today,
  emptyMessage,
  pendingIds,
  editingId,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancelEdit,
}: TodoListProps) {
  // 빈 데이터 상태
  if (todos.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-gray-500">{emptyMessage}</p>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          pending={pendingIds.includes(todo.id)}
          editing={editingId === todo.id}
          overdue={isOverdue(todo, today)}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onSave={onSave}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}
