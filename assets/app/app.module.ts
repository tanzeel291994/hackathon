import { RegistrationComponent } from './auth/registration.component';
import { MyPostListComponent } from './header/me/mypost-list.component';
import { MyPostComponent } from './header/me/mypost.component';
import { NgbdModalContent } from './modal/model.component';

import { ModalService } from './modal/modal.service';
import { ProfileComponent } from './header/find/profile.component';
import { ProfileService } from './header/profile.service';
import { PostListComponent } from './post/post-list.component';
import { PostService } from './post/post.service';
import { FollowComponent } from './shared/follow.component';
import { PostAddComponent } from './post/post-add.component';
import { MeComponent } from './header/me/me.component';
import { HomeComponent } from './header/home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import {TimeAgoPipe} from 'time-ago-pipe';
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
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        PostComponent,
        HeaderComponent,
        PostComponent,
        PostAddComponent,
        MyProfileComponent,
        ProfileComponent,
        NgbdModalContent,
        PostListComponent,
        MeComponent,
        MyPostComponent,
        MyPostListComponent,
        MyProfileComponent,
        FindComponent,
        RegistrationComponent,
        FollowComponent,
        HomeComponent,
        LogoutComponent,
        SignupComponent,
        TimeAgoPipe,
        SigninComponent
    ],
    entryComponents: [NgbdModalContent],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        NgbModule.forRoot(),
        ToastModule.forRoot()
    ],
    providers: [AuthService,PostService,ProfileService,ModalService],
    bootstrap: [AppComponent]
})
export class AppModule {

}