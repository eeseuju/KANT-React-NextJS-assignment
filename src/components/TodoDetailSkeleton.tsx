// [서버 컴포넌트] 정적 껍데기(로딩 화면)에 포함되어 요청 전에 미리 만들어 둔다.
// 상세 내용이 올 때까지 보여 주는 로딩 화면 (정적 껍데기)
export default function TodoDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="불러오는 중" className="space-y-3 px-7 py-6">
      <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      <div className="h-20 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
