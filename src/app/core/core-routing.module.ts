import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterPage } from './pages/login-register/login-register.page';
import { AuthGuard } from './guards/auth-guard.service';
import { PageUrl } from '../shared/util/page-url.enum';

const routes: Routes = [
    {
        path: PageUrl.AUTHENTICATION,
        loadChildren: './pages/login-register/login-register.module#LoginRegisterPageModule'
    },
    {
        path: PageUrl.USER_HOME,
        loadChildren: './../modules/home/home.module#HomePageModule'
    },
    //  Path for 404. Page Not Found.
    {
        path: '**',
        component: LoginRegisterPage,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
