import { Component } from '@angular/core';
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

    onSupport() {

    }

}
