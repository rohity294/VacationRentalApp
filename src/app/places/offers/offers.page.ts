import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Place } from './../place.model';
import { PlacesService } from './../places.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit,OnDestroy {
  offers: Place[];
  private placesSub: Subscription;
  isLoading = false;

  constructor(private placesService:PlacesService,private router:Router) { }

  ngOnInit() {
    // this.offers = this.placesService.places;
    this.placesSub = this.placesService.places.subscribe(zplaces=>{
      this.offers = zplaces;
    })
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(()=>{
    this.isLoading = false;
   });
  }

  onEdit(offerId:string,slidingItem:IonItemSliding){
    //console.log(offerId);
    slidingItem.close();
    this.router.navigate(['/','places','tabs','offers','edit',offerId]); 
  }

  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
