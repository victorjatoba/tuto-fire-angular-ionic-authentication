import { PopoverLocalController } from '../../../../../../shared/notification/popover-local.controller';
import { Component } from '@angular/core';

/**
 * @name user-does-not-exist.popover
 *
 * @description Popover with user does not exist error.
 */

@Component({
    selector: 'app-user-does-not-exist-popover',
    templateUrl: './user-does-not-exist.popover.html',
    styleUrls: ['./user-does-not-exist.popover.scss'],
})
export class UserDoesNotExistPopover {

    constructor(public popoverController: PopoverLocalController) { }

    onClose() {
        this.popoverController.emitCancelReturn();
    }

    onClickRegister() {
        this.popoverController.emitSuccessReturn(undefined);
    }
}
