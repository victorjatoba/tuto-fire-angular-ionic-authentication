import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { PopoverLocalController } from '../../../../../../shared/components/notification/popover-local.controller';

/**
 * @name user-does-not-exist.popover
 *
 * @description Popover with user does not exist error.
 */

@Component({
    selector: 'app-user-already-exist-popover',
    templateUrl: './user-already-exist.popover.html',
    styleUrls: ['./user-already-exist.popover.scss'],
})
export class UserAlreadyExistPopover {

    message: string;
    email: string;

    constructor(
        public popoverController: PopoverLocalController,
        private route: ActivatedRoute,
        public navParams: NavParams) {
            this.initValues();
         }

    private initValues() {
        const dataParam = this.navParams.get('params');
        this.message = dataParam.message;
        this.email = dataParam.email;
    }

    onClose() {
        this.popoverController.emitCancelReturn();
    }
}
