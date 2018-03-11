import { ProfileService } from './../header/profile.service';
import { Profile } from './../header/profile.model';
import { NgForm } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr';

import { Component, Input, ViewContainerRef } from '@angular/core';
import { Values } from '../header/values';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
    selector: 'my-profile',
    templateUrl: './registration.component.html',
    styles:[`select.form-control{height:34px !important; }
    .register-heading{
        padding:2rem;
        color:#eee;
    }
    label{
        color:#eee !important;
    }
    `]
})
export class RegistrationComponent {
     profile: Profile;
    
    values:Values;
    //status:any;
    //language:any;
    intrest:any;
   userId:string;
    private viewContainerRef: ViewContainerRef;
    constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,private profileService: ProfileService,private route: ActivatedRoute, private router: Router) 
    {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
        this.values=new Values();
        this.userId = route.snapshot.params['id'];
 
    }
    onSubmit(form: NgForm) {
        if(form.value.firstName =="" ||
            form.value.lastName == "" ||
            form.value.language == "" ||
            form.value.yob == "" ||
            form.value.status == "" ||
            form.value.interests1 =="" || form.value.interests2 ==""||  form.value.location==""||
            form.value.occupation == "" ||
            form.value.qualification == "" ||
            form.value.field == "")
            {
                this.toastr.error('Please fill the complete form ,later you could update it', 'Oops!')
                return;
            }
            const profile = new Profile(form.value.firstName,
                form.value.lastName,
                form.value.language,
                form.value.year,
                form.value.status,
                form.value.occupation,
                form.value.qualification,
                form.value.field,
                [form.value.interests1,form.value.interests2],
                form.value.location,
                form.value.intrestInfo,
                this.userId
            );
            this.profileService.createProfile(profile)
                .subscribe(
                    data => this.router.navigateByUrl('/auth/signin'),
                    error =>  this.toastr.error('Try again', 'Oops!')
                );

      //  form.resetForm();
    }
   
   
}