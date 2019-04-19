import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LoginRegisterPage } from './login-register.page';
import { LoginPageModule } from '../tabs/login/login.module';
import { RegisterPageModule } from '../tabs/register/register.module';
import { UserDoesNotExistPopover } from './components/popover/user-does-not-exist/user-does-not-exist.popover';
import { UserAlreadyExistPopover } from './components/popover/user-already-exist/user-already-exist.popover';


const routes: Routes = [
    {
        path: '',
        component: LoginRegisterPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageModule,
        RegisterPageModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginRegisterPage,
        UserDoesNotExistPopover,
        UserAlreadyExistPopover
    ],
    entryComponents: [
        UserDoesNotExistPopover,
        UserAlreadyExistPopover
    ]
})
export class LoginRegisterPageModule { }
