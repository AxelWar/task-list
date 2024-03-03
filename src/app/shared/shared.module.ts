import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutMeComponent } from './components/about-me/about-me.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        PaginationComponent,
        ConfirmDialogComponent,
        LoadingComponent,
        AboutMeComponent,
        PageNotFoundComponent,
        CheckboxComponent,
    ],
    exports: [
        PaginationComponent,
        ConfirmDialogComponent,
        LoadingComponent,
        AboutMeComponent,
        PageNotFoundComponent,
        CheckboxComponent,
    ],
})
export class SharedModule {}
