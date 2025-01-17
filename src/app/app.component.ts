import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Sistem_Booking';
  data: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {}
}
