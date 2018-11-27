import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../dao/user.dao';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage {
    collection: AngularFirestoreCollection<User>;
    newUser: User = {
        first: '',
        last: '',
        born: null
    };

    constructor(private router: Router, db: AngularFirestore) {
        this.collection = db.collection<User>('users');
    }

    save() {
        this.collection.add(this.newUser)
            .then(val => {
                this.router.navigate(['/']);

            });
    }

}
