import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { User } from '../dao/user.dao';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    users: Observable<any[]>;
    collection: AngularFirestoreCollection<User>;

    constructor(db: AngularFirestore) {
        this.collection = db.collection<User>('users');
        this.users = this.collection.valueChanges()
    }

}
