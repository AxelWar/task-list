import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { Task } from '../../../models/task.interface';
import { TasksService } from '../../services/tasks.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
    @ViewChild('dialogContainer', { read: ViewContainerRef })
    dialogContainerRef!: ViewContainerRef;
    tasks: Task[] = [];

    constructor(
        private tasksService: TasksService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.tasks = this.tasksService.getTasks();
    }

    toggleDone(id: string): void {
        this.tasksService.toggleTaskDone(id);
        this.tasks = this.tasksService.getTasks(); // Refresh the list
    }

    deleteTask(id: string): void {
        this.dialogService
            .openDialog(
                {
                    title: 'Delete Task?',
                    message: '¿Are you sure you want to delete this task?',
                },
                ConfirmDialogComponent
            )
            .subscribe((confirmed: boolean) => {
                if (confirmed) {
                    this.tasksService.deleteTask(id);
                    this.tasks = this.tasksService.getTasks(); // Refresh the list
                }
            });
    }
}
