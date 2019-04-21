import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ErrorPopover } from './components/popover/error-popover/error.popover';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],

    declarations: [
        ErrorPopover
    ],

    entryComponents: [
        ErrorPopover
    ]
})
export class SharedModule { }
