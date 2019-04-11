import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FieldValidationUtil } from './../../../shared/util/field-validation.util';
import { AuthService } from '../../services/authentication.service';
import { RouterUtil } from '../../../shared/util/router.util';
import { PopoverLocalController } from '../../../shared/notification/popover-local.controller';
import { NotificationReturnType } from '../../../shared/notification/notification-return-type.enum';
import { UserDoesNotExistPopover } from './components/popover/user-does-not-exist.popover';
import { NotificationReturn } from '../../../shared/notification/notification-return';
import { PageUrl } from '../../../shared/util/page-url.enum';

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
        private authService: AuthService,
        public router: Router,
        public loadingCtrl: LoadingController,
        private popoverController: PopoverLocalController) { }


    ngOnInit() {
    }

    /**
     * Method which performs the user login according to the data provided in the text inputs
     */
    async login() {
        // TODO
    }

    onGoogleLogin() {
        this.authService.googleLogin()
            .then(user => {
                RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
            }, err => {
                // tslint:disable-next-line:max-line-length
                console.log(err);
                this.showErrorPopover();

            });
    }

    /**
     * Show an error popover to redirect user to correctly page.
     */
    private showErrorPopover() {
        const popoverSubscription = this.popoverController.showPopover(UserDoesNotExistPopover, 'popover-content', null, null, false)
            .subscribe((data: NotificationReturn) => {
                popoverSubscription.unsubscribe();
                this.popoverController.dismiss();
                if (data.type === NotificationReturnType.SUCCESS) {
                    RouterUtil.goToPage(PageUrl.REGISTER, this.router);
                }
            }, error => {
                console.log(error);
                this.popoverController.dismiss();
            });
    }

    onFacebookLogin() {
        this.authService.facebookLogin()
            .then(userFacebook => {
                RouterUtil.goToPage('home', this.router);
            }, err => {
                console.log(err);
                this.showErrorPopover();
            });
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
