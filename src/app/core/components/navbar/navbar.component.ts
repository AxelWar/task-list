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
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor(public dialog: MatDialog) {}

    openDialog() {
        this.dialog.open(DialogNavbarComponent, {
            width: '400px',
            height: '300px',
        });
    }
}

@Component({
    selector: 'app-dialog-navbar',
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
export class DialogNavbarComponent {}
