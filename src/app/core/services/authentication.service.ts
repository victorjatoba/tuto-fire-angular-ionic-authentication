import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../../shared/model/user.model';
import { UserFactory } from './../../shared/model/user.factory';
import { UserType } from './../../shared/const/user-type.enum';
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

    // State of the authentication.
    authState: any = null;

    // Session User subject
    private currentUserSubject: BehaviorSubject<User>;

    constructor(public angularFireAuth: AngularFireAuth,
        private http: HttpClient) {

        this.initValues();
    }

    /**
     * Init the local attributes.
     */
    private initValues() {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

        this.angularFireAuth.authState.subscribe((auth) => {
            this.authState = auth;
        });
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Apply login by Google account
     */
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return new Promise<any>((resolve, reject) => {
            this.socialSignIn(provider)
                .then(user => {
                    const newUser = UserFactory.createUser(user, UserType.GOOGLE);
                    this.registerUserOnLocalStorage(newUser);
                    resolve(newUser);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Apply login by facebook account
     */
    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return new Promise<any>((resolve, reject) => {
            this.socialSignIn(provider)
                .then(user => {
                    const newUser = UserFactory.createUser(user, UserType.FACEBOOK);
                    this.registerUserOnLocalStorage(newUser);
                    resolve(newUser);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Apply login by twitter account
     */
    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return new Promise<any>((resolve, reject) => {
            this.socialSignIn(provider)
                .then(user => {
                    const newUser = UserFactory.createUser(user, UserType.TWITTER);
                    this.registerUserOnLocalStorage(newUser);
                    resolve(newUser);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Apply sign in by social accounts.
     *
     * @param provider Firebase AuthProvider object
     */
    private socialSignIn(provider) {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth.auth.signInWithPopup(provider)
                .then((credential) => {
                    this.authState = credential.user;
                    const userProfileMoreInfo = credential.additionalUserInfo.profile;
                    console.log(userProfileMoreInfo);
                    resolve(userProfileMoreInfo);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Register user on localStorage.
     *
     * @param newUser The user to be register.
     */
    private registerUserOnLocalStorage(newUser: User) {
        this.currentUserSubject.next(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    }

    /**
     * Returns true if user is logged in
     */
    get authenticated(): boolean {
        return this.authState !== null;
    }

    // Returns current user data
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }

    // Returns
    get currentUserObservable(): any {
        return this.angularFireAuth.authState;
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    /**
     * Apply user Logout from Firebase.
     */
    signOut(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth.auth.signOut()
                .then(val => {
                    resolve(val);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}
