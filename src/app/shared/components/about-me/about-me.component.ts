import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
    constructor(public dialog: MatDialog) {}

    openDialog() {
        this.dialog.open(DialogAboutMeComponent, {
            width: '400px',
            height: '250px',
        });
    }
}

@Component({
    selector: 'app-dialog-about-me',
    templateUrl: 'dialog-about-me.html',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
    ],
})
export class DialogAboutMeComponent {}
