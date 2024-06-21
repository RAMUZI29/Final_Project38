import { Injectable } from '@angular/core';
import axiosInstance from '../lib/axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private auth: AuthService) {}

  // addrental
  async addRental(dataRental: any) {
    const { data } = await axiosInstance.post('/rental', dataRental, {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
    return data;
  }

  async getRental() {
    const token = this.auth.getToken();
    const { data } = await axiosInstance.get('/rental', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

