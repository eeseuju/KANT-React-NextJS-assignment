import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// 요청 쿠키로 로그인 여부를 확인하고, 갱신된 쿠키를 담은 응답을 돌려주기
// [고차 함수 사용: forEach] (쿠키를 바꾸므로 순수 함수는 아님)
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 쿠키 속 증표의 서명을 확인한다. getSession()은 쿠키를 그냥 믿으므로 쓰지 않는다.
  const { data } = await supabase.auth.getClaims();

  return { response, isSignedIn: Boolean(data?.claims) };
}