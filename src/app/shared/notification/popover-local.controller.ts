import { PopoverController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotificationReturnType } from './notification-return-type.enum';
import { NotificationReturn } from './notification-return';

/**
 * @name popover.controller
 *
 * @description
 *  Service for use the popover. This popover just show informations,
 *  get the user iteraction (the button click, for example) and return
 *  to the caller.
 *
 * @author victorjatoba
 */
@Injectable({
    providedIn: 'root'
})
export class PopoverLocalController extends PopoverController {
    /**
     * Controls the data sent to the class that opens this popover.
     */
    private _popoverDataReturnSubject = new Subject<NotificationReturn>();

    /**
     * Method for exhibition popover components. Used in some component in the application.
     * @param componentShow The component that will be opened with the information..
     * @param popoverClass Class CSS to component style.
     * @param params Data to transfer for popover component.
     * @param event Optional parameter to custom the popover component.
     */
    // tslint:disable-next-line:max-line-length
    showPopover(componentShow: any, popoverClass: string, params: any, event: any, backdropDismiss: boolean): Observable<NotificationReturn> {
        this.presentPopover(componentShow, popoverClass, params, event, backdropDismiss);
        return this._popoverDataReturnSubject.asObservable();
    }

    /**
     * Emit success operation return to the class that opens this popover.
     *
     * @param value The value to be sent to the caller.
     */
    emitSuccessReturn(value: any) {
        const data = {
            type: NotificationReturnType.SUCCESS,
            value: value
        } as NotificationReturn;

        return this._popoverDataReturnSubject.next(data);
    }

    /**
     * Emit cancel operation to the class that opens this popover.
     */
    emitCancelReturn() {
        const data = {
            type: NotificationReturnType.CANCEL,
            value: undefined
        } as NotificationReturn;

        return this._popoverDataReturnSubject.next(data);
    }

    /**
     * Emit fail operation to the class that opens this popover.
     *
     * @param error The error of the operation.
     */
    emitFailReturn(error: any) {
        const data = {
            type: NotificationReturnType.ERROR,
            value: error
        } as NotificationReturn;

        return this._popoverDataReturnSubject.error(data);
    }

    /**
     * Method controller popover.
     * @param componentShow The component that will be opened with the information..
     * @param popoverClass Class CSS to component style.
     * @param params Data to transfer for popover component.
     * @param ev Optional parameter to custom the popover component.
     */
    private async presentPopover(componentShow: any, popoverClass: string, params: any, ev: any, backdropDismiss: boolean) {
        const popover = await this.create({
            component: componentShow,
            translucent: false,
            cssClass: popoverClass,
            componentProps: {
                params: params
            },
            backdropDismiss: backdropDismiss,
            event: ev
        });

        await popover.present();
    }
}
