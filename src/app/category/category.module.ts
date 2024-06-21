import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { RouterModule } from '@angular/router';
import { DateDirective } from '../directive/date.directive';

@NgModule({
  imports: [ IonicModule, RouterModule.forChild([{ path: '', component: CategoryPage }]), DateDirective ],
  declarations: [CategoryPage],
  exports: [CategoryPage],
})
export class CategoryPageModule {}
