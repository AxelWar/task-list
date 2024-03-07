import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    Renderer2,
} from '@angular/core';
import { DropdownOption } from '../../models/dropdown-options.interface';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
    @Input() options: DropdownOption[] = [{ value: '' }];
    @Input() title: string = '';
    @Input() showTitle = false;
    @Output() currentValueChange = new EventEmitter();

    public currentValue!: string;
    public dropdownOpen: boolean = false;
    public currentIndex = -1;

    constructor(
        private elem: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        if (this.options && this.options.length > 0) {
            this.currentValue = this.options[0].value;
        }
    }

    get dropdownElement(): Element {
        return this.elem.nativeElement.querySelector('.dropdown-list');
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvents(event: KeyboardEvent) {
        if (this.dropdownOpen) {
            event.preventDefault();
        } else {
            return;
        }
        if (event.code === 'ArrowUp') {
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            } else if (this.currentIndex > 0) {
                this.currentIndex--;
            }
            this.elem.nativeElement
                .querySelectorAll('li')
                .item(this.currentIndex)
                .focus();
        } else if (event.code === 'ArrowDown') {
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            } else if (this.currentIndex < this.options.length - 1) {
                this.currentIndex++;
            }
            this.elem.nativeElement
                .querySelectorAll('li')
                .item(this.currentIndex)
                .focus();
        } else if (
            (event.code === 'Enter' || event.code === 'NumpadEnter') &&
            this.currentIndex >= 0
        ) {
            this.selectByIndex(this.currentIndex);
        } else if (event.code === 'Escape') {
            this.closeDropdown();
        }
    }

    closeDropdown(): void {
        this.renderer.setAttribute(
            this.dropdownElement,
            'aria-expanded',
            'false'
        );
        this.currentIndex = -1;
        this.dropdownOpen = false;
    }

    selectByIndex(index: number): void {
        this.select(this.options[index].value);
    }

    select(value: string): void {
        this.currentValue = value;
        this.closeDropdown();
        this.currentValueChange.emit(this.currentValue);
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
        this.renderer.setAttribute(
            this.dropdownElement,
            'aria-expanded',
            this.dropdownOpen ? 'true' : 'false'
        );
    }
}
