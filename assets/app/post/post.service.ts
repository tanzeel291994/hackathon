import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Post } from "./post.model";

@Injectable()
export class PostService {
    private posts: Post[] = [];
    messageIsEdit = new EventEmitter<Post>();

    constructor(private http: Http) {
    }

    addPost(post: Post) {
        const body = JSON.stringify(post);
        const headers = new Headers({'Content-Type': 'application/json'});
       // const token = localStorage.getItem('token')? '?token=' + localStorage.getItem('token'): '';

        return this.http.post('http://localhost:3000/post/add', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const post = new Post(
                    result.obj.text,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.posts.push(post);
                return post;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getPosts() {
        return this.http.get('http://localhost:3000/post')
            .map((response: Response) => {
                const posts = response.json().obj.posts;
                console.log(posts);
                let transformedPosts: Post[] = [];
                for (let post of posts) {
                    transformedPosts.push(new Post(
                        post.type,
                        post.title,
                        post.text,
                        post.user.profile.firstName+" "+post.user.profile.lastName ,
                        post.user.profile.occupation, ////edit this from database
                        post.postcreated,                         
                        post._id,
                        post.user._id)
                    );
                }
                this.posts = transformedPosts;
                return transformedPosts;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
/*
    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
*/
    deletePost(post: Post) {
        this.posts.splice(this.posts.indexOf(post), 1);
        return this.http.delete('http://localhost:3000/post/delete/' + post.postId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}