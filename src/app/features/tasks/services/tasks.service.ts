import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../models/task.interface';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    tasks$ = this.tasksSubject.asObservable();

    constructor() {
        this.loadTasks();
    }

    getTasks(): Task[] {
        return this.tasksSubject.value;
    }

    addTask(title: string): void {
        const task: Task = {
            id: Date.now().toString(),
            title: title,
            isDone: false,
        };
        const updatedTasks = [...this.tasksSubject.value, task];
        this.tasksSubject.next(updatedTasks);
        this.saveTasks();
    }

    toggleTaskDone(id: string): void {
        const updatedTasks = this.tasksSubject.value.map((task: Task) =>
            task.id === id ? { ...task, isDone: !task.isDone } : task
        );
        this.tasksSubject.next(updatedTasks);
        this.saveTasks();
    }

    deleteTask(id: string): void {
        const updatedTasks = this.tasksSubject.value.filter(
            (task: Task) => task.id !== id
        );
        this.tasksSubject.next(updatedTasks);
        this.saveTasks();
    }

    loadTasks(): void {
        const tasks = localStorage.getItem('tasks');
        const initialTasks = tasks ? JSON.parse(tasks) : [];
        this.tasksSubject.next(initialTasks);
    }

    saveTasks(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasksSubject.value));
    }
}
