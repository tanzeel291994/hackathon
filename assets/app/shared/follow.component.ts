import { ModalService } from './../modal/modal.service';
import { SearchResults } from './../header/profile.service';
import { Component } from '@angular/core';
import { ProfileService } from '../header/profile.service';
import { Profile } from '../header/profile.model';
import { NgbdModalContent } from '../modal/model.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-follow',
    templateUrl: './follow.component.html',
    styles:[` .heading-tertiary{
        margin-top:0;
        padding-top:1.5rem;
    }`]
})

export class FollowComponent {
    profiles:Profile[];
    userId:string;
    constructor(private profileService:ProfileService,private modalService: NgbModal){}
    ngOnInit() {
        this.profileService.whoToFollow()
            .subscribe(
                (searchResults: SearchResults) => {
                    console.log(searchResults);
                    this.profiles = searchResults.profiles;
                    this.userId=searchResults.userId;
                }
            );
    }
    open(profile:Profile) {
        const modalRef = this.modalService.open(NgbdModalContent);
       
        modalRef.componentInstance.profile = profile;
        modalRef.componentInstance.userId = this.userId;
        
      }
}