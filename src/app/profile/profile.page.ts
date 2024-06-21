import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../services/auth.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  authService = inject(AuthService);
  router = inject(Router); // Menginjeksi Router

  userData: any = {};

  constructor(
    private apiService: ApiService // Menginjeksi ApiService
  ) {}

  ngOnInit() {
    this.getInfo();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  async getInfo() {
    try {
      const infoUser = await this.authService.infoLoginUser();
      this.userData.name = infoUser.data.name;
      this.userData.email = infoUser.data.email;
      this.userData.role = infoUser.data.role;
    } catch (error) {
      console.error('Error fetching user info', error);
    }
  }
}
