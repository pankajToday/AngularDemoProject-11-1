import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {HttpClientModule} from  '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';


import * as $ from 'jquery'; // use this if you want jquery function.
 // Google Captcha
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Error404Component } from './errorPage/error404/error404.component';
import { Error500Component } from './errorPage/error500/error500.component';
import { DashboardComponent } from './sampleDashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';


import { HeroComponent } from './hero-list/hero/hero.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { UserCreateComponent } from './Users/user-create/user-create.component';
import { UserViewComponent } from './Users/user-view/user-view.component';
import { UserDeleteComponent } from './users/user-delete/user-delete.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    Error500Component,
    DashboardComponent,
    FooterComponent,
    AsideComponent,
    HeroComponent,
    UserListComponent,
    UserCreateComponent,
    UserViewComponent,
    UserDeleteComponent,
    UserEditComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
