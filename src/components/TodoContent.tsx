import TodoApp from '@/components/TodoApp';
import { getTodos } from '@/lib/todo-queries';


// 서버 컴포넌트
// 데이터를 가져와서 화면 상태를 맡은 클라이언트 컴포넌트(TodoApp)에 넘긴다.
export default async function TodoContent() {
  const todos = await getTodos();
  return <TodoApp initialTodos={todos} />;
}