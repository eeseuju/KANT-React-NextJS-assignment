import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Todo } from '@/types/todo';


// 로그인한 사용자의 할 일을 최신순으로 가져오기 (서버에서만 호출)
export async function getTodos(): Promise<Todo[]> {
  const supabase = await createClient();

  // proxy가 1차로 막지만, 데이터를 읽는 곳에서 한 번 더 확인한다.
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) {
    redirect('/signin');
  }

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })
    .overrideTypes<Todo[], { merge: false }>();

  if (error) {
    throw new Error(`할 일을 불러오지 못했습니다: ${error.message}`);
  }
  return data ?? [];
}