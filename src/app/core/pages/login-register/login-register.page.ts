import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { PersistenceService } from '../../services/persistence.service';
import { User } from '../../../shared/model/user.model';
import { LoadingLocalController } from '../../../shared/components/loading/loading-local.controller';
import { FirebaseErrorCode } from '../../../shared/const/firebase-error-code.const';
import { PopoverLocalController } from '../../../shared/components/notification/popover-local.controller';
import { LoginRegisterTab } from '../../const/login-register-tab.const';
import { NotificationReturn } from '../../../shared/components/notification/notification-return';
import { UserDoesNotExistPopover } from './components/popover/user-does-not-exist/user-does-not-exist.popover';
import { NotificationReturnType } from '../../../shared/components/notification/notification-return-type.enum';
import { PageUrl } from '../../../shared/util/page-url.enum';
import { RouterUtil } from '../../../shared/util/router.util';
import { UserAlreadyExistPopover } from './components/popover/user-already-exist/user-already-exist.popover';
import { Credentials } from '../../models/credentials.model';
import { ErrorPopover } from '../../../shared/components/popover/error-popover/error.popover';
import { UserFactory } from '../../../shared/model/user.factory';
import { UserType } from '../../../shared/const/user-type.enum';

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
export class LoginRegisterPage {

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
        authService: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    userCredentials: Credentials = {
        email: '',
        password: ''
    };

    constructor(
        private authService: AuthService,
        private persistence: PersistenceService,
        private loading: LoadingLocalController,
        public router: Router,
        public popoverController: PopoverLocalController) {
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
            this.showUserNotFoundErrorPopover();
        }
    }

    /**
     * Persist the user on Firebase DB.
     *
     * @param user
     */
    private persistUserOnDB(user: User) {
        this.loading.showLoadingWithPersonalizedMessage('Registering...');
        this.persistence.save(user)
            .then(val => {
                RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
                this.loading.dismiss();
            }, error => {
                console.log(error);
                this.loading.dismiss();
                this.showUserNotFoundErrorPopover();
            });
    }

    onRegisterByEmail(userStr) {

        this.loading.showLoading();
        this.user = UserFactory.createUser(JSON.parse(userStr), UserType.EMAIL_PASSWORD);
        this.authService.registerByEmail(this.user.email, this.user.password)
            .then(val => {
                this.loading.dismiss();
                this.persistUserOnDB(this.user);
            }, error => {
                console.log(error);
                this.loading.dismiss();
                this.showRegisterError('Authentication error', error.message);
            });

    }

    onLoginByEmail() {
    }

    /**
     * Show an error popover to redirect user to correctly page.
     */
    showUserNotFoundErrorPopover() {
        const popoverSubscription = this.popoverController.showPopover(UserDoesNotExistPopover, 'popover-content', null, null, false)
            .subscribe((data: NotificationReturn) => {
                popoverSubscription.unsubscribe();
                this.popoverController.dismiss();
                if (data.type === NotificationReturnType.SUCCESS) {
                    RouterUtil.goToPage(PageUrl.AUTHENTICATION, this.router);
                }
            }, error => {
                console.log(error);
                this.popoverController.dismiss();
            });
    }

    /**
     * Show an error popover to redirect user to correctly page.
     */
    showAccountAlreadyExistPopover(message, email) {
        const data = {
            message: message,
            email: email
        };

        const popoverSubscription = this.popoverController.showPopover(UserAlreadyExistPopover, 'popover-content', data, null, true)
            .subscribe((notificationReturn: NotificationReturn) => {
                popoverSubscription.unsubscribe();
                this.popoverController.dismiss();
            }, error => {
                console.log(error);
                this.popoverController.dismiss();
            });
    }

    /**
     * Show an error popover to redirect user to correctly page.
     */
    showRegisterError(title, message) {
        const data = {
            message: message,
            title: title
        };

        const popoverSubscription = this.popoverController.showPopover(ErrorPopover, 'popover-content', data, null, true)
            .subscribe((notificationReturn: NotificationReturn) => {
                popoverSubscription.unsubscribe();
                this.popoverController.dismiss();
            }, error => {
                console.log(error);
                this.popoverController.dismiss();
            });
    }

    onSupport() {

    }

}
