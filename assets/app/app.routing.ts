import { MAIN_ROUTES } from './header/main.routes';
import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { HeaderComponent } from "./header/header.component";

const APP_ROUTES: Routes = [
   { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: HeaderComponent ,children: MAIN_ROUTES},
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);