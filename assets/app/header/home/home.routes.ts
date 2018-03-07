import { PostListComponent } from './../../post/post-list.component';
import { PostAddComponent } from './../../post/post-add.component';
import { PostComponent } from './../../post/post.component';

import { Routes } from "@angular/router";



export const HOME_ROUTES: Routes = [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'posts', component: PostListComponent },
    { path: 'addPost', component: PostAddComponent }

];