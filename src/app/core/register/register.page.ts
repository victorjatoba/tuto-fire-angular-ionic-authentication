import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/authentication.service';
import { PersistenceService } from '../services/persistence.service';
import { Page } from '../../shared/const/page.enum';
import { User } from '../../shared/model/user.model';

/**
 * @name register.page
 *
 * @description
 * Page that contains the register options.
 */
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

    constructor(private authService: AuthService,
        private router: Router,
        private persistence: PersistenceService,
        private loading: LoadingController) { }

    /**
     * Go Facebook Authentication.
     */
    onFacebookLogin() {
        this.authService.facebookLogin()
            .then(userFacebook => {
                this.persistUserIfNecessary(userFacebook);
            }, err => {
                console.log(err);
            });
    }

    /**
     * Go Google Authentication.
     */
    onGoogleLogin() {
        this.authService.googleLogin()
            .then(user => {
                this.persistUserIfNecessary(user);
            }, err => {
                console.log(err);
            });
    }

    private persistUserIfNecessary(user) {
        if (!this.isUserExistOnDB(user)) {
            this.persistUserOnDB(user);
        } else {
            this.router.navigate([Page.HOME]);
        }
    }

    /**
     * Verify if user exists on DB.
     *
     * @param user The user to be verified.
     */
    isUserExistOnDB(user: User) {
        return false;
        // TODO
    }

    /**
     * Persist the user on Firebase DB.
     *
     * @param user
     */
    private persistUserOnDB(user: User) {
        console.log(user);
        this.showLoadingWithOptions();
        this.persistence.save(user)
            .then(val => {
                this.router.navigate([Page.HOME]);
                this.hideLoading();
            }, err => {
                this.hideLoading();
            });
    }

    async showLoading() {
        const loading = await this.loading.create({
            message: 'Please wait...',
            duration: 2000
        });
        return await loading.present();
    }

    async showLoadingWithOptions() {
        const loading = await this.loading.create({
            spinner: null,
            duration: 5000,
            message: 'Registering...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }

    hideLoading() {
        this.loading.dismiss();
    }
}
