'use client';

import { useState } from 'react';
import type { SubmitEvent } from 'react';
import type { TodoFilter, TodoSort, TodoView } from '@/types/todo';
import Icon from '@/components/Icon';


type TodoToolbarProps = {
  view: TodoView;
  totalCount: number;
  doneCount: number;
  visibleCount: number;
  onChange: (view: TodoView) => void;
};


const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행' },
  { value: 'done', label: '완료' },
];


// 1줄: 검색칸 + 검색 버튼 / 2줄: 상태 필터 칩, 개수 표시, 정렬 선택
// [고차 함수 사용: map]
export default function TodoToolbar({
  view,
  totalCount,
  doneCount,
  visibleCount,
  onChange,
}: TodoToolbarProps) {
  // 입력 중인 검색어: 검색 버튼(또는 Enter)을 눌러야 목록에 적용된다
  const [draft, setDraft] = useState(view.search);
  const [appliedSearch, setAppliedSearch] = useState(view.search);

  // 부모가 검색어를 바꾼 경우(예: 추가 후 보기 설정 초기화)에는 입력칸도 맞춘다
  if (view.search !== appliedSearch) {
    setAppliedSearch(view.search);
    setDraft(view.search);
  }

  function handleSearchSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onChange({ ...view, search: draft });
  }

  function handleDraftChange(value: string) {
    setDraft(value);
    // 입력칸을 모두 지우면 바로 전체 목록으로 돌아간다
    if (value === '' && view.search !== '') {
      onChange({ ...view, search: '' });
    }
  }

  return (
    <div className="space-y-5 border-b border-gray-200 px-7 py-4">
      {/* 1번째 줄: 검색칸 + 검색 버튼 (버튼은 위쪽 "추가" 버튼과 같은 크기·글씨체) */}
      <form
        role="search"
        onSubmit={handleSearchSubmit}
        className="flex items-center gap-2"
      >
        {/* 상자 없이 밑줄만 있는 검색칸: 포커스하면 밑줄이 초록색으로 바뀐다.
            label로 감싸서 줄 어디를 눌러도 입력칸에 커서가 간다 */}
        <label className="flex min-w-0 flex-1 items-center gap-2 border-b-2 border-gray-200 py-2 focus-within:border-brand">
          <Icon name="search" size={20} className="text-gray-500" />
          <input
            type="search"
            aria-label="할 일 검색"
            placeholder="제목·내용 검색"
            value={draft}
            onChange={(e) => handleDraftChange(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        <button type="submit" className="btn btn-primary btn-sm shrink-0">
          검색
        </button>
      </form>

      {/* 2번째 줄: 상태 필터 칩 | 개수 + 정렬 선택 (좁으면 줄이 바뀐다) */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div role="group" aria-label="상태 필터" className="flex gap-1">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={view.filter === item.value}
              onClick={() => onChange({ ...view, filter: item.value })}
              className="filter-chip"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <p
            className="whitespace-nowrap text-xs text-gray-500"
            aria-live="polite"
          >
            완료 {doneCount} / 전체 {totalCount}
            {visibleCount !== totalCount ? ` · ${visibleCount}개 표시` : ''}
          </p>
          <select
            aria-label="정렬"
            value={view.sort}
            onChange={(e) =>
              onChange({ ...view, sort: e.target.value as TodoSort })
            }
            className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600"
          >
            <option value="created">최신 등록순</option>
            <option value="date">기한 빠른순</option>
          </select>
        </div>
      </div>
    </div>
  );
}
