import type { Todo } from '@/types/todo';
import { formatDue } from '@/lib/todos';


type TodoItemProps = {
  todo: Todo;
  pending: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};


export default function TodoItem({
  todo,
  pending,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li
      className={`flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 ${
        pending ? 'opacity-60' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={todo.done}
        disabled={pending}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.title} 완료`}
        className="h-5 w-5 shrink-0 accent-green-700"
      />
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-medium ${
            todo.done ? 'text-zinc-400 line-through' : 'text-zinc-900'
          }`}
        >
          {todo.title}
        </p>
        <p className="text-sm text-zinc-500">{formatDue(todo)}</p>
      </div>
      <button
        type="button"
        disabled={pending}
        onClick={() => onDelete(todo.id)}
        className="shrink-0 rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        삭제
      </button>
    </li>
  );
}