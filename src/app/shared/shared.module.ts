import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PaginationControlComponent } from './components/pagination-control/pagination-control.component';
import { DialogService } from './services/dialog/dialog.service';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ClickOutsideDirective } from './Directives/click-outside.directive';

@NgModule({
    imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
    declarations: [
        PaginationControlComponent,
        ConfirmDialogComponent,
        LoadingComponent,
        CheckboxComponent,
        DropdownComponent,
        ClickOutsideDirective,
    ],
    exports: [
        PaginationControlComponent,
        ConfirmDialogComponent,
        LoadingComponent,
        CheckboxComponent,
        DropdownComponent,
        ClickOutsideDirective,
    ],
    providers: [DialogService],
})
export class SharedModule {}
