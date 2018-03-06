import { ME_ROUTES } from './me/me.routing';
import { HOME_ROUTES } from './home/home.routes';
import { PostAddComponent } from './../post/post-add.component';
import { PostComponent } from './../post/post.component';
import { FindComponent } from './find/find.component';
import { MeComponent } from './me/me.component';
import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
//import { FindComponent } from "./signin.component";
//import { MeComponent } from "./logout.component";

export const MAIN_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent,children:HOME_ROUTES },
    { path: 'find', component: FindComponent },
    { path: 'me', component: MeComponent ,children:ME_ROUTES}
];