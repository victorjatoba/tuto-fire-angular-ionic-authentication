import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

import { FormsModule } from '@angular/forms';
import { LoginPage } from './pages/login/login.page';
import { LoginService } from './services/login.service';
import { AuthGuard } from './services/auth.guard';
import { SecurityModule } from 'app/modules/security/security.module';
import { NetworkSecurityService } from 'app/modules/security/pages/parental-control/pages/networks/services/network.service';
import { LoginRegisterPage } from './pages/login-register/login-register.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        FormsModule,
        CoreRoutingModule,
        SecurityModule
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
        LoginService,
        AuthGuard,
        NetworkSecurityService
    ],
})
export class CoreModule { }
