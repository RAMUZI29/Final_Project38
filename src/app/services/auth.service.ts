import { Injectable } from '@angular/core';
import axios from 'axios';
import axiosInstance from '../lib/axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  async logout() {
    const token = this.getToken();
    if (token) {
      const response = await axiosInstance.get('/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status) {
        this.removeToken();
      }
    }
  }

  async infoLoginUser() {
    const token = this.getToken();
    const { data } = await axiosInstance.get('/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}
