import { makeAutoObservable } from "mobx";
import { Task } from "../models/Task";

export class TaskStore {
    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }
}
