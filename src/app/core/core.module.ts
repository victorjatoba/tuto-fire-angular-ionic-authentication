import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginRegisterPageModule } from './pages/login-register/login-register.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        FormsModule,
        CoreRoutingModule,
        LoginRegisterPageModule
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
