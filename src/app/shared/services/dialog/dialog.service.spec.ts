import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { SharedModule } from '../../shared.module';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
    let service: DialogService;
    let matDialog: MatDialog;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            providers: [],
        });
        matDialog = TestBed.inject(MatDialog);
        service = TestBed.inject(DialogService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('getInstance should...', () => {
        expect(service).toBeTruthy();
    });

    it('should open a dialog with the correct data and component', () => {
        const openSpy = jest.spyOn(matDialog, 'open');

        const dialogData = { title: 'Confirm', message: 'Are you sure?' };
        service
            .openDialog(dialogData, ConfirmDialogComponent)
            .subscribe((result) => {
                expect(result).toBe(true);
            });

        expect(openSpy).toHaveBeenCalledWith(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
        });
    });
});
