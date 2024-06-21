import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.isAlert = false; // Reset the alert visibility
    this.isError = false; // Reset the error state

    if (this.loginForm.valid) {
      axios
        .post('http://localhost:8000/api/login', this.loginForm.value)
        .then((response) => {
          this.responser = response.data;
          this.authService.setToken(this.responser.token);
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          this.responser = error.response
            ? error.response.data
            : { message: 'Unknown error' };
          this.isError = true;
          this.isAlert = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  }
}
