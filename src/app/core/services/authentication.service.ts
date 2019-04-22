import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../../shared/model/user.model';
import { UserFactory } from './../../shared/model/user.factory';
import { UserType } from './../../shared/const/user-type.enum';
import { Credentials } from '../models/credentials.model';
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
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));

        this.angularFireAuth.authState
            .subscribe(user => {
                if (user) {
                    const newUser = UserFactory.createUser(user, UserType.EMAIL_PASSWORD);
                    this.registerUserOnLocalStorage(newUser);
                } else {
                    localStorage.setItem('user', null);
                }
            });
    }

    /**
     * Apply login by Google account
     */
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return new Promise<any>((resolve, reject) => {
            this.socialSignIn(provider)
                .then(user => {
                    console.log(user);

                    const newUser = UserFactory.createUser(user, UserType.GOOGLE);
                    console.log(newUser);
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
     * Register user by email and password
     *
     * @param email the email chose by user.
     * @param password the password chose by user.
     */
    registerByEmail(email: string, password: string) {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth
                .auth
                .createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    this.sendEmailVerification()
                        .then(res => {
                            resolve(res);
                        }).catch(error => {
                            reject(error);
                        });
                }).catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Send email to user to verify the email.
     */
    private sendEmailVerification() {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth.auth.currentUser
                .sendEmailVerification()
                .then((res) => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });

        });
    }

    loginByEmail(email: string, password: string) {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth
                .auth
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user);
                    const loggedUser = UserFactory.createUser(user, UserType.EMAIL_PASSWORD);
                    console.log(loggedUser);
                    this.registerUserOnLocalStorage(loggedUser);

                    // this.authState = result.user;
                    // const userProfileMoreInfo = credential.additionalUserInfo.profile;
                    // console.log(userProfileMoreInfo);
                    resolve(loggedUser);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    async sendPasswordResetEmail(passwordResetEmail: string) {
        return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
    }

    /**
     * Register user on localStorage.
     *
     * @param newUser The user to be register.
     */
    private registerUserOnLocalStorage(newUser: User) {
        this.currentUserSubject.next(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    }

    /**
     * Remove the user to sinalize that doesn't exist
     * user logged.
     */
    private removeUserOnLocalStorage() {
        this.currentUserSubject.next(null);
        localStorage.removeItem('user');
    }

    /**
     * Apply user Logout from Firebase.
     */
    signOut(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth.auth.signOut()
                .then(val => {
                    this.removeUserOnLocalStorage();
                    resolve(val);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Verify if the user is logged in.
     */
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }

}
