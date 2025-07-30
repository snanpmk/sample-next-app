"use client";

import { Trash2, Plus } from "lucide-react";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

interface ClientData {
  clientInfo: {
    fullName: string;
    profilePicUrl: string;
  };
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://synconnect.in/api/65c38aff2d671779e2b5b075")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch client data");
        return res.json();
      })
      .then((data) => {
        setClientData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { text: trimmed, completed: false }]);
    setInput("");
  };

  const toggleCompleted = (idx: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === idx ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  return (
    <main
      className="
        min-h-screen flex flex-col items-center pt-8 pb-20 px-4
        bg-gradient-to-br from-slate-900  to-slate-900
        text-white relative overflow-hidden
      "
    >
      {/* Background decorative elements */}
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-500/20 via-cyan-400/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/10 via-teal-400/8 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Additional floating elements */}
        <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-pink-400/15 to-purple-300/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-tr from-amber-400/12 to-orange-300/8 rounded-full blur-2xl animate-pulse delay-1500"></div>

        {/* Subtle mesh overlay */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse delay-3000"></div>
          <div className="absolute top-2/3 right-1/3 w-40 h-40 bg-white/3 rounded-full blur-xl animate-pulse delay-4000"></div>
          <div className="absolute bottom-1/3 left-2/3 w-24 h-24 bg-white/8 rounded-full blur-xl animate-pulse delay-2500"></div>
        </div>

       
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-br-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-tl-full blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              To-Do
            </h1>
            <p className="text-gray-300 text-lg">
              Stay organized, stay productive
            </p>
          </div>

          {/* Client Greeting */}
          <div
            className="
              rounded-2xl p-6 
              transition-all duration-300 
            "
          >
            {loading && (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-emerald-400 font-medium animate-pulse">
                  Loading client info...
                </p>
              </div>
            )}
            {error && (
              <p className="text-red-400 font-medium bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}
            {clientData && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={clientData.clientInfo.profilePicUrl}
                    alt={`${clientData.clientInfo.fullName} profile`}
                    className="
                      rounded-full w-20 h-20 object-cover
                      ring-4 ring-white/20 shadow-xl
                    "
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-white">
                    Welcome back, {clientData.clientInfo.fullName}!
                  </h2>
                  <p className="text-gray-300 text-sm mt-1">
                    Ready to tackle your tasks?
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Input Section with Glassmorphism */}
        <div
          className="
            rounded-2xl 
            transition-all duration-300 "
        >
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                className="
                  w-full px-6 py-4 bg-white/10 backdrop-blur-md
                  border border-white/20 rounded-xl
                  text-white placeholder-gray-300
                  text-lg font-medium
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/50
                  focus:border-emerald-400/50 focus:bg-white/20
                  transition-all duration-300
                "
                placeholder="What needs to be done?"
                aria-label="Add your task"
                autoComplete="off"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>

        {/* Todos Section */}
        <div
          className="
            backdrop-blur-xl bg-white/5 border border-white/10
            rounded-2xl p-6 shadow-2xl min-h-[400px]
          "
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Your Tasks</h3>
            <div className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">
              {todos.filter((t) => !t.completed).length} of {todos.length}{" "}
              remaining
            </div>
          </div>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <Plus size={24} className="text-gray-300" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-gray-300">
                    No tasks yet
                  </h4>
                  <p className="text-gray-400">
                    Add your first task above to get started!
                  </p>
                </div>
              </div>
            ) : (
              todos.map((todo, idx) => (
                <div
                  key={idx}
                  className={`
                    flex items-center justify-between
                    backdrop-blur-md bg-white/5 border border-white/10
                    rounded-xl p-4 group
                    transition-all duration-300 ease-in-out
                    hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]
                    ${todo.completed ? "opacity-60" : "hover:shadow-lg"}
                    cursor-pointer
                  `}
                  onClick={() => toggleCompleted(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCompleted(idx);
                    }
                  }}
                  title={todo.completed ? "Mark as not done" : "Mark as done"}
                  aria-pressed={todo.completed}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div
                      className={`
                      w-5 h-5 rounded-full border-2 transition-all duration-200
                      ${
                        todo.completed
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-gray-400 group-hover:border-emerald-400"
                      }
                      flex items-center justify-center
                    `}
                    >
                      {todo.completed && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`
                      font-medium text-lg transition-all duration-200
                      ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-white"
                      }
                    `}
                    >
                      {todo.text}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTodo(idx);
                    }}
                    aria-label={`Delete todo ${todo.text}`}
                    className="
                      p-2 rounded-lg backdrop-blur-sm
                      bg-red-500/10 border border-red-500/20
                      text-red-400 hover:text-red-300 hover:bg-red-500/20
                      focus:outline-none focus:ring-2 focus:ring-red-500/50
                      transition-all duration-200 ease-in-out
                      transform hover:scale-110 active:scale-95
                      opacity-0 group-hover:opacity-100
                    "
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
