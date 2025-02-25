import { makeObservable, observable, action } from "mobx";

export class Task {
    id: string;
    title: string;
    completed: boolean;
    children: Task[];
    parent?: Task;

    constructor(id: string, title: string, children: Task[] = [], parent?: Task) {
        this.id = id;
        this.title = title;
        this.completed = false;
        this.children = children;
        this.parent = parent;
        this.children.forEach(child => (child.parent = this));

        makeObservable(this, {
            completed: observable,
            children: observable,
            toggle: action,
            setCompleted: action,
            syncUp: action,
            addChild: action,
        });
    }

    toggle(value?: boolean) {
        const newValue = typeof value === "boolean" ? value : !this.completed;
        this.setCompleted(newValue);
    }

    setCompleted(value: boolean) {
        if (this.completed === value) return;
        this.completed = value;
        this.children.forEach(child => child.setCompleted(value));
        this.syncUp();
    }

    syncUp() {
        if (this.parent) {
            const newValue = this.parent.children.every(child => child.completed);
            if (this.parent.completed !== newValue) {
                this.parent.completed = newValue;
                this.parent.syncUp();
            }
        }
    }

    addChild(child: Task) {
        child.parent = this;
        this.children.push(child);
        this.completed = this.children.every(child => child.completed);
        this.syncUp();
    }
}
