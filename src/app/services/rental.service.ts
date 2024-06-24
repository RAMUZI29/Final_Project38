import { Injectable } from '@angular/core';
import axiosInstance from '../lib/axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private auth: AuthService) {}

  async addRental(dataRental: any) {
    const token = this.auth.getToken();
    const { data } = await axiosInstance.post('/rental', dataRental, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return data;
  }

  async getRental() {
    const { data } = await axiosInstance.get('/rental');
    return data;
  }

  async bookCar(bookingData: any) {
    const token = this.auth.getToken();
    const { data } = await axiosInstance.post('http://localhost:8000/api/payment', bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return data;
  }
}
