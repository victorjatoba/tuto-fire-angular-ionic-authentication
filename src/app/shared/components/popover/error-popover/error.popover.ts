import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopoverLocalController } from '../../../../shared/components/notification/popover-local.controller';

/**
 * @name user-does-not-exist.popover
 *
 * @description Popover with user does not exist error.
 */

@Component({
    selector: 'error-popover',
    templateUrl: './error.popover.html',
    styleUrls: ['./error.popover.scss'],
})
export class ErrorPopover {

    message: string;
    title: string;

    constructor(
        public popoverController: PopoverLocalController,
        public navParams: NavParams) {
            this.initValues();
         }

    private initValues() {
        const dataParam = this.navParams.get('params');
        this.title = dataParam.title;
        this.message = dataParam.message;
    }

    onClose() {
        this.popoverController.emitCancelReturn();
    }
}
