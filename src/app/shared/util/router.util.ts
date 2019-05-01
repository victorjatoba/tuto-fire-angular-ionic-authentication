import { Router, NavigationExtras, NavigationEnd, Event } from '@angular/router';
import { ValidationUtil } from './validation.util';
import { PageUrl } from './page-url.enum';

/**
 * @name router.util
 *
 * @description
 * Use router util methods, like how to go to another page with special treatment.
 */
export class RouterUtil {

    /**
     * Redirect to the page passing data param.
     *
     * Obs. To get this params in the another page, just call:
     *
     * ngOnInit() {
     *    this.route.queryParams
     *       .subscribe(params => {
     *             const param = JSON.parse(params['data']);
     *         });
     *        }
     *    }
     *
     * }
     *
     * @param data The data to be passed by param.
     * @param router To use for navigate to another page.
     * @param pageRoute The url of the other page.
     */
    static goToPageWithParams(pageRoute: string, router: Router, data: any) {
        const dataParamStandardized: NavigationExtras = {
            queryParams: {
                data: JSON.stringify(data)
            }
        };
        router.navigate([pageRoute], dataParamStandardized);
    }

    /**
     * Go to the page passed by param.
     *
     * @param router To use for navigate to another page.
     * @param pageRoute The url of the other page.
     */
    static goToPage(pageRoute: string, router: Router) {
        router.navigate([pageRoute], {skipLocationChange: true});
    }

    /**
     * Go to the Login page.
     *
     * @param router To use for navigate to another page.
     */
    static goToLoginPage(router: Router) {
        router.navigate([PageUrl.ROOT]);
    }

    /**
     * Verify if user went to the page passed by param.
     * Generally used by page listener subscriber to identify
     * if the user accessed it page.
     *
     * @param event The subscription event of router.events.subscribe().
     * @param pageRoute The route of the page.
     */
    static userWentToThisPage(event: Event, url: string, pageRoute: string) {

        if (!ValidationUtil.isEmpty(pageRoute) && pageRoute.charAt(0) !== '/') {
            pageRoute = `/${pageRoute}`;
        }

        return (event instanceof NavigationEnd && url === pageRoute);
    }

    /**
     * Remove params from url.
     * @param event The subscription event of router.events.subscribe().
     */
    static removeParamsFromUrl(url: string, router: Router) {
        const urlTree = router.parseUrl(url);
        const primaryUrl = urlTree.root.children['primary'];
        let urlWithoutParams = '';
        if (primaryUrl) {
            urlWithoutParams = primaryUrl.segments.map(it => it.path).join('/');
        }
        return `/${urlWithoutParams}`;
    }
}
