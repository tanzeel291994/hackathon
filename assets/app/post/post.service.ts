import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Post } from "./post.model";

@Injectable()
export class PostService {
    private posts: Post[] = [];
   // messageIsEdit = new EventEmitter<Post>();

    constructor(private http: Http) {
    
    }

    addPost(post: Post) {
        const body = JSON.stringify(post);
        const headers = new Headers({'Content-Type': 'application/json'});
      
        return this.http.post('http://localhost:3000/post/add', body, {headers: headers})  //check this
            .map((response: Response) => {
                const result = response.json();
                const post = new Post(
                    result.obj.type,
                    result.obj.title,
                    result.obj.text,
                    false,false,
                    result.obj.user.firstName,
                    result.obj.user.occupation,
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
                const user = response.json().obj.user._id;
               
                let transformedPosts: Post[] = [];
                for (let post of posts) {
                   // console.log(this.checkUserLikedPost(post.likes,user));
                    transformedPosts.push(new Post(
                        this.getPostType(post.type),
                        post.title,
                        post.text,
                        this.checkUserLikedPost(post.likes,user),
                        this.checkUserInterestedPost(post.intrested,user),
                        post.user.profile.firstName+" "+post.user.profile.lastName ,
                        post.user.profile.occupation, ////edit this from database
                        post.created_at,
                        post.likes.length,
                        post.intrested.length,                        
                        post._id,
                        post.user._id)
                    );
                }
                this.posts = transformedPosts;
                return transformedPosts;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getMyPosts() {
        return this.http.get('http://localhost:3000/POST/myposts')
            .map((response: Response) => {
                const posts = response.json().obj.posts;
                const user = response.json().obj.user._id;
               
                let transformedPosts: Post[] = [];
                for (let post of posts) {
                   // console.log(this.checkUserLikedPost(post.likes,user));
                    transformedPosts.push(new Post(
                        this.getPostType(post.type),
                        post.title,
                        post.text,
                        this.checkUserLikedPost(post.likes,user),
                        this.checkUserInterestedPost(post.intrested,user),
                        post.user.profile.firstName+" "+post.user.profile.lastName ,
                        post.user.profile.occupation, ////edit this from database
                        post.created_at,
                        post.likes.length,
                        post.intrested.length,                        
                        post._id,
                        post.user._id)
                    );
                }
                this.posts = transformedPosts;
                return transformedPosts;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    checkUserLikedPost(likesArray:any,userId:any){
        return likesArray.indexOf(userId) > -1;
    }
    checkUserInterestedPost(intrestsArray:any,userId:any){
        return intrestsArray.indexOf(userId) > -1;
    }
    getPostType(type:number){
        if(type==1)
        return "General";
        else if(type ==2)
        return "Looking for partner";
        else
        return "Looking to hire";
    }
    likePost(post: Post) {
        return this.http.get('http://localhost:3000/post/'+ post.postId+'/like/')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    unLikePost(post: Post) {
      //  this.posts.splice(this.posts.indexOf(post), 1);
        return this.http.get('http://localhost:3000/post/'+ post.postId+'/un-like/')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    intrestPost(post: Post) {
        //this.posts.splice(this.posts.indexOf(post), 1);
        return this.http.get('http://localhost:3000/post/'+ post.postId+'/intrest/')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    unintrestPost(post: Post) {
        //this.posts.splice(this.posts.indexOf(post), 1);
        return this.http.get('http://localhost:3000/post/'+ post.postId+'/un-intrest/')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
   
    deletePost(post: Post) {
        this.posts.splice(this.posts.indexOf(post), 1);
        return this.http.delete('http://localhost:3000/post/delete/' + post.postId)
            .map((response: Response) => response.json( ))
            .catch((error: Response) => Observable.throw(error.json()));
    }
}