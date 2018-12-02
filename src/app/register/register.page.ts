import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { PersistenceService } from '../services/persistence.service';
import { LoadingController } from '@ionic/angular';

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
     * Authentication by facebook account.
     */
    tryFacebookLogin() {

        this.authService.doFacebookLogin()
            .then(userFacebook => {
                console.log(userFacebook);

                this.showLoadingWithOptions();
                this.persistence.save(userFacebook)
                    .then(val => {
                        this.router.navigate(['/home']);
                        this.hideLoading();

                    }, err => {
                        this.hideLoading();
                    });
            }, err => {
                console.log(err);
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
