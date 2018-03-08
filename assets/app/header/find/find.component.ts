import { NgForm } from '@angular/forms';
import { ProfileService } from './../profile.service';
import { ToastsManager } from 'ng2-toastr';
import { Component, ViewContainerRef } from '@angular/core';
import { Profile } from '../profile.model';

@Component({
    selector: 'my-find',
    templateUrl: './find.component.html'
})
export class FindComponent {
    
    viewContainerRef: ViewContainerRef;
    constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,private profileService: ProfileService) 
    {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
    }
    profiles:Profile[];
    onSubmit(form: NgForm) {
           let term = form.value.term;
            this.profileService.searchProfile(term)
                .subscribe(
                    (profile: Profile[]) => {
                        this.profiles = profile; 
                        console.log(this.profiles);
                    }
                );

      //  form.resetForm();
    }
   
}