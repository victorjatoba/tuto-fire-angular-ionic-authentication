import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { UserDoesNotExistPopover } from '../core/pages/login/components/popover/user-does-not-exist.popover';
import { LoginPageModule } from '../core/pages/login/login.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageModule
    ],

    declarations: [
        // UserDoesNotExistPopover
    ],

    entryComponents: [
        // UserDoesNotExistPopover
    ],

    providers: [
    ],
})
export class SharedModule { }
