import { Subscription } from 'rxjs';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    // this.loadedBookings = this.bookingService.bookings;
    this.bookingSub = this.bookingService.bookings.subscribe((zbookings) => {
      this.loadedBookings = zbookings;
    });
  }

  onCancelBooking(bookingId: string, slidingItem: IonItemSliding) {
    // console.log(bookingId);
    slidingItem.close();
    this.loadingController.create({message:'Cancelling booking..'}).then(loadingElement=>{
      loadingElement.present();
      this.bookingService.cancelBooking(bookingId).subscribe(()=>{
        loadingElement.dismiss();
      });
    })
    
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
