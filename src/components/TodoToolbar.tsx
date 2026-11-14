import type { TodoFilter, TodoSort, TodoView } from '@/types/todo';


type TodoToolbarProps = {
  view: TodoView;
  totalCount: number;
  doneCount: number;
  visibleCount: number;
  onChange: (view: TodoView) => void;
};


const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'done', label: '완료' },
];


// 검색칸, 정렬 선택, 상태 필터 칩, 개수 표시
// [고차 함수 사용: map]
export default function TodoToolbar({
  view,
  totalCount,
  doneCount,
  visibleCount,
  onChange,
}: TodoToolbarProps) {
  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <input
          type="search"
          aria-label="할 일 검색"
          placeholder="제목·내용 검색"
          value={view.search}
          onChange={(e) => onChange({ ...view, search: e.target.value })}
          className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-1 text-sm"
        />
        <select
          aria-label="정렬"
          value={view.sort}
          onChange={(e) =>
            onChange({ ...view, sort: e.target.value as TodoSort })
          }
          className="rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm"
        >
          <option value="created">최신 등록순</option>
          <option value="date">기한 빠른 순</option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div role="group" aria-label="상태 필터" className="flex gap-1">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={view.filter === item.value}
              onClick={() => onChange({ ...view, filter: item.value })}
              className={`rounded-full border px-3 py-1 text-xs ${
                view.filter === item.value
                  ? 'border-green-700 bg-green-700 text-white'
                  : 'border-zinc-300 text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-zinc-500" aria-live="polite">
          완료 {doneCount} / 전체 {totalCount}
          {visibleCount !== totalCount ? ` · ${visibleCount}개 표시` : ''}
        </p>
      </div>
    </div>
  );
}