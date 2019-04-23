import { Component, Input } from '@angular/core';
import { CredentialPagesTemplate } from '../credential-pages.template';
import { Credentials } from '../../../models/credentials.model';
import { AuthService } from '../../../../core/services/authentication.service';
import { RouterUtil } from '../../../../shared/util/router.util';
import { PageUrl } from '../../../../shared/util/page-url.enum';
import { LoadingLocalController } from '../../../../shared/components/loading/loading-local.controller';
import { Router } from '@angular/router';
import { PopoverLocalController } from '../../../../shared/components/notification/popover-local.controller';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./../tabs.scss'],
})
export class LoginPage extends CredentialPagesTemplate {

    /**
    * Login properties
    */
    userCredentials: Credentials = {
        email: '',
        password: ''
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
        this.onLoginByEmail();
    }

    onLoginByEmail() {
        this.loading.show();
        this.authService.loginByEmail(this.userCredentials.email, this.userCredentials.password)
            .then(user => {
                RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
                this.loading.dismiss();
            }, error => {
                console.log(error);
                this.loading.dismiss();
                this.showRegisterError('Authentication error', error.message);
            });
    }

    /**
     * Go Facebook Authentication.
     */
    onFacebook() {
        this.authService.facebookLogin()
            .then(userFacebook => {
                RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
                this.loading.dismiss();
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
                RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
                this.loading.dismiss();
            }, error => {
                console.log(error);
                this.showAppropriateAuthError(error);
            });
    }

}
