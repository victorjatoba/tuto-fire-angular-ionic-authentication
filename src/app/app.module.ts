import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent
    ],

    entryComponents: [
        // LoginPage
    ],

    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        FormsModule,
        CoreModule,
        HttpClientModule,
        AppRoutingModule
    ],

    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        /**
         * To remove Firestore (5.8.0): timestampsInSnapshots error console.
         * @see https://github.com/angular/angularfire2/issues/1993
         */
        { provide: FirestoreSettingsToken, useValue: {} },
        AngularFireDatabase,
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
