import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import { getRedirectPath } from '@/lib/auth';


// 로그인 여부에 따라 페이지 접근을 제어하는 1차 검문 (쿠키만 읽는 가벼운 검사)
// [고차 함수 사용: forEach] (응답을 만들므로 순수 함수는 아님)
export async function proxy(request: NextRequest) {
  const { response, isSignedIn } = await updateSession(request);
  const redirectPath = getRedirectPath(isSignedIn, request.nextUrl.pathname);

  if (!redirectPath) {
    return response;
  }

  // 이동 응답에도 갱신된 로그인 쿠키를 그대로 붙인다.
  const redirectResponse = NextResponse.redirect(
    new URL(redirectPath, request.url),
  );
  response.cookies
    .getAll()
    .forEach((cookie) => redirectResponse.cookies.set(cookie));
  return redirectResponse;
}


// proxy가 실행될 주소 (상수여야 함)
export const config = {
  matcher: ['/todo/:path*', '/signin', '/signup'],
};