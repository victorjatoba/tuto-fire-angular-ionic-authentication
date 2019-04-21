import { Component, Input } from '@angular/core';
import { CredentialPagesTemplate } from '../credential-pages.template';
import { Credentials } from '../../../models/credentials.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends CredentialPagesTemplate {

    /**
    * Login properties
    */
    @Input() userCredentials: Credentials;

    /**
     * @override
     */
    onSubmit() {
        event.stopPropagation();
        this.submit.emit(JSON.stringify(this.userCredentials));
    }

}
