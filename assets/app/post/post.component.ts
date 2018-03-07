import { PostService } from './post.service';
import { Post } from './post.model';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styles:[`.post{
        margin-left:2rem;
        margin-right:2rem;
    }`]
})
export class PostComponent {
    @Input() post: Post;

    constructor(private postService: PostService) {}
/*
    onEdit() {
        this.postService.editMessage(this.post);
    }
*/
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