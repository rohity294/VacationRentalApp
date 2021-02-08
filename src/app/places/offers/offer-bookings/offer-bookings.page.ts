import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Place } from './../../place.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit,OnDestroy {
  
  place:Place;
  placeSub:Subscription;

  constructor(
    private activatedRoute:ActivatedRoute,
    private navController:NavController,
    private placesService:PlacesService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('placeId')){
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }
      // this.place = this.placesService.getPlace(paramMap.get('placeId'));
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(zplace=>{
        this.place = zplace;
      });
    });
  }

  ngOnDestroy(){
    if(this.placeSub){
      this.placeSub.unsubscribe;
    }
  }

}
