import { Injectable } from '@angular/core';
import axiosInstance from '../lib/axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(public auth: AuthService) {}

  async getCategory() {
    const token = this.auth.getToken();
    const { data } = await axiosInstance.get('/categories');
    return data;
  }
}
