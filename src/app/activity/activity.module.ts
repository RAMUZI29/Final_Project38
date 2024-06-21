import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ActivityPageRoutingModule } from './activity-routing.module';

import { ActivityPage } from './activity.page';


@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: ActivityPage }])],
  declarations: [ActivityPage],
  exports: [ActivityPage]
  })

export class ActivityPageModule {}
