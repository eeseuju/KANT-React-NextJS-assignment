'use client';

import { useState } from 'react';
import type { SubmitEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getAuthErrorMessage, validateAuthInput } from '@/lib/auth';

type AuthFormProps = {
  mode: 'signin' | 'signup';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignup = mode === 'signup';

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setNotice('');

    const message = validateAuthInput(email, password);
    if (message) {
      setError(message);
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const credentials = { email: email.trim(), password };
      const result = isSignup
        ? await supabase.auth.signUp(credentials)
        : await supabase.auth.signInWithPassword(credentials);

      if (result.error) {
        setError(getAuthErrorMessage(result.error.message));
        return;
      }
      if (!result.data.session) {
        // 이메일 확인이 켜져 있으면 세션이 바로 생기지 않는다
        setNotice('확인 메일을 보냈습니다. 메일의 링크를 누른 뒤 로그인하세요.');
        return;
      }
      router.push('/todos');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      {notice && <p className="text-sm text-green-700">{notice}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800 disabled:opacity-50"
      >
        {loading ? '처리 중...' : isSignup ? '가입하기' : '로그인'}
      </button>

      <p className="text-center text-sm text-zinc-600">
        {isSignup ? '이미 계정이 있나요? ' : '계정이 없나요? '}
        <Link
          href={isSignup ? '/signin' : '/signup'}
          className="font-medium text-green-700 underline"
        >
          {isSignup ? '로그인' : '회원가입'}
        </Link>
      </p>
    </form>
  );
}