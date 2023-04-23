import { useState } from 'react'
import { TodoList } from '@/components/TodoList'
import { TodoForm, Todo } from '@/components/TodoForm'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      completed: false,
      task: 'Today is sunday',
    }
  ])

  const handleAddTodo = (task: string) => {
    setTodos((values) => [
      ...values,
      {
        id: values.length,
        completed: false,
        task,
      },
    ])
  }

  const handleToggleTodo = (todoId: number) => {
    setTodos((values) =>
      values.map((value) =>
        value.id === todoId ? { ...value, completed: !value.completed } : value,
      ),
    )
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1 className="text-center text-5xl">Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} />
    </main>
  )
}
