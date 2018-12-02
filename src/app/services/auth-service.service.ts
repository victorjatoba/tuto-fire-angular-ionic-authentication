import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../dao/user.dao';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(public afAuth: AngularFireAuth,
        private http: HttpClient) {

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    doFacebookLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.FacebookAuthProvider();
            this.afAuth.auth
                .signInWithPopup(provider)
                .then((userInfo: any) => {
                    // console.log(userInfo);
                    const userProfile = userInfo.additionalUserInfo.profile;

                    const newUser: User = {
                        first: userProfile.first_name,
                        last: userProfile.last_name,
                        email: userProfile.email,
                        born: 0
                    };

                    this.currentUserSubject.next(newUser);
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    resolve(newUser);
                }, err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

}
