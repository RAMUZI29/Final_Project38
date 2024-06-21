import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
    imports: [IonicModule, RouterModule.forChild([{ path: '', component: HomePage }])],
    declarations: [HomePage],
    exports: [HomePage],
    schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
