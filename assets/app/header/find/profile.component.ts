import { Profile } from './../profile.model';
import { ProfileService } from './../profile.service';

import { Component, OnInit, Input } from "@angular/core";



@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
   // posts: Post[];
   @Input() profile:Profile;
    
   constructor(private profileService: ProfileService) {}

    
    ngOnInit() {
      /*
        this.postService.getPosts()
            .subscribe(
                (posts: Post[]) => {
                    this.posts = posts;
                }
            );*/
    }
}