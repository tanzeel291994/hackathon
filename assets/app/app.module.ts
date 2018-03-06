import { FollowComponent } from './shared/follow.component';
import { PostAddComponent } from './post/post-add.component';
import { MeComponent } from './header/me/me.component';
import { HomeComponent } from './header/home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";

import { AuthenticationComponent } from "./auth/authentication.component";
//import { HeaderComponent } from "./header/header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { AuthService } from "./auth/auth.service";
import { PostComponent } from './post/post.component';
import { FindComponent } from './header/find/find.component';
import { MyProfileComponent } from './header/me/myprofile.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        PostComponent,
        HeaderComponent,
        PostComponent,
        PostAddComponent,
        MyProfileComponent,
        MeComponent,
        FindComponent,
        FollowComponent,
        HomeComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}