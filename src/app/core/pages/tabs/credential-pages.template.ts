import { FieldValidationUtil } from './../../../shared/util/field-validation.util';
import { Output, EventEmitter } from '@angular/core';
import { NotificationReturn } from '../../../shared/components/notification/notification-return';
import { ErrorPopover } from '../../../shared/components/popover/error-popover/error.popover';
import { PopoverLocalController } from '../../../shared/components/notification/popover-local.controller';
import { FirebaseErrorCode } from '../../../shared/const/firebase-error-code.const';
import { UserDoesNotExistPopover } from '../login-register/components/popover/user-does-not-exist/user-does-not-exist.popover';
import { NotificationReturnType } from '../../../shared/components/notification/notification-return-type.enum';
import { PageUrl } from '../../../shared/util/page-url.enum';
import { RouterUtil } from '../../../shared/util/router.util';
import { UserAlreadyExistPopover } from '../login-register/components/popover/user-already-exist/user-already-exist.popover';
import { LoadingLocalController } from '../../../shared/components/loading/loading-local.controller';
import { Router } from '@angular/router';

/**
 * @name credential-pages.template
 *
 * @description
 * Template to be used by pages that contains
 * credentials actions and verification.
 */
export abstract class CredentialPagesTemplate {

    /**
     * Return to the caller the new selected select value.
     */
    @Output() submit = new EventEmitter<any>();

    /**
     * To show the password eye icon and content
     */
    passwordShown = false;

    /**
     * The type of the password input field
     */
    passwordType = 'password';


    constructor(
        public loading: LoadingLocalController,
        public router: Router,
        public popoverController: PopoverLocalController) {

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

    /**
     * Called when click on 'Save' button.
     * Responsible to call service to update the page values.
     */
    abstract onSubmit();

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

    showAppropriateAuthError(error: any) {
        if (error.code === FirebaseErrorCode.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL) {
            this.showAccountAlreadyExistPopover(error.message, error.email);
        } else {
            this.showRegisterError('Error founded', error.message);
        }
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
}
