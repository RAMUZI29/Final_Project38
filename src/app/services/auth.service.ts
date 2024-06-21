import { Injectable } from '@angular/core';
import axios from 'axios';
import axiosInstance from '../lib/axios';
import { jwtDecode } from 'jwt-decode';

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
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(token);

      if (decodedToken.exp < Date.now() / 1000) {
        this.removeToken();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  async logout() {
    const token = this.getToken();
    if (token) {
      const response = await axiosInstance.get('/logout');
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
      }
    });
    return data;
  }

  async login(dataLogin: object) {
    const { data } = await axiosInstance.post('/login', dataLogin);
    return data;
  }

  async loginWithGoogle(dataLogin: object) {
    const { data } = await axiosInstance.post('/oauth/register', dataLogin);
    return data;
  }
}
