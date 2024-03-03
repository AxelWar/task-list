/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
})
export class CheckboxComponent implements ControlValueAccessor {
    onChange: any = () => {
        console.log('onChange');
    };
    onTouch: any = () => {
        console.log('onTouch');
    };

    registerOnChange(fn: any): void {
        this.onChange = fn;
        console.log('registerOnChange');
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
        console.log('registerOnTouched');
    }

    constructor() {}

    checked: boolean = false;
    writeValue(checked: boolean) {
        this.checked = checked;
        console.log('writeValue');
    }

    onModelChange(e: boolean) {
        this.checked = e;
        console.log('onModelChange');
        this.onChange(e);
    }
}
