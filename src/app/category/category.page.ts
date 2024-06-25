import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CarService } from '../services/car.service';
import { StocksService } from '../services/stocks.service';
import { environment } from 'src/environments/environment';
import { RentalService } from '../services/rental.service';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';
import axiosInstance from '../lib/axios';

declare global {
  interface Window {
    snap: any;
  }
}

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  url = environment.urlApi;
  car: any[] = [];
  data: any[] = [];
  email: any;
  stocks: any[] = [];
  segment: number = 1;
  item: any;
  filteredData: any[] = [];
  userData: any = {};

  dataRental: any = {
    name: '',
    seat: '',
    transmisi: '',
    jenis_bbm: '',
  };

  pickupDate: string = this.getCurrentDate();
  dropoffDate: string = this.getTomorrowDate();

  totalSewa = '0';
  total = '0';

  constructor(
    public categoryService: CategoryService,
    public carService: CarService,
    public stocksService: StocksService,
    public rentalService: RentalService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getInfo();
    this.Category();
    this.Car();
    this.item();
  }

  async getInfo() {
    try {
      const infoUser = await this.auth.infoLoginUser();
      this.userData = await infoUser.data;
    } catch (error) {
      console.error('Error fetching user info', error);
    }
  }

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handleModal(item: any) {
    if (item && item.id) {
      this.isModalOpen = !this.isModalOpen;
      const idUser = this.userData.id;
      this.dataRental = { idUser, ...item };
    } else {
      console.error('Invalid item passed to handleModal:', item);
    }
  }

  async Category() {
    try {
      const response = await this.categoryService.getCategory();
      this.data = response.data;
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  }

  async Stocks() {
    try {
      const response = await this.stocksService.getStocks();
      this.stocks = response.data;
    } catch (error) {
      console.error('Error fetching stocks data:', error);
    }
  }

  async Car() {
    try {
      const response = await this.carService.getCar();
      if (response) {
        this.car = response.data;
        if (this.car) {
          this.filterData();
        }
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  }

  segmentChanged(e: any) {
    this.segment = parseInt(e.detail.value);
    this.filterData();
  }

  filterData() {
    this.filteredData = this.car.filter(
      (d) => d.category_id === this.segment.toString()
    );
  }
  formatPrice(price: any): string {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  }

  async handleInput(event: any) {
    const value = event.target.value;
    this.filteredData = this.car.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  // cek currenn date
  getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

  getRentalTotalPrice() {
    const numberday = this.getNumberOfDays();

    if (this.dataRental && this.dataRental.price_per_day) {
      const totalBasePrice = numberday * this.dataRental.price_per_day;
      // persen 30%
      const persen = totalBasePrice * 0.3;
      // const upfrontPaymentAmount = totalBasePrice * 0.3;
      return totalBasePrice;
    } else {
      return 0;
    }
  }

  async paymentAlternative(item: any) {
    console.log('Item in paymentAlternative:', item);

    if (!item || !item.id) {
      console.error('Item is undefined or does not have an id:', item);
      return;
    }

    // const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token not found in localStorage.');
      return;
    }

    const bookingData = {
      // user_id: userId,
      rental_id: item.id,
      status: 'default',
      rental_date: this.pickupDate || this.getCurrentDate(),
      return_date: this.dropoffDate || this.getTomorrowDate(),
      total_amount: this.getRentalTotalPrice(),
    };

    try {
      const response = await axiosInstance.post('payment/alt', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Rental created:', response.data);

      // Lanjutkan dengan permintaan pembuatan payment setelah rental berhasil
    } catch (error: any) {
      console.error('Error:', error);

      if (error.response && error.response.status === 400) {
        console.error('Bad Request. Check the data sent to the server.');
        console.error('Server error message:', error.response.data);
      } else if (error.response && error.response.status === 401) {
        console.error('Unauthorized. Check token or login status.');
      } else {
        console.error('Unknown error occurred.');
      }
    }
    console.log('Booking data:', bookingData);
  }

  async handleBooking(item: any) {
    console.log('Item in handleBooking:', item);

    // Check if item or item.id is undefined or null
    if (!item || !item.id) {
      console.error('Item is undefined or does not have an id:', item);
      return;
    }

    const Data = {
      user_id: item.idUser,
      car_id: item.id,
      rental_date: this.pickupDate,
      return_date: this.dropoffDate,
      total_amount: item.price_per_day,
      status: 'Not Yet Paid',
    };
    console.log('Data for booking:', Data);

    try {
      const response = await axiosInstance.post('/rental', Data, {
        headers: {
          Authorization: `Bearer ${this.auth.getToken()}`,
        },
      });
      console.log('Rental created:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  getNumberOfDays() {
    const pickupDate = new Date(this.pickupDate).getTime();
    const dropoffDate = new Date(this.dropoffDate).getTime();
    const diffInDays = Math.ceil(
      (dropoffDate - pickupDate) / (1000 * 60 * 60 * 24)
    );

    if (this.dataRental && this.dataRental.price_per_day) {
      const totalBasePrice = diffInDays * this.dataRental.price_per_day;
      // persen 30%
      const persen = totalBasePrice * 0.3;
      this.totalSewa = this.formatPrice(persen);
      const total = totalBasePrice - persen;
      this.total = this.formatPrice(total);
      return diffInDays;
    } else {
      return 0;
    }
    // return diffInDays;
  }

  getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  updatePickupDate(event: CustomEvent) {
    this.pickupDate = new Date(event.detail.value).toISOString().split('T')[0];
    console.log('Pickup Date updated to:', this.pickupDate);
    // this.getNumberOfDays();
    // const newDropoffDate = new Date(this.pickupDate);
    // newDropoffDate.setDate(newDropoffDate.getDate() + 1);
    // this.dropoffDate = newDropoffDate.toISOString().split('T')[0];
    // console.log('Dropoff Date updated to:', this.dropoffDate);
  }

  updateDropoffDate(event: CustomEvent) {
    const newDropoffDate = new Date(this.pickupDate);
    newDropoffDate.setDate(newDropoffDate.getDate() + 1);
    this.dropoffDate = new Date(event.detail.value).toISOString().split('T')[0];
    console.log('DropUp Date updated to:', this.dropoffDate);
  }

  sewaHarian(data: any) {
    const sewa = parseInt(data);
    // const sewa = this.dataRental.price_per_day
    const total = this.formatPrice(sewa);
    return total;
  }
}
