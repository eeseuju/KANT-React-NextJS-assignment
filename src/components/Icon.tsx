// [서버 컴포넌트] 상태·이벤트가 없는 틀이라 서버에서 그린다. (브라우저로 가는 JS를 늘리지 않음)
type IconProps = {
  name: string;
  size?: number;
  className?: string;
};


// 구글 Material Symbols 아이콘 (글자 이름이 곧 아이콘 모양. 예: 'search')
export default function Icon({ name, size = 24, className = '' }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined select-none ${className}`}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
}
