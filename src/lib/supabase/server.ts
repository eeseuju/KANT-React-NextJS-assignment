import { createServerClient } from '@supabase/ssr';
import { io } from 'next/cache';
import { cookies } from 'next/headers';

// 서버 컴포넌트·서버 코드에서 쓰는 Supabase 클라이언트 (로그인 쿠키를 읽는다)
export async function createClient() {
  // Supabase의 로그인 확인은 Date.now()를 쓴다. 미리 그리기(prerender)에 섞이지 않도록
  // 이 뒤의 코드는 실제 요청이 들어온 뒤에만 실행한다. (서버에서 이 함수를 쓰는 모든 곳에 적용됨)
  await io();
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 서버 컴포넌트에서는 쿠키를 쓸 수 없어 여기서 무시한다.
            // 로그인 갱신은 U05의 접근 제어 코드에서 처리한다.
          }
        },
      },
    },
  );
}
