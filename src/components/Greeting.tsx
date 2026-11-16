// [서버 컴포넌트] 로그인 쿠키에서 닉네임을 읽어 인사말을 보여 준다.
import { createClient } from "@/lib/supabase/server";

export default async function Greeting() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const nickname = data?.claims.user_metadata?.nickname;

  // 닉네임 없이 가입한 옛 계정은 아무것도 보여 주지 않는다.
  if (!nickname) {
    return null;
  }
  return (
    <span className="truncate text-sm text-gray-600">
      {nickname}님 안녕하세요🖐️
    </span>
  );
}
