// [TodoApp 안에서 쓰이는 컴포넌트] 훅 없이 끝 이벤트 함수를 props로 받아, TodoApp과 같이 브라우저에서 동작한다.

type ThumbEffectProps = {
  onEnd: () => void;
};


// 완료 체크 때 잠깐 보이는 따봉. 움직임은 CSS(.thumb-up)가 맡고, 끝나면 onEnd로 알린다.
export default function ThumbEffect({ onEnd }: ThumbEffectProps) {
  return (
    <span aria-hidden="true" className="thumb-up" onAnimationEnd={onEnd}>
      👍
    </span>
  );
}
