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

    onSupport() {

    }

}
