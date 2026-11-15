// [서버 컴포넌트] 로그인 쿠키로 DB를 조회한다. 조회 코드와 키가 브라우저로 가지 않는다.
import TodoApp from '@/components/TodoApp';
import { getTodos } from '@/lib/todo-queries';


// 서버 컴포넌트
// 데이터를 가져와서 화면 상태를 맡은 클라이언트 컴포넌트(TodoApp)에 넘긴다.
export default async function TodoContent() {
  const todos = await getTodos();
  return <TodoApp initialTodos={todos} />;
}