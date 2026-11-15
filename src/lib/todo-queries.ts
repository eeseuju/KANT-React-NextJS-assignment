import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isUuid } from '@/lib/todos';
import type { Todo } from '@/types/todo';


// 로그인을 확인한 Supabase 클라이언트 만들기 (로그인 안 했으면 /signin으로 보냄)
// proxy가 1차로 막지만, 데이터를 읽는 곳에서 한 번 더 확인한다.
async function createSignedInClient() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    redirect('/signin');
  }
  return supabase;
}


// 로그인한 사용자의 할 일을 최신순으로 가져오기 (서버에서만 호출함)
export async function getTodos(): Promise<Todo[]> {
  const supabase = await createSignedInClient();

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


// 할 일 한 개 가져오기 (id 모양이 이상하거나, 없거나, 내 것이 아니면 404 화면)
export async function getTodo(id: string): Promise<Todo> {
  if (!isUuid(id)) {
    notFound();
  }

  const supabase = await createSignedInClient();
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .maybeSingle<Todo>();

  if (error) {
    throw new Error(`할 일을 불러오지 못했습니다: ${error.message}`);
  }
  if (!data) {
    notFound();
  }
  return data;
}