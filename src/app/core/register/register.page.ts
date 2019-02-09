import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/authentication.service';
import { PersistenceService } from '../services/persistence.service';

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
    onFacebookLogin() {

        this.authService.facebookLogin()
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

    onGoogleLogin() {
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
