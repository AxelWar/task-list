import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AboutMeComponent, DialogAboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
    let component: AboutMeComponent;
    let fixture: ComponentFixture<AboutMeComponent>;
    let dialog: MatDialog;

    const mockDialog = {
        open: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AboutMeComponent],
            imports: [MatButtonModule, MatDialogModule],
            providers: [{ provide: MatDialog, useValue: mockDialog }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutMeComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the dialog with correct configuration', () => {
        component.openDialog();
        expect(dialog.open).toHaveBeenCalledWith(DialogAboutMeComponent, {
            width: '400px',
            height: '250px',
        });
    });
});
