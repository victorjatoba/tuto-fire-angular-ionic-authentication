import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { PersistenceService } from '../../services/persistence.service';
import { Page } from '../../../shared/const/page.enum';
import { User } from '../../../shared/model/user.model';
import { LoadingLocalController } from '../../../shared/components/loading/loading-local.controller';
import { FirebaseErrorCode } from '../../const/firebase-error-code.const';
import { PopoverLocalController } from '../../../shared/components/notification/popover-local.controller';
import { LoginRegisterTab } from '../../const/login-register-tab.const';
import { NotificationReturn } from '../../../shared/components/notification/notification-return';
import { UserDoesNotExistPopover } from './components/popover/user-does-not-exist/user-does-not-exist.popover';
import { NotificationReturnType } from '../../../shared/components/notification/notification-return-type.enum';
import { PageUrl } from '../../../shared/util/page-url.enum';
import { RouterUtil } from '../../../shared/util/router.util';
import { UserAlreadyExistPopover } from './components/popover/user-already-exist/user-already-exist.popover';
import { Credentials } from '../../models/credentials.model';

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
        id: undefined,
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

    onLoginByEmail() {
    }

    /**
     * Show an error popover to redirect user to correctly page.
     */
    showErrorPopover() {
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

    onSupport() {

    }

}
