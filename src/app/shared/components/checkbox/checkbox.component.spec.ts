import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { SharedModule } from '../../shared.module';

describe('CheckboxComponent', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckboxComponent],
            imports: [SharedModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle isChecked input correctly', () => {
        expect(component.isChecked).toBe(false); // Default value

        component.isChecked = true;
        fixture.detectChanges();

        expect(component.isChecked).toBe(true); // Input value updated
    });

    it('should emit toggle event with correct value when clicked', () => {
        const toggleSpy = jest.spyOn(component.toggle, 'emit');

        component.onClick();

        expect(toggleSpy).toHaveBeenCalledWith(true); // Should emit true on first click

        component.onClick();

        expect(toggleSpy).toHaveBeenCalledWith(false); // Should emit false on second click
    });
});
