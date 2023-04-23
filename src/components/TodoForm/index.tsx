import React, { useState } from "react";
import { PlusIcon } from "../PlusIcon";

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

interface TodoFormProps {
  onAddTodo: (todo: string) => void;
}

declare global {
  type SpeechRecognitionType = typeof SpeechRecognition;

  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [task, setTask] = useState("");

  const [recording, setRecording] = useState(false);
  const [speechResult, setSpeechResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() !== "") {
      onAddTodo(task.trim());
      setTask("");
    }
  };

  const handleStartRecording = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onresult = (e: any) => {
      const result = e.results[0][0].transcript;
      setSpeechResult(result);
      setTask(result);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full">
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={handleInputChange}
        className="w-full border-gray-400 border-2 rounded-l-lg py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 flex items-center focus:outline-none"
      >
        <PlusIcon className="h-5 w-5 mr-1" />
        <span>Add</span>
      </button>
      <button
        type="button"
        onClick={handleStartRecording}
        className={`bg-green-500 hover:bg-green-600 rounded-l-none text-white py-2 px-4 flex items-center focus:outline-none rounded-lg whitespace-nowrap ${
          recording ? "bg-red-500 hover:bg-red-600" : ""
        }`}
      >
        {recording ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M7.003 2.818a7 7 0 0 1 9.192 9.192l.708-.708a8 8 0 1 0-11.314-11.314l.708.708zm7.778 4.899a4 4 0 1 1-5.656 5.656 4 4 0 0 1 5.656-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Stop Recording
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10 3a7 7 0 0 1 7 7a7 7 0 0 1-7 7a7 7 0 0 1-7-7a7 7 0 0 1 7-7zm0 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5zM5.293 9.707l1.414-1.414l2.829 2.829l5.657-5.657l1.414 1.414l-7.071 7.071l-3.243-3.243z"
                clipRule="evenodd"
              />
            </svg>
            Start Recording
          </>
        )}
      </button>
    </form>
  );
};
