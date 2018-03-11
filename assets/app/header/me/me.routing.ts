
import { MyProfileComponent } from './myprofile.component';


import { Routes } from "@angular/router";
import { MyPostListComponent } from './mypost-list.component';



export const ME_ROUTES: Routes = [
    { path: '', redirectTo: 'myprofile', pathMatch: 'full' },
    { path: 'myprofile', component: MyProfileComponent },
    { path: 'post', component: MyPostListComponent }

];