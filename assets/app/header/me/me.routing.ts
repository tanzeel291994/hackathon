import { MyProfileComponent } from './myprofile.component';


import { Routes } from "@angular/router";



export const ME_ROUTES: Routes = [
    { path: '', redirectTo: 'myprofile', pathMatch: 'full' },
    { path: 'myprofile', component: MyProfileComponent }
   // { path: 'addPost', component: PostAddComponent }

];