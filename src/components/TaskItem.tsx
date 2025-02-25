import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Task } from "../models/Task";

interface TaskItemProps {
    task: Task;
    level?: number;
}

export const TaskItem: React.FC<TaskItemProps> = observer(({ task, level = 0 }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

    const handleAddSubtask = () => {
        if (newSubtaskTitle.trim() === "") return;

        const newTask = new Task(Date.now().toString(), newSubtaskTitle);
        task.addChild(newTask);
        setNewSubtaskTitle("");
        setIsAdding(false);
    };

    return (
        <div className="ml-4">
            <div style={{ marginLeft: level * 20 }} className="flex items-center my-1">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => task.toggle()}
                    className="mr-2"
                />
                <span>{task.title}</span>
                <button
                    className="ml-2 text-blue-500 hover:underline text-sm"
                    onClick={() => setIsAdding(!isAdding)}
                >
                    {isAdding ? "Отмена" : "Добавить подзадачу"}
                </button>
            </div>
            {isAdding && (
                <div style={{ marginLeft: (level + 1) * 20 }} className="flex items-center my-1">
                    <input
                        type="text"
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        placeholder="Название подзадачи"
                        className="border border-gray-300 rounded px-2 py-1 mr-2"
                    />
                    <button
                        onClick={handleAddSubtask}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                        Добавить
                    </button>
                </div>
            )}
            {task.children.map(child => (
                <TaskItem key={child.id} task={child} level={level + 1} />
            ))}
        </div>
    );
});
