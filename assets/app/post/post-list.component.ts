import { PostService } from './post.service';
import { Post } from './post.model';
import { Component, OnInit } from "@angular/core";



@Component({
    selector: 'app-post-list',
    template: `
        <div class="post-box">
            <app-post
                   [post]="post"
                    *ngFor="let post of posts">
            </app-post>
        </div>
    `
})
export class PostListComponent implements OnInit {
    posts: Post[];

    constructor(private postService: PostService) {}

    ngOnInit() {
        this.postService.getPosts()
            .subscribe(
                (posts: Post[]) => {
                    this.posts = posts;
                }
            );
    }
}