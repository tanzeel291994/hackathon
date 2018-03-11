import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    viewContainerRef: ViewContainerRef;
    myForm: FormGroup;

    constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,private authService: AuthService,private router: Router) {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
    }

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password
            //this.myForm.value.firstName,
            //this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data =>  this.router.navigate(['auth/profile',data.obj._id]),
                error => this.toastr.error('It seems you are alreayd registered', 'Oops!')
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            //firstName: new FormControl(null, Validators.required),
            //lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}