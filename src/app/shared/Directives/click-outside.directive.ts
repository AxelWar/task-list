import {
    Directive,
    ElementRef,
    Output,
    EventEmitter,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
    constructor(private elementRef: ElementRef) {}

    @Output() appClickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        const clickedInside =
            this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.appClickOutside.emit(event);
        }
    }
}
