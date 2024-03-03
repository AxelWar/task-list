import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
    @Input() isChecked: boolean = false;
    @Output() toggle = new EventEmitter<boolean>();

    onClick() {
        this.isChecked = !this.isChecked;
        this.toggle.emit(this.isChecked);
    }
}
