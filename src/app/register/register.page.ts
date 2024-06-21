import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regisForm!: FormGroup;
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
    this.regisForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    console.log(this.responser);
  }

  onSubmit() {
    this.isLoading = true;
    this.isAlert = false; // Reset the alert visibility
    this.isError = false; // Reset the error state

    if (this.regisForm.valid) {
      axios
        .post('http://localhost:8000/api/register', this.regisForm.value)
        .then((response) => {
          this.responser = response.data;
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          this.responser = error.response
            ? error.response.data
            : { message: 'Unknown error' };
          this.isError = true;
          this.isAlert = true; // Show alert only if there's an error
        })
        .finally(() => {
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  }
}
