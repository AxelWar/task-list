import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../models/task.interface';

@Injectable({
    providedIn: 'root',
})
export class MockTasksService {
    private tasks: Task[] = [
        { id: '1', title: 'Task 1', isDone: false },
        { id: '2', title: 'Task 2', isDone: false },
        { id: '3', title: 'Task 3', isDone: false },
        { id: '4', title: 'Task 4', isDone: false },
        { id: '5', title: 'Task 5', isDone: false },
        { id: '6', title: 'Task 6', isDone: false },
    ];
    private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
    tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

    constructor() {}

    getTasks(): Task[] {
        return this.tasksSubject.value;
    }

    addTask(title: string): void {
        const task: Task = {
            id: Date.now().toString(), // Mock ID generation
            title: title,
            isDone: false,
        };
        this.tasks = [...this.tasks, task];
        this.tasksSubject.next(this.tasks);
    }

    toggleTaskDone(id: string): void {
        this.tasks = this.tasks.map((task) =>
            task.id === id ? { ...task, isDone: !task.isDone } : task
        );
        this.tasksSubject.next(this.tasks);
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.tasksSubject.next(this.tasks);
    }
}
