import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { UserDoesNotExistPopover } from './components/popover/user-does-not-exist/user-does-not-exist.popover';
import { UserAlreadyExistPopover } from './components/popover/user-already-exist/user-already-exist.popover';

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
        UserDoesNotExistPopover,
        UserAlreadyExistPopover
    ],

    entryComponents: [
        UserDoesNotExistPopover,
        UserAlreadyExistPopover
    ]
})
export class LoginPageModule { }
