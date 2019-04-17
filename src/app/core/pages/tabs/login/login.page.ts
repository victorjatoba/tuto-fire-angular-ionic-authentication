import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../shared/model/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    /**
     * The data manipulated by screen.
     */
    @Input() user: User;

    /**
     * Return to the caller the new selected select value.
     */
    @Output() submit = new EventEmitter<any>();

    /**
     * Called when click on 'Save' button.
     * Responsible to call service to update the page values.
     */
    onSubmit() {
        event.stopPropagation();
        this.submit.emit(JSON.stringify(this.user));
    }

}
