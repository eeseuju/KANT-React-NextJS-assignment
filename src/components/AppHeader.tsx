// [서버 컴포넌트] 상태·이벤트가 없는 틀이라 서버에서 그린다. (브라우저로 가는 JS를 늘리지 않음)
import type { ReactNode } from 'react';
import Icon from '@/components/Icon';


type AppHeaderProps = {
  title: string;
  action?: ReactNode;
};


// 카드 맨 위: 초록 원 아이콘 + 제목 (+ 오른쪽에 버튼 같은 것)
export default function AppHeader({ title, action }: AppHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-7 py-5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <Icon name="task_alt" size={20} />
      </span>
      <h1 className="flex-1 truncate text-xl font-bold">{title}</h1>
      {action}
    </header>
  );
}
