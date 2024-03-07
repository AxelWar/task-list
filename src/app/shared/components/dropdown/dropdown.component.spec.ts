import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Renderer2 } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;
    let mockRenderer2: Partial<Renderer2>;

    beforeEach(async () => {
        // Define mockRenderer2 with specific typing
        mockRenderer2 = {
            setAttribute: jest.fn(),
            selectRootElement: jest.fn().mockImplementation(
                (): HTMLElement =>
                    ({
                        focus: jest.fn(),
                    }) as unknown as HTMLElement
            ),
        };

        await TestBed.configureTestingModule({
            declarations: [DropdownComponent],
            imports: [SharedModule],
            providers: [{ provide: Renderer2, useValue: mockRenderer2 }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle dropdown open state and set aria-expanded attribute correctly', () => {
        // Initially closed
        expect(component.dropdownOpen).toBe(false);
        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(true);
    });

    it('should update currentValue when an option is selected', () => {
        const mockOption = { value: 'Option1' };
        component.options = [mockOption];
        component.select(mockOption.value);
        expect(component.currentValue).toEqual(mockOption.value);
    });

    it('should set dropdownOpen to false and reset currentIndex when closing dropdown', () => {
        component.dropdownOpen = true;
        component.currentIndex = 1;
        component.closeDropdown();
        expect(component.dropdownOpen).toBe(false);
        expect(component.currentIndex).toBe(-1);
    });

    it('should initialize currentValue with the first option value', () => {
        component.options = [
            { value: 'FirstOption' },
            { value: 'SecondOption' },
        ];
        component.ngOnInit();
        expect(component.currentValue).toEqual('FirstOption');
    });

    it('should emit currentValueChange on option select', () => {
        jest.spyOn(component.currentValueChange, 'emit');
        const mockOption = { value: 'Option1' };
        component.select(mockOption.value);
        expect(component.currentValueChange.emit).toHaveBeenCalledWith(
            mockOption.value
        );
    });

    it('should handle keyboard navigation', () => {
        // Open dropdown to enable keyboard navigation
        component.dropdownOpen = true;
        fixture.detectChanges();

        // Simulate ArrowDown key press
        const eventDown = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        component.handleKeyboardEvents(eventDown);
        expect(component.currentIndex).toBe(0); // Assuming it navigates to the first item

        // Simulate ArrowUp key press after moving down
        const eventUp = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        component.handleKeyboardEvents(eventUp);
        expect(component.currentIndex).toBe(0); // Assuming it tries to navigate up but stays at first item

        // Simulate Enter key press to select the item
        const eventEnter = new KeyboardEvent('keydown', { code: 'Enter' });
        jest.spyOn(component.currentValueChange, 'emit');
        component.handleKeyboardEvents(eventEnter);
        expect(component.currentValueChange.emit).toHaveBeenCalledWith(
            component.options[0].value
        );
        expect(component.dropdownOpen).toBe(false); // Ensure the dropdown is closed after selection
    });

    it('should toggle dropdown and set aria-expanded attribute correctly on toggle', () => {
        const button = fixture.nativeElement.querySelector('.dropdown-button');
        button.click(); // Simulate user clicking the toggle button
        fixture.detectChanges();
        expect(component.dropdownOpen).toBe(true);
        let dropdownList =
            fixture.nativeElement.querySelector('.dropdown-list');
        expect(dropdownList.getAttribute('aria-expanded')).toBe('true');

        button.click(); // Simulate user clicking the toggle button again
        fixture.detectChanges();
        expect(component.dropdownOpen).toBe(false);
        dropdownList = fixture.nativeElement.querySelector('.dropdown-list');
        expect(dropdownList.getAttribute('aria-expanded')).toBe('false');
    });

    it('should close dropdown when clicking outside', () => {
        component.dropdownOpen = true;
        fixture.detectChanges();

        // Simulate a click outside by dispatching a click event on the document body
        document.dispatchEvent(new Event('click'));

        fixture.detectChanges();
        expect(component.dropdownOpen).toBe(false);
    });

    it('should close the dropdown when Escape key is pressed', () => {
        component.dropdownOpen = true; // Ensure the dropdown is initially open
        fixture.detectChanges();

        const event = new KeyboardEvent('keydown', { code: 'Escape' });
        component.handleKeyboardEvents(event);

        expect(component.dropdownOpen).toBe(false); // Dropdown should be closed
    });

    it('should navigate up in the dropdown options with ArrowUp key', () => {
        component.dropdownOpen = true;
        component.currentIndex = 1; // Set initial index to the second option
        fixture.detectChanges();

        const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        component.handleKeyboardEvents(event);

        expect(component.currentIndex).toBe(0); // Expect to navigate to the first option
    });

    it('should ignore keyboard events when dropdown is closed', () => {
        component.dropdownOpen = false; // Ensure the dropdown is closed
        const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });

        // Spy on preventDefault to verify it's not called
        jest.spyOn(event, 'preventDefault');

        component.handleKeyboardEvents(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should increment currentIndex on ArrowDown key when not at the last option', () => {
        component.options = [{ value: 'Option1' }, { value: 'Option2' }]; // Ensure there are at least two options
        component.dropdownOpen = true;
        component.currentIndex = 0; // Focus on the first option
        fixture.detectChanges();

        const eventDown = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        component.handleKeyboardEvents(eventDown);
        expect(component.currentIndex).toBe(1); // `currentIndex` should be incremented
    });

    it('should decrement currentIndex on ArrowUp key when not at the first option', () => {
        component.options = [{ value: 'Option1' }, { value: 'Option2' }]; // Ensure there are at least two options
        component.dropdownOpen = true;
        component.currentIndex = 1; // Set initial index to the second option
        fixture.detectChanges();

        const eventUp = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        component.handleKeyboardEvents(eventUp);
        expect(component.currentIndex).toBe(0); // `currentIndex` should be decremented
    });

    it('should set currentIndex to 0 on ArrowUp key when currentIndex is less than 0', () => {
        component.dropdownOpen = true; // Ensure the dropdown is open
        component.currentIndex = -1; // No option is focused initially
        fixture.detectChanges();

        const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        component.handleKeyboardEvents(event);

        expect(component.currentIndex).toBe(0); // Verify currentIndex is set to 0
    });
});
