import { Injectable } from '@angular/core';
import axiosInstance from '../lib/axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(public auth: AuthService) {}

  async getCar() {
    const { data } = await axiosInstance.get('/car');
    return data;
  }
}
