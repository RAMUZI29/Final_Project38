import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CarService } from '../services/car.service';
import { StocksService } from '../services/stocks.service';
import { environment } from 'src/environments/environment';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  url = environment.urlApi;
  car: any[] = [];
  data: any[] = [];
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
    this.filteredData = this.car.filter((d) => d.category_id === this.segment.toString());
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

  getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  updatePickupDate(event: CustomEvent) {
    this.pickupDate = new Date(event.detail.value).toISOString().split('T')[0];
    console.log('Pickup Date updated to:', this.pickupDate);

    // Update the dropoffDate to ensure it's always after the pickupDate
    const newDropoffDate = new Date(this.pickupDate);
    newDropoffDate.setDate(newDropoffDate.getDate() + 1);
    this.dropoffDate = newDropoffDate.toISOString().split('T')[0];
  }

  async handleBooking(item: any) {
    const bookingData = {
      car_id: item.id || '', // assuming item contains the car id
      rental_date: this.pickupDate || this.getCurrentDate(),
      return_date: this.dropoffDate || this.getTomorrowDate(),
      total_amount: item.price_per_day,
    };

    console.log('Booking data:', bookingData);

    // Add your booking logic here
  }
}
