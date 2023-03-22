import { Component, OnInit } from '@angular/core';
import { Profile } from '../interfaces/profile';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userLoggedin: boolean = false;
  userProfile: any | null = null;
  constructor(private auth: AuthService) { 
  }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe(((status: boolean)=>{
      this.userLoggedin = status;
      console.log('status ', this.userLoggedin);
    }));
    if(this.userLoggedin){
      this.userProfile = localStorage.getItem('user');
      if(this.userProfile){
        this.userProfile = JSON.parse(this.userProfile);
      }
    }
  }


}
