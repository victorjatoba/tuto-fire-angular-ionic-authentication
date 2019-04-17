import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { LoginPageModule } from '../core/pages/login/login.module';
import { LoginRegisterPageModule } from '../core/pages/login-register/login-register.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginRegisterPageModule
    ],
})
export class SharedModule { }
