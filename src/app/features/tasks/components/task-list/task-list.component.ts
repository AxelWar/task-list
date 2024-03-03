import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { Task } from '../../../models/task.interface';
import { TasksService } from '../../services/tasks.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContainer', { read: ViewContainerRef })
    dialogContainerRef!: ViewContainerRef;
    tasks: Task[] = [];
    private tasksSubscription!: Subscription;

    filteredTasks: Task[] = [];
    searchQuery = '';
    itemsPerPage = 5;
    currentPage = 1;
    totalPages = 1;
    displayedTasks!: Task[];

    constructor(
        private tasksService: TasksService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.tasksSubscription = this.tasksService.tasks$.subscribe((tasks) => {
            this.tasks = tasks;
            this.displayedTasks = tasks;
            this.filteredTasks = [...tasks];
            this.updatePagination();
        });
    }

    toggleDone(id: string): void {
        this.tasksService.toggleTaskDone(id);
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
                    this.updatePagination();
                }
            });
    }

    onPageChanged(event: { page: number; size: number }) {
        this.currentPage = event.page;
        this.itemsPerPage = event.size;
        this.applyPagination();
    }

    applyPagination() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedTasks = this.filteredTasks.slice(startIndex, endIndex);
    }

    onPageSizeChange(newSize: number) {
        this.itemsPerPage = newSize;
        this.currentPage = 1;
        this.updatePagination();
    }

    updatePagination() {
        this.totalPages = Math.ceil(
            this.filteredTasks.length / this.itemsPerPage
        );
        if (this.totalPages === 0) {
            this.totalPages = 1;
        }
        if (this.displayedTasks.length === 0) {
            this.currentPage = this.currentPage - 1;
            if (this.currentPage === 0) {
                this.currentPage = 1;
            }
        }
        this.applyPagination();
    }

    get totalResults() {
        return this.filteredTasks.length;
    }

    ngOnDestroy(): void {
        this.tasksSubscription.unsubscribe();
    }
}
