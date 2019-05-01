import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './../../shared/model/user.model';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterUtil } from '../../shared/util/router.util';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    users: Observable<User[]>;
    collection: AngularFirestoreCollection<User>;

    constructor(db: AngularFirestore,
        private service: AuthService,
        private router: Router) {
        this.collection = db.collection<User>('users');
        this.users = this.collection.valueChanges();
    }

    /**
     * TODO
     */
    edit() { }

    /**
     * TODO
     */
    delete() { }

    logout() {
        this.service.signOut()
        .then(v => {
            console.log(v);
            RouterUtil.goToLoginPage(this.router);
        });
    }
}
