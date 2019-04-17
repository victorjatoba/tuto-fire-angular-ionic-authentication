import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LoginRegisterPage } from './login-register.page';
import { LoginPageModule } from '../tabs/login/login.module';
import { RegisterPageModule } from '../tabs/register/register.module';


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
        LoginRegisterPage
    ]
})
export class LoginRegisterPageModule { }
