import React, { useEffect, useState } from 'react'
import { Todo } from '../TodoForm'
import { LanguageDropdown } from '../LanguageDropdown'
import { LANGUAGE, INITIAL_LANGUAGE } from '@/utils/constants'

export interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (todoId: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo }) => {
  const [language, setLanguage] = useState<LANGUAGE['value']>(INITIAL_LANGUAGE.value);

  const handleTodoClick = (todo: Todo) => {
    onToggleTodo(todo.id);
  }

  useEffect(() => {
    const uncompletedTodos = todos.filter((todo) => !todo.completed);
    const message = `You have ${uncompletedTodos.length} uncompleted todos. They are: ${uncompletedTodos.map((todo) => todo.task).join(', ')}`;

    // Create a new speech synthesis utterance with the message.
    const utterance = new SpeechSynthesisUtterance(message);
    const voices = speechSynthesis.getVoices();
    // Set the voice to the default voice.
    utterance.voice = voices.find(voice => voice.lang === language) || voices[0];
    utterance.lang = language;
    // Speak the utterance.
    speechSynthesis.speak(utterance);
  }, [todos, language]);

  return (
    <ul className="my-10">
      <LanguageDropdown className='mb-4' onChange={(lang) => setLanguage(lang)} />

      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => handleTodoClick(todo)}
          className={`flex items-center py-2 ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-300'
          } cursor-pointer`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleTodoClick(todo)}
            className="mr-2 focus:outline-none"
          />
          <span>{todo.task}</span>
        </li>
      ))}
    </ul>
  );
}
