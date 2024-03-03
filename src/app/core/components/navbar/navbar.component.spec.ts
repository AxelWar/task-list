import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent, DialogNavbarComponent } from './navbar.component';
import { FormsModule } from '@angular/forms';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let dialog: MatDialog;

    const mockDialog = {
        open: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [MatButtonModule, MatDialogModule, FormsModule],
            providers: [{ provide: MatDialog, useValue: mockDialog }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the dialog with correct configuration', () => {
        component.openDialog();
        expect(dialog.open).toHaveBeenCalledWith(DialogNavbarComponent, {
            width: '400px',
            height: '250px',
        });
    });
});
