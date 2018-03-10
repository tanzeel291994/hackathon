import { NgbdModalContent } from './../../modal/model.component';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './../../modal/modal.service';
import { Profile } from './../profile.model';
import { ProfileService } from './../profile.service';

import { Component, OnInit, Input } from "@angular/core";



@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles:[`.modal.fade .modal-dialog{
      transform: translate(0,50%) !important;
    }`]
    
})
export class ProfileComponent implements OnInit {
   // posts: Post[];
   @Input() profile:Profile;
   @Input() userId:string;
   closeResult: string;
   fullProfile:Profile;
   user:string;
   constructor(private modalService: NgbModal) {}

    
    ngOnInit() {
     
            this.fullProfile=this.profile;
            this.user=this.userId;
    }
    open() {
      const modalRef = this.modalService.open(NgbdModalContent);
     
      modalRef.componentInstance.profile = this.fullProfile;
      modalRef.componentInstance.userId = this.user;
      
    }
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
      isFollowed
}