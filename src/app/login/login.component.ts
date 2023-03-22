import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)], updateOn: 'change' }),
  });

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    const { username, password } = this.loginForm.value as any;
    this.auth.login(username, password).subscribe({
      next: (response) => {
      this.router.navigate(['/']);
      },
      error: (err) => {
        this.loginError = true;
        console.log(err);
      },
    });
  }
}
