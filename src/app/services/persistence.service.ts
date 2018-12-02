import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { User } from '../dao/user.dao';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    collection: AngularFirestoreCollection<User>;

    constructor(private router: Router, db: AngularFirestore) {
        this.collection = db.collection<User>('users');
    }

    /**
     * Register new user in the database.
     *
     * @param user Object containing the user information.
     */
    save(user: User): Promise<DocumentReference> {
        return this.collection.add(user);
    }
}
