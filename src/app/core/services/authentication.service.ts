import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../../shared/model/user.model';
import { UserFactory } from './../../shared/model/user.factory';

/**
 * @name authentication-service.service
 *
 * @description
 * Business rules and methods to take authentication
 * with a lot of kind of accounts.
 *
 * FACEBOOK, GOOGLE, Email, etc.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(public angularFireAuth: AngularFireAuth,
        private http: HttpClient) {

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    facebookLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.FacebookAuthProvider();
            this.angularFireAuth.auth
                .signInWithPopup(provider)
                .then((userInfo: any) => {
                    const userProfile = userInfo.additionalUserInfo.profile;

                    console.log(userProfile);

                    const newUser = UserFactory.createUser(userProfile);

                    this.registerUserOnLocalStorage(newUser);
                    resolve(newUser);
                }, err => {
                    console.log(err);
                    reject(err);
                });
        });
    }


    private registerUserOnLocalStorage(newUser: User) {
        this.currentUserSubject.next(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
}
