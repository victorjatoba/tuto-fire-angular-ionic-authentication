import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './modules/home/home.module#HomePageModule'

    },
    {
        path: 'create',
        loadChildren: './modules/create/create.module#CreatePageModule'

    },
    {
        path: 'login',
        loadChildren: './core/login/login.module#LoginPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        loadChildren: './core/register/register.module#RegisterPageModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
