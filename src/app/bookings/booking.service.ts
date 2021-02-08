import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { delay, take, tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class BookingService {
  // private _bookings: Booking[] = [
  //     {
  //         id:'b101',
  //         placeId:'p101',
  //         placeTitle:'Waterloo',
  //         guestNumber:2,
  //         userId:'abc'
  //     }
  // ];

  // get bookings(){
  //     return [...this._bookings];
  // }

  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );

    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((zbookings) => {
        this._bookings.next(zbookings.concat(newBooking));
      })
    );

  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(
        take(1),
        delay(1000),
        tap((zbookings) => {
          this._bookings.next(zbookings.filter(b=>b.id!==bookingId));
        })
      );
  }
}
