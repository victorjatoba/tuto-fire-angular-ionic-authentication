import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { PersistenceService } from '../../services/persistence.service';
import { Page } from '../../../shared/const/page.enum';
import { User } from '../../../shared/model/user.model';
import { CredentialPagesTemplate } from '../credential-pages.template';
import { LoadingLocalController } from '../../../shared/components/loading/loading-local.controller';
import { FirebaseErrorCode } from '../../const/firebase-error-code.const';
import { PopoverLocalController } from '../../../shared/components/notification/popover-local.controller';
import { LoginRegisterTab } from '../../const/login-register-tab.const';

/**
 * @name register.page
 *
 * @description
 * Page that contains the register options.
 */
@Component({
    selector: 'app-login-register',
    templateUrl: './login-register.page.html',
    styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage extends CredentialPagesTemplate {

    /**
     * The tab choise by user.
     */
    tabSelected = LoginRegisterTab.LOGIN.value;

    /**
     * The available list of tabs. Need to be instantiable by page module.
     * @required
     */
    tabs = [
        LoginRegisterTab.LOGIN,
        LoginRegisterTab.REGISTER
    ];

    user: User = {
        id: undefined,
        authService: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    constructor(
        private authService: AuthService,
        private persistence: PersistenceService,
        private loading: LoadingLocalController,
        public router: Router,
        public popoverController: PopoverLocalController) {
        super(router, popoverController);
    }

    /**
     * Go Facebook Authentication.
     */
    onFacebook() {
        this.authService.facebookLogin()
            .then(userFacebook => {
                this.persistUserOnDB(userFacebook);
            }, error => {
                console.log(error);
                this.showAppropriateAuthError(error);
            });
    }

    /**
     * Go Google Authentication.
     */
    onGoogle() {
        this.authService.googleLogin()
            .then(user => {
                this.persistUserOnDB(user);
            }, error => {
                console.log(error);
                this.showAppropriateAuthError(error);
            });
    }

    private showAppropriateAuthError(error: any) {
        if (error.code === FirebaseErrorCode.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL) {
            this.showAccountAlreadyExistPopover(error.message, error.email);
        } else {
            this.showErrorPopover();
        }
    }

    /**
     * Persist the user on Firebase DB.
     *
     * @param user
     */
    private persistUserOnDB(user: User) {
        console.log(user);
        this.loading.showLoadingWithPersonalizedMessage('Registering...');
        this.persistence.save(user)
            .then(val => {
                this.router.navigate([Page.HOME]);
                this.loading.dismiss();
            }, err => {
                this.loading.dismiss();
                this.showErrorPopover();
            });
    }

    onRegisterByEmail() {

    }

}
