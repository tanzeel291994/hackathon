import { Post } from './post.model';
import { PostService } from './post.service';
import { Component, ViewContainerRef } from "@angular/core";
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';


@Component({
    selector: 'app-post-add',
    templateUrl:'./post-add.component.html',
    styles:[`select.form-control{height:34px !important; }`]
})
export class PostAddComponent {
    post: Post;
    private viewContainerRef: ViewContainerRef;
    constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef,private postService: PostService) 
    {
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef(viewContainerRef);
    }
    onSubmit(form: NgForm) {
            const post = new Post(form.value.type,form.value.title,form.value.text,false,false);
            console.log(form.value.title);
            this.postService.addPost(post)
                .subscribe(
                    data => this.toastr.success('Posted', 'Success!'),
                    error =>  this.toastr.error('Try again', 'Oops!')
                );

        form.resetForm();
    }
}