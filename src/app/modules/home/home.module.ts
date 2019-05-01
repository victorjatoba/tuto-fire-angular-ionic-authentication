import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthGuard } from '../../core/guards/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularFireModule.initializeApp(environment.firebaseConfig), // imports firebase/app needed for everything
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        // AngularFireStorageModule, // imports firebase/storage only needed for storage features
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomePage
    ],
    providers: [
        AngularFireDatabase,
    ]
})
export class HomePageModule { }
