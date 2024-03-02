import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './services/tasks.service';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';

@NgModule({
    imports: [CommonModule, TasksRoutingModule],
    declarations: [TaskFormComponent, TaskListComponent, TasksComponent],
    providers: [TaskService],
})
export class TasksModule {}
