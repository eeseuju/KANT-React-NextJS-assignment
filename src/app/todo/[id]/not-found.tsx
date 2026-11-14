import Link from 'next/link';


export default function TodoNotFound() {
  return (
    <section className="mx-auto max-w-2xl space-y-4 p-6 text-center">
      <h1 className="text-xl font-bold">페이지를 찾을 수 없습니다.</h1>
      <p className="text-zinc-600">
        주소가 잘못되었거나 이미 삭제된 할 일입니다.
      </p>
      <Link
        href="/todo"
        className="inline-block rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
      >
        목록으로 돌아가기
      </Link>
    </section>
  );
}