import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

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
        private router: Router) { }

    /**
     * Authentication by facebook account.
     */
    tryFacebookLogin() {
        this.authService.doFacebookLogin()
            .then(res => {
                this.router.navigate(['/home']);
            }, err => {
                console.log(err);
            });
    }
}
