import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { SharedModule } from '../../../shared/shared.module';
import { UserDoesNotExistPopover } from './components/popover/user-does-not-exist.popover';

const routes: Routes = [
    {
        path: '',
        component: LoginPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],

    declarations: [
        LoginPage,
        UserDoesNotExistPopover
    ],

    entryComponents: [
        UserDoesNotExistPopover
    ]
})
export class LoginPageModule { }
