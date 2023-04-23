import { useState } from 'react'
import { Inter } from 'next/font/google'
import { TodoList } from '@/components/TodoList'
import { TodoForm, Todo } from '@/components/TodoForm'

const inter = Inter({ subsets: ['latin'] })

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
    <main id="HomePage" className={`p-10 ${inter.className}`}>
      <h1 className="text-center text-5xl mb-8">Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} />
    </main>
  )
}
