import { Injectable } from '@angular/core';
import axiosInstance from '../lib/axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(public auth: AuthService) {}

  async getStocks() {
    const token = this.auth.getToken();
    const { data } = await axiosInstance.get('/stocks', {
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    });
    return data;
  }
}
