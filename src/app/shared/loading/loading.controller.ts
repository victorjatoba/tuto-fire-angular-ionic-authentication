import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

/**
 * @name loading-controller
 *
 * @description
 * This class provides the loading animation for wait the complete pages.
 */

@Injectable({
    providedIn: 'root'
})
export class LocalLoadingController extends LoadingController {

    // TODO: change to TranslateService.
    loading = 'Loading...';

    /**
     * Local loading controller constructor
     */
    constructor() {
        super();
    }

    /**
     * Show the loading component at screen.
     */
    async showLoading() {
        const loading = await this.create({
            message: this.loading
        });
        loading.present();
    }

}
