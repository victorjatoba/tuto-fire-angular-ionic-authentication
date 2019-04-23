import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../shared/model/user.model';
import { CredentialPagesTemplate } from '../credential-pages.template';
import { PopoverLocalController } from '../../../../shared/components/notification/popover-local.controller';
import { AuthService } from '../../../../core/services/authentication.service';
import { LoadingLocalController } from '../../../../shared/components/loading/loading-local.controller';
import { UserFactory } from '../../../../shared/model/user.factory';
import { UserType } from '../../../../shared/const/user-type.enum';
import { RouterUtil } from '../../../../shared/util/router.util';
import { PageUrl } from '../../../../shared/util/page-url.enum';
import { FirebaseErrorCode } from '../../../../shared/const/firebase-error-code.const';

/**
 * @name register.page
 *
 * @description
 * Page that contains the register options.
 */
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./../tabs.scss'],
})
export class RegisterPage extends CredentialPagesTemplate {

    user: User = {
        authService: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    constructor(
        private authService: AuthService,
        public loading: LoadingLocalController,
        public router: Router,
        public popoverController: PopoverLocalController) {
        super(loading, router, popoverController);
    }

    /**
     * @override
     */
    onSubmit() {
        this.onRegisterByEmail();
    }

    onRegisterByEmail() {
        this.loading.show();
        this.authService.registerByEmail(this.user.email, this.user.password)
            .then(val => {
                this.loading.dismiss();
                RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
            }, error => {
                console.log(error);
                this.loading.dismiss();
                this.showRegisterError('Authentication error', error.message);
            });

    }

    /**
     * Register user by facebook account if he doesn't exist on
     * DB and redirect to home-page.
     */
    onFacebook() {
        this.authService.facebookRegister()
            .then(user => {
                RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
            }, error => {
                this.showErrorOrRedirectToHome(error);
            });
    }

    private showErrorOrRedirectToHome(error: any) {
        if (error === FirebaseErrorCode.USER_ALREADY_EXIST_ON_DB) {
            RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
        } else {
            this.showAppropriateAuthError(error);
        }
    }

    /**
     * Register user by google account if he doesn't exist on
     * DB and redirect to home-page.
     */
    onGoogle() {
        this.authService.googleRegister()
            .then(user => {
                RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
            }, error => {
                this.showErrorOrRedirectToHome(error);
            });
    }

}
