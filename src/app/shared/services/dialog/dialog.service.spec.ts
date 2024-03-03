import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
    let service: DialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [],
        });

        service = TestBed.inject(DialogService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('getInstance should...', () => {
        expect(service).toBeTruthy();
    });
});
