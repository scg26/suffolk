import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAuthToken();
    const isAuthRequest = request.url.startsWith('https://dummyjson.com/auth/carts/user/');
    console.log(isAuthRequest);
    if (isAuthRequest && token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }); 
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.auth.logout();
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => err);
      })
    );
  }
}
