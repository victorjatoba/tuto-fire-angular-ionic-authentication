import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterPage } from './pages/login-register/login-register.page';
import { PageRoute } from './const/page-route.const';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
    {
        path: PageRoute.LOGIN_REGISTER,
        component: LoginRegisterPage
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
