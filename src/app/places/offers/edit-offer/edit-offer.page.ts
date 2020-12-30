import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Place } from './../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place:Place;

  constructor(
    private activatedRoute:ActivatedRoute,
    private placesService:PlacesService,
    private navController:NavController
  ){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('placeId')){
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

}
