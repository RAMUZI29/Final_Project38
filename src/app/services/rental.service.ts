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
    const { data } = await axiosInstance.post('/rental', dataRental);
    return data;
  }

  async getRental() {
    const { data } = await axiosInstance.get('/rental');
    return data;
  }
}

