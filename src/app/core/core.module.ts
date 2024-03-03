import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
})
export class CoreModule {}
