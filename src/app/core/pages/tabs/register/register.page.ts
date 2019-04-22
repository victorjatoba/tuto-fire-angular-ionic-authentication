import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../shared/model/user.model';
import { CredentialPagesTemplate } from '../credential-pages.template';
import { PopoverLocalController } from '../../../../shared/components/notification/popover-local.controller';
import { AuthService } from '../../../../core/services/authentication.service';
import { LoadingLocalController } from '../../../../shared/components/loading/loading-local.controller';
import { PersistenceService } from '../../../../core/services/persistence.service';
import { UserFactory } from '../../../../shared/model/user.factory';
import { UserType } from '../../../../shared/const/user-type.enum';
import { RouterUtil } from '../../../../shared/util/router.util';
import { PageUrl } from '../../../../shared/util/page-url.enum';

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
        private persistence: PersistenceService,
        public loading: LoadingLocalController,
        public router: Router,
        public popoverController: PopoverLocalController) {
        super(loading, router, popoverController);
    }

    /**
     * @override
     */
    onSubmit() {
        event.stopPropagation();
        this.submit.emit(JSON.stringify(this.user));
    }

    onRegisterByEmail(userStringfy) {

        this.loading.show();
        this.user = UserFactory.createUser(JSON.parse(userStringfy), UserType.EMAIL_PASSWORD);
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

}
