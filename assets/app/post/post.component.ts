
import { ToastsManager } from 'ng2-toastr';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styles:[`.post{
        margin-left:2rem;
        margin-right:2rem;
        margin-bottom:3rem;
    }`]
})
export class PostComponent {
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