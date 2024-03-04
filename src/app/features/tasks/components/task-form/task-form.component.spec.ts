import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { TasksModule } from '../../tasks.module';
import { FormBuilder } from '@angular/forms';

describe('TaskFormComponent', () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskFormComponent],
            imports: [TasksModule],
            providers: [FormBuilder],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.taskForm.valid).toBeFalsy();
    });

    it('title field validity', () => {
        const title = component.taskForm.controls['title'];
        expect(title.valid).toBeFalsy();

        // Required field
        title.setValue('');
        expect(title.hasError('required')).toBeTruthy();

        // Min length validation
        title.setValue('ab');
        expect(title.hasError('minlength')).toBeTruthy();

        // Max length validation
        title.setValue('a'.repeat(81));
        expect(title.hasError('maxlength')).toBeTruthy();

        // Valid case
        title.setValue('Valid title');
        expect(title.valid).toBeTruthy();
    });

    it('should call addTask on valid form submission and reset the form', () => {
        expect(component.taskForm.valid).toBeFalsy();
        component.taskForm.controls['title'].setValue('Test Task');
        expect(component.taskForm.valid).toBeTruthy();

        component.onSubmit();

        expect(component.taskForm.controls.title.value).toBe(null); // Form should be reset
    });
});
