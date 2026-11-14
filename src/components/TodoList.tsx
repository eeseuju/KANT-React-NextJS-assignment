import type { Todo } from '@/types/todo';
import TodoItem from '@/components/TodoItem';


type TodoListProps = {
  todos: Todo[];
  pendingIds: string[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};


// 목록을 항목 컴포넌트들로 바꿔서 그리기 (비어 있으면 안내 문구)
// [고차 함수 사용: map, includes]
export default function TodoList({
  todos,
  pendingIds,
  onToggle,
  onDelete,
}: TodoListProps) {
  // 빈 데이터 상태
  if (todos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-zinc-500">
        할 일이 없습니다. 할 일을 추가해 보세요.
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
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}