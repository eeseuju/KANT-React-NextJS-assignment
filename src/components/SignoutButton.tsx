'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';


export default function SignoutButton() {
  const router = useRouter();
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
      router.push('/signin');
      router.refresh();
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
