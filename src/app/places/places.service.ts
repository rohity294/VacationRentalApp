import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

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

  // private _places = new BehaviorSubject<Place[]>([
  //   new Place(
  //     'p101',
  //     'Waterloo',
  //     'The tech capital of Canada',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/79/Waterloo_Ontario_City_Hall_Pano.jpg',
  //     500,
  //     new Date('2021-06-01'),
  //     new Date('2021-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p102',
  //     'Kitchener',
  //     'The sleepy suburban city',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/b7/Downtown_Kitchener%2C_Ontario_2.jpg',
  //     100,
  //     new Date('2021-06-01'),
  //     new Date('2021-12-31'),
  //     'abcd'
  //   ),
  //   new Place(
  //     'p103',
  //     'Cambridge',
  //     'One of the KWC cities',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/7a/Grand_River_Rwy_car_on_Speed_River_bridge.jpg',
  //     250,
  //     new Date('2021-06-01'),
  //     new Date('2021-12-31'),
  //     'abc'
  //   ),
  // ]);

  private _places = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  // getPlaces():Place[]{
  //   return [...this._places];
  // }

  get places() {
    //return [...this._places];
    return this._places.asObservable();
  }

  fetchPlaces() {
    // return this.http.get<{[key:string]:PlaceData}>('https://ionic-angular-course-68762-default-rtdb.firebaseio.com/offered-places.json')
    // .pipe(tap(responseData=>{
    //   console.log(responseData);
    // }));

    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-angular-course-68762-default-rtdb.firebaseio.com/offered-places.json'
      )
      .pipe(
        map((responseData) => {
          const places = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  responseData[key].title,
                  responseData[key].description,
                  responseData[key].imageUrl,
                  responseData[key].price,
                  new Date(responseData[key].availableFrom),
                  new Date(responseData[key].availableTo),
                  responseData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }

  // getPlace(id: string) {
  //   //return {...this._places.find(p=>p.id===id)};
  //   return this.places.pipe(
  //     take(1),
  //     map((zplaces) => {
  //       return { ...zplaces.find((p) => p.id === id) };
  //     })
  //   );
  // }

  getPlace(id: string) {
    return (
      this.http
        .get<PlaceData>(
          `https://ionic-angular-course-68762-default-rtdb.firebaseio.com/offered-places/${id}.json`
        )
        // .pipe(tap(responseData=>{
        //   console.log(responseData);
        // }))
        .pipe(
          map((placeData) => {
            return new Place(
              id,
              placeData.title,
              placeData.description,
              placeData.imageUrl,
              placeData.price,
              new Date(placeData.availableFrom),
              new Date(placeData.availableTo),
              placeData.userId
            );
          })
        )
    );
  }

  /*
availableFrom: "2021-03-08T17:29:48.322Z"
availableTo: "2021-04-08T16:29:48.324Z"
description: "TestDescription"
imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Downtown_Kitchener%2C_Ontario_2.jpg"
price: 100
title: "TestTitle!!"
userId: "abc"
  */

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
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

    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((zplaces) => {
    //     this._places.next(zplaces.concat(newPlace));
    //   })
    // );

    return (
      this.http
        .post<{ name: string }>(
          'https://ionic-angular-course-68762-default-rtdb.firebaseio.com/offered-places.json',
          { ...newPlace, id: null }
        )
        // .pipe(
        //   tap((responseData) => {
        //     console.log(responseData);
        //   })
        // );
        .pipe(
          switchMap((responseData) => {
            generatedId = responseData.name;
            return this.places;
          }),
          take(1),
          tap((zplaces) => {
            newPlace.id = generatedId;
            this._places.next(zplaces.concat(newPlace));
          })
        )
    );
  }

  // updatePlace(placeId: string, title: string, description: string) {
  //   return this.places.pipe(
  //     take(1),
  //     delay(1000),
  //     tap((places) => {
  //       const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
  //       const updatedPlaces = [...places];
  //       const oldPlace = updatedPlaces[updatedPlaceIndex];
  //       updatedPlaces[updatedPlaceIndex] = new Place(
  //         oldPlace.id,
  //         title,
  //         description,
  //         oldPlace.imageUrl,
  //         oldPlace.price,
  //         oldPlace.availableFrom,
  //         oldPlace.availableTo,
  //         oldPlace.userId
  //       );
  //       this._places.next(updatedPlaces);
  //     })
  //   );
  // }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if(!places || places.length<=0){
          return this.fetchPlaces();
        }
        else{
          return of(places);
        }
      }),switchMap(places=>{
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        updatedPlaces = [...places];
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
        return this.http.put(
          `https://ionic-angular-course-68762-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      })
      ,
      tap((responseData) => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
