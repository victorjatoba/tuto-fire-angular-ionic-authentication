import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { UserDoesNotExistPopover } from '../core/login/components/popover/user-does-not-exist.popover';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],

    declarations: [
        UserDoesNotExistPopover
    ],
    entryComponents: [
        UserDoesNotExistPopover
    ],
    providers: [
    ],
})
export class SharedModule { }
