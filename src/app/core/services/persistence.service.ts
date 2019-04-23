import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
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

    constructor(private db: AngularFirestore) {
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

    /**
     * Find the user by email.
     *
     * @param email the user email.
     */
    getUserByEmail(email: string) {
        return this.db.collection('users', ref => ref.where('email', '==', email)).valueChanges();
    }
}
