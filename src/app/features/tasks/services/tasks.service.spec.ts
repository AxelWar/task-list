import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
    let service: TasksService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TasksService],
        });
        service = TestBed.inject(TasksService);

        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn().mockReturnValue(null),
                setItem: jest.fn(),
                clear: jest.fn(),
            },
            writable: true,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a task and save to localStorage', () => {
        const taskTitle = 'New Task';
        service.addTask(taskTitle);

        const tasks = service.getTasks();
        expect(tasks.length).toBe(1);
        expect(tasks[0].title).toBe(taskTitle);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'tasks',
            JSON.stringify(tasks)
        );
    });

    it('should toggle task done status and save to localStorage', () => {
        service.addTask('Task to toggle');
        const task = service.getTasks()[0];

        service.toggleTaskDone(task.id);

        const updatedTask = service.getTasks().find((t) => t.id === task.id);
        expect(updatedTask?.isDone).toBe(true);
    });

    it('should delete a task and save to localStorage', () => {
        service.addTask('Task to delete');
        const task = service.getTasks()[0];

        service.deleteTask(task.id);

        expect(service.getTasks().length).toBe(0);
    });
});
