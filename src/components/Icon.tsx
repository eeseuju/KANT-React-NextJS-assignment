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
