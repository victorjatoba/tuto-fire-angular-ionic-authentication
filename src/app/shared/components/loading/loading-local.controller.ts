import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

/**
 * @name loading-controller
 *
 * @description
 * This class provides the loading animation for wait the page's actions.
 */

@Injectable({
    providedIn: 'root'
})
export class LoadingLocalController extends LoadingController {

    // TODO: change to TranslateService.
    loading = 'Loading...';

    /**
     * Show the loading component at screen.
     */
    async showLoading() {
        const loading = await this.create({
            message: this.loading,
        });
        loading.present();
    }

    /**
     * Show the loading component with a personalized message.
     *
     * @param message the message to be showed.
     */
    async showLoadingWithPersonalizedMessage(message) {
        const loading = await this.create({
            spinner: null,
            duration: 5000,
            message: message,
            translucent: true,
            cssClass: 'loading-with-message'
        });
        loading.present();
    }
}
