import { FieldValidationUtil } from './../../../shared/util/field-validation.util';
import { Output, EventEmitter } from '@angular/core';

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
}
