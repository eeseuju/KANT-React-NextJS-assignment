// 상세 내용이 올 때까지 보여 주는 로딩 화면 (정적 껍데기)
export default function TodoDetailSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="불러오는 중"
      className="space-y-3 rounded-lg border border-zinc-200 bg-white p-6"
    >
      <div className="h-7 w-2/3 animate-pulse rounded bg-zinc-200" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-200" />
      <div className="h-20 animate-pulse rounded bg-zinc-200" />
    </div>
  );
}