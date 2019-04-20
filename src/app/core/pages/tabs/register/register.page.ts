import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../shared/model/user.model';
import { CredentialPagesTemplate } from '../credential-pages.template';
import { PopoverLocalController } from '../../../../shared/components/notification/popover-local.controller';

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

    @Input() user: User;

    /**
     * @override
     */
    onSubmit() {
        event.stopPropagation();
        this.submit.emit(JSON.stringify(this.user));
    }

}
