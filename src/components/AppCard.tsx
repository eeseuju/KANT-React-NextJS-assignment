import type { ReactNode } from 'react';


type AppCardProps = {
  children: ReactNode;
  size?: 'sm' | 'md';
};


// 회색 배경 위에 놓이는 흰색 둥근 카드 (모든 페이지가 같이 쓰는 틀)
// 폭을 바꾸고 싶으면 아래 max-w-2xl 을 max-w-xl(좁게) / max-w-3xl(넓게)로 바꾼다
export default function AppCard({ children, size = 'md' }: AppCardProps) {
  const sizeClass = size === 'sm' ? 'max-w-sm' : 'min-h-[500px] max-w-2xl';

  return (
    <div className="px-4 py-8 sm:py-10">
      <main
        className={`mx-auto flex w-full flex-col rounded-2xl bg-white shadow-lg ${sizeClass}`}
      >
        {children}
      </main>
    </div>
  );
}
