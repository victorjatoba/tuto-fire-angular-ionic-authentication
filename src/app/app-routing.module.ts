import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './modules/home/home.module#HomePageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        loadChildren: './modules/create/create.module#CreatePageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: './core/login/login.module#LoginPageModule'
    },
    {
        path: 'register',
        loadChildren: './core/register/register.module#RegisterPageModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
