import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private route: Router) { 
    if (this.UserisLoggedIn()) {
      this.isLoggedIn.next(true);
    }
  }

  login(username: string, password: string) {
    return this.http.post('https://dummyjson.com/auth/login', { username: username, password: password }).pipe(
      tap((response: any) => {
        console.log('this is the auth response, ', response);
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        this.isLoggedIn.next(true);
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.route.navigate(['/']);
    this.isLoggedIn.next(false);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  UserisLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

}
