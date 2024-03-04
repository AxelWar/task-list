import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { MockTasksService } from '../../mocks/tasks.mock.service';
import { TasksService } from '../../services/tasks.service';
import { TasksModule } from '../../tasks.module';
import { TaskListComponent } from './task-list.component';

class MockDialogService {
    openDialog = jest.fn().mockReturnValue(of(true)); // Simplified mock implementation
}

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;
    let tasksService: TasksService;
    let dialogService: DialogService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskListComponent],
            imports: [TasksModule],
            providers: [
                { provide: DialogService, useClass: MockDialogService },
                { provide: TasksService, useClass: MockTasksService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        tasksService = TestBed.inject(TasksService);
        dialogService = TestBed.inject(DialogService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a new task', async () => {
        tasksService.addTask('Test Task');

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.tasks[component.tasks.length - 1].title).toBe(
            'Test Task'
        );
    });

    it('should get task', async () => {
        //we have 6 tasks already mocked
        tasksService.getTasks();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.tasks.length).toBe(6);
    });

    it('should toggle task done status', () => {
        tasksService.addTask('Toggle Task');
        const taskId = component.tasks[0].id;

        // Toggle task done status
        component.toggleDone(taskId);

        expect(
            component.tasks.find((task) => task.id === taskId)?.isDone
        ).toBeTruthy();
    });

    it('should delete a task', async () => {
        // Add a task to delete
        tasksService.addTask('Delete Task');
        const taskId = component.tasks[0].id;

        // Mock confirmation dialog to simulate user confirming the deletion
        jest.spyOn(dialogService, 'openDialog').mockReturnValueOnce(of(true));
        component.deleteTask(taskId);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(
            component.tasks.find((task) => task.id === taskId)
        ).toBeUndefined();
    });

    it('should change page and update displayed tasks', () => {
        // Assuming your initial page size is 5 and you have 6 tasks
        expect(component.displayedTasks.length).toBe(5); // Initial load

        // Simulate page change
        component.onPageChanged({ page: 2, size: 5 });
        fixture.detectChanges(); // Update view

        // Now, there should be 1 task displayed (6th task on the 2nd page)
        expect(component.displayedTasks.length).toBe(1);
        expect(component.displayedTasks[0].title).toBe('Task 6');
    });

    it('should change page size and reset current page on page size change', () => {
        const initialPageSize = component.itemsPerPage;

        // Mock the updatePagination method to avoid actual implementation details
        const updatePaginationSpy = jest.spyOn(component, 'updatePagination');

        // Change the page size
        const newPageSize = 10;
        component.onPageSizeChange(newPageSize);

        expect(component.itemsPerPage).toBe(newPageSize);
        expect(component.currentPage).toBe(1); // Should reset to 1
        expect(updatePaginationSpy).toHaveBeenCalled(); // Verify updatePagination was called
        expect(component.itemsPerPage).not.toBe(initialPageSize);
        //as default component displays 5 tasks
        expect(component.displayedTasks.length).toBe(6);
    });
});
