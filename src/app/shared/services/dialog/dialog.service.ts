import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogData } from '../../models/confirm-dialog-data.interface';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(private matDialog: MatDialog) {}

    openDialog<T>(
        data: ConfirmDialogData,
        component: ComponentType<T>
    ): Observable<boolean> {
        return this.matDialog
            .open(component, {
                data: data,
                disableClose: true,
            })
            .afterClosed();
    }
}
