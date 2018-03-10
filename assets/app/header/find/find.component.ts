import { ModalService } from './../../modal/modal.service';
import { NgForm } from '@angular/forms';
import { ProfileService, SearchResults } from './../profile.service';
import { ToastsManager } from 'ng2-toastr';
import { Component, ViewContainerRef } from '@angular/core';
import { Profile } from '../profile.model';

@Component({
    selector: 'my-find',
    templateUrl: './find.component.html',
    styles:[`.modal.fade .modal-dialog{
        transform: translate(0,50%) !important;
      }`]
  
})
export class FindComponent {
    
    viewContainerRef: ViewContainerRef;
    constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,private profileService: ProfileService,private modalService: ModalService) 
    {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
    }
    profiles:Profile[];
    userId:string;
   // searchResults:SearchResults;
    onSubmit(form: NgForm) {
           let term = form.value.term;
            this.profileService.searchProfile(term)
                .subscribe(
                    (searchResults: SearchResults) => {
                       // this.searchResults=searchResults
                        this.profiles = searchResults.profiles; 
                        this.userId = searchResults.userId;
                       // console.log(searchResults);
                    }
                );

      //  form.resetForm();
    }
   
 
}