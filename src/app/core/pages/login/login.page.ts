import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { RouterUtil } from '../../../shared/util/router.util';
import { PopoverLocalController } from '../../../shared/components/notification/popover-local.controller';
import { PageUrl } from '../../../shared/util/page-url.enum';
import { CredentialPagesTemplate } from '../credential-pages.template';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends CredentialPagesTemplate implements OnInit {

    /**
    * Login properties
    */
    userName: string;
    password: string;

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
        public popoverController: PopoverLocalController) {
        super(router, popoverController);
    }

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
                // console.log(err);
                this.showErrorPopover();

            });
    }

    onFacebookLogin() {
        this.authService.facebookLogin()
            .then(userFacebook => {
                RouterUtil.goToPage('home', this.router);
            }, error => {
                // console.log(error);
                if (error.code === 'auth/account-exists-with-different-credential') {
                    this.showAccountAlreadyExistPopover(error.message, error.email);
                } else {
                    this.showErrorPopover();

                }
            });
    }

}
