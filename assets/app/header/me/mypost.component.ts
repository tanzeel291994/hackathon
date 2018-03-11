import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService, SearchResults } from './../profile.service';

import { ToastsManager } from 'ng2-toastr';

import { Component, Input, ViewContainerRef } from '@angular/core';
import { Post } from '../../post/post.model';
import { PostService } from '../../post/post.service';
import { Profile } from '../profile.model';
import { NgbdModalContent } from '../../modal/model.component';

@Component({
    selector: 'app-my-post',
    templateUrl: './mypost.component.html',
    styles:[`.post{
        margin-left:2rem;
        margin-right:2rem;
        margin-bottom:3rem;
    }
    .u-align-flex-end{
       flex:1;
       display:flex;
       justify-content:flex-end;
    }
    `]
})
export class MyPostComponent {
    @Input() post: Post;
    profiles:Profile[];
    userId:string;
    private viewContainerRef: ViewContainerRef;
    constructor(public toastr: ToastsManager,private modalService:NgbModal, viewContainerRef: ViewContainerRef,private postService: PostService,private profileService:ProfileService) 
    {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
       
    }
/*
    onEdit() {
        this.postService.editMessage(this.post);
    }
    
*/  
showIntrestedProfiles(post1: Post) {
    //const post = new Post(form.value.type,form.value.title,form.value.text);
    this.profileService.showIntrestedProfiles(post1)
    .subscribe(
        (searchResults: SearchResults) => {
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

  delete(post:Post) {
        this.postService.deletePost(post)
            .subscribe(
                result => this.toastr.success('Post deleted', 'Success!'),
            );
    }
}