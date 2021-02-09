import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';

interface BookingData {
  bookedFrom: string;
  bookedTo: string;
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId: string;
}
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

  constructor(private authService: AuthService, private http: HttpClient) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  // addBooking(
  //   placeId: string,
  //   placeTitle: string,
  //   placeImage: string,
  //   firstName: string,
  //   lastName: string,
  //   guestNumber: number,
  //   dateFrom: Date,
  //   dateTo: Date
  // ) {
  //   const newBooking = new Booking(
  //     Math.random().toString(),
  //     placeId,
  //     this.authService.userId,
  //     placeTitle,
  //     placeImage,
  //     firstName,
  //     lastName,
  //     guestNumber,
  //     dateFrom,
  //     dateTo
  //   );
  //   return this.bookings.pipe(
  //     take(1),
  //     delay(1000),
  //     tap((zbookings) => {
  //       this._bookings.next(zbookings.concat(newBooking));
  //     })
  //   );
  // }

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
    let generatedId: string;
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

    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-course-68762-default-rtdb.firebaseio.com/bookings.json',
        { ...newBooking, id: null }
      )
      .pipe(
        switchMap((responseData) => {
          generatedId = responseData.name;
          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          newBooking.id = generatedId;
          this._bookings.next(bookings.concat(newBooking));
        })
      );
  }

  // cancelBooking(bookingId: string) {
  //   return this.bookings.pipe(
  //     take(1),
  //     delay(1000),
  //     tap((zbookings) => {
  //       this._bookings.next(zbookings.filter((b) => b.id !== bookingId));
  //     })
  //   );
  // }

  cancelBooking(bookingId: string) {
    return this.http
      .delete(
        `https://ionic-angular-course-68762-default-rtdb.firebaseio.com/bookings/${bookingId}.json`
      )
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          this._bookings.next(bookings.filter((b) => b.id !== bookingId));
        })
      );
  }

  fetchBookings() {
    return this.http
      .get<{ [key: string]: BookingData }>(
        `https://ionic-angular-course-68762-default-rtdb.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`
      )
      .pipe(
        map((bookingData) => {
          const bookings = [];
          for (const key in bookingData) {
            if (bookingData.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  bookingData[key].placeId,
                  bookingData[key].userId,
                  bookingData[key].placeTitle,
                  bookingData[key].placeImage,
                  bookingData[key].firstName,
                  bookingData[key].lastName,
                  bookingData[key].guestNumber,
                  new Date(bookingData[key].bookedFrom),
                  new Date(bookingData[key].bookedTo)
                )
              );
            }
          }
          return bookings;
        }),
        tap((bookings) => {
          this._bookings.next(bookings);
        })
      );
  }
}
