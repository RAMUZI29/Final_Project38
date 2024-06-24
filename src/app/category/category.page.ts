import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CarService } from '../services/car.service';
import { StocksService } from '../services/stocks.service';
import { environment } from 'src/environments/environment';
import { RentalService } from '../services/rental.service';

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
  filteredData: any[] = [];
  dataRental: any = {
    name: '',
    seat: '',
    transmisi: '',
    jenis_bbm: '',
  };
  pickupDate: string = this.getCurrentDate();
  dropoffDate: string = this.getTomorrowDate();

  constructor(
    public categoryService: CategoryService,
    public carService: CarService,
    public stocksService: StocksService,
    public rentalService: RentalService
  ) {}

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.Category();
    this.Car();
  }

  handleModal(item: object) {
    this.isModalOpen = !this.isModalOpen;
    this.dataRental = {
      ...item,
    };
  }

  async Category() {
    try {
      const response = await this.categoryService.getCategory();
      this.data = response.data;
    } catch (error) {
      console.error('Error fetching category data:', error);
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

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    const allData = this.data.reduce((acc: any, category: any) => {
      return acc.concat(category.category_data);
    }, []);

    if (query) {
      this.filteredData = allData.filter((item: any) =>
        item.title.toLowerCase().includes(query)
      );
    } else {
      this.filterData();
    }
  }

  getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

  getRentalTotalPrice() {
    const pickupDate = new Date(this.pickupDate);
    const dropoffDate = new Date(this.dropoffDate);
    const numberOfDays = Math.floor(
      (dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (this.dataRental && this.dataRental.price_per_day) {
      const totalBasePrice = numberOfDays * this.dataRental.price_per_day;
      const upfrontPaymentAmount = totalBasePrice * 0.3; // Calculate 10% payment
      return upfrontPaymentAmount;
    } else {
      return 0; // Handle potential errors (e.g., missing data)
    }
  }

  async handleBooking(item: any) {
    const bookingData = {
      rental_date: this.pickupDate || this.getCurrentDate(),
      return_date: this.dropoffDate || this.getTomorrowDate(),
      dataRental: item.name,
      customer_email: this.email,
      customer_first_name: localStorage.getItem('name'),
      data: item.Rentalname,
    };

    console.log(bookingData);

    try {
      const response = await fetch('http://localhost:8000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const { token } = responseData;

      const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
      const clientKey = 'SB-Mid-client-2H5nKp7wB0J8eX0z';

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey);
        script.async = true;
        script.onload = () => {
          console.log('Snap.js loaded successfully');
          if (
            typeof window.snap !== 'undefined' &&
            typeof window.snap.pay === 'function'
          ) {
            window.snap.pay(token);
            resolve();
          } else {
            reject(
              new Error('window.snap.pay is not defined or not a function')
            );
          }
        };
        script.onerror = (error) => {
          reject(new Error('Failed to load Snap.js'));
        };
        document.body.appendChild(script);
      });
    } catch (error) {
      console.error('Error handling booking:', error);
      // Handle error appropriately
    }
  }


  getNumberOfDays() {
    const pickupDate = new Date(this.pickupDate).getTime();
    const dropoffDate = new Date(this.dropoffDate).getTime();
    const diffInDays = Math.ceil(
      (dropoffDate - pickupDate) / (1000 * 60 * 60 * 24)
    );
    return diffInDays;
  }

  getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  updatePickupDate(event: CustomEvent) {
    this.pickupDate = new Date(event.detail.value).toISOString().split('T')[0];
    console.log('Pickup Date updated to:', this.pickupDate);

    // Ensure you call getNumberOfDays here to recalculate after update
    this.getNumberOfDays();

    // Update the dropoffDate to ensure it's always after the pickupDate
    const newDropoffDate = new Date(this.pickupDate);
    newDropoffDate.setDate(newDropoffDate.getDate() + 1);
    this.dropoffDate = newDropoffDate.toISOString().split('T')[0];
  }
}
