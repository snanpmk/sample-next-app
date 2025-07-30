"use client";

import { Plus, Trash2 } from "lucide-react";
import { Single_Day } from "next/font/google";
import { useState, useEffect } from "react";

const singleDay = Single_Day({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Load todos from localStorage only on client
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save todos to localStorage when changed
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a task
  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { text: trimmed, completed: false }]);
    setInput("");
  };

  // Toggle completion
  const toggleCompleted = (idx) => {
    setTodos(
      todos.map((todo, i) =>
        i === idx ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Remove todo
  const removeTodo = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <main
      className={
        `
        min-h-screen flex flex-col items-center py-16 px-4
        bg-white
        bg-[radial-gradient(#f3f4f6_1px,transparent_1px)] [background-size:20px_20px]
        w-full
        ` + singleDay.className
      }
    >
      <h1
        className="text-3xl mb-10 font-handwritten text-gray-800 tracking-wider text-center"
        style={{ letterSpacing: "0.04em" }}
      >
        To-Do
      </h1>
      <form
        className="flex gap-2 mb-12 w-full max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          className="
            flex-1 py-2 px-4 rounded-lg border-0
            bg-transparent font-handwritten text-xl tracking-wide
            focus:outline-none
            placeholder:text-gray-400
          "
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add your task..."
          aria-label="Add your task"
          autoComplete="off"
        />
        <button
          className="
            bg-gray-800 text-white p-2 rounded-full
            hover:bg-gray-700 transition
          "
          type="submit"
          aria-label="Add todo"
        >
          <Plus size={22} strokeWidth={3} />
        </button>
      </form>
      <ul className="w-full max-w-lg flex flex-col gap-4">
        {todos.map((todo, idx) => (
          <li key={idx} className="flex items-center group select-none">
            <span
              className={`
                flex-1 cursor-pointer font-handwritten text-xl
                transition
                ${
                  todo.completed
                    ? "line-through text-[#b4b4b4] opacity-70"
                    : "text-gray-500"
                }
              `}
              onClick={() => toggleCompleted(idx)}
              title={todo.completed ? "Mark as not done" : "Mark as done"}
              aria-pressed={todo.completed}
            >
              • {todo.text}
            </span>
            <button
              className="
                text-red-300 hover:text-red-600 ml-3 transition
                opacity-0 group-hover:opacity-100
              "
              onClick={() => removeTodo(idx)}
              aria-label={`Delete todo ${todo.text}`}
              tabIndex={-1}
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <li className="text-center text-gray-400 py-8 font-handwritten text-lg">
            Write your first task above!
          </li>
        )}
      </ul>
    </main>
  );
}
