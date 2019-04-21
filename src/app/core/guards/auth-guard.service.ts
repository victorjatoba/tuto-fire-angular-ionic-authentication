import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/authentication.service';
import { RouterUtil } from '../../shared/util/router.util';
import { PageUrl } from '../../shared/util/page-url.enum';

/**
 * @name auth-guard.service
 *
 * @description
 * Verify if the user has permission to access the page.
 *
 * @author victor.jatoba
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    /**
     * Verify if the user is logged in the system.
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isLoggedIn) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        console.log('The user have no permission to access this page!');

        RouterUtil.goToPage(PageUrl.AUTHENTICATION, this.router);
        return false;
    }
}
