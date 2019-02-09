import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './../../shared/model/user.model';

/**
 * @name persistence.service
 *
 * @description
 * Responsible to apply DB persistence methods.
 */
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
