import { Component, OnInit } from '@angular/core';
import { RentalService } from '../services/rental.service';
import { formatCurrency } from '@angular/common';

interface Rental {
  car: { name: string };
  total_amount: number;
  status: string;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    this.fetchRentalData();
  }

  async fetchRentalData() {
    try {
      const response = await this.rentalService.getRental(); // Assuming getRental() returns a promise
      this.rentals = response.data as Rental[]; // Assuming response contains an array of rental objects

      // Group rentals by status
      const groupedRentals: { [status: string]: Rental[] } = {
        'Not Yet Paid': [],
        Active: [],
        Expired: [],
      };

      this.rentals.forEach((rental) => {
        // Using a type guard to ensure rental.status is a valid key in groupedRentals
        if (groupedRentals.hasOwnProperty(rental.status)) {
          groupedRentals[rental.status].push(rental);
        }
      });

      // Update DOM based on grouped rentals
      this.renderRentals(groupedRentals);
    } catch (error) {
      console.error('Error fetching rental data:', error);
      // Handle error as per your application's requirements
    }
  }

  renderRentals(groupedRentals: { [status: string]: Rental[] }) {
    // Render Not Yet Paid rentals
    const notYetPaidList = document.getElementById('notYetPaidList');
    if (notYetPaidList) {
      groupedRentals['Not Yet Paid'].forEach((rental) => {
        const card = this.createCard(rental);
        notYetPaidList.appendChild(card);
      });
    }

    // Render Active rentals
    const activeList = document.getElementById('activeList');
    if (activeList) {
      groupedRentals['Active'].forEach((rental) => {
        const card = this.createCard(rental);
        activeList.appendChild(card);
      });
    }

    // Render Expired rentals
    const expiredList = document.getElementById('expiredList');
    if (expiredList) {
      groupedRentals['Expired'].forEach((rental) => {
        const card = this.createCard(rental);
        expiredList.appendChild(card);
      });
    }
  }

  createCard(rental: Rental): HTMLElement {
    const card = document.createElement('ion-card');
    const content = document.createElement('ion-card-content');

    // Format total_amount using formatCurrency
    const formattedPrice = formatCurrency(rental.total_amount, 'id', 'Rp. ');

    // Set text content of ion-card-content
    content.textContent = `Mobil: ${rental.car.name}, Total Harga: ${formattedPrice}, Status Rental: ${rental.status}`;

    card.appendChild(content);
    return card;
  }
  formatPrice(price: any): string {
    // Pastikan price adalah number atau convert ke number jika perlu
    const numPrice = typeof price === 'number' ? price : parseFloat(price);

    if (!isNaN(numPrice)) {
      const formattedPrice = numPrice.toFixed(2); // Memformat ke 2 digit desimal
      return formattedPrice.replace(/\.00$/, ''); // Menghapus .00 dari akhir string
    } else {
      return '0'; // Atau handle jika price tidak valid
    }
  }
}
