import { Values } from './../values';
import { NgForm } from '@angular/forms';
import { PostService } from './../../post/post.service';
import { ToastsManager } from 'ng2-toastr';
import { ProfileService } from './../profile.service';
import { Component, Input, ViewContainerRef } from '@angular/core';
import { Profile } from '../profile.model';

@Component({
    selector: 'my-profile',
    templateUrl: './myprofile.component.html',
    styles:[`select.form-control{height:34px !important; }`]
})
export class MyProfileComponent {
     profile: Profile;
    
    values:Values;
    //status:any;
    //language:any;
    intrest:any;
   
    private viewContainerRef: ViewContainerRef;
    constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,private profileService: ProfileService) 
    {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
        this.values=new Values();
    }
    onSubmit(form: NgForm) {
            const profile = new Profile(form.value.firstName,
                form.value.lastName,
                form.value.language,
                form.value.yob,
                form.value.status,
                form.value.occupation,
                form.value.qualification,
                form.value.field,
                [form.value.interests1,form.value.interests2],
                form.value.location,
                form.value.intrestInfo
            );
            this.profileService.upadateProfile(profile)
                .subscribe(
                    data => this.toastr.success('profile updated', 'Success!'),
                    error =>  this.toastr.error('Try again', 'Oops!')
                );

      //  form.resetForm();
    }
   
    ngOnInit() {
        this.profileService.getProfile()
            .subscribe(
                (profile: Profile) => {
                    this.profile = profile;//, console.log(this.profile);
                }
            );
           
    }
    public Intrests:any=[
        "Cooking",
        "Teaching",
        "Accounting",
        "Handicrafts",
        "Tailoring",
        "Other"
    ]
    public Status:any = [
         "Single",
         "Married"
      ];
      public Languages:any = [
         "Marathi",
         "Kannad"
      ];
      public Qualifications:any = [
        "Masters",
        "Bacholers",
        "Matriculate",
        "Doctorate"
     ];
     public Locations:any = [
        "Mumbai",
        "Pune",
        "Nashik",
        "Jalgaon",
        "Thane"
     ];
     public Occupations:any = [
        "House Wife",
        "Marketing",
        "Sales",
        "Accountant",
        "Engineer",
        "Doctor"
     ];
}