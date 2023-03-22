import { Component, OnInit } from '@angular/core';
import { Profile } from '../interfaces/profile';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userLoggedin: boolean = false;
  userProfile!: any;

  constructor(private auth: AuthService){
  }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe(((status: boolean)=>{
      this.userLoggedin = status;
    if(this.userLoggedin){
      this.userProfile = localStorage.getItem('user');
      this.userProfile = JSON.parse(this.userProfile);
    }
    }));
    
  }

  logout(){
    this.auth.logout();
  }

}
