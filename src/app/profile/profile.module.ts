import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: ProfilePage }])],
  declarations: [ProfilePage],
  exports: [ProfilePage],
})
export class ProfilePageModule {}
