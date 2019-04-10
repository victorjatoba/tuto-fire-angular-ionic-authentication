import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FieldValidationUtil } from './../../shared/util/field-validation.util';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    /**
    * Login properties
    */
    userName: string;
    password: string;

    /**
     * To show the password eye icon and content
     */
    passwordShown = false;

    /**
     * The type of the password input field
     */
    passwordType = 'password';

    /**
     * Login page constructor
     * @param navCtrl The controller to navigate to other pages
     * @param alertCtrl Controller to show alert popups in the screen
     * @param pageService Service to implement the page layout
     * @param loginService Service that contains API calls to login
     */
    constructor(
        public router: Router,
        public loadingCtrl: LoadingController,
        private route: ActivatedRoute) { }


    ngOnInit() {
    }

    /**
     * Method which performs the user login according to the data provided in the text inputs
     */
    async login() {
        // TODO
    }

    onGoogleLogin() {
    }

    onFacebookLogin() {
    }

    onSupport() {

    }

    onCreateAccount() {

    }

    /**
     * To enable the eye icon and show the password
     */
    passwordToggle() {
        if (this.passwordShown) {
            this.passwordShown = false;
            this.passwordType = 'password';
        } else {
            this.passwordShown = true;
            this.passwordType = '';
        }
    }

    /**
     * It will validate the input field to type only the valid characters
     * @param event typing event
     */
    getLoginInputText(event) {
        FieldValidationUtil.validateInputWithUSCharacters(event);
    }

}
