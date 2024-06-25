import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  isAlert = false;
  isError = false;
  responser!: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    GoogleAuth.initialize({
      clientId:
        '418249711917-id1t993m4kqinfv1toscjajkh2i0dmj2.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    this.isLoading = true;
    this.isAlert = false; // Reset the alert visibility
    this.isError = false; // Reset the error state

    if (this.loginForm.valid) {
      try {
        const response = await this.authService.login(this.loginForm.value);
        if (response) {
          // console.log("Response:", response);
          this.responser = { ...response };
          this.authService.setToken(response.token);
          this.isLoading = false;
          this.router.navigate(['/home']);
        }
      } catch (error: any) {
        this.responser = error.response
          ? error.response.data
          : { message: 'Unknown error' };
        this.isError = true;
        this.isAlert = true;
        this.isLoading = false;
      }

      // const response = axios
      // axios
      //   .post('http://localhost:8000/api/login', this.loginForm.value)
      //   .then((response) => {
      // this.responser = response.data;
      // this.authService.setToken(this.responser.token);
      // this.router.navigate(['/home']);
      //   })
      //   .catch((error) => {
      //     this.responser = error.response
      //       ? error.response.data
      //       : { message: 'Unknown error' };
      // this.isError = true;
      // this.isAlert = true;
      //   })
      //   .finally(() => {
      // this.isLoading = false;
      //   });
    } else {
      this.isLoading = false;
    }
  }

  // Google Login
  async loginWithGoogle() {
    try {
      const user = await GoogleAuth.signIn();
      if (user) {
        try {
          const response = await this.authService.loginWithGoogle(user.authentication);
          console.log(response);
          if (response) {
            this.responser = { ...response };
            this.authService.setToken(response.token);
            this.router.navigate(['/home']);
          }
        } catch (error: any) {
          console.log(error);
          this.responser = error.response
            ? error.response.data
            : { message: 'Unknown error' };
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}
