import { FormGroup } from '@angular/forms';

/**
 * This class contains methods that validate the data entered by end-users
 * in fields such as inputs, password fields, etc.
 */
export class FieldValidationUtil {

    /**
     * This expression matches strings with characters on a U.S. keyboard
     * @param e event object that provides the typed string
     */
    static validateInputWithUSCharacters(e) {
        const elementValue = e.srcElement.value;
        if (elementValue) {
            const regex = /^[\x00-\x7F]*$/;
            const tempValue = elementValue.substring(0, elementValue.length - 1);
            if (!regex.test(elementValue)) {
                e.srcElement.value = tempValue;
            }
        }
    }

    /**
    * This expression matches strings with valid IPV4 formats
    * @param e event object that provides the typed string
    */
    static validateIPV4Address(e): boolean {
        const elementValue = e.srcElement.value;
        if (elementValue) {
            // tslint:disable-next-line:max-line-length
            const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (regex.test(elementValue)) {
                return true;
            }
            return false;
        }
    }

    /**
     * It validates if two fields have the same value
     * @param controlName first field (control)
     * @param matchingControlName second field (confirmation)
     */
    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

}
