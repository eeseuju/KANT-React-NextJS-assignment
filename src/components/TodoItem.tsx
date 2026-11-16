// [TodoApp 안에서 쓰이는 컴포넌트] 훅 없이 이벤트 함수를 props로 받아, TodoApp과 같이 브라우저에서 동작한다.
import { memo } from "react";
import Link from "next/link";
import type { Todo, TodoFormValues } from "@/types/todo";
import { formatDue, toFormValues } from "@/lib/todos";
import Icon from "@/components/Icon";
import TodoEditForm from "@/components/TodoEditForm";

type TodoItemProps = {
  todo: Todo;
  pending: boolean;
  editing: boolean;
  overdue: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, values: TodoFormValues) => Promise<boolean>;
  onCancelEdit: () => void;
};

// 할 일 한 줄. 아래에서 memo로 감싸서, 받는 값이 그대로면 다시 그리지 않는다.
function TodoItem({
  todo,
  pending,
  editing,
  overdue,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancelEdit,
}: TodoItemProps) {
  // 수정 모드: 이 줄을 수정 폼으로 바꿔서 보여 준다.
  if (editing) {
    return (
      <li className="border-b border-gray-200 bg-gray-50 px-7 py-4">
        <TodoEditForm
          initialValues={toFormValues(todo)}
          onSave={(values) => onSave(todo.id, values)}
          onCancel={onCancelEdit}
        />
      </li>
    );
  }

  return (
    <li
      className={`flex items-start gap-3 border-b border-gray-200 px-7 py-4 hover:bg-gray-50 ${
        pending ? "opacity-60" : ""
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.done}
        aria-label={`${todo.title} 완료`}
        disabled={pending}
        onClick={() => onToggle(todo)}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 disabled:cursor-not-allowed ${
          todo.done
            ? "border-brand bg-brand text-white"
            : "border-gray-400 hover:border-brand"
        }`}
      >
        {todo.done && <Icon name="check" size={14} />}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm ${
            todo.done ? "text-gray-400 line-through" : ""
          }`}
        >
          <Link href={`/todo/${todo.id}`} className="hover:underline">
            {todo.title}
          </Link>
        </p>

        {/* 내용은 흐린 글씨로 한 줄만 (길면 말줄임표) */}
        {todo.content && (
          <p className="mt-1 truncate text-xs text-gray-400">{todo.content}</p>
        )}

        {/* 날짜 칩과 수정·삭제 버튼을 같은 줄에, 세로 가운데로 맞춘다. */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {/* 기한이 지났으면 주황색으로 표시 */}
          <p
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${
              overdue
                ? "border-warn bg-warn/10 text-orange-700"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <Icon name="event" size={12} />
            {formatDue(todo)}
          </p>
          <div className="flex shrink-0 gap-2 whitespace-nowrap">
            <button
              type="button"
              disabled={pending}
              onClick={() => onEdit(todo.id)}
              className="text-xs text-brand hover:font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              수정
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => onDelete(todo.id)}
              className="text-xs text-danger hover:font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(TodoItem);
