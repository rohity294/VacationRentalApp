import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})//had this @Injectable decorator not been, then in that case,to inject this service elsewhere
//we would have needed to add this service to Providers array in app.module.ts

export class PlacesService {
  private _places:Place[] = [
    new Place('p101','Waterloo','The tech capital of Canada','https://upload.wikimedia.org/wikipedia/commons/7/79/Waterloo_Ontario_City_Hall_Pano.jpg',500,new Date('2021-06-01'),new Date('2021-12-31')),
    new Place('p102','Kitchener','The sleepy suburban city','https://upload.wikimedia.org/wikipedia/commons/b/b7/Downtown_Kitchener%2C_Ontario_2.jpg',100,new Date('2021-06-01'),new Date('2021-12-31')),
    new Place('p103','Cambridge','One of the KWC cities','https://upload.wikimedia.org/wikipedia/commons/7/7a/Grand_River_Rwy_car_on_Speed_River_bridge.jpg',250,new Date('2021-06-01'),new Date('2021-12-31'))
  ];

  constructor() { }
  
  get places(){
    return [...this._places];
  }
  // getPlaces():Place[]{
  //   return [...this._places];
  // }

  getPlace(id:String){
    return {...this._places.find(p=>p.id===id)};
  }


}
