import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
}) //had this @Injectable decorator not been, then in that case,to inject this service elsewhere
//we would have needed to add this service to Providers array in app.module.ts
export class PlacesService {
  // private _places:Place[] = [
  //   new Place('p101','Waterloo','The tech capital of Canada','https://upload.wikimedia.org/wikipedia/commons/7/79/Waterloo_Ontario_City_Hall_Pano.jpg',500,new Date('2021-06-01'),new Date('2021-12-31'),'abc'),
  //   new Place('p102','Kitchener','The sleepy suburban city','https://upload.wikimedia.org/wikipedia/commons/b/b7/Downtown_Kitchener%2C_Ontario_2.jpg',100,new Date('2021-06-01'),new Date('2021-12-31'),'abc'),
  //   new Place('p103','Cambridge','One of the KWC cities','https://upload.wikimedia.org/wikipedia/commons/7/7a/Grand_River_Rwy_car_on_Speed_River_bridge.jpg',250,new Date('2021-06-01'),new Date('2021-12-31'),'abc')
  // ];

  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p101',
      'Waterloo',
      'The tech capital of Canada',
      'https://upload.wikimedia.org/wikipedia/commons/7/79/Waterloo_Ontario_City_Hall_Pano.jpg',
      500,
      new Date('2021-06-01'),
      new Date('2021-12-31'),
      'abc'
    ),
    new Place(
      'p102',
      'Kitchener',
      'The sleepy suburban city',
      'https://upload.wikimedia.org/wikipedia/commons/b/b7/Downtown_Kitchener%2C_Ontario_2.jpg',
      100,
      new Date('2021-06-01'),
      new Date('2021-12-31'),
      'abcd'
    ),
    new Place(
      'p103',
      'Cambridge',
      'One of the KWC cities',
      'https://upload.wikimedia.org/wikipedia/commons/7/7a/Grand_River_Rwy_car_on_Speed_River_bridge.jpg',
      250,
      new Date('2021-06-01'),
      new Date('2021-12-31'),
      'abc'
    ),
  ]);

  constructor(private authService: AuthService) {}

  get places() {
    //return [...this._places];
    return this._places.asObservable();
  }
  // getPlaces():Place[]{
  //   return [...this._places];
  // }

  getPlace(id: String) {
    //return {...this._places.find(p=>p.id===id)};
    return this.places.pipe(
      take(1),
      map((zplaces) => {
        return { ...zplaces.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://upload.wikimedia.org/wikipedia/commons/b/b7/Downtown_Kitchener%2C_Ontario_2.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    // this._places.push(newPlace);

    // this.places.pipe(take(1)).subscribe(zplaces=>{
    //   setTimeout(()=>{
    //     this._places.next(zplaces.concat(newPlace));
    //   },1000)
    // });

    return this.places.pipe(
      take(1),
      delay(1000),
      tap((zplaces) => {
        this._places.next(zplaces.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
