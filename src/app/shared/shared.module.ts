import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutMeComponent } from './components/about-me/about-me.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        PaginationComponent,
        ConfirmationModalComponent,
        LoadingComponent,
        AboutMeComponent,
        PageNotFoundComponent,
    ],
    exports: [
        PaginationComponent,
        ConfirmationModalComponent,
        LoadingComponent,
        AboutMeComponent,
        PageNotFoundComponent,
    ],
})
export class SharedModule {}
