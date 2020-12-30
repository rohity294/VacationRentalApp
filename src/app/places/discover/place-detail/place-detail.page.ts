import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from './../../place.model';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place:Place;

  constructor(
    private router:Router,
    private navController:NavController,
    private activatedRoute:ActivatedRoute,
    private placesService:PlacesService
    ){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('placeId')){
        this.navController.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace(){
    //this.router.navigateByUrl('/places/tabs/discover');
    //or below
    //this.router.navigate(['/','places','tabs','discover']);
    //or below
    // this.navcontroller.navigateBack(['/','places','tabs','discover']);
    //or below
    //this.navController.navigateBack('/places/tabs/discover');
    this.navController.navigateForward('/bookings');
  }

}



