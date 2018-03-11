
import { ToastsManager } from 'ng2-toastr';

import { Component, Input, ViewContainerRef } from '@angular/core';
import { Post } from '../../post/post.model';
import { PostService } from '../../post/post.service';
import { Profile } from '../profile.model';

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
  
    private viewContainerRef: ViewContainerRef;
    constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,private postService: PostService) 
    {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
       
    }
/*
    onEdit() {
        this.postService.editMessage(this.post);
    }
    
*/  
    showIntrestedProfiles(post:Post){
        
    }

    postLike(post1: Post) {
        //const post = new Post(form.value.type,form.value.title,form.value.text);
        this.postService.likePost(post1)
            .subscribe(
                data => {this.toastr.success('Post liked', 'Success!'),post1.liked=true,post1.postlikes=post1.postlikes+1},
                error =>  this.toastr.error('This is not good!', 'Oops!')
            );
    }
    postInterest(post1: Post) {
        //const post = new Post(form.value.type,form.value.title,form.value.text);
        this.postService.intrestPost(post1)
            .subscribe(
                data => {this.toastr.success('Post liked', 'Success!'),post1.intrested=true,post1.postintrests=post1.postintrests+1},
                error =>  this.toastr.error('This is not good!', 'Oops!')
            );
    }
    postunLike(post1: Post) {
        //const post = new Post(form.value.type,form.value.title,form.value.text);
        this.postService.unLikePost(post1)
            .subscribe(
                data => {this.toastr.success('Post interested', 'Success!'),post1.liked=false,post1.postlikes=post1.postlikes-1},
                error =>  this.toastr.error('This is not good!', 'Oops!')
            );
    }
    postunInterest(post1: Post) {
        //const post = new Post(form.value.type,form.value.title,form.value.text);
        this.postService.unintrestPost(post1)
            .subscribe(
                data => {this.toastr.success('Post not interested', 'Success!'),post1.intrested=false,post1.postintrests=post1.postintrests-1},
                error =>  this.toastr.error('This is not good!', 'Oops!')
            );
    }
    onDelete() {
        this.postService.deletePost(this.post)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.post.userId;
    }
}