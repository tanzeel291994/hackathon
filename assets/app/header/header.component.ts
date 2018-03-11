import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
profile:Profile;

    constructor(private profileService: ProfileService){}
      ngOnInit() {
        this.profileService.getProfile()
            .subscribe(
                (profile: Profile) => {
                    console.log(profile);
                    this.profile = profile;
                }
            );
           
    }
}