import { createClient } from '@/lib/supabase/client';
import type { Todo } from '@/types/todo';


// 새 할 일을 저장하고, DB가 채워 준 값(id, user_id 등)이 든 한 줄을 돌려받기
export async function insertTodo(title: string): Promise<Todo> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('todos')
    .insert({ title })
    .select()
    .single<Todo>();

  if (error || !data) {
    throw new Error(error?.message ?? '저장 결과가 비어 있습니다.');
  }
  return data;
}


// 완료 여부 바꾸기
export async function updateTodoDone(id: string, done: boolean): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('todos')
    .update({ done })
    .eq('id', id)
    .select('id');

  if (error) {
    throw new Error(error.message);
  }
  // 내 것이 아니거나 이미 지워졌으면 에러 없이 0행이 바뀐다.
  if (!data || data.length === 0) {
    throw new Error('수정할 할 일을 찾지 못했습니다.');
  }
}


// 할 일 지우기
export async function deleteTodo(id: string): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    throw new Error(error.message);
  }
  if (!data || data.length === 0) {
    throw new Error('삭제할 할 일을 찾지 못했습니다.');
  }
}