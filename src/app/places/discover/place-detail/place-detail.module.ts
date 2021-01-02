import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule
  ],
  declarations: [PlaceDetailPage,CreateBookingComponent],
  //entryComponents:[CreateBookingComponent]//not required for this angular version,needed if getting an error in previous versions while rendering a component dynamically through a modal i.e netiher throuhg selector tag nor through use of router
})
export class PlaceDetailPageModule {}
