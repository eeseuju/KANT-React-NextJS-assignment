import { useSyncExternalStore } from 'react';


// 오늘 날짜 글자 (이 브라우저의 시간대 기준, 예: '2026-11-15')
// 현재 시각을 읽으므로 순수 함수는 아님
function getTodayString(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}


// 자정이 지나면 React에게 "오늘이 바뀌었으니 다시 읽어 줘"라고 알리는 구독
function subscribe(onChange: () => void): () => void {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  function scheduleNextMidnight() {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    // 자정이 지나고 1초 뒤에 알린다. (1초는 여유)
    const wait = nextMidnight.getTime() - now.getTime() + 1000;
    timerId = setTimeout(() => {
      onChange();
      scheduleNextMidnight();
    }, wait);
  }

  scheduleNextMidnight();

  // 정리(cleanup): 이 훅을 쓰는 화면이 사라지면 타이머를 멈춘다.
  return () => clearTimeout(timerId);
}


// 오늘 날짜를 돌려주는 훅.
// 서버가 처음 그릴 때는 이 브라우저의 날짜를 알 수 없으므로 null을 돌려주고,
// 브라우저에서 이어받은 뒤에 실제 날짜로 바뀐다. (서버·브라우저 화면이 어긋나는 오류를 막음)
export function useToday(): string | null {
  return useSyncExternalStore(subscribe, getTodayString, () => null);
}
