import type { Todo, TodoFormValues } from '@/types/todo';
import { formatDue } from '@/lib/todos';
import TodoEditForm from '@/components/TodoEditForm';


type TodoItemProps = {
  todo: Todo;
  pending: boolean;
  editing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, values: TodoFormValues) => Promise<boolean>;
  onCancelEdit: () => void;
};


export default function TodoItem({
  todo,
  pending,
  editing,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancelEdit,
}: TodoItemProps) {
  // 수정 모드: 이 줄을 수정 폼으로 바꿔서 보여 준다.
  if (editing) {
    return (
      <li className="rounded-lg border border-green-700 bg-white p-3">
        <TodoEditForm
          todo={todo}
          onSave={(values) => onSave(todo.id, values)}
          onCancel={onCancelEdit}
        />
      </li>
    );
  }

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
        onClick={() => onEdit(todo.id)}
        className="shrink-0 rounded px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        수정
      </button>
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