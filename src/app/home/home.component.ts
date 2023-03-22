import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Products } from '../interfaces/products';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //products$ = this.http.get('https://dummyjson.com/products');
  products: any;
  userLoggedin: boolean = false;
  userId!: string | null;
  cart: any;

  constructor(private http: HttpClient,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe((status => {
      this.userLoggedin = status;
      this.userId = localStorage.getItem('userId');
      if (this.userId && this.userLoggedin) {
        this.http.get(`https://dummyjson.com/auth/carts/user/${this.userId}`).subscribe((res) => {
          this.cart = res;
          console.log('this is the cart', this.cart);
        })
      }
      else {
        this.http.get('https://dummyjson.com/products').subscribe((res) => {
          this.products = res;
          console.log('these are the products ', this.products);
        });
      }
    }));

   
  }
}
