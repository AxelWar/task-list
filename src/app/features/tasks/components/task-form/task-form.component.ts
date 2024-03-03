import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
    taskForm = this.fb.group({
        title: [
            '',
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(80),
            ],
        ],
    });

    constructor(
        private fb: FormBuilder,
        private tasksService: TasksService
    ) {}

    onSubmit(): void {
        if (this.taskForm.valid) {
            this.tasksService.addTask(this.taskForm.value.title as string);
            this.taskForm.reset();
        }
    }

    get title() {
        return this.taskForm.get('title');
    }
}
