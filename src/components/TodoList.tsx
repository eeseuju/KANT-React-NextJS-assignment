import type { Todo, TodoFormValues } from '@/types/todo';
import TodoItem from '@/components/TodoItem';


type TodoListProps = {
  todos: Todo[];
  emptyMessage: string;
  pendingIds: string[];
  editingId: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, values: TodoFormValues) => Promise<boolean>;
  onCancelEdit: () => void;
};


// 목록을 항목 컴포넌트들로 바꿔서 그리기 (비어 있으면 안내 문구)
// [고차 함수 사용: map, includes]
export default function TodoList({
  todos,
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
      <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-zinc-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          pending={pendingIds.includes(todo.id)}
          editing={editingId === todo.id}
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