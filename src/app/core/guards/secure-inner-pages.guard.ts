import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RouterUtil } from '../../shared/util/router.util';
import { PageUrl } from '../../shared/util/page-url.enum';

/**
 * @name secure-inner-pages.guard
 *
 * @description
 * Prevent access for sign in, sign up,
 * password recovery and email verification
 * pages when the user is already logged in.
 *
 * @author victorjatoba
 */
@Injectable({
    providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
    constructor(
        public authService: AuthService,
        public router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        console.log(this.authService.isLoggedIn);

        if (!this.authService.isLoggedIn) {
            // logged in so return true
            return true;
        }

        // User logged in so redirect to home page
        console.log('The user have no permission to access this page!');

        RouterUtil.goToPage(PageUrl.USER_HOME, this.router);
        return false;
    }
}
