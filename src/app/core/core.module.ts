import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

import { FormsModule } from '@angular/forms';
import { LoginRegisterPage } from './pages/login-register/login-register.page';
import { LoginPageModule } from './pages/tabs/login/login.module';
import { AuthGuard } from './guards/auth-guard.service';
import { RegisterPageModule } from './pages/tabs/register/register.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        FormsModule,
        CoreRoutingModule,
        LoginPageModule,
        RegisterPageModule
    ],
    declarations: [
        LoginRegisterPage,
    ],
    exports: [
        IonicModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthGuard,
    ],
})
export class CoreModule { }
