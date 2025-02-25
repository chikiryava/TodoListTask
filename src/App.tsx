import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TaskStore } from "./stores/TaskStore";
import { Task } from "./models/Task";
import { TaskItem } from "./components/TaskItem";

export const App: React.FC = observer(() => {
    const [store] = useState(() => new TaskStore());
    const [newTaskTitle, setNewTaskTitle] = useState("");

    useEffect(() => {
        // Пример тестовых данных
        store.addTask(
            new Task("1", "Task 1", [
                new Task("1-1", "Subtask 1-1"),
                new Task("1-2", "Subtask 1-2", [
                    new Task("1-2-1", "Subtask 1-2-1"),
                    new Task("1-2-2", "Subtask 1-2-2"),
                ]),
            ])
        );
        store.addTask(new Task("2", "Task 2"));
    }, [store]);

    const handleAddTask = () => {
        if (newTaskTitle.trim() === "") return;
        const newTask = new Task(Date.now().toString(), newTaskTitle);
        store.addTask(newTask);
        setNewTaskTitle("");
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-6">Task Tree</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Название задачи"
                        className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                    >
                        Добавить задачу
                    </button>
                </div>
                <div>
                    {store.tasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    );
});
