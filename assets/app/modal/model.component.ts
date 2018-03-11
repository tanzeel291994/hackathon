import { Profile } from './../header/profile.model';
import { ModalService } from './modal.service';
import {Component, Input, ViewContainerRef} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'ngbd-modal-content',
  templateUrl:'./modal-basic.html',
  styleUrls:['./modal.css']
})
export class NgbdModalContent {
  @Input() profile;
  @Input() userId;
  private viewContainerRef: ViewContainerRef;
  vprofile:Profile;
  vuserId:string;
  isFollowed:boolean;
  constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,public activeModal: NgbActiveModal,private modalService: ModalService) 
  {
    this.viewContainerRef = viewContainerRef;
    this.toastr.setRootViewContainerRef(viewContainerRef);
}
ngOnInit() {
     
  this.vprofile=this.profile;
  this.vuserId=this.userId;
  this.checkIfFollows(this.vprofile,this.userId);
}
  follow(profile: Profile) {
   
    this.modalService.followProfile(profile)
        .subscribe(
            data => {this.toastr.success('Followed', 'Success!'),this.isFollowed =true},
            error =>  this.toastr.error('Try again', 'Oops!')
        );
}
checkIfFollows(profile:Profile,userId:string)
{
 // console.log("--------");
  //console.log(profile);
  //console.log(userId);
  if (profile.followers == null)
  {
    this.isFollowed=false;
  }
  else if (profile.followers.indexOf(userId) > -1)
  this.isFollowed=true;
 else
 this.isFollowed=false;
}
unfollow(profile: Profile) {
   
  this.modalService.unfollowProfile(profile)
      .subscribe(
          data => {this.toastr.success('Un Followed', 'Success!'),this.isFollowed =false},
          error =>  this.toastr.error('Try again', 'Oops!')
      );
}

}
