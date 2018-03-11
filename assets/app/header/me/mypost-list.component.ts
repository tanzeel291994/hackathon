
import { Component, OnInit } from "@angular/core";
import { Post } from "../../post/post.model";
import { PostService } from "../../post/post.service";



@Component({
    selector: 'app-my-post-list',
    template: `
        <div class="post-box">
            <app-my-post
                   [post]="post"
                    *ngFor="let post of posts">
            </app-my-post>
        </div>
    `
})
export class MyPostListComponent implements OnInit {
    posts: Post[];

    constructor(private postService: PostService) {}

    ngOnInit() {
        this.postService.getMyPosts()
            .subscribe(
                (posts: Post[]) => {
                    this.posts = posts;
                }
            );
    }
}