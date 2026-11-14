import { getTodo } from '@/lib/todo-queries';
import { formatCreatedAt, formatDue } from '@/lib/todos';


type TodoDetailProps = {
  params: Promise<{ id: string }>;
};


// 서버 컴포넌트: 주소의 id를 꺼내 할 일 한 개를 가져와 보여 준다. (읽기 전용)
export default async function TodoDetail({ params }: TodoDetailProps) {
  const { id } = await params;
  const todo = await getTodo(id);

  return (
    <article className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <h1 className="break-words text-xl font-bold">{todo.title}</h1>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs ${
            todo.done
              ? 'bg-green-100 text-green-800'
              : 'bg-zinc-100 text-zinc-600'
          }`}
        >
          {todo.done ? '완료' : '진행 중'}
        </span>
      </div>

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-zinc-500">기한</dt>
          <dd>{formatDue(todo)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">내용</dt>
          <dd className="whitespace-pre-wrap break-words">
            {todo.content === '' ? '내용이 없습니다.' : todo.content}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">만든 날짜</dt>
          <dd>{formatCreatedAt(todo.created_at)}</dd>
        </div>
      </dl>
    </article>
  );
}