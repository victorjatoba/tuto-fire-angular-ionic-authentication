import { Router } from '@angular/router';
import { FieldValidationUtil } from './../../../shared/util/field-validation.util';
import { RouterUtil } from '../../../shared/util/router.util';
import { PopoverLocalController } from '../../../shared/components/notification/popover-local.controller';
import { NotificationReturnType } from '../../../shared/components/notification/notification-return-type.enum';
import { UserDoesNotExistPopover } from './login/components/popover/user-does-not-exist/user-does-not-exist.popover';
import { NotificationReturn } from '../../../shared/components/notification/notification-return';
import { PageUrl } from '../../../shared/util/page-url.enum';
import { UserAlreadyExistPopover } from './login/components/popover/user-already-exist/user-already-exist.popover';
import { Credentials } from '../../models/credentials.model';
import { Input } from '@angular/core';

/**
 * @name credential-pages.template
 *
 * @description
 * Template to be used by pages that contains
 * credentials actions and verification.
 */
export abstract class CredentialPagesTemplate {

    /**
    * Login properties
    */
    @Input() userCredentials: Credentials;

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
        public popoverController: PopoverLocalController) { }


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
