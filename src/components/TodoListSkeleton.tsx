// 데이터가 올 때까지 보여 주는 로딩 화면 (정적 껍데기)
// [고차 함수 사용: map]
export default function TodoListSkeleton() {
  return (
    <div aria-busy="true" aria-label="불러오는 중" className="space-y-2">
      <div className="h-10 animate-pulse rounded-lg bg-zinc-200" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-16 animate-pulse rounded-lg bg-zinc-200" />
      ))}
    </div>
  );
}