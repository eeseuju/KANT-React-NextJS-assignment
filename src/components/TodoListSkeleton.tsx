// 데이터가 올 때까지 보여 주는 로딩 화면 (정적 껍데기)
// [고차 함수 사용: map]
export default function TodoListSkeleton() {
  return (
    <div aria-busy="true" aria-label="불러오는 중">
      <div className="border-b border-gray-200 px-7 py-4">
        <div className="h-6 animate-pulse rounded bg-gray-200" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="border-b border-gray-200 px-7 py-4">
          <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
