'use client';

import { useState } from 'react';
import type { Todo } from '@/types/todo';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

type TodoAppProps = {
  initialTodos: Todo[];
};

export default function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // 임시: 화면 안에서만 바뀐다. U07에서 Supabase 저장으로 교체
  function handleAdd(title: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      user_id: 'local',
      title,
      content: '',
      due_date: null,
      due_time: null,
      done: false,
      created_at: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div className="space-y-4">
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}