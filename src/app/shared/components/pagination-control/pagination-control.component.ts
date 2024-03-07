import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownOption } from '../../models/dropdown-options.interface';

@Component({
    selector: 'app-pagination-control',
    templateUrl: './pagination-control.component.html',
    styleUrls: ['./pagination-control.component.scss'],
})
export class PaginationControlComponent {
    @Input() currentPage = 1;
    @Input() pageSize = 5;
    @Input() totalPages = 1;
    @Input() totalResults = 0;
    @Output() pageChanged = new EventEmitter<{ page: number; size: number }>();
    @Output() pageSizeChange = new EventEmitter<number>();
    defaultOptions: DropdownOption[] = [
        { value: '5' },
        { value: '10' },
        { value: '15' },
    ];

    onPrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.emitPageChanged();
        }
    }

    onNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.emitPageChanged();
        }
    }

    onPageSizeChange(event: string) {
        const newSize = Number(event);
        this.pageSizeChange.emit(newSize);
    }

    private emitPageChanged() {
        this.pageChanged.emit({ page: this.currentPage, size: this.pageSize });
    }
}
