import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';

import { TabComponent } from './tab.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';


@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule ,IonicModule.forRoot()],
  declarations: [AppComponent, TabComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}