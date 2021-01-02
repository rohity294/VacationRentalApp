import { Booking } from './booking.model';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class BookingService{
    private _bookings: Booking[] = [
        {
            id:'b101',
            placeId:'p101',
            placeTitle:'Waterloo',
            guestNumber:2,
            userId:'abc'
        }
    ];
    
    get bookings(){
        return [...this._bookings];
    }
}