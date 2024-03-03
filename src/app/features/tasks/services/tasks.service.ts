import { Injectable } from '@angular/core';
import { Task } from '../../models/task.interface';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    private tasks: Task[] = [];

    constructor() {
        this.loadTasks();
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    addTask(title: string): void {
        const task: Task = {
            id: Date.now().toString(),
            title: title,
            isDone: false,
        };
        this.tasks.push(task);
        this.saveTasks();
    }

    toggleTaskDone(id: string): void {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
            task.isDone = !task.isDone;
            this.saveTasks();
        }
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks();
    }

    private loadTasks(): void {
        const tasks = localStorage.getItem('tasks');
        this.tasks = tasks ? JSON.parse(tasks) : [];
    }

    private saveTasks(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}
