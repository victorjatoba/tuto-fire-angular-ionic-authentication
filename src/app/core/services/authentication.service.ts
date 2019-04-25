import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../../shared/model/user.model';
import { UserFactory } from './../../shared/model/user.factory';
import { UserType } from './../../shared/const/user-type.enum';
import { FirebaseErrorCode } from '../../shared/const/firebase-error-code.const';
import { PersistenceService } from './persistence.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

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
        public afs: AngularFirestore,
        private persistence: PersistenceService) {

        this.initValues();
    }

    /**
     * Init the local attributes.
     */
    private initValues() {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));

        // this.angularFireAuth.authState
        //     .subscribe(user => {
        //         if (user) {
        //             const newUser = UserFactory.createUser(user, UserType.EMAIL_PASSWORD);
        //             this.registerUserOnLocalStorage(newUser);
        //         } else {
        //             localStorage.setItem('user', null);
        //         }
        //     });
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
     * Register user by email and password
     *
     * @param email the email chose by user.
     * @param password the password chose by user.
     */
    registerByEmail(user) {
        return new Promise<any>((resolve, reject) => {
            this.registerUserIfDoesNotExist(user, UserType.EMAIL_PASSWORD)
                .then(v => {
                    resolve(v);
                }).catch(registerError => {
                    reject(registerError);
                });
        });
    }

    googleRegister() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.registerUserBySocialAccount(provider, UserType.GOOGLE);
    }

    facebookRegister() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.registerUserBySocialAccount(provider, UserType.FACEBOOK);
    }

    private registerUserBySocialAccount(provider, socialAccountType: UserType) {
        return new Promise<any>((resolve, reject) => {
            this.socialSignIn(provider)
                .then(user => {
                    this.registerUserIfDoesNotExist(user, socialAccountType)
                        .then(v => {
                            resolve(v);
                        }).catch(registerError => {
                            reject(registerError);
                        });

                }).catch(error => {
                    reject(error);
                });
        });
    }

    private registerUserIfDoesNotExist(user: any, accountType: UserType) {
        return new Promise<any>((resolve, reject) => {
            const getUserSubs = this.persistence.getUserByEmail(user.email)
                .subscribe(usersFound => {
                    getUserSubs.unsubscribe();

                    if (this.isUserIsAlreadyRegistered(usersFound)) {
                        const error = {
                            code: FirebaseErrorCode.USER_ALREADY_EXIST_ON_DB,
                            messageTitle: 'Email already in use',
                            message: 'Try to Login or use another account.'
                        };
                        reject(error);

                    } else {
                        const newUser = UserFactory.createUser(user, accountType);
                        this.persistUserOnDB(newUser)
                            .then(registered => {
                                this.registerUserOnLocalStorage(newUser);
                                if (accountType === UserType.EMAIL_PASSWORD) {
                                    this.sendEmailVerification();
                                }
                                resolve(registered);
                            }).catch(persistenceError => {
                                reject(persistenceError);

                            });
                    }
                }, error => {
                    getUserSubs.unsubscribe();
                    reject(error);
                });
        });
    }

    isUserIsAlreadyRegistered(usersFound) {
        return usersFound !== undefined && usersFound.length > 0;
    }

    /**
     * Persist the user on Firebase DB.
     *
     * @param user
     */
    private persistUserOnDB(user: User) {
        return new Promise<any>((resolve, reject) => {
            this.persistence.save(user)
                .then(val => {
                    resolve(val);

                }).catch(error => {
                    reject(error);
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
                    resolve(userProfileMoreInfo);
                })
                .catch(error => {
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
        console.log(email, password);

        return new Promise<any>((resolve, reject) => {
            this.angularFireAuth
                .auth
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    const loggedUser = UserFactory.createUser(user, UserType.EMAIL_PASSWORD);
                    this.registerUserOnLocalStorage(loggedUser);
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
