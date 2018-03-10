import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { Http } from '@angular/http';
import { Profile } from '../header/profile.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalService {
    //post: Post;
    constructor(private http: Http) {
    
    }

    followProfile(profile: Profile) {
        //const body = JSON.stringify(profile);
        const headers = new Headers({'Content-Type': 'application/json'});
      
        return this.http.post('http://localhost:3000/user/follow/',{userId:profile.userId})  
            .map((response: any) => {
                const result = response.json();
                console.log(result);
                return result; 
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    unfollowProfile(profile: Profile) {
       // const body = JSON.stringify(profile);
      //  const headers = new Headers({'Content-Type': 'application/json'});
      
        return this.http.post('http://localhost:3000/user/unfollow/',{userId:profile.userId})  
            .map((response: any) => {
                const result = response.json();
                return result; 
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    
}