export const PASSWORD_MIN_LENGTH = 6;


const DEFAULT_ERROR_MESSAGE = '문제가 발생했습니다. 잠시 후 다시 시도하세요.';


// Supabase가 돌려주는 영어 오류 문구에 들어 있는 단어 → 보여 줄 한국어 문구
const AUTH_ERROR_MESSAGES = [
  { keyword: 'invalid login credentials', message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
  { keyword: 'already registered', message: '이미 가입된 이메일입니다.' },
  { keyword: 'email not confirmed', message: '이메일 확인이 필요합니다. 메일함을 확인하세요.' },
  { keyword: 'at least', message: `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.` },
  { keyword: 'rate limit', message: '요청이 너무 많습니다. 잠시 후 다시 시도하세요.' },
  { keyword: 'invalid', message: '입력한 내용을 다시 확인하세요.' },
];


// 로그인·회원가입 입력값 검사 (문제가 없으면 빈 문자열)
// [순수 함수]
export function validateAuthInput(email: string, password: string): string {
  if (email.trim() === '') {
    return '이메일을 입력하세요.';
  }
  if (!email.includes('@')) {
    return '이메일 형식이 올바르지 않습니다.';
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`;
  }
  return '';
}


// Supabase 오류 문구를 한국어 문구로 바꾸기 (모르는 문구는 기본 문구)
// [순수 함수] [고차 함수 사용: find]
export function getAuthErrorMessage(message: string): string {
  const text = message.toLowerCase();
  const found = AUTH_ERROR_MESSAGES.find((item) => text.includes(item.keyword));
  return found ? found.message : DEFAULT_ERROR_MESSAGE;
}


// 로그인 없이 볼 수 있는 페이지
const AUTH_PAGES = ['/signin', '/signup'];


// 로그인 여부와 주소를 보고 이동시킬 곳 정하기 (이동이 필요 없으면 null)
// [순수 함수]
export function getRedirectPath(
  isSignedIn: boolean,
  pathname: string,
): string | null {
  const isAuthPage = AUTH_PAGES.includes(pathname);
  if (!isSignedIn && !isAuthPage) {
    return '/signin';
  }
  if (isSignedIn && isAuthPage) {
    return '/todo';
  }
  return null;
}