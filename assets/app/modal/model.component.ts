import { ModalService } from './modal.service';
import {Component, Input, ViewContainerRef} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { Profile } from '../header/profile.model';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl:'./modal-basic.html',
  styleUrls:['./modal.css']
})
export class NgbdModalContent {
  @Input() profile;
  private viewContainerRef: ViewContainerRef;
  constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,public activeModal: NgbActiveModal,private modalService: ModalService) 
  {
    this.viewContainerRef = viewContainerRef;
    this.toastr.setRootViewContainerRef(viewContainerRef);
}
  follow(profile: Profile) {
   
    this.modalService.followProfile(profile)
        .subscribe(
            data => this.toastr.success('Followed', 'Success!'),
            error =>  this.toastr.error('Try again', 'Oops!')
        );
}
unfollow(profile: Profile) {
   
  this.modalService.unfollowProfile(profile)
      .subscribe(
          data => this.toastr.success('Un Followed', 'Success!'),
          error =>  this.toastr.error('Try again', 'Oops!')
      );
}

}
