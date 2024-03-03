import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Task } from '../../../models/task.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];

    constructor(
        private tasksService: TasksService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.tasks = this.tasksService.getTasks();
    }

    toggleDone(id: string): void {
        this.tasksService.toggleTaskDone(id);
        this.tasks = this.tasksService.getTasks(); // Refresh the list
    }

    deleteTask(id: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '250px',
            data: { id },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.tasksService.deleteTask(id);
                this.tasks = this.tasksService.getTasks(); // Refresh the list
            }
        });
    }
}
