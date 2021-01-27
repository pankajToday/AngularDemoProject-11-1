import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroComponent } from './hero-list/hero/hero.component';


import { DashboardComponent } from './sampleDashboard/dashboard.component';
import {Error404Component  } from './errorPage/error404/error404.component';
import {Error500Component  } from './errorPage/error500/error500.component';


import { UserListComponent } from './Users/user-list/user-list.component';
import { UserCreateComponent } from './Users/user-create/user-create.component';
import { UserViewComponent } from './Users/user-view/user-view.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';


// source :: https://angular.io/guide/router-tutorial-toh

const appRoutes: Routes = [
    { path: 'heroes', component: HeroListComponent },
    { path: 'hero', component: HeroComponent },

    { path: 'sample-dashboard', component: DashboardComponent },
    { path: 'users', component: UserListComponent },
    { path: 'user-add', component: UserCreateComponent },
    { path: 'user-create', component: UserCreateComponent },
    { path: 'user-view/:id', component: UserViewComponent },
    { path: 'user-edit/:id', component: UserEditComponent },


    { path: '',   redirectTo: '/sample-dashboard', pathMatch: 'full' },
    { path: '**', component: Error404Component },
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
