import Link from 'next/link';
import AppCard from '@/components/AppCard';
import AppHeader from '@/components/AppHeader';


export default function TodoNotFound() {
  return (
    <AppCard>
      <AppHeader title="할 일 상세" />
      <div className="space-y-4 px-7 py-16 text-center">
        <p className="font-medium">할 일을 찾을 수 없습니다.</p>
        <p className="text-sm text-gray-500">
          주소가 잘못되었거나 이미 삭제된 할 일입니다.
        </p>
        <Link href="/todo" className="btn btn-primary inline-block">
          목록으로 돌아가기
        </Link>
      </div>
    </AppCard>
  );
}
