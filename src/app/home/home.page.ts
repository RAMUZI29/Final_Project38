import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CarService } from '../services/car.service';
import axios from 'axios';
import { Router } from '@angular/router';
import { register} from 'swiper/element/bundle'
import { environment } from 'src/environments/environment';
register()
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  url = environment.urlApi;
  isLogedIn: boolean = inject(AuthService).isLoggedIn();
  router = inject(Router);
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cars: any[] = []; // Array untuk menyimpan data mobil
  selectedCars: any[] = []; // Array untuk menyimpan mobil yang dipilih
  recommendedCars : any[] = []; // Array untuk menyimpan data rekomendasi

  constructor(public auth: AuthService, public carService: CarService) {}



  ngOnInit(): void {
    this.fetchCars();
  }

  async fetchCars() {
    try {
      const response = await this.carService.getCar();
      this.cars = response.data;

      // Pilih mobil tertentu berdasarkan nama
      const selectedCarNames = ['Civic', 'Palisade', 'Camry', 'Ioniq 6', 'Innova V', 'Alphard'];
      this.selectedCars = this.cars.filter(car => selectedCarNames.includes(car.name.trim()));

      // Pilih mobil yang direkomendasikan berdasarkan nama
      const recommendedCarNames = ['Fortuner', 'Mobilio', 'Staria', 'Creta', 'Veloz'];
      this.recommendedCars = this.cars.filter(car => recommendedCarNames.includes(car.name.trim()));

    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  }



  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.logout();
      },
    },
  ];

  logout() {
    axios
      .get('https://localhost:8000/api/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((response) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      });
  }
}
