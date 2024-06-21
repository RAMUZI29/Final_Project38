import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  rental: any[] = [];
  notyetpaid: any[] = [];
  active: any[] = [];
  expired: any[] = [];

  constructor(
    public api: ApiService,
    public rentalService: RentalService,
  ) {}

  ngOnInit() {
    this.Rental();
  }

  async Rental() {
    try {
      const response = await this.rentalService.getRental();
      this.rental = response.data;

      this.notyetpaid = this.rental.filter(rental => rental.status === 'Not Yet Paid');
      this.active = this.rental.filter(rental => rental.status === 'Active');
      this.expired = this.rental.filter(rental => rental.status === 'Expired');
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  }

}
