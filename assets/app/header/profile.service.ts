import { Profile } from './profile.model';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Post } from '../post/post.model';



@Injectable()
export class ProfileService {
   // private posts: Post[] = [];
   // messageIsEdit = new EventEmitter<Post>();

    constructor(private http: Http) {
    
    }

    upadateProfile(profile: Profile) {
        const body = JSON.stringify(profile);
        const headers = new Headers({'Content-Type': 'application/json'});
      
        return this.http.put('http://localhost:3000/user/update', body, {headers: headers})  //check this
            .map((response: Response) => {
                const result = response.json();
                return result; 
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    createProfile(profile: Profile) {
        const body = JSON.stringify(profile);
        const headers = new Headers({'Content-Type': 'application/json'});
      //  const id = userId;
        return this.http.post('http://localhost:3000/user/createProfile', body, {headers: headers})  //check this
            .map((response: Response) => {
                const result = response.json();
                return result; 
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getProfile() {
        return this.http.get('http://localhost:3000/user/my-profile')
            .map((response: Response) => {
               
                const followers = response.json().obj.followers;
                const profile = response.json().obj.profile;
                const userId = response.json().obj._id;
              
                let transformedProfile: Profile;
                //for (let post of posts) {
                   // console.log(this.checkUserLikedPost(post.likes,user));
                   transformedProfile=new Profile(
                        profile.firstName,
                        profile.lastName,
                        profile.language,
                        profile.yob,
                        profile.status,
                        profile.occupation,
                        profile.qualification,
                        profile.field,
                        profile.intrests,
                        profile.location,
                        profile.intrestInfo,
                        userId,
                        followers
                        
                )
                console.log(transformedProfile);
                return transformedProfile;
            })
            .catch((error: Response) => Observable.throw(error.json()));
            
        }
        searchProfile(term) {
            return this.http.get('http://localhost:3000/user/search-user/'+term)
                .map((response: Response) => {
                   console.log(response);
                    const profiles = response.json().obj;
                    const userId = response.json().userId;
                  
                    let transformedProfile: Profile[]=[];
                    for (let p of profiles) {
                       // console.log(this.checkUserLikedPost(post.likes,user));
                       let followers = p.followers;
                       let profile = p.profile;
                       transformedProfile.push(new Profile(
                            profile.firstName,
                            profile.lastName,
                            profile.language,
                            profile.yob,
                            profile.status,
                            profile.occupation,
                            profile.qualification,
                            profile.field,
                            profile.intrests,
                            profile.location,
                            profile.intrestInfo,
                            p._id,
                            followers
                        )
                    );
                }
                   // console.log(transformedProfile);
                    return new SearchResults(transformedProfile,userId);
                })
                .catch((error: Response) => Observable.throw(error.json()));
                
            }
            showIntrestedProfiles(post:Post) {
                return this.http.post('http://localhost:3000/post/interstedProfiles/',{postId:post.postId})
                    .map((response: Response) => {
                       console.log(response);
                        const profiles = response.json().obj.users;
                        const userId = response.json().obj.user;
                      
                        let transformedProfile: Profile[]=[];
                        for (let p of profiles) {
                           // console.log(this.checkUserLikedPost(post.likes,user));//  obj: {users:users ,user:req.user._id}
                           let followers = p.followers;
                           let profile = p.profile;
                           transformedProfile.push(new Profile(
                                profile.firstName,
                                profile.lastName,
                                profile.language,
                                profile.yob,
                                profile.status,
                                profile.occupation,
                                profile.qualification,
                                profile.field,
                                profile.intrests,
                                profile.location,
                                profile.intrestInfo,
                                p._id,
                                followers
                            )
                        );
                    }
                       // console.log(transformedProfile);
                        return new SearchResults(transformedProfile,userId);
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
                    
                } 
                whoToFollow() {
                    return this.http.get('http://localhost:3000/user/whoToFollow/')
                        .map((response: Response) => {
                           console.log(response);
                            const profiles = response.json().obj;
                            const userId = response.json().userId;
                          
                            let transformedProfile: Profile[]=[];
                            for (let p of profiles) {
                               // console.log(this.checkUserLikedPost(post.likes,user));//  obj: {users:users ,user:req.user._id}
                               let followers = p.followers;
                               let profile = p.profile;
                               transformedProfile.push(new Profile(
                                    profile.firstName,
                                    profile.lastName,
                                    profile.language,
                                    profile.yob,
                                    profile.status,
                                    profile.occupation,
                                    profile.qualification,
                                    profile.field,
                                    profile.intrests,
                                    profile.location,
                                    profile.intrestInfo,
                                    p._id,
                                    followers
                                )
                            );
                        }
                           // console.log(transformedProfile);
                            return new SearchResults(transformedProfile,userId);
                        })
                        .catch((error: Response) => Observable.throw(error.json()));
                        
                    }       
}

export class SearchResults{
   // public profiles:Profile[];
   // public userId:string;
    constructor(public profiles:Profile[],public userId:string){}
}