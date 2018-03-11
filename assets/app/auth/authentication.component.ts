import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-authentication',
    templateUrl:'./authentication.component.html',
    styles:[`.display-none{
        display:none;
    }
  .form__anchor{
      padding:2rem;
  }
  .form__anchor:hover{
   color:#eee;
}
    `]
   
})
export class AuthenticationComponent {
    constructor(private authService: AuthService) {}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}