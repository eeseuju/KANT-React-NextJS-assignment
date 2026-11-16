'use client';

// [클라이언트 컴포넌트] 클릭 이벤트와 브라우저용 Supabase(로그아웃)를 쓴다.
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';


export default function SignoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignout() {
    setLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError('로그아웃에 실패했습니다. 다시 시도하세요.');
        return;
      }
      // router.push 대신 전체 새로고침: Cache Components는 떠난 화면의 상태(입력값, 오류 문구, 이전 사용자의 목록)를
      // 숨겨서 보존하므로, 로그아웃 때는 한 번에 비워야 한다.
      window.location.assign('/signin');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={handleSignout}
        disabled={loading}
        className="btn btn-outline btn-sm"
      >
        {loading ? '로그아웃 중...' : '로그아웃'}
      </button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
