import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
profile:Profile;

    constructor(private profileService: ProfileService,private router:Router){}
      ngOnInit() {
        this.profileService.getProfile()
            .subscribe(
                data =>{this.profile=data,console.log(data)},
                error => this.router.navigateByUrl('/auth/signin'),
            );
           
    }
}