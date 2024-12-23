'use client';

import * as React from 'react';

export function TodoList() {
  const [tasks, setTasks] = React.useState<string[]>([]);
  const [newTask, setNewTask] = React.useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">ToDoリスト</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="新しいタスクを入力"
          />
          <button
            onClick={addTask}
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          >
            追加
          </button>
        </div>
        <ul className="list-disc pl-5">
          {tasks.map((task, index) => (
            <li key={index} className="mb-2">
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
